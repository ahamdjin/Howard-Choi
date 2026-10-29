import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

// TanStack Start/Nitro emits different static directories depending on its
// deployment preset. GitHub's Node build uses .output/public; Nitro's Vercel
// preset writes prerendered HTML to .vercel/output/static.
const outputRoots = [".output/public", ".vercel/output/static"];
let checked = 0;
let scanned = 0;

for (const output of outputRoots) {
  const root = path.resolve(output);
  let entries;
  try {
    entries = await readdir(root, { recursive: true, withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") continue;
    throw error;
  }
  scanned++;
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    const file = path.join(entry.parentPath, entry.name);
    if ((await readFile(file)).includes(0)) {
      throw new Error(`Invalid NUL character in prerendered HTML: ${file}`);
    }
    checked++;
  }
}

if (!scanned || !checked) {
  throw new Error("No prerendered HTML found in Nitro or Vercel output; verify prerender configuration.");
}
console.log(`Verified ${checked} prerendered HTML files contain no NUL characters.`);
