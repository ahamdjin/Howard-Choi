import { claimProcessCopy } from "@/data/claimProcessCopy";
import { ClaimProcessSteps } from "@/components/editorial/ClaimProcess";
import { CaseStories } from "@/components/editorial/CaseStories";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, Phone, MapPin, Scale, HeartPulse, BriefcaseBusiness, Languages, Car, ChevronDown } from "lucide-react";
import { EditorialHero, ReadingLayout, EditorialFrame } from "@/pages/editorial/shared";
import { brand, serviceLocations } from "@/data/injurySite";
import { anaheimCases, injuryQuestions } from "@/data/anaheimLanding";
import { locationGuidesEn } from "@/data/locationGuidesEn";
import { cityEvidencePaths } from "@/data/cityEvidencePaths";
import { locationPracticeMedia as practiceMedia } from "@/data/locationPracticeMedia";
import { locationMedia } from "@/data/locationMedia";
import { responsiveImageProps } from "@/lib/responsive-images";
import documents from "@/assets/law-firm/reviewing-documents.jpg";
import treatment from "@/assets/law-firm/medical-care.jpg";
import office from "@/assets/law-firm/hero-law-office.webp";
import "./anaheim-landing.css";

const guide = locationGuidesEn.anaheim;
const city = serviceLocations.find(({ slug }) => slug === "anaheim")!;
const media = locationMedia.anaheim;

function SectionTitle({ eyebrow, children, text }: { eyebrow: string; children: ReactNode; text?: string }) {
  return <header className="al-heading"><span className="al-eyebrow">{eyebrow}</span><h2>{children}</h2>{text && <p>{text}</p>}</header>;
}
function ContactLinks({ light = false }: { light?: boolean }) {
  return <div className="al-actions">
    <a className={light ? "al-button al-button-light" : "al-button"} href="/contact">Free case consultation <ArrowUpRight size={18} aria-hidden="true" /></a>
    <a className="al-phone" href={brand.phoneHref}><Phone size={17} aria-hidden="true" />{brand.phoneDisplay}</a>
  </div>;
}

export default function AnaheimLandingPage() {
  return <EditorialFrame locale="en"><main className="anaheim-landing">
    <EditorialHero locale="en" eyebrow="Orange County · Serving Anaheim"
      title="Anaheim Injury and Accident Lawyer"
      description="Injured in Anaheim? Talk with Howard Choi about your accident, treatment and the changes to your daily life. Serving Anaheim from Buena Park. No fee unless there is a recovery."
      image={media.src} imageFallback={office} imageAlt={media.alt} detail />
    <section className="al-credentials" aria-label="Firm information">
      <div className="al-shell al-credentials-grid">
        <div><strong>Since 2015</strong><span>Independent practice</span></div>
        <div><strong>Free consultation</strong><span>A conversation before a decision</span></div>
        <div><strong>Buena Park office</strong><span>Serving nearby Anaheim</span></div>
        <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer"><strong>California Bar #284364</strong><span>View Howard’s credentials ↗</span></a>
      </div>
    </section>

    <section className="al-section al-shell al-experience">
      <div><SectionTitle eyebrow="The firm behind your case">Experience with a person<br />at the center.</SectionTitle><p>Get to know the lawyer before choosing who will represent you. Howard serves Anaheim from Buena Park. On the first call, you can ask which details of your accident he would examine first, what records can wait and how his accounting background informs his review of missed pay and changes in earning capacity. Howard speaks English and Korean, and the firm offers Spanish assistance.</p></div>
      <div className="al-experience-links">
        <a href="/results"><span>Selected recoveries</span><strong>Explore the firm’s results</strong><ArrowUpRight aria-hidden="true" /></a>
        <a href={brand.gbpHref} target="_blank" rel="noreferrer"><span>Client perspectives</span><strong>Read reviews on Google</strong><ArrowUpRight aria-hidden="true" /></a>
        <p>Every case has its own facts. Past results do not guarantee a similar outcome.</p>
      </div>
    </section>

    <section id="process" className="al-section al-process">
      <div className="al-shell">
        <SectionTitle eyebrow={claimProcessCopy.en.eyebrow} text={claimProcessCopy.en.intro}>A clearer path through<br />an unfamiliar process.</SectionTitle>
        <ClaimProcessSteps locale="en" />
        <a className="al-text-link" href="/about/what-to-expect">Explore what to expect <ArrowRight size={17} aria-hidden="true" /></a>
      </div>
    </section>

    <section id="cases" className="al-section al-shell">
      <SectionTitle eyebrow="Anaheim personal injury representation" text="Start with the kind of accident you experienced. Each situation calls for its own evidence and insurance review.">Different accidents.<br />Different questions to answer.</SectionTitle>
      <CaseStories stories={anaheimCases.map(item => ({
        id: `anaheim-${item.slug}`,
        title: item.title,
        label: item.label,
        paragraphs: [item.text, item.detail, item.representation],
        image: practiceMedia[item.slug],
        evidence: item.evidence,
        link: { href: `/practice-areas/${item.slug}`, label: `Explore ${item.label.toLowerCase()}` },
      }))} />
      <div className="al-local-scenarios">
        <article>
          <h3>Traumatic brain injuries after an Anaheim accident</h3>
          <p>For someone injured while visiting Anaheim, the emergency evaluation and later specialist visits may happen in different places. Put those records in date order. A short account of changes at work or home, such as needing reminders for familiar tasks or taking breaks from screens, can help explain how daily life changed. Howard can review how those observations fit with the treatment record.</p>
        </article>
        <article>
          <h3>Wrongful death claims arising in Anaheim</h3>
          <p>After a fatal accident, families may have questions about who can bring a claim and what information the lawyer needs first. A first conversation can start with the incident report, names of people who witnessed the event and what is known about the people or businesses involved. Howard can discuss which questions need to be resolved before the family decides how to proceed.</p>
        </article>
      </div>
      <div className="al-more-cases"><span>More ways we help</span><a href="/practice-areas/personal-injury">Personal injury <ArrowUpRight size={16} /></a><a href="/practice-areas/serious-injuries">Brain &amp; catastrophic injuries <ArrowUpRight size={16} /></a><a href="/practice-areas/wrongful-death">Wrongful death <ArrowUpRight size={16} /></a></div>
    </section>

    <section className="al-contact-band">
      <div className="al-shell al-contact-grid"><div><span className="al-eyebrow">A place to start</span><h2>You have questions.<br />Let’s talk them through.</h2><p>You do not need every report or a complete medical file before calling. Start with what you know.</p></div><div><ContactLinks light /><a className="al-text-link" href="/about/zero-fee-guarantee">No fee unless there is a recovery <ArrowRight size={17} /></a></div></div>
    </section>

    <section className="al-section al-shell">
      <SectionTitle eyebrow="Life after the accident">The claim is only<br />part of what you’re facing.</SectionTitle>
      <div className="al-support">
        {[{icon:Car,title:"A damaged vehicle",text:"Keep repair estimates, tow receipts and rental records. Ask how property-damage issues relate to the injury claim."},{icon:BriefcaseBusiness,title:"Time away from work",text:"Save missed shifts, pay records and written work restrictions. These help show the financial effect of the injury."},{icon:HeartPulse,title:"Treatment that continues",text:"Keep appointments, referrals and provider instructions together. Future needs should be supported by medical evidence."},{icon:Languages,title:"A conversation you understand",text:"Tell the office your preferred language. English, Korean and Spanish assistance is available."}].map(({icon:Icon,title,text})=><div key={title}><Icon size={28} strokeWidth={1.3} aria-hidden="true"/><h3>{title}</h3><p>{text}</p></div>)}
      </div>
    </section>

    <ReadingLayout locale="en" label="Anaheim injury guide" sections={[
      {id:"local",label:"Local overview"},{id:"data",label:"Local collision data"},
      {id:"resort-injuries",label:"Resort-area injuries"},{id:"anaheim-evidence",label:"Disputed evidence"},
      {id:"visitor-recovery",label:"Recovery after your visit"},{id:"records",label:"Records and agencies"},
      {id:"deadlines",label:"Deadlines"},{id:"fault",label:"Establishing fault"},
      {id:"injuries",label:"Injury consequences"},{id:"compensation",label:"Compensation"},
      {id:"office",label:"Meet Howard"},{id:"faq",label:"Local questions"}
    ]}>
      <div className="al-reading-body">
    <section id="local" className="al-section al-shell">
      <div className="al-local-grid">
        <div><SectionTitle eyebrow="After an accident in Anaheim">A local detail can change<br />the next question.</SectionTitle><p>{city.localIntro}</p></div>
        <figure className="al-city-photo"><img src={media.src} alt={media.alt} width={960} height={640} loading="lazy" onError={(e)=>{e.currentTarget.style.display="none";}}/><figcaption>Anaheim City Hall · <a href={media.source} target="_blank" rel="noreferrer">{media.credit} / {media.license}</a></figcaption></figure>
      </div>
      <div className="al-local-scenarios">{cityEvidencePaths.anaheim.paths.map((item,i)=><article key={item.question.en}><span className="al-eyebrow">0{i+1} · Local evidence</span><h3>{item.question.en}</h3><p>{item.answer.en}</p></article>)}</div>
      <aside className="al-calculator"><Scale size={32} strokeWidth={1.3} aria-hidden="true"/><div><h3>What might your injury claim involve?</h3><p>Use the educational case value calculator to explore the inputs, then discuss your actual records with Howard.</p></div><a className="al-text-link" href="/case-value-calculator">Open calculator <ArrowUpRight size={18} /></a></aside>
    </section>

    <section id="data" className="al-data-section">
      <div className="al-shell al-data-grid"><div><span className="al-eyebrow">Anaheim · California OTS · {city.ots.year}</span><h2>The local picture,<br />in context.</h2><p>People killed or injured in traffic collisions. Citywide figures describe road safety; they do not predict a claim’s outcome.</p><a className="al-text-link" href={city.ots.source} target="_blank" rel="noreferrer">View the official city data <ArrowUpRight size={17}/></a></div>
      <div className="al-stats"><div className="al-stat-total"><strong>{city.ots.total.toLocaleString()}</strong><span>Total killed or injured</span></div>{[["Motorcyclists",city.ots.motorcycles],["Pedestrians",city.ots.pedestrians],["Bicyclists",city.ots.bicyclists]].map(([label,value])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>
    </section>

    <section id="resort-injuries" className="al-section al-shell">
      <SectionTitle eyebrow="Injured while visiting Anaheim">Reconstructing an incident around the resort district</SectionTitle>
      <div className="al-local-scenarios">
        <article>
          <h3>Identify the shuttle before identifying the operator</h3>
          <p>A shuttle at a Harbor Boulevard hotel might be carrying guests under the hotel’s name, even when a separate company runs the service. Start with the vehicle number, reservation or voucher, and the name shown on the receipt. For an injury while boarding, write down whether the vehicle was stopped, where the step or ramp met the curb, and whether anyone was directing passengers. For a crash in traffic, keep the route and the stops immediately before and after the impact. Those details give Howard a way to distinguish who operated the vehicle from who managed the place where you boarded.</p>
        </article>
        <article>
          <h3>Separate the hotel entrance from the hazard</h3>
          <p>Suppose you fell while walking from a Katella Avenue drop-off to the lobby. The useful description is the exact stretch of pavement, what you encountered there, and how you were moving when you fell. If the surface was wet, note whether it was raining, whether a mat or sign was present, and whether you saw anyone cleaning. If the problem was a raised edge, photograph it from the direction you were walking and include a wider view showing where it sits. A reservation confirms your stay. A picture tied to a precise location helps someone find the condition you describe.</p>
        </article>
        <article>
          <h3>Distinguish an event pickup from a through lane</h3>
          <p>After an event near the convention center, a witness may remember the crowd and the car without knowing whether the collision happened in the street or just inside a driveway. Mark where you were waiting, where the vehicle entered, and which direction it was facing. Save pickup instructions, any changed meeting point, and a timestamp from a ticket or message if it helps narrow the time. A diagram with those landmarks gives Howard a better starting point for comparing accounts than a pin marking the venue as a whole.</p>
        </article>
      </div>
    </section>

    <section id="anaheim-evidence" className="al-section al-warm">
      <div className="al-shell">
        <SectionTitle eyebrow="When the accounts differ">Build a timeline that can be checked</SectionTitle>
        <div className="al-local-scenarios">
          <article>
            <h3>Put the report next to the other evidence</h3>
            <p>Consider a crash at a resort driveway where one driver says they were already in the lane and the other says the car pulled out without stopping. Read the report for who gave each statement and what the responding officer personally observed. Then compare the vehicle positions, damage, and any independent account. A photo taken after cars were moved still helps identify damage, but it answers a different question from a photo taken before the vehicles moved. Give Howard both versions of the story and flag where the available records leave a gap.</p>
            <p>Anaheim Police provides a separate request route for non-fatal traffic collision reports. If an online search does not return a record, use the department’s request instructions and check which agency responded. Keep the report number with your incident timeline.</p>
            <a className="al-text-link" href="https://pd.anaheim.net/261/Request-a-Copy-of-a-Police-Report">Anaheim Police report request instructions</a>
          </article>
          <article>
            <h3>Work out what each camera could show</h3>
            <p>A hotel entrance camera may show the sidewalk but miss the street. A dash camera may capture the moment a vehicle entered the driveway without showing a pedestrian on the opposite side. List the camera locations you noticed and what each faced. Save original recordings and note whether the displayed time matches other records, such as a rideshare receipt. When you speak to Howard, bring the location and approximate time so he can evaluate which sources are worth pursuing. Even a partial view can help establish the order of events when it can be placed on the same timeline.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="visitor-recovery" className="al-section al-shell">
      <SectionTitle eyebrow="Care after you leave Orange County">Keeping your recovery history together from home</SectionTitle>
      <div className="al-local-scenarios">
        <article>
          <h3>Connect the first Anaheim visit to later care</h3>
          <p>If you were evaluated in Anaheim and then went home, the first provider and your regular clinician may each have only part of the history. Keep the Anaheim discharge instructions, any imaging reports, and the notes from the first appointment back home in date order. Note the date you traveled, when you first noticed changes, and which provider you told. If an appointment was moved because of travel, keep the scheduling message. This gives Howard a way to follow what was reported at each visit and where additional records could help explain the course of recovery.</p>
          <p>Keep the names of both facilities and the dates of each visit with that timeline. If you only have a discharge summary or a patient portal screenshot, bring what you have and mark which visit it came from. That makes it easier to identify the missing record without requesting the same material twice.</p>
        </article>
        <article>
          <h3>Track what changed after you tried to resume normal life</h3>
          <p>The first days after an accident during a vacation may say little about how the injury affects your usual work. Once you return home, compare your normal duties with the duties you actually performed. A worker who returns to the same job but stops lifting supplies or shortens shifts can keep the original schedule, revised schedule, and any written restrictions together. For household tasks, note the specific activity and the help you needed. Bring those examples and the dates they changed. They make it easier to connect the initial Anaheim injury to the practical effects you experienced after returning.</p>
        </article>
      </div>
    </section>

    <section id="records" className="al-section al-shell">
      <SectionTitle eyebrow="Reports, agencies and evidence">Find the right record.<br />Keep the right details.</SectionTitle>
      <div className="al-record-grid"><div><h3>Who investigated the collision?</h3><p>{guide.records}</p><div className="al-source-links">{guide.sources.map(source=><a href={source.href} key={source.href} target="_blank" rel="noreferrer">{source.label}<ArrowUpRight size={16}/></a>)}</div></div><div><h3>What should you preserve?</h3><p>{guide.evidence}</p><a className="al-text-link" href="/blogs/what-to-do-after-a-car-accident-in-california">Your accident checklist <ArrowRight size={17}/></a></div></div>
    </section>

    <section className="al-section al-warm">
      <div className="al-shell al-split">
        <img {...responsiveImageProps(documents)} src={documents} alt="Reviewing documents and evidence" width={900} height={1000} loading="lazy" className="al-editorial-photo"/>
        <div><SectionTitle eyebrow="Getting legal help">When should you speak<br />with an Anaheim accident lawyer?</SectionTitle><p>If fault is disputed, treatment is continuing or an insurer asks you to sign a release, it can help to understand the implications before deciding. Howard can review the accident record, discuss coverage questions and identify evidence that needs attention.</p><ol className="al-plain-steps"><li><strong>Care comes first.</strong> Seek appropriate medical attention and keep treatment instructions.</li><li><strong>Preserve what you can.</strong> Keep original photos, witness details, app receipts and insurer letters.</li><li><strong>Know what you are being asked to sign.</strong> Bring releases, statements and settlement offers to the discussion.</li></ol><a className="al-text-link" href="/contact">Talk about your accident <ArrowRight size={17}/></a></div>
      </div>
      <div id="deadlines" className="al-shell al-deadlines"><h3>Check deadlines early</h3><p>{guide.deadlines}</p><a className="al-text-link" href="/blogs/california-personal-injury-deadlines">Read the deadline guide <ArrowRight size={17}/></a></div>
    </section>

    <section id="fault" className="al-section al-shell">
      <SectionTitle eyebrow="Establishing responsibility" text="A negligence claim connects conduct to harm. Evidence needs to support each part of that connection.">How is fault proven?</SectionTitle>
      <ol className="al-fault-chain">{[["Duty","What responsibility did the person or business have in this situation?"],["Breach","What action or failure to act fell short of reasonable care?"],["Causation","How did that conduct contribute to the injury?"],["Harm","What injuries and losses resulted, and what supports them?"]].map(([title,text],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      <div className="al-comparison"><div><h3>What if both sides share fault?</h3><p>California’s comparative-fault rules can reduce damages by the injured person’s share of responsibility. A disputed percentage needs evidence; it should not be accepted simply because an insurer proposed it.</p><a className="al-text-link" href="/blogs/california-comparative-fault-personal-injury">Understand comparative fault <ArrowRight size={17}/></a></div><div className="al-example"><span>ILLUSTRATION ONLY</span><strong>$100,000 × 80% = $80,000</strong><p>If damages are $100,000 and the claimant is assigned 20% responsibility, the fault adjustment leaves $80,000 before other applicable adjustments. This is not a case estimate.</p></div></div>
    </section>

    <section id="injuries" className="al-section al-warm">
      <div className="al-shell al-split"><div><SectionTitle eyebrow="The impact of an injury">A diagnosis is the start<br />of the story.</SectionTitle><p>Recovery can affect concentration, movement, work and family routines. The injury record should explain those changes as well as the initial treatment.</p><div className="al-injury-list">{[["Brain & head injuries","Changes in memory, balance or concentration may need specialist assessment and a record of daily limitations."],["Neck, back & spinal injuries","Keep treatment recommendations, restrictions and records of any continuing care needs."],["Fractures & orthopedic injuries","Document surgery, rehabilitation, assistive devices and the effect on work or mobility."],["Scarring & lasting limitations","Preserve treatment records and the ways the injury affects ordinary activities."]].map(([title,text])=><div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div><a className="al-text-link" href="/practice-areas/serious-injuries">Brain and catastrophic injury representation <ArrowRight size={17}/></a></div><img {...responsiveImageProps(treatment)} src={treatment} alt="Medical care and recovery" width={900} height={1100} loading="lazy" className="al-editorial-photo"/></div>
    </section>

    <section id="compensation" className="al-section al-shell">
      <SectionTitle eyebrow="Understanding compensation" text="There is no single formula for an Anaheim injury settlement. The facts, supporting records, responsibility and available coverage all matter.">What could your claim cover?</SectionTitle>
      <div className="al-damages"><article><span className="al-eyebrow">01 · Financial losses</span><h3>The costs you can document.</h3><ul><li>Medical treatment and rehabilitation</li><li>Supported future care needs</li><li>Lost wages and reduced earning capacity</li><li>Related property damage and expenses</li></ul><p>Missed shifts and reduced earning capacity tell different stories. A hotel employee might return to work but be unable to stand for a full shift or take on the same duties. Pay records show what changed in the paycheck. A job description and written restrictions help explain why. For future care, a treatment plan can distinguish recommended follow-up from care already billed.</p></article><article><span className="al-eyebrow">02 · Personal impact</span><h3>The ways life has changed.</h3><ul><li>Pain and physical limitations</li><li>Emotional distress</li><li>Scarring or disfigurement</li><li>Loss of enjoyment of usual activities</li></ul><p>Describe what changed in a typical week. Someone who used to drive children to school may now rely on family for rides, while another person may still work but need the rest of the day to recover. Specific examples help connect the injury to its effect on daily life. Medical records and observations from people who knew you before the accident can add context.</p></article></div>
      <a className="al-text-link" href="/blogs/how-much-is-my-personal-injury-case-worth-california">Read the complete guide to claim value <ArrowRight size={17}/></a>
    </section>

    <section id="office" className="al-office">
      <div className="al-shell al-split"><div><span className="al-eyebrow">The Howard Choi difference</span><h2>Your lawyer.<br />A nearby office.<br /><em>A clear next step.</em></h2><p>Howard serves people injured in Anaheim from Buena Park. His background in accounting informs the questions he asks about the financial effect of an injury, alongside the legal issues of responsibility and coverage.</p><a className="al-text-link" href="/about/our-difference">Get to know our approach <ArrowRight size={17}/></a><div className="al-office-address"><MapPin size={22} aria-hidden="true"/><div><strong>Buena Park office</strong><address>{brand.address}</address><a href={brand.mapsHref} target="_blank" rel="noreferrer">Get directions ↗</a></div></div></div><div className="al-office-photo"><img {...responsiveImageProps(office)} src={office} alt="Illustrative law office interior" width={1000} height={900} loading="lazy"/><div><span>Start with a free conversation</span><a href={brand.phoneHref}>{brand.phoneDisplay}</a></div></div></div>
    </section>

    <section id="faq" className="al-section al-shell">
      <div className="al-faq-grid"><SectionTitle eyebrow="Questions before your first call">A few answers<br />to start with.</SectionTitle><div className="al-faqs">{[...injuryQuestions,...guide.faqs].map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={18} aria-hidden="true"/></summary><p>{a}</p></details>)}<a className="al-text-link" href="/about/faqs">Visit our FAQ page <ArrowRight size={17}/></a></div></div>
    </section>

    <section className="al-section al-warm"><div className="al-shell"><SectionTitle eyebrow="Continue with the question that matters to you">Useful reading.<br />A more informed next step.</SectionTitle><div className="al-reading">{[["01","Uber & Lyft insurance","Which trip records help identify coverage?","uber-lyft-accident-insurance-california"],["02","Truck accident evidence","What can disappear while you wait?","truck-accident-evidence-eld-records-california"],["03","After a California crash","What should you preserve first?","what-to-do-after-a-car-accident-in-california"]].map(([n,title,text,slug])=><a key={slug} href={'/blogs/'+slug}><span>{n}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight size={21}/></a>)}</div><div className="al-nearby"><span>Nearby communities</span>{["buena-park","fullerton","garden-grove","la-habra"].map(slug=><a key={slug} href={'/locations/'+slug}>{serviceLocations.find(x=>x.slug===slug)?.name} <ArrowUpRight size={14}/></a>)}</div></div></section>

      </div>
    </ReadingLayout>

    <section className="al-final"><div className="al-shell"><span className="al-eyebrow">Buena Park Injury Lawyer · Serving Anaheim</span><h2>Let’s talk about<br /><em>what comes next.</em></h2><ContactLinks light/><p>No fee unless there is a recovery.</p></div></section>
  </main></EditorialFrame>;
}
