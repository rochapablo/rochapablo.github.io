import { appendChildren, clearElement, createElement, setText } from "./dom.js";
import { initNavigation } from "./navigation.js";
import { renderFacts } from "./render-facts.js";

export function initSiteChrome(profile) {
  setText("[data-hero-greeting]", "Hello, I'm");
  initNavigation();
}

export function renderHero(profile) {
  setText("[data-profile-name]", profile.name);
  setText("[data-profile-title]", profile.title);
  setText("[data-profile-tagline]", profile.tagline);
  setText("[data-profile-summary]", profile.summary);
}

export function renderSnapshot(snapshot, facts) {
  setText("[data-profile-snapshot]", snapshot);
  renderFacts(facts);
}

export function renderStrengths(groups) {
  const list = clearElement("#strengths-list");

  if (!list) {
    return;
  }

  appendChildren(
    list,
    groups.map((group) => {
      const article = createElement("article", { className: "strength-group" });
      const title = createElement("h3", { className: "strength-group__title", text: group.title });
      const items = createElement("ul", { className: "strength-group__list" });

      appendChildren(
        items,
        group.items.map((item) =>
          createElement("li", {
            className: "strength-group__item",
            text: item
          })
        )
      );

      article.append(title, items);
      return article;
    })
  );
}

export function renderCareerDirection(text) {
  setText("[data-career-direction]", text);
}

export function renderPersonalNote(note) {
  setText("[data-personal-note-title]", note.title);
  setText("[data-personal-note-text]", note.text);
}

function renderImageSlot(slotName, image, className) {
  const slot = clearElement(`[data-image-slot="${slotName}"]`);

  if (!slot || !image?.src) {
    return;
  }

  const imageElement = createElement("img", {
    className,
    attributes: {
      src: image.src,
      alt: image.decorative ? "" : image.alt ?? "",
      loading: "lazy",
      decoding: "async"
    },
    style: {
      "object-position": image.objectPosition
    }
  });

  if (image.decorative) {
    imageElement.setAttribute("aria-hidden", "true");
  }

  imageElement.addEventListener("error", () => {
    slot.dataset.imageState = "missing";
    imageElement.remove();
  });

  slot.dataset.imageState = "ready";
  slot.append(imageElement);
}

export function renderProfileImages(images) {
  if (!images) {
    return;
  }

  renderImageSlot("heroPortrait", images.heroPortrait, "media-slot__image");
  renderImageSlot("visualBreakPrimary", images.visualBreakPrimary, "visual-break__image");
  renderImageSlot("workspaceDesk", images.workspaceDesk, "media-slot__image");
  renderImageSlot("personalLifePrimary", images.personalLifePrimary, "media-slot__image");
  renderImageSlot("personalLifeSecondary", images.personalLifeSecondary, "media-slot__image");
  renderImageSlot("visualBreakSecondary", images.visualBreakSecondary, "visual-break__image");
  renderImageSlot("closingProfile", images.closingProfile, "media-slot__image");
}

export function renderFooter(profile) {
  setText("[data-footer-name]", profile.footerName);

  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
