export function Compute() {
  return (
    <div className="credit-card">
      <div className="cc-head">
        <span className="cc-label mono">credits</span>
        <span className="cc-balance">12,400</span>
      </div>
      <div className="cc-bar">
        <div className="cc-bar-fill" style={{ width: "49%" }} />
      </div>
      <div className="cc-rows">
        <div className="cc-row">
          <span>Inference</span>
          <span className="mono">7,200 cr</span>
        </div>
        <div className="cc-row">
          <span>Fine-tuning</span>
          <span className="mono">5,200 cr</span>
        </div>
      </div>
      <div className="cc-foot mono">
        <span>$1 ≈ 100 credits</span>
        <span className="cc-sep">·</span>
        <span>or run free on your own cluster</span>
      </div>
    </div>
  );
}
