import { ArrowRight } from "./Icons";
import styles from "./Transactions.module.css";

function Row({ items, connector, hidden }) {
  return (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t.company} className={styles.item}>
          <span className={styles.company}>{t.company}</span>
          <span className={styles.connector}>{connector}</span>
          <span className={styles.buyer}>{t.buyer}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Transactions({ content }) {
  const { transactions } = content;

  return (
    <section id="transactions" className={styles.section} aria-labelledby="transactions-title">
      <div className={`container ${styles.head}`}>
        <h2 id="transactions-title" className={styles.label}>
          {transactions.label}
        </h2>
        <a href={transactions.cta.href} className="text-link">
          {transactions.cta.label}
          <ArrowRight size={14} />
        </a>
      </div>
      <div className={styles.marquee}>
        <div className={styles.track}>
          <Row items={transactions.items} connector={transactions.connector} />
          <Row items={transactions.items} connector={transactions.connector} hidden />
        </div>
      </div>
    </section>
  );
}
