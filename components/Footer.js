import { ArrowUpRight, LinkedIn, Mail, Phone, Pin } from "./Icons";
import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer({ site }) {
  const { footer, logo, contact } = site;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo className={styles.logo} label={logo.alt} />
            <p>{footer.tagline}</p>
            <a
              href={contact.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
            >
              <LinkedIn /> {contact.linkedin.label}
            </a>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} className={styles.col} aria-label={col.title}>
              <h2 className={styles.colTitle}>{col.title}</h2>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={`${styles.col} ${styles.colContact}`}>
            <h2 className={styles.colTitle}>{footer.contactTitle}</h2>
            <address className={styles.contact}>
              <a href={`mailto:${contact.email}`}>
                <Mail /> {contact.email}
              </a>
              <a href={contact.phoneHref}>
                <Phone /> {contact.phone}
              </a>
              <span>
                <Pin />
                <span>
                  {contact.address.map((line) => (
                    <span key={line} className={styles.line}>
                      {line}
                    </span>
                  ))}
                </span>
              </span>
            </address>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{footer.copyright}</p>
          <ul className={styles.legal}>
            {footer.legal.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <p className={styles.credit}>
            {footer.credit.prefix}{" "}
            <a href={footer.credit.href} target="_blank" rel="noopener noreferrer">
              {footer.credit.label}
            </a>
          </p>
          <a href="#top" className={styles.top_link}>
            {footer.backToTop}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
