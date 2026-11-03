import { practiceAreas } from "@/data/injurySite";

const vehicleSlugs = new Set(["car-accidents", "truck-accidents", "motorcycle-accidents", "pedestrian-accidents", "rideshare-accidents"]);

export const practiceGroups = [
  {
    id: "motor-vehicle-accidents",
    title: { en: "Motor Vehicle Accidents", ko: "교통사고", es: "Accidentes de tránsito" },
    practices: practiceAreas.filter(({ slug }) => vehicleSlugs.has(slug)),
  },
  {
    id: "personal-injury",
    title: { en: "Personal Injury", ko: "개인상해", es: "Lesiones personales" },
    practices: practiceAreas.filter(({ slug }) => !vehicleSlugs.has(slug)),
  },
];
