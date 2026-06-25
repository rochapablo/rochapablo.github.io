import { clearElement, createElement } from "./dom.js";

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
