import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const GBP_URL = "https://share.google/LBJ1C8zWrZFjJBkVe";
const CASE_EMAIL = "case@buenaparkinjurylawyer.com";

const contactLinks = [
  { label: "Call (+1) 714-690-0007", href: "tel:+17146900007", icon: Phone },
  { label: CASE_EMAIL, href: `mailto:${CASE_EMAIL}`, icon: Mail },
  { label: "Find us on Google", href: GBP_URL, icon: MapPin, external: true },
];

const services = [
  {
    title: "Car Accident Lawyer",
    body: "This is the one most people search for first, and its usually the most common call we get. A car accident lawyer in Buena Park looks at who caused the crash, what insurance is on the table, and how bad the injury really is once the adrenaline wears off. We've heard the same story more times then we can count — someone feels \"okay\" at the scene, tells the other driver not to worry about it, then wakes up the next morning and can't turn there neck. Don't sign anything or give a recorded statement before you've talked to someone.",
  },
  {
    title: "Truck Accident Lawyer",
    body: "Truck wrecks are a different animal. Your not just dealing with one driver, your dealing with a trucking company, a insurance adjuster who works for that company, and sometimes a maintenance shop too. These cases move fast on there end because trucking companies have whole teams ready to investigate a crash within hours. If a commercial truck hit you on the 91 or the 5 near Buena Park, the evidence (dash cam footage, logs, inspection records) can disappear quick if nobody asks for it.",
  },
  {
    title: "Motorcycle Accident Lawyer",
    body: "Riders get hurt worse then people in cars, plain and simple, even when the crash looks minor on paper. A motorcycle accident lawyer spends alot of time fighting an assumption that adjusters make automatically — that the rider must of been speeding or splitting lanes carelessly. Thats not always true, and its usually not fair. We look at lane position, sight lines, and what the other driver actually saw (or didn't see) before they turned or merged.",
  },
  {
    title: "Pedestrian Accident Lawyer",
    body: "Getting hit while your walking is scary because you have literally nothing protecting you. Crosswalks near schools and shopping centers around Buena Park and Anaheim see there share of these, especially at dusk when visibility drops. A pedestrian accident lawyer's job is to pin down where exactly the impact happened, whether the signal was in the walker's favor, and who saw it — because these details get argued about more then people expect.",
  },
  {
    title: "Uber and Lyft Accident Lawyer",
    body: "Rideshare crashes add a wrinkle regular car accidents don't have — what was the driver doing in the app right when it happened? Waiting for a ride request, on there way to pick someone up, or already carrying a passenger all change which insurance policy actually applies. We've seen people get bounced around between insurance companies for weeks because nobody pinned down the drivers app status early. Save your trip receipt and screenshots, they matter more then you'd think.",
  },
  {
    title: "Slip and Fall Lawyer",
    body: "Property owners don't like admitting there floor was wet or there lighting was broke, so these claims get disputed alot. A slip and fall lawyer has to show the hazard existed long enough that someone should of fixed it or at least put up a sign. Take pictures the second it happens if you can, even a quick phone photo of the puddle or the cracked step, because stores clean this stuff up fast — sometimes within minutes.",
  },
  {
    title: "Wrongful Death Lawyer",
    body: "This is the hardest category, and we don't say that lightly. When a family looses someone in a preventable accident, theres legal deadlines and paperwork on top of everything else, at the worst possible time. A wrongful death lawyer tries to take that weight off the family — figuring out who's responsible, what insurance exists, and what the family is owed — so nobody has to make those calls while they're grieving.",
  },
  {
    title: "Serious Injury Lawyer",
    body: "Some injuries don't just heal up in six weeks. Brain injuries, spinal injuries, bad fractures — these change what a person can do for years, sometimes forever. A serious injury lawyer has to think past the first hospital bill and ask what care looks like five or ten years from now, and what that costs. Its a bigger lift then a routine claim, and honestly it should be treated that way.",
  },
];

const AccidentLawyerGuide = () => (
  <section id="accident-lawyer-guide" className="bg-background py-16 md:py-20 lg:py-24">
    <div className="site-shell">
      <div className="flex flex-wrap items-start justify-between gap-6 border-t border-foreground/12 pt-6">
        <div>
          <span className="mb-5 block text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/46">
            Accident Lawyer, Buena Park
          </span>
          <h2 className="editorial-serif max-w-[760px] text-[clamp(2rem,3vw,3.45rem)] leading-[1.06] tracking-[-0.026em] text-foreground">
            What an accident lawyer actually does, explained plainly.
          </h2>
        </div>
        <a
          href={GBP_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/14 px-4 py-2 text-[11px] font-medium text-foreground/68 transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2.1H12v4h5.4a4.6 4.6 0 0 1-2 3v2.6h3.2c1.9-1.8 3-4.3 3-7.5Z" />
            <path fill="#34A853" d="M12 22c2.7 0 5-0.9 6.6-2.3l-3.2-2.6c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0 0 12 22Z" />
            <path fill="#FBBC05" d="M6.4 14a6 6 0 0 1 0-4V7.4H3a10 10 0 0 0 0 9.2L6.4 14Z" />
            <path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3 7.4L6.4 10C7.2 7.7 9.4 5.9 12 5.9Z" />
          </svg>
          Buena Park Injury Lawyer on Google
        </a>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="max-w-[540px] text-[14px] leading-[1.7] text-foreground/68">
          <p>
            Most people don't think about hiring an accident lawyer until the day they actually need one. Your bumper is crunched, your neck hurts, and an insurance adjuster is already calling asking you for a recorded statement. Thats usually how it starts.
          </p>
          <p className="mt-5">
            We've talked to alot of folks in Buena Park who tell a version of the same story. They were driving to work on Beach Blvd, or walking near a shopping center, and then everything changed in about two seconds. One minute your fine, the next your dealing with doctors, missed paychecks, and an insurance company that suddenly isn't returning your calls as fast as they use to.
          </p>
          <p className="mt-5">
            If your reading this because something like that happened, your in the right place. This part of the page is here to explain — in plain language, not legal jargon — what an accident lawyer does in California, what the deadlines actually are, and what your options might look like.
          </p>
        </div>

        <div className="max-w-[560px] text-[14px] leading-[1.7] text-foreground/68">
          <h3 className="editorial-serif text-[clamp(1.3rem,1.6vw,1.7rem)] leading-[1.15] tracking-[-0.015em] text-foreground">
            The local part that actually matters
          </h3>
          <p className="mt-4">
            Buena Park sits right at a busy North Orange County crossroads, and the firm also hears from people in Anaheim, Fullerton, Garden Grove, Cypress, La Habra, La Mirada, Cerritos, Norwalk, and Whittier — cities close enough that a single freeway trip on the 5 or 91 crosses through most of them. If a lawsuit ends up getting filed, injury cases from this part of the county are usually handled out of the North Justice Center courthouse in Fullerton, not downtown Santa Ana.
          </p>
          <p className="mt-4">
            California generally gives you two years from the date of the accident to file a personal injury lawsuit. Two years sounds like alot of time and it isn't, especially once you factor in that claims against a city, county, or other government agency can require written notice in a matter of months, not years. California also uses whats called comparative fault, meaning you can still have a claim even if your partly at fault — the amount you can recover just gets reduced by your share of the blame.
          </p>
        </div>
      </div>

      <div className="mt-14 border-t border-foreground/12 pt-10 lg:mt-16 lg:pt-12">
        <h3 className="editorial-serif max-w-[620px] text-[clamp(1.6rem,2.2vw,2.3rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
          The kind of accident cases we handle, one at a time.
        </h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="rounded-[4px] border border-foreground/10 bg-[#f7f6f3] p-5 transition-colors hover:border-foreground/22 hover:bg-[#f1efe9]"
            >
              <div className="text-[10px] tabular-nums text-foreground/35">{String(index + 1).padStart(2, "0")}</div>
              <h4 className="mt-2 text-[14px] font-semibold tracking-[-0.01em] text-foreground">{service.title}</h4>
              <p className="mt-2.5 text-[13px] leading-[1.65] text-foreground/62">{service.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-10 border-t border-foreground/12 pt-10 lg:mt-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <blockquote className="editorial-serif max-w-[620px] border-l-2 border-foreground/16 pl-5 text-[clamp(1.15rem,1.5vw,1.4rem)] leading-[1.4] tracking-[-0.012em] text-foreground/82">
          If you ask us, the biggest mistake people make isn't picking the wrong accident lawyer — its waiting too long to talk to anyone at all. Insurance companies don't wait. They start building there file the same week, sometimes the same day.
        </blockquote>

        <div className="flex flex-col gap-3">
          {contactLinks.map(({ label, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group inline-flex items-center gap-2.5 text-[13px] text-foreground/68 transition-colors hover:text-foreground"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/14 transition-colors group-hover:border-foreground/30">
                <Icon className="h-3.5 w-3.5" />
              </span>
              {label}
              <ArrowUpRight className="h-3 w-3 text-foreground/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </div>

      <p className="mt-10 max-w-[760px] text-[10px] leading-4 text-foreground/34">
        This page is for general information only and is not legal advice. Reading it does not create an attorney-client relationship. Deadlines, insurance rules, and comparative fault outcomes depend on the specific facts of your accident — talk to a licensed California attorney about your situation before relying on anything above.
      </p>
    </div>
  </section>
);

export default AccidentLawyerGuide;
