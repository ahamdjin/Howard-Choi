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
    title: "What clients remember.",
    body: "Clear communication, direct answers, and a process clients can follow.",
    swipe: "Swipe to read",
  },
  ko: {
    eyebrow: "Google 리뷰",
    title: "의뢰인이 기억하는 경험.",
    body: "명확한 소통, 직접적인 답변, 이해하기 쉬운 진행 과정.",
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

const Stars = () => <div className="flex gap-[2px] text-[12px] tracking-[0.015em] text-[#fbbc04]" aria-label="5 out of 5 stars">★★★★★</div>;

type Review = (typeof reviews.en)[number] | (typeof reviews.ko)[number];

type ReviewCardProps = {
  review: Review;
  ko?: boolean;
  rotation?: number;
  offsetY?: number;
};

const ReviewCard = ({ review, ko = false, rotation = 0, offsetY = 0 }: ReviewCardProps) => (
  <motion.article
    animate={{ rotate: rotation, y: offsetY }}
    whileHover={{ rotate: 0, y: offsetY - 6 }}
    transition={{ type: "spring", stiffness: 240, damping: 24 }}
    className="flex h-[50svh] min-h-[300px] max-h-[390px] shrink-0 snap-center flex-col justify-between rounded-[11px] border border-foreground/10 bg-background p-5 shadow-[0_14px_36px_rgba(31,27,23,0.045)] md:p-6 lg:h-[min(46svh,420px)] lg:min-h-[330px] lg:max-h-[420px]"
  >
    <div>
      <div className="flex items-start justify-between gap-5">
        <Stars />
        <GoogleMark className="h-5 w-5 shrink-0" />
      </div>
      <p
        style={ko ? { fontFamily: '"Noto Serif KR", serif' } : undefined}
        className={`${ko ? "font-medium leading-[1.55] tracking-[-0.03em]" : "editorial-serif leading-[1.18] tracking-[-0.018em]"} mt-7 text-[1.12rem] sm:text-[1.2rem] xl:text-[1.28rem]`}
      >
        “{review.text}”
      </p>
    </div>
    <div className="mt-7 flex items-center gap-3 border-t border-foreground/10 pt-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-[8px] font-semibold tracking-[0.08em] text-background">{review.initials}</div>
      <div className="min-w-0 leading-tight">
        <div className="text-[11px] font-semibold text-foreground">{review.name}</div>
        <div className="mt-1 text-[9px] text-muted-foreground">{review.location}</div>
      </div>
      <div className="ml-auto flex items-center gap-1.5 text-[9px] font-medium text-foreground/38"><GoogleMark className="h-3 w-3" /><span>Google</span></div>
    </div>
  </motion.article>
);

const rotations = [-1.1, 0.7, -0.65, 1.0];
const offsets = [8, -5, 10, 0];

const ReviewsSection = ({ locale = "en" }: ReviewsSectionProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.14 });
  const ko = locale === "ko";
  const items = reviews[locale];
  const text = copy[locale];

  return (
    <section id="reviews" ref={ref} className="relative h-[100svh] overflow-hidden bg-[#ebe7df] text-foreground">
      <div className="site-shell flex h-full w-full flex-col py-16 md:py-20 lg:py-20">
        <div className="grid shrink-0 gap-5 border-t border-foreground/10 pt-4 lg:grid-cols-[1fr_0.7fr] lg:items-end lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.68 }}>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-[0_7px_18px_rgba(31,27,23,0.05)]"><GoogleMark className="h-4 w-4" /></div>
              <span className="text-[10px] font-medium tracking-[-0.01em] text-foreground/50">{text.eyebrow}</span>
            </div>
            <h2 style={ko ? { fontFamily: '"Noto Serif KR", serif' } : undefined} className={`${ko ? "text-[clamp(2rem,2.6vw,3rem)] font-medium leading-[1.25] tracking-[-0.045em]" : "editorial-serif text-[clamp(2rem,2.7vw,3.2rem)] leading-[1.02] tracking-[-0.026em]"} max-w-[680px]`}>{text.title}</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.68, delay: 0.06 }} className="max-w-[430px] lg:justify-self-end">
            <p className="text-[13px] leading-5 text-foreground/54">{text.body}</p>
            <div className="mt-3 flex items-center justify-between text-[9px] font-medium text-foreground/32 lg:hidden"><span>{text.swipe}</span><span>01 — 04</span></div>
          </motion.div>
        </div>

        <div className="flex min-h-0 flex-1 items-center pt-6 md:pt-8 lg:pt-10">
          <div className="-mx-2 flex w-[calc(100%+1rem)] snap-x snap-mandatory gap-4 overflow-x-auto px-[8vw] py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
            {items.map((review, index) => (
              <div key={review.name} className="w-[78vw] max-w-[360px] shrink-0">
                <ReviewCard review={review} ko={ko} rotation={rotations[index] * 0.55} offsetY={offsets[index] * 0.45} />
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="hidden w-full grid-cols-[1.12fr_0.96fr_0.96fr_0.96fr] items-center gap-4 lg:grid xl:gap-5">
            {items.map((review, index) => (
              <ReviewCard key={review.name} review={review} ko={ko} rotation={rotations[index]} offsetY={offsets[index]} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
