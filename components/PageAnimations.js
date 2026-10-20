"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

// Page-wide scroll reveals and pointer effects, driven by data attributes
// on server-rendered markup. Everything is visible without JavaScript:
// start states are only applied here, at runtime.
export default function PageAnimations() {
  useEffect(() => {
    const cleanups = [];

    // Card spotlight: track pointer position as CSS variables
    const onPointer = (e) => {
      const el = e.target.closest?.("[data-spotlight]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerover", onPointer, { passive: true });
    cleanups.push(() => {
      document.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerover", onPointer);
    });

    if (prefersReducedMotion()) {
      return () => cleanups.forEach((fn) => fn());
    }

    const ctx = gsap.context(() => {
      const reveal = { y: 48, opacity: 0, duration: 1.1, ease: "expo.out", clearProps: "transform,opacity" };

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, { ...reveal, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });

      gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
        gsap.from(group.children, {
          ...reveal,
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onStart: () => (el.textContent = "0"),
          onUpdate: () => (el.textContent = Math.round(state.v)),
        });
      });
    });

    // Magnetic buttons on fine pointers
    if (window.matchMedia("(pointer: fine)").matches) {
      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
        const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
        const move = (e) => {
          const r = el.getBoundingClientRect();
          x((e.clientX - r.left - r.width / 2) * 0.25);
          y((e.clientY - r.top - r.height / 2) * 0.35);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
          gsap.set(el, { clearProps: "transform" });
        });
      });
    }

    // Recalculate trigger positions once fonts settle
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
