// OTHER THAN WORKS — minimal interaction layer (no framework, no build step)

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.querySelector("[data-mobile-nav]");
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        panel.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  // Class filter chips on /classes/ — pure show/hide, no page reload.
  var chips = document.querySelectorAll("[data-filter]");
  var rows = document.querySelectorAll("[data-class-category]");
  if (chips.length && rows.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        var value = chip.getAttribute("data-filter");
        rows.forEach(function (row) {
          var match = value === "all" || row.getAttribute("data-class-category") === value;
          row.style.display = match ? "" : "none";
        });
      });
    });
  }
});
