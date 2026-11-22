import { useRef, useState, type ReactNode, type TouchEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ClientReview } from "@/data/clientReviews";

type TestimonialSliderProps = {
  reviews: readonly Pick<ClientReview, "name" | "location" | "text">[];
  image: ReactNode;
  label: string;
  previousLabel: string;
  nextLabel: string;
};

export default function TestimonialSlider({ reviews, image, label, previousLabel, nextLabel }: TestimonialSliderProps) {
  const [index, setIndex] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  if (!reviews.length) return null;
  const active = index % reviews.length;
  const review = reviews[active];
  const move = (direction: number) => setIndex(current => (current + direction + reviews.length) % reviews.length);

  function endSwipe(event: TouchEvent) {
    const origin = start.current;
    start.current = null;
    const touch = event.changedTouches[0];
    if (!origin || !touch) return;
    const dx = touch.clientX - origin.x;
    const dy = touch.clientY - origin.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}
      className="mt-10 grid w-full bg-[#e8e6e1] lg:grid-cols-[0.34fr_0.66fr]"
      onTouchStart={event => {
        const touch = event.touches[0];
        start.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={endSwipe}
      onTouchCancel={() => { start.current = null; }}>
      <div className="relative aspect-[16/9] lg:aspect-auto">{image}</div>
      <div className="flex min-w-0 flex-col justify-between p-6 sm:p-8 lg:min-h-[430px] lg:p-10">
        <figure className="m-0" aria-live="polite" aria-atomic="true">
          <blockquote className="editorial-serif text-[clamp(1.5rem,2.1vw,2.15rem)] leading-[1.35]">“{review.text}”</blockquote>
          <figcaption className="mt-6 text-sm">
            <strong className="font-semibold">{review.name}</strong>
            <span className="mt-1 block text-foreground/70">{review.location}</span>
          </figcaption>
        </figure>
        {reviews.length > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/20 pt-5">
            <span className="inline-flex min-h-11 items-center text-xs text-foreground/70">{label}</span>
            <div className="flex items-center gap-3">
              <Button type="button" variant="round" className="border-foreground/35 hover:bg-white" aria-label={previousLabel} onClick={() => move(-1)}><ArrowLeft aria-hidden="true" /></Button>
              <span className="text-xs tabular-nums">{active + 1} / {reviews.length}</span>
              <Button type="button" variant="round" className="border-foreground/35 hover:bg-white" aria-label={nextLabel} onClick={() => move(1)}><ArrowRight aria-hidden="true" /></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
