"use client";

import { useEffect, useState } from "react";

type Status = "done" | "active" | "pending";

const PROMPTS = [
  { id: "mito", text: "Segment mitochondria in this LICONN dataset. Use the best current model." },
  { id: "syn",  text: "Find every PSD-95 positive synapse near the apical dendrite." },
  { id: "cell", text: "Trace neuron #47 across the volume and list its post-synaptic partners." },
] as const;

type PromptId = (typeof PROMPTS)[number]["id"];

const PLANS: Record<PromptId, { title: string; eta: string; steps: { t: string; sub: string; m: string; s: Status }[] }> = {
  mito: {
    title: "mito-SDT v3",
    eta: "~6m · 340 cr",
    steps: [
      { t: "Load tile", sub: "2.1 GB · liconn-hc-01", m: "4s", s: "done" },
      { t: "CLAHE + iso resample", sub: "4·4·16 nm", m: "22s", s: "done" },
      { t: "mito-SDT v3 inference", sub: "8x A100", m: "4m 12s", s: "active" },
      { t: "Watershed + min-size 400", sub: "instance post-proc", m: "30s", s: "pending" },
      { t: "Write masks.zarr", sub: "OME-NGFF v0.4", m: "12s", s: "pending" },
    ],
  },
  syn: {
    title: "syn-cleftnet · psd95-prior",
    eta: "~9m · 510 cr",
    steps: [
      { t: "Load IF + EM channels", sub: "aligned, 14 GB", m: "12s", s: "done" },
      { t: "PSD-95 mask intersect", sub: "IF channel 2", m: "40s", s: "done" },
      { t: "syn-cleftnet inference", sub: "EM-conditioned", m: "6m", s: "active" },
      { t: "Apical-dendrite filter", sub: "graph: cell-007 ≥ 0.6 affinity", m: "90s", s: "pending" },
      { t: "Export hits.csv + masks", sub: "one row per synapse", m: "18s", s: "pending" },
    ],
  },
  cell: {
    title: "flood-fill + partner-graph",
    eta: "~24m · 1820 cr",
    steps: [
      { t: "Seed at neuron #47", sub: "soma centroid", m: "<1s", s: "done" },
      { t: "Flood-fill across volume", sub: "iter limit 80", m: "14m", s: "active" },
      { t: "Detect synaptic contacts", sub: "syn-cleftnet v1.2", m: "6m", s: "pending" },
      { t: "Resolve partners", sub: "cell-segment lookup", m: "3m", s: "pending" },
      { t: "Export connectome.json", sub: "1 row per partner", m: "20s", s: "pending" },
    ],
  },
};

export function DemoSection() {
  const [active, setActive] = useState<PromptId>("mito");
  const [typed, setTyped] = useState("");
  const target = PROMPTS.find((p) => p.id === active)!.text;

  useEffect(() => {
    setTyped("");
    let i = 0;
    const tick = setInterval(() => {
      i++;
      if (i > target.length) {
        clearInterval(tick);
        return;
      }
      setTyped(target.slice(0, i));
    }, 18);
    return () => clearInterval(tick);
  }, [target]);

  const plan = PLANS[active];

  return (
    <div className="demo-grid">
      <div className="demo-side">
        <div className="prompt-card you">
          <span className="who-mini">you</span>
          <span className={typed.length < target.length ? "typing" : ""}>
            {typed || " "}
          </span>
        </div>
        <div className="demo-pills">
          {PROMPTS.map((p) => (
            <button
              key={p.id}
              className={"demo-pill" + (active === p.id ? " active" : "")}
              onClick={() => setActive(p.id)}
            >
              {p.id === "mito" ? "/ mito" : p.id === "syn" ? "/ synapses" : "/ trace"}
            </button>
          ))}
        </div>
        <p style={{ color: "var(--ink-3)", fontSize: 13, lineHeight: 1.55, margin: 0 }}>
          The agent decomposes your request, matches it against the model registry, and
          proposes a runnable plan. Approve once, then watch.
        </p>
      </div>
      <div className="demo-output">
        <div className="head">
          <span className="t">{plan.title}</span>
          <span className="eta">{plan.eta}</span>
        </div>
        {plan.steps.map((s, i) => (
          <div key={i} className={"step " + s.s}>
            <span className="dot" />
            <div>
              <div className="t">{s.t}</div>
              <div className="sub">{s.sub}</div>
            </div>
            <span className="m">{s.m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
