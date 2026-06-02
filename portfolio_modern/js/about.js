/**
 * About Page - Interactions
 * Mouse-follow glow on skill cards + scroll-triggered progress animation.
 */

// Mouse-follow glow on glass cards
document.querySelectorAll(".glass-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

// Animate skill progress circles on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-progress");
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".skill-progress").forEach((progress) => {
  observer.observe(progress);
});
