const ITEMS = [
  {
    q: "What is seg.bio?",
    a: "A team that builds and hosts state-of-the-art segmentation models for volume EM and 3D microscopy — wrapped in an agentic IDE that makes them trivial to point at your data. We are the #1 model on LICONN and at SOTA on every major public benchmark for organelles, synapses, and neuron tracing.",
  },
  {
    q: "What's the money-back guarantee?",
    a: "If our model doesn't beat the best public model on your data, you don't pay. We benchmark on a held-out slice of your volume during onboarding and write the result into the contract — if we miss, you get a full refund and keep the masks we produced.",
  },
  {
    q: "What inputs does it take?",
    a: "OME-Zarr / NGFF, Neuroglancer precomputed, TIFF stacks, and HDF5. We auto-detect anisotropy and propose iso-resampling when a model needs it.",
  },
  {
    q: "Where does the data live?",
    a: "Your bucket, your cluster — we register it. Inference can run on our managed GPUs or your own on-prem fleet via a thin runner.",
  },
  {
    q: "Can I use my own checkpoint?",
    a: "Yes. Push a checkpoint with a model card; we mint a versioned entry and run a public benchmark on standard tiles. Private orgs get private registries.",
  },
  {
    q: "Is this an alternative to Neuroglancer / CAVE?",
    a: "No — it sits on top. We render in a Neuroglancer-compatible viewer and write CAVE-style segmentation tables. Bring your existing tooling.",
  },
];

export function FAQ() {
  return (
    <div className="faq-list">
      {ITEMS.map((it, i) => (
        <div key={i} className="faq-item">
          <h4 className="faq-q">{it.q}</h4>
          <p className="faq-a">{it.a}</p>
        </div>
      ))}
    </div>
  );
}
