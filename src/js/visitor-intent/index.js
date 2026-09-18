import { trackEvent } from "../analytics/index.js";
import { buildVisitorIntentCard } from "./card.js";

const STORAGE_KEY = "visitor-intent-state";
const SHOW_DELAY_MS = 25000;
const SHOW_SCROLL_RATIO = 0.45;

export function initVisitorIntent(config) {
  if (!config?.title || hasCompletedState()) {
    return;
  }

  let shown = false;
  let previousFocus = null;
  const card = buildVisitorIntentCard(config, {
    onDismiss: dismissCard,
    onSelect(intent) {
      submitIntent(intent);
    }
  });
  const timeoutId = window.setTimeout(showCard, SHOW_DELAY_MS);

  window.addEventListener("scroll", handleScrollTrigger, { passive: true });

  function submitIntent(intent) {
    rememberState("answered");
    trackEvent("visitor-intent", { intent });
    teardown();
  }

  function showCard() {
    if (shown || hasCompletedState()) {
      return;
    }

    shown = true;
    previousFocus = document.activeElement;
    document.body.appendChild(card);
    window.setTimeout(() => {
      card.dataset.visible = "true";
    }, 24);
    removeTriggers();
  }

  function handleScrollTrigger() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollableHeight > 0 && window.scrollY / scrollableHeight >= SHOW_SCROLL_RATIO) {
      showCard();
    }
  }

  function dismissCard() {
    rememberState("dismissed");
    teardown();
  }

  function teardown() {
    removeTriggers();
    card.remove();
    if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
      previousFocus.focus();
    }
    previousFocus = null;
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
