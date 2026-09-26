import { ArrowUpRight } from "lucide-react";
import type { SiteLocale } from "@/data/injurySite";
import avvo from "@/assets/law-firm/badges/avvo.png";
import aaoaTopHundred from "@/assets/law-firm/badges/aaoa-top-100.webp";
import bbbAccredited from "@/assets/law-firm/badges/bbb-accredited-business.webp";
import lawyersOfDistinction from "@/assets/law-firm/badges/lawyers-of-distinction-2026.webp";
import naopiaTopTen from "@/assets/law-firm/badges/naopia-top-ten-attorney-2025.webp";
import truckingTopTen from "@/assets/law-firm/badges/trucking-trial-lawyers-top-10.webp";

const badges = [
  { src: avvo, alt: "Howard Choi on Avvo", href: "https://www.avvo.com/attorneys/90621-ca-howard-choi-4229558.html" },
  { src: aaoaTopHundred, alt: "American Academy of Attorneys Top 100, 2025", href: "https://aaoaus.com/" },
  { src: naopiaTopTen, alt: "NAOPIA Nation's Premier Top Ten Personal Injury Attorney, 2025", href: "https://www.naopia.com/" },
  { src: lawyersOfDistinction, alt: "Lawyers of Distinction, 2026", href: "https://www.lawyersofdistinction.com/" },
  { src: truckingTopTen, alt: "Trucking Trial Lawyers Association Top 10", href: "https://thettla.org/" },
  { src: bbbAccredited, alt: "Better Business Bureau Accredited Business", href: "https://www.bbb.org/" },
];

const TrustBadges = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  const label = ko ? "수상 및 인증" : es ? "Reconocimientos" : "Recognition";
  const attorneyLabel = ko ? "변호사 소개" : es ? "Acerca del abogado" : "About the attorney";
  return (
    <aside aria-label={ko ? "수상 및 인증" : es ? "Premios y reconocimientos" : "Awards and recognition"} className="bg-background text-foreground">
      <div className="site-shell py-10 md:py-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-foreground/12 pb-5">
          <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/36">{label}</div>
          <a href={`${prefix}/attorney`} className="inline-flex items-center gap-2 text-[11px] font-medium underline underline-offset-4 transition-opacity hover:opacity-60">
            {attorneyLabel} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge) => (
            <li key={badge.alt}>
              <a href={badge.href} target="_blank" rel="noreferrer nofollow" className="flex h-[80px] items-center justify-center rounded-[3px] border border-[#8a6a48] bg-white px-3 py-2.5 transition-opacity hover:opacity-75">
                <img src={badge.src} alt={badge.alt} loading="lazy" decoding="async" className="max-h-[60px] w-auto max-w-full object-contain" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default TrustBadges;
