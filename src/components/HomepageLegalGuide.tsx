import { ArrowRight } from "lucide-react";
import carImage from "@/assets/law-firm/car-collision.jpg";
import courthouseImage from "@/assets/law-firm/hero-courthouse.webp";

const HomepageLegalGuide = () => (
  <div className="bg-[#f4f0e8] text-[#191612]">
    <section className="site-shell grid gap-10 py-20 md:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
      <div className="relative min-h-[520px] overflow-hidden rounded-[3px] bg-black">
        <img src={carImage} alt="Car collision representing an accident claim" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-8 md:left-8 md:right-8">
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/52">Accident Lawyer in Buena Park, CA</span>
          <h2 className="editorial-serif mt-3 max-w-[520px] text-[clamp(2.8rem,4.8vw,5rem)] leading-[0.92] tracking-[-0.035em]">
            You Got Hurt.<br />Now What?
          </h2>
        </div>
      </div>

      <div className="max-w-[660px] text-[15px] leading-7 text-black/68 md:text-[16px]">
        <p>
          One second you're driving home from work on Beach Blvd, and the next second your car is spun sideways and your neck hurts so bad you can't turn your head. Or maybe it wasn't a car crash. Maybe you slipped on a wet floor at a store near Buena Park Downtown, or someone ran a red light near Knott Ave and Crescent, or you got a call that a loved one didn't make it home because another driver was drunk.
        </p>
        <p className="mt-5">
          These things happen every single day in Buena Park and all around Orange County. And most people have no idea what to do next. Do you talk to the insurance company? Do you sign that paper they mailed you? Do you just pay your own medical bills and hope it works out?
        </p>
        <p className="mt-5">
          At Buena Park Injury Lawyer, we've sat across the table from people going through exactly this. Not made-up stories — the kind of thing that happens to regular folks who were just trying to get through their day. A guy on his way to pick up his kid gets rear-ended on Malvern Ave and ends up with a hurt back for months. A mom crossing the street near a Buena Park school gets clipped by a car that didn't stop. A family loses someone because a driver made the choice to get behind the wheel after drinking. Every one of these cases is different, but the fear and confusion right after it happens? That part is almost always the same.
        </p>
        <p className="mt-5 text-black/88">
          This page is here to help you understand your options in plain words. No fancy talk. No pressure.
        </p>
      </div>
    </section>

    <section className="bg-[#181715] text-white">
      <div className="site-shell grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/34">DUI defense</span>
          <h2 className="editorial-serif mt-4 text-[clamp(2.5rem,3.8vw,4.2rem)] leading-[0.94] tracking-[-0.035em]">
            DUI Defense — When You're the One Facing Charges
          </h2>
          <div className="mt-8 space-y-5 text-[15px] leading-7 text-white/62">
            <p>
              Not everyone reading this got hurt by someone else. Some of you are here because you got pulled over after a few drinks and now you're staring down a DUI charge, and honestly, you're scared.
            </p>
            <p>
              We get it. A DUI in California is not something to brush off, but it's also not the end of your life. First-time DUI cases in Orange County usually go through the courts in Fullerton or Santa Ana, and what happens depends a lot on your blood alcohol level, whether anyone got hurt, and if you've been in this spot before.
            </p>
            <p>
              Here's an opinion a lot of lawyers won't say out loud: not every DUI case is a slam dunk for the prosecution. Breath tests can be wrong. Traffic stops sometimes get made without a real legal reason. Field sobriety tests are honestly kind of unfair to begin with — try walking a straight line, heel to toe, on the side of a dark road with flashing lights in your face and a cop staring at you, sober or not. A good defense looks at every piece of that stop, not just the number on the breathalyzer.
            </p>
            <p>
              If you're facing DUI charges, the biggest mistake is waiting too long to get help or assuming you should just plead guilty because you feel guilty about drinking and driving. Feeling bad about it and having a fair legal process are two different things.
            </p>
          </div>
        </div>

        <div className="relative min-h-[560px] overflow-hidden rounded-[3px]">
          <img src={courthouseImage} alt="Courthouse interior" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>
    </section>

    <section className="site-shell grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-20">
      <div>
        <span className="text-[9px] uppercase tracking-[0.18em] text-black/35">Law firm</span>
        <h2 className="editorial-serif mt-4 text-[clamp(2.5rem,3.7vw,4.1rem)] leading-[0.95] tracking-[-0.035em]">
          Why "Law Firm" Matters More Than People Think
        </h2>
        <div className="mt-7 space-y-5 text-[15px] leading-7 text-black/66">
          <p>
            A lot of people search for a lawyer and don't think much about the difference between hiring one person versus hiring an actual law firm. Here's our honest take: accidents and DUI cases involve paperwork, deadlines, medical records, police reports, and sometimes negotiations that drag on for months. One person working alone, juggling fifty other things, can miss a deadline or let a case sit too long.
          </p>
          <p>
            A law firm means there's a team behind your case — someone tracking your medical bills, someone handling calls with the insurance company, someone keeping an eye on court dates. When you're the one recovering from an injury or worrying about a criminal charge, having more than one set of eyes on your file is a good thing, not a luxury.
          </p>
        </div>
      </div>

      <div>
        <span className="text-[9px] uppercase tracking-[0.18em] text-black/35">Attorney</span>
        <h2 className="editorial-serif mt-4 text-[clamp(2.5rem,3.7vw,4.1rem)] leading-[0.95] tracking-[-0.035em]">
          What an Attorney Actually Does For You (In Plain English)
        </h2>
        <div className="mt-7 space-y-5 text-[15px] leading-7 text-black/66">
          <p>
            People picture lawyers as guys in suits giving speeches in a courtroom. In real life, most of the work happens way before that. Your attorney gathers evidence — photos, police reports, witness names, medical records. They talk to the insurance company so you don't have to keep repeating your story to strangers. They figure out what your case is actually worth, based on real numbers, not guesses. And if the other side won't offer a fair deal, they're ready to take the case to court in front of a judge.
          </p>
          <p>
            An attorney is also the person who tells you the truth, even when it's not what you want to hear. Sometimes a case is strong. Sometimes it needs more evidence. A good attorney explains where you stand instead of just telling you what sounds nice.
          </p>
        </div>
      </div>
    </section>

    <section className="border-t border-black/10 bg-[#ebe6dd]">
      <div className="site-shell grid gap-12 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <span className="text-[9px] uppercase tracking-[0.18em] text-black/35">Local service area</span>
          <h2 className="editorial-serif mt-4 text-[clamp(2.6rem,4vw,4.5rem)] leading-[0.94] tracking-[-0.035em]">
            Serving Buena Park and Nearby Communities
          </h2>
          <div className="mt-7 space-y-5 text-[15px] leading-7 text-black/66">
            <p>
              We work with people throughout Buena Park, plus folks in Anaheim, Fullerton, and Cerritos — basically anywhere within a few miles of home base. Whether your case is heading to Orange County Superior Court, or you're dealing with an insurance company that doesn't operate anywhere near here, the process usually feels the same for the person going through it: confusing, stressful, and full of forms you didn't ask for.
            </p>
            <p>
              Local knowledge actually matters here. Knowing which stretches of road see the most crashes, which courts handle which cases, and how local insurance adjusters tend to operate can make a real difference in how a case gets handled.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-[11px]">
            {["Buena Park", "Anaheim", "Fullerton", "Cerritos"].map((city) => (
              <span key={city} className="rounded-full border border-black/14 px-4 py-2 text-black/58">{city}</span>
            ))}
          </div>
        </div>

        <div className="rounded-[3px] bg-[#171717] p-8 text-white md:p-10">
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/34">What To Do Right Now</span>
          <h2 className="editorial-serif mt-4 text-[clamp(2.4rem,3.4vw,3.8rem)] leading-[0.95] tracking-[-0.03em]">
            If you got hurt or you're facing a DUI charge, here's the short version of what actually helps:
          </h2>
          <ul className="mt-8 space-y-0 border-t border-white/12">
            {[
              "See a doctor, even if you think you're fine. Some injuries show up days later.",
              "Write down what happened while it's fresh — dates, times, what was said.",
              "Don't sign anything from an insurance company before someone reviews it.",
              "Don't wait months to reach out. Evidence disappears and deadlines get closer every day.",
            ].map((item, index) => (
              <li key={item} className="grid grid-cols-[30px_1fr] gap-3 border-b border-white/12 py-4 text-[14px] leading-6 text-white/64">
                <span className="text-white/30">0{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f3eee5] px-5 py-3 text-[12px] font-medium text-[#17130f]"
          >
            Let's Talk <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  </div>
);

export default HomepageLegalGuide;
