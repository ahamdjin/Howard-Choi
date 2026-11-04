import { ArticleByline } from "./ArticleAuthor";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, Copy, Facebook, Linkedin, Phone } from "lucide-react";
import { absoluteUrl } from "@/lib/seo";
import { Link } from "@/lib/router-compat";
import { responsiveImageProps } from "@/lib/responsive-images";
import type { SiteLocale } from "@/data/injurySite";
import "./article-reading.css";

// Set to false to restore the previous hero and sidebar in every language.
export const ARTICLE_READING_LAYOUT = true;

const copy = {
  en: { back: "All articles", contents: "In this article", takeaway: "Key takeaway", share: "Share article", copyLink: "Copy link", copied: "Copied", failed: "Could not copy. Select and copy the address from your browser.", summarize: "Summarize this article", prompt: "Copy summary prompt", hint: "Choose an assistant. For Gemini, the prompt is copied—paste it after opening.", question: "Questions about your injury?", body: "Talk through your accident and the next steps with our office.", cta: "Free Consultation", phone: "Call our office", summary: "Summarize this article in plain English, with key takeaways and questions to discuss with a lawyer. Use this article as the source:" },
  es: { back: "Todos los artículos", contents: "En este artículo", takeaway: "Punto clave", share: "Compartir artículo", copyLink: "Copiar enlace", copied: "Copiado", failed: "No se pudo copiar. Copie la dirección desde su navegador.", summarize: "Resuma este artículo", prompt: "Copiar solicitud de resumen", hint: "Elija un asistente. Para Gemini, pegue la solicitud copiada al abrirlo.", question: "¿Tiene preguntas sobre su lesión?", body: "Hable con nuestra oficina sobre su accidente y los próximos pasos.", cta: "Consulta gratuita", phone: "Llame a la oficina", summary: "Resume este artículo en español claro, con puntos clave y preguntas para consultar con un abogado. Usa este artículo como fuente:" },
  ko: { back: "모든 글", contents: "이 글의 내용", takeaway: "핵심 내용", share: "글 공유", copyLink: "링크 복사", copied: "복사됨", failed: "복사하지 못했습니다. 브라우저 주소창에서 주소를 복사하세요.", summarize: "이 글 요약하기", prompt: "요약 요청 복사", hint: "AI를 선택하세요. Gemini에서는 복사된 요청을 붙여 넣으세요.", question: "부상에 관해 궁금하신가요?", body: "사고와 다음 단계를 사무실과 상담하세요.", cta: "무료 상담", phone: "사무실에 전화", summary: "이 글을 바탕으로 핵심 내용과 변호사에게 물어볼 질문을 쉬운 한국어로 요약해 주세요. 출처:" },
};

const digestPrompts: Record<SiteLocale, (url: string) => string> = {
  en: url => `Read and summarize this article: ${url}

Give me a scannable digest a busy reader can absorb in under a minute:

1. One-sentence overview of what the article covers.
2. The top 3–5 key takeaways as short bullet points.
3. Any specific numbers, examples, or actionable details worth knowing.

Keep it concise and only use information supported by the article. Do not add outside claims.

Source: ${url}`,
  es: url => `Lee y resume este artículo en español: ${url}

Dame un resumen fácil de escanear que una persona ocupada pueda leer en menos de un minuto:

1. Una frase que explique de qué trata el artículo.
2. Los 3–5 puntos clave en viñetas breves.
3. Cifras, ejemplos o detalles prácticos específicos que valga la pena conocer.

Sé conciso y usa únicamente información respaldada por el artículo. No añadas afirmaciones externas.

Fuente: ${url}`,
  ko: url => `다음 글을 읽고 한국어로 요약해 주세요: ${url}

바쁜 독자가 1분 안에 읽을 수 있도록 핵심을 한눈에 파악할 수 있는 요약을 작성해 주세요:

1. 글에서 다루는 내용을 한 문장으로 설명해 주세요.
2. 가장 중요한 핵심 내용 3~5개를 짧은 글머리 기호로 정리해 주세요.
3. 알아둘 만한 구체적인 수치, 사례 또는 실천할 수 있는 내용을 포함해 주세요.

간결하게 작성하고 글에서 뒷받침하는 정보만 사용해 주세요. 외부 주장을 추가하지 마세요.

출처: ${url}`,
};

type ArticlePost = { slug?: string; title: string; image: string; alt: string; category: string; date: string; readingTime: string; sections: { heading: string }[] };
type Props = { post: ArticlePost; locale: SiteLocale };

export function ArticleHero({ post, locale }: Props) {
  const prefix = locale === "en" ? "" : "/" + locale;
  return <header className="article-reading-hero">
    <div className="site-shell">
      <Link to={prefix + "/blogs"} className="article-back"><ArrowLeft size={16} />{copy[locale].back}</Link>
      <div className="article-reading-meta"><span>{post.category}</span><span>{post.date}</span><span>{post.readingTime}</span><ArticleByline slug={post.slug} locale={locale} /></div>
      <h1>{post.title}</h1>
      <img {...responsiveImageProps(post.image)} src={post.image} alt={post.alt} loading="eager" fetchPriority="high" decoding="async" className="article-reading-image" />
    </div>
  </header>;
}

export function ArticleReadingSidebar({ post, locale }: Props) {
  const c = copy[locale];
  const prefix = locale === "en" ? "" : "/" + locale;
  const sectionPrefix = locale === "ko" ? "ko-article-section-" : "article-section-";
  const [active, setActive] = useState("article-key-takeaway");
  const [address, setAddress] = useState("");
  const [feedback, setFeedback] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(feedbackTimer.current), []);
  const sections = [{ id: "article-key-takeaway", label: c.takeaway }, ...post.sections.map((s, i) => ({ id: sectionPrefix + (i + 1), label: s.heading }))];

  useEffect(() => {
    setAddress(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || absoluteUrl(window.location.pathname));
    const ids = ["article-key-takeaway", ...post.sections.map((_, i) => sectionPrefix + (i + 1))];
    let frame = 0;
    const update = () => {
      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, [post, sectionPrefix]);

  async function copyText(text: string, link = false) {
    clearTimeout(feedbackTimer.current);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(link);
      setFeedback(c.copied);
      feedbackTimer.current = setTimeout(() => { setCopiedLink(false); setFeedback(""); }, 3000);
    } catch { setCopiedLink(false); setFeedback(c.failed); }
  }
  const prompt = digestPrompts[locale](address);
  const encodedPrompt = encodeURIComponent(prompt);
  const assistants = [
    { name: "ChatGPT", icon: "openai", href: "https://chatgpt.com/?q=" + encodedPrompt },
    { name: "Claude", icon: "claude-color", href: "https://claude.ai/new?q=" + encodedPrompt },
    { name: "Perplexity", icon: "perplexity", href: "https://www.perplexity.ai/search/new?q=" + encodedPrompt },
    { name: "Gemini", icon: "gemini-color", href: "https://gemini.google.com/app", copy: true },
    { name: "Grok", icon: "grok", href: "https://grok.com/?q=" + encodedPrompt },
  ];
  const nav = <nav aria-label={c.contents} className="article-reading-toc">
    {sections.map(s => <a key={s.id} href={"#" + s.id} aria-current={active === s.id ? "location" : undefined}>{s.label}</a>)}
  </nav>;
  const encoded = encodeURIComponent(address);
  return <aside className="article-reading-sidebar">
    <div className="article-reading-tools">
      <div className="article-summary">
        <p className="article-tool-label">{c.summarize}</p>
        <div className="article-ai-links">
          {assistants.map(assistant => <a key={assistant.name} href={assistant.href} target="_blank" rel="noopener noreferrer" title={assistant.name} aria-label={c.summarize + " · " + assistant.name} onClick={assistant.copy ? () => { void copyText(prompt); } : undefined}>
            <img src={"/icons/ai/" + assistant.icon + ".svg"} width="28" height="28" alt="" />
          </a>)}
        </div>
        <p>{c.hint}</p>
      </div>
      <div className="article-desktop-toc"><p className="article-tool-label">{c.contents}</p>{nav}</div>
      <details className="article-mobile-toc"><summary>{c.contents}</summary>{nav}</details>
      <div className="article-share">
        <p>{c.share}</p>
        <div>
          <a href={"https://www.facebook.com/sharer/sharer.php?u=" + encoded} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
          <a href={"https://www.linkedin.com/sharing/share-offsite/?url=" + encoded} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
          <a href={"https://twitter.com/intent/tweet?url=" + encoded + "&text=" + encodeURIComponent(post.title)} target="_blank" rel="noopener noreferrer" aria-label="X"><span aria-hidden="true">𝕏</span></a>
          <button type="button" title={copiedLink ? c.copied : c.copyLink} aria-label={copiedLink ? c.copied : c.copyLink} onClick={() => copyText(address, true)}>{copiedLink ? <Check size={20} /> : <Copy size={20} />}</button>
        </div>
      </div>
      <p role="status" className={feedback === c.copied ? "sr-only" : "article-copy-status"}>{feedback}</p>
      <div className="article-reading-cta">
        <h2>{c.question}</h2><p>{c.body}</p>
        <Link to={prefix + "/contact"}>{c.cta}<ArrowUpRight size={18} /></Link>
        <a href="tel:+17148448494" aria-label={c.phone + " 714-844-8494"}><Phone size={16} />714-844-8494</a>
      </div>
    </div>
  </aside>;
}
