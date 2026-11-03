import type { ReactNode } from "react";
import { LazyMotion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";

const loadMotionFeatures = () => import("@/lib/motion-features").then((module) => module.default);

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <LazyMotion features={loadMotionFeatures}>{children}</LazyMotion>
    </>
  );
}
