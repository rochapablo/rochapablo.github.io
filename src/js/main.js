import { profile } from "./profile-data/index.js";
import { renderExperience } from "./render/experience.js";
import { renderProfileImages } from "./render/images.js";
import { renderContacts } from "./render/links.js";
import { renderPageHeadings } from "./render/page-headings.js";
import {
  initSiteChrome,
  renderCareerDirection,
  renderFooter,
  renderHero,
  renderPersonalNote,
  renderSnapshot,
  renderStrengths
} from "./render/site.js";
import { updateMetadata } from "./seo/metadata.js";
import { renderSkillsByExperience } from "./skills/index.js";
import { initVisitorIntent } from "./visitor-intent/index.js";

initSiteChrome(profile);
renderPageHeadings(profile.pageHeadings);
renderHero(profile);
renderSnapshot(profile.snapshot, profile.facts);
renderStrengths(profile.strengthGroups);
renderProfileImages(profile.images);
renderSkillsByExperience(profile.skills);
renderExperience(profile.experience);
renderCareerDirection(profile.careerDirection);
renderPersonalNote(profile.personalNote);
renderContacts(profile.contactLinks);
renderFooter(profile);
updateMetadata(profile);
initVisitorIntent(profile.visitorIntent);
