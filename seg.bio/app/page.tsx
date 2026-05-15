type Cell = {
  modality: string;
  dataset: string;
  detail: string;
  tag: string;
  link?: string;
  highlight?: string;
};

const columns: { scale: string; cells: Cell[] }[] = [
  {
    scale: "Tissue-scale",
    cells: [
      { modality: "EM", dataset: "BvEM (JBHI'25)", detail: "mm³ cortex vessels · triSAM", tag: "blood vessel", link: "https://jia-wan.github.io/bvem" },
      { modality: "EM / microCT", dataset: "NucMM (MICCAI'21)", detail: "zebrafish + mouse cortex", tag: "nuclei", link: "https://pytorchconnectomics.github.io/datasets/proj/nucmm/" },
      { modality: "MRA", dataset: "IntrA (TMI'25)", detail: "intracranial aneurysm 3D meshes · FreSeg", tag: "aneurysm", link: "https://arxiv.org/abs/2404.14435" },
    ],
  },
  {
    scale: "Cell-scale",
    cells: [
      { modality: "EM", dataset: "AxonEM (MICCAI'21)", detail: "axon instance segmentation", tag: "neuron", link: "https://pytorchconnectomics.github.io/datasets/proj/axonem/" },
      { modality: "LM+ExM", dataset: "LICONN", detail: "expansion + light-microscopy connectomics", tag: "neuron" },
      { modality: "EM", dataset: "WaspSyn (TMI'24)", detail: "synapse instance segmentation", tag: "synapse", link: "https://codalab.lisn.upsaclay.fr/competitions/9169" },
    ],
  },
  {
    scale: "Organelle-scale",
    cells: [
      { modality: "EM", dataset: "CellMap Challenge", highlight: "1st place", detail: "multi-organelle FIB-SEM · Janelia/HHMI", tag: "pan-organelle" },
      { modality: "EM", dataset: "MitoEM (TMI'23)", detail: "mitochondria · rat / human cortex", tag: "mitochondria", link: "https://pytorchconnectomics.github.io/datasets/proj/mitoem/index.html" },
      { modality: "EM", dataset: "VesiclePy (PLOS'25)", detail: "synaptic vesicle benchmark", tag: "vesicle", link: "https://github.com/PytorchConnectomics/VesiclePy" },
    ],
  },
];

const maxRows = Math.max(...columns.map((c) => c.cells.length));

export default function Home() {
  return (
    <main className="min-h-screen px-8 py-20">
      <section className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-[var(--color-text)]">seg.bio</h1>
        <p className="mt-6 text-lg text-[var(--color-muted)] max-w-2xl">
          Intelligent agent for biomedical image segmentation
        </p>
        <a
          href="mailto:contact@seg.bio"
          className="mt-10 rounded-xl bg-[var(--color-primary)] text-white px-6 py-3 transition hover:bg-[var(--color-primary-hover)]"
        >
          Get Early Access
        </a>
      </section>

      <section className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-[var(--color-text)] text-center">
          Built on the field&apos;s benchmarks
        </h2>
        <p className="mt-3 text-center text-[var(--color-muted)]">
          A sample of our published results — peer-reviewed benchmarks across tissue, cell, and organelle scales.
        </p>

        <div className="mt-12 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm table-fixed">
            <thead className="bg-[var(--color-primary)]/5 border-b border-gray-200 text-[var(--color-text)]">
              <tr>
                {columns.map((col) => (
                  <th key={col.scale} className="text-left px-6 py-4 align-top w-1/3">
                    <div className="font-semibold text-base">{col.scale}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: maxRows }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => {
                    const cell = col.cells[i];
                    return (
                      <td key={col.scale} className="px-6 py-4 align-top">
                        {cell ? (
                          <>
                            <div className="text-[var(--color-text)]">
                              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">{cell.modality}</span>
                              <span className="mx-2 text-[var(--color-muted)]">·</span>
                              {cell.link ? (
                                <a
                                  href={cell.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium underline decoration-dotted underline-offset-4 hover:text-[var(--color-primary)]"
                                >
                                  {cell.dataset}
                                </a>
                              ) : (
                                <span className="font-medium">{cell.dataset}</span>
                              )}
                              {cell.highlight ? (
                                <span className="ml-2 font-bold text-red-600">({cell.highlight})</span>
                              ) : null}
                            </div>
                            <div className="text-xs text-[var(--color-muted)] mt-1">{cell.detail}</div>
                            <span className="inline-block mt-2 text-[10px] uppercase tracking-wide font-medium px-2 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                              {cell.tag}
                            </span>
                          </>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
