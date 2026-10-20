import { ArrowRight, ArrowUpRight } from "./Icons";
import styles from "./Playbook.module.css";

export default function Playbook({ content }) {
  const { playbook } = content;

  return (
    <section className={`section ${styles.section}`} aria-labelledby="playbook-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div className={styles.headText} data-reveal>
            <p className="eyebrow">{playbook.eyebrow}</p>
            <h2 id="playbook-title" className="h2">
              {playbook.title}
            </h2>
          </div>
          <div className={styles.headSide} data-reveal>
            <p className="lead">{playbook.lead}</p>
            <a href={playbook.cta.href} className="btn btn--ghost-dark">
              {playbook.cta.label}
              <span className="btn__icon">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>

        <ul className={styles.grid} data-reveal-group>
          {playbook.items.map((item, i) => (
            <li key={item.label}>
              <a href={item.href} className={styles.card} data-spotlight>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.icon} aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
