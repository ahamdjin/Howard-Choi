import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
  alt: string;
  intro: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "when-a-business-dispute-becomes-a-legal-matter",
    title: "When a business dispute becomes a legal matter",
    excerpt:
      "A practical way to recognize when a commercial disagreement has moved beyond routine negotiation and needs legal strategy.",
    category: "Commercial Litigation",
    date: "September 3, 2026",
    readingTime: "5 min read",
    image: heroLawOffice,
    alt: "Private law office with a desk and legal books",
    intro:
      "Not every disagreement needs a lawyer on day one. But waiting too long can narrow options, weaken leverage, or allow a manageable issue to become expensive. The useful question is not whether a disagreement feels serious — it is whether the business position is beginning to change.",
    sections: [
      {
        heading: "Watch the position, not the temperature",
        paragraphs: [
          "Commercial disputes often become legal matters before they become dramatic. Missed payment dates, changing explanations, disputed contract language, threatened termination, or a sudden refusal to document commitments can all signal that the relationship has shifted.",
          "At that point, preserving records and understanding contractual rights can matter as much as continuing the commercial conversation.",
        ],
      },
      {
        heading: "Early advice can preserve options",
        paragraphs: [
          "Speaking with counsel early does not mean filing a lawsuit. It can mean reviewing the contract, identifying notice requirements, preserving evidence, testing settlement options, or deciding what should — and should not — be said next.",
          "The goal is usually to create room to resolve the issue while protecting the business if the dispute escalates.",
        ],
      },
      {
        heading: "A useful threshold",
        paragraphs: [
          "Consider getting legal input when money, ownership, key relationships, regulatory exposure, confidential information, or the ability to continue operating is materially at risk.",
          "A short strategic review at the right moment can be more valuable than extensive legal work after leverage has already been lost.",
        ],
      },
    ],
  },
  {
    slug: "what-founders-should-review-before-signing-a-commercial-agreement",
    title: "What founders should review before signing a commercial agreement",
    excerpt:
      "Five areas worth slowing down for before a contract becomes an operating constraint, a cost center, or a future dispute.",
    category: "Corporate Law",
    date: "August 21, 2026",
    readingTime: "6 min read",
    image: heroCityBoardroom,
    alt: "Dark law firm boardroom overlooking the city",
    intro:
      "A commercial agreement is rarely just a price and a signature. The provisions that matter most often appear in the parts nobody expects to use: termination, liability, ownership, renewal, and dispute mechanics.",
    sections: [
      {
        heading: "Understand how you get out",
        paragraphs: [
          "Term, renewal, termination rights, notice periods, and post-termination obligations can matter more than the headline economics. A good agreement should make the exit path understandable before the relationship begins.",
        ],
      },
      {
        heading: "Know where the risk actually sits",
        paragraphs: [
          "Indemnities, limitations of liability, warranties, insurance requirements, and responsibility for third-party claims determine how a problem is allocated after something goes wrong.",
          "The important question is whether the risk allocation matches the commercial value of the deal and the party actually able to control that risk.",
        ],
      },
      {
        heading: "Protect what the business creates",
        paragraphs: [
          "Intellectual property, confidential information, customer data, work product, and usage rights should be clear. Ambiguity around ownership is easy to ignore when the relationship is healthy and difficult to fix later.",
        ],
      },
      {
        heading: "Read the agreement operationally",
        paragraphs: [
          "Before signing, ask who inside the company must actually comply with the contract. Reporting duties, service levels, approval requirements, security standards, and deadlines become operating obligations once the agreement is signed.",
          "A contract is stronger when the business can realistically perform what the document promises.",
        ],
      },
    ],
  },
];

export const getBlogBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);
