import { Link } from "react-router-dom";

type TrustSignalsProps = {
  locale?: "en" | "ko";
};

const TrustSignals = ({ locale = "en" }: TrustSignalsProps) => {
  const korean = locale === "ko";
  const items = korean
    ? [
        ["2012", "캘리포니아 변호사 등록"],
        ["#284364", "캘리포니아 변호사 등록번호"],
        ["06", "주요 서비스 지역"],
        ["08", "상해 업무 분야"],
      ]
    : [
        ["2012", "Admitted in California"],
        ["#284364", "California Bar number"],
        ["06", "Local communities served"],
        ["08", "Injury practice areas"],
      ];

  return (
    <section className="border-b border-[#211c17]/10 bg-[#eee9e2] text-[#211c17]">
      <div className="site-shell py-10 md:py-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-[#211c17]/42">
              {korean ? "검증된 기본 정보" : "Verified fundamentals"}
            </div>
            <h2
              style={korean ? { fontFamily: '"Noto Serif KR", serif' } : undefined}
              className={`${korean ? "" : "editorial-serif"} mt-3 max-w-[460px] text-[clamp(2rem,3vw,3.15rem)] leading-[1.02] tracking-[-0.025em]`}
            >
              {korean ? "과장보다 확인 가능한 사실부터." : "Proof starts with facts we can verify."}
            </h2>
            <Link to={korean ? "/ko/attorney" : "/attorney"} className="mt-5 inline-flex text-[12px] text-[#211c17]/58 transition-colors hover:text-[#211c17]">
              {korean ? "Howard Choi 변호사 보기 →" : "Meet Howard Choi →"}
            </Link>
          </div>

          <div className="grid grid-cols-2 border-l border-t border-[#211c17]/10 sm:grid-cols-4 lg:border-t-0">
            {items.map(([value, label]) => (
              <div key={label} className="min-h-[124px] border-b border-r border-[#211c17]/10 px-4 py-5 sm:min-h-[142px] sm:px-5 sm:py-6 lg:border-b-0">
                <div
                  style={korean ? { fontFamily: '"Noto Serif KR", serif' } : undefined}
                  className={`${korean ? "" : "editorial-serif"} text-[clamp(1.9rem,2.8vw,2.75rem)] leading-none tracking-[-0.03em]`}
                >
                  {value}
                </div>
                <div className="mt-3 max-w-[130px] text-[10px] leading-4 text-[#211c17]/48 sm:text-[11px]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
