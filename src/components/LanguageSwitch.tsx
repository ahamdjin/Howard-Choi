import { useLocation } from "react-router-dom";

const toKoreanPath = (pathname: string) => pathname === "/" ? "/ko" : `/ko${pathname}`;
const toEnglishPath = (pathname: string) => {
  if (pathname === "/ko" || pathname === "/ko/") return "/";
  return pathname.replace(/^\/ko/, "") || "/";
};

type LanguageSwitchProps = {
  className?: string;
};

const LanguageSwitch = ({ className = "" }: LanguageSwitchProps) => {
  const location = useLocation();
  const korean = location.pathname === "/ko" || location.pathname.startsWith("/ko/");
  const targetPath = korean ? toEnglishPath(location.pathname) : toKoreanPath(location.pathname);

  return (
    <a
      href={targetPath}
      hrefLang={korean ? "en-US" : "ko-US"}
      lang={korean ? "en" : "ko"}
      aria-label={korean ? "Switch to English" : "한국어로 전환"}
      className={`group inline-flex h-8 items-center overflow-hidden rounded-full border border-[#211c17]/14 bg-[#ded8cf]/95 px-1.5 text-[9px] shadow-[0_4px_18px_rgba(20,16,12,0.14)] backdrop-blur-md transition-all duration-300 hover:bg-[#e8e2d9] hover:shadow-[0_5px_22px_rgba(20,16,12,0.18)] ${className}`}
    >
      <span className={`rounded-full px-2 py-1 uppercase tracking-[0.12em] transition-colors duration-300 ${korean ? "text-[#211c17]/48" : "bg-[#211c17] text-[#f3eee5]"}`}>EN</span>
      <span className="mx-0.5 h-3 w-px bg-[#211c17]/14" aria-hidden="true" />
      <span style={{ fontFamily: '"Noto Sans KR", sans-serif' }} className={`rounded-full px-2 py-1 tracking-[-0.01em] transition-colors duration-300 ${korean ? "bg-[#211c17] text-[#f3eee5]" : "text-[#211c17]/58"}`}>한국어</span>
    </a>
  );
};

export default LanguageSwitch;
