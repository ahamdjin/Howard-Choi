import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

/**
 * Temporary, version-scoped compatibility patch for TanStack Router issue
 * https://github.com/TanStack/router/issues/7775
 *
 * On the server, Script(preventScriptHoist) puts an onLoad handler on an
 * async script so React does not hoist it into <head>. On the client, the
 * pre-hydration branch was missing that same handler, so React tries to hoist
 * the script and loses its matching <body> node, causing React #418 / #423
 * and then a null appendChild in TanStack's preload code.
 *
 * Patch only compiled vendor assets, not library source or application
 * semantics. Keep this guard until the pinned upstream version fixes it.
 */
const vendor = path.resolve("node_modules/@tanstack/react-router");
const candidates = ["dist/esm/Asset.js", "dist/cjs/Asset.cjs"];
let checked = 0;
let patched = 0;

for (const candidate of candidates) {
  const filename = path.join(vendor, candidate);
  if (!existsSync(filename)) continue;
  checked++;
  const original = readFileSync(filename, "utf8");

  if (!original.includes("preventScriptHoist") || !original.includes("noopScriptHandler")) {
    throw new Error(`Unexpected TanStack Asset file: ${candidate} missing script-hoist identifiers`);
  }

  const branch = /if\s*\(!hydrated\)\s*\{\s*if\s*\(attrs\?\.src\)\s*\{\s*return\s*([\s\S]{1,350}?);\s*\}/;
  const match = branch.exec(original);
  if (!match) {
    throw new Error(`TanStack Script hydration shape changed in ${candidate}; inspect before release`);
  }

  const renderScript = match[1];
  if (renderScript.includes("onLoad: preventScriptHoist")) {
    console.log(`Already patched: ${candidate}`);
    continue;
  }
  if (!renderScript.includes("suppressHydrationWarning") || !renderScript.includes("attrs")) {
    throw new Error(`Unexpected pre-hydration Script render in ${candidate}`);
  }

  const updatedReturn = renderScript.replace(
    /suppressHydrationWarning:\s*true/,
    "onLoad: preventScriptHoist ? noopScriptHandler : void 0, suppressHydrationWarning: true",
  );
  if (updatedReturn === renderScript) {
    throw new Error(`Pre-hydration script guard missing in ${candidate}`);
  }

  const fixed = original.slice(0, match.index) + match[0].replace(renderScript, updatedReturn) + original.slice(match.index + match[0].length);
  if (fixed === original) throw new Error(`Patch did not change ${candidate}`);
  writeFileSync(filename, fixed);
  patched++;
  console.log(`Patched ${candidate}: keep async script in body until hydration`);
}

if (!checked) throw new Error("TanStack router compiled Asset.js not installed");
console.log(`TanStack hydration compatibility check: ${checked} vendor files, ${patched} updated`);
