import type { ReactNode } from "react";

const inlinePattern = /(\*\*([^*]+)\*\*|\[([^\]\n]+)\]\((https?:\/\/[^\s)]+|\/(?!\/)[^\s)]+)\))/g;
const localImagePattern = /^!\[([^\]\n]+)\]\((\/blog-images\/[A-Za-z0-9._/-]+)\)$/;

function renderInline(text: string) {
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(inlinePattern)) {
    const start = match.index ?? cursor;
    parts.push(text.slice(cursor, start));
    parts.push(match[2]
      ? <strong key={start}>{match[2]}</strong>
      : <a key={start} href={match[4]} className="underline underline-offset-4">{match[3]}</a>);
    cursor = start + match[0].length;
  }
  parts.push(text.slice(cursor));
  return parts;
}

export function ArticleParagraph({ text, className }: { text: string; className?: string }) {
  const image = text.match(localImagePattern);
  if (image) {
    return <img src={image[2]} alt={image[1]} loading="lazy" decoding="async" className="h-auto max-w-full rounded-sm" />;
  }

  if (text.startsWith("### ")) {
    return <h3 className="editorial-serif text-2xl font-semibold">{renderInline(text.slice(4))}</h3>;
  }

  const lines = text.split("\n");
  const listMarker = /^(?:- |\d+\. )/;
  if (lines.every((line) => listMarker.test(line))) {
    const List = text.startsWith("- ") ? "ul" : "ol";
    return (
      <List className={List === "ul" ? "list-disc space-y-2 pl-6" : "list-decimal space-y-2 pl-6"}>
        {lines.map((item, index) => <li key={index}>{renderInline(item.replace(listMarker, ""))}</li>)}
      </List>
    );
  }

  const tableRule = /^\|(?:\s*:?-+:?\s*\|)+$/;
  if (lines.length >= 3 && lines.every((line) => line.startsWith("|") && line.endsWith("|")) && tableRule.test(lines[1])) {
    const cells = (line: string) => line.slice(1, -1).split("|").map((cell) => cell.trim());
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-base">
          <thead><tr>{cells(lines[0]).map((cell, index) => <th key={index} scope="col" className="border-b border-foreground/20 p-2">{renderInline(cell)}</th>)}</tr></thead>
          <tbody>{lines.slice(2).map((line, index) => (
            <tr key={index}>{cells(line).map((cell, column) => <td key={column} className="border-b border-foreground/10 p-2 align-top">{renderInline(cell)}</td>)}</tr>
          ))}</tbody>
        </table>
      </div>
    );
  }

  return <p className={className}>{renderInline(text)}</p>;
}
