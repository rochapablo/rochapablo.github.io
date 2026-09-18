import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { profile } from "../js/profile-data/index.js";
import { buildMetadata, buildStructuredData } from "../js/seo/index.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const indexPath = path.join(rootDir, "index.html");

const replacements = [
  ['data-page-heading="hero-greeting"', profile.pageHeadings.hero.greeting],
  ['data-page-heading="hero-name"', profile.pageHeadings.hero.introName],
  ['data-page-heading="hero-title"', profile.pageHeadings.hero.introTitle],
  ["data-profile-name", profile.name],
  ["data-brand-mark", profile.siteChrome.brandMark],
  ["data-nav-toggle-label", profile.siteChrome.menuLabel],
  ["data-profile-tagline", profile.tagline],
  ["data-profile-summary", profile.summary],
  ['data-page-heading="about-kicker"', profile.pageHeadings.about.kicker],
  ['data-page-heading="about-title"', profile.pageHeadings.about.title],
  ["data-profile-snapshot", profile.snapshot],
  ['data-page-heading="strengths-kicker"', profile.pageHeadings.strengths.kicker],
  ['data-page-heading="strengths-title"', profile.pageHeadings.strengths.title],
  ['data-page-heading="skills-kicker"', profile.pageHeadings.skills.kicker],
  ['data-page-heading="skills-title"', profile.pageHeadings.skills.title],
  ['data-page-heading="skills-support"', profile.pageHeadings.skills.support],
  ['data-page-heading="experience-kicker"', profile.pageHeadings.experience.kicker],
  ['data-page-heading="experience-title"', profile.pageHeadings.experience.title],
  ['data-page-heading="personal-note-kicker"', profile.pageHeadings.personalNote.kicker],
  ['data-page-heading="personal-note-title"', profile.pageHeadings.personalNote.title],
  ["data-personal-note-text", profile.personalNote.text],
  ['data-page-heading="career-direction-kicker"', profile.pageHeadings.careerDirection.kicker],
  ['data-page-heading="career-direction-title"', profile.pageHeadings.careerDirection.title],
  ["data-career-direction", profile.careerDirection],
  ['data-page-heading="contact-kicker"', profile.pageHeadings.contact.kicker],
  ['data-page-heading="contact-title"', profile.pageHeadings.contact.title],
  ["data-footer-name", profile.footerName]
];

const metadata = buildMetadata(profile);
let html = fs.readFileSync(indexPath, "utf8");

replacements.forEach(([attribute, text]) => {
  html = replaceElementText(html, attribute, text);
});

html = replaceTagText(html, "title", metadata.title);
html = replaceMetaContent(html, 'name="description"', metadata.description);
html = replaceMetaContent(html, 'property="og:title"', metadata.ogTitle);
html = replaceMetaContent(html, 'property="og:description"', metadata.ogDescription);
html = replaceMetaContent(html, 'property="og:type"', metadata.ogType);
html = replaceMetaContent(html, 'property="og:url"', metadata.ogUrl);
html = replaceLinkHref(html, 'rel="canonical"', metadata.canonicalUrl);
html = replaceElementRawText(
  html,
  'id="profile-structured-data"',
  escapeScriptText(JSON.stringify(buildStructuredData(profile), null, 2))
);
html = replaceElementContents(html, "data-nav-links", renderNavigation(profile.siteChrome.navLinks));
html = replaceElementContents(html, "data-profile-facts", renderFacts(profile.facts));
html = replaceElementContents(html, "strengths-list", renderStrengths(profile.strengthGroups));
html = replaceElementContents(html, "data-skills-panel", renderSkills(profile.skills));
html = replaceElementContents(html, "experience-list", renderExperience(profile.experience));
html = replaceElementContents(html, "contact-links", renderContactLinks(profile.contactLinks));
html = replaceElementContents(
  html,
  "data-primary-actions",
  renderContactLinks(profile.contactLinks.filter((link) => link.label === "Email" || link.label === "Resume PDF"), true)
);
Object.entries(profile.images).forEach(([slot, image]) => {
  html = replaceElementContents(html, `data-image-slot="${slot}"`, renderImage(slot, image));
});
html = replaceElementContents(
  html,
  "data-nav-resume",
  escapeHtml(profile.siteChrome.resumeLabel)
);
const resumeLink = profile.contactLinks.find((link) => link.label === "Resume PDF");
html = setAttributeByMarker(html, "data-nav-resume", "href", resumeLink.href);
html = setAttributeByMarker(html, "data-nav-resume", "target", resumeLink.target);
html = setAttributeByMarker(html, "data-nav-resume", "rel", resumeLink.rel);
if (resumeLink.download) html = setAttributeByMarker(html, "data-nav-resume", "download", "");
html = setAttributeByMarker(html, "data-site-nav", "aria-label", profile.siteChrome.navigationLabel);
html = setAttributeByMarker(html, "data-brand-link", "aria-label", profile.siteChrome.brandLinkLabel);
html = setAttributeByMarker(html, "data-nav-toggle", "aria-label", profile.siteChrome.menuLabel);
html = setAttributeByMarker(html, "data-primary-actions", "aria-label", profile.siteChrome.primaryActionsLabel);
html = setAttributeByMarker(html, "data-profile-facts", "aria-label", profile.siteChrome.profileFactsLabel);
html = setAttributeByMarker(html, "strengths-list", "aria-label", profile.siteChrome.strengthsLabel);
html = setAttributeByMarker(html, "data-skills-tabs", "aria-label", profile.siteChrome.skillCategoriesLabel);

fs.writeFileSync(indexPath, html);

function renderNavigation(links) {
  return links.map((link) => `<a href="${escapeAttribute(link.href)}">${escapeHtml(link.label)}</a>`).join("");
}

function renderFacts(facts) {
  return facts.map((fact) => `<div class="fact-item"><span class="fact-item__label">${escapeHtml(fact.label)}</span><strong class="fact-item__value">${escapeHtml(fact.value)}</strong></div>`).join("");
}

function renderStrengths(groups) {
  return groups.map((group) => `<article class="strength-group"><h3 class="strength-group__title">${escapeHtml(group.title)}</h3><ul class="strength-group__list">${group.items.map((item) => `<li class="strength-group__item">${escapeHtml(item)}</li>`).join("")}</ul></article>`).join("");
}

function renderSkills(skillList) {
  const categories = new Map();
  skillList.forEach((skill) => {
    const category = skill.category || "Skills";
    const items = categories.get(category) || [];
    if (items.length < 6) items.push(skill);
    categories.set(category, items);
  });

  const items = categories.values().next().value || [];
  const maxYears = Math.max(...items.map((skill) => Number(skill.years.match(/\d+/)?.[0] || 0)), 1);
  return `<div class="skills-list__items">${items.map((skill) => {
    const years = Number(skill.years.match(/\d+/)?.[0] || 0);
    return `<article class="skill-row"><div class="skill-row__header"><h3 class="skill-row__name">${escapeHtml(skill.name)}</h3><span class="skill-row__years">${escapeHtml(skill.years)}</span></div><div class="skill-row__bar" aria-hidden="true"><span class="skill-row__fill" style="width: ${years / maxYears * 100}%;"></span></div></article>`;
  }).join("")}</div>`;
}

function renderExperience(entries) {
  return entries.map((entry) => `<article class="timeline-entry"><p class="timeline-entry__period">${escapeHtml(entry.period)}</p><div class="timeline-entry__marker" aria-hidden="true"></div><div class="timeline-entry__body"><h3 class="timeline-entry__role">${escapeHtml(entry.role)}</h3>${entry.referenceUrl ? `<a class="timeline-entry__reference" href="${escapeAttribute(entry.referenceUrl)}" target="_blank" rel="noopener noreferrer">Professional reference ↗</a>` : ""}${entry.company ? `<p class="timeline-entry__company">${escapeHtml(entry.company)}</p>` : ""}${entry.focus ? `<p class="timeline-entry__focus">${escapeHtml(entry.focus)}</p>` : ""}</div><p class="timeline-entry__location">${escapeHtml(entry.location)}</p></article>`).join("");
}

function renderContactLinks(links, primary = false) {
  return links.map((link, index) => renderContactLink(link, primary ? index === 0 ? "button button-primary" : "button" : index === 0 ? "contact-links__item contact-links__item--primary" : "contact-links__item")).join("");
}

function renderImage(slot, image) {
  const className = slot.startsWith("visualBreak") ? "visual-break__image" : "media-slot__image";
  const alt = image.decorative ? "" : image.alt || "";
  const loading = slot === "heroPortrait" ? "eager" : "lazy";
  const priority = slot === "heroPortrait" ? " fetchpriority=\"high\"" : "";
  const hidden = image.decorative ? " aria-hidden=\"true\"" : "";
  const mobilePosition = image.mobileObjectPosition || image.objectPosition || "center center";
  return `<img class="${className}" src="${escapeAttribute(image.src)}" alt="${escapeAttribute(alt)}" width="${image.width}" height="${image.height}" loading="${loading}" decoding="async"${priority}${hidden} style="--image-position: ${escapeAttribute(image.objectPosition || "center center")}; --image-position-mobile: ${escapeAttribute(mobilePosition)};">`;
}

function renderContactLink(link, className, label = link?.label) {
  if (!link) return "";
  const target = link.target ? ` target="${escapeAttribute(link.target)}"` : "";
  const rel = link.rel ? ` rel="${escapeAttribute(link.rel)}"` : "";
  const download = link.download ? " download" : "";
  return `<a class="${escapeAttribute(className)}" href="${escapeAttribute(link.href)}"${target}${rel}${download}>${escapeHtml(label)}</a>`;
}

function replaceElementContents(htmlContent, marker, contents) {
  const startPattern = new RegExp(`<([a-z][a-z0-9]*)\\b[^>]*\\b${escapeRegExp(marker)}(?:=["'][^"']*["'])?[^>]*>`, "i");
  const start = htmlContent.match(startPattern);
  if (!start) return htmlContent;

  const tagName = start[1];
  const contentStart = start.index + start[0].length;
  const tokens = new RegExp(`<\\/?${tagName}\\b[^>]*>`, "gi");
  tokens.lastIndex = contentStart;
  let depth = 1;
  let token;

  while ((token = tokens.exec(htmlContent))) {
    if (token[0].startsWith(`</`)) depth -= 1;
    else if (!token[0].endsWith("/>")) depth += 1;
    if (depth === 0) {
      return htmlContent.slice(0, contentStart) + contents + htmlContent.slice(token.index);
    }
  }

  return htmlContent;
}

function setAttributeByMarker(htmlContent, marker, attribute, value) {
  const markerPattern = new RegExp(`<[^>]*\\b${escapeRegExp(marker)}(?:=["'][^"']*["'])?[^>]*>`, "i");
  const match = htmlContent.match(markerPattern);
  if (!match) return htmlContent;

  const attributePattern = new RegExp(`\\s${escapeRegExp(attribute)}=(['"])(.*?)\\1`, "i");
  let updatedTag = match[0];
  if (attributePattern.test(updatedTag)) {
    updatedTag = updatedTag.replace(attributePattern, ` ${attribute}="${escapeAttribute(value)}"`);
  } else {
    updatedTag = updatedTag.replace(/>$/, ` ${attribute}="${escapeAttribute(value)}">`);
  }

  return htmlContent.replace(match[0], updatedTag);
}

function replaceElementText(htmlContent, attribute, text) {
  const pattern = new RegExp(`(<[^>]*${escapeRegExp(attribute)}[^>]*>)([\\s\\S]*?)(<\\/[^>]+>)`, "g");
  return htmlContent.replace(pattern, `$1${escapeHtml(text)}$3`);
}

function replaceElementRawText(htmlContent, attribute, text) {
  const pattern = new RegExp(`(<[^>]*${escapeRegExp(attribute)}[^>]*>)([\\s\\S]*?)(<\\/[^>]+>)`, "g");
  return htmlContent.replace(pattern, `$1${text}$3`);
}

function replaceTagText(htmlContent, tagName, text) {
  const pattern = new RegExp(`(<${tagName}[^>]*>)([\\s\\S]*?)(<\\/${tagName}>)`);
  return htmlContent.replace(pattern, `$1${escapeHtml(text)}$3`);
}

function replaceMetaContent(htmlContent, matcher, content) {
  const pattern = new RegExp(`(<meta[^>]*${escapeRegExp(matcher)}[^>]*content=")([^"]*)(")`);
  return htmlContent.replace(pattern, `$1${escapeAttribute(content)}$3`);
}

function replaceLinkHref(htmlContent, matcher, href) {
  const pattern = new RegExp(`(<link[^>]*${escapeRegExp(matcher)}[^>]*href=")([^"]*)(")`);
  return htmlContent.replace(pattern, `$1${escapeAttribute(href)}$3`);
}

function escapeAttribute(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeScriptText(value) {
  return String(value).replace(/<\/script/gi, "<\\/script");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
