import type { SiteLocale } from "@/data/injurySite";

// Sits at the foot of the inner pages, not the top. Recovers two signals the
// old top-of-page byline carried: a named, verifiable reviewer (the "who is
// responsible for this content" question Google weighs most on YMYL topics)
// and a machine-readable review date. Deliberately one quiet line.
const LAST_REVIEWED = { iso: "2026-09-22", en: "September 2026", ko: "2026년 9월" };

const PageReviewed = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  return (
    <div className="border-t border-[#1E1C1A]/10 pt-5 text-[11px] leading-5 text-[#1E1C1A]/45">
      {ko ? "검토: " : "Reviewed by "}
      <a href={`${ko ? "/ko" : ""}/attorney`} className="underline underline-offset-4 hover:text-[#1E1C1A]">
        Howard Choi
      </a>
      {ko ? ", 캘리포니아 변호사 번호 284364 · 최종 검토 " : ", California Bar No. 284364 · Last reviewed "}
      <time dateTime={LAST_REVIEWED.iso}>{ko ? LAST_REVIEWED.ko : LAST_REVIEWED.en}</time>
    </div>
  );
};

export default PageReviewed;
