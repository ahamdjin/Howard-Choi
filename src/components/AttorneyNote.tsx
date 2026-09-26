import { ArrowUpRight, Quote } from "lucide-react";
import attorneyPortrait from "@/assets/law-firm/lead-counsel.avif";
import type { SiteLocale } from "@/data/injurySite";

const AttorneyNote = ({ note, locale = "en" }: { note: string; locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  return (
    <figure className="my-2 rounded-[4px] border-l-2 border-[#7b5b3e] bg-[#f3eee5] p-6 md:p-8">
      <Quote aria-hidden="true" className="h-5 w-5 stroke-[1.4] text-[#7b5b3e]" />
      <blockquote className="mt-4 text-[15px] leading-[1.75] text-[#2b2620] md:text-[16px]">{note}</blockquote>
      <figcaption className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#211c17]/12 pt-5">
        <img src={attorneyPortrait} alt={ko ? "Howard Choi 변호사" : es ? "Howard Choi, abogado de lesiones personales en California" : "Howard Choi, California personal injury attorney"} loading="lazy" decoding="async" className="h-10 w-10 shrink-0 rounded-full object-cover object-center" />
        <span className="text-[12px] leading-4"><span className="block font-medium text-[#211c17]">Howard Choi</span><span className="text-[#211c17]/55">{ko ? "캘리포니아 변호사 · 번호 284364" : es ? "Abogado de California · State Bar No. 284364" : "California attorney · State Bar No. 284364"}</span></span>
        <a href={`${prefix}/attorney`} className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium underline underline-offset-4 transition-opacity hover:opacity-60">{ko ? "프로필" : es ? "Perfil" : "Profile"} <ArrowUpRight className="h-3 w-3" /></a>
      </figcaption>
    </figure>
  );
};

export default AttorneyNote;
