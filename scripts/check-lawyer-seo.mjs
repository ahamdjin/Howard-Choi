import { readFileSync } from "node:fs";

const read = (name) => readFileSync(name, "utf8");
const failures = [];
const check = (condition, description) => {
  if (!condition) failures.push(description);
};
const homepage = read("src/routes/index.tsx");
const profile = read("src/routes/attorney.tsx");
const service = read("src/routes/practice-areas_.$slug.tsx");
const navigation = read("src/components/SiteNavigation.tsx");
const footer = read("src/components/Footer.tsx");
const hero = read("src/components/Hero.tsx");
const en = read("src/data/locationGuidesEn.ts");
const ko = read("src/data/locationGuidesKo.ts");
const es = read("src/data/locationGuidesEs.ts");
const cityPage = read("src/pages/EditorialLocationPages.tsx");
const headings = read("src/pages/editorial/AttorneyPage.tsx");
const directory = read("src/routes/practice-areas.tsx");

check(/title: "Buena Park Personal Injury Lawyer/.test(homepage), "Homepage must target Personal Injury Lawyer");
check(!/Car Accident Attorney/i.test(homepage), "Homepage must not target Car Accident Attorney");
check(/title: "Howard Choi \| Buena Park Personal Injury Lawyer"/.test(profile), "Lawyer profile needs keyword-aligned title");
check(/attorneys: "Lawyer"/.test(navigation), "English navigation must label profile Lawyer");
check(/>Lawyer<\/Link>/.test(footer), "English footer must label profile Lawyer");
check(/Personal Injury Lawyer · Buena Park, California/.test(hero), "Homepage hero requires lawyer terminology");
check(/"Personal Injury Lawyer"/.test(headings), "Profile page should identify Personal Injury Lawyer");
check(/Personal Injury Lawyer \| Practice Areas/.test(directory), "Practice directory should target Lawyer");
check(/\x60\$\{name\} Personal Injury Lawyer\x60/.test(cityPage), "City H1s must describe Personal Injury Lawyer");

const serviceSeoTable = service.slice(service.indexOf("const serviceSeo:"));
const slugs = [
  "car-accidents", "truck-accidents", "motorcycle-accidents", "pedestrian-accidents",
  "rideshare-accidents", "slip-and-fall", "wrongful-death", "serious-injuries"
];
for (const slug of slugs) {
  const key = '\u0022' + slug + '\u0022';
  const start = serviceSeoTable.indexOf(key);
  const title = start >= 0 ? serviceSeoTable.slice(start, start + 230).match(/title: "([^"]+)"/)?.[1] : null;
  check(Boolean(title?.includes("Lawyer")), `Service ${slug} needs a Lawyer title`);
  check(!/Attorney/i.test(title || ""), `Service ${slug} title must not use Attorney`);
}
const targets = [
  [en, "en", /seoTitle: "([^"]+)"/g, (title) => /Personal Injury Lawyer/.test(title)],
  [ko, "ko", /seoTitle: "([^"]+)"/g, (title) => title.includes("변호사")],
  [es, "es", /seoTitle: "([^"]+)"/g, (title) => title.includes("Abogado")]
];
for (const [source, locale, regex, meets] of targets) {
  const titles = [...source.matchAll(regex)].map((match) => match[1]);
  check(titles.length === 10, `Expected ten ${locale} city SEO titles, got ${titles.length}`);
  check(new Set(titles).size === 10, `City SEO titles need to be distinct in ${locale}`);
  check(titles.every(meets), `City titles need the localized lawyer term in ${locale}`);
  check(!titles.some((title) => /\bAttorney\b/i.test(title)), `No city title should say Attorney in ${locale}`);
}
check(read("src/routes/es_.locations_.$slug.tsx").includes("noindex: true"), "Keep Spanish city noindex");
check(read("src/routes/es_.practice-areas_.$slug.tsx").includes("noindex: true"), "Keep Spanish service noindex");

if (failures.length) {
  for (const failure of failures) console.error("FAIL:", failure);
  process.exitCode = 1;
} else {
  console.log("Lawyer-oriented service and location SEO checks passed.");
}
