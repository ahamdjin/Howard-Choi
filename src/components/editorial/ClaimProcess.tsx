import { claimProcessCopy } from "@/data/claimProcessCopy";
import { FileText, MessageCircle, Scale } from "lucide-react";
import type { SiteLocale } from "@/data/injurySite";
import { responsiveImageProps } from "@/lib/responsive-images";
import "./story-sections.css";


const icons = [MessageCircle, FileText, Scale];
type ProcessImage = { src: string; alt: string };

/** Shared process presentation for location, practice and introductory pages. */
export function ClaimProcessSteps({ locale, images }: { locale: SiteLocale; images?: readonly ProcessImage[] }) {
  return <ol className={`claim-process-steps${images ? " claim-process-steps--photos" : ""}`}>
    {claimProcessCopy[locale].steps.map((step, index) => {
      const Icon = icons[index];
      const photo = images?.[index];
      return <li key={index}>
        {photo && <img {...responsiveImageProps(photo.src)} src={photo.src} alt={photo.alt} width={800} height={560} loading="lazy" decoding="async" className="claim-process-photo" />}
        <div className="claim-process-step-top"><span>0{index + 1}</span><Icon size={25} strokeWidth={1.4} aria-hidden="true" /></div>
        <h3>{step.title}</h3><p>{step.body}</p>
      </li>;
    })}
  </ol>;
}
