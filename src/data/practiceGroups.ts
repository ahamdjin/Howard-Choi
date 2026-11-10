import { newServices } from "@/data/learningResources";
import { practiceAreas } from "@/data/injurySite";

const vehicleSlugs = new Set(["car-accidents", "truck-accidents", "motorcycle-accidents", "pedestrian-accidents", "rideshare-accidents", "bicycle-accidents"]);

const allPractices = [...practiceAreas.map(p => ({ ...p, englishOnly: false })), ...newServices.map(r => ({ slug: r.slug, title: r.slug === "dog-bites" ? "Dog Bites" : "Bicycle Accidents", koTitle: "", description: r.description, koDescription: "", englishOnly: true }))];

export const practiceGroups = [
  {
    id: "motor-vehicle-accidents",
    title: { en: "Motor Vehicle Accidents", ko: "교통사고", es: "Accidentes de tránsito" },
    practices: allPractices.filter(({ slug }) => vehicleSlugs.has(slug)),
  },
  {
    id: "personal-injury",
    title: { en: "Personal Injury", ko: "개인상해", es: "Lesiones personales" },
    practices: allPractices.filter(({ slug }) => !vehicleSlugs.has(slug)),
  },
];
