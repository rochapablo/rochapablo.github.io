const EVENT_PROPERTIES = {
  "engaged-visit": new Set(["threshold_seconds", "depth"]),
  "scroll-depth": new Set(["depth"]),
  "section-viewed": new Set(["section"]),
  "resume-click": new Set(["location"]),
  "outbound-click": new Set(["destination"]),
  "visitor-intent": new Set(["intent"])
};
const ALLOWED_VALUES = {
  depth: new Set([0, 25, 50, 75, 90]),
  section: new Set(["about", "strengths", "skills", "experience", "contact"]),
  location: new Set(["header", "hero", "contact"]),
  destination: new Set(["linkedin", "github", "email", "certificate"]),
  intent: new Set(["hiring", "networking", "technical", "browsing"]),
  threshold_seconds: new Set([15])
};
let pageViewTracked = false;

export function trackInitialPageView() {
  if (pageViewTracked || typeof window === "undefined") {
    return false;
  }

  const umami = window.umami;

  if (typeof umami?.track !== "function") {
    return false;
  }

  try {
    umami.track();
    pageViewTracked = true;
    return true;
  } catch {
    return false;
  }
}

export function trackEvent(name, properties = {}) {
  if (typeof window === "undefined" || !Object.hasOwn(EVENT_PROPERTIES, name)) {
    return false;
  }

  const umami = window.umami;

  if (typeof umami?.track !== "function") {
    return false;
  }

  const allowed = EVENT_PROPERTIES[name];
  const safeProperties = Object.fromEntries(
    Object.entries(properties).filter(([key, value]) =>
      allowed.has(key) && isSafeValue(key, value)
    )
  );

  try {
    if (Object.keys(safeProperties).length > 0) {
      umami.track(name, safeProperties);
    } else {
      umami.track(name);
    }
    return true;
  } catch {
    // Analytics must never interrupt site behavior.
    return false;
  }
}

export function trackEventOnce(name, properties = {}, key = name) {
  if (wasTracked(key)) {
    return;
  }

  if (trackEvent(name, properties)) {
    rememberTracked(key);
  }
}

function isSafeValue(key, value) {
  const values = ALLOWED_VALUES[key];
  return values
    ? values.has(value)
    : typeof value === "number" && Number.isFinite(value);
}

function wasTracked(key) {
  try {
    return window.sessionStorage.getItem(`analytics:${key}`) === "1";
  } catch {
    return false;
  }
}

function rememberTracked(key) {
  try {
    window.sessionStorage.setItem(`analytics:${key}`, "1");
  } catch {
    // Storage restrictions only disable cross-render de-duplication.
  }
}
