export function bindDeckEvents({ viewport, cards, tabs, dots, nextButton, prevButton, restartButton, activate, getActiveIndex, cardCount }) {
  let touchStartX = 0;

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(index));
    tab.addEventListener("keydown", (event) => {
      const actions = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: cardCount - 1 };
      if (!(event.key in actions)) return;
      event.preventDefault();
      activate(actions[event.key], true);
    });
  });

  viewport.addEventListener("keydown", (event) => {
    if (event.target.closest("a, button")) return;
    if (event.key === "ArrowRight" || event.key === " ") {
      event.preventDefault();
      activate(getActiveIndex() + 1, false, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      activate(getActiveIndex() - 1);
    }
  });

  viewport.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  viewport.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(distance) >= 40) activate(getActiveIndex() + (distance < 0 ? 1 : -1), false, distance < 0);
  }, { passive: true });

  nextButton?.addEventListener("click", () => activate(getActiveIndex() + 1, false, true));
  prevButton?.addEventListener("click", () => activate(getActiveIndex() - 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => activate(index)));
  restartButton?.addEventListener("click", () => activate(0));
  cards.forEach((card, index) => card.addEventListener("click", (event) => {
    if (!event.target.closest("a, button")) activate(index);
  }));

  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", (event) => {
    const card = document.querySelector(link.getAttribute("href"))?.closest("[data-deck-card]");
    if (card) {
      event.preventDefault();
      activate(Number(card.dataset.deckCard));
    }
  }));
}
