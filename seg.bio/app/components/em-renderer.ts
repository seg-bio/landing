// Synthesized EM-like volume renderer.
// Generates a noisy grayscale "electron micrograph" with membrane-like
// structures and colored instance/semantic overlays. Seeded so z-slices look continuous.

type ClassMap = {
  neuron?: boolean;
  mito?: boolean;
  nucleus?: boolean;
  vessel?: boolean;
  vesicle?: boolean;
  synapse?: boolean;
};

export type RenderOpts = {
  overlay?: boolean;
  classes?: ClassMap;
  noise?: number;
  brightness?: number;
  mode?: "dark" | "light";
  proof?: { z: number; erased?: [number, number, number][]; painted?: [number, number, number][] };
  highlightId?: string;
};

function h3(x: number, y: number, z: number, seed = 1): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719 + seed * 17.137) * 43758.5453;
  return n - Math.floor(n);
}
function smooth(a: number, b: number, t: number): number {
  t = t * t * (3 - 2 * t);
  return a * (1 - t) + b * t;
}

function vnoise(x: number, y: number, z: number, seed = 1): number {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const c000 = h3(xi, yi, zi, seed);
  const c100 = h3(xi + 1, yi, zi, seed);
  const c010 = h3(xi, yi + 1, zi, seed);
  const c110 = h3(xi + 1, yi + 1, zi, seed);
  const c001 = h3(xi, yi, zi + 1, seed);
  const c101 = h3(xi + 1, yi, zi + 1, seed);
  const c011 = h3(xi, yi + 1, zi + 1, seed);
  const c111 = h3(xi + 1, yi + 1, zi + 1, seed);
  const x00 = smooth(c000, c100, xf);
  const x10 = smooth(c010, c110, xf);
  const x01 = smooth(c001, c101, xf);
  const x11 = smooth(c011, c111, xf);
  const y0 = smooth(x00, x10, yf);
  const y1 = smooth(x01, x11, yf);
  return smooth(y0, y1, zf);
}
function fbm(x: number, y: number, z: number, oct = 4, seed = 1): number {
  let f = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < oct; i++) {
    f += amp * vnoise(x * freq, y * freq, z * freq, seed + i * 3);
    amp *= 0.5; freq *= 2;
  }
  return f;
}

// Deterministic PRNG so the geometry is identical between SSR and CSR
// (the canvas only paints client-side, but stable arrays make hot-reloads
// less jarring and avoid hydration-time recomputation).
let prngState = 0x9e3779b1;
function srand(): number {
  prngState = (prngState + 0x6d2b79f5) | 0;
  let t = prngState;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

type Cell = { cx: number; cy: number; r: number; dx: number; dy: number; class: number };
type Mito = { cx: number; cy: number; rx: number; ry: number; rot: number; zStart: number; zLen: number };
type Vesicle = { cx: number; cy: number; r: number; zStart: number; zLen: number };
type Synapse = { cx: number; cy: number; r: number; zStart: number; zLen: number };

const CELLS: Cell[] = [];
const N_CELLS = 48;
for (let i = 0; i < N_CELLS; i++) {
  CELLS.push({
    cx: srand(),
    cy: srand(),
    r: 0.08 + srand() * 0.14,
    dx: (srand() - 0.5) * 0.0018,
    dy: (srand() - 0.5) * 0.0018,
    class: [0, 0, 0, 1, 1, 2, 3, 4][Math.floor(srand() * 8)],
  });
}

const MITOS: Mito[] = [];
for (let i = 0; i < 120; i++) {
  MITOS.push({
    cx: srand(),
    cy: srand(),
    rx: 0.015 + srand() * 0.025,
    ry: 0.008 + srand() * 0.014,
    rot: srand() * Math.PI,
    zStart: srand() * 200,
    zLen: 6 + srand() * 20,
  });
}

const VESICLES: Vesicle[] = [];
for (let i = 0; i < 240; i++) {
  VESICLES.push({
    cx: srand(),
    cy: srand(),
    r: 0.003 + srand() * 0.005,
    zStart: srand() * 200,
    zLen: 1 + srand() * 3,
  });
}

const SYNAPSES: Synapse[] = [];
for (let i = 0; i < 60; i++) {
  SYNAPSES.push({
    cx: srand(),
    cy: srand(),
    r: 0.004 + srand() * 0.004,
    zStart: srand() * 200,
    zLen: 2 + srand() * 5,
  });
}

export const OVERLAY_COLORS: Record<string, string> = {
  neuron: "rgba(255, 140, 180, 0.48)",
  mito:   "rgba(110, 210, 235, 0.55)",
  nucleus:"rgba(255, 205, 120, 0.45)",
  vessel: "rgba(180, 150, 255, 0.42)",
  vesicle:"rgba(150, 225, 150, 0.65)",
  synapse:"rgba(255, 130, 90, 0.8)",
};
const CLASS_KEY = ["neuron", "mito", "nucleus", "vessel", "vesicle"] as const;

function cellColor(c: number): string {
  return OVERLAY_COLORS[CLASS_KEY[c]];
}

export const N_SLICES = 200;

export function renderPlane(
  canvas: HTMLCanvasElement,
  plane: "xy" | "xz" | "yz",
  z: number,
  opts: RenderOpts = {},
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1, Math.floor(rect.width * dpr));
  const h = Math.max(1, Math.floor(rect.height * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  ctx.save();
  ctx.scale(dpr, dpr);
  const W = rect.width, H = rect.height;

  const overlay = opts.overlay ?? true;
  const classes: ClassMap = opts.classes ?? {
    neuron: true, mito: true, nucleus: true, vessel: true, vesicle: true, synapse: false,
  };
  const noiseAmt = opts.noise ?? 0.55;

  const downscale = 2;
  const iw = Math.ceil(W / downscale);
  const ih = Math.ceil(H / downscale);
  const img = ctx.createImageData(iw, ih);
  const d = img.data;
  for (let yy = 0; yy < ih; yy++) {
    for (let xx = 0; xx < iw; xx++) {
      let u: number, v: number, zc: number;
      if (plane === "xy") { u = xx / iw; v = yy / ih; zc = z * 0.05; }
      else if (plane === "xz") { u = xx / iw; v = z / 200; zc = (yy / ih) * 4; }
      else { u = yy / ih; v = z / 200; zc = (xx / iw) * 4; }
      const n1 = fbm(u * 8, v * 8, zc, 4, 7);
      const n2 = fbm(u * 30, v * 30, zc * 1.5, 3, 11);
      const memb = Math.max(0, 0.15 - Math.abs(fbm(u * 5, v * 5, zc * 0.8, 3, 19) - 0.5)) * 6;
      let g = 0.58 + (n1 - 0.5) * 0.45 + (n2 - 0.5) * 0.18 * noiseAmt - memb * 0.6;
      g = Math.max(0, Math.min(1, g));
      const grain = (h3(xx, yy, z, 31) - 0.5) * 0.18 * noiseAmt;
      g = Math.max(0, Math.min(1, g + grain));
      const v255 = Math.round(g * 220 + 20);
      const off = (yy * iw + xx) * 4;
      d[off] = v255; d[off + 1] = v255; d[off + 2] = v255; d[off + 3] = 255;
    }
  }
  const tmp = document.createElement("canvas");
  tmp.width = iw; tmp.height = ih;
  tmp.getContext("2d")!.putImageData(img, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(tmp, 0, 0, W, H);

  if (overlay && plane === "xy") {
    ctx.save();

    CELLS.forEach((c, idx) => {
      const cx = (c.cx + c.dx * z) % 1, cy = (c.cy + c.dy * z) % 1;
      const key = CLASS_KEY[c.class];
      if (!classes[key]) return;
      ctx.fillStyle = cellColor(c.class);
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      const steps = 48;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const wobble = 0.65 + 0.5 * fbm(Math.cos(a) * 2 + idx, Math.sin(a) * 2 + idx, z * 0.02, 2, idx + 1);
        const r = c.r * wobble;
        const px = (cx + Math.cos(a) * r) * W;
        const py = (cy + Math.sin(a) * r) * H;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      if (opts.highlightId === "cell-" + idx) {
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(255, 80, 40, 0.95)";
        ctx.setLineDash([4, 3]);
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.stroke();
      }
    });

    if (classes.mito) {
      ctx.fillStyle = OVERLAY_COLORS.mito;
      ctx.strokeStyle = "rgba(20,80,95,0.6)";
      ctx.lineWidth = 0.8;
      MITOS.forEach((m) => {
        if (z < m.zStart || z > m.zStart + m.zLen) return;
        const cx = m.cx * W, cy = m.cy * H;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(m.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, m.rx * W, m.ry * H, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });
    }

    if (classes.vesicle) {
      ctx.fillStyle = OVERLAY_COLORS.vesicle;
      VESICLES.forEach((v) => {
        if (z < v.zStart || z > v.zStart + v.zLen) return;
        ctx.beginPath();
        ctx.arc(v.cx * W, v.cy * H, v.r * W, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    if (classes.synapse) {
      ctx.fillStyle = OVERLAY_COLORS.synapse;
      SYNAPSES.forEach((s) => {
        if (z < s.zStart || z > s.zStart + s.zLen) return;
        ctx.beginPath();
        ctx.arc(s.cx * W, s.cy * H, s.r * W, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    if (opts.proof && opts.proof.z === z) {
      ctx.globalCompositeOperation = "destination-out";
      (opts.proof.erased || []).forEach(([x, y, r]) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(255,130,90,0.55)";
      (opts.proof.painted || []).forEach(([x, y, r]) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    ctx.restore();
  } else if (overlay) {
    ctx.save();
    CELLS.forEach((c) => {
      const key = CLASS_KEY[c.class];
      if (!classes[key]) return;
      ctx.fillStyle = cellColor(c.class);
      ctx.strokeStyle = "rgba(0,0,0,0.2)";
      ctx.lineWidth = 0.8;
      for (let zz = 0; zz < 200; zz += 4) {
        const cx = (c.cx + c.dx * zz) % 1, cy = (c.cy + c.dy * zz) % 1;
        if (plane === "xz") {
          if (Math.abs(cy - z / 200) > 0.02) continue;
          const px = cx * W, py = (zz / 200) * H;
          const r = c.r * W * 0.6;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          if (Math.abs(cx - z / 200) > 0.02) continue;
          const px = cy * W, py = (zz / 200) * H;
          const r = c.r * W * 0.6;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
    ctx.restore();
  }

  ctx.restore();
}
