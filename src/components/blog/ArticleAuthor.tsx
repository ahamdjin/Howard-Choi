import { getBlogAuthor, authorProfilePath } from "@/data/blogAuthors";
import type { SiteLocale } from "@/data/injurySite";
import { Link } from "@/lib/router-compat";
import { responsiveImageProps } from "@/lib/responsive-images";

const labels = {
  en: { by: "By", about: "About the author", profile: "View author profile" },
  es: { by: "Por", about: "Sobre el autor", profile: "Ver perfil del autor" },
  ko: { by: "작성자", about: "작성자 소개", profile: "작성자 프로필 보기" },
};
type Props = { slug?: string; locale: SiteLocale };
export function ArticleByline({ slug, locale }: Props) {
  const author = getBlogAuthor(slug);
  return <span className="article-author-byline">{labels[locale].by} <Link to={authorProfilePath(author, locale)} rel="author" className="underline underline-offset-4">{author.name}</Link></span>;
}
export function ArticleAuthorBio({ slug, locale }: Props) {
  const author = getBlogAuthor(slug);
  return <aside aria-label={labels[locale].about} className="article-author-bio mt-10 rounded-[3px] bg-[#e9e6e1] p-7 md:p-8">
    <p className="text-xs font-medium uppercase">{labels[locale].about}</p>
    <div className="mt-4 flex items-start gap-4">
      <img {...responsiveImageProps(author.image, "64px")} src={author.image} alt={author.name} width={64} height={64} loading="lazy" decoding="async" className="h-16 w-16 shrink-0 rounded-full object-cover" />
      <div className="min-w-0">
        <Link to={authorProfilePath(author, locale)} rel="author" className="font-medium underline underline-offset-4">{author.name}</Link>
        <div className="mt-1 text-sm text-foreground/70">{author.role[locale]}</div>
      </div>
    </div>
    <p className="mt-4 text-sm leading-6">{author.bio[locale]}</p>
    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          {author.credentials.map(c => <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{c.label} · {c.value}</a>)}
          <Link to={authorProfilePath(author, locale)} className="underline underline-offset-4">{labels[locale].profile}</Link>
    </div>
  </aside>;
}
