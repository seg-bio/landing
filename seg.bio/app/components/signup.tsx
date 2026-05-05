"use client";

import { useState } from "react";

const CONTACT = "contact@seg.bio";

export function Signup() {
  const [email, setEmail] = useState("");
  const [lab, setLab] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Early access — seg.bio");
    const body = encodeURIComponent(
      `Email: ${email}\nLab / org: ${lab}\n\nWhat I'd segment:\n`,
    );
    window.location.href = `mailto:${CONTACT}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="signup-card" id="signup">
      <div>
        <h2 className="serif">Join the early-access list.</h2>
        <p>
          We&apos;re onboarding ten labs at a time. Tell us what you&apos;d segment — we&apos;ll
          get back within a week with a spot, or a date.
        </p>
        <div
          style={{
            marginTop: 22,
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: "var(--ink-3)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          <span>· 2 min to fill out</span>
          <span>· no credit card</span>
          <span>· reply within 1 week</span>
        </div>
      </div>
      <form className="signup-form" onSubmit={onSubmit}>
        <span className="label">Work email</span>
        <div className="row">
          <input
            type="email"
            required
            placeholder="you@lab.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <span className="label">Lab / org</span>
        <div className="row">
          <input
            type="text"
            placeholder="e.g. Lichtman Lab, Harvard"
            value={lab}
            onChange={(e) => setLab(e.target.value)}
          />
        </div>
        <div className="row">
          <button type="submit">Request access →</button>
        </div>
        <span className="fine">
          Or email us directly at{" "}
          <span className="typeform-link">
            <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
          </span>
          .
        </span>
      </form>
    </div>
  );
}
