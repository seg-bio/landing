import Script from "next/script";

const TYPEFORM_ID = "01KQTKEDCJP109RVD3ARVEACGF";

export function Signup() {
  return (
    <div className="signup-card" id="signup">
      <div>
        <h2 className="serif">Join the early-access list.</h2>
        <p>
          Tell us what you&apos;d segment — we&apos;ll get back within a week.
        </p>
      </div>
      <div className="signup-form" style={{ padding: 0, overflow: "hidden", minHeight: 360 }}>
        <div data-tf-live={TYPEFORM_ID} style={{ width: "100%", minHeight: 360 }} />
      </div>
      <Script src="https://embed.typeform.com/next/embed.js" strategy="afterInteractive" />
    </div>
  );
}
