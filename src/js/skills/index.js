import { appendChildren, clearElement, createElement } from "../core/dom.js";

const groups = [
  { key: "frontend", label: "Frontend", secondary: "Client UI", icon: "</>" },
  { key: "backend", label: "Backend & Data", secondary: "Server", icon: "DB" },
  { key: "cloud", label: "Cloud & Infra", secondary: "Platform", icon: "☁" },
  { key: "lead", label: "Tools & Practices", secondary: "Workflow", icon: "⚒" }
];

export function renderSkillsByExperience(skills) {
  const tabs = clearElement("[data-skills-tabs]");
  const panel = clearElement("[data-skills-panel]");
  if (!tabs || !panel) return;

  const filterButtons = [["all", "All"], ...groups.map(({ key, label }) => [key, key === "lead" ? "Tools" : label.split(" ")[0]])];
  appendChildren(tabs, filterButtons.map(([key, label], index) => createElement("button", {
    className: `skills-tabs__button${index === 0 ? " is-active" : ""}`,
    text: label,
    type: "button",
    attributes: { "data-skills-filter": key, "aria-pressed": String(index === 0) }
  })));

  const render = (filter) => {
    panel.replaceChildren();
    const grid = createElement("div", { className: "skills-reference-grid" });
    groups.filter(({ key }) => filter === "all" || key === filter).forEach((group) => {
      const card = createElement("article", { className: "skills-reference-card", attributes: { "data-group": group.key } });
      const header = createElement("div", { className: "skills-reference-card__header" });
      const title = createElement("div", { className: `skills-reference-card__title skills-reference-card__title--${group.key}` });
      title.append(createElement("span", { className: "skills-reference-card__icon", text: group.icon }), createElement("strong", { text: group.label }));
      header.append(title, createElement("span", { className: "skills-reference-card__secondary", text: group.secondary }));
      const list = createElement("div", { className: "skills-reference-card__list" });
      skills.filter((skill) => belongsToGroup(skill, group.key)).slice(0, 5).forEach((skill) => {
        const row = createElement("div", { className: "skills-reference-card__row" });
        row.append(createElement("span", { text: skill.name }), createElement("small", { text: categoryLabel(skill) }));
        list.appendChild(row);
      });
      card.append(header, list);
      grid.appendChild(card);
    });
    panel.appendChild(grid);
  };

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-skills-filter]");
    if (!button) return;
    tabs.querySelectorAll("[data-skills-filter]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    render(button.dataset.skillsFilter || "all");
  });
  render("all");
}

function belongsToGroup(skill, group) {
  const category = skill.category || "";
  if (group === "frontend") return category === "Frontend";
  if (group === "backend") return category === "Backend & Architecture" || category === "Data & Platforms";
  if (group === "cloud") return category === "Cloud & Delivery";
  return ["Leadership & Delivery", "Production & Reliability", "AdTech", "AI-Assisted Workflows"].includes(category);
}

function categoryLabel(skill) {
  const category = skill.category || "Skill";
  if (category.includes("Frontend")) return "UI";
  if (category.includes("Backend")) return "Backend";
  if (category.includes("Cloud")) return "Cloud";
  return "Core";
}
