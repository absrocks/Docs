/* Accessibility fixes for elements that Material for MkDocs creates with
   JavaScript after the page loads, so they cannot be fixed at build time
   (see scripts/a11y_hooks.py for the build-time fixes).

   1. Wide tables. Material wraps every table in
      <div class="md-typeset__scrollwrap"> which scrolls sideways when the
      table is wider than the page, but it never makes the wrapper
      focusable, so keyboard users cannot scroll it (WCAG 2.1.1). When the
      wrapper overflows it gets tabindex="0" plus a role and a name, as a
      focusable element must have; when it does not, those are removed
      again so there is no pointless tab stop.

   2. Code blocks. Material gives <code class="md-code__content"> a
      tabindex="0" when it overflows, but no role, which scanners report
      as a focusable element without a role. Every code block gets
      role="group" and a name. The tabindex is also set here when the
      block overflows, because Material sets it from a resize observer a
      moment after the viewport changes.

   Runs on Material's document$ (so it survives instant navigation), on
   resize, and whenever nodes are added to the page. */
(function () {
  "use strict";

  function overflows(el) {
    return el.scrollWidth > el.clientWidth;
  }

  function fix() {
    var tables = document.querySelectorAll(".md-typeset__scrollwrap");
    for (var i = 0; i < tables.length; i++) {
      var wrap = tables[i];
      if (overflows(wrap)) {
        if (!wrap.hasAttribute("tabindex")) {
          wrap.setAttribute("tabindex", "0");
          wrap.setAttribute("role", "region");
          wrap.setAttribute("aria-label", "Scrollable table");
        }
      } else if (wrap.hasAttribute("tabindex")) {
        wrap.removeAttribute("tabindex");
        wrap.removeAttribute("role");
        wrap.removeAttribute("aria-label");
      }
    }

    var codes = document.querySelectorAll("code.md-code__content");
    for (var j = 0; j < codes.length; j++) {
      var code = codes[j];
      if (!code.hasAttribute("role")) {
        code.setAttribute("role", "group");
        code.setAttribute("aria-label", "Code block " + (j + 1));
      }
      if (overflows(code) && !code.hasAttribute("tabindex")) {
        code.setAttribute("tabindex", "0");
      }
    }
  }

  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(function () {
      scheduled = false;
      fix();
    });
  }

  // Only child-list changes are observed, so our own attribute changes
  // do not retrigger the observer.
  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  window.addEventListener("resize", schedule);

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(schedule);
  } else {
    schedule();
  }
})();
