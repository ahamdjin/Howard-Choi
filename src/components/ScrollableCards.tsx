import { useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * CSS scroll snap provides the carousel behavior on touch screens and with the
 * keyboard. Arrow buttons are a small progressive enhancement. All children,
 * including their ordinary <a href> links, render in the initial HTML.
 */
export default function ScrollableCards({
  label,
  previousLabel,
  nextLabel,
  children,
}: {
  label: string;
  previousLabel: string;
  nextLabel: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const stride = firstCard ? firstCard.getBoundingClientRect().width + 16 : track.clientWidth * 0.82;
    track.scrollBy({
      left: direction * stride,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="text-[11px] text-foreground/50">{label}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={previousLabel}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/25 text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          ><ArrowLeft className="h-4 w-4" /></button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label={nextLabel}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/25 text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          ><ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {children}
      </div>
    </div>
  );
}
