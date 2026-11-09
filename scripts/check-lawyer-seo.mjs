import { readFileSync } from "node:fs";

const read = (name) => readFileSync(name, "utf8");
const failures = [];
const check = (condition, description) => {
  if (!condition) failures.push(description);
};
const homepage = read("src/routes/index.tsx");
const profile = read("src/routes/attorney.tsx");
const service = read("src/routes/practice-areas.$slug.tsx");
const navigation = read("src/components/SiteNavigation.tsx");
const footer = read("src/components/Footer.tsx");
const hero = read("src/components/Hero.tsx");
const en = read("src/data/citySearchFocus.ts");
const ko = read("src/data/locationGuidesKo.ts");
const es = read("src/data/locationGuidesEs.ts");
const cityPage = read("src/pages/EditorialLocationPages.tsx");
const headings = read("src/pages/editorial/AttorneyPage.tsx");
const directory = read("src/routes/practice-areas.index.tsx");

check(/title: "Buena Park Personal Injury(?: & Car Accident)? Lawyer/.test(homepage), "Homepage must target the Semrush Buena Park personal injury lawyer cluster");
check(!/Car Accident Attorney/i.test(homepage), "Homepage must not target Car Accident Attorney");
check(/title: "Howard Choi \| Buena Park Personal Injury Lawyer"/.test(profile), "Lawyer profile needs keyword-aligned title");
check(/attorneys: "Lawyer"/.test(navigation), "English navigation must label profile Lawyer");
check(/>Lawyer<\/Link>/.test(footer), "English footer must label profile Lawyer");
check(/Personal Injury(?: & Car Accident)? Lawyer · Buena Park, California/.test(hero), "Homepage hero requires lawyer terminology");
check(/"Personal Injury Lawyer"/.test(headings), "Profile page should identify Personal Injury Lawyer");
check(/Our Practice Areas|Personal Injury Services in Buena Park/.test(directory), "Practice directory must identify the service directory separately from the main lawyer page");
check(/search\.heading/.test(cityPage), "City H1s must describe injury and accident representation");

// Messaging supplies the live metadata. Validate the current source rather than
// searching the former literal title table, now derived with Object.fromEntries.
const messaging = read("src/data/practicePageMessaging.ts");
const slugs = [
  "car-accidents", "truck-accidents", "motorcycle-accidents", "pedestrian-accidents",
  "rideshare-accidents", "slip-and-fall", "wrongful-death", "serious-injuries", "personal-injury"
];
const serviceTitles = [];
for (const slug of slugs) {
  const key = JSON.stringify(slug) + ":";
  const start = messaging.indexOf(key);
  const block = start >= 0 ? messaging.slice(start).split('"es":')[0] : "";
  const title = block.match(/"title": "([^"]+)"/)?.[1];
  const description = block.match(/"description": "([^"]+)"/)?.[1];
  check(Boolean(title && /accident|injur|crash|slip|fall|death|rideshare|walking|pedestrian/i.test(title)), `Service ${slug} needs descriptive case-specific metadata`);
  check(Boolean(description?.includes("Buena Park") && description.includes("Howard Choi")), `Service ${slug} needs firm and locality context`);
  check(Boolean(title?.includes("Free Consultation")), `Service ${slug} must retain the consultation offer`);
  if (title) serviceTitles.push(title);
}
check(new Set(serviceTitles).size === slugs.length, "Service titles must be unique");
const targets = [
  [en, "en", /heading: "([^"]+)"/g, (title) => /Lawyer/.test(title)],
  [ko, "ko", /seoTitle: "([^"]+)"/g, (title) => title.includes("변호사")],
  [es, "es", /seoTitle: "([^"]+)"/g, (title) => title.includes("Abogado")]
];
for (const [source, locale, regex, meets] of targets) {
  const titles = [...source.matchAll(regex)].map((match) => match[1]);
  check(titles.length === 10, `Expected ten ${locale} city SEO titles, got ${titles.length}`);
  check(new Set(titles).size === 10, `City SEO titles need to be distinct in ${locale}`);
  check(titles.slice(1).every(meets), `City titles need the localized lawyer term in ${locale}`);
  check(!titles.some((title) => /\bAttorney\b/i.test(title)), `No city title should say Attorney in ${locale}`);
}
check(read("src/routes/es.locations.$slug.tsx").includes("noindex: true"), "Keep Spanish city noindex");
check(read("src/routes/es.practice-areas.$slug.tsx").includes("noindex: true"), "Keep Spanish service noindex");

if (failures.length) {
  for (const failure of failures) console.error("FAIL:", failure);
  process.exitCode = 1;
} else {
  console.log("Lawyer-oriented service and location SEO checks passed.");
}
