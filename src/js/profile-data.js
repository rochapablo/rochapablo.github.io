import { contactLinks } from "./profile-data/contact-links.js";
import { experience } from "./profile-data/experience.js";
import { profileImages } from "./profile-data/images.js";
import { pageHeadings } from "./profile-data/page-headings.js";
import { profileContent } from "./profile-data/profile.js";
import { skills } from "./profile-data/skills.js";

export const profile = {
  name: profileContent.footer.name,
  title: pageHeadings.hero.title,
  tagline: pageHeadings.hero.tagline,
  summary: profileContent.basics.summary,
  seo: profileContent.seo,
  siteChrome: profileContent.siteChrome,
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
