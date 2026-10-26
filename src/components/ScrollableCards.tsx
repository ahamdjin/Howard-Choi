import { Children, cloneElement, createContext, isValidElement, useContext, useEffect, useRef, useState, type CSSProperties, type ReactElement, type ReactNode, type TouchEvent } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

type DeckContextState = { active: number; total: number; visible: boolean; mobile: boolean };
const DeckContext = createContext<DeckContextState>({ active: 0, total: 0, visible: false, mobile: false });

/** A real image node, with its URL withheld until the card is close to view.
 * The image remains loaded afterward to make looping instant and cache-friendly.
 * All card links, names and descriptions remain SSR content. */
export function DeckImage({ index, src, srcSet, sizes, alt, className, fallbackSrc, referrerPolicy }: {
  index: number; src: string; srcSet?: string; sizes?: string;
  alt: string; className: string; fallbackSrc?: string; referrerPolicy?: "no-referrer";
}) {
  const { active, total, visible, mobile } = useContext(DeckContext);
  const [requested, setRequested] = useState(false);
  const [failed, setFailed] = useState(false);
  const offset = total ? (index - active + total) % total : 0;
  const near = mobile ? (offset <= 1 || offset === total - 1) : (offset <= 3 || offset === total - 1);
  useEffect(() => {
    if (visible && near) setRequested(true);
  }, [visible, near]);
  return (
    <img
      src={requested ? (failed && fallbackSrc ? fallbackSrc : src) : undefined}
      srcSet={requested && !failed ? srcSet : undefined}
      sizes={requested ? sizes : undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy={referrerPolicy}
      onError={() => { if (fallbackSrc && !failed) setFailed(true); }}
      className={className}
    />
  );
}

type SlideProps = {
  className?: string;
  style?: CSSProperties;
  tabIndex?: number;
  "aria-hidden"?: boolean;
  "data-slot"?: number;
};

/**
 * Infinite editorial card deck: three main cards on desktop, the next card
 * peeking from the right, and the just-passed card behind on the left.
 * A fifth card waits behind the right edge. Slides continuously cycle.
 *
 * No carousel library, no cloned duplicate links, no endless horizontal
 * document height; all real <a href> cards stay in SSR HTML for crawlers.
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
  const cards = Children.toArray(children).filter(isValidElement) as ReactElement<SlideProps>[];
  const total = cards.length;
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const swipeRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const width = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setReducedMotion(media.matches);
      setMobile(width.matches);
    };
    update();
    media.addEventListener("change", update);
    width.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
      width.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.3),
      { threshold: [0, 0.3, 0.7] }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Auto-rotation runs only when the section is visible, and pauses for mouse,
  // keyboard and accessibility interactions. Reduced-motion users see a static
  // deck but can still use the controls.
  useEffect(() => {
    if (!visible || hovered || focused || manualPause || reducedMotion || total < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % total);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [visible, hovered, focused, manualPause, reducedMotion, total]);

  const move = (direction: number) => {
    if (!total) return;
    setActive((current) => (current + direction + total) % total);
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const t = event.touches[0];
    if (t) touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    const t = event.changedTouches[0];
    if (!start || !t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
    swipeRef.current = true;
    move(dx < 0 ? 1 : -1);
    window.setTimeout(() => { swipeRef.current = false; }, 350);
  };

  const ordinal = String(active + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  return (
    <DeckContext.Provider value={{ active, total, visible, mobile }}>
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="showcase-deck"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="showcase-deck__toolbar">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-foreground/65">{label}</span>
          <span className="text-[10px] tracking-[0.11em] text-foreground/45">DRAG / SWIPE · {ordinal} / {count}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setManualPause((current) => !current)}
            aria-label={manualPause ? "Resume automatic slide rotation" : "Pause automatic slide rotation"}
            aria-pressed={manualPause}
            className="showcase-deck__control"
          >
            {manualPause ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
          <button type="button" onClick={() => move(-1)} aria-label={previousLabel} className="showcase-deck__control">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label={nextLabel} className="showcase-deck__control">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="showcase-deck__stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClickCapture={(event) => {
          if (swipeRef.current) {
            event.preventDefault();
            event.stopPropagation();
            swipeRef.current = false;
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        }}
        aria-live="off"
      >
        {cards.map((card, index) => {
          const ahead = (index - active + total) % total;
          // The card just passed (-1) and the fifth card ahead (+4) recede
          // behind the three-card deck. Unused cards fade into the back.
          const slot = ahead === total - 1 ? -1 : ahead <= 4 ? ahead : -2;
          const accessible = mobile ? slot === 0 : slot >= 0 && slot <= 2;
          return cloneElement(card, {
            className: [card.props.className, "showcase-deck__card"].filter(Boolean).join(" "),
            "data-slot": slot,
            "aria-hidden": !accessible,
            tabIndex: accessible ? 0 : -1,
          });
        })}
      </div>
      <div aria-hidden="true" className="showcase-deck__progress">
        {cards.map((card, index) => (
          <span key={card.key ?? index} className={index === active ? "showcase-deck__progress-dot showcase-deck__progress-dot--active" : "showcase-deck__progress-dot"} />
        ))}
      </div>
    </div>
    </DeckContext.Provider>
  );
}
