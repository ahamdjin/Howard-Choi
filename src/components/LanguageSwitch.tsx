import { useLocation, useNavigate } from "react-router-dom";

const toKoreanPath = (pathname: string) => {
  if (pathname === "/") return "/ko/";
  if (pathname === "/blogs") return "/ko/blogs";
  if (pathname.startsWith("/blogs/")) return pathname.replace("/blogs/", "/ko/blogs/");
  if (pathname === "/contact") return "/ko/contact";
  return "/ko/";
};

const toEnglishPath = (pathname: string) => {
  if (pathname === "/ko" || pathname === "/ko/") return "/";
  if (pathname === "/ko/blogs") return "/blogs";
  if (pathname.startsWith("/ko/blogs/")) return pathname.replace("/ko/blogs/", "/blogs/");
  if (pathname === "/ko/contact") return "/contact";
  return "/";
};

type LanguageSwitchProps = {
  className?: string;
};

const LanguageSwitch = ({ className = "" }: LanguageSwitchProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const korean = location.pathname === "/ko" || location.pathname.startsWith("/ko/");

  const switchLanguage = () => {
    navigate(korean ? toEnglishPath(location.pathname) : toKoreanPath(location.pathname));
  };

  return (
    <button
      type="button"
      onClick={switchLanguage}
      aria-label={korean ? "Switch to English" : "한국어로 전환"}
      className={`group inline-flex h-8 items-center overflow-hidden rounded-full border border-white/15 bg-[#17130f]/78 px-1.5 text-[9px] shadow-[0_4px_18px_rgba(0,0,0,0.16)] backdrop-blur-md transition-all duration-300 hover:border-white/28 hover:bg-[#17130f]/90 ${className}`}
    >
      <span
        className={`rounded-full px-2 py-1 uppercase tracking-[0.12em] transition-colors duration-300 ${
          korean ? "text-[#f3eee5]/46" : "bg-[#f3eee5] text-[#211c17]"
        }`}
      >
        EN
      </span>
      <span className="mx-0.5 h-3 w-px bg-white/14" aria-hidden="true" />
      <span
        style={{ fontFamily: '"Noto Sans KR", sans-serif' }}
        className={`rounded-full px-2 py-1 tracking-[-0.01em] transition-colors duration-300 ${
          korean ? "bg-[#f3eee5] text-[#211c17]" : "text-[#f3eee5]/58"
        }`}
      >
        한국어
      </span>
    </button>
  );
};

export default LanguageSwitch;
