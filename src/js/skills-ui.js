import { appendChildren, createElement } from "./dom.js";
import { getPanelId, getTabId, getVisibleSkills, parseYears } from "./skills-data.js";

export function renderSkillsPanel({ tabs, panel, categories, categoryNames, maxYears, state }) {
  const activeIndex = categoryNames.indexOf(state.activeCategory);
  const activeSkills = getVisibleSkills(categories, state.activeCategory);

  state.bars.forEach((bar) => bar.destroy());
  state.bars = [];

  tabs.querySelectorAll("[data-category]").forEach((button, index) => {
    const isActive = index === activeIndex;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.setAttribute("tabindex", isActive ? "0" : "-1");
  });

  panel.replaceChildren();
  panel.setAttribute("role", "tabpanel");
  panel.setAttribute("id", getPanelId(activeIndex));
  panel.setAttribute("aria-labelledby", getTabId(activeIndex));

  const list = createElement("div", { className: "skills-list__items" });

  appendChildren(
    list,
    activeSkills.map((skill, index) => createSkillRow(skill, index, maxYears, state))
  );

  panel.appendChild(list);
}

function createSkillRow(skill, index, maxYears, state) {
  const experience = parseYears(skill.years);
  const ratio = experience / maxYears;
  const row = createElement("article", { className: "skill-row" });
  const header = createElement("div", { className: "skill-row__header" });
  const track = createElement("div", {
    className: "skill-row__bar",
    attributes: {
      "data-skill-ratio": String(ratio),
      "data-skill-label": `${skill.name}: ${skill.years}`,
      "aria-hidden": "true"
    }
  });

  header.append(
    createElement("h3", { className: "skill-row__name", text: skill.name }),
    createElement("span", { className: "skill-row__years", text: skill.years })
  );

  row.append(header, track);

  queueMicrotask(() => {
    const ProgressBar = window.ProgressBar;

    if (!ProgressBar || !track.isConnected) {
      return;
    }

    const bar = new ProgressBar.Line(track, {
      strokeWidth: 4,
      trailWidth: 4,
      duration: 0,
      easing: "linear",
      color: "var(--color-accent-strong)",
      trailColor: "var(--color-track)",
      svgStyle: { width: "100%", height: "100%" }
    });

    bar.set(ratio);
    state.bars[index] = bar;
  });

  return row;
}
