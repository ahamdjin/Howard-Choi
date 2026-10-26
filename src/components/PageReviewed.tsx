import type { SiteLocale } from "@/data/injurySite";

// Do not imply attorney review occurred on a particular date unless the
// page's actual signed-off review date is supplied by its route/content owner.
type ReviewDate = { iso: string; en: string; ko: string; es: string };

const PageReviewed = ({ locale = "en", reviewedAt }: { locale?: SiteLocale; reviewedAt?: ReviewDate }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  return (
    <div className="border-t border-[#1E1C1A]/10 pt-5 text-[11px] leading-5 text-[#1E1C1A]/55">
      <span>{reviewedAt ? ko ? "변호사 검토: " : es ? "Revisado por el abogado: " : "Attorney reviewed: " : ko ? "변호사 정보: " : es ? "Información del abogado: " : "Attorney information: "}</span>
      <a href={`${prefix}/attorney`} className="underline underline-offset-4 hover:text-[#1E1C1A]">Howard Choi</a>
      <span>{ko ? " · 캘리포니아 변호사 등록번호 284364" : es ? " · Colegio de Abogados de California n.º 284364" : " · California State Bar No. 284364"}</span>
      {reviewedAt && <> · <time dateTime={reviewedAt.iso}>{reviewedAt[locale]}</time></>}
      <span> · </span>
      <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#1E1C1A]">
        {ko ? "공식 등록 정보" : es ? "Verificar registro" : "Verify credentials"}
      </a>
    </div>
  );
};

export default PageReviewed;
