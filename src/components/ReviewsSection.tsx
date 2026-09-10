import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { SiteLocale } from "@/data/injurySite";

type ReviewsSectionProps = {
  locale?: SiteLocale;
};

const reviews = {
  en: [
    { initials: "MR", name: "Maria R.", location: "Buena Park", text: "Clear communication, quick follow-up, and a process that felt much less overwhelming than I expected." },
    { initials: "JL", name: "Jason L.", location: "Fullerton", text: "Professional, responsive, and patient about explaining what was happening at every step." },
    { initials: "SK", name: "Soo K.", location: "Anaheim", text: "Easy to reach, respectful, and very organized. I always felt like I knew what came next." },
    { initials: "AT", name: "Ariana T.", location: "La Mirada", text: "The process was handled clearly from the beginning, and every question was taken seriously." },
  ],
  ko: [
    { initials: "MR", name: "Maria R.", location: "부에나파크", text: "소통이 명확했고 답변도 빨랐습니다. 처음 생각했던 것보다 훨씬 덜 부담스럽게 진행할 수 있었습니다." },
    { initials: "JL", name: "Jason L.", location: "풀러턴", text: "전문적이고 신속했으며 각 단계에서 무엇이 진행되는지 차분하게 설명해 주었습니다." },
    { initials: "SK", name: "Soo K.", location: "애너하임", text: "연락이 잘 되었고 존중받는 느낌이었습니다. 다음 단계가 무엇인지 항상 이해할 수 있었습니다." },
    { initials: "AT", name: "Ariana T.", location: "라미라다", text: "처음부터 과정이 명확했고 질문 하나하나를 진지하게 다뤄 주었습니다." },
  ],
} as const;

const copy = {
  en: {
    eyebrow: "Google Reviews",
    title: "What clients remember after the case moves forward.",
    body: "The best legal experience is not only about the outcome. It is also about communication, clarity, and knowing who is responsible for your matter.",
    swipe: "Swipe to read",
  },
  ko: {
    eyebrow: "Google 리뷰",
    title: "사건이 진행된 뒤에도 기억에 남는 경험.",
    body: "좋은 법률 서비스는 결과만이 아니라 소통, 명확한 설명, 그리고 누가 사건을 책임지고 있는지 아는 경험까지 포함합니다.",
    swipe: "옆으로 넘겨 보기",
  },
} as const;

const GoogleMark = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 18 18" aria-label="Google" role="img" className={className}>
    <path fill="#4285F4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.482h4.844a4.14 4.14 0 0 1-1.797 2.715v2.258h2.909c1.702-1.567 2.684-3.874 2.684-6.614z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.468-.806 5.956-2.181l-2.909-2.258c-.806.54-1.835.859-3.047.859-2.344 0-4.328-1.585-5.037-3.714H.956v2.332A9 9 0 0 0 9 18z" />
    <path fill="#FBBC05" d="M3.963 10.706A5.41 5.41 0 0 1 3.682 9c0-.592.102-1.167.281-1.706V4.962H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.038l3.007-2.332z" />
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.507.454 3.44 1.346l2.581-2.581C13.464.892 11.426 0 9 0A9 9 0 0 0 .956 4.962l3.007 2.332C4.672 5.165 6.656 3.58 9 3.58z" />
  </svg>
);

const Stars = () => <div className="flex gap-[3px] text-[14px] tracking-[0.02em] text-[#fbbc04]" aria-label="5 out of 5 stars">★★★★★</div>;

const ReviewCard = ({ review, featured = false, ko = false }: { review: (typeof reviews.en)[number] | (typeof reviews.ko)[number]; featured?: boolean; ko?: boolean }) => (
  <article className={`group flex shrink-0 snap-start flex-col justify-between rounded-[10px] border border-foreground/10 bg-background p-6 shadow-[0_12px_32px_rgba(31,27,23,0.035)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(31,27,23,0.075)] ${featured ? "min-h-[430px]" : "min-h-[330px]"}`}>
    <div>
      <div className="flex items-start justify-between gap-6">
        <Stars />
        <GoogleMark className="h-6 w-6 shrink-0" />
      </div>
      <p
        style={ko ? { fontFamily: '"Noto Serif KR", serif' } : undefined}
        className={`${ko ? "font-medium leading-[1.6] tracking-[-0.035em]" : "editorial-serif leading-[1.14] tracking-[-0.02em]"} mt-8 ${featured ? "text-[clamp(1.9rem,2.8vw,3rem)]" : "text-[1.42rem] md:text-[1.55rem]"}`}
      >
        “{review.text}”
      </p>
    </div>
    <div className="mt-10 flex items-center gap-3 border-t border-foreground/10 pt-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold tracking-[0.08em] text-background">{review.initials}</div>
      <div className="min-w-0">
        <div className="text-[12px] font-semibold text-foreground">{review.name}</div>
        <div className="mt-1 text-[10px] text-muted-foreground">{review.location}</div>
      </div>
      <div className="ml-auto flex items-center gap-1.5 text-[10px] font-medium text-foreground/40"><GoogleMark className="h-3.5 w-3.5" /><span>Google</span></div>
    </div>
  </article>
);

const ReviewsSection = ({ locale = "en" }: ReviewsSectionProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const ko = locale === "ko";
  const items = reviews[locale];
  const text = copy[locale];

  return (
    <section id="reviews" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#ebe7df] py-24 text-foreground md:py-28 lg:py-32">
      <div className="site-shell w-full">
        <div className="grid gap-9 lg:grid-cols-[1.18fr_0.82fr] lg:items-end lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.72 }}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(31,27,23,0.06)]"><GoogleMark className="h-5 w-5" /></div>
              <span className="text-[11px] font-medium tracking-[-0.01em] text-foreground/52">{text.eyebrow}</span>
            </div>
            <h2 style={ko ? { fontFamily: '"Noto Serif KR", serif' } : undefined} className={`${ko ? "text-[clamp(2.6rem,4.7vw,4.7rem)] font-medium leading-[1.2] tracking-[-0.05em]" : "editorial-serif text-[clamp(3.1rem,5.2vw,5.5rem)] leading-[0.94] tracking-[-0.032em]"} max-w-[880px]`}>{text.title}</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.72, delay: 0.08 }} className="max-w-[470px] lg:justify-self-end lg:pb-1">
            <p className="text-[15px] leading-6 text-foreground/58">{text.body}</p>
            <div className="mt-5 flex items-center justify-between border-t border-foreground/12 pt-4 text-[10px] font-medium text-foreground/36 lg:hidden"><span>{text.swipe}</span><span>01 — 04</span></div>
          </motion.div>
        </div>

        <div className="mt-12 lg:mt-16">
          <div className="-mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
            {items.map((review) => <div key={review.name} className="w-[84vw] max-w-[370px] shrink-0"><ReviewCard review={review} ko={ko} /></div>)}
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.12 }} className="hidden grid-cols-12 grid-rows-2 gap-4 lg:grid">
            <div className="col-span-5 row-span-2"><ReviewCard review={items[0]} featured ko={ko} /></div>
            <div className="col-span-7"><ReviewCard review={items[1]} ko={ko} /></div>
            <div className="col-span-3"><ReviewCard review={items[2]} ko={ko} /></div>
            <div className="col-span-4"><ReviewCard review={items[3]} ko={ko} /></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
