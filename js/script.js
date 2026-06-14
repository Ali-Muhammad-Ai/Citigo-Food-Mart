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

// ================= Navbar =================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
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

// =============== Fuel Counter =================

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

// ================ Testimonial ==============
// document.addEventListener("DOMContentLoaded", () => {
//   const slider = document.getElementById("testimonial-slider");
//   const cards = document.querySelectorAll(".testimonial-card");
//   const dots = document.querySelectorAll(".dot");

//   let current = 0;

//   function updateSlider() {
//     const cardWidth = cards[0].offsetWidth + 24;

//     slider.style.transform = `translateX(-${current * cardWidth}px)`;

//     cards.forEach((card) => card.classList.remove("active"));

//     dots.forEach((dot) => {
//       dot.classList.remove("bg-red-600");
//       dot.classList.add("bg-gray-300");
//     });

//     cards[current].classList.add("active");

//     dots[current].classList.remove("bg-gray-300");
//     dots[current].classList.add("bg-red-600");
//   }

//   setInterval(() => {
//     current = (current + 1) % cards.length;
//     updateSlider();
//   }, 4000);

//   updateSlider();
// });

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("testimonial-slider");
  const dotsContainer = document.getElementById("dots-container");
  let originalCards = Array.from(slider.children);
  const totalOriginals = originalCards.length;

  // 1. Setup the Dots Container matching total actual items
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalOriginals; i++) {
    const dotBtn = document.createElement("button");
    dotBtn.className = `dot h-3 w-3 rounded-full transition-all duration-300 ${
      i === 0 ? "bg-red-600 w-6" : "bg-gray-300"
    }`;
    dotsContainer.appendChild(dotBtn);
  }
  const dots = document.querySelectorAll(".dot");

  // 2. Clone cards for infinite look (Append copies of the beginning array to the tail end)
  // We clone the first few items to ensure empty background slots never show up during looping
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    slider.appendChild(clone);
  });

  // Re-fetch all elements currently sitting inside the runner window
  const allCards = slider.children;
  let current = 0;
  let isTransitioning = false;

  function updateSlider() {
    // Gap size matches Tailwind's 'gap-6' which defaults to 24px
    const gap = 24;
    const cardWidth = originalCards[0].offsetWidth + gap;

    // Direct movement transform
    slider.style.transition = "transform 0.70s ease-out";
    slider.style.transform = `translateX(-${current * cardWidth}px)`;

    // Process scaling active classes safely across originals and clones
    Array.from(allCards).forEach((card, index) => {
      if (index === current || index === current + totalOriginals) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });

    // Update Dots indicator safely based on a modulo anchor calculation loop
    const activeDotIndex = current % totalOriginals;
    dots.forEach((dot, index) => {
      if (index === activeDotIndex) {
        dot.classList.remove("bg-gray-300", "w-3");
        dot.classList.add("bg-red-600", "w-6"); // Give the active dot an expanded pill shape
      } else {
        dot.classList.remove("bg-red-600", "w-6");
        dot.classList.add("bg-gray-300", "w-3");
      }
    });
  }

  // 3. Automated ticking timeline
  let scrollInterval = setInterval(nextSlide, 4000);

  function nextSlide() {
    if (isTransitioning) return;
    current++;
    updateSlider();

    // Loop Snapping: If we reach the cloned set, snap instantly back to index 0
    if (current === totalOriginals) {
      isTransitioning = true;

      // Wait exactly for the 700ms transition to finish before snapping
      setTimeout(() => {
        slider.style.transition = "none";
        current = 0;
        slider.style.transform = `translateX(0px)`;
        isTransitioning = false;
      }, 700);
    }
  }

  // Handle browser window resize events cleanly to recalculate card dimensions
  window.addEventListener("resize", () => {
    slider.style.transition = "none";
    updateSlider();
  });

  // Run initializer setup
  updateSlider();
});

// ============= FAQs Section =============
document.addEventListener("DOMContentLoaded", () => {
  const faqButtons = document.querySelectorAll(".faq-btn");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector(".faq-icon");

      const isOpen = content.style.maxHeight;

      document.querySelectorAll(".faq-content").forEach((item) => {
        item.style.maxHeight = null;
      });

      document.querySelectorAll(".faq-icon").forEach((item) => {
        item.textContent = "+";
      });

      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.textContent = "−";
      }
    });
  });
});
