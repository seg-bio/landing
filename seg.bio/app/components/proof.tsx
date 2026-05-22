const LABS = ["Harvard", "MIT", "Allen Institute", "Columbia", "Boston College"];

export function LabsRow() {
  return (
    <div className="labs-row">
      <div className="labs-eyebrow mono">Trusted by researchers at</div>
      <div className="labs-grid">
        {LABS.map((name) => (
          <div key={name} className="lab-cell">
            <div className="lab-name serif">{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
