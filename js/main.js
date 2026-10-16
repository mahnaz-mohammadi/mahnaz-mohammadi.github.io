/* Mahnaz Mohammadi — Portfolio main.js */
(function () {
  "use strict";

  /* Mobile hamburger menu */
  const toggle = document.querySelector(".nav-toggle");
  const list = document.querySelector(".nav-list");
  if (toggle && list) {
    toggle.addEventListener("click", () => {
      const open = list.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    list.addEventListener("click", (e) => {
      if (e.target.matches("a")) {
        list.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Dark mode toggle (remembers choice) */
  const themeBtn = document.querySelector(".theme-toggle");
  const root = document.documentElement;
  let stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) { /* noop */ }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (stored === "dark" || (!stored && prefersDark)) root.setAttribute("data-theme", "dark");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const dark = root.getAttribute("data-theme") === "dark";
      root.setAttribute("data-theme", dark ? "light" : "dark");
      try { localStorage.setItem("theme", dark ? "light" : "dark"); } catch (e) { /* noop */ }
    });
  }

  /* Fade-in on scroll */
  const fadeItems = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeItems.forEach((el) => io.observe(el));
  } else {
    fadeItems.forEach((el) => el.classList.add("visible"));
  }

  /* Back to top */
  const toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener(
      "scroll",
      () => toTop.classList.toggle("show", window.scrollY > 400),
      { passive: true }
    );
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }
})();
