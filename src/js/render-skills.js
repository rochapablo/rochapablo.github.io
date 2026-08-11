import { clearElement, createElement } from "./dom.js";

export function renderSkillsByExperience(skills) {
  const list = clearElement("#skills-years-list");

  if (!list) {
    return;
  }

  const groups = groupSkillsByCategory(skills);

  groups.forEach((groupSkills, category) => {
    const card = createElement("article", { className: "strength-card skills-group" });
    const title = createElement("h3", { className: "strength-card__title skills-group__title", text: category });
    const items = createElement("ul", { className: "skills-group__list" });

    groupSkills.forEach((skill) => {
      const item = createElement("li", { className: "skills-group__item" });
      item.append(
        createElement("span", { className: "skills-group__skill", text: skill.name }),
        createElement("span", { className: "skills-group__years", text: skill.years })
      );
      items.appendChild(item);
    });

    card.append(title, items);
    list.appendChild(card);
  });
}

function groupSkillsByCategory(skills) {
  const groups = new Map();

  skills.forEach((skill) => {
    const category = skill.category || "Skills";
    const categorySkills = groups.get(category) || [];
    categorySkills.push(skill);
    groups.set(category, categorySkills);
  });

  return groups;
}
