import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";

export type BlogSection = { heading: string; paragraphs: string[] };
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  alt: string;
  intro: string;
  takeaway: string;
  sections: BlogSection[];
};

type BlogFrontmatter = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime?: string;
  image?: string;
  alt?: string;
  intro: string;
  takeaway: string;
  published?: boolean;
};

// Keep the two existing article images exactly as they are today. New CMS posts
// can point at /images/blog/... without changing the rendering components.
const legacyImages: Record<string, string> = {
  "what-to-do-after-a-car-accident-in-california": heroLawOffice,
  "what-an-injury-claim-should-document-beyond-medical-bills": heroCityBoardroom,
};

// Vite expands this at build time. Pages CMS never ships to the public website.
const markdownModules = import.meta.glob("../../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const splitJsonFrontmatter = (raw: string): { data: BlogFrontmatter; body: string } => {
  const source = raw.trimStart();
  if (!source.startsWith("{")) {
    throw new Error("Blog content must start with JSON frontmatter.");
  }

  let depth = 0;
  let inString = false;
  let escaped = false;
  let end = -1;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];

    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }

    if (character === '"') {
      inString = true;
      continue;
    }

    if (character === "{") depth += 1;
    if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        end = index;
        break;
      }
    }
  }

  if (end === -1) {
    throw new Error("Blog JSON frontmatter is not closed.");
  }

  const data = JSON.parse(source.slice(0, end + 1)) as BlogFrontmatter;
  const body = source.slice(end + 1).trim();
  return { data, body };
};

const parseSections = (body: string): BlogSection[] => {
  const sections: BlogSection[] = [];
  let current: BlogSection | null = null;
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (!current || paragraphLines.length === 0) return;
    current.paragraphs.push(paragraphLines.join(" ").trim());
    paragraphLines = [];
  };

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (line.startsWith("## ")) {
      flushParagraph();
      current = { heading: line.slice(3).trim(), paragraphs: [] };
      sections.push(current);
      continue;
    }

    if (!line) {
      flushParagraph();
      continue;
    }

    if (current) paragraphLines.push(line);
  }

  flushParagraph();
  return sections;
};

const formatPublishedDate = (publishedAt: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${publishedAt}T00:00:00Z`));

const estimateReadingTime = (intro: string, body: string) => {
  const words = `${intro} ${body}`.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const parseBlog = (raw: string): BlogPost | null => {
  const { data, body } = splitJsonFrontmatter(raw);
  if (data.published === false) return null;

  const sections = parseSections(body);
  const image = data.image?.trim() || legacyImages[data.slug];

  if (!image) {
    throw new Error(`Blog post "${data.slug}" is missing a featured image.`);
  }

  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    date: formatPublishedDate(data.publishedAt),
    publishedAt: data.publishedAt,
    readingTime: data.readingTime?.trim() || estimateReadingTime(data.intro, body),
    image,
    alt: data.alt?.trim() || data.title,
    intro: data.intro,
    takeaway: data.takeaway,
    sections,
  };
};

export const blogPosts: BlogPost[] = Object.values(markdownModules)
  .map(parseBlog)
  .filter((post): post is BlogPost => Boolean(post))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const getBlogBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);
