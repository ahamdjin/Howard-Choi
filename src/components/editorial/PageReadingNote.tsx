import { useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

type NotesByPath = Record<string, {
  title: string;
  paragraphs: string[];
  href: string;
  linkLabel: string;
} | undefined>;

export function PageReadingNote({ notes, withinShell = false }: { notes: NotesByPath; withinShell?: boolean }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const note = notes[pathname.replace(/\/$/, "") || "/"];
  if (!note) return null;

  return (
    <div className={withinShell ? "relative z-10 py-8" : "site-shell relative z-10 py-10 md:py-14"}>
      <section aria-labelledby="page-reading-note" className="border border-foreground/15 bg-[#f3efe8] px-5 py-7 text-foreground md:px-9 md:py-9">
        <div className="max-w-3xl">
          <h2 id="page-reading-note" className="editorial-serif text-balance text-2xl leading-tight md:text-3xl">{note.title}</h2>
          <div className="mt-4 space-y-4 text-pretty text-base leading-relaxed text-[#423e38]">
            {note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <a className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4" href={note.href}>
            {note.linkLabel}<ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
