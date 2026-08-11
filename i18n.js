(function () {
  "use strict";

  var STORAGE_KEY = "sr_lang";
  var SUPPORTED = ["en", "zh"];

  function detectInitial() {
    var url = new URL(window.location.href);
    var param = (url.searchParams.get("lang") || "").toLowerCase();
    if (SUPPORTED.indexOf(param) !== -1) return param;
    try {
      var saved = (localStorage.getItem(STORAGE_KEY) || "").toLowerCase();
      if (SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh" : "en";
  }

  function persist(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "en";
    var html = document.documentElement;
    html.setAttribute("lang", lang);
    if (lang === "zh") html.classList.add("lang-zh");
    else html.classList.remove("lang-zh");
    updateToggles(lang);
  }

  function updateToggles(lang) {
    var toggles = document.querySelectorAll(".lang-toggle");
    for (var i = 0; i < toggles.length; i++) {
      var spans = toggles[i].querySelectorAll("[data-lang-label]");
      for (var j = 0; j < spans.length; j++) {
        if (spans[j].getAttribute("data-lang-label") === lang) {
          spans[j].classList.add("active");
        } else {
          spans[j].classList.remove("active");
        }
      }
    }
  }

  function setLang(lang) {
    applyLang(lang);
    persist(lang);
  }

  window.__setLang = setLang;
  window.__getLang = function () {
    return document.documentElement.getAttribute("lang") || "en";
  };

  document.addEventListener("DOMContentLoaded", function () {
    var toggles = document.querySelectorAll(".lang-toggle");
    for (var i = 0; i < toggles.length; i++) {
      (function (toggle) {
        toggle.addEventListener("click", function (e) {
          var target = e.target.getAttribute && e.target.getAttribute("data-lang-label");
          if (target) { setLang(target); return; }
          setLang(window.__getLang() === "en" ? "zh" : "en");
        });
      })(toggles[i]);
    }
  });

  applyLang(detectInitial());
})();
