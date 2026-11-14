import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import type { SiteLocale } from "@/data/injurySite";

type SplitPageHeroProps = {
  locale: SiteLocale;
  breadcrumb: string;
  title: string;
  description: string;
  action: { href: string; label: string };
  children: ReactNode;
};

export function SplitPageHero({ locale, breadcrumb, title, description, action, children }: SplitPageHeroProps) {
  return (
    <section className="site-shell pt-28 md:pt-36">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-[#2b241e]/15 bg-[#fdfbf7] lg:grid-cols-2">
        <div className="min-w-0 px-5 py-8 sm:p-8 lg:p-10 xl:p-12">
          <PageBreadcrumb locale={locale} title={breadcrumb} />
          <h1
            style={locale === "ko" ? { fontFamily: '"Noto Serif KR", serif' } : undefined}
            className="editorial-serif max-w-[17ch] text-balance text-[clamp(2.45rem,4.15vw,4.35rem)] leading-[1.07]"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-pretty text-base leading-7 text-[#54483e]">{description}</p>
          <a href={action.href} className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#2b241e] px-5 py-3 text-sm font-semibold text-white hover:bg-[#47382c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b241e]">
            {action.label}
            <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
          </a>
        </div>
        {children}
      </div>
    </section>
  );
}
