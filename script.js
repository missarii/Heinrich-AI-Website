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

  // Reveal on scroll (cinematic entrance)
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

  // Starfield
  const canvas = document.getElementById("stars");
  if (!canvas || prefersReduced) return;

  const ctx = canvas.getContext("2d");
  let width, height, stars, animationId;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createStars();
  }

  function createStars() {
    const count = Math.min(220, Math.floor((width * height) / 12000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.15 + 0.15,
      a: Math.random() * 0.45 + 0.12,
      tw: Math.random() * Math.PI * 2,
      sp: 0.003 + Math.random() * 0.01,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const s of stars) {
      s.tw += s.sp;
      const alpha = s.a * (0.5 + 0.5 * Math.sin(s.tw));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      // Soft green-white stars to match logo accent
      ctx.fillStyle = `rgba(200, 255, 190, ${alpha})`;
      ctx.fill();
    }
    animationId = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      draw();
    }
  });
})();