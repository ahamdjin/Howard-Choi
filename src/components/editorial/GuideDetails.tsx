import { FileText } from "lucide-react";

export function GuideDetails({ items }: { items: { title: string; text: string }[] }) {
  return <div className="experience-guide-details">{items.map(item => <div key={item.title}>
    <FileText size={21} strokeWidth={1.4} aria-hidden="true" />
    <div><h3>{item.title}</h3><p>{item.text}</p></div>
  </div>)}</div>;
}

export function GuideStatistics({ stats, locale }: { stats: { value: number; label: string }[]; locale: string }) {
  return <dl className="experience-guide-statistics">{stats.map(stat => <div key={stat.label}>
    <dt>{stat.label}</dt><dd>{stat.value.toLocaleString(locale)}</dd>
  </div>)}</dl>;
}
