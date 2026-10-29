export type EnglishPracticeGuide = {
  title: string;
  summary: string;
  topics: Array<[title: string, explanation: string]>;
};

// Original, matter-specific editorial supplements. Review with attorney before
// publication; do not present these as quotes or imply proven case outcomes.
export const englishPracticeGuides: Record<string, EnglishPracticeGuide> = {
  "car-accidents": {
    title: "How a Buena Park car accident claim is investigated",
    summary: "The practical questions are not limited to who received a ticket. A useful investigation separates what happened in traffic, who may be legally responsible, which policies are available, and what the injury has changed over time.",
    topics: [
      [
        "Reconstruct the precise collision sequence",
        "Start with the lanes, direction of travel, traffic signals, approach speed where supportable, sightlines, final vehicle positions and physical damage. At a busy Beach Boulevard intersection, a wide-angle scene image may help explain a turning or lane-change dispute better than a close-up of a bumper. Compare photographs, witness accounts and available footage rather than treating a police narrative as conclusive."
      ],
      [
        "Preserve evidence before repairs or overwriting",
        "Save original photos, vehicle identification, repair estimates, dashcam files, tow records, witness contacts and any nearby business-camera locations. If vehicles will be repaired or salvaged, determine whether their condition or electronic data need documentation first. Keep the complete insurer correspondence and accident-report number, including what is known and what remains uncertain."
      ],
      [
        "Identify the entire insurance picture",
        "The at-fault driver's policy is only a starting point. Depending on the facts, owner, employer, commercial, rideshare and uninsured/underinsured motorist coverage can raise separate issues. Keep declarations and coverage letters rather than relying on the phrase 'full coverage.' Insurance availability must be analyzed separately from the amount of medically supported damages."
      ],
      [
        "Connect treatment and lost work to the crash",
        "Create an accurate chronology of first symptoms, examinations, referrals, work restrictions, missed shifts and later rehabilitation. Distinguish preexisting conditions, changes after the collision and treatments actually recommended by clinicians. Future care or earning loss needs support; it should not be projected solely from the severity of vehicle damage."
      ]
    ]
  },
  "truck-accidents": {
    title: "Four investigations inside one commercial truck claim",
    summary: "A tractor-trailer, delivery van or company fleet crash can involve far more evidence and potentially responsible parties than a private-vehicle collision. The right records depend on the vehicle, carrier and driver's role.",
    topics: [
      [
        "Determine who controlled the driver and equipment",
        "Find the carrier name and identifiers, tractor and trailer ownership, employer or contractor relationships, shipping and delivery roles, and maintenance responsibilities. Do not assume a branded truck means the visible company is the only defendant. Accurate business and vehicle identification should precede conclusions about responsibility."
      ],
      [
        "Preserve operational and electronic records",
        "Relevant records might include electronic logging device (ELD) data, hours-of-service logs, dispatch messages, maintenance and inspection records, driver qualifications and onboard footage. Different documents may have different retention periods and legal requirements. A timely, appropriately scoped preservation request may be important; the public should not presume every carrier stores all records indefinitely."
      ],
      [
        "Examine crash mechanics independently",
        "Photographs of roadway layout, impact points, cargo conditions, tire marks and post-crash vehicle placement can help test driver accounts. A trucking crash does not prove a federal hours-of-service violation; that question requires reliable records and careful interpretation of the applicable rules. Witnesses, police investigation and other vehicles may supply different pieces."
      ],
      [
        "Plan for serious or long-term loss",
        "Commercial crashes can involve rehabilitation, surgery, work restrictions and complex future-care needs. Keep treatment opinions, realistic functional assessments, wage records and coverage information in separate files. Responsibility, value and actual collectability are distinct questions; high commercial policy limits do not guarantee a particular case outcome."
      ]
    ]
  },
  "motorcycle-accidents": {
    title: "Where a motorcycle collision case is won or lost",
    summary: "The central task is to test physical evidence against assumptions about how the rider behaved. A rider's injury may be serious even where the striking car sustained modest visible damage.",
    topics: [
      [
        "Check the turn, lane and visibility evidence",
        "Left-turn, merging and lane-change events depend on approach geometry, timing, signs, striping, speed evidence, the parties' sightlines and the point of impact. Photograph the roadway from each participant's perspective where it is safe. Avoid assuming that one driver's statement or a rider's lane position determines fault."
      ],
      [
        "Retain riding gear and vehicle condition",
        "Keep photographs and, when appropriate, the helmet, damaged clothing and motorcycle parts before repairs. These materials may be helpful for analysis but should not be interpreted by nonclinicians as diagnosing a head injury. Identify nearby camera systems and independent witnesses promptly; video may be overwritten."
      ],
      [
        "Identify coverage and responsibility",
        "Passenger vehicles, owners and riders' own UM/UIM policies may be relevant. Work-related trips, commercial vehicles and unidentified drivers may add questions. Read the policy terms and notice requirements. California comparative-fault principles can be relevant, but a rider should not assume every road maneuver was unlawful or every insurer assessment is final."
      ],
      [
        "Document long-term functional effects",
        "Orthopedic injuries, scarring, rehabilitation and return-to-work restrictions deserve their own timeline. Track actual medical recommendations, expenses, missed employment and loss of ordinary activities rather than using the motorcycle's repair cost as a proxy for bodily harm. Claims for future losses require evidence of likely needs."
      ]
    ]
  },
  "pedestrian-accidents": {
    title: "Critical facts to establish in a pedestrian injury claim",
    summary: "Crosswalk cases require a precise scene reconstruction. The driver's speed and movement, pedestrian position and traffic signals can be disputed long after the incident.",
    topics: [
      [
        "Identify the impact point and signal sequence",
        "Preserve crosswalk markings, curb ramps, lane arrows, signals, light conditions, turning paths and nearby obstructions. Record from where the pedestrian entered the road and each vehicle approached. Do not assume a marked crossing automatically resolves every question or that an unmarked crossing means the pedestrian has no rights."
      ],
      [
        "Secure the most fragile evidence",
        "Storefront, traffic and doorbell footage can be overwritten, and witness contact information is often lost quickly. Note the exact camera location, approximate time and the person who controls the footage. Preserve witness descriptions in their own words without telling people what conclusion to reach."
      ],
      [
        "Investigate hit-and-run and commercial involvement",
        "If a driver flees, partial plate, vehicle description, debris, damage and incident numbers become particularly important. Business vehicles or rideshare trips may introduce other insurance and responsible-party questions. Check actual policy terms before assuming coverage is available."
      ],
      [
        "Measure mobility and independence losses",
        "Pedestrian injuries may require assistive devices, home help, physical therapy or time away from work. Keep clinical treatment recommendations, functional restrictions, transportation costs and documented effects on daily responsibilities. Separate current expenses from future services that remain uncertain."
      ]
    ]
  },
  "rideshare-accidents": {
    title: "The rideshare evidence that changes an insurance analysis",
    summary: "For an Uber or Lyft claim, the same collision may raise different coverage questions depending on the driver's actual status in the app. The crash facts and trip facts both matter.",
    topics: [
      [
        "Preserve app status and trip details",
        "Save trip receipts, pickup/drop-off details, driver identification, vehicle information, screenshots and in-app messages without altering originals. Record the approximate collision time and what the app showed immediately before and afterward. The driver being online, waiting, en route to pick up or carrying a passenger may affect the coverage inquiry."
      ],
      [
        "Document what happened on the road",
        "App activity is not a substitute for proving liability. Preserve photos, witness names, police reports, signal or lane information and vehicle damage. Determine whether the rideshare driver, another driver or a different party may have caused or contributed to the crash."
      ],
      [
        "Map overlapping insurance before signing",
        "The rideshare company, driver's personal coverage, another motorist's policy and other sources may be implicated in different circumstances. The California Public Utilities Commission publishes transportation-network-company insurance requirements, but application still turns on the particular trip and policy. Do not infer a guaranteed policy limit or recovery from a rideshare logo."
      ],
      [
        "Keep medical and employment timelines organized",
        "Injuries, follow-up care, work absences, future recommendations and insurer communications should be dated and preserved. Document losses supported by records, and obtain advice before signing broad releases that could affect multiple claims or coverage layers."
      ]
    ]
  },
  "slip-and-fall": {
    title: "What a California property-injury investigation needs to establish",
    summary: "A fall is an event; premises liability usually requires proof about the unsafe condition, who controlled the site and what reasonable inspection or warning should have occurred.",
    topics: [
      [
        "Describe and preserve the specific hazard",
        "Record the spill, uneven flooring, lighting condition, obstruction or broken surface from multiple distances, without creating another risk. Include the surrounding warning signs, entry points and lighting. A photograph of the floor after cleanup may not accurately capture what caused the incident."
      ],
      [
        "Ask who maintained the area and what they knew",
        "A tenant, building owner, manager or contractor may control different portions of a property. Inspection schedules, cleaning records, incident reports, repair history and prior complaints may matter. It is not enough to assume a store is responsible merely because a person fell there."
      ],
      [
        "Preserve video, witnesses and physical details",
        "Note the exact incident time, the aisle or walkway, who saw the condition, and which cameras might show it. Keep the footwear worn and any original photographs. Surveillance and transient hazards may disappear quickly; request preservation through an appropriate process without assuming public access to a private camera."
      ],
      [
        "Prove injury and any ongoing limitation",
        "Medical records, treatment dates, job restrictions and functional changes can help distinguish short-term injury from future-care needs. Track missed wages and direct expenses. A claim must still address causation, responsibility and comparative-fault issues where relevant."
      ]
    ]
  },
  "wrongful-death": {
    title: "Questions a family deserves clear answers to after a fatal accident",
    summary: "A wrongful-death claim is not simply a more severe personal-injury case. California rules determine who may sue, what losses are available, and how separate surviving claims may be handled.",
    topics: [
      [
        "Identify who may bring the claim",
        "California Code of Civil Procedure section 377.60 identifies categories of potentially eligible claimants. The analysis can be more complex than identifying the closest relative: marriage, children, dependents and family relationships should be reviewed without making assumptions about standing."
      ],
      [
        "Separate wrongful-death and survival issues",
        "Wrongful-death damages generally address losses experienced by eligible survivors; a survival action involves certain claims that belonged to the person before death. They are not interchangeable and may require separate pleading, proof and procedural consideration under California law. A lawyer should review the family's exact circumstances."
      ],
      [
        "Preserve responsibility and insurance evidence",
        "Retain crash or incident records, witness information, relevant vehicle or workplace materials, death-related records and available insurance details. Commercial or public defendants can change the investigation and notice requirements. Family members should not have to reconstruct an accident alone while grieving."
      ],
      [
        "Document support and family consequences carefully",
        "Actual earnings, household services, benefits and other financial support may matter, along with legally recoverable relationship losses. Avoid generic settlement examples; records and applicable legal standards control. A consultation should clarify the process, deadlines, decision-makers and fees in plain language."
      ]
    ]
  },
  "serious-injuries": {
    title: "Building the medical and financial record in a catastrophic injury case",
    summary: "For brain, spinal and other severe injuries, an early bill is rarely a complete description of long-term impact. A reliable record connects medical prognosis, actual functional changes and the accident evidence without overstating certainty.",
    topics: [
      [
        "Identify diagnosis and documented function separately",
        "Medical imaging, specialist evaluations, treatment records and reported symptoms each serve a different purpose. A normal acute scan does not automatically exclude concussion, and subjective symptoms alone do not establish accident causation. Track cognitive, mobility, work and daily-care effects through appropriate professional evaluation."
      ],
      [
        "Evaluate future care from actual recommendations",
        "Potential rehabilitation, specialist monitoring, assistive technology, adaptive housing or caregiving should be based on individualized medical opinions. Distinguish a recommended service from a hypothetical possibility. For brain injury, document memory, concentration and sleep changes with dated, concrete examples rather than a generalized claim that everything changed."
      ],
      [
        "Reconstruct responsibility and available coverage",
        "Severe harm does not determine legal fault. A car, truck, fall or other incident requires its own investigation into conduct, scene evidence, witnesses and responsible parties. High future-care needs may create important insurance questions, but policy availability and actual recoverability still need independent review."
      ],
      [
        "Preserve earnings and family-impact evidence",
        "Keep work history, pay records, restrictions, documented accommodation or job changes, rehabilitation appointments and the real tasks family members now perform. Supported future earning capacity and practical care needs can matter beyond wages already missed. Do not claim permanent disability or a fixed prognosis where clinicians have not reached that conclusion."
      ]
    ]
  }
};
