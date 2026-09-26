import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import type { SiteLocale } from "@/data/injurySite";
import leadCounselImage from "@/assets/law-firm/lead-counsel.avif";

const DirectAccess = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: .2 });
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  return (
    <section ref={ref} className="flex min-h-[100svh] items-center bg-[#171717] py-16 text-white md:py-20 lg:py-0">
      <div className="site-shell grid w-full gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <motion.div initial={{opacity:0,y:22}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:.75}} className="lg:py-10">
          <span className="mb-5 block text-[10px] uppercase tracking-[0.2em] text-white/42">Howard Choi</span>
          <h2 className="editorial-serif text-[clamp(3rem,4.6vw,5rem)] leading-[0.91] text-white">
            {ko ? <>캘리포니아 변호사.<br/>직접 책임.</> : es ? <>Abogado de California.<br/>Responsabilidad directa.</> : <>California attorney.<br/>Direct responsibility.</>}
          </h2>
          <p className="mt-6 max-w-[430px] text-[15px] leading-6 text-white/58">
            {ko ? "Howard Choi는 캘리포니아 현직 변호사로 State Bar No. 284364이며 2012년에 등록되었습니다. Santa Ana의 William Howard Taft University에서 공부했으며 영어와 한국어를 구사합니다." : es ? "Howard Choi es un abogado activo de California, State Bar No. 284364, admitido en 2012. Estudió en William Howard Taft University en Santa Ana y habla inglés y coreano." : "Howard Choi is an active California attorney, Bar No. 284364, admitted in 2012. He attended William Howard Taft University in Santa Ana and speaks English and Korean."}
          </p>
          <div className="mt-14 grid max-w-[420px] grid-cols-2 gap-10 border-t border-white/12 pt-7">
            <div><div className="editorial-serif text-[2.7rem] leading-none">2012</div><div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/38">{ko ? "캘리포니아 등록" : es ? "Admitido en California" : "Admitted in California"}</div></div>
            <div><div className="editorial-serif text-[2.7rem] leading-none">284364</div><div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/38">{ko ? "State Bar 번호" : es ? "Número del State Bar" : "State Bar number"}</div></div>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <a href={`${prefix}/attorney`} className="inline-flex items-center gap-2 text-[11px] font-medium text-white underline underline-offset-4">{ko ? "변호사 전체 프로필" : es ? "Perfil completo del abogado" : "Full attorney profile"} <ArrowUpRight className="h-3.5 w-3.5"/></a>
            <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] text-white/62 underline underline-offset-4 transition-colors hover:text-white">{ko ? "State Bar에서 확인" : es ? "Verificar con el State Bar" : "Verify with the State Bar"} <ArrowUpRight className="h-3.5 w-3.5"/></a>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0,scale:.985}} animate={isInView?{opacity:1,scale:1}:{}} transition={{duration:.9,delay:.08}} className="ml-auto w-full overflow-hidden rounded-[2px] lg:h-[72svh] lg:max-h-[760px] lg:min-h-[560px]">
          <img src={leadCounselImage} alt="Howard Choi, California accident and personal injury attorney" className="aspect-[4/5] h-full w-full object-cover object-center grayscale-[15%] lg:aspect-auto"/>
        </motion.div>
      </div>
    </section>
  );
};
export default DirectAccess;
