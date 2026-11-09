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
export const serviceSeo = Object.fromEntries(Object.entries(practicePageMessaging).map(([slug, locales]) => [slug, locales.en]));
