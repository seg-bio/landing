"use client";

import { useEffect, useRef } from "react";
import { renderPlane, N_SLICES } from "./em-renderer";

type Overlay = "neuron" | "mito" | "nucleus" | "vessel" | "vesicle" | "syn" | "er";

function classesFrom(overlays: Overlay[]) {
  const c: Record<string, boolean> = {
    neuron: true, mito: false, nucleus: false, vessel: false, vesicle: false, synapse: false,
  };
  overlays.forEach((o) => {
    if (o === "syn") c.synapse = true;
    else if (o === "er") c.vesicle = true;
    else if (Object.prototype.hasOwnProperty.call(c, o)) c[o] = true;
  });
  return c;
}

type Props = {
  seed?: number;
  z?: number;
  overlays?: Overlay[];
  aspect?: string;
};

export function EMCanvas({ seed = 1, z = 64, overlays = ["mito"], aspect = "4/3" }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const overlayKey = overlays.join(",");
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const zEff = (z + seed * 17) % N_SLICES;
    renderPlane(canvas, "xy", zEff, {
      overlay: true,
      classes: classesFrom(overlays),
      noise: 0.6,
      mode: "dark",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, z, overlayKey]);
  return (
    <canvas
      ref={ref}
      style={{
        aspectRatio: aspect === "auto" ? undefined : aspect,
        width: "100%",
        height: aspect === "auto" ? "100%" : undefined,
      }}
    />
  );
}
