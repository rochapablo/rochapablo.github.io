import { profile } from "./profile-data.js";
import { renderExperience } from "./render-experience.js";
import {
  renderCareerDirection,
  renderContacts,
  renderFooter,
  renderHero,
  renderSnapshot,
  renderStrengths,
  updateMetadata
} from "./render.js";

renderHero(profile);
renderSnapshot(profile.snapshot);
renderStrengths(profile.strengthGroups);
renderExperience(profile.experience);
renderCareerDirection(profile.careerDirection);
renderContacts(profile.contactLinks);
renderFooter(profile);
updateMetadata(profile);
