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
        createLink(link, index === 0 ? "contact-links__item contact-links__item--primary" : "contact-links__item")
      )
    );
  }

  if (primaryActions) {
    appendChildren(
      primaryActions,
      contacts
        .filter((link) => primaryActionLabels.has(link.label))
        .map((link, index) => createLink(link, index === 0 ? "button button-primary" : "button"))
    );
  }
}

function createLink(link, className) {
  const element = createElement("a", {
    className,
    href: link.href,
    text: link.label,
    target: link.target,
    rel: link.rel,
    download: link.download
  });

  const tracking = getTrackingDetails(link);

  if (tracking) {
    attachTrackedLink(element, tracking.eventName, tracking.properties);
  }

  return element;
}

function getTrackingDetails(link) {
  switch (link.label) {
    case "LinkedIn":
      return { eventName: "linkedin-clicked" };
    case "GitHub":
      return { eventName: "github-clicked" };
    case "Email":
      return { eventName: "contact-clicked", properties: { method: "email" } };
    case "Resume PDF":
      return { eventName: "cv-clicked", properties: { location: "contact", language: "en" } };
    default:
      return null;
  }
}
