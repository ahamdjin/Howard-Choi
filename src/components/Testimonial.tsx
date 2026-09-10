import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import type { SiteLocale } from "@/data/injurySite";

type TestimonialProps = {
  locale?: SiteLocale;
};

const testimonialCopy = {
  en: {
    eyebrow: "Client experience",
    quote: "Every question was answered clearly, and I always understood what was happening next. The process felt personal, organized, and calm from the first conversation.",
    name: "Daniel K.",
    meta: "Personal injury client",
  },
  ko: {
    eyebrow: "의뢰인 경험",
    quote: "질문할 때마다 명확하게 설명해 주었고 다음에 무엇이 진행되는지 늘 이해할 수 있었습니다. 첫 상담부터 끝까지 차분하고 체계적으로 진행되는 느낌이었습니다.",
    name: "Daniel K.",
    meta: "상해 사건 의뢰인",
  },
} as const;

const ReadWord = ({ word, index, total, progress, reduced }: { word: string; index: number; total: number; progress: MotionValue<number>; reduced: boolean | null }) => {
  const start = (index / total) * 0.8;
  const end = Math.min(start + 0.18, 1);
  const color = useTransform(progress, [start, end], ["rgba(30,28,25,0.18)", "rgba(30,28,25,1)"]);

  if (reduced) return <span className="inline text-foreground">{word}{" "}</span>;
  return <motion.span style={{ color }} className="inline">{word}{" "}</motion.span>;
};

const Testimonial = ({ locale = "en" }: TestimonialProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const copy = testimonialCopy[locale];
  const words = copy.quote.split(" ");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 86%", "end 34%"] });
  const ko = locale === "ko";

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-background py-24 md:py-28 lg:py-32">
      <div className="site-shell w-full">
        <div className="grid gap-10 lg:grid-cols-[0.24fr_1.76fr] lg:gap-14 xl:gap-20">
          <div className="flex items-start justify-between border-t border-foreground/12 pt-4 lg:block">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/42">{copy.eyebrow}</span>
            <span className="text-[10px] tabular-nums tracking-[0.12em] text-foreground/26 lg:mt-3 lg:block">01</span>
          </div>

          <div>
            <blockquote
              style={ko ? { fontFamily: '"Noto Serif KR", serif' } : undefined}
              className={`${ko ? "text-[clamp(2.1rem,5.7vw,5rem)] font-medium leading-[1.32] tracking-[-0.05em]" : "editorial-serif text-[clamp(2.45rem,5.65vw,5.65rem)] leading-[0.99] tracking-[-0.03em]"} max-w-[1120px]`}
            >
              “{words.map((word, index) => (
                <ReadWord key={`${word}-${index}`} word={word} index={index} total={words.length} progress={scrollYProgress} reduced={reduced} />
              ))}”
            </blockquote>

            <div className="mt-12 flex items-center gap-4 border-t border-foreground/12 pt-5 md:mt-14">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold tracking-[0.08em] text-background">DK</div>
              <div className="leading-tight">
                <div className="text-[13px] font-medium text-foreground">{copy.name}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{copy.meta}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
