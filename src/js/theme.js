(() => {
  const STORAGE_KEY = "portfolio-theme";
  const DEFAULT_THEME = "default";
  const THEMES = new Set([DEFAULT_THEME, "christmas"]);

  function readStoredTheme() {
    try {
      const storedTheme = window.localStorage.getItem(STORAGE_KEY);
      return THEMES.has(storedTheme) ? storedTheme : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  }

  function saveTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable in private or restricted browsing contexts.
    }
  }

  function applyTheme(theme, persist = false) {
    const nextTheme = THEMES.has(theme) ? theme : DEFAULT_THEME;
    document.documentElement.dataset.theme = nextTheme;
    if (persist) saveTheme(nextTheme);
    return nextTheme;
  }

  function updateToggle(button, theme) {
    const switchToChristmas = theme === DEFAULT_THEME;
    const targetTheme = switchToChristmas ? "Christmas" : "Default";
    const icon = button.querySelector("[data-theme-icon]");

    if (icon) icon.textContent = switchToChristmas ? "ac_unit" : "light_mode";
    button.setAttribute("aria-label", `Switch to ${targetTheme} theme`);
    button.setAttribute("title", `Switch to ${targetTheme} theme`);
  }

  function initToggle() {
    const button = document.querySelector("[data-theme-toggle]");
    if (!button) return;

    const currentTheme = document.documentElement.dataset.theme || DEFAULT_THEME;
    updateToggle(button, currentTheme);
    button.addEventListener("click", () => {
      const activeTheme = document.documentElement.dataset.theme || DEFAULT_THEME;
      const nextTheme = applyTheme(activeTheme === DEFAULT_THEME ? "christmas" : DEFAULT_THEME, true);
      updateToggle(button, nextTheme);
    });
  }

  applyTheme(readStoredTheme());
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initToggle, { once: true });
  } else {
    initToggle();
  }
})();
