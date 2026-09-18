import { createElement } from "../core/dom.js";

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
  const slot = document.querySelector(`[data-image-slot="${slotName}"]`);

  if (!slot || !image?.src) {
    slot?.replaceChildren();
    setImageVisibility(slotName, false);
    return;
  }

  const imageElement = slot.querySelector("img") ?? createElement("img");
  imageElement.className = className;
  imageElement.alt = image.decorative ? "" : image.alt ?? "";
  imageElement.width = image.width;
  imageElement.height = image.height;
  imageElement.loading = slotName === "heroPortrait" ? "eager" : "lazy";
  imageElement.decoding = "async";
  if (slotName === "heroPortrait") imageElement.setAttribute("fetchpriority", "high");
  else imageElement.removeAttribute("fetchpriority");
  if (imageElement.getAttribute("src") !== image.src) imageElement.src = image.src;
  imageElement.style.setProperty("--image-position", image.objectPosition ?? "center center");
  imageElement.style.setProperty("--image-position-mobile", image.mobileObjectPosition ?? image.objectPosition ?? "center center");

  if (image.decorative) {
    imageElement.setAttribute("aria-hidden", "true");
  } else imageElement.removeAttribute("aria-hidden");

  if (imageElement.dataset.errorBound !== "true") {
    imageElement.dataset.errorBound = "true";
    imageElement.addEventListener("error", () => {
      setImageVisibility(slotName, false);
      imageElement.remove();
    });
  }

  setImageVisibility(slotName, true);
  slot.replaceChildren(imageElement);
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
