import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

// TanStack Start/Nitro emits different static directories depending on its
// deployment preset. GitHub's Node build uses .output/public; Nitro's Vercel
// preset writes prerendered HTML to .vercel/output/static.
const outputRoots = [".output/public", ".vercel/output/static"];
let checked = 0;
let scanned = 0;
let koreanChecked = 0;

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
    const html = await readFile(file, "utf8");
    if (html.includes("\0")) {
      throw new Error(`Invalid NUL character in prerendered HTML: ${file}`);
    }
    const head = html.split("</head>")[0];
    const relative = path.relative(root, file).split(path.sep);
    if (relative[0] === "ko" || relative[0] === "ko.html") {
      for (const name of ["robots", "googlebot"]) {
        const tags = head.match(/<meta\b[^>]*>/gi) || [];
        if (!tags.some(tag => tag.includes(`name="${name}"`) && /content="noindex, follow"/.test(tag))) {
          throw new Error(`Korean noindex policy missing for ${name}: ${file}`);
        }
      }
      koreanChecked++;
    }
    if ((head.match(/<link\b[^>]*>/gi) || []).some(tag => /hreflang="(?:ko|es)(?:-[^"]+)?"/i.test(tag))) {
      throw new Error(`Noindex language appears in indexed hreflang links: ${file}`);
    }
    checked++;
  }
}

if (!scanned || !checked) {
  throw new Error("No prerendered HTML found in Nitro or Vercel output; verify prerender configuration.");
}
console.log(`Verified ${checked} prerendered HTML files contain no NUL characters.`);

console.log(`Verified noindex, follow on ${koreanChecked} Korean pages and no noindex-language hreflang links.`);
