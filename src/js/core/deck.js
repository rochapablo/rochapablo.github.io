import { CARD_COUNT, STACK_STATES, createDeckMotion } from "./deck-motion.js";
import { bindDeckEvents } from "./deck-events.js";

export function initDeck() {
  const animate = window.Motion?.animate;
  const viewport = document.querySelector("[data-deck-viewport]");
  const cards = Array.from(document.querySelectorAll("[data-deck-card]"));
  const tabs = Array.from(document.querySelectorAll("[data-deck-tab]"));
  const nextButton = document.querySelector("[data-deck-next]");
  const prevButton = document.querySelector("[data-deck-prev]");
  const dots = Array.from(document.querySelectorAll("[data-deck-dot]"));
  const restartButton = document.querySelector("[data-deck-restart]");
  const counter = document.querySelector("[data-deck-counter]");

  if (!animate) {
    window.setTimeout(() => initDeck(), 25);
    return;
  }

  if (!viewport || cards.length !== CARD_COUNT || tabs.length !== CARD_COUNT) {
    return;
  }

  const hashIndex = Number(window.location.hash.match(/^#card-(\d)$/)?.[1]);
  let activeIndex = Number.isInteger(hashIndex) && hashIndex >= 0 && hashIndex < CARD_COUNT ? hashIndex : 0;
  let touchStartX = 0;
  let hasRendered = false;
  const animateCard = createDeckMotion(animate);

  const activate = (index, moveFocus = false, wrap = false) => {
    activeIndex = wrap
      ? (index + CARD_COUNT) % CARD_COUNT
      : Math.max(0, Math.min(index, CARD_COUNT - 1));

    const nextHash = `#card-${activeIndex}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }

    cards.forEach((card, cardIndex) => {
      const isActive = cardIndex === activeIndex;
      const relativeIndex = (cardIndex - activeIndex + CARD_COUNT) % CARD_COUNT;
      card.classList.toggle("is-active", isActive);
      card.classList.toggle("is-next-1", relativeIndex === 1);
      card.classList.toggle("is-next-2", relativeIndex === 2);
      card.classList.toggle("is-next-3", relativeIndex === 3);
      card.classList.toggle("is-prev", cardIndex < activeIndex && relativeIndex > 3);
      card.classList.toggle("is-hidden", !isActive && relativeIndex === 4);
      card.setAttribute("aria-hidden", String(!isActive));
      card.inert = relativeIndex === 4 || cardIndex < activeIndex;
      animateCard(card, STACK_STATES[relativeIndex], !hasRendered || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    });

    tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === activeIndex;
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
      tab.classList.toggle("is-active", isActive);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
      dot.setAttribute("aria-current", dotIndex === activeIndex ? "true" : "false");
    });

    if (prevButton) {
      prevButton.disabled = activeIndex === 0;
    }

    if (counter) {
      counter.innerHTML = `0${activeIndex + 1} / 0${CARD_COUNT} <span class="deck-footer__hint">• Use [← / →] Keys</span>`;
    }

    if (nextButton) {
      nextButton.innerHTML = activeIndex === CARD_COUNT - 1
        ? 'First card <span aria-hidden="true">↺</span>'
        : 'Next card <span aria-hidden="true">→</span>';
    }

    if (moveFocus) {
      tabs[activeIndex].focus();
    }

    hasRendered = true;
  };

  window.addEventListener("hashchange", () => {
    const nextIndex = Number(window.location.hash.match(/^#card-(\d)$/)?.[1]);
    if (Number.isInteger(nextIndex) && nextIndex >= 0 && nextIndex < CARD_COUNT && nextIndex !== activeIndex) {
      activate(nextIndex);
    }
  });

  bindDeckEvents({ viewport, cards, tabs, dots, nextButton, prevButton, restartButton, activate, getActiveIndex: () => activeIndex, cardCount: CARD_COUNT });

  activate(activeIndex);
}
