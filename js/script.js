// ================= Pre Loader =================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // Fade out
  loader.classList.add("opacity-0");

  // Remove from DOM after animation
  setTimeout(() => {
    loader.remove();
  }, 700);
});