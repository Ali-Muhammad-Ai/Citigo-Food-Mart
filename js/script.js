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



// ================= Counter Animation =================
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = +counter.dataset.target;

    let count = 0;

    const updateCounter = () => {
      const increment = target / 120;

      if (count < target) {
        count += increment;

        if (target >= 1000) {
          counter.innerText =
            Math.floor(count / 1000) + "K+";
        } else {
          counter.innerText =
            Math.floor(count) + "+";
        }

        requestAnimationFrame(updateCounter);
      } else {
        if (target >= 1000) {
          counter.innerText =
            target / 1000 + "K+";
        } else {
          counter.innerText =
            target + "+";
        }
      }
    };

    updateCounter();
  });



const cards = document.querySelectorAll(".service-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 150);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

cards.forEach((card) => observer.observe(card));