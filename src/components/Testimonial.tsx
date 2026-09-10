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
  const start = (index / total) * 0.82;
  const end = Math.min(start + 0.17, 1);
  const color = useTransform(progress, [start, end], ["rgba(30,28,25,0.16)", "rgba(30,28,25,1)"]);

  if (reduced) return <span className="inline text-foreground">{word}{" "}</span>;
  return <motion.span style={{ color }} className="inline">{word}{" "}</motion.span>;
};

const Testimonial = ({ locale = "en" }: TestimonialProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const copy = testimonialCopy[locale];
  const words = copy.quote.split(" ");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 24%"] });
  const ko = locale === "ko";

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-background">
      <div className="site-shell flex h-full w-full flex-col py-20 md:py-24 lg:py-24">
        <div className="flex items-center justify-between border-t border-foreground/12 pt-3.5">
          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-foreground/42">{copy.eyebrow}</span>
          <span className="text-[9px] tabular-nums tracking-[0.12em] text-foreground/25">01</span>
        </div>

        <div className="flex flex-1 items-center py-8 md:py-10">
          <blockquote
            style={ko ? { fontFamily: '\"Noto Serif KR\", serif' } : undefined}
            className={`${ko ? "text-[clamp(1.7rem,2.25vw,2.7rem)] font-medium leading-[1.5] tracking-[-0.045em]" : "editorial-serif text-[clamp(1.85rem,2.45vw,3.05rem)] leading-[1.08] tracking-[-0.026em]"} max-w-[1180px]`}
          >
            “{words.map((word, index) => (
              <ReadWord key={`${word}-${index}`} word={word} index={index} total={words.length} progress={scrollYProgress} reduced={reduced} />
            ))}”
          </blockquote>
        </div>

        <div className="flex items-center gap-3.5 border-t border-foreground/12 pt-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-[9px] font-semibold tracking-[0.08em] text-background">DK</div>
          <div className="leading-tight">
            <div className="text-[12px] font-medium text-foreground">{copy.name}</div>
            <div className="mt-1 text-[10px] text-muted-foreground">{copy.meta}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
