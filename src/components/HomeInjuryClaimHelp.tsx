import { ArrowRight, ClipboardList, MessagesSquare, Users } from "lucide-react";
import consultationImage from "@/assets/law-firm/reviewing-documents.jpg";
import { responsiveImageProps } from "@/lib/responsive-images";
import "@/components/editorial/claim-guidance.css";

const questions = [
  {
    title: "An insurer wants an answer",
    icon: MessagesSquare,
    text: "Keep the letter, claim number and any response date together. Explain whether the request concerns vehicle damage, medical records or an injury settlement. Those decisions can follow different timelines, and a payment for repairs may leave the injury questions unresolved.",
    href: "/practice-areas/car-accidents",
    label: "Help with a car accident injury claim",
  },
  {
    title: "You need to understand your options",
    icon: ClipboardList,
    text: "Start with what happened, where you were hurt and what has changed since the injury. You can ask about a consultation while a report or medical record is still pending. Identify what you already know and what you need help confirming.",
    href: "/practice-areas/personal-injury",
    label: "How an injury claim is evaluated",
  },
  {
    title: "You are making the first call for family",
    icon: Users,
    text: "Tell the office your relationship to the injured person and whether they can take part in the conversation. Describe the immediate concern without sending an entire private medical file. Ask which records to prepare and how the office would keep the family informed.",
    href: "/about/what-to-expect",
    label: "What to expect from the first conversation",
  },
];

export default function HomeInjuryClaimHelp() {
  return (
    <section className="claim-help" aria-labelledby="injury-claim-help">
      <div className="claim-help__inner">
        <div className="claim-help__heading">
          <h2 id="injury-claim-help" className="editorial-serif scroll-mt-28 text-balance">What do you need help with after an injury?</h2>
          <p>Our Buena Park office serves injured people across Orange and Los Angeles counties. A useful first conversation starts with the decision in front of you. You do not need to arrive with a settlement figure or a completed investigation.</p>
        </div>
        <div className="claim-help__body">
          <figure className="claim-help__image">
            <img {...responsiveImageProps(consultationImage, "(min-width: 1024px) 40vw, 100vw")} src={consultationImage} alt="Illustrative consultation with documents and a laptop" loading="lazy" decoding="async" />
          </figure>
          <div className="claim-help__questions">
            {questions.map(({ icon: Icon, ...item }) => <div key={item.href} className="claim-help__question">
              <Icon className="claim-help__icon" aria-hidden="true" strokeWidth={1.4} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href={item.href}><span>{item.label}</span><ArrowRight className="size-4 shrink-0" aria-hidden="true" /></a>
              </div>
            </div>)}
          </div>
        </div>
        <p className="claim-help__closing">Before choosing a lawyer, read <a href="/attorney">Howard Choi’s background and credentials</a>, check the <a href="/locations/buena-park">Buena Park office information</a>, and ask who will explain new developments and insurance offers. A <a href="/contact">free consultation</a> is a chance to discuss those questions and the proposed next step.</p>
      </div>
    </section>
  );
}
