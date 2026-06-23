import { clearElement, createElement, setText } from "./dom.js";

export function renderHero(profile) {
  setText("[data-profile-name]", profile.name);
  setText("[data-profile-title]", profile.title);
  setText("[data-profile-tagline]", profile.tagline);
  setText("[data-profile-summary]", profile.summary);
}

export function renderStrengths(strengths) {
  const list = clearElement("#strengths-list");

  if (!list) {
    return;
  }

  strengths.forEach((strength) => {
    list.appendChild(createElement("li", { text: strength }));
  });
}

export function renderExperience(experience) {
  const list = clearElement("#experience-list");

  if (!list) {
    return;
  }

  experience.forEach((entry) => {
    const card = createElement("article", { className: "experience-card" });
    const role = createElement("h3", { className: "experience-card__role", text: entry.role });

    card.appendChild(role);

    if (entry.company) {
      card.appendChild(createElement("p", { className: "experience-card__company", text: entry.company }));
    }

    const metadata = createExperienceMetadata(entry);

    if (metadata) {
      card.appendChild(metadata);
    }

    if (entry.focus) {
      card.appendChild(createElement("p", { className: "experience-card__focus", text: entry.focus }));
    }

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
    text: link.label
  });
}

function createExperienceMetadata(entry) {
  const locationClass = entry.period
    ? "experience-card__location experience-card__location--separated"
    : "experience-card__location";
  const metadataItems = [
    { className: "experience-card__period", text: entry.period },
    { className: locationClass, text: entry.location }
  ].filter((item) => item.text);

  if (metadataItems.length === 0) {
    return null;
  }

  const metadata = createElement("p", { className: "experience-card__meta" });

  metadataItems.forEach((item) => {
    metadata.appendChild(createElement("span", item));
  });

  return metadata;
}
