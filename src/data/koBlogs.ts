import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";

export type KoreanBlogSection = { heading: string; paragraphs: string[] };
export type KoreanBlogPost = {
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
  sections: KoreanBlogSection[];
};

export const koBlogPosts: KoreanBlogPost[] = [
  {
    slug: "what-to-do-after-a-car-accident-in-california",
    title: "캘리포니아 자동차 사고 후 해야 할 일",
    excerpt: "사고 후 건강을 우선하고, 중요한 정보를 보존하며, 보험·치료 기록을 체계적으로 정리하기 위한 실용적인 체크리스트입니다.",
    category: "자동차 사고",
    date: "2026년 9월 3일",
    publishedAt: "2026-09-03",
    readingTime: "약 6분",
    image: heroLawOffice,
    alt: "법률 서적과 책상이 있는 로펌 사무실",
    intro: "교통사고 직후 몇 시간은 예상보다 훨씬 혼란스러울 수 있습니다. 치료, 차량 손상, 보험 연락, 업무와 가족 문제까지 동시에 시작됩니다. 우선순위를 단순하게 잡는 것이 좋습니다. 안전과 건강을 먼저 챙기고, 확인 가능한 사실을 보존하며, 중요한 정보가 사라지기 전에 기록을 정리하세요.",
    takeaway: "사고 당일 모든 문제를 해결할 필요는 없습니다. 건강을 우선하고, 사실을 보존하며, 기록에 불필요한 공백이 생기지 않도록 정리하는 것이 중요합니다.",
    sections: [
      {
        heading: "안전과 치료를 먼저 생각하세요",
        paragraphs: ["부상 가능성이 있다면 청구보다 적절한 치료가 먼저입니다. 사고 직후 바로 나타나는 증상도 있고 충격이 가라앉은 뒤 더 분명해지는 증상도 있습니다.", "의료진에게 실제로 느끼는 증상을 정확히 설명하고 받은 치료 계획을 따르세요. 부상의 심각성을 스스로 미리 단정할 필요는 없습니다."],
      },
      {
        heading: "현장이 남아 있을 때 기록하세요",
        paragraphs: ["안전하게 할 수 있다면 차량, 도로, 눈에 보이는 손상, 신호와 주변 환경을 사진으로 남기는 것이 좋습니다. 며칠 뒤에는 현장의 모습이 달라질 수 있습니다.", "운전자와 목격자의 연락처, 보험 정보, 사고 보고서, 견인 정보 및 확인 가능한 영상도 나중에 중요한 기록이 될 수 있습니다."],
      },
      {
        heading: "보험 연락은 체계적으로 관리하세요",
        paragraphs: ["보험사에서 빠르게 정보를 요청할 수 있습니다. 누가 연락했는지, 어느 회사를 대표하는지, 무엇을 요청했고 어떤 자료를 보냈는지 간단히 기록해 두세요.", "책임, 보험 적용 범위 또는 부상의 심각성에 다툼이 있다면 중요한 결정을 내리기 전에 법률 자문을 통해 현재 상황을 정확히 이해하는 것이 도움이 될 수 있습니다."],
      },
      {
        heading: "부상이 실제 생활에 미친 영향을 기록하세요",
        paragraphs: ["치료비만으로는 부상의 전체 영향을 보여주기 어렵습니다. 결근, 이동 제한, 집에서 필요한 도움, 중단된 활동, 추가 진료 및 지속되는 불편도 회복 과정을 설명하는 데 도움이 됩니다.", "잘 정리된 기록은 사건이 빠르게 해결되든 나중에 복잡해지든 유용합니다."],
      },
    ],
  },
  {
    slug: "what-an-injury-claim-should-document-beyond-medical-bills",
    title: "상해 청구에서 치료비 외에 기록해야 할 것",
    excerpt: "치료비만으로 보이지 않는 업무, 이동, 일상생활의 제한과 회복 과정을 왜 함께 기록해야 하는지 설명합니다.",
    category: "개인 상해",
    date: "2026년 8월 21일",
    publishedAt: "2026-08-21",
    readingTime: "약 5분",
    image: heroCityBoardroom,
    alt: "도시가 내려다보이는 로펌 회의실",
    intro: "치료비 영수증은 치료가 있었다는 사실은 보여주지만 부상이 삶 전체에 어떤 영향을 미쳤는지는 설명하지 못합니다. 업무, 이동, 일상적인 책임, 치료 경과와 회복 과정까지 함께 기록하면 부상의 실제 모습을 훨씬 분명하게 이해할 수 있습니다.",
    takeaway: "좋은 기록은 양이 많다는 뜻이 아닙니다. 사고 때문에 무엇이 달라졌는지를 일관되고 정확하게 보여주는 것이 중요합니다.",
    sections: [
      {
        heading: "치료 과정을 시간순으로 정리하세요",
        paragraphs: ["진료 기록, 예약 정보, 검사 결과, 처방, 의뢰와 치료 지침을 한곳에 모아 두세요. 목적은 서류를 많이 만드는 것이 아니라 부상과 회복의 흐름을 이해하기 쉽게 만드는 것입니다.", "치료가 중단되거나 방식이 바뀐 데에는 합리적인 이유가 있을 수 있습니다. 그 이유를 기억이 생생할 때 남겨두면 나중에 도움이 됩니다."],
      },
      {
        heading: "업무와 경제적 영향을 기록하세요",
        paragraphs: ["결근, 업무 조정, 놓친 기회, 교통비와 기타 사고 관련 비용은 몇 달이 지나면 정확히 복원하기 어려울 수 있습니다.", "급여 자료, 회사와의 연락, 일정, 영수증과 간단한 기록은 사고로 인한 경제적 영향을 정리하는 데 도움이 됩니다."],
      },
      {
        heading: "일상생활의 제한도 중요할 수 있습니다",
        paragraphs: ["부상은 수면, 운전, 물건 들기, 운동, 육아, 집안일 또는 사회생활에 영향을 줄 수 있지만 이런 변화가 공식 서류에 바로 나타나지는 않습니다.", "과장된 표현보다 구체적인 예가 더 유용합니다. 사고 전과 회복 기간의 삶이 어떻게 달라졌는지를 정확히 설명하는 것이 목적입니다."],
      },
      {
        heading: "일관되고 신뢰할 수 있는 기록을 유지하세요",
        paragraphs: ["강한 기록이란 매 순간을 기록한다는 뜻이 아닙니다. 독립적으로 확인할 수 있는 자료를 보관하고 중요한 정보가 사라지기 전에 정리하는 것입니다.", "부상이 심각하거나 청구에 다툼이 생긴 경우 변호사는 어떤 자료가 실제로 중요한지, 어떤 문제를 더 자세히 검토해야 하는지 정리하는 데 도움을 줄 수 있습니다."],
      },
    ],
  },
];

export const getKoBlogBySlug = (slug: string) => koBlogPosts.find((post) => post.slug === slug);
