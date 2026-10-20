import ContactForm from "./ContactForm";
import { Check, Mail, Phone, Pin } from "./Icons";
import styles from "./Contact.module.css";

export default function Contact({ content, site }) {
  const { contact } = content;
  const details = site.contact;

  return (
    <section id="contact" className={`section dark ${styles.section}`} aria-labelledby="contact-title">
      <div className={styles.rings} aria-hidden="true" />
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="eyebrow" data-reveal>
            {contact.eyebrow}
          </p>
          <h2 id="contact-title" className={`h2 ${styles.title}`} data-reveal>
            {contact.title[0]} <em className={styles.accent}>{contact.title[1]}</em>
          </h2>
          <p className="lead" data-reveal>
            {contact.lead}
          </p>
          <ul className={styles.assurances} data-reveal-group>
            {contact.assurances.map((a) => (
              <li key={a}>
                <span className={styles.check}>
                  <Check size={14} />
                </span>
                {a}
              </li>
            ))}
          </ul>

          <div className={styles.direct} data-reveal>
            <h3 className={styles.directTitle}>{contact.directTitle}</h3>
            <a href={`mailto:${details.email}`}>
              <Mail /> {details.email}
            </a>
            <a href={details.phoneHref}>
              <Phone /> {details.phone}
            </a>
            <p>
              <Pin /> {details.address.join(", ")}
            </p>
          </div>
        </div>

        <div className={styles.formWrap} data-reveal>
          <ContactForm form={contact.form} email={details.email} />
        </div>
      </div>
    </section>
  );
}
