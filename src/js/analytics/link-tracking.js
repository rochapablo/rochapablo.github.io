import { trackEvent } from "./index.js";

export function attachTrackedLink(element, eventName, properties) {
  if (!element || !eventName || element.dataset.analyticsBound === "true") {
    return;
  }

  element.dataset.analyticsBound = "true";
  element.addEventListener("click", () => {
    trackEvent(eventName, properties);
  });
}
