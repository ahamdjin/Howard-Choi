import newportBeachLocation from "./locations/newport-beach.en.json";
import huntingtonBeachLocation from "./locations/huntington-beach.en.json";
import losAngelesLocation from "./locations/los-angeles.en.json";
import longBeachLocation from "./locations/long-beach.en.json";
import irvineLocation from "./locations/irvine.en.json";
import { costaMesaLocation } from "./costaMesaLocation";

export type AdditionalLocation = {
  slug: string;
  heading?: string;
  seoTitle?: string;
  seoDescription?: string;
  name: string;
  county: string;
  lead: string;
  heroCaption?: string;
  feature?: { sectionId: string; image: "consultation" | "treatment" | "support" | "documents"; eyebrow: string; alt: string };
  sections: {
    id: string; title: string; label?: string; kind?: "faq"; paragraphs: string[];
    practice?: string;
    link?: { label: string; href: string };
    links?: { label: string; href: string }[];
    items?: { title: string; text: string }[];
    stats?: { value: number; label: string }[];
  }[];
  sources: { label: string; href: string }[];
};

export const additionalLocations: AdditionalLocation[] = [
  costaMesaLocation,
  irvineLocation as AdditionalLocation,
  longBeachLocation as AdditionalLocation,
  losAngelesLocation as AdditionalLocation,
  huntingtonBeachLocation as AdditionalLocation,
  newportBeachLocation as AdditionalLocation,
];
