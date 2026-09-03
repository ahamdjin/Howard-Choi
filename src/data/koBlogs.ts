import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";

export type KoreanBlogSection = {
  heading: string;
  paragraphs: string[];
};

export type KoreanBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
  alt: string;
  intro: string;
  takeaway: string;
  sections: KoreanBlogSection[];
};

export const koBlogPosts: KoreanBlogPost[] = [
  {
    slug: "when-a-business-dispute-becomes-a-legal-matter",
    title: "사업상 분쟁이 법률 문제로 바뀌는 시점",
    excerpt:
      "일상적인 협상으로 해결하던 의견 차이가 언제 법률 전략이 필요한 상사 분쟁으로 넘어가는지 살펴봅니다.",
    category: "상사 소송",
    date: "2026년 9월 3일",
    readingTime: "약 5분",
    image: heroLawOffice,
    alt: "법률 서적과 책상이 있는 프라이빗 로펌 사무실",
    intro:
      "모든 의견 충돌에 처음부터 변호사가 필요한 것은 아닙니다. 하지만 너무 오래 기다리면 선택지가 줄고 협상력이 약해지며, 충분히 관리할 수 있었던 문제가 큰 비용으로 이어질 수 있습니다. 중요한 것은 분쟁이 얼마나 심각하게 느껴지는지가 아니라, 사업의 법적·상업적 위치가 실제로 변하고 있는지입니다.",
    takeaway:
      "계약상 자신의 위치를 일찍 이해할수록, 보통 더 많은 선택지를 지킬 수 있습니다.",
    sections: [
      {
        heading: "감정의 온도보다 사업의 위치를 보세요",
        paragraphs: [
          "상사 분쟁은 겉으로 크게 드러나기 전에 이미 법률 문제가 되는 경우가 많습니다. 반복되는 지급 지연, 설명의 변화, 계약 문구에 대한 이견, 계약 종료 위협, 또는 기존 약속을 문서로 남기기를 갑자기 거부하는 행동은 관계의 성격이 달라졌다는 신호가 될 수 있습니다.",
          "이 단계에서는 대화를 계속하는 것만큼 기록을 보존하고 계약상 권리와 의무를 정확히 확인하는 일이 중요합니다.",
        ],
      },
      {
        heading: "초기 자문은 선택지를 남겨둡니다",
        paragraphs: [
          "초기에 변호사와 상담한다는 것은 곧바로 소송을 제기한다는 뜻이 아닙니다. 계약 검토, 통지 의무 확인, 증거 보존, 합의 가능성 검토, 그리고 다음 커뮤니케이션에서 무엇을 말해야 하고 무엇을 피해야 하는지 정리하는 것일 수 있습니다.",
          "목표는 대개 분쟁이 확대되더라도 사업을 보호하면서, 문제를 해결할 수 있는 충분한 공간을 확보하는 것입니다.",
        ],
      },
      {
        heading: "법률 검토가 필요한 현실적인 기준",
        paragraphs: [
          "금전, 지분이나 소유권, 핵심 거래 관계, 규제 리스크, 기밀정보 또는 사업 지속 가능성에 실질적인 위험이 생기기 시작했다면 법률 검토를 고려할 시점입니다.",
          "적절한 순간의 짧고 전략적인 검토가, 이미 협상력을 잃은 뒤 진행하는 훨씬 큰 규모의 법률 업무보다 더 가치 있을 수 있습니다.",
        ],
      },
    ],
  },
  {
    slug: "what-founders-should-review-before-signing-a-commercial-agreement",
    title: "창업자가 상업 계약서에 서명하기 전에 확인해야 할 것",
    excerpt:
      "계약이 운영상의 제약, 예상치 못한 비용 또는 향후 분쟁으로 이어지기 전에 반드시 천천히 확인해야 할 핵심 조항들입니다.",
    category: "기업 자문",
    date: "2026년 8월 21일",
    readingTime: "약 6분",
    image: heroCityBoardroom,
    alt: "도시가 내려다보이는 어두운 로펌 회의실",
    intro:
      "상업 계약은 가격과 서명만으로 끝나지 않습니다. 실제로 가장 중요한 조항은 사람들이 평소에는 사용할 일이 없다고 생각하는 부분에 숨어 있는 경우가 많습니다. 계약 종료, 책임 제한, 소유권, 자동 갱신, 분쟁 해결 절차가 대표적입니다.",
    takeaway:
      "계약은 단순히 서명할 문서가 아니라, 두 당사자의 관계를 운영하는 시스템으로 읽어야 합니다.",
    sections: [
      {
        heading: "어떻게 계약에서 나올 수 있는지 먼저 이해하세요",
        paragraphs: [
          "계약 기간, 자동 갱신, 해지 권리, 통지 기간, 종료 후 의무는 표면적인 거래 조건보다 더 중요해질 수 있습니다. 좋은 계약은 관계가 시작되기 전에 종료 경로를 이해할 수 있어야 합니다.",
        ],
      },
      {
        heading: "실제 위험이 누구에게 배분되는지 확인하세요",
        paragraphs: [
          "면책, 책임 제한, 보증, 보험 의무, 제3자 청구에 대한 책임은 문제가 생긴 뒤 누가 비용과 위험을 부담하는지를 결정합니다.",
          "핵심은 이러한 위험 배분이 거래의 경제적 가치와, 실제로 그 위험을 통제할 수 있는 당사자에게 맞게 설계되어 있는지입니다.",
        ],
      },
      {
        heading: "회사가 만들어내는 자산을 보호하세요",
        paragraphs: [
          "지식재산권, 기밀정보, 고객 데이터, 작업 결과물, 사용권은 명확해야 합니다. 관계가 원만할 때는 소유권의 모호함이 크게 보이지 않지만, 문제가 생긴 뒤에는 정리하기 매우 어렵습니다.",
        ],
      },
      {
        heading: "계약을 실제 운영 관점에서 읽으세요",
        paragraphs: [
          "서명 전에 회사 내부에서 누가 실제로 계약 의무를 수행해야 하는지 확인해야 합니다. 보고 의무, 서비스 수준, 승인 절차, 보안 기준, 각종 기한은 서명하는 순간부터 운영상의 의무가 됩니다.",
          "좋은 계약은 문서에 적힌 약속을 사업이 현실적으로 이행할 수 있을 때 더 강해집니다.",
        ],
      },
    ],
  },
];

export const getKoBlogBySlug = (slug: string) => koBlogPosts.find((post) => post.slug === slug);
