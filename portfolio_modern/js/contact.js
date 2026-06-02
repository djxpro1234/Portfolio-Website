/**
 * Contact Page - Interactions
 * Label focus effects, atmospheric parallax, and form submission.
 */

// Label focus micro-interaction
document.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("focus", () => {
    input.previousElementSibling.classList.add("text-primary");
  });
  input.addEventListener("blur", () => {
    input.previousElementSibling.classList.remove("text-primary");
  });
});

// Atmospheric glow parallax
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 20;
  const y = (e.clientY / window.innerHeight) * 20;

  document.querySelectorAll('.blur-\\[100px\\]').forEach((glow) => {
    glow.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Web3Forms submission
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = document.getElementById("submit-btn");
  const text = document.getElementById("submit-text");
  const result = document.getElementById("form-result");

  btn.disabled = true;
  text.textContent = "Sending...";

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: new FormData(e.target),
  });

  const data = await res.json();

  if (data.success) {
    result.textContent = "✓ Message sent! I'll get back to you soon.";
    result.className = "text-center font-label-mono text-label-mono text-tertiary";
    e.target.reset();
  } else {
    result.textContent = "✗ Something went wrong. Please try again.";
    result.className = "text-center font-label-mono text-label-mono text-error";
  }

  btn.disabled = false;
  text.textContent = "Send Message";
});
