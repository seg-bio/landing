import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { LabsRow } from "./components/proof";
import { CapabilityScale } from "./components/capability-scale";
import { Triptych } from "./components/triptych";
import { DemoSection } from "./components/demo-section";
import { ModelsRegistry } from "./components/models-registry";
import { EMStrip } from "./components/em-strip";
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

      <section className="section scale-section" id="capabilities">
        <div className="shell">
          <div className="section-eyebrow">— What it segments</div>
          <h2 className="section-title serif">
            From whole vessels to single vesicles — SOTA at every scale.
          </h2>
          <p className="section-lead">
            One model per structure, six orders of magnitude in scale, public benchmarks at
            or above the state of the art.
          </p>
          <CapabilityScale />
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

      <section className="section" id="demo">
        <div className="shell">
          <div className="section-eyebrow">— The agent at work</div>
          <h2 className="section-title serif">
            Type a request. Get a runnable plan.
          </h2>
          <DemoSection />
        </div>
      </section>

      <section className="section" id="models">
        <div className="shell">
          <div className="section-eyebrow">— Models</div>
          <h2 className="section-title serif">A registry of organelles, not opinions.</h2>
          <ModelsRegistry />
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="shell">
          <div className="section-eyebrow">— In the wild</div>
          <h2 className="section-title serif">
            From raw EM to instance masks, in minutes.
          </h2>
          <EMStrip />
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
