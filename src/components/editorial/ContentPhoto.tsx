import dog from "@/assets/law-firm/dog-walking-context.jpg";
import cycling from "@/assets/law-firm/cycling-street-context.jpg";
import { responsiveImageProps } from "@/lib/responsive-images";
import care from "@/assets/law-firm/medical-care.jpg";
import documents from "@/assets/law-firm/reviewing-documents.jpg";
import crossing from "@/assets/law-firm/pedestrian-crossing.jpg";
import truck from "@/assets/law-firm/truck-highway.jpg";
import motorcycle from "@/assets/law-firm/motorcycle-road.jpg";
import premises from "@/assets/law-firm/wet-floor.jpg";

export function ContentPhoto({ subject, variant = "scene" }: { subject: string; variant?: "scene" | "recovery" }) {
  const visual = /court-process/.test(subject) ? {src:"/editorial-images/orange-county-courthouse.webp",alt:"Old Orange County Courthouse in Santa Ana, California",caption:"Old Orange County Courthouse, Santa Ana. Photo: Cbl62 · CC BY-SA 3.0. Illustrative legal context."}
    : /rotator/.test(subject) ? {src:"/editorial-images/shoulder-examination.webp",alt:"Clinician examining a shoulder in a physical therapy clinic",caption:"A shoulder examination in a physical therapy clinic. U.S. Navy archive, Robert Winn, 2009. Illustrative image; not a firm client."}
    : variant === "recovery" ? {src:care,alt:"Medical professional assisting a patient",caption:"Keep treatment records and follow-up recommendations alongside the incident records."}
    : /dog/i.test(subject) ? {src:dog,alt:"Dog on a leash being walked along a paved path",caption:"Record the dog, owner and location details while they are still available."}
    : /bicycle|cycling/i.test(subject) ? {src:cycling,alt:"Helmeted cyclist travelling through an urban street",caption:"Road position, sightlines and the original scene records help explain a bicycle collision."}
    : /truck/i.test(subject) ? {src:truck,alt:"Commercial truck travelling on a highway",caption:"The vehicle, the operator and the carrier can hold different parts of the evidence."}
    : /motorcycle|road.rash/i.test(subject) ? {src:motorcycle,alt:"Motorcyclist travelling along a road",caption:"Road position, visibility and the physical evidence help explain what happened."}
    : /bicycle|pedestrian/i.test(subject) ? {src:crossing,alt:"Marked crossing at a city intersection",caption:"The crossing, approach and available sightlines provide context for an incident."}
    : /slip|fall/i.test(subject) ? {src:premises,alt:"Wet-floor warning sign on an indoor walkway",caption:"Document the condition, warnings and who controlled the property."}
    : /injur|medical|burn|fracture|whiplash|dog|spinal|brain|amputation|meniscus|rotator|ptsd/i.test(subject) ? {src:care,alt:"Medical professional assisting a patient",caption:"Medical records connect the treatment history with the effect of an injury on daily life."}
    : {src:documents,alt:"Documents being reviewed at a desk",caption:"Keep original records, correspondence and a clear timeline of what happened."};
  return <figure className="content-photo"><img {...responsiveImageProps(visual.src,"(max-width: 767px) 100vw, 760px")} src={visual.src} alt={visual.alt} width={900} height={506} loading="lazy" decoding="async" /><figcaption>{visual.caption}</figcaption></figure>;
}
