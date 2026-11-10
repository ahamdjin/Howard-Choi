import { Camera, FileText, HeartPulse, BriefcaseBusiness, ArrowRight, Check, MapPin, ClipboardCheck, MessageCircle, Scale } from "lucide-react";
import dogScene from "@/assets/law-firm/dog-walking-context.jpg";
import cyclingScene from "@/assets/law-firm/cycling-street-context.jpg";
import care from "@/assets/law-firm/medical-care.jpg";
import support from "@/assets/law-firm/family-support.jpg";
import documents from "@/assets/law-firm/reviewing-documents.jpg";
import { practiceMedia } from "@/data/practiceMedia";
import { responsiveImageProps } from "@/lib/responsive-images";
import "./claim-visual-story.css";

type Evidence = { title: string; scene: string[]; care: string[]; impact: string[]; image: string; alt: string; labels?: [string,string,string] };
function evidenceFor(subject: string): Evidence {
  if (/wrongful|death/.test(subject)) return {title:"Bring the family’s questions and records together.",scene:["Incident investigation","Witness information","Reports and correspondence"],care:["Relevant medical records","Death certificate","Records explaining the incident"],impact:["Family relationship records","Financial support information","Funeral and related expenses"],image:support,alt:"Hands held together in support",labels:["The incident","The available records","The family’s losses"]};
  if (/gap|diminished/.test(subject)) return {title:"Keep the vehicle, policy and financial records connected.",scene:["Vehicle details","Damage photographs","Repair or valuation records"],care:["Policy wording","Coverage correspondence","Claim and offer documents"],impact:["Finance agreement","Repair estimates","Payments and receipts"],image:documents,alt:"Records being reviewed at a desk",labels:["The vehicle","The policy","The financial record"]};
  if (/seat.?belt|speed|skid|impaired|safest.cars|disneyland/.test(subject)) return {title:"Understand the subject through its context and sources.",scene:["The location or vehicle","Conditions and surroundings","The facts being discussed"],care:["Applicable rules or standards","The original source","Dates and limitations"],impact:["Practical precautions","Questions to investigate","Records worth keeping"],image:/disneyland/.test(subject)?documents:practiceMedia["car-accidents"].src,alt:"Illustrative records and road-safety context",labels:["The context","The source material","The practical takeaway"]};
  if (/dog/.test(subject)) return {title:"What connects a dog attack to a claim?",scene:["Dog and owner details","Incident location","Witnesses and reports"],care:["Initial treatment","Dated injury photographs","Follow-up recommendations"],impact:["Time away from work","Scarring and daily limitations","Bills and receipts"],image:dogScene,alt:"Dog on a leash being walked along a paved path"};
  if (/bicycle|cycling/.test(subject)) return {title:"Follow the evidence from the road to recovery.",scene:["Bicycle and helmet","Vehicle approach and markings","Video and witnesses"],care:["Medical evaluation","Symptoms and treatment history","Work or activity restrictions"],impact:["Repair estimates","Missed work","Recovery-related expenses"],image:cyclingScene,alt:"Helmeted cyclist travelling through an urban street"};
  if (/slip|fall/.test(subject)) return {title:"A fall is one moment. The records tell the wider story.",scene:["Surface and lighting","Warnings and property control","Photos and incident reports"],care:["Initial medical findings","Follow-up treatment","Physical restrictions"],impact:["Missed work","Help with daily activities","Supported future needs"],image:practiceMedia['slip-and-fall'].src,alt:practiceMedia['slip-and-fall'].alt};
  if (/injur|fracture|brain|whiplash|spinal|burn|amput|meniscus|rotator|ptsd|road-rash|medical/.test(subject) && !/personal-injury/.test(subject)) return {title:"Make the effect of the injury visible.",scene:["Incident account","Condition before the injury","Available original records"],care:["Clinical findings","Treatment and referrals","Changes over time"],impact:["Daily function","Work restrictions","Documented care needs"],image:care,alt:"Medical professional assisting a patient"};
  const key = /truck/.test(subject) ? 'truck-accidents' : /motorcycle/.test(subject) ? 'motorcycle-accidents' : /pedestrian/.test(subject) ? 'pedestrian-accidents' : 'car-accidents';
  return {title:"Three parts of the record. One clearer picture.",scene:["Scene and vehicle evidence","Reports and witness details","Available original video"],care:["Medical findings","Treatment history","Symptoms and restrictions"],impact:["Work and earnings records","Bills and expenses","Changes to everyday life"],image:practiceMedia[key]?.src || documents,alt:practiceMedia[key]?.alt || "Documents being reviewed"};
}

/** Original explanatory diagrams: not a case reconstruction or a prediction of recovery. */
export function ClaimVisualStory({ subject, mode = "evidence" }: { subject: string; mode?: "evidence" | "process" }) {
  const e = evidenceFor(subject);
  if (mode === "process") return <section className="claim-path" aria-label="A visual guide to preparing for a claim">
    <div className="claim-path-heading"><span>From the incident to an informed decision</span><h2>A clearer route through the next steps.</h2></div>
    <ol>{[
      {Icon:HeartPulse,title:"Address immediate needs",body:"Health, safety and family needs come first."},
      {Icon:Camera,title:"Keep the record",body:"Save original photographs, reports and correspondence."},
      {Icon:MessageCircle,title:"Review the facts",body:"Discuss the incident, evidence and questions with a lawyer."},
      {Icon:Scale,title:"Understand the options",body:"Consider the proposed next steps before deciding."},
    ].map(({Icon,title,body},i)=><li key={title}><div className="claim-path-symbol"><Icon size={30} aria-hidden="true"/><span>{i+1}</span></div><h3>{title}</h3><p>{body}</p>{i<3&&<ArrowRight className="claim-path-arrow" size={22} aria-hidden="true"/>}</li>)}</ol>
    <p className="claim-visual-note">An orientation to the process; individual steps can overlap or differ.</p>
  </section>;
  const papers = [{Icon:MapPin,title:e.labels?.[0] || "The incident",items:e.scene,className:"incident"},{Icon:HeartPulse,title:e.labels?.[1] || "The medical record",items:e.care,className:"medical"},{Icon:BriefcaseBusiness,title:e.labels?.[2] || "The everyday impact",items:e.impact,className:"impact"}];
  return <section className="claim-evidence" aria-label="Visual evidence map">
    <div className="claim-evidence-heading"><span>Putting the pieces together</span><h2>{e.title}</h2></div>
    <div className="claim-evidence-photo"><img {...responsiveImageProps(e.image,"(max-width: 767px) 100vw, 760px")} src={e.image} alt={e.alt} loading="lazy" decoding="async" width={960} height={480}/><div><Camera size={24} aria-hidden="true"/><span>Keep the originals.<br/>Preserve the context.</span></div></div>
    <div className="claim-evidence-board">{papers.map(({Icon,title,items,className})=><div className={`claim-evidence-paper claim-evidence-paper--${className}`} key={title}><span className="claim-paper-tab"/><div className="claim-paper-icon"><Icon size={27} aria-hidden="true"/><FileText size={18} aria-hidden="true"/></div><h3>{title}</h3><ul>{items.map(item=><li key={item}><Check size={14} aria-hidden="true"/><span>{item}</span></li>)}</ul></div>)}</div>
    <div className="claim-evidence-result"><ClipboardCheck size={27} aria-hidden="true"/><div><strong>A record your lawyer can assess</strong><p>These categories help organize the facts. They do not establish liability or a settlement value.</p></div></div>
  </section>;
}
