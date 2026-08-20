export function initNavigation() {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const siteNav = document.querySelector("[data-site-nav]");

  if (!navToggle || !siteNav) {
    return;
  }

  const closeNav = () => {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.dataset.open = "false";
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.dataset.open = String(!isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  const mediaQuery = window.matchMedia("(min-width: 900px)");
  const syncDesktopNav = (event) => {
    if (event.matches) {
      closeNav();
    }
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", syncDesktopNav);
  } else {
    mediaQuery.addListener(syncDesktopNav);
  }
}
