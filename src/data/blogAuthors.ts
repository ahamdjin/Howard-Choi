import portrait from "@/assets/law-firm/lead-counsel.avif";
import type { SiteLocale } from "@/data/injurySite";

export type BlogAuthor = {
  id: string;
  name: string;
  profilePath: string;
  image: string;
  role: Record<SiteLocale, string>;
  bio: Record<SiteLocale, string>;
  credentials: { label: string; value: string; url: string }[];
  sameAs: string[];
};

export const blogAuthors: Record<string, BlogAuthor> = {
  "howard-choi": {
    id: "howard-choi",
    name: "Howard Choi",
    profilePath: "/attorney",
    image: portrait,
    role: { en: "California Personal Injury Lawyer", es: "Abogado de lesiones personales en California", ko: "캘리포니아 개인상해 변호사" },
    bio: {
      en: "Howard Choi represents people injured in accidents from his Buena Park office. His practice focuses on personal injury claims. View his attorney profile for credentials and professional background.",
      es: "Howard Choi representa a personas lesionadas en accidentes desde su oficina en Buena Park. Su práctica se centra en reclamos por lesiones personales. Consulte su perfil para conocer sus credenciales y trayectoria profesional.",
      ko: "Howard Choi 변호사는 부에나파크 사무실에서 사고로 다친 분들을 대리하며 개인상해 청구를 다룹니다. 자격과 경력은 변호사 프로필에서 확인하세요.",
    },
    credentials: [{ label: "State Bar of California", value: "284364", url: "https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" }],
    sameAs: ["https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364", "https://www.avvo.com/attorneys/90621-ca-howard-choi-4229558.html"],
  },
};

export const DEFAULT_BLOG_AUTHOR_ID = "howard-choi";
// Assign a different registered author by article slug here. Translations inherit
// the same identity. Never infer authorship or review from an update timestamp.
export const articleAuthorIds: Record<string, string> = {};

export function getBlogAuthor(slug?: string): BlogAuthor {
  const id = (slug && articleAuthorIds[slug]) || DEFAULT_BLOG_AUTHOR_ID;
  const author = blogAuthors[id];
  if (!author) throw new Error(`Unknown blog author: ${id}`);
  return author;
}

export const authorProfilePath = (author: BlogAuthor, locale: SiteLocale) =>
  (locale === "en" ? "" : `/${locale}`) + author.profilePath;
