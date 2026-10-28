export const CARD_COUNT = 5;
const CARD_TRANSITION_MS = 250;

export const STACK_STATES = [
  { transform: "translate3d(0px, 0px, 0px) scale(1) rotate(0deg)", opacity: 1, filter: "none" },
  { transform: "translate3d(24px, 12px, -24px) scale(.985) rotate(.8deg)", opacity: .86, filter: "brightness(.78) contrast(.94)" },
  { transform: "translate3d(44px, 24px, -48px) scale(.97) rotate(1.5deg)", opacity: .66, filter: "brightness(.59) contrast(.9)" },
  { transform: "translate3d(60px, 36px, -72px) scale(.955) rotate(2.2deg)", opacity: .4, filter: "brightness(.43) contrast(.86)" },
  { transform: "translate3d(0px, 0px, -96px) scale(.94) rotate(0deg)", opacity: 0, filter: "brightness(.35) contrast(.82)" }
];

export function createDeckMotion(animate) {
  const animations = new Map();

  return (card, state, immediate = false) => {
    animations.get(card)?.stop();
    if (immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      card.getAnimations().forEach((animation) => animation.cancel());
      animations.delete(card);
      card.style.transform = state.transform;
      card.style.opacity = String(state.opacity);
      card.style.filter = state.filter;
      return;
    }

    const controls = animate(card, {
      transform: state.transform,
      opacity: state.opacity,
      filter: state.filter
    }, {
      duration: CARD_TRANSITION_MS / 1000,
      ease: "easeOut"
    });
    animations.set(card, controls);
    controls.finished.then(() => {
      if (animations.get(card) === controls) animations.delete(card);
    });
  };
}
