export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-row">
        <span>© 2026 seg.bio</span>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="https://docs.seg.bio">Docs</a>
        <span className="spacer" />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-4)" }}>
          v0.4.0 · changelog
        </span>
      </div>
    </footer>
  );
}
