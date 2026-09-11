import { ArrowUpRight } from "lucide-react";

const metrics = [
  { value: "$100M+", label: "Recovered" },
  { value: "1,500+", label: "Clients represented" },
  { value: "4.9 / 5", label: "Client rating" },
  { value: "24 / 7", label: "Case intake" },
];

const FirmSnapshot = () => (
  <section className="flex min-h-[100svh] w-full bg-[#f7f6f3] text-foreground">
    <div className="site-shell flex min-h-[100svh] w-full flex-col py-8 sm:py-10 lg:py-12">
      <div className="border-t border-foreground/12 pt-6">
        <div className="text-[10px] font-medium tracking-[-0.01em] text-foreground/46">Why Clients Choose Us</div>
      </div>

      <div className="grid flex-1 content-center py-10 lg:grid-cols-[0.25fr_0.75fr] lg:py-8">
        <div className="hidden lg:block" />
        <div className="max-w-[1180px]">
          <h2 className="editorial-serif max-w-[1120px] text-[clamp(2rem,3vw,3.45rem)] leading-[1.08] tracking-[-0.028em] text-foreground">
            Personal injury representation built around preparation, communication, and direct attorney involvement.
          </h2>

          <div className="mt-10 max-w-[470px] sm:mt-12">
            <p className="text-[13px] leading-[1.55] text-foreground/68 sm:text-[14px]">
              We help injured clients understand what matters, organize the evidence, and move through the claim with a clear strategy from the beginning.
            </p>

            <a
              href="/attorney"
              className="mt-7 inline-flex items-center gap-2 rounded-[3px] bg-[#171717] px-4 py-3 text-[11px] font-medium text-white transition-opacity hover:opacity-82"
            >
              Meet Howard Choi <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-foreground/14 sm:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`flex min-h-[118px] flex-col justify-between px-4 py-4 sm:min-h-[150px] sm:px-5 sm:py-5 lg:min-h-[170px] ${index > 0 ? "border-l border-foreground/14" : ""} ${index === 2 ? "border-l-0 border-t border-foreground/14 sm:border-l sm:border-t-0" : ""} ${index === 3 ? "border-t border-foreground/14 sm:border-t-0" : ""}`}
          >
            <div className="editorial-serif text-[clamp(2rem,3.6vw,4rem)] leading-none tracking-[-0.04em]">{metric.value}</div>
            <div className="text-[9px] leading-4 text-foreground/46 sm:text-[10px]">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FirmSnapshot;
