import { ArrowUpRight } from "lucide-react";
import { clientReviews } from "@/data/clientReviews";
import type { SiteLocale } from "@/data/injurySite";

const ClientProof = ({ locale = "en", city, limit = 2 }: { locale?: SiteLocale; city?: string; limit?: number }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const all = clientReviews[locale];
  const local = city ? all.filter((review) => review.location === city) : [];
  const rest = all.filter((review) => !local.includes(review));
  const shown = [...local, ...rest].slice(0, Math.max(limit, local.length || 1));
  if (!shown.length) return null;

  return (
    <aside aria-label={ko ? "의뢰인 후기" : es ? "Experiencias de clientes" : "Client experiences"} className="bg-[#eae4db] px-5 py-14 md:py-16">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#211c17]/14 pb-5">
          <div className="text-[10px] uppercase tracking-[0.16em] text-[#211c17]/45">
            {local.length ? ko ? `${city} 의뢰인 후기` : es ? `De un cliente en ${city}` : `From a client in ${city}` : ko ? "의뢰인 후기" : es ? "Lo que dicen los clientes" : "What clients say"}
          </div>
          <a href="https://share.google/LBJ1C8zWrZFjJBkVe" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] font-medium underline underline-offset-4 transition-opacity hover:opacity-60">
            {ko ? "Google에서 보기" : es ? "Leer reseñas en Google" : "Read reviews on Google"} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {shown.map((review) => (
            <figure key={review.name} className="flex h-full flex-col rounded-[4px] bg-[#f6f3ee] p-6">
              <blockquote className="editorial-serif flex-1 text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.5] text-[#211c17]">{review.text}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-[#211c17]/12 pt-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#211c17] text-[11px] font-medium text-[#f3eee5]">{review.initials}</span><span className="text-[12px] leading-4"><span className="block font-medium text-[#211c17]">{review.name}</span><span className="text-[#211c17]/55">{review.location}</span></span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ClientProof;
