import { appendChildren, clearElement, createElement } from "../core/dom.js";

export function renderExperience(experience) {
  const list = clearElement("#experience-list");
  if (!list) return;
  const visibleEntries = experience.length > 4 ? [...experience.slice(0, 3), mergeEarlierExperience(experience.slice(3))] : experience;
  appendChildren(list, visibleEntries.map((entry, index) => {
    const item = createElement("article", { className: "timeline-entry" });
    const period = createElement("p", { className: "timeline-entry__period", text: entry.period });
    const marker = createElement("div", { className: "timeline-entry__marker", attributes: { "aria-hidden": "true" } });
    const body = createElement("div", { className: "timeline-entry__body" });
    const headingRow = createElement("div", { className: "timeline-entry__heading" });
    const heading = createElement("h3", { className: "timeline-entry__role", text: entry.company || entry.role });
    headingRow.appendChild(heading);
    if (index === 0) headingRow.appendChild(createElement("span", { className: "timeline-entry__status", text: "PRESENT" }));
    body.appendChild(headingRow);
    if (entry.company) body.appendChild(createElement("p", { className: "timeline-entry__company", text: entry.role }));
    if (entry.referenceUrl) body.appendChild(createElement("a", { className: "timeline-entry__reference", text: "Professional reference ↗", href: entry.referenceUrl, target: "_blank", rel: "noopener noreferrer" }));
    if (entry.focus) body.appendChild(createElement("p", { className: "timeline-entry__focus", text: entry.focus }));
    const location = createElement("p", { className: "timeline-entry__location", text: entry.location });
    item.append(period, marker, body, location);
    return item;
  }));
}

function mergeEarlierExperience(entries) {
  const first = entries[0];
  const last = entries.at(-1);
  return {
    role: "Analyst Developer & Web Developer",
    company: entries.map((entry) => entry.company).join(" & "),
    period: `${last.period.split(" ").at(0)} – ${first.period.split(" ").at(-1)}`,
    location: "Maringá, Brazil",
    focus: entries.map((entry) => entry.focus).join(" ")
  };
}
