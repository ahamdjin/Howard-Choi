import { learningResources } from "@/data/learningResources";
import { practicePageMessaging } from "@/data/practicePageMessaging";

// Service-specific keyword targets; see the Semrush URL map in docs.
export const practiceSearchNames: Record<string, string> = {
  "car-accidents": "Car Accident",
  "truck-accidents": "Truck Accident",
  "motorcycle-accidents": "Motorcycle Accident",
  "pedestrian-accidents": "Pedestrian Accident",
  "rideshare-accidents": "Uber & Lyft Accident",
  "slip-and-fall": "Slip and Fall",
  "wrongful-death": "Wrongful Death",
  "serious-injuries": "Brain & Catastrophic Injury",
};

// The same source supplies metadata, social previews and visible hero copy.
export const serviceSeo = Object.fromEntries(Object.entries(practicePageMessaging).map(([slug, locales]) => { const source = learningResources.find(r => r.kind === "service" && r.path === "/practice-areas/" + slug); return [slug, source ? { ...locales.en, title: source.metaTitle, description: source.description } : locales.en]; }));
