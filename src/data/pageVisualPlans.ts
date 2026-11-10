import pagePlans from "./page-visual-plans.json";
import { practiceMedia } from "./practiceMedia";
import documents from "@/assets/law-firm/reviewing-documents.jpg";
import consultation from "@/assets/law-firm/attorney-client-talking.jpg";
import care from "@/assets/law-firm/medical-care.jpg";

export type VisualLayout = "activity" | "decision" | "journey" | "agreement" | "conversation" | "roles" | "file" | "scene" | "equipment" | "review";
export type PageVisualPlan = {layout:VisualLayout;title:string;caption:string;notes:{title:string;items:string[]}[];imageKey:string;afterSection:number;imagePosition?:string};
const photos = { ...practiceMedia, documents:{src:documents,alt:"Documents being reviewed at a desk"}, consultation:{src:consultation,alt:"A discussion over documents at a desk"},care:{src:care,alt:"Medical professional assisting a patient"} };
/** Explicit page editorial plans. Unmapped routes get no automatic visual. */
export function pageVisualPlan(path: string) {
  const plan = (pagePlans as Record<string, PageVisualPlan>)[path];
  if (!plan) return null;
  const photo = photos[plan.imageKey];
  if (!photo) throw new Error(`Unknown visual photo for ${path}: ${plan.imageKey}`);
  return {...plan,image:photo.src,alt:photo.alt};
}

export const pageVisualAfter = (path: string, index: number) => (pagePlans as Record<string, PageVisualPlan>)[path]?.afterSection === index;
