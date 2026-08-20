const MAX_COMPANY_LENGTH = 80;

function getUmami() {
  if (typeof window === "undefined") {
    return null;
  }

  return typeof window.umami?.track === "function" ? window.umami : null;
}

export function trackEvent(name, properties) {
  const umami = getUmami();

  if (!umami || !name) {
    return;
  }

  if (properties && Object.keys(properties).length > 0) {
    umami.track(name, properties);
    return;
  }

  umami.track(name);
}

export function sanitizeCompanyName(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, MAX_COMPANY_LENGTH);
}
