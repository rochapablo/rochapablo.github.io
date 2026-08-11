import { updateMetadata } from "./metadata.js";
import { profile } from "./profile-data.js";
import { renderExperience } from "./render-experience.js";
import { renderContacts } from "./render-links.js";
import { renderSkillsByExperience } from "./render-skills.js";
import {
  initSiteChrome,
  renderCareerDirection,
  renderFooter,
  renderHero,
  renderProfileImages,
  renderPersonalNote,
  renderSnapshot,
  renderStrengths
} from "./render.js";

initSiteChrome(profile);
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
