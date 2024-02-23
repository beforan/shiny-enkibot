import { promises as fs } from "fs";

const liveSource = "https://enkibot-prime.herokuapp.com/debug/";

// What do we need to do with enki data?
//
// 1. Fetch and cache the raw source from enkibot
// 2. Possibly transform it to something easier to index/filter and cache that - e.g. old shiny json
// 3. Provide service methods to provide specific views of the data
//    - per page content that can be job filtered?
//    - job filtered content?
//    - non-page sections e.g. Intro

/** RAW
 *
 * ## Intro
 * * This section is for info and is excluded from route generation?
 * * Lolol
 *
 * ## Class tips
 * * This is actually a page
 * * [WHM] White mages are cool
 * * [BLM] Black mages are... hot?
 * * [WHM] Another white mage fact to test condensing job groups?
 *
 * ## First area
 * * Another page that supports bi-directional nav
 * * [BLM+WHM] Both mages combination test
 *
 * ## Second area
 * * A page to test no forward nav
 * * [WHM|BLM] either/either?
 */
export async function getRawDummyDebugData() {
  return await fs.readFile(
    `${process.cwd()}/data/enkibot-prime_debug.md`,
    "utf8"
  );
}

/** Full Parsed
 *
 * {
 *   "intro": {
 *
 *   }
 * }
 */
