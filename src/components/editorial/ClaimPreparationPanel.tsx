import { responsiveImageProps } from "@/lib/responsive-images";
import { guidePhotography as photos } from "@/data/guidePhotography";
import "./photo-guides.css";

const panels = {
  "rideshare-accidents": {
    images: [photos.rideApp, photos.rideScene, photos.rideCall],
    heading: "Which ride was it?",
    intro: "If someone booked the ride for you, ask them to keep the original receipt. A charge on your card may show the fare, while the receipt can also identify the pickup, driver and trip time.",
    steps: [
      ["From the app", "Save the trip details and any messages about the pickup or drop-off."],
      ["From the scene", "Keep the report number and note where you were sitting and when the impact happened."],
      ["For the first call", "Tell Howard whether you were a passenger, the person who booked the trip, or someone in another vehicle."],
    ],
    links: [
      ["Which rideshare coverage may apply?", "/blogs/uber-lyft-accident-insurance-california"],
      ["After an Uber or Lyft crash in Fullerton", "/blogs/fullerton-uber-lyft-accident-lawyer"],
      ["California rideshare accident guide", "/blogs/california-rideshare-accidents-guide"],
    ],
  },
  "serious-injuries": {
    images: [photos.brainBefore, photos.brainObserve, photos.brainVisit],
    heading: "When a brain injury changes an ordinary day",
    intro: "A relative may remember a change the injured person finds hard to describe. For a conversation with Howard, one dated example is a useful place to begin.",
    steps: [
      ["Before the injury", "Choose a familiar task, such as planning the weekly grocery shop. Describe how the person usually handled it."],
      ["What you observed", "Record the date, what happened and what help was needed. A list written by a relative and a clinician’s assessment each tell a different part of the story."],
      ["What to bring", "Bring that example alongside any discharge instructions or work restrictions you already have. Ask Howard which additional records would help explain the change."],
    ],
    links: [
      ["How to document a traumatic brain injury", "/blogs/traumatic-brain-injury-evidence-after-california-accident"],
      ["What to expect from the first conversation", "/about/what-to-expect"],
    ],
  },
} as const;

export function ClaimPreparationPanel({ practice }: { practice: keyof typeof panels }) {
  const panel = panels[practice];
  return (
    <section aria-labelledby="claim-preparation" className="guide-preparation">
      <div className="site-shell">
        <header className="guide-preparation__opening">
          <h2 id="claim-preparation" className="editorial-serif">{panel.heading}</h2>
          <div><p>{panel.intro}</p>
            <a className="editorial-inline-link" href="/contact">Discuss your situation with Howard Choi</a>
          </div>
        </header>
        <dl className="guide-preparation__steps">
          {panel.steps.map(([label, detail], index) => (
            <div key={label}>
              <dt><img {...panel.images[index]} {...responsiveImageProps(panel.images[index].src, "(min-width: 760px) 33vw, 34vw")} /><span>{label}</span></dt>
              <dd>{detail}</dd>
            </div>
          ))}
        </dl>
        <nav aria-label="Related guidance" className="guide-preparation__links">
          {panel.links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
      </div>
    </section>
  );
}
