import { ArrowUpRight } from "lucide-react";
import { practiceAreas } from "@/data/injurySite";

const HomePracticeAreasOverview = () => (
  <section aria-labelledby="home-practice-heading" className="bg-[#f7f6f3] py-24 text-foreground md:py-28 lg:py-32">
    <div className="site-shell">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/36">Practice areas</div>
          <h2 id="home-practice-heading" className="editorial-serif mt-5 max-w-[680px] text-[clamp(3rem,5vw,5.6rem)] leading-[0.92] tracking-[-0.035em]">
            Personal injury, focused on what happened to you.
          </h2>
        </div>
        <div className="max-w-[500px] lg:justify-self-end lg:pb-2">
          <p className="text-[14px] leading-7 text-foreground/54">
            The firm handles accident and injury claims involving vehicles, dangerous property conditions, serious injuries, and wrongful death. Each practice page explains the evidence, insurance, and legal issues that can matter.
          </p>
          <a href="/practice-areas" className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium underline underline-offset-4">
            Explore all practice areas <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="mt-16 border-t border-foreground/14 md:mt-20">
        {practiceAreas.map((practice, index) => (
          <a
            key={practice.slug}
            href={`/practice-areas/${practice.slug}`}
            className="group grid gap-3 border-b border-foreground/12 py-6 transition-opacity hover:opacity-55 sm:grid-cols-[52px_1fr_auto] sm:items-center md:py-7"
          >
            <span className="text-[9px] tabular-nums text-foreground/28">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="editorial-serif text-[clamp(1.75rem,2.8vw,3rem)] leading-none tracking-[-0.025em]">
              {practice.title}
            </h3>
            <ArrowUpRight className="h-4 w-4 text-foreground/32 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default HomePracticeAreasOverview;
