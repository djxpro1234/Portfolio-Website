/**
 * Index Page - Interactions
 * Parallax effect on hero avatar.
 */
const heroSection = document.querySelector("section");
const avatarContainer = heroSection?.querySelector("[data-avatar]");

heroSection?.addEventListener("mousemove", (e) => {
  if (!avatarContainer) return;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const moveX = (e.clientX - centerX) / 50;
  const moveY = (e.clientY - centerY) / 50;

  avatarContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
