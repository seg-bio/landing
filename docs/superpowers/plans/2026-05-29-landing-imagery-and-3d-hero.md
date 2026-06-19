# Landing imagery & interactive 3D hero — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every MICrONS-Explorer image on the landing page with team-owned imagery, and upgrade the hero from a static image to an interactive in-browser 3D mesh.

**Architecture:** Two independent workstreams. (A) Static tiles — extract figure crops from the collaborators' own PDFs (render page with `pdftoppm`, crop + background-normalize with ImageMagick, export webp) and a team-provided PNG; rewire `capability-scale.tsx`. (B) Hero 3D — convert a provided PLY mesh to a Draco-compressed GLB, render it with react-three-fiber inside the existing IDE-mock canvas, with a poster-image fallback; rewrite the IDE-mock copy from vasculature to kidney membranes.

**Tech Stack:** Next.js (app router, TS), poppler (`pdftoppm`/`pdfimages`), ImageMagick, Python `trimesh` (PLY→GLB), `@gltf-transform/cli` (Draco), `three` + `@react-three/fiber` + `@react-three/drei`.

**Note on testing:** This is visual/asset + a 3D component; there are no meaningful pure-logic units to TDD. "Verification" steps are therefore: `tsc --noEmit`, `next build`, `grep` for stale references, and **visual inspection by Reading the produced image** (the Read tool renders images). These are the test gates.

**Working dir:** repo root `/home/egonzalez/Projects/seg.bio/landing`; the Next app lives in `seg.bio/`. Branch `landing-page-design` (already checked out). All asset sources already downloaded: `/tmp/axonem.pdf`, `/tmp/twostream.pdf`, `~/Desktop/Downloads/TMI_2026_NucEMCorr.pdf`, `~/Downloads/image (4).png`, `~/Downloads/jrc_mus-kidney_crop164_gt_clean_membranes.ply`.

---

## Workstream A — "What it segments" tiles

### Task A1: Extract the Neuron image (AxonEM colorful soma render)

**Files:**
- Create: `seg.bio/public/seg-neuron.webp`
- Source: `/tmp/axonem.pdf` (Fig 2, page 3 — embedded images 24 & 26 are the AxonEM-H/-M neuron renders, ~1034×1154 @ 824ppi, with alpha smask)

- [ ] **Step 1: Extract the standalone neuron render with its alpha mask**

```bash
cd /home/egonzalez/Projects/seg.bio/landing
mkdir -p /tmp/figx
pdfimages -png -f 3 -l 3 /tmp/axonem.pdf /tmp/figx/axonem
ls -la /tmp/figx/
```
Expected: several `axonem-NNN.png` files; the two large (~1034×1154 and ~996×1152) are the colorful neuron renders.

- [ ] **Step 2: Visually pick the best neuron render**

Read each large candidate PNG (`/tmp/figx/axonem-024.png`, `-026.png` or whichever indices map to the big renders) to choose the most striking colorful neuron-with-soma image on a clean background.
Expected: identify one file = the chosen neuron render.

- [ ] **Step 3: Composite onto the dark tile background and export webp**

The current tiles read on near-black. Flatten the chosen render (which has white/transparent bg) onto the site's sunk color and export 800px webp:
```bash
convert /tmp/figx/<chosen>.png -resize 800x800 -background '#0b0d10' -flatten \
  -quality 86 seg.bio/public/seg-neuron.webp
ls -la seg.bio/public/seg-neuron.webp
```
Expected: `seg-neuron.webp` exists, well under ~150KB.

- [ ] **Step 4: Verify visually**

Read `seg.bio/public/seg-neuron.webp`.
Expected: clean colorful neuron render, dark background, no white box, no figure caption text.

- [ ] **Step 5: Commit**

```bash
git add seg.bio/public/seg-neuron.webp
git commit -m "Add AxonEM neuron tile image (team-owned, replaces MICrONS)"
```

---

### Task A2: Extract the Synapse image (two-stream Fig 2a)

**Files:**
- Create: `seg.bio/public/seg-synapse.webp`
- Source: `/tmp/twostream.pdf` (Fig 2a synapse panel, page 3)

- [ ] **Step 1: Render page 3 at high DPI**

```bash
pdftoppm -png -r 400 -f 3 -l 3 /tmp/twostream.pdf /tmp/figx/ts-p3
ls -la /tmp/figx/ts-p3*
```
Expected: one PNG of the full page 3 (~3300px tall).

- [ ] **Step 2: Locate the Fig 2a crop box**

Read the rendered page PNG. Fig 2 is the strip of EM panels near the top; panel (a) "Synapse" is the leftmost colorized-EM crop. Note its pixel bounding box (x,y,w,h) from the rendered image.
Expected: a concrete `WxH+X+Y` crop geometry for panel (a).

- [ ] **Step 3: Crop, square-pad, export webp**

```bash
convert /tmp/figx/ts-p3-03.png -crop <WxH+X+Y> +repage \
  -resize 800x800^ -gravity center -extent 800x800 -background '#0b0d10' \
  -quality 86 seg.bio/public/seg-synapse.webp
```
(Adjust filename suffix to the actual `pdftoppm` output.)
Expected: `seg-synapse.webp` created.

- [ ] **Step 4: Verify visually**

Read `seg.bio/public/seg-synapse.webp`.
Expected: the colorized synapse EM crop, tightly framed, no "(a) Synapse" caption, no neighboring panels.

- [ ] **Step 5: Commit**

```bash
git add seg.bio/public/seg-synapse.webp
git commit -m "Add two-stream synapse tile image (team-owned, replaces MICrONS)"
```

---

### Task A3: Extract the Nuclei image (NuGraph Fig 1)

**Files:**
- Create: `seg.bio/public/seg-nuclei.webp`
- Source: `~/Desktop/Downloads/TMI_2026_NucEMCorr.pdf` (Fig 1 error-modes collage, page 1, top-right)

- [ ] **Step 1: Render page 1 at high DPI**

```bash
pdftoppm -png -r 400 -f 1 -l 1 "$HOME/Desktop/Downloads/TMI_2026_NucEMCorr.pdf" /tmp/figx/ng-p1
ls -la /tmp/figx/ng-p1*
```
Expected: full page-1 PNG.

- [ ] **Step 2: Pick the cleanest nuclei panel**

Read the rendered page. Fig 1 (top-right) has panels (a)–(e) of colorful nuclei on EM. Choose the single most attractive panel (e.g. (d) "Large false merge&split" — dense colorful blobs) and note its crop box. Prefer one panel over the labeled collage to avoid caption text.
Expected: concrete crop geometry for one nuclei panel.

- [ ] **Step 3: Crop, square-pad, export webp**

```bash
convert /tmp/figx/ng-p1-01.png -crop <WxH+X+Y> +repage \
  -resize 800x800^ -gravity center -extent 800x800 -background '#0b0d10' \
  -quality 86 seg.bio/public/seg-nuclei.webp
```
Expected: `seg-nuclei.webp` created.

- [ ] **Step 4: Verify visually**

Read `seg.bio/public/seg-nuclei.webp`.
Expected: colorful nuclei on EM, no panel-letter caption, framed consistently with the other tiles.

- [ ] **Step 5: Commit**

```bash
git add seg.bio/public/seg-nuclei.webp
git commit -m "Add NucEMFix nuclei tile image (team-owned, replaces MICrONS)"
```

---

### Task A4: Prepare the Cell-membrane image (provided PNG)

**Files:**
- Create: `seg.bio/public/seg-membrane.webp`
- Source: `~/Downloads/image (4).png` (pink kidney-membrane mesh render, ~597×597 visible)

- [ ] **Step 1: Resize/crop to square 800px webp**

```bash
convert "$HOME/Downloads/image (4).png" -resize 800x800^ -gravity center \
  -extent 800x800 -quality 86 seg.bio/public/seg-membrane.webp
ls -la seg.bio/public/seg-membrane.webp
```
Expected: `seg-membrane.webp` created.

- [ ] **Step 2: Verify visually**

Read `seg.bio/public/seg-membrane.webp`.
Expected: the pink membrane mesh, centered, square.

- [ ] **Step 3: Commit**

```bash
git add seg.bio/public/seg-membrane.webp
git commit -m "Add kidney cell-membrane tile image"
```

---

### Task A5: Rewire capability-scale.tsx and delete MICrONS tiles

**Files:**
- Modify: `seg.bio/app/components/capability-scale.tsx` (ITEMS array, lines 11–39)
- Delete: `seg.bio/public/microns-neuron.webp`, `microns-nuclei.webp`, `microns-synapse.webp` (NOT `microns-vasculature.webp` — Task B6 removes that)

- [ ] **Step 1: Update the ITEMS array**

Replace the `ITEMS` array so the first tile becomes "Cell membrane" and every `image.src`/`credit` points at the new assets. New array:

```tsx
const ITEMS: Item[] = [
  {
    id: "membrane",
    label: "Cell membrane",
    size: "~10 μm",
    image: { src: "/seg-membrane.webp", credit: "jrc_mus-kidney" },
  },
  {
    id: "cell",
    label: "Neuron",
    size: "~5 μm",
    bench: { rank: "SOTA", dataset: "AxonEM" },
    image: { src: "/seg-neuron.webp", credit: "AxonEM · Wei '21" },
  },
  {
    id: "nuc",
    label: "Nuclei",
    size: "~2 μm",
    bench: { rank: "SOTA", dataset: "NucEMFix" },
    image: { src: "/seg-nuclei.webp", credit: "NucEMFix · Wang '26" },
  },
  {
    id: "syn",
    label: "Synapse",
    size: "~50 nm",
    bench: { rank: "SOTA", dataset: "CREMI" },
    image: { src: "/seg-synapse.webp", credit: "Lin '20" },
  },
];
```

- [ ] **Step 2: Delete the three replaced MICrONS tile files**

```bash
git rm seg.bio/public/microns-neuron.webp seg.bio/public/microns-nuclei.webp seg.bio/public/microns-synapse.webp
```

- [ ] **Step 3: Verify no stale references + typecheck**

```bash
grep -rn "microns-neuron\|microns-nuclei\|microns-synapse" seg.bio/app || echo "clean"
cd seg.bio && npx tsc --noEmit && cd ..
```
Expected: `clean`, and tsc exits 0.

- [ ] **Step 4: Commit**

```bash
git add seg.bio/app/components/capability-scale.tsx
git commit -m "Point scale tiles at team-owned imagery; rename vessel tile to Cell membrane"
```

---

## Workstream B — Hero interactive 3D mesh

### Task B1: Convert the PLY to a Draco-compressed GLB

**Files:**
- Create: `seg.bio/public/kidney-membranes.glb`
- Source: `~/Downloads/jrc_mus-kidney_crop164_gt_clean_membranes.ply` (14MB binary, 348,561 verts w/ RGB, 696,271 faces)

- [ ] **Step 1: Install trimesh (PLY reader / GLB writer)**

```bash
python3 -m pip install --user --quiet trimesh numpy
python3 -c "import trimesh; print('trimesh', trimesh.__version__)"
```
Expected: prints a version.

- [ ] **Step 2: Convert PLY → GLB preserving vertex colors**

```bash
python3 - <<'PY'
import trimesh
m = trimesh.load('/home/egonzalez/Downloads/jrc_mus-kidney_crop164_gt_clean_membranes.ply', process=False)
print('verts', len(m.vertices), 'faces', len(m.faces), 'colors', m.visual.kind)
m.export('/tmp/kidney-raw.glb')
PY
ls -la /tmp/kidney-raw.glb
```
Expected: prints vertex/face counts and vertex colors; `/tmp/kidney-raw.glb` written (~10–15MB).

- [ ] **Step 3: Draco-compress into public/**

```bash
cd /home/egonzalez/Projects/seg.bio/landing
npx --yes @gltf-transform/cli draco /tmp/kidney-raw.glb seg.bio/public/kidney-membranes.glb
ls -la seg.bio/public/kidney-membranes.glb
```
Expected: GLB written, target ~1–3MB (well below the 14MB raw PLY). If `@gltf-transform/cli` is unavailable, fall back to `npx --yes gltf-pipeline -i /tmp/kidney-raw.glb -o seg.bio/public/kidney-membranes.glb -d`.

- [ ] **Step 4: Commit**

```bash
git add seg.bio/public/kidney-membranes.glb
git commit -m "Add Draco-compressed kidney-membrane GLB for hero"
```

---

### Task B2: Add the 3D dependencies

**Files:**
- Modify: `seg.bio/package.json`, `seg.bio/package-lock.json`

- [ ] **Step 1: Install three + r3f + drei**

```bash
cd /home/egonzalez/Projects/seg.bio/landing/seg.bio
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```
Expected: installs succeed; `three`, `@react-three/fiber`, `@react-three/drei` appear in `package.json` dependencies.

- [ ] **Step 2: Verify the app still typechecks/builds**

```bash
npx tsc --noEmit
```
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
cd /home/egonzalez/Projects/seg.bio/landing
git add seg.bio/package.json seg.bio/package-lock.json
git commit -m "Add three/react-three-fiber/drei for hero 3D viewer"
```

---

### Task B3: Build the MembraneViewer client component

**Files:**
- Create: `seg.bio/app/components/membrane-viewer.tsx`

- [ ] **Step 1: Write the component**

A client component that renders the GLB with soft lighting, gentle auto-rotate, orbit controls, and fits the mesh to the canvas. Vertex colors come from the GLB, so use a material that respects them.

No external assets: use explicit lights (not drei `Stage`/`Environment`, which fetch an HDR from a CDN) and drei `<Bounds fit clip observe>` to auto-frame the mesh regardless of its raw scale.

```tsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds, Center } from "@react-three/drei";

function Mesh() {
  const { scene } = useGLTF("/kidney-membranes.glb");
  return <primitive object={scene} />;
}

useGLTF.preload("/kidney-membranes.glb");

export default function MembraneViewer() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [1, 0.5, 2.5], fov: 45 }}
      style={{ width: "100%", height: "100%", display: "block" }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#0b0d10"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.1}>
          <Center>
            <Mesh />
          </Center>
        </Bounds>
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.6}
        enablePan={false}
        enableZoom={false}
        makeDefault
      />
    </Canvas>
  );
}
```

Note: the GLB carries per-vertex colors; if the imported material renders unlit/flat, set `vertexColors` on the mesh material during execution (the GLTF loader normally preserves this). If colors look washed out, swap the directional lights for slightly lower intensity.

- [ ] **Step 2: Typecheck**

```bash
cd /home/egonzalez/Projects/seg.bio/landing/seg.bio && npx tsc --noEmit
```
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
cd /home/egonzalez/Projects/seg.bio/landing
git add seg.bio/app/components/membrane-viewer.tsx
git commit -m "Add MembraneViewer 3D component for hero"
```

---

### Task B4: Generate a poster image for the fallback

**Files:**
- Create: `seg.bio/public/kidney-membranes-poster.webp`

- [ ] **Step 1: Reuse the provided render as a stand-in, or screenshot the live viewer**

Fastest faithful poster: once Task B5 wiring is in and the dev server runs, screenshot the rendered canvas. Interim/simple option (no browser needed): derive a dark poster from the provided membrane PNG so the fallback is on-theme:
```bash
cd /home/egonzalez/Projects/seg.bio/landing
convert "$HOME/Downloads/image (4).png" -resize 1200x -background '#0b0d10' -flatten \
  -quality 84 seg.bio/public/kidney-membranes-poster.webp
ls -la seg.bio/public/kidney-membranes-poster.webp
```
Expected: poster webp created. (If a true render screenshot is captured later during verification, overwrite this file.)

- [ ] **Step 2: Commit**

```bash
git add seg.bio/public/kidney-membranes-poster.webp
git commit -m "Add hero 3D poster fallback image"
```

---

### Task B5: Wire the viewer into the hero and rewrite the IDE-mock copy

**Files:**
- Modify: `seg.bio/app/components/hero.tsx` (IDEMock, lines 6–75)

- [ ] **Step 1: Replace the static image with the dynamically-imported viewer + poster fallback**

At the top of `hero.tsx` add the dynamic import (ssr disabled so three.js never runs on the server), backed by the poster:

```tsx
import dynamic from "next/dynamic";

const MembraneViewer = dynamic(() => import("./membrane-viewer"), {
  ssr: false,
  loading: () => (
    <img
      src="/kidney-membranes-poster.webp"
      alt="jrc_mus-kidney cell-membrane segmentation"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  ),
});
```

Then in `IDEMock`, replace the `<img src="/microns-vasculature.webp" .../>` inside `.canvas` with `<MembraneViewer />`, keeping the `.label` element.

- [ ] **Step 2: Rewrite the IDE-mock copy from vasculature → kidney membranes**

Update the following strings in `IDEMock`:
- URL line: `<b>seg.bio</b> / wei-lab / microns-mm3 / <b>vasculature</b>` → `<b>seg.bio</b> / cellmap / jrc_mus-kidney / <b>membranes</b>`
- Canvas label: `vasculature · MICrONS mm³` → `cell membranes · jrc_mus-kidney`
- Agent user bubble: `Segment vasculature in this volume` → `Segment cell membranes in this volume`
- Agent model line: `agent · vessel-zsf` → `agent · membrane-sdt`

Leave the plan step rows (Load tile / CLAHE + iso / Inference / Watershed / Write zarr) as-is — they read fine for membranes.

- [ ] **Step 3: Typecheck**

```bash
cd /home/egonzalez/Projects/seg.bio/landing/seg.bio && npx tsc --noEmit
```
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
cd /home/egonzalez/Projects/seg.bio/landing
git add seg.bio/app/components/hero.tsx
git commit -m "Render interactive 3D kidney-membrane mesh in hero; rewrite IDE-mock copy"
```

---

### Task B6: Remove the last MICrONS asset and verify the build

**Files:**
- Delete: `seg.bio/public/microns-vasculature.webp`

- [ ] **Step 1: Confirm nothing references it, then delete**

```bash
cd /home/egonzalez/Projects/seg.bio/landing
grep -rn "microns-vasculature" seg.bio/app && echo "STILL REFERENCED" || git rm seg.bio/public/microns-vasculature.webp
```
Expected: no references; file removed.

- [ ] **Step 2: Full no-MICrONS sweep**

```bash
grep -rni "microns" seg.bio/app && echo "REVIEW ABOVE" || echo "no microns references"
```
Expected: `no microns references` (the word "MICrONS" should no longer appear in any component copy or asset path).

- [ ] **Step 3: Production build**

```bash
cd seg.bio && npm run build
```
Expected: build completes without errors.

- [ ] **Step 4: Commit**

```bash
cd /home/egonzalez/Projects/seg.bio/landing
git add -A
git commit -m "Remove final MICrONS vasculature asset"
```

---

## Final verification (run after all tasks)

- [ ] **Visual check in the running app** (use the `run` skill / `npm run dev`): four tiles show the new imagery; the "Cell membrane" tile reads correctly; the hero canvas loads the 3D mesh, auto-rotates, and responds to orbit drag; disabling WebGL falls back to the poster.
- [ ] `cd seg.bio && npx tsc --noEmit` → exits 0.
- [ ] `npm run build` → succeeds.
- [ ] `grep -rni "microns" seg.bio/app` → no references.
- [ ] `ls seg.bio/public/microns-*.webp 2>/dev/null` → no files.
