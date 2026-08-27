/* =========================================================================
   LUMEN STUDIO — script.js
   Features: Nav toggle, Dark mode, Scroll-to-top, Image slider,
             FAQ accordion, Form validation, Animated counters,
             Typing animation
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {
  initNav();
  initDarkMode();
  initScrollTop();
  initSlider();
  initAccordion();
  initFormValidation();
  initCounters();
  initTypingAnimation();
});

/* -------------------------------------------------------------------------
   1. Responsive Navigation Menu
   ------------------------------------------------------------------------- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    toggle.classList.toggle("open");
    links.classList.toggle("open");
  });

  // Close menu when a link is clicked (mobile)
  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      toggle.classList.remove("open");
      links.classList.remove("open");
    });
  });
}

/* -------------------------------------------------------------------------
   2. Dark Mode Toggle (persists via localStorage)
   ------------------------------------------------------------------------- */
function initDarkMode() {
  const btn = document.querySelector(".theme-toggle");
  const root = document.documentElement;
  const saved = localStorage.getItem("lumen-theme");

  if (saved === "dark") {
    root.setAttribute("data-theme", "dark");
    if (btn) btn.textContent = "☀";
  }

  if (!btn) return;
  btn.addEventListener("click", function () {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("lumen-theme", "light");
      btn.textContent = "☾";
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("lumen-theme", "dark");
      btn.textContent = "☀";
    }
  });
}

/* -------------------------------------------------------------------------
   3. Scroll-to-Top Button
   ------------------------------------------------------------------------- */
function initScrollTop() {
  const btn = document.querySelector(".scroll-top");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 480) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* -------------------------------------------------------------------------
   4. Image Slider (autoplay + arrows + dots)
   ------------------------------------------------------------------------- */
function initSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  const track = slider.querySelector(".slider-track");
  const slides = Array.from(slider.querySelectorAll(".slide"));
  const dotsWrap = slider.parentElement.querySelector(".slider-dots");
  const prevBtn = slider.querySelector(".slider-prev");
  const nextBtn = slider.querySelector(".slider-next");
  let index = 0;
  let timer;

  // Build dots dynamically
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    slides.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.className = "slider-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
        resetTimer();
      });
      dotsWrap.appendChild(dot);
    });
  }

  function update() {
    track.style.transform = "translateX(-" + index * 100 + "%)";
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach(function (dot, i) {
        dot.classList.toggle("active", i === index);
      });
    }
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  if (nextBtn) nextBtn.addEventListener("click", function () { next(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); resetTimer(); });

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 4500);
  }

  resetTimer();
}

/* -------------------------------------------------------------------------
   5. FAQ Accordion
   ------------------------------------------------------------------------- */
function initAccordion() {
  const items = document.querySelectorAll(".accordion-item");
  if (!items.length) return;

  items.forEach(function (item) {
    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");

    trigger.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");

      // Close all other items (single-open accordion)
      items.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".accordion-panel").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}

/* -------------------------------------------------------------------------
   6. Contact Form Validation
   ------------------------------------------------------------------------- */
function initFormValidation() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const successBox = form.querySelector(".form-success");

  const validators = {
    name: function (v) { return v.trim().length >= 2 ? "" : "Please enter your full name."; },
    email: function (v) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(v.trim()) ? "" : "Please enter a valid email address.";
    },
    subject: function (v) { return v.trim().length >= 3 ? "" : "Please enter a subject."; },
    message: function (v) { return v.trim().length >= 10 ? "" : "Message should be at least 10 characters."; }
  };

  function showError(field, message) {
    const input = form.querySelector("#" + field);
    const errorEl = form.querySelector('[data-error-for="' + field + '"]');
    if (message) {
      input.classList.add("error");
      if (errorEl) { errorEl.textContent = message; errorEl.classList.add("show"); }
    } else {
      input.classList.remove("error");
      if (errorEl) { errorEl.classList.remove("show"); }
    }
  }

  // Live validation as user types
  Object.keys(validators).forEach(function (field) {
    const input = form.querySelector("#" + field);
    if (!input) return;
    input.addEventListener("blur", function () {
      showError(field, validators[field](input.value));
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    Object.keys(validators).forEach(function (field) {
      const input = form.querySelector("#" + field);
      if (!input) return;
      const message = validators[field](input.value);
      showError(field, message);
      if (message) valid = false;
    });

    if (valid) {
      form.reset();
      if (successBox) successBox.classList.add("show");
      setTimeout(function () {
        if (successBox) successBox.classList.remove("show");
      }, 4500);
    }
  });
}

/* -------------------------------------------------------------------------
   7. Animated Counters (trigger when scrolled into view)
   ------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll(".stat-num[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(function (el) { observer.observe(el); });

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(tick);
  }
}

/* -------------------------------------------------------------------------
   8. Typing Animation (hero tagline)
   ------------------------------------------------------------------------- */
function initTypingAnimation() {
  const el = document.querySelector(".typed-text");
  if (!el) return;

  const phrases = JSON.parse(el.getAttribute("data-phrases") || "[]");
  if (!phrases.length) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 55);
  }
  tick();
}

/* -------------------------------------------------------------------------
   Scroll-reveal for .animate-in elements (small extra polish)
   ------------------------------------------------------------------------- */
(function initScrollReveal() {
  const els = document.querySelectorAll(".animate-in");
  if (!els.length) return;
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(function (el) { obs.observe(el); });
})();

/* -------------------------------------------------------------------------
   Portfolio filter (bonus interactivity, used on portfolio.html)
   ------------------------------------------------------------------------- */
(function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".portfolio-item");
  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");

      items.forEach(function (item) {
        const match = category === "all" || item.getAttribute("data-category") === category;
        item.style.display = match ? "" : "none";
      });
    });
  });
})();
