import { practiceMedia } from "./practiceMedia";
import type { CaseStory } from "@/components/editorial/CaseStories";

/** Location-page imagery supports public attribution for licensed local photographs. */
export const locationPracticeMedia: Record<string, CaseStory["image"]> = {
  ...practiceMedia,
  "pedestrian-accidents": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/3rd_Street_Westlake_Los_Angeles.jpg/960px-3rd_Street_Westlake_Los_Angeles.jpg",
    alt: "Street crossing at 3rd Street and South Burlington Avenue in Los Angeles",
    credit: {
      label: "3rd Street, Los Angeles · David James Henry",
      source: "https://commons.wikimedia.org/wiki/File:3rd_Street_Westlake_Los_Angeles.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  },
};
