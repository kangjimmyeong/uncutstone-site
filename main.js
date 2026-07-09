(function () {
  "use strict";

  /* ---------- language toggle (EN default, KR via toggle) ---------- */
  var toggle = document.getElementById("lang-toggle");

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-en]").forEach(function (el) {
      var text = el.getAttribute(lang === "ko" ? "data-ko" : "data-en");
      if (text) el.textContent = text;
    });
    document.querySelectorAll("img[data-alt-ko]").forEach(function (img) {
      if (!img.dataset.altEn) img.dataset.altEn = img.getAttribute("alt");
      img.setAttribute("alt", lang === "ko" ? img.dataset.altKo : img.dataset.altEn);
    });
    toggle.textContent = lang === "ko" ? "English" : "한국어";
    try { localStorage.setItem("lang", lang); } catch (e) { /* private mode */ }
  }

  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) { /* private mode */ }
  var initial = saved || ((navigator.language || "").indexOf("ko") === 0 ? "ko" : "en");
  if (initial === "ko") applyLang("ko");

  toggle.addEventListener("click", function () {
    applyLang(document.documentElement.lang === "ko" ? "en" : "ko");
  });

  /* ---------- reveal on scroll (respects prefers-reduced-motion via CSS) ---------- */
  var sections = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    sections.forEach(function (s) { io.observe(s); });
  } else {
    sections.forEach(function (s) { s.classList.add("in"); });
  }
})();
