import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { LabsRow } from "./components/proof";
import { SegmentationTable } from "./components/segmentation-table";
import { Triptych } from "./components/triptych";
import { Compute } from "./components/compute";
import { DemoSection } from "./components/demo-section";
import { FAQ } from "./components/faq";
import { Signup } from "./components/signup";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />

      <section className="proof-section">
        <div className="shell">
          <LabsRow />
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="shell">
          <div className="section-eyebrow">— What it segments</div>
          <h2 className="section-title serif">
            From whole vessels down to single synapses — SOTA at every scale.
          </h2>
          <p className="section-lead">
            Seven object classes, each backed by a leading public benchmark or curated
            ground-truth dataset — with first-place results on the CellMap, CREMI, and NISB
            challenges.
          </p>
          <SegmentationTable />
        </div>
      </section>

      <section className="section" id="how">
        <div className="shell">
          <div className="section-eyebrow">— What we offer</div>
          <h2 className="section-title serif">
            Three things, tightly coupled.
          </h2>
          <Triptych />
        </div>
      </section>

      <section className="section" id="compute">
        <div className="shell">
          <div className="section-eyebrow">— Compute</div>
          <h2 className="section-title serif">No GPUs? No problem.</h2>
          <p className="section-lead">
            Inference and fine-tuning run on our managed cluster. Pay in credits — no
            provisioning, no GPU quotas, no setup. Or point us at your own cluster anytime
            and run free.
          </p>
          <Compute />
        </div>
      </section>

      <section className="section" id="demo">
        <div className="shell">
          <div className="section-eyebrow">— The agent at work</div>
          <h2 className="section-title serif">
            Type a request. Get a runnable plan.
          </h2>
          <DemoSection />
        </div>
      </section>

      <section className="section" id="faq">
        <div className="shell">
          <div className="section-eyebrow">— FAQ</div>
          <h2 className="section-title serif">Things people ask.</h2>
          <FAQ />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Signup />
        </div>
      </section>

      <Footer />
    </>
  );
}
