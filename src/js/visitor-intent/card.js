import { appendChildren, createElement } from "../core/dom.js";

export function buildVisitorIntentCard(config, handlers) {
  const title = createElement("h2", {
    className: "visitor-intent__title",
    text: config.title,
    id: "visitor-intent-title"
  });
  const dismiss = createElement("button", {
    className: "visitor-intent__dismiss",
    type: "button",
    attributes: { "aria-label": config.dismissLabel }
  });
  const dismissIcon = createElement("span", {
    className: "visitor-intent__dismiss-icon",
    attributes: { "aria-hidden": "true" }
  });
  const optionList = createElement("div", { className: "visitor-intent__options" });
  const card = createElement("aside", {
    className: "visitor-intent",
    attributes: {
      "aria-label": config.title,
      "aria-labelledby": "visitor-intent-title",
      "aria-live": "polite",
      role: "region"
    }
  });
  const header = createElement("div", { className: "visitor-intent__header" });

  dismiss.appendChild(dismissIcon);
  dismiss.addEventListener("click", handlers.onDismiss);

  appendChildren(
    optionList,
    config.options.map((option) => {
      const button = createElement("button", {
        className: "visitor-intent__option",
        type: "button",
        text: option.label
      });

      button.addEventListener("click", () => handlers.onSelect(option.value));
      return button;
    })
  );

  header.append(title, dismiss);
  card.append(header, optionList);
  return card;
}
