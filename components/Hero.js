"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/lenis";
import { ArrowRight } from "./Icons";
import styles from "./Hero.module.css";

// Network geometry in a 560 x 560 viewBox. Center is the seller.
const C = 280;
const NODES = [
  { x: 112, y: 132, cx: 150, cy: 250 },
  { x: 452, y: 112, cx: 330, cy: 150 },
  { x: 466, y: 418, cx: 420, cy: 300 },
  { x: 102, y: 438, cx: 230, cy: 420 },
];
const pathFor = (n) => `M${n.x} ${n.y} Q${n.cx} ${n.cy} ${C} ${C}`;
const pct = (v) => `${(v / 560) * 100}%`;

function Words({ text }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      <span className={styles.word}>
        <span className={styles.wordInner} data-hero-word>
          {word}
        </span>
      </span>{" "}
    </Fragment>
  ));
}

export default function Hero({ content }) {
  const { hero } = content;
  const root = useRef(null);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- pulses only render once motion is confirmed
    setMotion(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero-eyebrow]", { y: 20, opacity: 0, duration: 1 })
        .from("[data-hero-word]", { yPercent: 115, duration: 1.2, stagger: 0.06 }, 0.1)
        .from("[data-hero-fade]", { y: 28, opacity: 0, duration: 1.1, stagger: 0.1 }, 0.55)
        .from("[data-net-ring]", { scale: 0.6, opacity: 0, duration: 1.6, stagger: 0.12, transformOrigin: "50% 50%" }, 0.3)
        .fromTo(
          "[data-net-line]",
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.4, stagger: 0.12, ease: "power2.inOut" },
          0.6
        )
        .from("[data-net-center]", { scale: 0.4, opacity: 0, duration: 1.2 }, 0.5)
        .from("[data-net-node]", { scale: 0.6, opacity: 0, duration: 1, stagger: 0.1 }, 0.9);

      // Pointer parallax on fine pointers only
      if (window.matchMedia("(pointer: fine)").matches) {
        const layers = gsap.utils.toArray("[data-depth]").map((el) => ({
          depth: parseFloat(el.dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }),
        }));
        const glowX = gsap.quickTo("[data-hero-glow]", "x", { duration: 1.6, ease: "power3" });
        const glowY = gsap.quickTo("[data-hero-glow]", "y", { duration: 1.6, ease: "power3" });

        const onMove = (e) => {
          const r = root.current.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          layers.forEach((l) => {
            l.x(nx * l.depth);
            l.y(ny * l.depth);
          });
          glowX(e.clientX - r.left);
          glowY(e.clientY - r.top);
        };
        root.current.addEventListener("pointermove", onMove);
      }

      // Content drifts up slightly as the hero scrolls away
      gsap.to("[data-hero-inner]", {
        yPercent: -8,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className={`dark ${styles.hero}`}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} data-hero-glow aria-hidden="true" />

      <div className={`container ${styles.inner}`} data-hero-inner>
        <div className={styles.copy}>
          <p className="eyebrow" data-hero-eyebrow>
            {hero.eyebrow}
          </p>
          <h1 className={styles.title}>
            {hero.title.map((line, i) => (
              <span key={i} className={styles.line}>
                <Words text={line.text} />
                {line.accent && (
                  <span className={styles.word}>
                    <span className={`${styles.wordInner} accent ${styles.accent}`} data-hero-word>
                      {line.accent}
                    </span>
                  </span>
                )}
              </span>
            ))}
          </h1>
          <p className={styles.lead} data-hero-fade>
            {hero.lead}
          </p>
          <div className={styles.ctas} data-hero-fade>
            <a href={hero.primaryCta.href} className="btn btn--sky" data-magnetic>
              {hero.primaryCta.label}
              <span className="btn__icon">
                <ArrowRight size={14} />
              </span>
            </a>
            <a href={hero.secondaryCta.href} className="btn btn--ghost">
              {hero.secondaryCta.label}
            </a>
          </div>
          <figure className={styles.proof} data-hero-fade>
            <span className={styles.proofMark} aria-hidden="true">
              &ldquo;
            </span>
            <blockquote>{hero.proof.quote}</blockquote>
            <figcaption>
              <strong>{hero.proof.name}</strong>, {hero.proof.role}
            </figcaption>
          </figure>
        </div>

        <figure className={styles.network} aria-label={hero.network.ariaLabel} role="img">
          <div className={styles.stage}>
            <svg viewBox="0 0 560 560" className={styles.svg} aria-hidden="true" data-depth="10">
              <circle data-net-ring className={styles.ringOuter} cx={C} cy={C} r="226" />
              <g className={styles.spin}>
                <circle data-net-ring className={styles.ringDash} cx={C} cy={C} r="170" />
              </g>
              <circle data-net-ring className={styles.ringInner} cx={C} cy={C} r="112" />
              {NODES.map((n, i) => (
                <path key={i} d={pathFor(n)} pathLength="1" className={styles.link} data-net-line />
              ))}
              {motion &&
                NODES.map((n, i) => (
                  <circle key={i} r="4" className={styles.pulse}>
                    <animateMotion dur="2.8s" begin={`${1.6 + i * 0.7}s`} repeatCount="indefinite" path={pathFor(n)} />
                  </circle>
                ))}
            </svg>

            <div className={styles.center} data-net-center data-depth="-14">
              <span>{hero.network.center[0]}</span>
              <span>{hero.network.center[1]}</span>
            </div>

            {hero.network.nodes.map((label, i) => (
              <div
                key={label}
                className={styles.node}
                style={{ left: pct(NODES[i].x), top: pct(NODES[i].y) }}
                data-net-node
                data-depth={i % 2 ? "26" : "-22"}
              >
                <span className={styles.dot} />
                {label}
              </div>
            ))}
          </div>
          <figcaption className={styles.caption}>{hero.network.caption}</figcaption>
        </figure>
      </div>

      <a href="#transactions" className={styles.scroll} aria-label={hero.scrollLabel}>
        <span />
      </a>
    </section>
  );
}
