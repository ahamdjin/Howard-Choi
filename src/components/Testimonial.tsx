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
  const color = useTransform(progress, [start, end], ["rgba(30,28,25,0.18)", "rgba(30,28,25,1)"]);

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
    offset: ["start 88%", "end 36%"],
  });

  return (
    <section ref={ref} className="flex min-h-[76svh] items-center bg-background pb-16 pt-10 md:min-h-[80svh] md:pb-20 md:pt-12">
      <div className="site-shell w-full text-center">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-6 text-[12px] tracking-[0.22em] text-foreground">★★★★★</div>
          <blockquote className="editorial-serif text-[clamp(2.2rem,3.15vw,3.6rem)] leading-[1.06] tracking-[-0.018em]">
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

          <div className="mt-8 flex items-center justify-center gap-3 text-left">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=82"
              alt="Marcus Ellison"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="leading-tight">
              <div className="text-[13px] font-medium text-foreground">Marcus Ellison</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">Founder &amp; Managing Partner</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
