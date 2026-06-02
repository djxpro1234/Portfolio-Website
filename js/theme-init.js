/**
 * Theme Initialization
 * Runs before DOM renders to prevent flash of wrong theme.
 */
(function () {
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("theme");
  } catch (error) {
    savedTheme = null;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");

  document.documentElement.classList.toggle("dark", theme === "dark");
})();
