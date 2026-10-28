import { attachTrackedLink } from "../analytics/link-tracking.js";
import { appendChildren, clearElement, createElement } from "../core/dom.js";

export function renderContacts(contacts) {
  const contactLinks = clearElement("#contact-links");
  const primaryActions = clearElement("[data-primary-actions]");
  const primaryActionLabels = new Set(["Email"]);

  if (contactLinks) {
    appendChildren(
      contactLinks,
      contacts.map((link, index) =>
        createLink(link, index === 0 ? "contact-links__item contact-links__item--primary" : "contact-links__item", "contact")
      )
    );
  }

  if (primaryActions) {
    appendChildren(
      primaryActions,
      contacts
        .filter((link) => primaryActionLabels.has(link.label))
        .map((link, index) => createLink(link, index === 0 ? "button button-primary" : "button", "hero"))
    );
  }
}

function createLink(link, className, location) {
  const element = createElement("a", {
    className,
    href: link.href,
    target: link.target,
    rel: link.rel,
    download: link.download
  });

  if (location === "contact") {
    const icon = createElement("span", { className: "material-symbols-outlined contact-links__icon", text: link.label === "Email" ? "mail" : link.label === "GitHub" ? "code" : link.label.includes("Certificate") ? "verified" : "link" });
    const copy = createElement("span", { className: "contact-links__copy" });
    copy.append(createElement("small", { className: "contact-links__label", text: link.label === "Official EF SET Certificate" ? "English Certificate" : link.label }));
    copy.append(createElement("strong", { className: "contact-links__value", text: link.label === "Email" ? "Send a message" : link.label === "GitHub" ? "GitHub Repos" : link.label === "LinkedIn" ? "LinkedIn Profile" : "EF SET Proficient (C2)" }));
    element.append(icon, copy);
  } else {
    element.textContent = link.label;
  }

  const tracking = getTrackingDetails(link, location);

  if (tracking) {
    attachTrackedLink(element, tracking.eventName, tracking.properties);
  }

  return element;
}

function getTrackingDetails(link, location) {
  switch (link.label) {
    case "LinkedIn":
      return { eventName: "outbound-click", properties: { destination: "linkedin" } };
    case "GitHub":
      return { eventName: "outbound-click", properties: { destination: "github" } };
    case "Email":
      return { eventName: "outbound-click", properties: { destination: "email" } };
    case "Official EF SET Certificate":
      return { eventName: "outbound-click", properties: { destination: "certificate" } };
    default:
      return null;
  }
}
