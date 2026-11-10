/** Official health sources checked November 10, 2026; clinical care stays with clinicians. */
export const injuryMedicalSources: Record<string, { label: string; href: string }> = {
  amputations: { label: "NIH MedlinePlus · Limb loss", href: "https://medlineplus.gov/limbloss.html" },
  burns: { label: "NIH MedlinePlus · Burns", href: "https://medlineplus.gov/burns.html" },
  fractures: { label: "NIH MedlinePlus · Fractures", href: "https://medlineplus.gov/fractures.html" },
  "internal-injuries": { label: "NIH MedlinePlus · Internal and external bleeding", href: "https://medlineplus.gov/bleeding.html" },
  "meniscus-injuries": { label: "NIH MedlinePlus · Meniscus tears", href: "https://medlineplus.gov/ency/patientinstructions/000684.htm" },
  ptsd: { label: "NIMH · Post-traumatic stress disorder", href: "https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd" },
  "road-rash": { label: "NIH MedlinePlus · Scrapes and abrasions", href: "https://medlineplus.gov/ency/article/007212.htm" },
  "rotator-cuff": { label: "NIH MedlinePlus · Rotator cuff injuries", href: "https://medlineplus.gov/rotatorcuffinjuries.html" },
  "spinal-injuries": { label: "NIH MedlinePlus · Spinal cord injuries", href: "https://medlineplus.gov/spinalcordinjuries.html" },
  whiplash: { label: "NHS · Whiplash", href: "https://www.nhs.uk/conditions/whiplash/" },
};
