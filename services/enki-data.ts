import { promises as fs } from "fs";
import { produce } from "immer";
import slugify from "slugify";

const ENKI_DATA_URL = "https://enkibot-prime.herokuapp.com/debug/";
const DUMMY_DATA_FILE = `${process.cwd()}/data/enkibot-prime_debug.md`;

// What do we need to do with enki data?
//
// 1. Fetch and cache the raw source from enkibot
// 2. Possibly transform it to something easier to index/filter and cache that - e.g. old shiny json
// 3. Provide service methods to provide specific views of the data
//    - per page content that can be job filtered?
//    - job filtered content?
//    - non-page sections e.g. Intro

// -------------------------
// TOP LEVEL SERVICE METHODS
// -------------------------

export async function getStage1Data(useDummyData: boolean = false) {
  // TODO this can be cached?
  const fetcher = useDummyData ? getDummyData : fetchFullData;

  const rawData = await fetcher();

  return parseRawEnkiData(rawData);
}

export async function getToc(useDummyData: boolean = false) {
  return (await getStage1Data(useDummyData)).toc;
}

export async function getStage2Data(
  sectionSlug: string,
  includeJobs: JobTagSelection,
  useDummyData: boolean = false
) {
  const stage1data = (await getStage1Data(useDummyData)).data;

  return parseStage1SectionData(stage1data[sectionSlug], includeJobs);
}

// --------
// Fetching
// --------

/**
 * Load local sample data as markdown
 * @returns Raw Markdown Enkibot tips data
 */
export async function getDummyData(): Promise<string> {
  return await fs.readFile(DUMMY_DATA_FILE, "utf8");
}

/**
 * Fetch Enkibot's full debug dataset as markdown
 * @returns Raw Markdown Enkibot tips data
 */
export async function fetchFullData(): Promise<string> {
  return (
    await fetch(ENKI_DATA_URL, {
      method: "POST",
    })
  ).text();
}

// -------
// Parsing
// -------

/** Parse Enkibot Markdown data into a JSON hierarchy we can use */

/**
 * Parsing is broken into stages to reflect usage vs caching vs dynamic parameter-driven filtering
 *
 * Stage 1
 * - parses the raw data into sections
 * - sluggified keys for URL-safe usage
 * - easy indexing for "page-per-section" access
 * - suitable for caching
 * - leaves tips in raw form
 * - also retain an ordered TOC of keys and titles (no further transformation needed, so also suitable for caching)
 *
 * Stage 2
 * - filters and passes a section's tips in one pass
 * - tip lines are parsed one at a time
 * - lines are excluded based on job filters
 * - included lines are aggregated into job groups post filter, preserving tip order
 * - unsuitable for caching; depends on dynamic parameters for filtering
 * - fast despite uncached as only working on single sections
 */

const JOB_TAGS_SEPARATOR = "|";
const JOB_TAGS_COMBINATOR = "+";

// these are noted here for clarity, but are currently hardcoded in the regex patterns below
// const SECTION_IDENTIFIER = "##";
// const ENTRY_IDENTIFIER = "*";
// const JOB_TAGS_OPEN = "[";
// const JOB_TAGS_CLOSE = "]";

const XplatNewLine = /\r?\n/;

const SlugifyRemoval = /[+?\/]/g;

const SectionLinePattern = /^## (?<sectionTitle>.+)/;
const EntryLinePattern = /^^\* (?:\[(?<jobString>.+)\] )?(?<tip>.+)/;

// -------
// Stage 1
// -------

/**
 * Parse the markdown from Enkibot into a JSON object
 * @param {string} data Markdown from Enkibot
 */
export function parseRawEnkiData(data: string) {
  const { sectionData, sectionsToc } = data
    .split(XplatNewLine)
    .reduce(parseIntoSections, {
      currentSectionKey: "",
      sectionData: {},
      sectionsToc: [],
    });

  return { toc: sectionsToc, data: sectionData };
}

type SectionsAccumulator = {
  currentSectionKey: string;
  sectionData: {
    [key: string]: SectionData;
  };
  sectionsToc: { title: string; slug: string }[];
};

type SectionData = { title: string; tips: string[]; tocIndex: number };

/**
 * Modify an ongoing SectionsAccumulator by starting a new section
 *
 * @param accumulator The ongoing accumulator
 * @param sectionTitle The raw section title value
 */
function accumulateNewSection(
  accumulator: SectionsAccumulator,
  sectionTitle: string
) {
  return produce(accumulator, (draft: SectionsAccumulator) => {
    const sectionKey = slugify(sectionTitle, {
      lower: true,
      remove: SlugifyRemoval,
    });
    draft.currentSectionKey = sectionKey; // so that we can accumulate tips within the current section from later lines

    const nSections = draft.sectionsToc.push({
      title: sectionTitle,
      slug: sectionKey,
    }); // so that we retain an ORDERED TOC

    draft.sectionData[sectionKey] = {
      // The actual data for a given section, indexed by slug
      title: sectionTitle,
      tocIndex: nSections - 1,
      tips: [],
    };
  });
}

function parseIntoSections(
  accumulator: SectionsAccumulator,
  line: string
): SectionsAccumulator {
  // new sections as keys
  // track the key we're under

  const section = line.match(SectionLinePattern); // is this line a section title?
  if (section) {
    const { sectionTitle } = section.groups!; // we know the capture group is good since we only come in here on a match!
    return accumulateNewSection(accumulator, sectionTitle);
  }

  // If the line didn't match the section title, test for a tip entry instead
  const tip = line.match(EntryLinePattern); // is this line a tip entry?
  if (tip) {
    // We don't parse Tip lines in Stage 1
    // just add the raw Tip line to the current section

    return produce(accumulator, (draft: SectionsAccumulator) => {
      const section = draft.sectionData[draft.currentSectionKey];
      section.tips.push(line);
    });
  }
  return accumulator;
}

// -------
// Stage 2 // TODO
// -------

type ParsedSectionData = {
  title: string;
  tocIndex: number;
  tips: JobTipGroup[];
};

/**
 * Given a section's tips, and a jobs filter,
 * Produce a JSON array of ordered tips grouped by job where possible
 */

/**
 * Parse the markdown from Enkibot into a JSON object
 * @param section Stage 1 Section Data for a single section
 */
export function parseStage1SectionData(
  section: SectionData,
  includeJobs: JobTagSelection
): ParsedSectionData {
  const { data: tips } = section.tips.reduce(parseIntoJobGroups, {
    includeJobs,
    currentJobString: "",
    data: [],
  });

  return { title: section.title, tocIndex: section.tocIndex, tips };
}

// TODO: this is prime material for unit testing

type JobGroupsAccumulator = {
  includeJobs: JobTagSelection;
  currentJobString?: string;
  data: JobTipGroup[];
};

type JobTipGroup = {
  jobs?: JobTagCombos;
  tips: string[];
};

/**
 * A 2-dimensional array for combining applicable JobTags
 * the outer array is an OR combinator; the inner array AND
 */
type JobTagCombos = string[][];

type JobTagSelection = { [key: JobTag]: boolean };
type JobTag = string; //TODO: make values explicit literals

/**
 * Determine whether a given parsed JobTagCombos array
 * matches a list of plain JobTags to
 * @param includeJobs A boolean dictionary of Job Tags to include
 * @param jobs The parsed Job Tag Combos to test
 * @returns Whether there is a match
 */
function isJobTagMatch(includeJobs: JobTagSelection, jobs?: JobTagCombos) {
  // no jobs means info applicable to all, which we should always display :)
  if ((jobs?.length ?? 0) === 0) return true;

  // here's where we handle the AND/OR criteria for job filtering
  // first array is OR so we can early exit on any match
  for (const combo of jobs!) {
    // if it were undefined we'd have returned by now
    // second array is AND so we use `every()` and check if selected
    if (combo.every((job) => includeJobs[job])) return true;
  }
}

function parseIntoJobGroups(
  accumulator: JobGroupsAccumulator,
  tipLine: string
) {
  const tipEntry = tipLine.match(EntryLinePattern); // is this line a tip entry?
  if (tipEntry) {
    const { jobString, tip } = tipEntry.groups!; // we know the capture group is good since we only come in here on a match!

    return produce(accumulator, (draft: JobGroupsAccumulator) => {
      const jobTagCombos = parseEnkibotJobString(jobString);

      // -------------
      // JOB FILTERING
      // -------------

      if (isJobTagMatch(accumulator.includeJobs, jobTagCombos)) {
        // --------------
        // GROUP TRACKING
        // --------------

        if (jobString !== accumulator.currentJobString) {
          // if the job string has changed
          // create a new tips group
          draft.data.push({
            jobs: jobTagCombos,
            tips: [],
          });

          // update job tracking
          if (jobString) draft.currentJobString = jobString;
          else delete draft.currentJobString; // it's valid for there to be no jobString, for general tips
        }

        // if this is a new section AND the first has no jobs
        // `currentJobString` won't appear to have changed
        if (!draft.data.length) draft.data.push({ tips: [] });

        // add the tip entry to the current group
        draft.data[draft.data.length - 1].tips.push(tip);
      }
    });
  }
  return accumulator;
}

// -------------
// OLD ENKI-DATA
// -------------

/**
 * Parse the markdown from Enkibot into a JSON object
 * @param {string} data Markdown from Enkibot
 */
export const oldParse = (data: string) =>
  data.split(XplatNewLine).reduce(ParseLine, { currentKey: "", data: {} }).data;

type ParseResult = {
  currentKey: string;
  currentJobs?: string;
  data: { [key: string]: JobTipGroup[] };
};

/**
 * Parse a single line of Enkibot Data, adding the result to the accumulated parse result
 * @param result The result of all lines parsed so far
 * @param line The current line
 */
const ParseLine = (result: ParseResult, line: string) => {
  // new sections as keys
  // track the key we're under
  const section = line.match(SectionLinePattern);
  if (section) {
    const { sectionTitle: key } = section.groups ?? {};
    return produce(result, (draft: ParseResult) => {
      draft.currentKey = key;
      delete draft.currentJobs; // section change resets job grouping
      draft.data[key] = [];
    });
  }

  const entry = line.match(EntryLinePattern);
  if (entry) {
    const { jobString: jobs, tip } = entry.groups ?? {};

    return produce(result, (draft: ParseResult) => {
      const section = draft.data[draft.currentKey];

      // if the job has changed
      if (jobs !== result.currentJobs) {
        // create a new tips group
        section.push({ jobs: parseEnkibotJobString(jobs), tips: [] });

        // update job tracking
        if (jobs) draft.currentJobs = jobs;
        else delete draft.currentJobs;
      }

      // if this is a new section AND the first has no jobs
      // `currentJobs` won't appear to have changed
      if (!section.length) section.push({ tips: [] });

      // add the tip entry to the current group
      section[section.length - 1].tips.push(tip);
    });
  }
  return result;
};

/**
 * Turn a string of Job tags from Enkibot
 * into an OR array of AND arrays
 * e.g. `KGT|THF+BLU` -> `[[KGT], [THF,BLU]]` = Knight or (Thief and Blue Mage)
 * @param {*} jobs the Enkibot job tag string
 */
export const parseEnkibotJobString = (jobs: string) =>
  jobs?.split(JOB_TAGS_SEPARATOR).map((j) => j.split(JOB_TAGS_COMBINATOR));
