type Result = { kind: "first" | "curation"; note?: string };
type Row = { source: string; link: string; result: Result };
type Group = { object: string; img: string; alt: string; rows: Row[] };

const GROUPS: Group[] = [
  {
    object: "Blood vessel",
    img: "/seg-membrane.webp",
    alt: "blood vessel segmentation",
    rows: [
      {
        source: "MICrONS 1mm³",
        link: "https://www.microns-explorer.org/cortical-mm3#vasculature",
        result: { kind: "curation" },
      },
      {
        source: "Pulmonary Tree",
        link: "https://github.com/M3DV/pulmonary-tree-labeling",
        result: { kind: "curation" },
      },
    ],
  },
  {
    object: "Neuron",
    img: "/seg-neuron.webp",
    alt: "neuron segmentation",
    rows: [
      {
        source: "NISB Challenge",
        link: "https://structuralneurobiologylab.github.io/nisb/#",
        result: { kind: "first", note: "base track" },
      },
      {
        source: "AxonEM Challenge",
        link: "https://axonem.grand-challenge.org",
        result: { kind: "curation" },
      },
    ],
  },
  {
    object: "Pan-organelle",
    img: "/seg-organelle.webp",
    alt: "pan-organelle segmentation",
    rows: [
      {
        source: "CellMap Challenge",
        link: "https://cellmapchallenge.janelia.org/leaderboard",
        result: { kind: "first" },
      },
    ],
  },
  {
    object: "Nuclei",
    img: "/seg-nuclei.webp",
    alt: "nuclei segmentation",
    rows: [
      {
        source: "FAFB · MICrONS 1mm³",
        link: "https://www.biorxiv.org/content/10.64898/2026.05.16.725603v1",
        result: { kind: "curation" },
      },
      {
        source: "NucMM Challenge",
        link: "https://nucmm.grand-challenge.org",
        result: { kind: "curation" },
      },
    ],
  },
  {
    object: "Synapse",
    img: "/seg-synapse.webp",
    alt: "synapse segmentation",
    rows: [
      {
        source: "CREMI Challenge",
        link: "https://cremi.org/leaderboard/",
        result: { kind: "first", note: "cleft detection" },
      },
    ],
  },
  {
    object: "Mitochondria",
    img: "/seg-mito.webp",
    alt: "mitochondria segmentation",
    rows: [
      {
        source: "MitoEM Challenge",
        link: "https://mitoem.grand-challenge.org",
        result: { kind: "curation" },
      },
      {
        source: "MitoEM 2.0 Dataset",
        link: "https://www.biorxiv.org/content/10.1101/2025.11.12.687478v1",
        result: { kind: "curation" },
      },
    ],
  },
  {
    object: "Fiber",
    img: "/seg-fiber.webp",
    alt: "fiber segmentation",
    rows: [
      {
        source: "CytoTape",
        link: "https://www.nature.com/articles/s41586-026-10156-9",
        result: { kind: "curation" },
      },
    ],
  },
];

function Badge({ result }: { result: Result }) {
  if (result.kind === "first") {
    return (
      <>
        <span className="seg-badge first mono">1st place</span>
        {result.note ? <span className="seg-note">{result.note}</span> : null}
      </>
    );
  }
  return <span className="seg-badge curation mono">GT curation</span>;
}

export function SegmentationTable() {
  return (
    <div className="seg-table-wrap">
      <table className="seg-table">
        <thead>
          <tr>
            <th>Object</th>
            <th>Example</th>
            <th>Source</th>
            <th className="col-result">Result</th>
          </tr>
        </thead>
        {GROUPS.map((g) => (
          <tbody key={g.object}>
            {g.rows.map((r, i) => (
              <tr key={r.source}>
                {i === 0 && (
                  <>
                    <td className="seg-object" rowSpan={g.rows.length}>
                      {g.object}
                    </td>
                    <td className="seg-image" rowSpan={g.rows.length}>
                      <img className="seg-thumb" src={g.img} alt={g.alt} loading="lazy" />
                    </td>
                  </>
                )}
                <td className="seg-source">
                  <a href={r.link} target="_blank" rel="noopener noreferrer">
                    {r.source}
                  </a>
                </td>
                <td className="seg-result col-result">
                  <Badge result={r.result} />
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
