import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";

export type BlogSection = { heading: string; paragraphs: string[] };
export type BlogPost = {
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
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-to-do-after-a-car-accident-in-california",
    title: "What to do after a car accident in California",
    excerpt: "A practical checklist for protecting your health, preserving useful information, and staying organized after a California collision.",
    category: "Car Accidents",
    date: "September 3, 2026",
    publishedAt: "2026-09-03",
    readingTime: "6 min read",
    image: heroLawOffice,
    alt: "Private law office with a desk and legal books",
    intro: "The hours after a collision can feel surprisingly disorganized. Medical concerns, vehicle damage, insurance calls, work, and family responsibilities can all arrive at once. A simple sequence helps: deal with safety and health first, preserve what can be documented, and keep the claim organized before important details disappear.",
    takeaway: "You do not need to solve the entire claim on day one. Protect your health, preserve the facts, and avoid creating unnecessary gaps in the record.",
    sections: [
      {
        heading: "Start with safety and medical attention",
        paragraphs: [
          "If anyone may be injured, getting appropriate medical attention comes before building a claim. Some symptoms are obvious immediately; others become clearer after the initial shock of the collision has passed.",
          "Keep the medical story accurate. Describe what you are actually experiencing and follow the treatment plan you receive rather than trying to predict how serious an injury may become.",
        ],
      },
      {
        heading: "Preserve the scene while it still exists",
        paragraphs: [
          "When it can be done safely, photographs of the vehicles, roadway, visible damage, traffic controls, and surrounding area can preserve details that may look very different a few days later.",
          "Names and contact information for drivers and witnesses, insurance details, reports, towing information, and available camera footage can also become important parts of the record.",
        ],
      },
      {
        heading: "Be organized with insurance communications",
        paragraphs: [
          "Insurance companies may ask for information quickly. Keep a simple log of who contacted you, which company they represent, what was requested, and what documents you sent.",
          "If responsibility, coverage, or the seriousness of the injuries is disputed, getting legal advice before making important decisions can help you understand the position more clearly.",
        ],
      },
      {
        heading: "Document how the injury actually affects life",
        paragraphs: [
          "Medical bills are only one part of the picture. Missed work, changes in mobility, help needed at home, interrupted activities, follow-up appointments, and ongoing limitations can all help explain the real effect of an injury.",
          "A well-organized record is useful whether a claim resolves quickly or becomes more complicated later.",
        ],
      },
    ],
  },
  {
    slug: "what-an-injury-claim-should-document-beyond-medical-bills",
    title: "What an injury claim should document beyond medical bills",
    excerpt: "Why the strongest record of an injury often includes work, mobility, daily limitations, treatment progress, and the changes a bill cannot show.",
    category: "Personal Injury",
    date: "August 21, 2026",
    publishedAt: "2026-08-21",
    readingTime: "5 min read",
    image: heroCityBoardroom,
    alt: "Law firm conference room overlooking the city",
    intro: "A medical bill can show that treatment happened, but it does not explain the full effect of an injury. A serious claim is easier to understand when the records also show how the injury changed work, movement, routines, responsibilities, and the course of recovery over time.",
    takeaway: "The value of good documentation is not volume. It is creating a clear, consistent picture of what changed because of the injury.",
    sections: [
      {
        heading: "Build a clear medical timeline",
        paragraphs: [
          "Keep treatment records, appointment information, diagnostic reports, prescriptions, referrals, and instructions in one place. The goal is not to create paperwork for its own sake; it is to make the progression of the injury understandable.",
          "Gaps or changes in treatment may have perfectly reasonable explanations. Recording those explanations while they are fresh can be useful later.",
        ],
      },
      {
        heading: "Track work and financial disruption",
        paragraphs: [
          "Time away from work, modified duties, missed opportunities, transportation costs, and other accident-related expenses can be difficult to reconstruct months later.",
          "Pay records, employer communications, calendars, receipts, and a simple contemporaneous log can help connect the financial impact to the accident.",
        ],
      },
      {
        heading: "Daily limitations can matter",
        paragraphs: [
          "An injury may affect sleep, driving, lifting, exercise, childcare, household tasks, or social activity long before those changes appear in a formal document.",
          "Specific examples are more useful than exaggerated language. The aim is to describe the difference between life before the accident and life during recovery as accurately as possible.",
        ],
      },
      {
        heading: "Keep the record consistent and credible",
        paragraphs: [
          "Strong documentation does not mean documenting every hour. It means keeping reliable records from independent sources and preserving important information before it is lost.",
          "If the injury is serious or the claim becomes disputed, a lawyer can help identify which records are actually important and which issues need closer attention.",
        ],
      },
    ],
  },
];

export const getBlogBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);
