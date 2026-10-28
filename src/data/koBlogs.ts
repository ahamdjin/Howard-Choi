import type { Translation } from "./fullBlogTranslations";
import { additionalBlogLocales } from "./additionalBlogLocales";
import { fullBlogTranslation, localizedBlogTiming } from "./fullBlogTranslations";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";

export type KoreanBlogSection = { heading: string; paragraphs: string[] };
export type KoreanBlogPost = {
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
  leadParagraphs?: string[];
  sections: KoreanBlogSection[];
};

const basekoBlogPosts: Omit<KoreanBlogPost, "intro" | "takeaway" | "sections">[] = [
  {
    slug: "california-comparative-fault-personal-injury",
    title: "캘리포니아 비교과실: 나에게도 일부 과실이 있다면?",
    excerpt: "캘리포니아 비교과실이 개인상해 배상에 어떤 영향을 주는지, 과실 비율이 어떻게 회복액을 줄일 수 있는지, 어떤 증거가 중요한지 설명합니다.",
    category: "과실·보험",
    date: "2026년 9월 14일",
    publishedAt: "2026-09-14",
    readingTime: "약 7분",
    image: heroCourthouse,
    alt: "캘리포니아 법원 내부",
  },
  {
    slug: "how-much-is-my-personal-injury-case-worth-california",
    title: "캘리포니아 개인상해 사건은 얼마나 가치가 있을까요?",
    excerpt: "치료비, 향후 치료, 임금 손실, 비경제적 손해, 과실, 보험, 유치권과 증거가 개인상해 사건 가치에 어떤 영향을 줄 수 있는지 설명합니다.",
    category: "사건 가치",
    date: "2026년 9월 13일",
    publishedAt: "2026-09-13",
    readingTime: "약 8분",
    image: heroJusticeLibrary,
    alt: "정의의 여신상과 법률 서적",
  },
  {
    slug: "uber-lyft-accident-insurance-california",
    title: "캘리포니아 우버·리프트 사고 보험: 어떤 보장이 적용될까요?",
    excerpt: "캘리포니아 승차공유 보험 기간, 운전자의 앱 상태가 중요한 이유와 우버·리프트 사고 후 보존해야 할 정보를 설명합니다.",
    category: "우버·리프트 사고",
    date: "2026년 9월 12일",
    publishedAt: "2026-09-12",
    readingTime: "약 7분",
    image: heroCityBoardroom,
    alt: "승차공유 보험 검토를 위한 로펌 회의실",
  },
  {
    slug: "truck-accident-evidence-eld-records-california",
    title: "캘리포니아 트럭 사고 증거: ELD와 회사 기록",
    excerpt: "상업용 트럭 사고에서 전자운행기록장치, 운행시간, 정비·점검, 차량 영상과 회사 기록이 왜 중요할 수 있는지 설명합니다.",
    category: "트럭 사고",
    date: "2026년 9월 11일",
    publishedAt: "2026-09-11",
    readingTime: "약 8분",
    image: heroLawOffice,
    alt: "상업용 트럭 사고 증거를 검토하는 법률 사무실",
  },
  {
    slug: "california-personal-injury-deadlines",
    title: "캘리포니아 개인상해 소송 기한: 얼마나 시간이 있나요?",
    excerpt: "캘리포니아 개인상해의 일반적인 2년 기한, 공공기관 청구의 더 짧은 절차, 재산손해 기한과 예외가 왜 중요한지 설명합니다.",
    category: "캘리포니아 상해법",
    date: "2026년 9월 10일",
    publishedAt: "2026-09-10",
    readingTime: "약 7분",
    image: heroCourthouse,
    alt: "개인상해 소송 기한을 설명하는 캘리포니아 법원",
  },
  {
    slug: "what-to-do-after-a-car-accident-in-california",
    title: "캘리포니아 자동차 사고 후 해야 할 일",
    excerpt: "사고 후 치료, 현장 증거, 보험 연락, 임금 손실, 법적 기한과 보존해야 할 기록을 정리한 실용적인 체크리스트입니다.",
    category: "자동차 사고",
    date: "2026년 9월 3일",
    publishedAt: "2026-09-03",
    readingTime: "약 8분",
    image: heroLawOffice,
    alt: "법률 서적과 책상이 있는 로펌 사무실",
  },
  ];

const translationModules = import.meta.glob("./blog-translations/*.ko.json", { eager: true, import: "default" }) as Record<string, Translation>;

export const koBlogPosts = basekoBlogPosts.map((post) => ({ ...post, ...fullBlogTranslation(post.slug, "ko", translationModules), ...localizedBlogTiming(post.slug, "ko") })).concat(additionalBlogLocales("ko", translationModules));

export const getKoBlogBySlug = (slug: string) => koBlogPosts.find((post) => post.slug === slug);
