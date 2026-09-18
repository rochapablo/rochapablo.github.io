import { attachTrackedLink } from "../analytics/link-tracking.js";
import { appendChildren, clearElement, createElement } from "../core/dom.js";

export function renderContacts(contacts) {
  const contactLinks = clearElement("#contact-links");
  const primaryActions = clearElement("[data-primary-actions]");
  const primaryActionLabels = new Set(["Email", "Resume PDF"]);

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
    text: link.label,
    target: link.target,
    rel: link.rel,
    download: link.download
  });

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
    case "Resume PDF":
      return { eventName: "resume-click", properties: { location } };
    case "Official EF SET Certificate":
      return { eventName: "outbound-click", properties: { destination: "certificate" } };
    default:
      return null;
  }
}
