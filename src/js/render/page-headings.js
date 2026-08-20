import { setText } from "../core/dom.js";

const pageHeadingBindings = [
  { key: "hero.greeting", selector: '[data-page-heading="hero-greeting"]' },
  { key: "hero.introName", selector: '[data-page-heading="hero-name"]' },
  { key: "hero.introTitle", selector: '[data-page-heading="hero-title"]' },
  { key: "about.kicker", selector: '[data-page-heading="about-kicker"]' },
  { key: "about.title", selector: '[data-page-heading="about-title"]' },
  { key: "strengths.kicker", selector: '[data-page-heading="strengths-kicker"]' },
  { key: "strengths.title", selector: '[data-page-heading="strengths-title"]' },
  { key: "skills.kicker", selector: '[data-page-heading="skills-kicker"]' },
  { key: "skills.title", selector: '[data-page-heading="skills-title"]' },
  { key: "skills.support", selector: '[data-page-heading="skills-support"]' },
  { key: "experience.kicker", selector: '[data-page-heading="experience-kicker"]' },
  { key: "experience.title", selector: '[data-page-heading="experience-title"]' },
  { key: "personalNote.kicker", selector: '[data-page-heading="personal-note-kicker"]' },
  { key: "personalNote.title", selector: '[data-page-heading="personal-note-title"]' },
  { key: "careerDirection.kicker", selector: '[data-page-heading="career-direction-kicker"]' },
  { key: "careerDirection.title", selector: '[data-page-heading="career-direction-title"]' },
  { key: "contact.kicker", selector: '[data-page-heading="contact-kicker"]' },
  { key: "contact.title", selector: '[data-page-heading="contact-title"]' }
];

function getPageHeadingValue(pageHeadings, key) {
  return key.split(".").reduce((value, segment) => value?.[segment], pageHeadings) ?? "";
}

export function renderPageHeadings(pageHeadings) {
  pageHeadingBindings.forEach(({ key, selector }) => {
    setText(selector, getPageHeadingValue(pageHeadings, key));
  });
}
