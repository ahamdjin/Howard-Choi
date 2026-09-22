import { ArrowUpRight, Quote } from "lucide-react";
import attorneyPortrait from "@/assets/law-firm/lead-counsel.avif";
import type { SiteLocale } from "@/data/injurySite";

// The "Experience" in E-E-A-T: a first-person observation from the attorney
// about what actually goes wrong in this kind of case. It is the one thing on
// the page a competitor cannot copy, and the reason these pages read as a firm
// rather than an encyclopedia.
//
// IMPORTANT: this text is published in Howard Choi's own voice and attributed
// to him by name. Anything added here has to be approved by him first.
const AttorneyNote = ({ note, locale = "en" }: { note: string; locale?: SiteLocale }) => {
  const ko = locale === "ko";
  return (
    <figure className="my-2 rounded-[4px] border-l-2 border-[#7b5b3e] bg-[#f3eee5] p-6 md:p-8">
      <Quote aria-hidden="true" className="h-5 w-5 stroke-[1.4] text-[#7b5b3e]" />
      <blockquote className="mt-4 text-[15px] leading-[1.75] text-[#2b2620] md:text-[16px]">{note}</blockquote>
      <figcaption className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#211c17]/12 pt-5">
        <img
          src={attorneyPortrait}
          alt={ko ? "Howard Choi 변호사" : "Howard Choi, California personal injury attorney"}
          loading="lazy"
          decoding="async"
          className="h-10 w-10 shrink-0 rounded-full object-cover object-center"
        />
        <span className="text-[12px] leading-4">
          <span className="block font-medium text-[#211c17]">Howard Choi</span>
          <span className="text-[#211c17]/55">
            {ko ? "캘리포니아 변호사 · 번호 284364" : "California attorney · State Bar No. 284364"}
          </span>
        </span>
        <a
          href={`${ko ? "/ko" : ""}/attorney`}
          className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          {ko ? "프로필" : "Profile"} <ArrowUpRight className="h-3 w-3" />
        </a>
      </figcaption>
    </figure>
  );
};

export default AttorneyNote;
