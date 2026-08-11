import { clearElement, createElement, setText } from "./dom.js";

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

  groups.forEach((group) => {
    const card = createElement("article", { className: "strength-card" });
    const title = createElement("h3", { className: "strength-card__title", text: group.title });
    const items = createElement("ul", { className: "strength-card__list" });

    group.items.forEach((item) => {
      items.appendChild(createElement("li", { text: item }));
    });

    card.append(title, items);
    list.appendChild(card);
  });
}

export function renderCareerDirection(text) {
  setText("[data-career-direction]", text);
}

export function renderContacts(contacts) {
  const contactLinks = clearElement("#contact-links");
  const primaryActions = clearElement("[data-primary-actions]");

  if (contactLinks) {
    contacts.forEach((link) => {
      contactLinks.appendChild(createLink(link, "button"));
    });
  }

  if (primaryActions) {
    contacts
      .filter((link) => link.label === "Email" || link.label === "Resume PDF")
      .forEach((link, index) => {
        const className = index === 0 ? "button button-primary" : "button";
        primaryActions.appendChild(createLink(link, className));
      });
  }
}

export function renderFooter(profile) {
  setText("[data-footer-name]", profile.footerName);

  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

export function updateMetadata(profile) {
  document.title = `${profile.name} | ${profile.title}`;

  const description = document.querySelector('meta[name="description"]');

  if (description) {
    description.setAttribute(
      "content",
      `${profile.name} - ${profile.title} specializing in .NET, Angular, Azure, DevOps, and technical leadership.`
    );
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
