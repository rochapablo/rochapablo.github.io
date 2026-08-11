import { appendChildren, clearElement, createElement } from "./dom.js";
import { getMaxYears, getPanelId, getTabId, groupSkillsByCategory } from "./skills-data.js";
import { renderSkillsPanel } from "./skills-ui.js";

export function renderSkillsByExperience(skills) {
  const tabs = clearElement("[data-skills-tabs]");
  const panel = clearElement("[data-skills-panel]");

  if (!tabs || !panel) {
    return;
  }

  const categories = groupSkillsByCategory(skills);
  const categoryNames = Array.from(categories.keys());
  const maxYears = getMaxYears(skills);
  const state = {
    activeCategory: categoryNames[0] || "",
    bars: []
  };

  appendChildren(
    tabs,
    categoryNames.map((category, index) =>
      createElement("button", {
        className: `skills-tabs__button${index === 0 ? " is-active" : ""}`,
        text: category,
        type: "button",
        attributes: {
          role: "tab",
          id: getTabId(index),
          "aria-selected": index === 0 ? "true" : "false",
          "aria-controls": getPanelId(index),
          "data-category": category,
          tabindex: index === 0 ? "0" : "-1"
        }
      })
    )
  );

  renderSkillsPanel({
    tabs,
    panel,
    categories,
    categoryNames,
    maxYears,
    state
  });

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");

    if (!button) {
      return;
    }

    state.activeCategory = button.dataset.category || state.activeCategory;
    renderSkillsPanel({ tabs, panel, categories, categoryNames, maxYears, state });
    button.focus();
  });

  tabs.addEventListener("keydown", (event) => {
    const currentIndex = categoryNames.indexOf(state.activeCategory);

    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % categoryNames.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + categoryNames.length) % categoryNames.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = categoryNames.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    state.activeCategory = categoryNames[nextIndex];
    renderSkillsPanel({ tabs, panel, categories, categoryNames, maxYears, state });
    tabs.querySelector(`[data-category="${CSS.escape(state.activeCategory)}"]`)?.focus();
  });
}
