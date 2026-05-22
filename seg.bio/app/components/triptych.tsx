import { EMCanvas } from "./em-canvas";

function ModelsMini() {
  return (
    <div
      style={{
        padding: 12,
        fontSize: 11,
        fontFamily: "var(--font-mono)",
        color: "var(--ink-2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--line)",
          paddingBottom: 4,
        }}
      >
        <span>mito-SDT</span>
        <span style={{ color: "var(--ok)" }}>v3 · F1 0.91</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "4px 0",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <span>syn-cleftnet</span>
        <span>v1.2 · 0.88</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "4px 0",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <span>er-flood</span>
        <span>v0.7 · 0.84</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
        <span style={{ color: "var(--ink-3)" }}>+ 14 more</span>
        <span>›</span>
      </div>
    </div>
  );
}

function TuneMini() {
  return (
    <div
      style={{
        padding: 12,
        fontSize: 11,
        fontFamily: "var(--font-mono)",
        color: "var(--ink-2)",
        lineHeight: 1.55,
      }}
    >
      <div style={{ color: "var(--ink-3)" }}>$ seg tune mito-SDT \</div>
      <div style={{ paddingLeft: 14 }}>--data s3://lab/run-07 \</div>
      <div style={{ paddingLeft: 14 }}>--epochs 12 --lr 3e-5</div>
      <div style={{ marginTop: 8, borderTop: "1px solid var(--line)", paddingTop: 8 }}>
        <span>step 240 / 1.2k</span>
        <span style={{ float: "right", color: "var(--ok)" }}>F1 0.91 → 0.94</span>
      </div>
      <div style={{ marginTop: 4, color: "var(--ink-3)" }}>
        <span>eta 4m · 4x H100</span>
      </div>
    </div>
  );
}

export function Triptych() {
  const items = [
    {
      n: "01",
      t: "SOTA pretrained models",
      p: "A model per structure, benchmarked monthly. #1 on LICONN, SOTA on mitochondria, synapses, neuron tracing. Replaced the moment a better paper drops.",
      v: <ModelsMini />,
    },
    {
      n: "02",
      t: "Model adaptation API",
      p: "Bring your data. Fine-tune any model in the registry with a Python-level training API — we handle the GPUs, tiling, and checkpointing.",
      v: <TuneMini />,
    },
    {
      n: "03",
      t: "Agentic workflow",
      p: "Describe what you want in chat. The agent matches the right model, proposes a runnable plan, and executes it on your volume. Approve once.",
      v: <EMCanvas seed={9} z={88} overlays={["syn", "er"]} aspect="auto" />,
    },
  ];
  return (
    <div className="triptych">
      {items.map((it) => (
        <div key={it.n} className="tile">
          <div className="num">{it.n}</div>
          <h3 className="serif">{it.t}</h3>
          <p>{it.p}</p>
          <div className="visual">{it.v}</div>
        </div>
      ))}
    </div>
  );
}
