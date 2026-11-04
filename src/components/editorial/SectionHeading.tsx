import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, children, text }: { eyebrow: string; children: ReactNode; text?: string }) {
  return <header className="experience-heading">
    <span className="experience-eyebrow">{eyebrow}</span>
    <h2>{children}</h2>
    {text && <p>{text}</p>}
  </header>;
}
