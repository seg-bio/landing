import Script from "next/script";

const TYPEFORM_ID = "01KQTKEDCJP109RVD3ARVEACGF";

export function Signup() {
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
      <div className="signup-form" style={{ padding: 0, overflow: "hidden", minHeight: 360 }}>
        <div data-tf-live={TYPEFORM_ID} style={{ width: "100%", minHeight: 360 }} />
      </div>
      <Script src="https://embed.typeform.com/next/embed.js" strategy="afterInteractive" />
    </div>
  );
}
