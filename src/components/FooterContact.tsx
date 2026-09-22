import { MapPin, Phone, Mail } from "lucide-react";
import { brand, type SiteLocale } from "@/data/injurySite";

// Lucide has no Yelp mark, so this is the official burst as inline SVG.
const YelpIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M12.6 2.1c1.4.2 3.4.9 4 1.5.2.2.3.5.3.8l-.9 7.2c-.1.9-1.2 1.2-1.8.5l-2.4-3A1 1 0 0 1 11.7 8l.3-5.1c0-.5.3-.8.6-.8Zm-3.9 5.3 2.2 4.4c.4.8-.3 1.7-1.2 1.5L4.3 12c-.4-.1-.6-.4-.6-.8 0-1.2.4-3 1-3.9.2-.3.5-.4.8-.3l2.5.6c.3.1.5.3.7.5Zm11.6 6.4c.4.2.6.6.4 1-.4 1.1-1.4 2.5-2.3 3.1-.3.2-.6.1-.9-.1l-3-3c-.6-.7-.1-1.8.8-1.8l4.2-.1c.3 0 .6 0 .8.1Zm-9.3 1.6c.7-.5 1.7 0 1.7.9l-.1 4.4c0 .4-.3.7-.7.8-1.1.2-2.8-.1-3.8-.6-.3-.2-.5-.5-.4-.9l1.2-3.4c.1-.3.2-.5.5-.7Zm5.4 2.4 2.1 2.9c.2.3.2.7-.1.9-.9.7-2.4 1.3-3.5 1.4-.4 0-.7-.2-.8-.6l-.7-3.5c-.2-.9.8-1.6 1.6-1.2l1.4.7c.3.1.5.2.6.4Z" />
  </svg>
);

const FooterContact = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  return (
    <div>
      <div className="mb-5 text-[12px] text-muted-foreground">{ko ? "연락처" : "Contact"}</div>

      <a
        href={brand.mapsHref}
        target="_blank"
        rel="noreferrer"
        className="group flex gap-2.5 text-[13px] leading-6 hover:opacity-60"
      >
        <MapPin aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span>
          {brand.address}
          <span className="mt-1 block text-[11px] text-muted-foreground underline underline-offset-4">
            {ko ? "지도에서 보기" : "View on Google Maps"}
          </span>
        </span>
      </a>

      <a href={brand.phoneHref} className="mt-4 flex items-center gap-2.5 text-[13px] font-medium hover:opacity-60">
        <Phone aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        {brand.phoneDisplay}
      </a>

      <a href={brand.emailHref} className="mt-2.5 flex items-center gap-2.5 text-[13px] hover:opacity-60">
        <Mail aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        {brand.email}
      </a>

      <div className="mt-5 flex items-center gap-3">
        <a
          href={brand.gbpHref}
          target="_blank"
          rel="noreferrer"
          aria-label={ko ? "Google 비즈니스 프로필" : "Google Business Profile"}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 transition-colors hover:border-foreground/40"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2.1H12v4h5.4a4.6 4.6 0 0 1-2 3v2.6h3.2c1.9-1.8 3-4.3 3-7.5Z" />
            <path fill="#34A853" d="M12 22c2.7 0 5-0.9 6.6-2.3l-3.2-2.6c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0 0 12 22Z" />
            <path fill="#FBBC05" d="M6.4 14a6 6 0 0 1 0-4V7.4H3a10 10 0 0 0 0 9.2L6.4 14Z" />
            <path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3 7.4L6.4 10C7.2 7.7 9.4 5.9 12 5.9Z" />
          </svg>
        </a>

        {brand.yelpHref ? (
          <a
            href={brand.yelpHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Yelp"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 text-[#d32323] transition-colors hover:border-foreground/40"
          >
            <YelpIcon className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default FooterContact;
