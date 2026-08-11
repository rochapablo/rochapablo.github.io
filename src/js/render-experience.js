import { appendChildren, clearElement, createElement } from "./dom.js";

export function renderExperience(experience) {
  const list = clearElement("#experience-list");

  if (!list) {
    return;
  }

  appendChildren(
    list,
    experience.map((entry) => {
      const item = createElement("article", { className: "timeline-entry" });
      const period = createElement("p", { className: "timeline-entry__period", text: entry.period });
      const marker = createElement("div", { className: "timeline-entry__marker", attributes: { "aria-hidden": "true" } });
      const body = createElement("div", { className: "timeline-entry__body" });
      const location = createElement("p", { className: "timeline-entry__location", text: entry.location });
      const heading = createElement("h3", { className: "timeline-entry__role", text: entry.role });

      body.appendChild(heading);

      if (entry.company) {
        body.appendChild(createElement("p", { className: "timeline-entry__company", text: entry.company }));
      }

      if (entry.focus) {
        body.appendChild(createElement("p", { className: "timeline-entry__focus", text: entry.focus }));
      }

      item.append(period, marker, body, location);
      return item;
    })
  );
}
