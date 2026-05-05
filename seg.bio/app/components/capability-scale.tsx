import { EMCanvas } from "./em-canvas";

const ITEMS = [
  { id: "vessel", label: "Blood vessel", size: "~10 μm", overlays: ["vessel"], seed: 21 },
  { id: "cell",   label: "Cell",         size: "~5 μm",  overlays: ["neuron"], seed: 6 },
  { id: "nuc",    label: "Nuclei",       size: "~2 μm",  overlays: ["nucleus"], seed: 14 },
  { id: "mito",   label: "Organelle",    size: "~500 nm", overlays: ["mito"],   seed: 33 },
  { id: "syn",    label: "Synapse",      size: "~50 nm",  overlays: ["syn"],    seed: 8 },
  { id: "ves",    label: "Vesicle",      size: "~30 nm",  overlays: ["er"],     seed: 18 },
] as const;

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
              <EMCanvas seed={it.seed} z={48} overlays={[...it.overlays]} aspect="1/1" />
            </div>
            <div className="scale-label">{it.label}</div>
            <div className="scale-size mono">{it.size}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
