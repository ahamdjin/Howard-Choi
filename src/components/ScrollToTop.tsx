import { useEffect } from "react";
import { useLocation } from "@/lib/router-compat";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Respect direct section links instead of overriding the browser's anchor jump.
    const fragment = window.location.hash.slice(1);
    let id = fragment;
    try { id = decodeURIComponent(fragment); } catch { /* Keep malformed fragments harmless. */ }
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
