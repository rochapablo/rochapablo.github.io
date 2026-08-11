import { appendChildren, clearElement, createElement } from "./dom.js";

export function renderFacts(facts) {
  const list = clearElement("[data-profile-facts]");

  if (!list) {
    return;
  }

  appendChildren(
    list,
    facts.map((fact) => {
      const item = createElement("div", { className: "fact-item" });
      item.append(
        createElement("span", { className: "fact-item__label", text: fact.label }),
        createElement("strong", { className: "fact-item__value", text: fact.value })
      );
      return item;
    })
  );
}
