import { ArrowUpRight } from "lucide-react";
import attorneyPortrait from "@/assets/law-firm/lead-counsel.avif";
import type { SiteLocale } from "@/data/injurySite";

// Answers the "Who is responsible for this content?" question that Google's
// helpful-content guidance asks of every page. Legal content is YMYL, so a
// named, verifiable reviewer matters more here than on an ordinary site.
// The link goes to /attorney, which carries the State Bar verification link —
// deliberately not duplicating that external link onto all eighteen pages.
const LAST_REVIEWED = { iso: "2026-09-22", en: "September 2026", ko: "2026년 9월" };

const PageByline = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-[#1E1C1A]/12 py-4">
      <a href={`${ko ? "/ko" : ""}/attorney`} className="group flex items-center gap-3">
        <img
          src={attorneyPortrait}
          alt={ko ? "Howard Choi 변호사" : "Howard Choi, California personal injury attorney"}
          loading="lazy"
          decoding="async"
          className="h-9 w-9 shrink-0 rounded-full object-cover object-center"
        />
        <span className="text-[12px] leading-4">
          <span className="block text-[10px] uppercase tracking-[0.14em] text-[#1E1C1A]/42">
            {ko ? "검토" : "Reviewed by"}
          </span>
          <span className="font-medium text-[#1E1C1A] underline-offset-4 group-hover:underline">
            Howard Choi
            <span className="ml-1.5 font-normal text-[#1E1C1A]/52">
              {ko ? "캘리포니아 변호사 번호 284364" : "California Bar No. 284364"}
            </span>
          </span>
        </span>
        <ArrowUpRight className="h-3 w-3 shrink-0 text-[#1E1C1A]/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>

      <div className="text-[11px] leading-4 text-[#1E1C1A]/45">
        <span className="block text-[10px] uppercase tracking-[0.14em] text-[#1E1C1A]/42">
          {ko ? "최종 검토" : "Last reviewed"}
        </span>
        <time dateTime={LAST_REVIEWED.iso}>{ko ? LAST_REVIEWED.ko : LAST_REVIEWED.en}</time>
      </div>

      <p className="min-w-[200px] flex-1 text-[10px] leading-4 text-[#1E1C1A]/40">
        {ko
          ? "이 페이지는 일반적인 정보 제공용이며 법률 자문이 아닙니다."
          : "General information about California injury claims, not legal advice about your case."}
      </p>
    </div>
  );
};

export default PageByline;
