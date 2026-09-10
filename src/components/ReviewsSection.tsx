import { motion, useReducedMotion } from "framer-motion";

const reviews = [
  { initials: "MR", name: "Maria R.", text: "Clear communication, quick follow-up, and a process that felt much less overwhelming than we expected." },
  { initials: "JL", name: "Jason L.", text: "Professional, responsive, and very patient in explaining each step after the accident." },
  { initials: "SK", name: "Soo K.", text: "Helpful, respectful, and easy to reach. We felt supported throughout the process." },
  { initials: "AT", name: "Ariana T.", text: "Everything was handled clearly and efficiently. The consultation process was smooth from the start." },
  { initials: "DK", name: "Daniel K.", text: "Very organized and easy to work with. They made a stressful situation feel much more manageable." },
  { initials: "EH", name: "Emily H.", text: "Prompt responses, thoughtful guidance, and a professional experience from beginning to end." },
];

const Stars = () => (
  <div className="flex items-center gap-[3px] text-[13px] tracking-[0.04em] text-[#211c17]" aria-label="5 out of 5 stars">
    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
  </div>
);

const ReviewCard = ({ review }: { review: (typeof reviews)[number] }) => (
  <article className="flex h-[255px] w-[330px] shrink-0 flex-col justify-between rounded-[3px] border border-[#211c17]/10 bg-[#eee9e2] p-6 text-[#211c17] sm:h-[275px] sm:w-[380px] sm:p-7">
    <div>
      <div className="flex items-center justify-between gap-5">
        <Stars />
        <span className="text-[9px] uppercase tracking-[0.16em] text-[#211c17]/34">Sample review</span>
      </div>
      <p className="editorial-serif mt-7 text-[1.35rem] leading-[1.18] tracking-[-0.018em] sm:text-[1.5rem]">“{review.text}”</p>
    </div>
    <div className="flex items-center gap-3 border-t border-[#211c17]/10 pt-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#211c17] text-[10px] font-medium tracking-[0.08em] text-[#f3eee5]">{review.initials}</div>
      <div>
        <div className="text-[12px] font-medium">{review.name}</div>
        <div className="mt-0.5 text-[10px] text-[#211c17]/42">Google review placeholder</div>
      </div>
    </div>
  </article>
);

const ReviewsSection = () => {
  const reduceMotion = useReducedMotion();
  const row = [...reviews, ...reviews];

  return (
    <section className="overflow-hidden border-y border-[#211c17]/10 bg-[#f5f1ea] py-20 text-[#211c17] md:py-28 lg:py-32">
      <div className="site-shell">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#211c17]/12 bg-white text-[15px] font-semibold">G</div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#211c17]/44">Client Reviews</span>
            </div>
            <h2 className="editorial-serif max-w-[760px] text-[clamp(3rem,5.25vw,5.8rem)] leading-[0.91] tracking-[-0.03em]">A reputation built one client at a time.</h2>
          </div>
          <div className="max-w-[430px] lg:pb-1">
            <p className="text-[15px] leading-6 text-[#211c17]/58">A dedicated place for feedback from injury clients across Buena Park and nearby communities.</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.13em] text-[#211c17]/32">Preview content · Real Google reviews will replace these before launch</p>
          </div>
        </div>
      </div>

      <div className="relative mt-12 md:mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-[#f5f1ea] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-[#f5f1ea] to-transparent sm:w-24" />
        <motion.div
          className="flex w-max gap-4 px-4 sm:gap-5 sm:px-5"
          animate={reduceMotion ? undefined : { x: [0, -1190] }}
          transition={reduceMotion ? undefined : { duration: 34, ease: "linear", repeat: Infinity }}
        >
          {row.map((review, index) => <ReviewCard key={`${review.name}-${index}`} review={review} />)}
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
