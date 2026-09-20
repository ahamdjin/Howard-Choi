export const trustProfile = {
  attorney: {
    name: "Howard Choi",
    fullName: "Howard Jong-yol Choi",
    barNumber: "284364",
    admitted: "October 2, 2012",
    lawSchool: "William Howard Taft University",
    languages: ["English", "Korean"],
    stateBarUrl: "https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364",
  },

  firmResults: {
    totalRecovered: "$100M+",
    largestRecovery: "$1M",
  },

  office: {
    address: "6301 Beach Blvd, Suite 216, Buena Park, CA 90621",
    phone: "714-690-0007",
  },

  // Turn this on only after Howard has actually reviewed/approved the legal content.
  // Once enabled, article/practice/location templates can use the reviewer + date.
  editorialReview: {
    enabled: false,
    reviewer: "Howard Choi",
    reviewerBarNumber: "284364",
    lastReviewed: "",
  },

  // Add only real awards / memberships after Howard confirms them.
  // Example:
  // { name: "Super Lawyers", year: "2026", logo: "/path/to/logo.png", url: "https://..." }
  recognitions: [] as Array<{
    name: string;
    year?: string;
    logo?: string;
    url?: string;
  }>,

  // Keep case-study storytelling unpublished until the real facts are supplied.
  caseStudies: [] as Array<{
    title: string;
    result: string;
    caseType: string;
    summary: string;
    keyFacts?: string[];
  }>,
} as const;
