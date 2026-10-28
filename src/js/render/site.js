import { appendChildren, clearElement, createElement, setAttributes, setText } from "../core/dom.js";
import { initNavigation } from "../core/navigation.js";
import { renderFacts } from "./facts.js";

export function initSiteChrome(profile) {
  setText("[data-profile-name]", profile.name);
  setText("[data-brand-short-name]", formatBrandName(profile.name));
  setText("[data-brand-mark]", profile.siteChrome.brandMark);
  setText("[data-nav-toggle-label]", profile.siteChrome.menuLabel);
  setAttributes("[data-nav-toggle]", { "aria-label": profile.siteChrome.menuLabel });
  setAttributes("[data-brand-link]", { "aria-label": profile.siteChrome.brandLinkLabel });
  setAttributes("[data-site-nav]", { "aria-label": profile.siteChrome.navigationLabel });
  setAttributes("[data-primary-actions]", { "aria-label": profile.siteChrome.primaryActionsLabel });
  setAttributes("[data-profile-facts]", { "aria-label": profile.siteChrome.profileFactsLabel });
  setAttributes("#strengths-list", { "aria-label": profile.siteChrome.strengthsLabel });
  setAttributes("[data-skills-tabs]", { "aria-label": profile.siteChrome.skillCategoriesLabel });
  renderNavigation(profile);
  initNavigation();
}

function formatBrandName(name) {
  const parts = name.split(/\s+/);
  return parts.length > 2 ? `${parts[0]} ${parts[1].charAt(0)}. ${parts.at(-1)}` : name;
}

export function renderHero(profile) {
  setText("[data-profile-tagline]", profile.tagline);
  setText("[data-profile-summary]", profile.summary);
}

export function renderSnapshot(snapshot, facts) {
  setText("[data-profile-snapshot]", snapshot);
  renderFacts(facts);
}

export function renderStrengths(groups) {
  const list = clearElement("#strengths-list");
  if (!list) return;
  const titles = ["Engineering & Leadership", "Full Stack Development", "Reliable Systems"];
  const icons = ["groups", "developer_mode_tv", "query_stats"];
  const descriptions = [
    "Leading technical delivery through clear communication, reviews, and practical engineering habits.",
    "Building web applications, APIs, and interfaces with .NET, TypeScript, Angular, and databases.",
    "Supporting deployments, troubleshooting production issues, and keeping applications reliable."
  ];
  appendChildren(list, groups.map((group, index) => {
    const article = createElement("article", { className: "strength-group" });
    article.dataset.index = String(index + 1).padStart(2, "0");
    const header = createElement("div", { className: "strength-group__header" });
    const title = createElement("h3", { className: "strength-group__title", text: titles[index] || group.title });
    const icon = createElement("span", { className: "strength-group__icon material-symbols-outlined", text: icons[index] || "check" });
    const description = createElement("p", { className: "strength-group__description", text: descriptions[index] || group.items.join(" • ") });
    const items = createElement("ul", { className: "strength-group__list" });
    appendChildren(items, group.items.slice(0, 3).map((item) => {
      const itemElement = createElement("li", { className: "strength-group__item" });
      itemElement.append(createElement("span", { className: "material-symbols-outlined", text: "check" }), document.createTextNode(item));
      return itemElement;
    }));
    header.append(title, icon);
    article.append(header, description, items);
    return article;
  }));
}

export function renderCareerDirection(text) {
  setText("[data-career-direction]", text);
}

export function renderPersonalNote(note) {
  setText("[data-personal-note-title]", note.title);
  setText("[data-personal-note-text]", note.text);
}

export function renderFooter(profile) {
  setText("[data-footer-name]", profile.footerName);
  const yearElement = document.getElementById("current-year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
}

function renderNavigation(profile) {
  const navLinks = clearElement("[data-nav-links]");
  if (navLinks) appendChildren(navLinks, profile.siteChrome.navLinks.map((link) => createElement("a", { href: link.href, text: link.label })));
}
