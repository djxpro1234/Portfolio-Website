/**
 * Projects Page - Interactions
 * Radial gradient glow follows cursor on project cards.
 */
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".glass-card");

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgb(var(--primary) / 0.12), var(--glass-bg))`;
    } else {
      card.style.background = "var(--glass-bg)";
    }
  });
});
