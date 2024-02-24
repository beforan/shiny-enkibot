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

const SectionLinePattern = /^## (?<sectionTitle>.+)/;
const EntryLinePattern = /^^\* (?:\[(?<jobstring>.+)\] )?(?<tip>.+)/;

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
    [key: string]: { title: string; tips: string[]; tocIndex: number };
  };
  sectionsToc: { title: string; slug: string }[];
};

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
    const sectionKey = slugify(sectionTitle, { lower: true });
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
  data: { [key: string]: JobGroup[] };
};

type JobGroup = {
  jobs?: string[][];
  tips: string[];
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
    const { key } = section.groups ?? {};
    return produce(result, (draft: ParseResult) => {
      draft.currentKey = key;
      delete draft.currentJobs; // section change resets job grouping
      draft.data[key] = [];
    });
  }

  const entry = line.match(EntryLinePattern);
  if (entry) {
    const { jobs, tip } = entry.groups ?? {};

    return produce(result, (draft: ParseResult) => {
      const section = draft.data[draft.currentKey];

      // if the job has changed
      if (jobs !== result.currentJobs) {
        // create a new tips group
        section.push({ jobs: parseEnkibotJobTags(jobs), tips: [] });

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
export const parseEnkibotJobTags = (jobs: string) =>
  jobs?.split(JOB_TAGS_SEPARATOR).map((j) => j.split(JOB_TAGS_COMBINATOR));
