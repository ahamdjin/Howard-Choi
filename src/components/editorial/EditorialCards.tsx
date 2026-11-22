import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Story = { title: string; children: ReactNode };
type Destination = { href: string; label: string; target?: "_blank" };
type Photo = { src: string; alt: string; width: number; height: number };

const headline = "editorial-serif text-balance text-3xl leading-tight";
const copy = "max-w-prose text-pretty text-base leading-relaxed";

function CardLink({ href, label, target }: Destination) {
  return <ArrowLink className="mt-3" href={href} target={target} rel={target && "noopener noreferrer"}>{label}</ArrowLink>;
}

export function ImageStoryCard({ title, children, photo, link }: Story & { photo: Photo; link: Destination }) {
  return (
    <Card className="overflow-hidden rounded-sm border-0 bg-[#241f19] text-[#faf6ee] shadow-none">
      <img {...photo} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
      <div className="p-6">
        <h3 className={headline}>{title}</h3>
        <div className={copy + " mt-3 text-[#e6dacc]"}>{children}</div>
        <CardLink {...link} />
      </div>
    </Card>
  );
}

export function GuidanceCard({ title, children, source, mobileDisclosure }: Story & { source?: Destination; mobileDisclosure?: string }) {
  const mobile = useIsMobile();
  const body = <>
    <div className={copy + " mt-3"}>{children}</div>
    {source && <CardLink {...source} />}
  </>;
  const collapsible = mobile && mobileDisclosure;
  return (
    <Card className={cn("rounded-none border-0 border-l-2 border-[#866846] bg-[#f5efe6] text-[#29231d] shadow-none", collapsible ? "px-4" : "p-6")}>
      {collapsible ? (
        <details className="home-topic" name={mobileDisclosure}>
          <summary><h3 className={headline}>{title}</h3></summary>
          {body}
        </details>
      ) : <><h3 className={headline}>{title}</h3>{body}</>}
    </Card>
  );
}

export function ChecklistCard({ title, items }: { title?: string; items: readonly ReactNode[] }) {
  return (
    <Card className="rounded-none border-0 border-t-2 border-[#302920] bg-transparent py-5 text-[#28231d] shadow-none">
      {title && <h3 className={headline}>{title}</h3>}
      <ol className="mt-4 list-decimal divide-y divide-[#d9cfc3] pl-6 marker:font-medium marker:text-[#735834]">
        {items.map((item, index) => <li key={index} className="py-3 pl-2 leading-relaxed">{item}</li>)}
      </ol>
    </Card>
  );
}

export function QuotationCard({ quote, attribution }: { quote: string; attribution: ReactNode }) {
  return (
    <figure className="m-0 bg-[#383027] p-7 text-[#faf5ed]">
      <blockquote className="editorial-serif max-w-prose text-pretty text-3xl leading-snug">“{quote}”</blockquote>
      <figcaption className="mt-5 border-t border-white/25 pt-3 text-sm text-[#e2d4c4]">{attribution}</figcaption>
    </figure>
  );
}

export function PhotoLinkCard({ children, className, ...anchorProps }: ComponentPropsWithoutRef<"a"> & { href: string }) {
  return (
    <Card asChild className={cn("group relative flex w-[86%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[4px] border-0 bg-[#181511] text-[#f3eee5] shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-[47%] lg:w-[31%] xl:w-[24%]", className)}>
      <a {...anchorProps}>{children}</a>
    </Card>
  );
}
