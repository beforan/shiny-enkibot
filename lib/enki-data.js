/** Parse Enkibot Markdown data into a JSON hierarchy we can use */

import produce from "immer";

const ENKI_DATA_URL = "https://enkibot-prime.herokuapp.com/debug/";
const JOB_TAGS_SEPARATOR = "|";
const JOB_TAGS_COMBINATOR = "+";

// these are noted here for clarity, but are currently hardcoded in the regex patterns below
// const SECTION_IDENTIFIER = "##";
// const ENTRY_IDENTIFIER = "*";
// const JOB_TAGS_OPEN = "[";
// const JOB_TAGS_CLOSE = "]";

const XplatNewLine = /\r?\n/;

const SectionLinePattern = /^## (?<key>.+)/;
const EntryLinePattern = /^^\* (?:\[(?<jobs>.+)\] )?(?<tip>.+)/;

/**
 * Fetch Enkibot's full debug dataset as markdown
 */
const FetchFullData = async () =>
  (
    await fetch(ENKI_DATA_URL, {
      method: "POST",
    })
  ).text();

/**
 * Parse the markdown from Enkibot into a JSON object
 * @param {*} data Markdown from Enkibot
 */
const Parse = (data) =>
  data.split(XplatNewLine).reduce(ParseLine, { currentKey: "", data: {} }).data;

/**
 * Parse a single line of Enkibot Data, adding the result to the accumulated parse result
 * @param {*} result The result of all lines parsed so far
 * @param {*} line The current line
 * @param {*} order a value to represent the relative position of this line to others,
 * e.g. line number
 */
const ParseLine = (result, line) => {
  // new sections as keys
  // track the key we're under
  const section = line.match(SectionLinePattern);
  if (section) {
    const { key } = section.groups;
    return produce(result, (draft) => {
      draft.currentKey = key;
      delete draft.currentJobs; // section change resets job grouping
      draft.data[key] = [];
    });
  }

  const entry = line.match(EntryLinePattern);
  if (entry) {
    const { jobs, tip } = entry.groups;

    return produce(result, (draft) => {
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
export const parseEnkibotJobTags = (jobs) =>
  jobs?.split(JOB_TAGS_SEPARATOR).map((j) => j.split(JOB_TAGS_COMBINATOR));

/**
 * Get all Enkibot data as structured JSON
 */
export const getEnkibotJson = async () => Parse(await FetchFullData());
