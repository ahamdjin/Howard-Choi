import { useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import "./claim-guidance.css";

type NotesByPath = Record<string, {
  title: string;
  paragraphs: string[];
  href: string;
  linkLabel: string;
  links?: { href: string; label: string }[];
} | undefined>;

export function PageReadingNote({ notes, withinShell = false }: { notes: NotesByPath; withinShell?: boolean }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const note = notes[pathname.replace(/\/$/, "") || "/"];
  if (!note) return null;

  if (note.links?.length) return (
    <div className={withinShell ? "relative z-10 py-8" : "site-shell relative z-10 py-10 md:py-14"}>
      <section aria-labelledby="page-reading-note" className="claim-reading-note">
        <div className="claim-reading-note__heading">
          <h2 id="page-reading-note" className="editorial-serif scroll-mt-28 text-balance">{note.title}</h2>
          <a className="claim-reading-note__primary" href={note.href}>
            <span>{note.linkLabel}</span><ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
        <div className="claim-reading-note__body">
          <div className="claim-reading-note__prose">
            {note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <ul className="claim-reading-note__resources">
            {note.links.map((link) => <li key={link.href}>
              <a href={link.href}><span>{link.label}</span><ArrowRight className="size-4 shrink-0" aria-hidden="true" /></a>
            </li>)}
          </ul>
        </div>
      </section>
    </div>
  );

  return (
    <div className={withinShell ? "relative z-10 py-8" : "site-shell relative z-10 py-10 md:py-14"}>
      <section aria-labelledby="page-reading-note" className="border border-foreground/15 bg-[#f3efe8] px-5 py-7 text-foreground md:px-9 md:py-9">
        <div className="max-w-3xl">
          <h2 id="page-reading-note" className="editorial-serif scroll-mt-28 text-balance text-2xl leading-tight md:text-3xl">{note.title}</h2>
          <div className="mt-4 space-y-4 text-pretty text-base leading-relaxed text-[#423e38]">
            {note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <a className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4" href={note.href}>
            {note.linkLabel}<ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </a>
          {note.links?.length ? <ul className="mt-5 space-y-3 border-t border-foreground/15 pt-5">
            {note.links.map((link) => <li key={link.href}>
              <a href={link.href} className="inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4">
                <span>{link.label}</span><ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
            </li>)}
          </ul> : null}
        </div>
      </section>
    </div>
  );
}
