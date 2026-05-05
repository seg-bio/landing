import { EMCanvas } from "./em-canvas";

const TILES = [
  { seed: 1,  z: 32, overlays: ["mito"],         cap: "mito · liconn-hc-01" },
  { seed: 4,  z: 80, overlays: ["syn"],          cap: "synapse · h01-cortex" },
  { seed: 7,  z: 48, overlays: ["er"],           cap: "er · flywire-vnc-3" },
  { seed: 12, z: 96, overlays: ["mito", "syn"],  cap: "multi-organelle" },
] as const;

export function EMStrip() {
  return (
    <div className="em-strip">
      {TILES.map((t, i) => (
        <div key={i} className="em-tile">
          <EMCanvas seed={t.seed} z={t.z} overlays={[...t.overlays]} aspect="1/1" />
          <div className="cap">{t.cap}</div>
        </div>
      ))}
    </div>
  );
}
