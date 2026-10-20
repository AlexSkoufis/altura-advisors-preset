"use client";

import { useState } from "react";
import { ArrowRight } from "./Icons";
import styles from "./Contact.module.css";

// No backend yet: the form composes an email to the firm's address.
// Without JavaScript, the native mailto action is the fallback.
export default function ContactForm({ form, email }) {
  const { fields } = form;
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const mail = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    if (!name || !company || !e.currentTarget.elements.email.checkValidity() || !mail) {
      setError(true);
      return;
    }
    setError(false);

    const body = [
      `${fields.name.label}: ${name}`,
      `${fields.email.label}: ${mail}`,
      `${fields.company.label}: ${company}`,
      `${fields.interest.label}: ${data.get("interest")}`,
      "",
      String(data.get("message") || "").trim(),
    ].join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      `${form.subject}: ${company}`
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      className={styles.form}
      action={`mailto:${email}?subject=${encodeURIComponent(form.subject)}`}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
      noValidate
    >
      <div className={styles.row}>
        <Field id="name" label={fields.name.label} autoComplete={fields.name.autocomplete} required />
        <Field id="email" type="email" label={fields.email.label} autoComplete={fields.email.autocomplete} required />
      </div>
      <Field id="company" label={fields.company.label} autoComplete={fields.company.autocomplete} required />

      <fieldset className={styles.choices}>
        <legend>{fields.interest.label}</legend>
        <div>
          {fields.interest.options.map((opt, i) => (
            <label key={opt} className={styles.choice}>
              <input type="radio" name="interest" value={opt} defaultChecked={i === 0} />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <textarea id="message" name="message" rows={3} placeholder=" " />
        <label htmlFor="message">{fields.message.label}</label>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {form.error}
        </p>
      )}

      <button type="submit" className={`btn ${styles.submit}`} data-magnetic>
        {form.submit}
        <span className="btn__icon">
          <ArrowRight size={14} />
        </span>
      </button>
      <p className={styles.note}>{form.note}</p>
    </form>
  );
}

function Field({ id, label, type = "text", autoComplete, required }) {
  return (
    <div className={styles.field}>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-required={required || undefined}
        placeholder=" "
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
