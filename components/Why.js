import styles from "./Why.module.css";

export default function Why({ content }) {
  const { why } = content;

  return (
    <section className={`section ${styles.section}`} aria-labelledby="why-title">
      <div className="container">
        <div className={styles.head} data-reveal>
          <p className="eyebrow">{why.eyebrow}</p>
          <h2 id="why-title" className="h2">
            {why.title}
          </h2>
        </div>

        <ol className={styles.rows}>
          {why.items.map((item, i) => (
            <li key={item.title} className={styles.row} data-reveal>
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
              <p className={styles.matters}>
                <span className={styles.mattersLabel}>{why.matterLabel}</span>
                <span className={styles.mattersText}>{item.matters}</span>
              </p>
            </li>
          ))}
        </ol>

        <dl className={styles.stats} data-reveal-group>
          {why.stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt className={styles.statLabel}>{s.label}</dt>
              <dd className={styles.statValue}>
                <span data-count={s.value}>{s.value}</span>
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
