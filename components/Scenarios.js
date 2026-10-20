"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/lenis";
import { ArrowRight, Check } from "./Icons";
import styles from "./Scenarios.module.css";

export default function Scenarios({ content }) {
  const { scenarios } = content;
  const [active, setActive] = useState(0);
  const panelRef = useRef(null);
  const tabsRef = useRef([]);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion() || !panelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-swap]", { y: 24, opacity: 0, duration: 0.7, stagger: 0.06, ease: "expo.out" });
    }, panelRef);
    return () => ctx.revert();
  }, [active]);

  const onKeyDown = (e, i) => {
    const n = scenarios.items.length;
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  const item = scenarios.items[active];

  return (
    <section className={`section ${styles.section}`} aria-labelledby="scenarios-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">{scenarios.eyebrow}</p>
          <h2 id="scenarios-title" className="h2">
            {scenarios.title}
          </h2>
        </div>

        <div className={styles.layout}>
          <div className={styles.tabs} role="tablist" aria-label={scenarios.eyebrow} data-reveal>
            {scenarios.items.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => (tabsRef.current[i] = el)}
                id={`tab-${s.id}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`panel-${s.id}`}
                tabIndex={i === active ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className={styles.tabNum}>0{i + 1}</span>
                <span className={styles.tabLabel}>{s.tab}</span>
                <span className={styles.tabArrow} aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </button>
            ))}
          </div>

          <div
            ref={panelRef}
            id={`panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${item.id}`}
            className={styles.panel}
            data-spotlight
            data-reveal
          >
            <h3 className={styles.panelTitle} data-swap>
              {item.title}
            </h3>
            <p className={styles.panelBody} data-swap>
              {item.body}
            </p>
            <ul className={styles.points}>
              {item.points.map((p) => (
                <li key={p} data-swap>
                  <span className={styles.check}>
                    <Check size={14} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <a href={item.cta.href} className="btn" data-swap>
              {item.cta.label}
              <span className="btn__icon">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
