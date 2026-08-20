import { contactLinks } from "./contact-links.js";
import { experience } from "./experience.js";
import { profileImages } from "./images.js";
import { pageHeadings } from "./page-headings.js";
import { profileContent } from "./profile.js";
import { skills } from "./skills.js";

export const profile = {
  name: profileContent.footer.name,
  title: pageHeadings.hero.title,
  tagline: pageHeadings.hero.tagline,
  summary: profileContent.basics.summary,
  seo: profileContent.seo,
  siteChrome: profileContent.siteChrome,
  visitorIntent: profileContent.siteChrome.visitorIntent,
  location: profileContent.location,
  facts: profileContent.facts,
  snapshot: profileContent.snapshot,
  strengthGroups: profileContent.strengthGroups,
  skills,
  experience,
  careerDirection: profileContent.careerDirection,
  personalNote: {
    title: pageHeadings.personalNote.title,
    text: profileContent.personalNote.text
  },
  pageHeadings,
  images: profileImages,
  contactLinks,
  footerName: profileContent.footer.name
};
