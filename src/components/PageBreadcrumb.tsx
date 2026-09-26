import { useLocation } from "react-router-dom";
import type { SiteLocale } from "@/data/injurySite";

export default function PageBreadcrumb({ locale, title }: { locale: SiteLocale; title: string }) {
  const { pathname } = useLocation();
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  const home = ko ? "홈" : es ? "Inicio" : "Home";
  const parent = [
    { path: "/practice-areas", label: ko ? "업무 분야" : es ? "Áreas de práctica" : "Practice Areas" },
    { path: "/locations", label: ko ? "지역" : es ? "Zonas" : "Locations" },
    { path: "/blogs", label: ko ? "블로그" : es ? "Guías" : "Blogs" },
  ].find((item) => pathname.startsWith(prefix + item.path + "/"));
  return (
    <nav aria-label={ko ? "페이지 경로" : es ? "Ruta de navegación" : "Breadcrumb"} className="mb-6 text-xs leading-5">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><a href={prefix || "/"} className="underline underline-offset-4">{home}</a></li>
        {parent && <li className="flex items-center gap-2"><span aria-hidden="true">/</span><a href={prefix + parent.path} className="underline underline-offset-4">{parent.label}</a></li>}
        <li className="flex min-w-0 items-start gap-2"><span aria-hidden="true">/</span><span aria-current="page">{title}</span></li>
      </ol>
    </nav>
  );
}
