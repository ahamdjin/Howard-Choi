// Move one literal city object into its own editable English master without
// rewording it. Run once per city as its individual experience pass begins.
import ts from 'typescript';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const slug = process.argv[2];
if (!/^[a-z]+(?:-[a-z]+)*$/.test(slug ?? '')) throw new Error('Pass one location slug.');
const target = `src/data/locations/${slug}.en.json`;
if (existsSync(target)) throw new Error(`Preserving existing master: ${target}`);
const path = 'src/data/additionalLocations.ts';
const source = readFileSync(path, 'utf8');
const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true);
let city;
function visit(node) {
  if (ts.isObjectLiteralExpression(node) && node.properties.some(p => ts.isPropertyAssignment(p) && p.name.getText(file) === 'slug' && ts.isStringLiteral(p.initializer) && p.initializer.text === slug)) city = node;
  ts.forEachChild(node, visit);
}
visit(file);
if (!city) throw new Error(`Literal city not found: ${slug}`);
function literal(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(p => {
    if (!ts.isPropertyAssignment(p)) throw new Error('Nonliteral property');
    return [ts.isIdentifier(p.name) ? p.name.text : literal(p.name), literal(p.initializer)];
  }));
  throw new Error(`Not literal data: ${node.getText(file).slice(0, 40)}`);
}
const data = literal(city);
const name = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + 'Location';
writeFileSync(target, JSON.stringify(data, null, 2) + '\n');
writeFileSync(path, `import ${name} from "./locations/${slug}.en.json";\n` + source.slice(0, city.getStart(file)) + name + source.slice(city.end));
console.log(`Extracted ${slug}: ${data.sections.length} sections, ${data.sections.reduce((n,s)=>n+s.paragraphs.length,0)} paragraphs, unchanged.`);
