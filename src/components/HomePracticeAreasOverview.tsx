import { ArrowUpRight } from "lucide-react";
import { practiceAreas } from "@/data/injurySite";

const HomePracticeAreasOverview = () => (
  <section aria-labelledby="home-practice-heading" className="bg-[#f7f6f3] py-16 text-foreground md:py-20">
    <div className="site-shell">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/40">Personal injury practice areas</div>
          <h2 id="home-practice-heading" className="editorial-serif mt-4 max-w-[500px] text-[clamp(2.6rem,4vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
            Help for the accident that changed what comes next.
          </h2>
          <p className="mt-5 max-w-[430px] text-[13px] leading-6 text-foreground/56">
            Explore the firm&apos;s main personal injury practice areas. Each page explains the evidence, insurance questions, damages, and next steps that can matter for that type of claim.
          </p>
          <a href="/practice-areas" className="mt-7 inline-flex items-center gap-2 text-[12px] font-medium underline underline-offset-4">
            View all practice areas <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid border-t border-foreground/12 sm:grid-cols-2">
          {practiceAreas.map((practice, index) => (
            <a
              key={practice.slug}
              href={`/practice-areas/${practice.slug}`}
              className={`group flex min-h-[150px] flex-col justify-between border-b border-foreground/12 py-5 sm:px-6 ${index % 2 === 0 ? "sm:border-r sm:pl-0" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-[9px] tabular-nums text-foreground/28">{String(index + 1).padStart(2, "0")}</span>
                <ArrowUpRight className="h-4 w-4 text-foreground/28 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <div>
                <h3 className="editorial-serif text-[1.5rem] leading-tight">{practice.title}</h3>
                <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-foreground/48">{practice.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HomePracticeAreasOverview;
