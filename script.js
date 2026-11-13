(function () {
  const header = document.getElementById("header");
  const layers = document.querySelectorAll(".glass-layer");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Header state
  function onScrollHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
  }

  // Cinematic glass layers move at different depths
  function onScrollLayers() {
    if (prefersReduced || !layers.length) return;
    const y = window.scrollY;
    const vh = window.innerHeight;

    layers.forEach((layer, i) => {
      const depth = (i + 1) * 0.18;
      const offset = y * depth;
      const opacity = 0.25 + Math.min(0.35, (y / (vh * 2)) * 0.4);
      layer.style.transform = `translate3d(0, ${offset * 0.35}px, ${-80 * (i + 1)}px) scale(${1.04 + i * 0.03})`;
      layer.style.opacity = String(Math.min(0.55, opacity));
    });
  }

  function onScroll() {
    onScrollHeader();
    onScrollLayers();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // ── Continuous 3D mesh / network background ──
  const canvas = document.getElementById("stars");
  if (!canvas) return;

  if (prefersReduced) {
    canvas.style.opacity = "0.35";
    return;
  }

  const ctx = canvas.getContext("2d", { alpha: true });
  let width = 0;
  let height = 0;
  let dpr = 1;
  let nodes = [];
  let particles = [];
  let animationId = 0;
  let time = 0;
  let mouseX = 0.5;
  let mouseY = 0.5;
  let targetMouseX = 0.5;
  let targetMouseY = 0.5;

  const ACCENT = { r: 124, g: 255, b: 107 };
  const LINK_DIST = 160;
  const LINK_DIST_SQ = LINK_DIST * LINK_DIST;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createField();
  }

  function createField() {
    const area = width * height;
    const nodeCount = Math.min(70, Math.max(28, Math.floor(area / 18000)));
    const particleCount = Math.min(40, Math.max(12, Math.floor(area / 32000)));

    nodes = Array.from({ length: nodeCount }, () => {
      const z = 0.35 + Math.random() * 0.65;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx: (Math.random() - 0.5) * (0.18 + z * 0.25),
        vy: (Math.random() - 0.5) * (0.18 + z * 0.25),
        phase: Math.random() * Math.PI * 2,
        pulse: 0.6 + Math.random() * 0.8,
      };
    });

    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: 0.2 + Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.15 - Math.random() * 0.4,
      size: 0.6 + Math.random() * 1.4,
      alpha: 0.15 + Math.random() * 0.4,
    }));
  }

  function project(n) {
    const parallaxX = (mouseX - 0.5) * 28 * n.z;
    const parallaxY = (mouseY - 0.5) * 18 * n.z;
    const scale = 0.55 + n.z * 0.55;
    return {
      x: n.x + parallaxX,
      y: n.y + parallaxY,
      r: (1.2 + n.z * 2.2) * scale,
      alpha: 0.25 + n.z * 0.55,
    };
  }

  function stepNodes() {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      n.phase += 0.012 * n.pulse;
      if (n.x < -40) n.x = width + 40;
      if (n.x > width + 40) n.x = -40;
      if (n.y < -40) n.y = height + 40;
      if (n.y > height + 40) n.y = -40;
    }

    for (const p of particles) {
      p.x += p.vx + Math.sin(time * 0.001 + p.y * 0.01) * 0.15;
      p.y += p.vy;
      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
    }
  }

  function drawGrid() {
    const horizon = height * 0.42;
    const vanishX = width * 0.5 + (mouseX - 0.5) * 80;
    const offset = (time * 0.04) % 48;

    ctx.save();
    ctx.strokeStyle = "rgba(124, 255, 107, 0.045)";
    ctx.lineWidth = 1;

    for (let i = 0; i < 18; i++) {
      const t = i / 17;
      const y = horizon + Math.pow(t, 1.6) * (height - horizon + 40) - offset * (0.3 + t);
      if (y < horizon || y > height + 20) continue;
      const spread = 0.15 + t * 0.85;
      ctx.beginPath();
      ctx.moveTo(vanishX - width * spread, y);
      ctx.lineTo(vanishX + width * spread, y);
      ctx.globalAlpha = 0.35 * (1 - t * 0.7);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(124, 255, 107, 0.04)";
    for (let i = -12; i <= 12; i++) {
      const angle = (i / 12) * 0.9;
      const x2 = vanishX + Math.sin(angle) * width * 1.2;
      const y2 = height + 40;
      ctx.beginPath();
      ctx.moveTo(vanishX, horizon);
      ctx.lineTo(x2, y2);
      ctx.globalAlpha = 0.5;
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawConnections(projected) {
    ctx.lineWidth = 1;
    for (let i = 0; i < projected.length; i++) {
      const a = projected[i];
      for (let j = i + 1; j < projected.length; j++) {
        const b = projected[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;
        if (distSq > LINK_DIST_SQ) continue;
        const dist = Math.sqrt(distSq);
        const strength = 1 - dist / LINK_DIST;
        const alpha = strength * strength * 0.35 * Math.min(a.alpha, b.alpha);
        ctx.strokeStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  function drawNodes(projected) {
    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];
      const n = nodes[i];
      const glow = 0.5 + 0.5 * Math.sin(n.phase);
      const r = p.r * (0.85 + glow * 0.25);

      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 6);
      g.addColorStop(0, `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${0.18 * p.alpha * glow})`);
      g.addColorStop(1, `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210, 255, 200, ${0.55 * p.alpha + 0.2 * glow})`;
      ctx.fill();
    }
  }

  function drawParticles() {
    for (const p of particles) {
      const px = p.x + (mouseX - 0.5) * 12 * p.z;
      const py = p.y + (mouseY - 0.5) * 8 * p.z;
      ctx.beginPath();
      ctx.arc(px, py, p.size * p.z, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 255, 190, ${p.alpha * p.z})`;
      ctx.fill();
    }
  }

  function drawFloatingRings() {
    const cx = width * 0.72 + Math.sin(time * 0.00025) * 40;
    const cy = height * 0.28 + Math.cos(time * 0.0002) * 30;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(time * 0.00015);
    ctx.scale(1, 0.45);
    for (let i = 0; i < 3; i++) {
      const radius = 90 + i * 55 + Math.sin(time * 0.0004 + i) * 8;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(124, 255, 107, ${0.06 - i * 0.015})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
    ctx.restore();

    const cx2 = width * 0.2 + Math.cos(time * 0.0002) * 30;
    const cy2 = height * 0.65 + Math.sin(time * 0.00018) * 25;
    ctx.save();
    ctx.translate(cx2, cy2);
    ctx.rotate(-time * 0.00012);
    ctx.scale(1, 0.4);
    for (let i = 0; i < 2; i++) {
      const radius = 70 + i * 50;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(124, 255, 107, ${0.05 - i * 0.015})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  function frame(ts) {
    time = ts;
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    ctx.clearRect(0, 0, width, height);

    drawGrid();
    drawFloatingRings();
    stepNodes();

    const projected = nodes.map(project);
    drawConnections(projected);
    drawNodes(projected);
    drawParticles();

    animationId = requestAnimationFrame(frame);
  }

  window.addEventListener(
    "pointermove",
    (e) => {
      targetMouseX = e.clientX / width;
      targetMouseY = e.clientY / height;
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animationId = requestAnimationFrame(frame);
    }
  });

  resize();
  animationId = requestAnimationFrame(frame);
  window.addEventListener("resize", resize, { passive: true });
})();
