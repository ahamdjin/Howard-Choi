import { Link } from "react-router-dom";
import brandLogo from "@/assets/law-firm/howard-choi-mark.webp";

const KoreanFooter = () => {
  return (
    <footer className="bg-background py-24 text-foreground md:py-28 lg:py-32" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
      <div className="site-shell">
        <div className="grid gap-12 border-b border-black/10 pb-16 md:grid-cols-4 lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-[2px]">
                <img src={brandLogo} alt="" width={28} height={28} loading="lazy" decoding="async" className="h-full w-full object-cover invert" />
              </span>
              <span className="text-[15px] font-medium">Howard Choi Law</span>
            </div>
            <p className="max-w-xs text-[13px] leading-6 text-muted-foreground">
              중요한 의사결정을 앞둔 기업, 창업자, 개인 고객을 위한 집중도 높은 법률자문.
            </p>
          </div>

          <div>
            <div className="mb-5 text-[12px] text-muted-foreground">업무 분야</div>
            <div className="space-y-3 text-[13px]">
              <a href="/ko/#practice" className="block hover:opacity-60">기업 자문</a>
              <a href="/ko/#practice" className="block hover:opacity-60">상사 소송</a>
              <a href="/ko/#practice" className="block hover:opacity-60">규제 · 컴플라이언스</a>
            </div>
          </div>

          <div>
            <div className="mb-5 text-[12px] text-muted-foreground">로펌</div>
            <div className="space-y-3 text-[13px]">
              <a href="/ko/#approach" className="block hover:opacity-60">업무 방식</a>
              <a href="/ko/#faq" className="block hover:opacity-60">FAQ</a>
              <Link to="/ko/blogs" className="block hover:opacity-60">인사이트</Link>
              <Link to="/ko/contact" className="block hover:opacity-60">문의</Link>
              <a href="/ko/#booking" className="block hover:opacity-60">상담 예약</a>
            </div>
          </div>

          <div>
            <div className="mb-5 text-[12px] text-muted-foreground">연락처</div>
            <div className="space-y-3 text-[13px] text-muted-foreground">
              <a href="mailto:hello@howardchoilaw.com" className="block hover:text-foreground">hello@howardchoilaw.com</a>
              <a href="tel:+17146900007" className="block hover:text-foreground">+1 714-690-0007</a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=6301+Beach+Blvd%2C+Buena+Park%2C+CA+90621"
                target="_blank"
                rel="noreferrer"
                className="block max-w-[210px] leading-5 hover:text-foreground"
              >
                6301 Beach Blvd<br />Buena Park, CA 90621
              </a>
              <p>월–금 · 오전 9시–오후 5시</p>
              <p>상담은 예약제로 진행됩니다</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Howard Choi Law</span>
          <span>변호사 광고 · 일반 정보 제공 목적</span>
        </div>
      </div>
    </footer>
  );
};

export default KoreanFooter;
