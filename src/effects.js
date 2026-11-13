export function initializeEffects() {
  // Track browser resources so unmounting and hot reload do not duplicate effects.
  let disposed = false;
  const subscriptions = [];
  const observers = [];
  const frames = new Set();
  const timers = new Set();
  function listen(target, type, callback, options) {
    target.addEventListener(type, callback, options);
    subscriptions.push(() =>
      target.removeEventListener(type, callback, options),
    );
  }
  const IntersectionObserver = class extends window.IntersectionObserver {
    constructor(...args) {
      super(...args);
      observers.push(this);
    }
  };
  const ResizeObserver = class extends window.ResizeObserver {
    constructor(...args) {
      super(...args);
      observers.push(this);
    }
  };
  function requestAnimationFrame(callback) {
    if (disposed) return 0;
    const id = window.requestAnimationFrame((time) => {
      frames.delete(id);
      if (!disposed) callback(time);
    });
    frames.add(id);
    return id;
  }
  function cancelAnimationFrame(id) {
    frames.delete(id);
    window.cancelAnimationFrame(id);
  }
  function setTimeout(callback, delay) {
    const id = window.setTimeout(() => {
      timers.delete(id);
      if (!disposed) callback();
    }, delay);
    timers.add(id);
    return id;
  }
  function clearTimeout(id) {
    timers.delete(id);
    window.clearTimeout(id);
  }
  const pendingRequests = new Set();
  const AbortController = class extends window.AbortController {
    constructor() {
      super();
      pendingRequests.add(this);
    }
  };

  const compactView = matchMedia("(max-width: 900px)");
  const lightweightScene =
    compactView.matches || matchMedia("(pointer: coarse)").matches;
  const motion = true;
  function setMotion() {
    document.documentElement.classList.add("js-motion");
    update();
  }
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      }),
    {
      threshold: 0.08,
    },
  );
  document.querySelectorAll(".reveal").forEach((x) => observer.observe(x));
  let px = 0,
    py = 0,
    scheduled = false;
  const laptop = document.querySelector(".laptop");
  function update() {
    const y = window.scrollY;
    document.querySelector(".progress").style.width =
      (y / Math.max(1, document.documentElement.scrollHeight - innerHeight)) *
        100 +
      "%";
    laptop.style.transform = motion
      ? `translateY(${Math.min(y * 0.1, 55)}px) rotateX(${8 + py + Math.min(y * 0.025, 15)}deg) rotateY(${-24 + px + Math.min(y * 0.045, 35)}deg) rotateZ(${9 - Math.min(y * 0.008, 6)}deg)`
      : "rotateX(8deg) rotateY(-24deg) rotateZ(9deg)";
    scheduled = false;
  }
  function queue() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }
  listen(document.querySelector(".hero"), "pointermove", (e) => {
    if (e.pointerType === "mouse") {
      px = (e.clientX / innerWidth - 0.5) * 14;
      py = (e.clientY / innerHeight - 0.5) * -8;
      queue();
    }
  });
  document.querySelectorAll(".art").forEach((a) => {
    listen(a, "pointermove", (e) => {
      if (!motion || e.pointerType !== "mouse") return;
      let r = a.getBoundingClientRect();
      a.style.transform = `perspective(900px) rotateX(${-(e.clientY - r.top - r.height / 2) / 24}deg) rotateY(${(e.clientX - r.left - r.width / 2) / 30}deg)`;
    });
    listen(a, "pointerleave", () => (a.style.transform = ""));
  });
  document
    .querySelectorAll(".art img")
    .forEach((img) => listen(img, "error", () => (img.style.display = "none")));
  document.querySelector("#year").textContent = new Date().getFullYear();
  setMotion();
  // Scroll choreography and a real-time, ray-marched metallic sculpture.
  const showcase = document.querySelector(".scroll-showcase"),
    storyCards = [...document.querySelectorAll(".story-card")];
  function choreograph() {
    if (compactView.matches) {
      storyCards.forEach((card, i) => {
        const phase = Math.max(
          -1,
          Math.min(
            1,
            (layoutTop(card) - scrollY - innerHeight * 0.4) / innerHeight,
          ),
        );
        card.style.transform = `perspective(900px) translateY(${phase * 10}px) rotateX(${phase * 3}deg)`;
        card.style.filter = "none";
        card.style.opacity = 1;
        card.style.zIndex = "auto";
        card.inert = false;
        card.setAttribute("aria-hidden", "false");
        card.querySelector(".device").style.transform =
          `rotateY(${phase * 8}deg) rotateZ(${i === 1 ? -4 : 3}deg)`;
      });
      return;
    }
    const bounds = showcase.getBoundingClientRect(),
      range = Math.max(1, showcase.offsetHeight - innerHeight),
      p = Math.max(0, Math.min(1, -bounds.top / range)) * 2.45;
    let current = Math.min(2, Math.floor(p + 0.15));
    document.querySelector("#chapter").textContent = "0" + (current + 1);
    document
      .querySelectorAll(".showcase-track span")
      .forEach((x, i) => x.classList.toggle("active", i <= current));
    storyCards.forEach((card, i) => {
      let entry = Math.max(0, Math.min(1, p - (i - 1))),
        age = Math.max(0, p - i);
      if (i === 0) entry = 1;
      let offset = (1 - entry) * (innerHeight * 0.9);
      card.style.transform = motion
        ? `translateY(${offset + Math.min(age, 2) * 14}px) scale(${1 - Math.min(age, 2) * 0.065}) rotateX(${(1 - entry) * 9}deg)`
        : "none";
      card.style.filter = motion ? `blur(${Math.min(age, 2) * 2}px)` : "none";
      card.style.opacity = i === 0 || entry > 0 || !motion ? 1 : 0;
      card.style.zIndex = i + 1;
      const active = !motion || i === current;
      card.inert = !active;
      card.setAttribute("aria-hidden", String(!active));
      card.querySelector(".device").style.transform = motion
        ? `rotateY(${(i === 1 ? 20 : -17) + (entry - 0.5) * 16}deg) rotateX(${5 + age * 5}deg) rotateZ(${i === 1 ? -8 : 5}deg)`
        : "none";
    });
    document
      .querySelector(".contact")
      .style.setProperty("--contact-turn", scrollY * 0.045 + "deg");
  }
  let choreoQueued = false;
  function scheduleChoreo() {
    if (choreoQueued) return;
    choreoQueued = true;
    requestAnimationFrame(() => {
      choreograph();
      choreoQueued = false;
    });
  }
  listen(window, "resize", scheduleChoreo);
  document
    .querySelectorAll(".story-link")
    .forEach((a) =>
      listen(a, "click", () =>
        document.querySelector(`[data-filter="${a.dataset.category}"]`).click(),
      ),
    );
  choreograph();
  // Layout coordinates stay stable while the visual layers rotate in 3D.
  const depthTargets = [];
  function addDepth(selector, kind) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.remove("reveal");
      el.classList.add("depth-motion");
      depthTargets.push({
        el,
        kind,
        i,
        top: 0,
        height: 0,
      });
    });
  }
  addDepth(".hero-copy", "hero");
  addDepth(".contact-grid > div", "form");
  addDepth("footer", "heading");
  addDepth(".project", "project");
  addDepth(".about > div", "about");
  addDepth(".skillrow", "skill");
  addDepth(".services > div", "service");
  addDepth(".sectionhead", "heading");
  addDepth(".contact > h2", "contact");
  addDepth(".contact > .label, .contact > p, .contact > .socials", "heading");
  function layoutTop(el) {
    let top = 0;
    for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
    return top;
  }
  function measureDepth() {
    if (disposed) return;
    depthTargets.forEach((t) => {
      t.top = layoutTop(t.el);
      t.height = t.el.offsetHeight;
    });
    scheduleDepth();
  }
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  function renderDepth() {
    const vh = innerHeight,
      y = scrollY,
      mobile = innerWidth <= 900;
    depthTargets.forEach((t) => {
      if (t.el.hidden || t.top - y > vh + 200 || t.top + t.height - y < -200)
        return;
      const phase = clamp(
          (t.top + t.height / 2 - y - vh * 0.5) / (vh * 0.78),
          -1,
          1,
        ),
        entry = Math.max(0, phase),
        side = t.i % 2 ? 1 : -1;
      let dy = 0,
        rx = 0,
        ry = 0,
        rz = 0,
        scale = 1;
      if (t.kind === "project") {
        const arrival = clamp(phase + (mobile ? 0 : (t.i % 2) * 0.12), -1, 1);
        dy = arrival * (mobile ? 45 : 85);
        rx = arrival * (mobile ? 12 : 21);
        ry = side * arrival * (mobile ? 8 : 24);
        rz = side * arrival * (mobile ? 1 : 3);
        scale = 1 - Math.max(0, arrival) * 0.09;
        t.el.style.setProperty(
          "--image-scale",
          (1.04 + Math.abs(arrival) * 0.12).toFixed(3),
        );
        t.el.style.setProperty("--image-y", (-arrival * 16).toFixed(2) + "px");
      }
      if (t.kind === "about") {
        dy = phase * (mobile ? 40 : 70);
        ry = side * phase * (mobile ? 16 : 30);
        rx = phase * 9;
        rz = side * phase * 2;
        scale = 1 - entry * 0.04;
      }
      if (t.kind === "skill") {
        dy = phase * 45;
        rx = phase * (mobile ? 20 : 32);
        ry = side * phase * 9;
        scale = 1 - entry * 0.06;
      }
      if (t.kind === "service") {
        dy = phase * 65;
        ry = side * phase * (mobile ? 18 : 28);
        rx = phase * 18;
        rz = side * phase * 4;
        scale = 1 - entry * 0.06;
      }
      if (t.kind === "heading") {
        dy = phase * 35;
        rx = phase * 16;
      }
      if (t.kind === "contact") {
        dy = phase * 50;
        rx = phase * 26;
        scale = 1 - entry * 0.1;
      }
      if (t.kind === "form") {
        dy = phase * 45;
        rx = entry * 12;
        ry = side * entry * (mobile ? 5 : 12);
      }
      if (t.kind === "hero") {
        dy = -phase * 35;
        rx = phase * 9;
        ry = phase * 5;
      }
      if (mobile) {
        dy *= 0.28;
        rx *= 0.24;
        ry *= 0.24;
        rz = 0;
        scale = 1 - (1 - scale) * 0.3;
        if (
          t.kind === "heading" ||
          t.kind === "hero" ||
          t.kind === "contact" ||
          t.kind === "form"
        ) {
          dy = rx = ry = rz = 0;
          scale = 1;
        }
      }
      const st = t.el.style;
      st.setProperty("--dy", dy.toFixed(2) + "px");
      st.setProperty("--rx", rx.toFixed(2) + "deg");
      st.setProperty("--ry", ry.toFixed(2) + "deg");
      st.setProperty("--rz", rz.toFixed(2) + "deg");
      st.setProperty("--scale", scale.toFixed(4));
    });
    depthPending = false;
  }
  let depthPending = false;
  function scheduleDepth() {
    if (!depthPending) {
      depthPending = true;
      requestAnimationFrame(renderDepth);
    }
  }
  listen(window, "resize", measureDepth);
  document
    .querySelectorAll("img")
    .forEach((img) => listen(img, "load", measureDepth));
  if (typeof ResizeObserver !== "undefined")
    new ResizeObserver(measureDepth).observe(document.querySelector("main"));
  if (document.fonts) document.fonts.ready.then(measureDepth);
  listen(window, "portfolio:filter", measureDepth);
  measureDepth();

  // Header unfolds as the gallery enters, and replays on return.
  const workTitle = document.querySelector(".work-title");
  let workFrame = 0;
  function animateWorkTitle() {
    workFrame = 0;
    const distance = layoutTop(workTitle) - scrollY;
    const entry = clamp(
      (distance - innerHeight * 0.3) / (innerHeight * 0.65),
      0,
      1,
    );
    workTitle.style.setProperty(
      "--title-lift",
      entry * (compactView.matches ? 8 : 45) + "px",
    );
    workTitle.style.setProperty(
      "--title-shift",
      entry * (compactView.matches ? 0 : 45) + "px",
    );
    workTitle.style.setProperty(
      "--title-turn",
      entry * (compactView.matches ? 7 : 48) + "deg",
    );
  }
  function queueWorkTitle() {
    if (!workFrame) workFrame = requestAnimationFrame(animateWorkTitle);
  }
  listen(window, "resize", queueWorkTitle);
  if (document.fonts) document.fonts.ready.then(queueWorkTitle);
  queueWorkTitle();
  document.querySelectorAll("#work .project").forEach((card) => {
    listen(card, "pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = card.getBoundingClientRect();
      card.style.setProperty(
        "--mx",
        ((e.clientX - r.left) / r.width) * 100 + "%",
      );
      card.style.setProperty(
        "--my",
        ((e.clientY - r.top) / r.height) * 100 + "%",
      );
    });
    listen(card, "pointerleave", () => {
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
    });
  });

  // Seamless technology ribbon, with the duplicate hidden from assistive technology.

  // A single passive scroll listener shares each frame across the effects.
  let pageFrame = 0;
  function renderPage() {
    pageFrame = 0;
    update();
    choreograph();
    renderDepth();
    animateWorkTitle();
  }
  function schedulePage() {
    if (!pageFrame) pageFrame = requestAnimationFrame(renderPage);
  }
  listen(window, "scroll", schedulePage, {
    passive: true,
  });
  listen(compactView, "change", () => {
    measureDepth();
    schedulePage();
  });
  // Ambient animation runs only while its element is on screen.
  const ambientNodes = [
    ...document.querySelectorAll(
      ".chrome-fallback,.ribbon .wrap,.portrait-orbits i,.stats>div,.services .symbol,.toolkit-cube,.contact-orbit i,.mail-object,.work-star",
    ),
  ];
  const ambientVisibility = new Map();
  function syncAmbient() {
    ambientNodes.forEach(
      (el) =>
        (el.style.animationPlayState =
          !document.hidden && ambientVisibility.get(el) ? "running" : "paused"),
    );
  }
  const ambientObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => ambientVisibility.set(e.target, e.isIntersecting));
      syncAmbient();
    },
    {
      rootMargin: "40px",
    },
  );
  ambientNodes.forEach((el) => {
    el.style.animationPlayState = "paused";
    ambientObserver.observe(el);
  });
  listen(document, "visibilitychange", syncAmbient);

  // Submit in place: no navigation, no success message before a successful response.
  const contactForm = document.querySelector("#contact-form"),
    formStatus = document.querySelector("#form-status"),
    sendButton = contactForm.querySelector('[type="submit"]');
  let sending = false;
  function showFormStatus(message, state) {
    if (disposed) return;
    formStatus.textContent = message;
    formStatus.dataset.state = state;
    formStatus.hidden = false;
  }
  listen(contactForm, "submit", async (event) => {
    event.preventDefault();
    if (sending || !contactForm.reportValidity()) return;
    if (contactForm.elements.namedItem("_honey").value) return;
    if (location.protocol === "file:") {
      showFormStatus(
        "Please open the hosted website to send this message, or use the email link below.",
        "error",
      );
      return;
    }
    sending = true;
    sendButton.disabled = true;
    sendButton.textContent = "Sending…";
    contactForm.setAttribute("aria-busy", "true");
    showFormStatus("Sending your message…", "pending");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const payload = Object.fromEntries(new FormData(contactForm).entries());
      payload._captcha = "false";
      const response = await fetch(
        "https://formsubmit.co/ajax/erangaharsha739@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        },
      );
      if (!response.ok) throw Error("server");
      const result = await response.json();
      if (!(result.success === true || result.success === "true"))
        throw Error("rejected");
      if (/activat|verif|confirm.*email/i.test(result.message || "")) {
        showFormStatus(
          "This form is awaiting email verification. Please use the email link below for now.",
          "error",
        );
      } else {
        showFormStatus(
          "Submitted successfully! Thank you — I’ll get back to you soon.",
          "success",
        );
        contactForm.reset();
      }
    } catch (error) {
      showFormStatus(
        error.name === "AbortError"
          ? "The request timed out. Your message may have reached the service, but we could not confirm it. Please use the email link below if needed."
          : "We couldn’t confirm your submission. Your message is still here — please try again, or use the email link below.",
        "error",
      );
    } finally {
      clearTimeout(timer);
      sending = false;
      sendButton.disabled = false;
      sendButton.innerHTML = "Send message <span>↗</span>";
      contactForm.setAttribute("aria-busy", "false");
    }
  });

  // Replay phone entrances on return and pause image motion outside the viewport.
  const phoneView = matchMedia("(max-width: 600px)");
  const phoneCards = [
    ...document.querySelectorAll(
      ".project, .story-card, .skillrow, .services > div",
    ),
  ];
  const phoneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.12) {
          entry.target.classList.add("mobile-entered");
        } else if (!entry.isIntersecting) {
          entry.target.classList.remove("mobile-entered");
        }
      });
    },
    { threshold: [0, 0.12] },
  );
  function syncPhoneAnimations() {
    phoneObserver.disconnect();
    phoneCards.forEach((card) => {
      card.classList.remove("mobile-entered");
      if (phoneView.matches) phoneObserver.observe(card);
    });
  }
  listen(phoneView, "change", syncPhoneAnimations);
  syncPhoneAnimations();

  return () => {
    phoneCards.forEach((card) => card.classList.remove("mobile-entered"));
    disposed = true;
    subscriptions.forEach((remove) => remove());
    observers.forEach((observer) => observer.disconnect());
    frames.forEach((id) => window.cancelAnimationFrame(id));
    timers.forEach((id) => window.clearTimeout(id));
    pendingRequests.forEach((controller) => controller.abort());
    document.documentElement.classList.remove("js-motion");
  };
}
