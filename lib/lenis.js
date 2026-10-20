// Shared handle to the page's Lenis instance, so components
// (mobile menu, anchor links) can pause or drive smooth scrolling.
let instance = null;

export function setLenis(lenis) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
