import { EMCanvas } from "./em-canvas";

type Overlay = "neuron" | "mito" | "nucleus" | "vessel" | "vesicle" | "syn" | "er";
type Bench = { rank: string; value: string; dataset: string };

type Item = {
  id: string;
  label: string;
  size: string;
  bench?: Bench;
  image?: { src: string; credit: string };
  overlays?: Overlay[];
  seed?: number;
};

const ITEMS: Item[] = [
  {
    id: "vessel",
    label: "Blood vessel",
    size: "~10 μm",
    bench: { rank: "SOTA", value: "zero-shot", dataset: "MICrONS mm³" },
    image: { src: "/microns-vasculature.webp", credit: "Wan & Wei '24" },
  },
  {
    id: "cell",
    label: "Neuron",
    size: "~5 μm",
    bench: { rank: "SOTA", value: "0.873 ARI", dataset: "FlyEM Hemibrain" },
    overlays: ["neuron"],
    seed: 6,
  },
  {
    id: "nuc",
    label: "Nuclei",
    size: "~2 μm",
    overlays: ["nucleus"],
    seed: 14,
  },
  {
    id: "mito",
    label: "Mitochondria",
    size: "~500 nm",
    bench: { rank: "SOTA", value: "0.912 F1", dataset: "MitoEM-H" },
    overlays: ["mito"],
    seed: 33,
  },
  {
    id: "syn",
    label: "Synapse",
    size: "~50 nm",
    bench: { rank: "SOTA", value: "0.881 AP", dataset: "CREMI A+B+C" },
    overlays: ["syn"],
    seed: 8,
  },
  {
    id: "ves",
    label: "Vesicle",
    size: "~30 nm",
    overlays: ["er"],
    seed: 18,
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
              {it.image ? (
                <img
                  src={it.image.src}
                  alt={it.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <EMCanvas seed={it.seed!} z={48} overlays={[...(it.overlays ?? [])]} aspect="1/1" />
              )}
              {it.bench && (
                <span className="scale-badge mono">{it.bench.rank}</span>
              )}
            </div>
            <div className="scale-label">{it.label}</div>
            <div className="scale-size mono">{it.size}</div>
            {it.bench ? (
              <div className="scale-bench mono">
                <b>{it.bench.value}</b>
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
