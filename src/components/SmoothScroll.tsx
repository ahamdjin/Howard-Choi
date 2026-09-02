import { useEffect } from "react";

const isScrollableInDirection = (start: EventTarget | null, deltaY: number) => {
  let element = start instanceof HTMLElement ? start : null;

  while (element && element !== document.body) {
    const style = window.getComputedStyle(element);
    const overflowY = style.overflowY;
    const canScroll =
      (overflowY === "auto" || overflowY === "scroll") &&
      element.scrollHeight > element.clientHeight + 1;

    if (canScroll) {
      const maxScrollTop = element.scrollHeight - element.clientHeight;
      if (deltaY > 0 && element.scrollTop < maxScrollTop - 1) return true;
      if (deltaY < 0 && element.scrollTop > 1) return true;
    }

    element = element.parentElement;
  }

  return false;
};

const SmoothScroll = () => {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (reducedMotion.matches || coarsePointer.matches) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    let current = window.scrollY;
    let target = current;
    let rafId = 0;
    let animating = false;

    const clampTarget = () => {
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      target = Math.min(Math.max(0, target), max);
    };

    const animate = () => {
      const distance = target - current;
      current += distance * 0.115;

      if (Math.abs(distance) < 0.28) {
        current = target;
        window.scrollTo(0, current);
        animating = false;
        rafId = 0;
        return;
      }

      window.scrollTo(0, current);
      rafId = window.requestAnimationFrame(animate);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || isScrollableInDirection(event.target, event.deltaY)) return;

      let delta = event.deltaY;
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) delta *= 16;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) delta *= window.innerHeight;

      delta = Math.max(-150, Math.min(150, delta));
      if (Math.abs(delta) < 0.01) return;

      event.preventDefault();
      target += delta * 0.9;
      clampTarget();

      if (!animating) {
        current = window.scrollY;
        animating = true;
        rafId = window.requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      if (!animating) {
        current = window.scrollY;
        target = current;
      }
    };

    const onResize = () => {
      clampTarget();
      if (!animating) current = target = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return null;
};

export default SmoothScroll;
