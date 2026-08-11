import { appendChildren, clearElement, createElement, setText } from "./dom.js";

export function renderHero(profile) {
  setText("[data-profile-name]", profile.name);
  setText("[data-profile-title]", profile.title);
  setText("[data-profile-tagline]", profile.tagline);
  setText("[data-profile-summary]", profile.summary);
  renderFacts(profile.facts);
}

export function renderSnapshot(snapshot) {
  setText("[data-profile-snapshot]", snapshot);
}

export function renderStrengths(groups) {
  const list = clearElement("#strengths-list");

  if (!list) {
    return;
  }

  const cards = groups.map((group) => {
    const card = createElement("article", { className: "strength-card" });
    const title = createElement("h3", { className: "strength-card__title", text: group.title });
    const items = createElement("ul", { className: "strength-card__list" });

    appendChildren(
      items,
      group.items.map((item) => createElement("li", { text: item }))
    );

    card.append(title, items);
    return card;
  });

  appendChildren(list, cards);
}

export function renderCareerDirection(text) {
  setText("[data-career-direction]", text);
}

export function renderPersonalNote(note) {
  setText("[data-personal-note-title]", note.title);
  setText("[data-personal-note-text]", note.text);
}

export function renderContacts(contacts) {
  const contactLinks = clearElement("#contact-links");
  const primaryActions = clearElement("[data-primary-actions]");
  const primaryActionLabels = new Set(["Email", "Resume PDF"]);

  if (contactLinks) {
    appendChildren(
      contactLinks,
      contacts.map((link) => createLink(link, "button"))
    );
  }

  if (primaryActions) {
    appendChildren(
      primaryActions,
      contacts
        .filter((link) => primaryActionLabels.has(link.label))
        .map((link, index) => createLink(link, index === 0 ? "button button-primary" : "button"))
    );
  }
}

export function renderFooter(profile) {
  setText("[data-footer-name]", profile.footerName);

  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function createLink(link, className) {
  return createElement("a", {
    className,
    href: link.href,
    text: link.label,
    target: link.target,
    rel: link.rel,
    download: link.download
  });
}

function renderFacts(facts) {
  const list = clearElement("[data-profile-facts]");

  if (!list) {
    return;
  }

  facts.forEach((fact) => {
    const item = createElement("div", { className: "profile-fact" });
    item.append(
      createElement("span", { className: "profile-fact__label", text: fact.label }),
      createElement("strong", { className: "profile-fact__value", text: fact.value })
    );
    list.appendChild(item);
  });
}
