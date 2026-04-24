/* =========================================================
   Ali Karami — Portfolio interactions
   - Theme toggle (persisted, respects prefers-color-scheme)
   - Sticky nav shadow-on-scroll
   - Active section highlighting via IntersectionObserver
   - Scroll-reveal for .reveal elements
   - Mobile menu toggle
   - Graceful image fallback (keeps portrait placeholder)
   ========================================================= */

(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Theme ---------- */
  const THEME_KEY = "ak-theme";
  const root = document.documentElement;

  const systemPrefersDark = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getInitialTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return systemPrefersDark() ? "dark" : "light";
  };

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#07090f" : "#fbfbfd");
  };

  applyTheme(getInitialTheme());

  const themeBtn = $("#theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // React to system preference changes only if user hasn't explicitly chosen
  if (window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    (mq.addEventListener || mq.addListener).call(mq, "change", (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  }

  /* ---------- Nav scroll state ---------- */
  const nav = $("[data-nav]");
  const setNavState = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });

  /* ---------- Active section highlighting ---------- */
  const navLinks = $$(".nav__links a");
  const sections = navLinks
    .map((a) => {
      const id = a.getAttribute("href");
      if (!id || !id.startsWith("#")) return null;
      const el = document.querySelector(id);
      return el ? { el, link: a } : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("is-active"));
            const match = sections.find((s) => s.el === entry.target);
            if (match) match.link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s.el));
  }

  /* ---------- Scroll-reveal ---------- */
  const revealables = $$(".reveal");
  if ("IntersectionObserver" in window && revealables.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealables.forEach((el) => revealObserver.observe(el));

    // Safety net: guarantee everything eventually becomes visible in weird
    // environments (headless screenshots, print, broken observer, etc.)
    window.setTimeout(() => {
      revealables.forEach((el) => el.classList.add("is-visible"));
    }, 2500);
  } else {
    revealables.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = $("#menu-toggle");
  const menu = $(".nav__links");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    menu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        menu.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("click", (e) => {
      if (
        menu.classList.contains("is-open") &&
        !menu.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        menu.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Portrait image graceful fallback ----------
     If profile.jpg is missing, hide the <img> so the CSS
     ::before/::after placeholder (monogram "AK") shows cleanly. */
  const portraitImg = document.querySelector(".portrait img");
  if (portraitImg) {
    const hideIfMissing = () => {
      portraitImg.style.display = "none";
    };
    portraitImg.addEventListener("error", hideIfMissing, { once: true });
    portraitImg.addEventListener("load", () => {
      if (portraitImg.naturalWidth === 0) hideIfMissing();
    });
    // If the image already finished loading (or failed) before this
    // script attached its listener, handle it right now.
    if (portraitImg.complete) {
      if (portraitImg.naturalWidth === 0) hideIfMissing();
    }
  }

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
