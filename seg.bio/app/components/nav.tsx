export function Nav() {
  return (
    <nav className="nav">
      <div className="shell nav-row">
        <a href="#" className="brand">
          <span className="brand-mark" />
          <span>
            seg<span className="brand-domain">.bio</span>
          </span>
        </a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#faq">FAQ</a>
          <a href="#signup" className="cta">
            Get early access
          </a>
        </div>
      </div>
    </nav>
  );
}
