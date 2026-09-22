import collision from "@/assets/law-firm/collision-damage.jpg";
import cars from "@/assets/law-firm/car-collision.jpg";
import truck from "@/assets/law-firm/truck-highway.jpg";
import motorcycle from "@/assets/law-firm/motorcycle-road.jpg";
import crossing from "@/assets/law-firm/pedestrian-crossing.jpg";
import premises from "@/assets/law-firm/wet-floor.jpg";
import care from "@/assets/law-firm/medical-care.jpg";
import corridor from "@/assets/law-firm/hospital-corridor.jpg";
import support from "@/assets/law-firm/family-support.jpg";

// Source and license records live in src/assets/law-firm/media-sources.md.
export const practiceMedia: Record<string, { src: string; alt: string }> = {
  "car-accidents": { src: collision, alt: "Damaged car with a broken windshield after a collision" },
  "truck-accidents": { src: truck, alt: "Commercial truck on a highway" },
  "motorcycle-accidents": { src: motorcycle, alt: "Motorcyclist travelling along a road" },
  "pedestrian-accidents": { src: crossing, alt: "Marked pedestrian crossing at a street corner" },
  "rideshare-accidents": { src: cars, alt: "Two cars involved in a rear-end collision" },
  "slip-and-fall": { src: premises, alt: "Wet-floor warning sign indoors" },
  "serious-injuries": { src: corridor, alt: "Empty corridor of a modern hospital" },
  "wrongful-death": { src: support, alt: "Hands held together in support" },
};
