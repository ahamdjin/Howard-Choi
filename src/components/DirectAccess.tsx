import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { ImageStoryCard } from "@/components/editorial/EditorialCards";
import officePhoto from "@/assets/law-firm/buena-park-city-hall.webp";
import { brand, type SiteLocale } from "@/data/injurySite";

const DirectAccess = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  return (
    <section aria-labelledby="home-attorney-heading" className="home-attorney bg-[#171717] py-14 text-white md:py-20">
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
          <p className="mt-5 max-w-[550px] border-l-2 border-[#bcaa93] pl-4 text-[15px] leading-7 text-white/85">
            {ko ? "사무실에서 사건을 맡으면 Howard 변호사가 직접 담당합니다." : es ? "Si el bufete acepta su caso, Howard será el abogado que lo lleve." : "If the firm takes your case, Howard is the lawyer handling it."}
            {" "}<a className="text-white underline underline-offset-4" href={`${prefix}/about#attorney`}>{ko ? "Howard 변호사와 함께 일하는 방식 알아보기" : es ? "Conozca cómo trabajará con Howard" : "Read how you’ll work with Howard"}</a>.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-0">
            <ArrowLink variant="paper" href={`${prefix}/attorney`}>{ko ? "변호사 전체 프로필" : es ? "Perfil completo del abogado" : "Meet Howard Choi"}</ArrowLink>
            <ArrowLink variant="editorial" href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer">{ko ? "State Bar에서 확인" : es ? "Verificar con el State Bar" : "Verify with the State Bar"}</ArrowLink>
          </div>
        </div>
        <div className="home-office">
          <ImageStoryCard
            title={ko ? "부에나파크 사무실" : es ? "Oficina de Buena Park" : "Buena Park office"}
            photo={{ src: officePhoto, width: 960, height: 580, alt: ko ? "부에나파크 시청" : es ? "Ayuntamiento de Buena Park" : "Buena Park City Hall" }}
            link={{ href: brand.mapsHref, target: "_blank", label: ko ? "Google 지도에서 길찾기" : es ? "Cómo llegar en Google Maps" : "Get directions on Google Maps" }}
          >
            <address className="mt-3 text-base not-italic leading-6">{brand.address}</address>
            <p className="mt-4 border-t border-white/25 pt-4 text-sm leading-6">
              {ko ? "방문 전 전화로 상담 시간과 찾아오는 방법을 문의하세요." : es ? "Antes de venir, llame para coordinar la visita y pedir indicaciones." : "Call before your visit to arrange a time and ask how to find the suite."}
            </p>
            <ButtonLink variant="keyline" href={brand.phoneHref} className="mt-4">{brand.phoneDisplay}</ButtonLink>
          </ImageStoryCard>
        </div>
      </div>
    </section>
  );
};
export default DirectAccess;
