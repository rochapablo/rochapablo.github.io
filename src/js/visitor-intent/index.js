import { sanitizeCompanyName, trackEvent } from "../analytics/index.js";
import { buildVisitorIntentCard } from "./card.js";

const STORAGE_KEY = "visitor-intent-state";
const SHOW_DELAY_MS = 25000;
const SHOW_SCROLL_RATIO = 0.45;

export function initVisitorIntent(config) {
  if (!config?.title || hasCompletedState()) {
    return;
  }

  let shown = false;
  let selectedIntent = "";
  const card = buildVisitorIntentCard(config, {
    onDismiss: dismissCard,
    onSelect(intent) {
      selectedIntent = intent;

      if (intent !== "hiring") {
        submitIntent(intent);
        return;
      }

      card.dataset.mode = "hiring";
      card.querySelector("[data-visitor-intent-company]")?.focus();
    },
    onContinue() {
      submitIntent("hiring", getCompanyValue(card));
    }
  });
  const timeoutId = window.setTimeout(showCard, SHOW_DELAY_MS);

  window.addEventListener("scroll", handleScrollTrigger, { passive: true });
  card.addEventListener("keydown", handleCardKeydown);

  function submitIntent(intent, company = "") {
    const properties = company ? { intent, company } : { intent };
    rememberState("answered");
    trackEvent("visitor-intent", properties);
    teardown();
  }

  function showCard() {
    if (shown || hasCompletedState()) {
      return;
    }

    shown = true;
    document.body.appendChild(card);
    window.setTimeout(() => {
      card.dataset.visible = "true";
    }, 24);
    trackEvent("visitor-intent-shown");
    removeTriggers();
  }

  function handleScrollTrigger() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollableHeight > 0 && window.scrollY / scrollableHeight >= SHOW_SCROLL_RATIO) {
      showCard();
    }
  }

  function handleCardKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      dismissCard();
      return;
    }

    if (event.key === "Enter" && selectedIntent === "hiring" && event.target instanceof HTMLInputElement) {
      event.preventDefault();
      submitIntent("hiring", getCompanyValue(card));
    }
  }

  function dismissCard() {
    trackEvent("visitor-intent-dismissed");
    rememberState("dismissed");
    teardown();
  }

  function teardown() {
    removeTriggers();
    card.removeEventListener("keydown", handleCardKeydown);
    card.remove();
    selectedIntent = "";
  }

  function removeTriggers() {
    window.clearTimeout(timeoutId);
    window.removeEventListener("scroll", handleScrollTrigger);
  }
}

function hasCompletedState() {
  return readState() !== "";
}

function readState() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function rememberState(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Ignore storage failures so the site behavior stays intact.
  }
}

function getCompanyValue(card) {
  const input = card.querySelector("[data-visitor-intent-company]");
  return sanitizeCompanyName(input?.value ?? "");
}
