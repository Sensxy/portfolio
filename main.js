// Ozan Hessick — portfolio interactions. No dependencies.
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Speed lines that converge on the cursor ─────────────
     Classic manga focus lines: thin wedges from the panel edge
     toward a focal point, leaving a clear oval around it.      */
  function speedLines(canvas, { count = 150, color = "#000", follow = true } = {}) {
    if (!canvas) return;
    const panel = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const seed = Array.from({ length: count }, (_, i) => ({
      a: (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.05,
      w: 0.004 + Math.random() * 0.016,          // wedge width (radians)
      inner: 0.55 + Math.random() * 0.5,         // where the line stops, as share of clear radius
    }));
    let w = 0, h = 0, dpr = 1;
    const target = { x: 0.68, y: 0.42 };          // focus in panel-relative units
    const focus = { ...target };
    let raf = 0;

    function resize() {
      const r = panel.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      draw();
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const fx = focus.x * w, fy = focus.y * h;
      const far = Math.hypot(Math.max(fx, w - fx), Math.max(fy, h - fy)) + 20;
      const clear = Math.min(w, h) * 0.34;
      ctx.fillStyle = color;
      for (const l of seed) {
        const r0 = clear * l.inner;
        ctx.beginPath();
        ctx.moveTo(fx + Math.cos(l.a) * r0, fy + Math.sin(l.a) * r0 * 0.8);
        ctx.lineTo(fx + Math.cos(l.a - l.w) * far, fy + Math.sin(l.a - l.w) * far);
        ctx.lineTo(fx + Math.cos(l.a + l.w) * far, fy + Math.sin(l.a + l.w) * far);
        ctx.closePath();
        ctx.fill();
      }
    }

    function tick() {
      focus.x += (target.x - focus.x) * 0.18;
      focus.y += (target.y - focus.y) * 0.18;
      draw();
      if (Math.abs(target.x - focus.x) + Math.abs(target.y - focus.y) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    }

    if (follow && !reduceMotion) {
      panel.addEventListener("pointermove", (e) => {
        const r = panel.getBoundingClientRect();
        target.x = (e.clientX - r.left) / r.width;
        target.y = (e.clientY - r.top) / r.height;
        if (!raf) raf = requestAnimationFrame(tick);
      });
      panel.addEventListener("pointerleave", () => {
        target.x = 0.68; target.y = 0.42;
        if (!raf) raf = requestAnimationFrame(tick);
      });
    }
    new ResizeObserver(resize).observe(panel);
  }

  speedLines(document.getElementById("speedlines"));
  speedLines(document.getElementById("speedlines-end"), { count: 110, color: "#8A8F98" });

  /* ── Page counter + current chapter in the masthead ────── */
  const pages = [...document.querySelectorAll("[data-page]")];
  const nowEl = document.getElementById("page-now");
  document.getElementById("page-total").textContent = pages.length;
  const navLinks = [...document.querySelectorAll(".chapters a")];
  let current = 0;

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      current = pages.indexOf(e.target);
      nowEl.textContent = current + 1;
      navLinks.forEach((a) => a.setAttribute("aria-current", String(a.hash === "#" + e.target.id)));
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  pages.forEach((p) => io.observe(p));

  /* ── Turn the page with arrow keys ─────────────────────── */
  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (document.querySelector("dialog[open]")) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName)) return;
    let next = null;
    if (e.key === "ArrowRight") next = Math.min(current + 1, pages.length - 1);
    if (e.key === "ArrowLeft") next = Math.max(current - 1, 0);
    if (next === null) return;
    e.preventDefault();
    pages[next].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ── Project panels open a full spread ─────────────────── */
  document.querySelectorAll("[data-open]").forEach((btn) => {
    const dlg = document.getElementById("dlg-" + btn.dataset.open);
    btn.addEventListener("click", () => dlg.showModal());
    dlg.addEventListener("close", () => btn.focus());
  });
  document.querySelectorAll("dialog.spreadview").forEach((dlg) => {
    dlg.querySelector("[data-close]").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });  // backdrop
  });
})();
