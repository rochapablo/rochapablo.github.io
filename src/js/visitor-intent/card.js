import { appendChildren, createElement } from "../core/dom.js";

export function buildVisitorIntentCard(config, handlers) {
  const title = createElement("p", { className: "visitor-intent__title", text: config.title });
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
  const hiringFields = createElement("div", { className: "visitor-intent__follow-up" });
  const companyLabel = createElement("label", {
    className: "visitor-intent__label",
    text: config.companyLabel,
    attributes: { for: "visitor-intent-company" }
  });
  const companyInput = createElement("input", {
    className: "visitor-intent__input",
    id: "visitor-intent-company",
    type: "text",
    attributes: {
      autocomplete: "organization",
      maxlength: "80",
      placeholder: config.companyPlaceholder,
      "data-visitor-intent-company": "true"
    }
  });
  const continueButton = createElement("button", {
    className: "visitor-intent__continue",
    type: "button",
    text: config.continueLabel
  });
  const card = createElement("aside", {
    className: "visitor-intent",
    attributes: { "aria-label": config.title }
  });
  const header = createElement("div", { className: "visitor-intent__header" });

  dismiss.appendChild(dismissIcon);
  dismiss.addEventListener("click", handlers.onDismiss);
  continueButton.addEventListener("click", handlers.onContinue);

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

  hiringFields.append(companyLabel, companyInput, continueButton);
  header.append(title, dismiss);
  card.append(header, optionList, hiringFields);
  return card;
}
