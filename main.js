// Portfolio v2: hash router (view switching), scroll reveals, mobile nav.
// No frameworks, no build step. See MAINTAINING.md.

(function () {
  "use strict";

  var VIEWS = ["home", "about", "process", "portfolio", "contact"];
  var nav = document.getElementById("site-nav");
  var toggle = document.getElementById("nav-toggle");
  var navLinks = document.querySelectorAll("#nav-links a[data-view]");
  var viewEls = document.querySelectorAll(".view[data-view]");

  /* ---------- scroll reveals ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var io = null;

  if (!reduce && "IntersectionObserver" in window) {
    io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- hash router ---------- */
  function currentView() {
    var hash = location.hash.replace("#", "");
    return VIEWS.indexOf(hash) !== -1 ? hash : "home";
  }

  function showView(name) {
    viewEls.forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-view") === name);
    });
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-view") === name);
    });
    closeMenu();
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", function () { showView(currentView()); });
  showView(currentView()); // initial load (handles direct links like /#portfolio)

  /* ---------- mobile nav ---------- */
  function closeMenu() {
    if (!nav) return;
    nav.classList.remove("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
})();
