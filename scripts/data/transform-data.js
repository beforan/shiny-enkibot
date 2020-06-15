import fs from "fs";
import path from "path";
import { FetchFullData } from "./enki-fetcher.js";
import { Parse } from "./enki-parser.js";

// esm doesn't have `__dirname`
let __dirname = path.dirname(new URL(import.meta.url).pathname);
if (process.platform === "win32") __dirname = __dirname.substring(1); // trim the leading slash on windows

console.log("Fetching Enkibot source data...")
FetchFullData().then((data) => {
  fs.mkdirSync(path.join(__dirname, "../../src/built"), { recursive: true });
  fs.writeFileSync(
    path.join(__dirname, "../../src/built/enki.json"),
    JSON.stringify(Parse(data), null, 2)
  );
  console.log("Saved transformed data.")
});
