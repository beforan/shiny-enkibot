/** Parse Enkibot Markdown data into a JSON hierarchy we can use */

import {
  SECTION_IDENTIFIER,
  ENTRY_IDENTIFIER,
  JOB_TAGS_OPEN,
  JOB_TAGS_CLOSE,
  JOB_TAGS_SEPARATOR,
} from "./config.js";

export const Parse = (data) =>
  data.split("\n").reduce(ParseLine, { currentKey: "", data: {} }).data;

/**
 * Parse a single line, adding the result to the accumulated parse result
 * @param {*} result The result of all lines parsed so far
 * @param {*} line The current line
 */
const ParseLine = (result, line) => {
  // new sections as keys
  // track the key we're under
  if (line.startsWith(SECTION_IDENTIFIER)) {
    const key = line.substring(SECTION_IDENTIFIER.length + 1);
    const data = { ...result.data, [key]: [] };

    return {
      currentKey: key,
      data,
    };
  }

  // entries as values, in order, with job tags
  if (line.startsWith(ENTRY_IDENTIFIER)) {
    let trimmed = line.substring(ENTRY_IDENTIFIER.length + 1);

    let jobs;
    if (trimmed.startsWith(JOB_TAGS_OPEN)) {
      const iClose = trimmed.indexOf(JOB_TAGS_CLOSE);
      jobs = trimmed.substring(1, iClose).split(JOB_TAGS_SEPARATOR);
      trimmed = trimmed.substring(iClose + 2);
    }

    result.data[result.currentKey].push({ body: trimmed, jobs });
    return result;
  }

  // no matched case? return result unmodified
  return result;
};
