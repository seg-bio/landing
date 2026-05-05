import { EMCanvas } from "./em-canvas";

const TAGLINE_HTML =
  'The best models for <em>volume</em> <span class="accent">biology</span>, in an IDE that runs them.';
const SUBLINE =
  "We train and host the #1 model for LICONN and the SOTA for every other structure. The agentic IDE makes them trivial to point at your data.";

function IDEMock() {
  return (
    <div className="ide-mock">
      <div className="topbar">
        <div className="traffic">
          <span />
          <span />
          <span />
        </div>
        <div className="url">
          <b>seg.bio</b> / wei-lab / hippocampus / <b>liconn-hc-01</b>
        </div>
        <div style={{ width: 48 }} />
      </div>
      <div className="body">
        <div className="canvas">
          <EMCanvas seed={3} z={64} overlays={["mito", "syn"]} aspect="auto" />
          <div className="label">XY · z=64 · 4·4·40 nm</div>
          <div className="crosshair" />
        </div>
        <div className="agent">
          <div className="agent-head">Agent</div>
          <div className="agent-body">
            <div>
              <span className="who">you</span>
              <span className="bubble user">Segment mitochondria here</span>
            </div>
            <div>
              <span className="who">agent · mito-SDT v3</span>
              <div className="plan">
                <div className="head">
                  <b>Plan</b>
                  <span>~6m · 340 cr</span>
                </div>
                <div className="step done">
                  <span className="d" />
                  <span>Load tile</span>
                  <span className="m">2 GB</span>
                </div>
                <div className="step done">
                  <span className="d" />
                  <span>CLAHE + iso</span>
                  <span className="m">22s</span>
                </div>
                <div className="step active">
                  <span className="d" />
                  <span>Inference</span>
                  <span className="m">4m</span>
                </div>
                <div className="step">
                  <span className="d" />
                  <span>Watershed</span>
                  <span className="m">30s</span>
                </div>
                <div className="step">
                  <span className="d" />
                  <span>Write zarr</span>
                  <span className="m">12s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <div className="shell">
        <span className="hero-eyebrow">
          <span className="pulse" /> Now in private beta · v0.4
        </span>
        <div className="hero-grid variant-mock">
          <div>
            <h1
              className="hero-title serif"
              dangerouslySetInnerHTML={{ __html: TAGLINE_HTML }}
            />
            <p className="hero-sub">{SUBLINE}</p>
            <div className="hero-actions">
              <a href="#signup" className="btn-primary">
                Get early access →
              </a>
              <a href="#how" className="btn-ghost">
                See it work
              </a>
            </div>
            <div className="hero-meta">
              <span>SOC2 in progress</span>
              <span className="dot" />
              <span>Runs on your cluster or ours</span>
              <span className="dot" />
              <span>NGFF · OME-Zarr native</span>
            </div>
          </div>
          <IDEMock />
        </div>
      </div>
    </section>
  );
}
