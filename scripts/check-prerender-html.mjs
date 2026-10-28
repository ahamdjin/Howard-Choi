import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
const root = path.resolve(".output/public");
let checked = 0;
for (const entry of await readdir(root, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
  const file = path.join(entry.parentPath, entry.name);
  if ((await readFile(file)).includes(0)) throw new Error(`Invalid NUL character in prerendered HTML: ${file}`);
  checked++;
}
console.log(`Verified ${checked} prerendered HTML files contain no NUL characters.`);
