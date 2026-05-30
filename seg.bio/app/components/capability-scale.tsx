type Bench = { rank: string; dataset: string };

type Item = {
  id: string;
  label: string;
  bench?: Bench;
  image: { src: string; credit: string };
};

const ITEMS: Item[] = [
  {
    id: "vessel",
    label: "Blood vessel",
    image: { src: "/seg-membrane.webp", credit: "" },
  },
  {
    id: "cell",
    label: "Neuron",
    bench: { rank: "SOTA", dataset: "AxonEM" },
    image: { src: "/seg-neuron.webp", credit: "AxonEM · Wei '21" },
  },
  {
    id: "nuc",
    label: "Nuclei",
    bench: { rank: "SOTA", dataset: "NucEMFix" },
    image: { src: "/seg-nuclei.webp", credit: "NucEMFix · Wang '26" },
  },
  {
    id: "syn",
    label: "Synapse",
    bench: { rank: "SOTA", dataset: "CREMI" },
    image: { src: "/seg-synapse.webp", credit: "Lin '20" },
  },
];

export function CapabilityScale() {
  return (
    <div className="scale-wrap">
      <div className="scale-axis-row">
        <span className="scale-end mono">Larger</span>
        <div className="scale-axis">
          <div className="scale-line" />
          {ITEMS.map((_, i) => (
            <span
              key={i}
              className="scale-dot"
              style={{ left: ((i + 0.5) / ITEMS.length) * 100 + "%" }}
            />
          ))}
        </div>
        <span className="scale-end mono">Smaller</span>
      </div>
      <div className="scale-tiles">
        {ITEMS.map((it) => (
          <div key={it.id} className="scale-tile">
            <div className="scale-canvas">
              <img
                src={it.image.src}
                alt={it.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {it.bench && (
                <span className="scale-badge mono">{it.bench.rank}</span>
              )}
            </div>
            <div className="scale-label">{it.label}</div>
            {it.bench ? (
              <div className="scale-bench mono">
                <span>{it.bench.dataset}</span>
              </div>
            ) : (
              <div className="scale-bench mono empty">in registry</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
