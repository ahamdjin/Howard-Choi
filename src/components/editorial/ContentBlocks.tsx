import { ArticleParagraph } from "@/components/blog/ArticleParagraph";

type Group = { heading: string; paragraphs: string[] };
/** Presentation only: every source paragraph is rendered once, in source order. */
export function ContentBlocks({ paragraphs }: { paragraphs: readonly string[] }) {
  const lead: string[] = [];
  const groups: Group[] = [];
  for (const paragraph of paragraphs) {
    if (paragraph.startsWith("### ")) groups.push({ heading: paragraph.slice(4), paragraphs: [] });
    else if (groups.length) groups[groups.length - 1].paragraphs.push(paragraph);
    else lead.push(paragraph);
  }
  const steps = groups.length > 1 && groups.every(g => /^\d+[.)]\s/.test(g.heading));
  const comparison = groups.length === 2 && (groups.every(g => /economic/i.test(g.heading)) || (/before/i.test(groups[0].heading) && /after/i.test(groups[1].heading)));
  return <div className="content-blocks">
    {lead.length > 0 && <div className="content-prose">{lead.map((text, i) => <ArticleParagraph key={i} text={text} />)}</div>}
    {steps ? <ol className="content-steps">{groups.map((g, i) => <li key={i}>
      <span className="content-step-number" aria-hidden="true">{i + 1}</span><div><h3>{g.heading.replace(/^\d+[.)]\s*/, "")}</h3><div className="content-prose">{g.paragraphs.map((text,j) => <ArticleParagraph key={j} text={text} />)}</div></div>
    </li>)}</ol> : <div className={comparison ? "content-comparison" : "content-subsections"}>{groups.map((g,i) => <div key={i}><h3>{g.heading}</h3><div className="content-prose">{g.paragraphs.map((text,j) => <ArticleParagraph key={j} text={text} />)}</div></div>)}</div>}
  </div>;
}
