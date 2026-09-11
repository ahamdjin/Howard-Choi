import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import courthouseImage from "@/assets/law-firm/hero-courthouse.webp";
import boardroomImage from "@/assets/law-firm/hero-city-boardroom.webp";
import officeImage from "@/assets/law-firm/hero-law-office.webp";

const results = [
  {
    title: "Pedestrian Injury",
    amount: "$3.2M",
    detail: "Serious orthopedic and neurological injuries",
    location: "Los Angeles County",
    image: courthouseImage,
  },
  {
    title: "Auto Collision",
    amount: "$1.75M",
    detail: "Disputed-liability injury claim",
    location: "Orange County",
    image: boardroomImage,
  },
  {
    title: "Premises Liability",
    amount: "$875K",
    detail: "Unsafe-property injury claim",
    location: "Southern California",
    image: officeImage,
  },
];

const SelectedResult = () => {
  const [active, setActive] = useState(0);
  const result = results[active];

  return (
    <section className="flex min-h-[100svh] w-full bg-[#0f0f0f] text-[#f4f1ea]">
      <div className="site-shell flex min-h-[100svh] w-full flex-col py-8 sm:py-10 lg:py-12">
        <div className="grid gap-8 border-t border-white/10 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          <div>
            <div className="text-[10px] text-white/42">Selected Result</div>
            <h2 className="editorial-serif mt-4 text-[clamp(2.1rem,3vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
              Built around the facts.
            </h2>
          </div>

          <div className="max-w-[470px] lg:justify-self-end">
            <p className="text-[13px] leading-[1.55] text-white/62 sm:text-[14px]">
              We prepare each case around the evidence, the medical impact, and what the injury changed for the client.
            </p>
            <a
              href="/results"
              className="mt-5 inline-flex items-center gap-2 rounded-[3px] bg-[#f3eee5] px-4 py-3 text-[11px] font-medium text-[#17130f]"
            >
              View Case Results <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-10 grid flex-1 gap-8 lg:grid-cols-[0.52fr_1.48fr] lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-center border-t border-white/10">
            {results.map((item, index) => {
              const selected = active === index;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className="group border-b border-white/10 py-5 text-left sm:py-6"
                >
                  <div className={`text-[14px] transition-colors sm:text-[15px] ${selected ? "text-white" : "text-white/42 group-hover:text-white/72"}`}>
                    {item.title}
                  </div>
                  {selected && (
                    <div className="mt-2 max-w-[340px] text-[11px] leading-5 text-white/46">
                      {item.detail}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[44svh] overflow-hidden bg-[#191919] sm:min-h-[50svh] lg:min-h-0">
            <img src={result.image} alt="Selected personal injury case" className="absolute inset-0 h-full w-full object-cover opacity-55" />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute left-5 top-5 text-[11px] font-medium text-white/86 sm:left-7 sm:top-7">Buena Park Injury Lawyer</div>
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
              <div className="editorial-serif text-[clamp(3.2rem,6vw,6rem)] leading-none tracking-[-0.045em]">{result.amount}</div>
              <div className="mt-3 border-t border-white/18 pt-3 text-[10px] uppercase tracking-[0.12em] text-white/48">
                {result.title} · {result.location}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 max-w-[760px] text-[9px] leading-4 text-white/28">
          Prior results do not guarantee a similar outcome. Every matter depends on its own facts and circumstances.
        </p>
      </div>
    </section>
  );
};

export default SelectedResult;
