import { ArrowUpRight, MapPin } from "lucide-react";
import { brand, type SiteLocale } from "@/data/injurySite";

const DirectAccess = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  return (
    <section aria-labelledby="home-attorney-heading" className="!min-h-0 bg-[#171717] py-14 text-white md:py-20">
      <div className="site-shell grid w-full items-center gap-9 md:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <h2 id="home-attorney-heading" className="editorial-serif max-w-[650px] text-[clamp(2.5rem,4.2vw,4.5rem)] leading-[1.02] text-white">
            {ko ? "Howard Choi 변호사와 직접 소통하세요" : es ? "Hable directamente con Howard Choi" : "Work directly with Howard Choi"}
          </h2>
          <p className="mt-6 max-w-[550px] text-[16px] leading-7 text-white/85">
            {ko
              ? "첫 상담부터 사건이 마무리될 때까지 Howard Choi 변호사가 함께합니다. 보험사가 과실을 다투거나 합의안을 제시하면 무엇이 달라졌는지, 어떤 선택지가 있는지 설명합니다."
              : es
                ? "Howard sigue involucrado desde la primera consulta hasta que se resuelve su caso. Si la aseguradora cuestiona la responsabilidad o presenta una oferta, él le explica qué cambió y qué opciones tiene."
                : "Howard stays involved from your first consultation through the resolution of your case. If the insurer disputes fault or makes an offer, he explains what changed, what it means for your claim, and what options you have."}
          </p>
          <p className="mt-4 max-w-[550px] text-[15px] leading-6 text-white/70">
            {ko ? "Howard Choi는 캘리포니아 현직 변호사로 State Bar No. 284364이며 2012년에 등록되었습니다. Santa Ana의 William Howard Taft University에서 공부했으며 영어와 한국어를 구사합니다." : es ? "Howard Choi es un abogado activo de California, State Bar No. 284364, admitido en 2012. Estudió en William Howard Taft University en Santa Ana y habla inglés y coreano." : "Howard Choi is an active California lawyer, Bar No. 284364, admitted in 2012. He attended William Howard Taft University in Santa Ana and speaks English and Korean."}
          </p>
          {locale === "en" && <p className="mt-5 max-w-[550px] border-l-2 border-[#bcaa93] pl-4 text-[15px] leading-7 text-white/85">
            If the firm takes your case, Howard is the lawyer handling it.
            {" "}<a className="text-white underline underline-offset-4" href="/about#attorney">Read how you’ll work with Howard</a>.
          </p>}
          <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-0">
            <a href={`${prefix}/attorney`} className="inline-flex min-h-11 items-center gap-2 text-[13px] font-medium text-white underline underline-offset-4">{ko ? "변호사 전체 프로필" : es ? "Perfil completo del abogado" : "Meet Howard Choi"} <ArrowUpRight className="h-3.5 w-3.5"/></a>
            <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-[13px] text-white/75 underline underline-offset-4 transition-colors hover:text-white">{ko ? "State Bar에서 확인" : es ? "Verificar con el State Bar" : "Verify with the State Bar"} <ArrowUpRight className="h-3.5 w-3.5"/></a>
          </div>
        </div>
        <div className="w-full max-w-[460px] rounded-[3px] bg-[#f3eee5] text-[#211d18] p-6 sm:p-9 md:ml-auto">
          <MapPin aria-hidden="true" className="mb-4 h-5 w-5 text-[#746451]" />
          <h3 className="editorial-serif text-3xl">{ko ? "부에나파크 사무실" : es ? "Oficina de Buena Park" : "Buena Park office"}</h3>
          <address className="mt-3 text-base not-italic leading-6">{brand.address}</address>
          <p className="mt-4 border-t border-black/15 pt-4 text-sm leading-6">
            {ko ? "방문 전 전화로 상담 시간과 찾아오는 방법을 문의하세요." : es ? "Antes de venir, llame para coordinar la visita y pedir indicaciones." : "Call before your visit to arrange a time and ask how to find the suite."}
          </p>
          <a href={brand.phoneHref} className="inline-flex min-h-11 items-center pr-5 font-medium underline underline-offset-4">{brand.phoneDisplay}</a>
          <a href={brand.mapsHref} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4">
            {ko ? "Google 지도에서 길찾기" : es ? "Cómo llegar en Google Maps" : "Get directions on Google Maps"} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
export default DirectAccess;
