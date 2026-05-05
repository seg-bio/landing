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

export function Triptych() {
  const items = [
    {
      n: "01",
      t: "The #1 model on LICONN",
      p: "Trained on the largest LICONN volume corpus assembled. Benchmarked monthly against every public alternative — and shipped with a money-back guarantee if it doesn't beat them on your data.",
      v: <EMCanvas seed={11} z={48} overlays={["mito"]} aspect="auto" />,
    },
    {
      n: "02",
      t: "SOTA for everything else",
      p: "Mitochondria, synapses, ER, lipid droplets, neuron tracing — we maintain a model per structure at or above the public state of the art, and replace each one when a better paper drops.",
      v: <ModelsMini />,
    },
    {
      n: "03",
      t: "Infrastructure that disappears",
      p: "The IDE handles tiling, anisotropy, GPU scheduling, proofreading, and provenance. You point at a volume in chat. We do the rest. Your time goes back to biology.",
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
