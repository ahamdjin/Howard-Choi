import { ArrowUpRight } from "lucide-react";

const ClientSuccessFeature = () => (
  <section className="flex min-h-[100svh] w-full bg-[#f7f6f3] text-foreground">
    <div className="site-shell flex min-h-[100svh] w-full flex-col py-8 sm:py-10 lg:py-12">
      <div className="text-center">
        <div className="text-[10px] text-foreground/44">Client Experience</div>
        <h2 className="editorial-serif mt-4 text-[clamp(2rem,3vw,3.4rem)] leading-[1.04] tracking-[-0.03em]">
          Clear guidance<br />
          <span className="text-foreground/42">when it matters most.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[430px] text-[13px] leading-[1.55] text-foreground/64 sm:text-[14px]">
          Clients often remember the communication just as much as the outcome.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-[3px] bg-[#171717] px-4 py-3 text-[11px] font-medium text-white"
        >
          Start a Conversation <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="mt-10 flex flex-1 items-center sm:mt-12 lg:mt-14">
        <div className="mx-auto grid w-full max-w-[1260px] overflow-hidden bg-[#e8e6e1] lg:grid-cols-[0.34fr_0.66fr]">
          <div className="relative min-h-[34svh] sm:min-h-[40svh] lg:min-h-[470px]">
            <img
              src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=84"
              alt="Client meeting with legal counsel"
              className="absolute inset-0 h-full w-full object-cover grayscale-[12%]"
            />
            <div className="absolute inset-0 bg-black/[0.05]" />
          </div>

          <div className="flex min-h-[430px] flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <p className="editorial-serif max-w-[720px] text-[clamp(1.45rem,2.1vw,2.15rem)] leading-[1.2] tracking-[-0.018em]">
                  “I always knew what was happening next. Questions were answered clearly, and the process never felt like I was being passed from person to person.”
                </p>
                <div className="mt-6 text-[11px] font-medium">Maria R.</div>
                <div className="mt-1 text-[10px] text-foreground/46">Buena Park</div>
              </div>
              <div className="editorial-serif text-[1.55rem] text-foreground/72">Buena Park</div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-foreground/12 pt-5 sm:gap-6">
              <div>
                <div className="editorial-serif text-[1.45rem] leading-none sm:text-[1.8rem]">4.9 / 5</div>
                <div className="mt-2 text-[9px] leading-4 text-foreground/44 sm:text-[10px]">Client rating</div>
              </div>
              <div>
                <div className="editorial-serif text-[1.45rem] leading-none sm:text-[1.8rem]">200+</div>
                <div className="mt-2 text-[9px] leading-4 text-foreground/44 sm:text-[10px]">Five-star reviews</div>
              </div>
              <div>
                <div className="editorial-serif text-[1.45rem] leading-none sm:text-[1.8rem]">1:1</div>
                <div className="mt-2 text-[9px] leading-4 text-foreground/44 sm:text-[10px]">Attorney access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ClientSuccessFeature;
