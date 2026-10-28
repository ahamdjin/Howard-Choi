import type { Translation } from "./fullBlogTranslations";
import { additionalBlogLocales } from "./additionalBlogLocales";
import { fullBlogTranslation, localizedBlogTiming } from "./fullBlogTranslations";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";

export type SpanishBlogSection = { heading: string; paragraphs: string[] };
export type SpanishBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  alt: string;
  intro: string;
  takeaway: string;
  leadParagraphs?: string[];
  sections: SpanishBlogSection[];
  relatedHref: string;
  relatedLabel: string;
};

const baseesBlogPosts: Omit<SpanishBlogPost, "intro" | "takeaway" | "sections">[] = [
  {
    slug: "california-comparative-fault-personal-injury",
    title: "Culpa comparativa en California: ¿qué pasa si tuve parte de la culpa?",
    excerpt: "Cómo puede afectar la culpa comparativa a un reclamo por lesiones personales en California y qué evidencia puede influir en el porcentaje de responsabilidad.",
    category: "Responsabilidad y seguro",
    date: "14 de septiembre de 2026",
    publishedAt: "2026-09-14",
    readingTime: "7 min",
    image: heroCourthouse,
    alt: "Interior de un tribunal de California",
    relatedHref: "/es/practice-areas/car-accidents",
    relatedLabel: "Accidentes de auto y disputas de culpa",
  },
  {
    slug: "how-much-is-my-personal-injury-case-worth-california",
    title: "¿Cuánto puede valer un caso de lesiones personales en California?",
    excerpt: "Factores que pueden influir en el valor de un reclamo, incluidos gastos médicos, pérdida de ingresos, atención futura, culpa, seguro y evidencia.",
    category: "Valor del caso",
    date: "13 de septiembre de 2026",
    publishedAt: "2026-09-13",
    readingTime: "8 min",
    image: heroJusticeLibrary,
    alt: "Balanza de justicia y libros jurídicos",
    relatedHref: "/es/case-value-calculator",
    relatedLabel: "Calculadora educativa de valor del caso",
  },
  {
    slug: "uber-lyft-accident-insurance-california",
    title: "Seguro en accidentes de Uber y Lyft en California",
    excerpt: "Por qué el estado de la aplicación del conductor puede cambiar la cobertura y qué información conviene conservar después de un accidente de rideshare.",
    category: "Uber y Lyft",
    date: "12 de septiembre de 2026",
    publishedAt: "2026-09-12",
    readingTime: "7 min",
    image: heroCityBoardroom,
    alt: "Sala de reuniones de una firma legal",
    relatedHref: "/es/practice-areas/rideshare-accidents",
    relatedLabel: "Reclamos por accidentes de Uber y Lyft",
  },
  {
    slug: "truck-accident-evidence-eld-records-california",
    title: "Evidencia en accidentes de camión: ELD y registros de empresa",
    excerpt: "Cómo los registros electrónicos, horas de servicio, mantenimiento, cámaras y archivos internos pueden importar en un accidente de camión comercial.",
    category: "Accidentes de camión",
    date: "11 de septiembre de 2026",
    publishedAt: "2026-09-11",
    readingTime: "8 min",
    image: heroLawOffice,
    alt: "Oficina legal revisando registros de un accidente de camión",
    relatedHref: "/es/practice-areas/truck-accidents",
    relatedLabel: "Accidentes de camión comercial",
  },
  {
    slug: "california-personal-injury-deadlines",
    title: "Plazos para reclamos por lesiones personales en California",
    excerpt: "El plazo general de dos años para muchas demandas por lesiones, reclamos contra entidades públicas y razones para revisar pronto la fecha aplicable.",
    category: "Ley de lesiones de California",
    date: "10 de septiembre de 2026",
    publishedAt: "2026-09-10",
    readingTime: "7 min",
    image: heroCourthouse,
    alt: "Tribunal de California",
    relatedHref: "/es/practice-areas",
    relatedLabel: "Áreas de lesiones personales",
  },
  {
    slug: "what-to-do-after-a-car-accident-in-california",
    title: "Qué hacer después de un accidente de auto en California",
    excerpt: "Pasos prácticos después de un choque: seguridad, atención médica, evidencia, reportes, seguros y documentación.",
    category: "Accidentes de auto",
    date: "9 de septiembre de 2026",
    publishedAt: "2026-09-09",
    readingTime: "8 min",
    image: heroLawOffice,
    alt: "Documentos y notas después de un accidente",
    relatedHref: "/es/practice-areas/car-accidents",
    relatedLabel: "Reclamos por accidentes de auto",
  },
];

const translationModules = import.meta.glob("./blog-translations/*.es.json", { eager: true, import: "default" }) as Record<string, Translation>;

export const esBlogPosts = baseesBlogPosts.map((post) => ({ ...post, ...fullBlogTranslation(post.slug, "es", translationModules), ...localizedBlogTiming(post.slug, "es") })).concat(additionalBlogLocales("es", translationModules));

export const getSpanishBlogBySlug = (slug: string) => esBlogPosts.find((post) => post.slug === slug);
