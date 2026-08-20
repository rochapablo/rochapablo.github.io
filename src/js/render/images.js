import { clearElement, createElement } from "../core/dom.js";

const imageSlotContainers = {
  heroPortrait: ".hero__media",
  visualBreakPrimary: ".visual-break",
  visualBreakSecondary: ".visual-break",
  closingProfile: ".closing__media"
};

function setImageVisibility(slotName, isVisible) {
  const slot = document.querySelector(`[data-image-slot="${slotName}"]`);

  if (slot) {
    slot.hidden = !isVisible;
    slot.dataset.imageState = isVisible ? "ready" : "missing";
  }

  const containerSelector = imageSlotContainers[slotName];
  const container = containerSelector ? slot?.closest(containerSelector) : null;

  if (container) {
    container.hidden = !isVisible;
  }
}

function syncPersonalNoteMediaVisibility(images) {
  const media = document.querySelector(".personal-note__media");

  if (!media) {
    return;
  }

  const hasAnyPersonalImage = [
    images?.workspaceDesk,
    images?.personalLifePrimary,
    images?.personalLifeSecondary
  ].some((image) => image?.src);

  media.hidden = !hasAnyPersonalImage;
}

function renderImageSlot(slotName, image, className) {
  const slot = clearElement(`[data-image-slot="${slotName}"]`);

  if (!slot || !image?.src) {
    setImageVisibility(slotName, false);
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
      "--image-position": image.objectPosition,
      "--image-position-mobile": image.mobileObjectPosition ?? image.objectPosition
    }
  });

  if (image.decorative) {
    imageElement.setAttribute("aria-hidden", "true");
  }

  imageElement.addEventListener("error", () => {
    setImageVisibility(slotName, false);
    imageElement.remove();
  });

  setImageVisibility(slotName, true);
  slot.append(imageElement);
}

export function renderProfileImages(images) {
  if (!images) {
    syncPersonalNoteMediaVisibility(images);
    return;
  }

  renderImageSlot("heroPortrait", images.heroPortrait, "media-slot__image");
  renderImageSlot("visualBreakPrimary", images.visualBreakPrimary, "visual-break__image");
  renderImageSlot("workspaceDesk", images.workspaceDesk, "media-slot__image");
  renderImageSlot("personalLifePrimary", images.personalLifePrimary, "media-slot__image");
  renderImageSlot("personalLifeSecondary", images.personalLifeSecondary, "media-slot__image");
  renderImageSlot("visualBreakSecondary", images.visualBreakSecondary, "visual-break__image");
  renderImageSlot("closingProfile", images.closingProfile, "media-slot__image");
  syncPersonalNoteMediaVisibility(images);
}
