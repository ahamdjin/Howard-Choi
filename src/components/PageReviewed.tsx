import type { SiteLocale } from "@/data/injurySite";

const LAST_REVIEWED = { iso: "2026-09-22", en: "September 2026", ko: "2026년 9월", es: "septiembre de 2026" };

const PageReviewed = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  return (
    <div className="border-t border-[#1E1C1A]/10 pt-5 text-[11px] leading-5 text-[#1E1C1A]/45">
      {ko ? "검토: " : es ? "Revisado por " : "Reviewed by "}
      <a href={`${prefix}/attorney`} className="underline underline-offset-4 hover:text-[#1E1C1A]">Howard Choi</a>
      {ko ? ", 캘리포니아 변호사 번호 284364 · 최종 검토 " : es ? ", California Bar No. 284364 · Última revisión " : ", California Bar No. 284364 · Last reviewed "}
      <time dateTime={LAST_REVIEWED.iso}>{ko ? LAST_REVIEWED.ko : es ? LAST_REVIEWED.es : LAST_REVIEWED.en}</time>
    </div>
  );
};

export default PageReviewed;
