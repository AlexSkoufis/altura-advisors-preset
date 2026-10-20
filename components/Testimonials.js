"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/lenis";
import { ArrowRight } from "./Icons";
import styles from "./Testimonials.module.css";

const INTERVAL = 8000;

export default function Testimonials({ content }) {
  const { testimonials } = content;
  const items = testimonials.items;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(false);
  const quoteRef = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- autoplay only after motion preference is known
    setAuto(!prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!auto || paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % items.length), INTERVAL);
    return () => clearTimeout(id);
  }, [auto, paused, index, items.length]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-q-word]", { yPercent: 60, opacity: 0, duration: 0.9, stagger: 0.015, ease: "expo.out" });
      gsap.from("[data-q-meta]", { y: 12, opacity: 0, duration: 0.7, delay: 0.25, ease: "expo.out" });
    }, quoteRef);
    return () => ctx.revert();
  }, [index]);

  const go = (dir) => setIndex((i) => (i + dir + items.length) % items.length);
  const t = items[index];

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="testimonials-title"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.side} data-reveal>
          <h2 id="testimonials-title" className="eyebrow">
            {testimonials.eyebrow}
          </h2>
          <ul className={styles.people}>
            {items.map((p, i) => (
              <li key={p.name}>
                <button
                  type="button"
                  className={styles.person}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                >
                  <span className={styles.personName}>{p.name}</span>
                  <span className={styles.personRole}>{p.role}</span>
                  <span
                    className={styles.timer}
                    data-run={auto && !paused && i === index}
                    key={`${index}-${i}`}
                    style={{ animationDuration: `${INTERVAL}ms` }}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.controls}>
            <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label={testimonials.prevLabel}>
              <span style={{ transform: "scaleX(-1)", display: "grid" }}>
                <ArrowRight size={18} />
              </span>
            </button>
            <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label={testimonials.nextLabel}>
              <ArrowRight size={18} />
            </button>
            <span className={styles.count} aria-hidden="true">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <figure ref={quoteRef} className={styles.quote} aria-live={auto && !paused ? "off" : "polite"} data-reveal>
          <span className={styles.mark} aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className={styles.text}>
            {t.quote.split(" ").map((w, i) => (
              <Fragment key={`${index}-${i}`}>
                <span className={styles.qw}>
                  <span data-q-word>{w}</span>
                </span>{" "}
              </Fragment>
            ))}
          </blockquote>
          <figcaption className={styles.meta} data-q-meta>
            <strong>{t.name}</strong>
            <span>{t.role}</span>
          </figcaption>
          <a href={testimonials.cta.href} className={`text-link ${styles.more}`}>
            {testimonials.cta.label}
            <ArrowRight size={14} />
          </a>
        </figure>
      </div>
    </section>
  );
}
