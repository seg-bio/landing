"use client";

import dynamic from "next/dynamic";

const MembraneViewer = dynamic(() => import("./membrane-viewer"), {
  ssr: false,
  loading: () => (
    <img
      src="/hero-vessel-poster.webp"
      alt="blood vessel segmentation · 3D EM"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  ),
});

export function MembraneCanvas() {
  return <MembraneViewer />;
}
