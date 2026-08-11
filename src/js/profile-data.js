import { contactLinks } from "./profile-data/contact-links.js";
import { experience } from "./profile-data/experience.js";
import { profileImages } from "./profile-data/images.js";
import { profileContent } from "./profile-data/profile.js";
import { skills } from "./profile-data/skills.js";

export const profile = {
  ...profileContent.basics,
  seo: profileContent.seo,
  location: profileContent.location,
  facts: profileContent.facts,
  snapshot: profileContent.snapshot,
  strengthGroups: profileContent.strengthGroups,
  skills,
  experience,
  careerDirection: profileContent.careerDirection,
  personalNote: profileContent.personalNote,
  images: profileImages,
  contactLinks,
  footerName: profileContent.footer.name
};
