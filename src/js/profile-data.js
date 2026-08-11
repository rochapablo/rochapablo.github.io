import { contactLinks } from "./profile-data/contact-links.js";
import { experience } from "./profile-data/experience.js";
import { profileContent } from "./profile-data/profile.js";
import { skills } from "./profile-data/skills.js";

export const profile = {
  ...profileContent.basics,
  facts: profileContent.facts,
  snapshot: profileContent.snapshot,
  strengthGroups: profileContent.strengthGroups,
  skills,
  experience,
  careerDirection: profileContent.careerDirection,
  contactLinks,
  footerName: profileContent.footer.name
};
