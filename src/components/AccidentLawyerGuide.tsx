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
      <div className="border-t border-foreground/12 pt-6">
        <span className="mb-5 block text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/46">
          Accident Lawyer, Buena Park
        </span>
        <h2 className="editorial-serif max-w-[760px] text-[clamp(2rem,3vw,3.45rem)] leading-[1.06] tracking-[-0.026em] text-foreground">
          What an accident lawyer actually does, explained plainly.
        </h2>
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
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="border-t border-foreground/12 pt-5">
              <h4 className="text-[14px] font-semibold tracking-[-0.01em] text-foreground">{service.title}</h4>
              <p className="mt-2.5 text-[13px] leading-[1.65] text-foreground/62">{service.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 max-w-[620px] border-t border-foreground/12 pt-8 lg:mt-16">
        <p className="text-[14px] leading-[1.7] text-foreground/68">
          If you ask us, the biggest mistake people make isn't picking the wrong accident lawyer — its waiting too long to talk to anyone at all. Insurance companies don't wait. They start building there file the same week, sometimes the same day. You don't have to hire the first firm that calls you, but you should at least get your questions answered early, while the evidence is still around to look at.
        </p>
      </div>

      <p className="mt-10 max-w-[760px] text-[10px] leading-4 text-foreground/34">
        This page is for general information only and is not legal advice. Reading it does not create an attorney-client relationship. Deadlines, insurance rules, and comparative fault outcomes depend on the specific facts of your accident — talk to a licensed California attorney about your situation before relying on anything above.
      </p>
    </div>
  </section>
);

export default AccidentLawyerGuide;
