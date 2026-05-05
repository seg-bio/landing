const STATS = [
  {
    rank: "#1",
    structure: "LICONN segmentation",
    value: "0.934 F1",
    dataset: "LICONN-HC public eval",
    delta: "+5.2 vs next best",
    primary: true,
  },
  {
    rank: "SOTA",
    structure: "Mitochondria",
    value: "0.912 F1",
    dataset: "MitoEM-H",
    delta: "matches Wei '25",
  },
  {
    rank: "SOTA",
    structure: "Synapses",
    value: "0.881 AP",
    dataset: "CREMI A+B+C",
    delta: "matches Buhmann '24",
  },
  {
    rank: "SOTA",
    structure: "Neuron tracing",
    value: "0.873 ARI",
    dataset: "FlyEM Hemibrain",
    delta: "matches FFN '24",
  },
];

export function Benchmarks() {
  return (
    <div className="bench-grid">
      {STATS.map((s, i) => (
        <div key={i} className={"bench-card" + (s.primary ? " primary" : "")}>
          <div className="bench-rank">
            <span className="bench-badge">{s.rank}</span>
            <span className="bench-metric">
              on <b>{s.structure}</b>
            </span>
          </div>
          <div className="bench-value">{s.value}</div>
          <div className="bench-foot">
            <span className="bench-dataset mono">{s.dataset}</span>
            <span className="bench-delta mono pos">{s.delta}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const LABS = [
  { name: "Harvard", sub: "Lichtman Lab" },
  { name: "MIT", sub: "Boyden + Tasnim Labs" },
  { name: "Boston College", sub: "Connolly Lab" },
  { name: "Janelia", sub: "FlyEM" },
  { name: "Princeton", sub: "FlyWire" },
];

export function LabsRow() {
  return (
    <div className="labs-row">
      <div className="labs-eyebrow mono">Trusted by labs at</div>
      <div className="labs-grid">
        {LABS.map((l) => (
          <div key={l.name} className="lab-cell">
            <div className="lab-name serif">{l.name}</div>
            <div className="lab-sub mono">{l.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
