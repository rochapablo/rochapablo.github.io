import { trackEventOnce } from "./index.js";

const SCROLL_MILESTONES = [25, 50, 75, 90];
const ENGAGEMENT_THRESHOLD_MS = 15_000;
const IDLE_TIMEOUT_MS = 30_000;

export function initEngagementTracking() {
  initSectionTracking();
  initScrollDepthTracking();
  initEngagedVisitTracking();
  initMinimalScrollTracking();
}

function initMinimalScrollTracking() {
  const handleScroll = () => {
    if (window.scrollY < 100) return;
    trackEventOnce("minimal-scroll");
    window.removeEventListener("scroll", handleScroll);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
}

function initSectionTracking() {
  if (!("IntersectionObserver" in window)) {
    return;
  }

  const sections = ["about", "strengths", "skills", "experience", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          const section = entry.target.id;
          trackEventOnce("section-viewed", { section }, `section-viewed:${section}`);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: [0.35] }
  );

  sections.forEach((section) => observer.observe(section));
}

function initScrollDepthTracking() {
  const tracked = new Set();
  let framePending = false;

  function checkDepth() {
    framePending = false;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const depth = scrollableHeight > 0
      ? Math.min(100, Math.floor((window.scrollY / scrollableHeight) * 100))
      : 100;

    SCROLL_MILESTONES.forEach((milestone) => {
      if (depth >= milestone && !tracked.has(milestone)) {
        tracked.add(milestone);
        trackEventOnce("scroll-depth", { depth: milestone }, `scroll-depth:${milestone}`);
      }
    });
  }

  window.addEventListener("scroll", () => {
    if (!framePending) {
      framePending = true;
      window.requestAnimationFrame(checkDepth);
    }
  }, { passive: true });
  window.addEventListener("resize", checkDepth, { passive: true });
  checkDepth();
}

function initEngagedVisitTracking() {
  let activeMs = 0;
  let lastActivity = 0;
  let lastTick = 0;
  let timerId = 0;
  let reachedThreshold = false;

  function stopTimer() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = 0;
    }
    lastTick = 0;
  }

  function tick() {
    const now = Date.now();

    if (document.visibilityState !== "visible" || now - lastActivity > IDLE_TIMEOUT_MS) {
      stopTimer();
      return;
    }

    if (lastTick && now - lastTick < 5_000) {
      activeMs += now - lastTick;
    }
    lastTick = now;

    if (!reachedThreshold && activeMs >= ENGAGEMENT_THRESHOLD_MS) {
      reachedThreshold = true;
      const depth = getHighestDepthReached();
      trackEventOnce("engaged-visit", { threshold_seconds: 15, depth }, "engaged-visit");
      stopTimer();
    }
  }

  function recordActivity() {
    if (document.visibilityState !== "visible") {
      return;
    }

    lastActivity = Date.now();
    if (!timerId && !reachedThreshold) {
      lastTick = lastActivity;
      timerId = window.setInterval(tick, 1_000);
    }
  }

  ["pointerdown", "keydown", "touchstart", "wheel", "scroll"].forEach((eventName) => {
    window.addEventListener(eventName, recordActivity, { passive: true });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") {
      stopTimer();
    } else {
      recordActivity();
    }
  });
}

function getHighestDepthReached() {
  try {
    for (const depth of [...SCROLL_MILESTONES].reverse()) {
      if (window.sessionStorage.getItem(`analytics:scroll-depth:${depth}`) === "1") {
        return depth;
      }
    }
  } catch {
    // The depth property is optional if browser storage is unavailable.
  }

  return 0;
}
