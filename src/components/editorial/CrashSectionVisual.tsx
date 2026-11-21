import { guidePhotography as photos } from "@/data/guidePhotography";
import { practiceMedia } from "@/data/practiceMedia";
import { createContext, useContext } from "react";
import { readingImageProps } from "@/lib/responsive-images";
import damage from "@/assets/law-firm/collision-damage.jpg";
import discussion from "@/assets/law-firm/attorney-client-talking.jpg";
import hospital from "@/assets/law-firm/medical-care.jpg";
import street from "@/assets/law-firm/pedestrian-crossing.jpg";
import paperwork from "@/assets/law-firm/reviewing-documents.jpg";

export const PracticeVisualContext = createContext("");

const plates = "/editorial-images/crash-guide/plates/";
const visuals: Record<string, [string, string]> = {
  "local-claim-review": [plates + "file.webp", "Claim file with correspondence, bills and records"],
  "service-depth-1": [damage, "Close view of a damaged vehicle"],
  "service-depth-2": [plates + "report.svg", "Collision report with agency, report number and scene details"],
  "service-depth-3": [discussion, "A consultation across a desk"],
  "service-depth-4": [plates + "scene.svg", "Overhead illustration of vehicles on a two-lane road"],
  "service-depth-5": [street, "Street corner and pedestrian crossing"],
  "service-depth-6": [hospital, "A hospital treatment bed"],
  understand: [paperwork, "Reviewing a set of documents together"],
  issues: [plates + "scene.svg", "Lane position and vehicle direction at the scene"],
  evidence: [damage, "Photographic detail of collision damage"],
  "case-guide": [plates + "report.svg", "Agency, report number and recorded scene details"],
  research: [plates + "time.webp", "Filing dates and evidence retention are separate timelines"],
  value: [hospital, "A hospital treatment bed"],
  insurance: [plates + "file.webp", "Insurance correspondence, bills and records"],
  deadlines: [plates + "time.webp", "Filing dates and evidence retention are separate timelines"],
  faq: [discussion, "An in-person consultation"],
  resources: [paperwork, "Reviewing written records"],
  related: [plates + "scene.svg", "Vehicles and travel directions"],
  areas: [street, "An urban intersection"],
};

type Art = [string, string];
const commonArt: Record<string, Art> = {
  file: visuals.insurance,
  time: visuals.deadlines,
  care: visuals.value,
  discussion: visuals.faq,
  paperwork: visuals.resources,
};

export function SectionArt({ visual }: { visual: Art }) {
  const [src, alt] = visual;
  return <div className="editorial-section-art"><img {...readingImageProps(src, "(min-width: 1050px) 32vw, 90vw")} alt={alt} loading="lazy" decoding="async" /></div>;
}

export function guidanceArt(topic: string): Art | undefined {
  if (/deadline|time limit/i.test(topic)) return commonArt.time;
  if (/medical|treatment|hospital/i.test(topic)) return commonArt.care;
  if (/consultation|speak with|ask a lawyer/i.test(topic)) return commonArt.discussion;
  if (/insurance|insurer|claim file|evidence|coverage/i.test(topic)) return commonArt.file;
  if (/document|written|records|paperwork/i.test(topic)) return commonArt.paperwork;
}

const practicePhotos: Record<string, Record<string, { src: string; alt: string }>> = {
  "rideshare-accidents": {
    "local-claim-review": photos.rideStreet, "service-depth-1": photos.rideRearview,
    "service-depth-3": photos.discussion, "service-depth-4": photos.junction,
    "case-guide": photos.rideScreen, deadlines: photos.calendar,
    evidence: photos.rideRecords, insurance: photos.rideInsurance, areas: photos.rideRoad,
  },
  "serious-injuries": {
    "local-claim-review": photos.brainCare, "service-depth-1": photos.brainImaging,
    "service-depth-4": photos.therapy, "service-depth-5": photos.meeting,
    "service-depth-7": photos.familyRoutine, research: photos.clinicalReview,
    evidence: photos.brainNotes, value: photos.brainReturn,
  },
};

export function PracticeSectionVisual({ id }: { id: string }) {
  const slug = useContext(PracticeVisualContext);
  if (!slug) return null;
  const photo = practicePhotos[slug]?.[id];
  if (photo) return <SectionArt visual={[photo.src, photo.alt]} />;
  if (slug === "car-accidents") return visuals[id] ? <SectionArt visual={visuals[id]} /> : null;
  const scene = practiceMedia[slug];
  const bySection: Record<string, Art> = {
    "local-claim-review": commonArt.file, understand: commonArt.paperwork,
    evidence: commonArt.file, research: commonArt.paperwork, value: commonArt.care,
    insurance: commonArt.file, deadlines: commonArt.time, faq: commonArt.discussion,
  };
  const visual = scene && (id === "issues" || id === "service-depth-1") ? [scene.src, scene.alt] as Art : bySection[id];
  return visual ? <SectionArt visual={visual} /> : null;
}
