"use client";

import { useState } from "react";
import styles from "./FocusAreas.module.css";

export default function FocusAreas({ content }) {
  const { focus } = content;
  const [active, setActive] = useState(0);

  return (
    <section className={`section dark ${styles.section}`} aria-labelledby="focus-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div className={styles.headText} data-reveal>
            <p className="eyebrow">{focus.eyebrow}</p>
            <h2 id="focus-title" className="h2">
              {focus.title}
            </h2>
          </div>
          <p className="lead" data-reveal>
            {focus.lead}
          </p>
        </div>

        <ul className={styles.panels} data-reveal-group>
          {focus.items.map((item, i) => (
            <li
              key={item.title}
              className={styles.panel}
              data-active={i === active}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(i)}
            >
              {/* All details stay in the DOM for assistive tech; the
                  active state only changes emphasis and layout. */}
              <h3 className={styles.heading}>
                <button type="button" className={styles.trigger} onClick={() => setActive(i)}>
                  <span className={styles.num}>0{i + 1}</span>
                  <span className={styles.title}>{item.title}</span>
                  <span className={styles.plus} aria-hidden="true" />
                </button>
              </h3>
              <div className={styles.content}>
                <div className={styles.contentInner}>
                  <ul className={styles.tags}>
                    {item.segments.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  {item.ecosystem && (
                    <p className={styles.eco}>
                      <span>{focus.ecosystemLabel}</span>
                      {item.ecosystem}
                    </p>
                  )}
                </div>
              </div>
              <svg className={styles.art} viewBox="0 0 200 200" aria-hidden="true">
                {Array.from({ length: 5 }, (_, k) => (
                  <circle key={k} cx="200" cy="200" r={40 + k * 34 + i * 6} />
                ))}
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
