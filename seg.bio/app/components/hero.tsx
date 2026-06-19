import { MembraneCanvas } from "./membrane-canvas";

const TAGLINE_HTML =
  'AI models for <em>volume</em> <span class="accent">biology</span> — pretrained, adaptable, agentic.';
const SUBLINE =
  "SOTA pretrained models for every structure. A fine-tuning API to make them yours. An agent that runs them on your data.";

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
          <b>seg.bio</b> / demo / <b>organelle</b>
        </div>
        <div style={{ width: 48 }} />
      </div>
      <div className="body">
        <div className="canvas">
          <MembraneCanvas />
          <div className="label">organelle · 3D EM</div>
        </div>
        <div className="agent">
          <div className="agent-head">Agent</div>
          <div className="agent-body">
            <div>
              <span className="who">you</span>
              <span className="bubble user">Segment mitochondria in this volume</span>
            </div>
            <div>
              <span className="who">agent · mito-sdt</span>
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
          </div>
          <IDEMock />
        </div>
      </div>
    </section>
  );
}
