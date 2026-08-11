import { appendChildren, clearElement, createElement, setText } from "./dom.js";
import { initNavigation } from "./navigation.js";
import { renderFacts } from "./render-facts.js";

export function initSiteChrome(profile) {
  setText("[data-hero-greeting]", profile.title);
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
