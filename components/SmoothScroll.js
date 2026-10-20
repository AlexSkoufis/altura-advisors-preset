"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis, getLenis, prefersReducedMotion } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    // Placeholder links ("#") stay on the page and do nothing.
    // In-page anchors scroll smoothly through Lenis when it is running.
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (hash === "#") {
        event.preventDefault();
        return;
      }
      const target = document.querySelector(hash);
      if (!target) return;
      const lenis = getLenis();
      if (lenis) {
        event.preventDefault();
        lenis.scrollTo(target);
        history.replaceState(null, "", hash);
      }
    };
    document.addEventListener("click", onClick);

    if (prefersReducedMotion()) {
      return () => document.removeEventListener("click", onClick);
    }

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("lenis");

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return null;
}
