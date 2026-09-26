import { useLocation } from "react-router-dom";

type LanguageSwitchProps = {
  className?: string;
};

const LanguageSwitch = ({ className = "" }: LanguageSwitchProps) => {
  const location = useLocation();
  const basePath = location.pathname.replace(/^\/(?:ko|es)(?=\/|$)/, "") || "/";
  const englishPath = basePath;
  const koreanPath = basePath === "/" ? "/ko" : `/ko${basePath}`;
  const spanishPath = basePath === "/" ? "/es" : `/es${basePath}`;
  const current = location.pathname === "/ko" || location.pathname.startsWith("/ko/")
    ? "ko"
    : location.pathname === "/es" || location.pathname.startsWith("/es/")
      ? "es"
      : "en";

  const itemClass = (locale: "en" | "ko" | "es") =>
    `rounded-full px-2 py-1 transition-colors duration-300 ${current === locale ? "bg-[#211c17] text-[#f3eee5]" : "text-[#211c17]/58"}`;

  return (
    <div
      aria-label="Language"
      className={`group inline-flex h-8 items-center overflow-hidden rounded-full border border-[#211c17]/14 bg-[#ded8cf]/95 px-1.5 text-[9px] shadow-[0_4px_18px_rgba(20,16,12,0.14)] backdrop-blur-md ${className}`}
    >
      <a href={englishPath} hrefLang="en-US" lang="en" aria-current={current === "en" ? "page" : undefined} className={`${itemClass("en")} uppercase tracking-[0.12em]`}>EN</a>
      <span className="mx-0.5 h-3 w-px bg-[#211c17]/14" aria-hidden="true" />
      <a href={koreanPath} hrefLang="ko-US" lang="ko" aria-current={current === "ko" ? "page" : undefined} style={{ fontFamily: '"Noto Sans KR", sans-serif' }} className={itemClass("ko")}>한국어</a>
      <span className="mx-0.5 h-3 w-px bg-[#211c17]/14" aria-hidden="true" />
      <a href={spanishPath} hrefLang="es-US" lang="es-US" aria-current={current === "es" ? "page" : undefined} className={itemClass("es")}>ES</a>
    </div>
  );
};

export default LanguageSwitch;
