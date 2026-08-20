import { attachTrackedLink } from "../analytics/link-tracking.js";
import { appendChildren, clearElement, createElement, setAttributes, setText } from "../core/dom.js";
import { initNavigation } from "../core/navigation.js";
import { renderFacts } from "./facts.js";

export function initSiteChrome(profile) {
  setText("[data-profile-name]", profile.name);
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

export function renderHero(profile) {
  setText("[data-profile-name]", profile.name);
  setText("[data-profile-title]", profile.title);
  setText("[data-profile-tagline]", profile.tagline);
  setText("[data-profile-summary]", profile.summary);
}

export function renderSnapshot(snapshot, facts) {
  setText("[data-profile-snapshot]", snapshot);
  renderFacts(facts);
}

export function renderStrengths(groups) {
  const list = clearElement("#strengths-list");

  if (!list) {
    return;
  }

  appendChildren(
    list,
    groups.map((group) => {
      const article = createElement("article", { className: "strength-group" });
      const title = createElement("h3", { className: "strength-group__title", text: group.title });
      const items = createElement("ul", { className: "strength-group__list" });

      appendChildren(
        items,
        group.items.map((item) =>
          createElement("li", {
            className: "strength-group__item",
            text: item
          })
        )
      );

      article.append(title, items);
      return article;
    })
  );
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

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function renderNavigation(profile) {
  const { siteChrome, contactLinks } = profile;
  const navLinks = clearElement("[data-nav-links]");
  const resumeLink = document.querySelector("[data-nav-resume]");
  const resumeContact = contactLinks.find((link) => link.label === "Resume PDF");

  if (navLinks) {
    appendChildren(
      navLinks,
      siteChrome.navLinks.map((link) =>
        createElement("a", {
          href: link.href,
          text: link.label
        })
      )
    );
  }

  if (resumeLink) {
    resumeLink.textContent = siteChrome.resumeLabel;
    resumeLink.href = resumeContact?.href ?? "";
    resumeLink.target = resumeContact?.target ?? "";
    resumeLink.rel = resumeContact?.rel ?? "";

    if (resumeContact?.download) {
      resumeLink.download = typeof resumeContact.download === "string" ? resumeContact.download : "";
    } else {
      resumeLink.removeAttribute("download");
    }

    attachTrackedLink(resumeLink, "cv-clicked", { location: "header", language: "en" });
  }
}
