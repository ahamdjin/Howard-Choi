import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const quote = "Measured advice, commercial clarity, and absolute discretion through a complex cross-border transaction.";
const words = quote.split(" ");

const ReadWord = ({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const start = (index / total) * 0.82;
  const end = Math.min(start + 0.17, 1);
  const color = useTransform(progress, [start, end], ["rgba(30,28,25,0.20)", "rgba(30,28,25,1)"]);

  return (
    <motion.span style={{ color }} className="inline">
      {word}{" "}
    </motion.span>
  );
};

const Testimonial = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 38%"],
  });

  return (
    <section ref={ref} className="flex min-h-[100svh] items-center bg-background py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-6 text-center md:px-10 lg:px-12">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-7 text-[12px] tracking-[0.34em] text-foreground">★★★★★</div>
          <blockquote className="editorial-serif text-[clamp(2.8rem,4.5vw,5rem)] leading-[1.02]">
            “{words.map((word, index) => (
              <ReadWord
                key={`${word}-${index}`}
                word={word}
                index={index}
                total={words.length}
                progress={scrollYProgress}
              />
            ))}”
          </blockquote>
          <p className="mt-9 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Private client · Business owner
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
