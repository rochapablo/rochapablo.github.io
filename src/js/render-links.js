import { appendChildren, clearElement, createElement } from "./dom.js";

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
  return createElement("a", {
    className,
    href: link.href,
    text: link.label,
    target: link.target,
    rel: link.rel,
    download: link.download
  });
}
