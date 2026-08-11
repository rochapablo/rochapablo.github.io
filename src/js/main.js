import { updateMetadata } from "./metadata.js";
import { profile } from "./profile-data.js";
import { renderExperience } from "./render-experience.js";
import { renderSkillsByExperience } from "./render-skills.js";
import {
  renderCareerDirection,
  renderContacts,
  renderFooter,
  renderHero,
  renderPersonalNote,
  renderSnapshot,
  renderStrengths
} from "./render.js";

renderHero(profile);
renderSnapshot(profile.snapshot);
renderStrengths(profile.strengthGroups);
renderSkillsByExperience(profile.skills);
renderExperience(profile.experience);
renderCareerDirection(profile.careerDirection);
renderPersonalNote(profile.personalNote);
renderContacts(profile.contactLinks);
renderFooter(profile);
updateMetadata(profile);
