import fs from "fs";
import path from "path";

export const readMarkdownFile = async (filePath) =>
  fs.readFileSync(path.resolve(process.cwd(), filePath)).toString();
