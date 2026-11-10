import { Camera, FolderOpen, HeartPulse, MessageCircle, ArrowRight } from "lucide-react";
/** An accessible note board, not a claim-value or medical diagram. */
export function ClaimNotes({ subject = "" }: { subject?: string }) {
  const process = /process|expect|difference|fee/.test(subject);
  const notes = process ? [
    { Icon: MessageCircle, label: "Your questions", detail: "What happened? What do you need to understand?" },
    { Icon: FolderOpen, label: "Your records", detail: "Bring the documents you already have." },
    { Icon: ArrowRight, label: "Your next step", detail: "Discuss the options before deciding." },
  ] : [
    { Icon: Camera, label: "What happened", detail: "Photos, witness details and the incident record." },
    { Icon: HeartPulse, label: "What changed", detail: "Treatment, symptoms and everyday limitations." },
    { Icon: FolderOpen, label: "What to keep", detail: "Original records, dates, bills and questions." },
  ];
  return <figure className="claim-notes" aria-label="A simple way to organize your questions"><figcaption>A simple way to put it together</figcaption><div className="claim-notes__board">{notes.map(({Icon,label,detail},i)=><div className="claim-note" key={label}><Icon aria-hidden="true" size={25} strokeWidth={1.5}/><span className="claim-note__number">0{i+1}</span><h3>{label}</h3><p>{detail}</p></div>)}</div></figure>;
}
