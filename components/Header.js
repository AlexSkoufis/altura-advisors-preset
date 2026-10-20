"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getLenis, prefersReducedMotion } from "@/lib/lenis";
import { ArrowRight, Mail, Phone } from "./Icons";
import Logo from "./Logo";
import styles from "./Header.module.css";

export default function Header({ site }) {
  const { header, logo, contact } = site;
  // Starts solid so the header stays legible without JavaScript;
  // the scroll handler makes it transparent at the top of the page.
  const [scrolled, setScrolled] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (!open) {
      lenis?.start();
      document.body.style.overflow = "";
      return;
    }
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    let ctx;
    if (!prefersReducedMotion() && menuRef.current) {
      ctx = gsap.context(() => {
        gsap.from("[data-menu-item]", {
          yPercent: 110,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "expo.out",
          delay: 0.15,
        });
      }, menuRef);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      ctx?.revert();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={styles.header}
      data-scrolled={scrolled || open}
      data-hidden={hidden && !open}
      data-open={open}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.logo} aria-label={header.homeLabel} onClick={close}>
          <Logo label={logo.alt} />
        </a>

        <nav className={styles.nav} aria-label="Main">
          <ul>
            {header.nav.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={styles.navLink}>
                  <span data-text={item.label}>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={header.cta.href} className={`btn btn--sky ${styles.cta}`}>
            {header.cta.label}
            <span className="btn__icon">
              <ArrowRight size={14} />
            </span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? header.menuCloseLabel : header.menuOpenLabel}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={styles.menu}
        hidden={!open}
      >
        <div className="container">
          <ul className={styles.menuList}>
            {header.nav.map((item) => (
              <li key={item.label}>
                <a href={item.href} data-menu-item onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.menuFoot} data-menu-item>
            <a href={header.cta.href} className="btn btn--sky" onClick={close}>
              {header.mobileContactLabel}
              <span className="btn__icon">
                <ArrowRight size={14} />
              </span>
            </a>
            <a href={`mailto:${contact.email}`} className={styles.menuContact}>
              <Mail /> {contact.email}
            </a>
            <a href={contact.phoneHref} className={styles.menuContact}>
              <Phone /> {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
