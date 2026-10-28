import { blogPosts } from "./blogs";

export type Translation = {
  intro: string; takeaway: string; leadParagraphs: string[];
  sections: Array<{ heading: string; paragraphs: string[] }>;
  sourceHash: string; reviewStatus: string;
};


export function fullBlogTranslation(slug: string, locale: "ko" | "es", modules: Record<string, Translation>) {
  const translation = modules[`./blog-translations/${slug}.${locale}.json`];
  if (!translation) throw new Error(`Missing full translation: ${slug}/${locale}`);
  const master = blogPosts.find((post) => post.slug === slug);
  if (!master) throw new Error(`Translation has no published master: ${slug}`);
  if (translation.sections.length !== master.sections.length ||
      translation.leadParagraphs.length !== master.leadParagraphs.length ||
      translation.sections.some((section, i) => section.paragraphs.length !== master.sections[i].paragraphs.length)) {
    throw new Error(`Incomplete translated article: ${slug}/${locale}`);
  }
  return { intro: translation.intro, takeaway: translation.takeaway, leadParagraphs: translation.leadParagraphs, sections: translation.sections };
}

export function localizedBlogTiming(slug: string, locale: "ko" | "es") {
  const master = blogPosts.find((post) => post.slug === slug);
  if (!master) throw new Error(`Missing article master: ${slug}`);
  const minutes = Number.parseInt(master.readingTime, 10);
  return { publishedAt: master.publishedAt, updatedAt: master.updatedAt,
    date: new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "es-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${master.publishedAt}T00:00:00Z`)),
    readingTime: locale === "ko" ? `약 ${minutes}분` : `${minutes} min`,
  };
}
