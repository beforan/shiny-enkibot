/** Parse Enkibot Markdown data into a JSON hierarchy we can use */

import produce from "immer";

const ENKI_DATA_URL = "https://enkibot.herokuapp.com/debug/";
const SECTION_IDENTIFIER = "##";
const ENTRY_IDENTIFIER = "*";
const JOB_TAGS_OPEN = "[";
const JOB_TAGS_CLOSE = "]";
const JOB_TAGS_SEPARATOR = "|";
const JOB_TAGS_COMBINATOR = "+";

const XplatNewLine = /\r?\n/;

const SectionLinePattern = /^## (?<key>.+)/;
const EntryLinePattern = /^^\* (?:\[(?<jobs>.+)\] )?(?<body>.+)/;

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
const ParseLine = (result, line, order) => {
  // new sections as keys
  // track the key we're under
  const section = line.match(SectionLinePattern);
  console.log(line);
  console.log(section);
  if (!!section) {
    const { key } = section.groups;
    return produce(result, (draft) => {
      draft.currentKey = key;
      draft.data[key] = {};
    });
  }

  const entry = line.match(EntryLinePattern);
  if (!!entry) {
    const { jobs, body } = entry.groups;
    return produce(result, (draft) => {
      const section = draft.data[draft.currentKey];
      const jobsKey = jobs ?? "*";
      section[jobsKey] = [
        ...(section[jobsKey] ?? []),
        {
          body,
          //jobs: jobs ? parseEnkibotJobTags(jobs) : undefined,
          order,
        },
      ];
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
  jobs.split(JOB_TAGS_SEPARATOR).map((j) => j.split(JOB_TAGS_COMBINATOR));

/**
 * Get all Enkibot data as structured JSON
 */
export const getEnkibotJson = async () => Parse(await FetchFullData());
