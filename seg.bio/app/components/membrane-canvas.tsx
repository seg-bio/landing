"use client";

import dynamic from "next/dynamic";

const MembraneViewer = dynamic(() => import("./membrane-viewer"), {
  ssr: false,
  loading: () => (
    <img
      src="/kidney-membranes-poster.webp"
      alt="jrc_mus-kidney cell-membrane segmentation"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  ),
});

export function MembraneCanvas() {
  return <MembraneViewer />;
}
