import { ArrowUpRight } from "lucide-react";
import avvo from "@/assets/law-firm/badges/avvo.png";
import aaoaTopHundred from "@/assets/law-firm/badges/aaoa-top-100.webp";
import bbbAccredited from "@/assets/law-firm/badges/bbb-accredited-business.webp";
import lawyersOfDistinction from "@/assets/law-firm/badges/lawyers-of-distinction-2026.webp";
import naopiaTopTen from "@/assets/law-firm/badges/naopia-top-ten-attorney-2025.webp";
import truckingTopTen from "@/assets/law-firm/badges/trucking-trial-lawyers-top-10.webp";

// Slot 3: award recognition only. Attorney licence details live on /attorney;
// firm pages should not mix the two. Every badge here must be one the firm
// actually holds, issued in this firm's name. A TopVerdict.com "Top 100 Jury
// Verdicts" badge was supplied but is issued to a different attorney (Matt
// Taylor) and is deliberately not included. The AAOA 500 Million Dollar Club
// badge was removed too: it asserts $500M+ recovered while the site states
// $100M+, and the two cannot both headline the same page. See media-sources.md.
const badges = [
  { src: avvo, alt: "Howard Choi on Avvo", href: "https://www.avvo.com/attorneys/90621-ca-howard-choi-4229558.html" },
  { src: aaoaTopHundred, alt: "American Academy of Attorneys Top 100, 2025", href: "https://aaoaus.com/" },
  { src: naopiaTopTen, alt: "NAOPIA Nation's Premier Top Ten Personal Injury Attorney, 2025", href: "https://www.naopia.com/" },
  { src: lawyersOfDistinction, alt: "Lawyers of Distinction, 2026", href: "https://www.lawyersofdistinction.com/" },
  { src: truckingTopTen, alt: "Trucking Trial Lawyers Association Top 10", href: "https://thettla.org/" },
  { src: bbbAccredited, alt: "Better Business Bureau Accredited Business", href: "https://www.bbb.org/" },
];

// Two constraints from src/index.css, both deliberate:
//  - Root is <aside>, not <section>: `.home-page section` is forced to
//    min-height:calc(100svh - 60px) under 768px.
//  - The label below is a <div>, not an <h2>: `.home-page h2` carries a
//    `font-size: clamp(2rem,3vw,3.25rem) !important` that would render a
//    10px eyebrow at ~52px and dwarf the badges.
const TrustBadges = () => (
  <aside aria-label="Awards and recognition" className="bg-background text-foreground">
    <div className="site-shell py-10 md:py-12">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-foreground/12 pb-5">
        <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/36">Recognition</div>
        <a
          href="/attorney"
          className="inline-flex items-center gap-2 text-[11px] font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          About the attorney <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
        {badges.map((badge) => (
          <li key={badge.alt}>
            <a
              href={badge.href}
              target="_blank"
              rel="noreferrer nofollow"
              className="flex h-[80px] items-center justify-center rounded-[3px] border border-[#8a6a48] bg-white px-3 py-2.5 transition-opacity hover:opacity-75"
            >
              <img
                src={badge.src}
                alt={badge.alt}
                loading="lazy"
                decoding="async"
                className="max-h-[60px] w-auto max-w-full object-contain"
              />
            </a>
          </li>
        ))}
      </ul>

    </div>
  </aside>
);

export default TrustBadges;
