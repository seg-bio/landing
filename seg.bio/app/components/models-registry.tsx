type Status = "live" | "beta";
type Row = { name: string; v: string; org: string; f1: string; size: string; status: Status };

const ROWS: Row[] = [
  { name: "mito-SDT", v: "v3.1.0", org: "wei-lab", f1: "0.912", size: "88M", status: "live" },
  { name: "syn-cleftnet", v: "v1.2.4", org: "janelia/connectomics", f1: "0.881", size: "142M", status: "live" },
  { name: "er-flood", v: "v0.7.2", org: "lippincott-schwartz", f1: "0.847", size: "54M", status: "live" },
  { name: "flywire-soma", v: "v2.0.0", org: "princeton-flywire", f1: "0.931", size: "210M", status: "live" },
  { name: "lipid-droplet", v: "v0.3.1", org: "walther-lab", f1: "0.792", size: "38M", status: "beta" },
];

export function ModelsRegistry() {
  return (
    <div className="models-table">
      <div className="models-row">
        <span>Model</span>
        <span>Org</span>
        <span>F1</span>
        <span>Params</span>
        <span />
      </div>
      {ROWS.map((r) => (
        <div key={r.name} className="models-row">
          <span className="name">
            {r.name}
            <span className="v">{r.v}</span>
          </span>
          <span className="org">{r.org}</span>
          <span className="num">{r.f1}</span>
          <span className="num">{r.size}</span>
          <span
            className={"badge " + r.status}
            style={r.status === "beta" ? { color: "var(--ink-2)", background: "var(--bg-sunk)" } : {}}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: r.status === "live" ? "var(--ok)" : "var(--ink-3)",
              }}
            />
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}
