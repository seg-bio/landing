# Landing imagery & interactive 3D hero — design

**Date:** 2026-05-29
**Branch:** landing-page-design

## Problem

The landing page (`seg.bio/`) ships four images pulled directly from the
**MICrONS Explorer** web tool (`public/microns-{vasculature,neuron,nuclei,synapse}.webp`).
These are copyrighted and must not be used. Flagged by Donglai.

Fix: replace every MICrONS-Explorer image with imagery the team owns — figures from
the collaborators' own papers, plus team-provided 3D assets — and, while we're in the
hero, upgrade the static image to an interactive in-browser 3D render.

## Scope

Two independent workstreams, both done in this branch.

### A — "What it segments" tiles (4 static images)

File: `seg.bio/app/components/capability-scale.tsx` (+ `public/`).

Replace the four `microns-*.webp` with images sourced from the team's own papers /
data. Datasets shown were already corrected in a prior edit (Neuron→AxonEM,
Nuclei→NucEMFix, Synapse→CREMI; numbers removed).

| Tile (label) | New source | Credit string |
|---|---|---|
| Neuron | AxonEM paper Fig 2/3 — colorful 3D neuron/axon render | `AxonEM · Wei '21` |
| Nuclei | NuGraph paper Fig 1 — nuclei-on-EM | `NucEMFix · Wang '26` |
| Synapse | Two-stream paper Fig 2a — colorized synapse crop | `Lin '20` |
| **Cell membrane** (renamed from "Blood vessel") | `~/Downloads/image (4).png` — pink membrane mesh render | `jrc_mus-kidney` |

Decisions:
- The former "Blood vessel" tile is **renamed to "Cell membrane"** because
  `image (4).png` shows kidney cell membranes, not vasculature. It remains the
  no-benchmark tile ("in registry"); revisit its size label so it reads sensibly
  as the largest-scale tile.

Sources (all team-owned / public, the collaborators are paper authors):
- AxonEM: arXiv 2107.05451 (Wei et al., Harvard + collaborators)
- Two-stream: donglaiw.github.io/paper/2020_eccv_twostream.pdf (Lin et al.)
- NuGraph/NucEMFix: `~/Desktop/Downloads/TMI_2026_NucEMCorr.pdf` (Wang et al.)
- Cell membrane / kidney: CellMap `jrc_mus-kidney` (public)

Pipeline:
1. Extract figure rasters at native resolution with `pdfimages` (fallback
   `pdftoppm` if the figure is vector/composited).
2. Crop to the colorful subject and normalize the background to match the existing
   dark tiles (ImageMagick). Synapse is the flattest source — crop tight, darken EM
   background for consistency.
3. Export ~800px-wide `.webp`.
4. Replace files in `public/`, update `image.src` + `image.credit` in
   `capability-scale.tsx`, and rename the membrane tile.

### B — Hero: interactive 3D kidney-membrane mesh

Files: `seg.bio/app/components/hero.tsx` (+ new viewer component, `public/`,
`package.json`).

Replace the static vasculature image in the IDE-mock canvas with a live WebGL render
of `~/Downloads/jrc_mus-kidney_crop164_gt_clean_membranes.ply`
(14 MB binary, 348,561 verts w/ vertex colors, 696,271 faces).

Asset prep:
- Convert PLY → **Draco-compressed GLB** (target ~1–3 MB) preserving vertex colors,
  via trimesh (PLY→GLB) + `@gltf-transform/cli` or `gltf-pipeline` (Draco). Ship the
  GLB in `public/`.
- Render a **static poster PNG** from the same mesh for the fallback.

Component `<MembraneViewer>` (new client component):
- Deps: `three`, `@react-three/fiber`, `@react-three/drei`.
- Loads the GLB (drei `useGLTF` + Draco loader), soft studio lighting, gentle
  auto-rotate, `OrbitControls`, camera fit-to-canvas.
- Sits inside the existing `.ide-mock .canvas` so the surrounding chrome is unchanged.

Performance / safety:
- `dynamic(() => import(...), { ssr: false })`.
- Mount the canvas only when scrolled into view (IntersectionObserver / drei).
- Cap `dpr` (e.g. `[1, 1.75]`).
- Suspense fallback = the poster PNG; same poster shown if WebGL is unavailable.

Hero narrative rewrite (IDE-mock currently all vasculature):
- URL path `wei-lab / microns-mm3 / vasculature` → kidney / cell-membranes path.
- Canvas label `vasculature · MICrONS mm³` → `cell membranes · jrc_mus-kidney`.
- Agent prompt `Segment vasculature in this volume` → segment cell membranes.
- Model name `vessel-zsf` → a membrane model name.
- Plan steps stay structurally the same; wording adjusted to membranes where needed.

## Out of scope

- Unused `.models-table` / `.models-row` CSS left by the Models-section removal
  (separate cleanup).
- Softening the "SOTA" claims / section lead — Donglai only flagged numbers + images.

## Risks / open items

- Visual consistency: paper-figure crops (esp. synapse) are flatter than the current
  renders; mitigated by tight cropping + background normalization.
- GLB size vs. fidelity: tune Draco quantization to keep the hero payload small
  without visible faceting.
- `image (4).png` and the kidney PLY are both kidney-derived — the tile and hero will
  share a kidney theme; acceptable per product decision.

## Verification

- `npx tsc --noEmit` clean.
- `next build` succeeds.
- Visual check in the running app: four tiles render with new imagery; hero 3D mesh
  loads, auto-rotates, is orbit-controllable, and falls back to the poster with WebGL
  disabled; no MICrONS-Explorer asset remains referenced.
- `grep -r microns` returns no live references in `app/`.
