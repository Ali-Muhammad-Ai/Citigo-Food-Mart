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
        counter.innerText = Math.floor(count / 1000) + "K+";
      } else {
        counter.innerText = Math.floor(count) + "+";
      }

      requestAnimationFrame(updateCounter);
    } else {
      if (target >= 1000) {
        counter.innerText = target / 1000 + "K+";
      } else {
        counter.innerText = target + "+";
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
  },
);

cards.forEach((card) => observer.observe(card));

const features = document.querySelectorAll(".feature-item");
const whyImage = document.querySelector(".why-image");

const featureObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (whyImage) {
          whyImage.classList.add("show");
        }

        features.forEach((feature, index) => {
          setTimeout(() => {
            feature.classList.add("show");
          }, index * 180);
        });
      }
    });
  },
  {
    threshold: 0.3,
  },
);

if (features.length) {
  featureObserver.observe(features[0]);
}

const foodCards = document.querySelectorAll(".food-card");

const foodObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        foodCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("show");
          }, index * 180);
        });
      }
    });
  },
  {
    threshold: 0.2,
  },
);

if (foodCards.length) {
  foodObserver.observe(foodCards[0]);
}

const fuelCounters = document.querySelectorAll(".fuel-counter");

const fuelObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.dataset.target);

        let current = 0;

        const duration = 1800;
        const startTime = performance.now();

        function update(now) {
          const progress = Math.min((now - startTime) / duration, 1);

          current = target * progress;

          counter.innerText = current.toFixed(2);

          if (progress < 1) {
            requestAnimationFrame(update);
          }
        }

        requestAnimationFrame(update);

        fuelObserver.unobserve(counter);
      }
    });
  },
  {
    threshold: 0.5,
  },
);

fuelCounters.forEach((counter) => {
  fuelObserver.observe(counter);
});
