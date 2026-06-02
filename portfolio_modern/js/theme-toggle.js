/**
 * Theme Toggle
 * Handles light/dark mode switching via button click.
 */
(function () {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");

  function currentTheme() {
    return root.classList.contains("dark") ? "dark" : "light";
  }

  function syncButton() {
    if (!toggle) return;
    const theme = currentTheme();
    toggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    toggle.setAttribute("title", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
  }

  toggle?.addEventListener("click", () => {
    const nextTheme = currentTheme() === "dark" ? "light" : "dark";
    root.classList.toggle("dark", nextTheme === "dark");

    try {
      localStorage.setItem("theme", nextTheme);
    } catch (error) {
      // Theme still changes for the current page even if storage is blocked.
    }

    syncButton();
  });

  syncButton();
})();
