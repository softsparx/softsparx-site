(() => {
  "use strict";

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Nav: scrolled state + mobile menu
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // Reveal-on-scroll
  const revealTargets = document.querySelectorAll(
    ".card, .steps li, .link, .tags, .section__head, .cta, .split > div"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("in"));
  }

  // Hero: parity check animation
  const list = document.getElementById("checks");
  const status = document.getElementById("parityStatus");
  const count = document.getElementById("parityCount");
  if (!list) return;

  const rows = [...list.querySelectorAll("li")];
  rows.forEach((li) => {
    li.innerHTML =
      `<span class="v">${li.dataset.src}</span>` +
      `<span class="m"></span>` +
      `<span class="v">${li.dataset.tgt}</span>` +
      `<em>${li.querySelector("em").textContent}</em>`;
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const setDone = (n) => {
    count.textContent = `${n} / ${rows.length} matched`;
  };

  async function run() {
    rows.forEach((li) => (li.className = ""));
    status.textContent = "running…";
    status.classList.remove("done");
    setDone(0);
    for (let i = 0; i < rows.length; i++) {
      rows[i].classList.add("run");
      await wait(520);
      rows[i].classList.replace("run", "ok");
      setDone(i + 1);
      await wait(180);
    }
    status.textContent = "full parity ✓";
    status.classList.add("done");
    await wait(4200);
    run();
  }

  if (reduce) {
    rows.forEach((li) => li.classList.add("ok"));
    status.textContent = "full parity ✓";
    status.classList.add("done");
    setDone(rows.length);
  } else {
    run();
  }
})();
