import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import KoreanNavigation from "@/components/KoreanNavigation";
import KoreanFooter from "@/components/KoreanFooter";
import { koBlogPosts } from "@/data/koBlogs";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";

const koSerif = { fontFamily: '"Noto Serif KR", serif' } as const;

const resourcePaths = [
  { label: "방금 사고가 났다면", body: "사고 직후의 안전, 증거, 치료, 보험과 보존해야 할 기록부터 확인하세요.", href: "/ko/blogs/what-to-do-after-a-car-accident-in-california" },
  { label: "과실에 다툼이 있다면", body: "캘리포니아 비교과실이 무엇인지, 일부 과실 주장이 있다고 사건이 자동으로 끝나지 않는 이유를 확인하세요.", href: "/ko/blogs/california-comparative-fault-personal-injury" },
  { label: "사건 가치를 이해하고 싶다면", body: "치료, 소득 손실, 보험, 과실과 장기적인 영향이 사건 가치에 어떻게 연결되는지 확인하세요.", href: "/ko/blogs/how-much-is-my-personal-injury-case-worth-california" },
  { label: "법적 기한이 걱정된다면", body: "캘리포니아 제소 기한, 공공기관 관련 사전 청구와 증거가 더 빨리 사라질 수 있는 이유를 확인하세요.", href: "/ko/blogs/california-personal-injury-deadlines" },
];

const KoBlogs = () => {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 90]);
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.018]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
      <KoreanNavigation />
      <div className="relative">
        <div className="sticky top-0 h-[70svh] min-h-[620px] overflow-hidden bg-[#17130f] text-[#f3eee5]">
          <motion.img src={heroJusticeLibrary} alt="법률 서재와 정의의 여신상" style={{ y: imageY, scale: heroScale }} fetchPriority="high" decoding="async" className="absolute inset-0 h-[112%] w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[#17130f]/58" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/90 via-[#17130f]/14 to-[#17130f]/22" />
          <div className="hero-bottom-readability" />
          <div className="site-shell relative z-10 flex h-full items-end pb-10 pt-[72px] md:pb-12 lg:pb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="grid w-full gap-8 border-t border-white/18 pt-5 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
              <div><span className="text-[9px] font-medium uppercase tracking-[0.17em] text-[#f3eee5]/48">법률 자료</span><div className="mt-4 hidden text-[10px] leading-5 text-[#f3eee5]/34 lg:block">캘리포니아 사고·상해 가이드<br />Buena Park, California</div></div>
              <div className="max-w-[980px]"><h1 style={koSerif} className="text-[clamp(2.1rem,3.1vw,3.45rem)] font-medium leading-[1.22] tracking-[-0.045em]">사고 이후 생기는 질문에 더 명확한 답을.</h1><p className="mt-5 max-w-[720px] text-[14px] leading-7 text-[#f3eee5]/67 md:text-[15px]">캘리포니아 교통사고, 보험, 증거, 기한, 부상과 사건 가치를 이해하기 쉽게 정리하며 각 가이드 안에서 공식 법률·기관 자료를 함께 제공합니다.</p></div>
            </motion.div>
          </div>
        </div>

        <main className="relative z-10 bg-background py-16 md:py-20 lg:py-24">
          <div className="site-shell">
            <section className="mb-16 border-b border-foreground/12 pb-16 md:mb-20 md:pb-20">
              <div className="grid gap-6 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
                <span className="text-[9px] font-medium tracking-[0.08em] text-muted-foreground">지금 궁금한 것부터</span>
                <div>
                  <h2 style={koSerif} className="max-w-[780px] text-[clamp(1.8rem,2.45vw,2.6rem)] font-medium leading-[1.3] tracking-[-0.04em]">현재 상황과 가장 가까운 질문에서 시작하세요.</h2>
                  <div className="mt-9 grid border-t border-foreground/12 sm:grid-cols-2">
                    {resourcePaths.map((item, index) => (
                      <Link key={item.href} to={item.href} className="group border-b border-foreground/12 py-6 sm:border-l sm:px-6 sm:odd:border-l-0 sm:odd:pl-0">
                        <div className="flex items-center justify-between text-[9px] text-foreground/28"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
                        <h3 style={koSerif} className="mt-7 text-[1.35rem] font-medium leading-[1.35]">{item.label}</h3>
                        <p className="mt-3 max-w-[460px] text-[11px] leading-6 text-foreground/50">{item.body}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[12px]">
                    <Link to="/ko/practice-areas" className="inline-flex items-center gap-2 hover:opacity-60">개인상해 업무 분야 보기 <ArrowRight className="h-3.5 w-3.5" /></Link>
                    <Link to="/ko/case-value-calculator" className="inline-flex items-center gap-2 hover:opacity-60">사건 가치 계산기 <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid gap-5 border-b border-foreground/12 pb-6 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
              <span className="text-[9px] font-medium tracking-[0.08em] text-muted-foreground">전체 가이드</span>
              <div className="flex items-end justify-between gap-6"><h2 style={koSerif} className="text-[clamp(1.7rem,2.2vw,2.35rem)] font-medium leading-[1.25] tracking-[-0.035em]">캘리포니아 개인상해 법률을 명확하게.</h2><span className="hidden text-[10px] text-muted-foreground sm:block">총 {koBlogPosts.length}개 글</span></div>
            </div>

            <div className="divide-y divide-foreground/12">
              {koBlogPosts.map((post, index) => (
                <motion.article key={post.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.65, delay: index * 0.05 }} className="py-7 md:py-9 lg:py-10">
                  <Link to={`/ko/blogs/${post.slug}`} className="group grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch lg:gap-10 xl:gap-14">
                    <div className="relative min-h-[280px] overflow-hidden bg-[#17130f] md:min-h-[340px]"><img src={post.image} alt={post.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018]" /><div className="absolute inset-0 bg-[#17130f]/10 transition-colors duration-500 group-hover:bg-transparent" /></div>
                    <div className="flex min-h-[280px] flex-col justify-between py-1 md:min-h-[340px] lg:py-2"><div><div className="mb-5 flex items-center gap-4 text-[10px] text-muted-foreground"><span>{String(index + 1).padStart(2, "0")}</span><span>{post.category}</span><span>·</span><span>{post.readingTime}</span></div><h2 style={koSerif} className="max-w-[760px] text-[clamp(1.7rem,2.45vw,2.65rem)] font-medium leading-[1.2] tracking-[-0.04em]">{post.title}</h2><p className="mt-4 max-w-[650px] text-[13px] leading-6 text-foreground/60">{post.excerpt}</p></div><div className="mt-8 flex items-center justify-between border-t border-foreground/12 pt-4 text-[11px]"><span className="text-muted-foreground">{post.date}</span><span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">가이드 읽기 <ArrowRight className="h-3.5 w-3.5" /></span></div></div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </main>
      </div>
      <KoreanFooter />
    </div>
  );
};

export default KoBlogs;