import { Link } from "react-router-dom";
import brandLogo from "@/assets/law-firm/howard-choi-mark.webp";
import { brand, practiceAreas, serviceLocations } from "@/data/injurySite";

const KoreanFooter = () => {
  return (
    <footer className="bg-background py-24 text-foreground md:py-28 lg:py-32" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
      <div className="site-shell">
        <div className="grid gap-12 border-b border-black/10 pb-16 md:grid-cols-4 lg:gap-14">
          <div>
            <div className="mb-5 flex items-center gap-2.5"><span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={28} height={28} loading="lazy" decoding="async" className="h-full w-full object-cover invert" /></span><span className="text-[14px] font-medium tracking-[-0.02em]">{brand.name}</span></div>
            <p className="max-w-[280px] text-[13px] leading-6 text-muted-foreground">부에나파크와 인근 지역을 중심으로 사고 및 개인 상해 사건을 지원합니다.</p>
            <a href={brand.phoneHref} className="mt-5 block text-[13px] font-medium hover:opacity-60">{brand.phoneDisplay}</a>
          </div>

          <div>
            <div className="mb-5 text-[12px] text-muted-foreground">업무 분야</div>
            <div className="space-y-3 text-[13px]">{practiceAreas.slice(0, 5).map((practice) => <Link key={practice.slug} to={`/ko/practice-areas/${practice.slug}`} className="block hover:opacity-60">{practice.koTitle}</Link>)}<Link to="/ko/practice-areas" className="block text-muted-foreground hover:text-foreground">전체 보기 →</Link></div>
          </div>

          <div>
            <div className="mb-5 text-[12px] text-muted-foreground">서비스 지역</div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-[13px] md:grid-cols-1">{serviceLocations.map((location) => <Link key={location.slug} to={`/ko/locations/${location.slug}`} className="block hover:opacity-60">{location.koName}</Link>)}</div>
          </div>

          <div>
            <div className="mb-5 text-[12px] text-muted-foreground">로펌</div>
            <div className="space-y-3 text-[13px]"><Link to="/ko/attorney" className="block hover:opacity-60">Howard Choi 변호사</Link><Link to="/ko/results" className="block hover:opacity-60">사건 결과</Link><Link to="/ko/blogs" className="block hover:opacity-60">법률 블로그</Link><Link to="/ko/about" className="block hover:opacity-60">소개</Link><Link to="/ko/contact" className="block hover:opacity-60">문의</Link></div>
            <div className="mt-7 text-[12px] leading-5 text-muted-foreground">{brand.address}</div>
          </div>
        </div>

        <div className="grid gap-5 pt-8 text-[11px] text-muted-foreground lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <span>© 2026 {brand.name}</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2 lg:justify-center">
            <Link to="/ko/privacy-policy" className="hover:text-foreground">개인정보 처리방침</Link>
            <Link to="/ko/terms" className="hover:text-foreground">이용약관</Link>
            <Link to="/ko/disclaimer" className="hover:text-foreground">법률 고지</Link>
            <Link to="/ko/accessibility" className="hover:text-foreground">접근성 안내</Link>
          </div>
          <span className="max-w-[430px] lg:text-right">변호사 광고 · 일반 정보 제공 목적 · 과거 결과가 유사한 결과를 보장하지 않습니다</span>
        </div>
      </div>
    </footer>
  );
};

export default KoreanFooter;
