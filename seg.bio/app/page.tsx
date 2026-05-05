import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { Benchmarks, LabsRow } from "./components/proof";
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
          <div className="proof-eyebrow">
            Best-in-class on LICONN · SOTA on every other structure
          </div>
          <Benchmarks />
          <LabsRow />
        </div>
      </section>

      <section className="section scale-section" id="capabilities">
        <div className="shell">
          <div className="section-eyebrow">— What it segments</div>
          <h2 className="section-title serif">
            From whole vessels down to single vesicles.
          </h2>
          <p className="section-lead">
            One workspace, one prompt language, six orders of magnitude in scale. Every
            structure has at least one production-grade model in the registry — most have
            several.
          </p>
          <CapabilityScale />
        </div>
      </section>

      <section className="section" id="how">
        <div className="shell">
          <div className="section-eyebrow">— What it is</div>
          <h2 className="section-title serif">
            The best models, in a workspace that <em>runs</em> them.
          </h2>
          <p className="section-lead">
            We don&apos;t just ship an IDE — we train the models inside it. #1 on LICONN,
            SOTA elsewhere. The infrastructure is what makes pointing them at a 10 TB volume
            take a sentence instead of a sprint.
          </p>
          <Triptych />
        </div>
      </section>

      <section className="section" id="demo">
        <div className="shell">
          <div className="section-eyebrow">— A typical run</div>
          <h2 className="section-title serif">
            Type a request. Get a runnable plan in a second.
          </h2>
          <p className="section-lead">
            Each prompt resolves to a versioned plan: data, model, post-processing, exports.
            Approve once and the agent runs it; intervene at any step.
          </p>
          <DemoSection />
        </div>
      </section>

      <section className="section" id="models">
        <div className="shell">
          <div className="section-eyebrow">— Models</div>
          <h2 className="section-title serif">A registry of organelles, not opinions.</h2>
          <p className="section-lead">
            Public benchmarks on standard tiles. Versioned, reproducible, and citable. Bring
            your own checkpoints; we&apos;ll mint them and keep them updated.
          </p>
          <ModelsRegistry />
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="shell">
          <div className="section-eyebrow">— In the wild</div>
          <h2 className="section-title serif">
            From raw EM to instance masks, in minutes.
          </h2>
          <p className="section-lead">Synthesized previews — your data will look better.</p>
          <EMStrip />
        </div>
      </section>

      <section className="section" id="faq">
        <div className="shell">
          <div className="section-eyebrow">— FAQ</div>
          <h2 className="section-title serif">Things people ask before signing up.</h2>
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
