import { profile } from "./profile-data.js";
import {
  renderCareerDirection,
  renderContacts,
  renderExperience,
  renderFooter,
  renderHero,
  renderStrengths,
  updateMetadata
} from "./render.js";

renderHero(profile);
renderStrengths(profile.strengths);
renderExperience(profile.experience);
renderCareerDirection(profile.careerDirection);
renderContacts(profile.contactLinks);
renderFooter(profile);
updateMetadata(profile);
