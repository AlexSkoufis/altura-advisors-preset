import { ArrowRight } from "./Icons";
import styles from "./Services.module.css";

export default function Services({ content }) {
  const { services } = content;

  return (
    <section className={`section ${styles.section}`} aria-labelledby="services-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">{services.eyebrow}</p>
          <h2 id="services-title" className="h2">
            {services.title}
          </h2>
        </div>

        <div className={styles.grid} data-reveal-group>
          {services.items.map((s, i) => (
            <article key={s.id} className={`${styles.card} ${i === 0 ? styles.primary : ""}`} data-spotlight>
              <div className={styles.top}>
                <span className={styles.tag}>{s.tag}</span>
                <span className={styles.num} aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.lead}>{s.lead}</p>
              <ul className={styles.points}>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <a href={s.cta.href} className={`text-link ${styles.link}`}>
                {s.cta.label}
                <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
