import fs from "fs/promises";
import path from "path";

export const readMarkdownFile = async (filePath) =>
  (await fs.readFile(path.resolve(process.cwd(), filePath))).toString();
