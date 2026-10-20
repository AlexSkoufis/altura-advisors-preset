"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "./Icons";
import styles from "./Process.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Process({ content }) {
  const { process } = content;
  const root = useRef(null);
  const viewport = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      root.current.dataset.pinned = "true";
      const distance = () => track.current.scrollWidth - viewport.current.clientWidth;

      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
        },
      });

      return () => {
        delete root.current?.dataset.pinned;
      };
    });

    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        bar.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: track.current, start: "top 70%", end: "bottom 70%", scrub: true },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="process" ref={root} className={`dark ${styles.section}`} aria-labelledby="process-title">
      <div className={`container ${styles.head}`}>
        <div className={styles.headText} data-reveal>
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 id="process-title" className="h2">
            {process.title}
          </h2>
        </div>
        <div className={styles.headSide} data-reveal>
          <p className="lead">{process.lead}</p>
          <a href={process.cta.href} className="btn btn--light">
            {process.cta.label}
            <span className="btn__icon">
              <ArrowRight size={14} />
            </span>
          </a>
        </div>
      </div>

      <div ref={viewport} className={styles.viewport}>
        <div className={styles.progress} aria-hidden="true">
          <span ref={bar} />
        </div>
        <ol ref={track} className={styles.track}>
          {process.steps.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
              {step.note && <p className={styles.note}>{step.note}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
