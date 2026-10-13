// =====================================================================
//  styles/thedigitalstag/kit.js — calm, considered editorial on a dark navy stage.
//  Built on kit/core.js (RNG, EZ, wobble, ink, paint, hatch, pencil, stipple,
//  grain, monoText, monoW, handwrite, drawPencil, monoText, etc.).
//  Needs from the piece head: HAND (a font stack), CX (caption centre x).
//  All helpers are prefixed with `ds` to avoid colliding with core names.
//  Nothing carries between frames; the renderer clears each era's layer.
// =====================================================================

const DSF = '"Inter", "Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';
const DSM = '"JetBrains Mono", "Consolas", "Menlo", monospace';

// the measured palette (kept as a const so pieces can read it; tokens are also hard-coded
// in the helper functions for the rendering hot path).
const DSB = {
  bg:        '#0A1118',     // darker than before — higher contrast with white type
  surface:   '#142A3E',
  surface2:  '#1B3650',
  line:      '#5A7FA0',
  lineDark:  '#324975',
  ink:       '#1C3E69',
  paper:     '#FFFFFF',     // pure white for the main display type
  type:      '#FFFFFF',     // pure white, not the previous off-white
  muted:     '#B8C5D2',     // brighter than #9FB0BF so it reads on dark
  cyanHi:    '#38BDF8',     // brighter cyan (Tailwind sky-400) for higher visibility
  cyanLo:    '#22D3EE',
  cyan:      '#0EA5E9',
  accent:    '#FB923C',     // warm orange accent for energy (used on the key word)
  glow:      'rgba(56, 189, 248, 0.18)',   // cyan halo for the glow helper
};

// ---------------------------------------------------------------------
//  STAGE: dark navy with sparse grain and a soft vignette. Always the first call in a scene.
// ---------------------------------------------------------------------
function dsBackdrop(c) {
  fillAll(c || DSB.bg);
  // soft vignette: a radial gradient from surface in the centre to bg at the edges
  const g = ctx.createRadialGradient(W / 2, H * 0.45, Math.min(W, H) * 0.15, W / 2, H * 0.55, Math.max(W, H) * 0.8);
  g.addColorStop(0, 'rgba(27, 54, 80, 0.55)');
  g.addColorStop(1, 'rgba(14, 26, 40, 0)');
  ctx.save();
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

// grain pass, called from STYLE.post. Sparse and low-alpha so the dark never reads as flat.
function dsGrain(n = 1600, al = 0.08) {
  const R = RNG('grain', B);
  ctx.save();
  ctx.fillStyle = `rgba(234, 238, 242, ${al})`;
  for (let i = 0; i < n; i++) ctx.fillRect(R.r(0, W), R.r(0, H), R.r(0.6, 1.4), R.r(0.6, 1.4));
  ctx.fillStyle = `rgba(10, 18, 28, ${al * 0.9})`;
  for (let i = 0; i < Math.floor(n * 0.6); i++) ctx.fillRect(R.r(0, W), R.r(0, H), R.r(0.6, 1.4), R.r(0.6, 1.4));
  ctx.restore();
}

// ---------------------------------------------------------------------
//  SURFACES: a card, a panel, a thin isometric line slab (the visual proxy for a "block").
// ---------------------------------------------------------------------
const dsBox = (x, y, w, h) => resample([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], true, 30);

function dsCard(x, y, w, h, key, o = {}) {
  const fill = o.fill || DSB.surface;
  const lc = o.line || DSB.line;
  const lw = o.wline ?? 2.5;
  paint(dsBox(x, y, w, h), {
    fill, line: lc, w: lw, key: key + 'c',
    tex: [{ k: 'pencil', c: DSB.surface2, al: 0.35, per: 80, a: -0.5 }],
  });
}
function dsPanel(x, y, w, h, key, o = {}) { return dsCard(x, y, w, h, key, { ...o, fill: o.fill || DSB.surface }); }

// a thin isometric line slab: constant hairline, one dark accent face, rounded top edges.
// the reference's 3D blocks are heavy isometric renders; we draw a cleaner, line-only proxy
// so pieces still read as "block diagram" without faking 3D.
function dsSlab(cx, cy, w, h, key, o = {}) {
  const top = o.top || DSB.surface;
  const left = o.left || DSB.lineDark;
  const right = o.right || DSB.ink;
  const lw = o.wline ?? 2;
  const depth = o.depth ?? Math.round(w * 0.18);
  // top face (rounded rect outline)
  const topP = rrectPts(cx - w / 2, cy - h / 2 - depth * 0.4, w, h, 8);
  paint(topP, { fill: top, line: DSB.line, w: lw, key: key + 't', tex: [{ k: 'pencil', c: DSB.surface2, al: 0.4, per: 90 }] });
  // left face
  const leftP = [
    [cx - w / 2, cy - h / 2 - depth * 0.4 + 8],
    [cx - w / 2, cy + h / 2 - depth * 0.4],
    [cx - w / 2 - depth, cy + h / 2 + depth * 0.6 - 2],
    [cx - w / 2 - depth, cy - h / 2 + depth * 0.6 - 2],
  ];
  paint(leftP, { fill: left, line: DSB.line, w: lw, key: key + 'l' });
  // right face
  const rightP = [
    [cx + w / 2 - 8, cy - h / 2 - depth * 0.4],
    [cx + w / 2 - 8, cy + h / 2 - depth * 0.4 - 2],
    [cx + w / 2 + depth - 8, cy + h / 2 + depth * 0.6 - 4],
    [cx + w / 2 + depth - 8, cy - h / 2 + depth * 0.6 - 4],
  ];
  paint(rightP, { fill: right, line: DSB.line, w: lw, key: key + 'r' });
}

// an underline accent (cyan on Gero content) used to highlight a number or a CTA.
function dsAccent(x, y, w, key, o = {}) {
  const al = o.al ?? 0.85;
  const grad = ctx.createLinearGradient(x, y, x + w, y);
  grad.addColorStop(0, DSB.cyanHi);
  grad.addColorStop(1, DSB.cyanLo);
  ctx.save();
  ctx.globalAlpha = al;
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, o.h ?? 4);
  ctx.restore();
}

// a small cyan pill, used for the gerowallet.io CTA on the end card.
function dsPill(str, x, y, size, o = {}) {
  ctx.save();
  // measure the text first, then size the pill with generous padding so the text always fits
  ctx.font = `600 ${size}px ${DSF}`;
  const tw = ctx.measureText(str).width;
  const w = tw + size * 2.4, h = size * 1.9;
  const cx = x, cy = y;
  const grad = ctx.createLinearGradient(cx - w / 2, cy, cx + w / 2, cy);
  grad.addColorStop(0, DSB.cyanHi);
  grad.addColorStop(1, DSB.cyanLo);
  ctx.translate(cx, cy);
  paint(rrectPts(-w / 2, -h / 2, w, h, h / 2), { fill: grad, line: DSB.cyanLo, w: 1.5, key: 'pill' + str });
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = DSB.bg;
  ctx.fillText(str, 0, 2);
  ctx.restore();
}

// ---------------------------------------------------------------------
//  GLOW: a soft radial gradient halo behind text. The references use this to
//  make text feel like it glows off the dark stage. Cheap on canvas.
// ---------------------------------------------------------------------
function dsGlow(cx, cy, r, color, al = 0.55) {
  ctx.save();
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, color.replace(/[0-9.]+\)$/, `${al})`));
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  ctx.restore();
}

// ---------------------------------------------------------------------
//  FRAME: large display text. Pure white, bold, with a soft glow shadow.
//  Lines are split on '\n'. Per-line colors can be passed as opts.color
//  (string or array of strings). The first line defaults to white;
//  subsequent lines take from the array.
// ---------------------------------------------------------------------
function dsFrame(text, opts = {}) {
  const lines = text.split('\n');
  const size = opts.size ?? 160;
  const lh = size * 1.0;
  const totalH = lh * lines.length;
  const yStart = opts.yStart ?? (H / 2 - totalH / 2 + size * 0.35);
  ctx.save();
  ctx.textAlign = opts.align || 'left';
  ctx.textBaseline = 'alphabetic';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const x = ctx.textAlign === 'center' ? CX : (opts.x ?? 80);
    const y = yStart + i * lh;
    const color = (Array.isArray(opts.color) ? opts.color[i] : opts.color) || DSB.paper;
    // soft glow shadow
    ctx.shadowColor = color;
    ctx.shadowBlur = opts.glow ?? 24;
    ctx.font = `800 ${size}px ${DSF}`;
    ctx.fillStyle = color;
    ctx.fillText(line, x, y);
    // a second pass for crispness (no shadow)
    ctx.shadowBlur = 0;
    ctx.fillText(line, x, y);
  }
  ctx.restore();
}

// ---------------------------------------------------------------------
//  The "hero" spot is GONE in the new format. We keep a no-op so any
//  leftover calls don't crash, but new pieces should not use it.
// ---------------------------------------------------------------------
function dsHero() { /* removed in the rebuild — the round circle was a v1 leftover */ }

// ---------------------------------------------------------------------
//  WATERMARK: the stag-circle logo (actual PNG asset) in the top-left corner.
//  Drawn through DEFER so it sits over the camera. Higher opacity so it
//  reads as a brand mark, not a ghost. The wordmark sits to the right.
//  Pieces must include `assets/stag-circle.png` for this to render.
// ---------------------------------------------------------------------
let _STAG_IMG = null;
function dsWatermark(o = {}) {
  const f = () => {
    const cx = 100, cy = 120, r = 56;
    const a = o.al ?? 0.92;
    // load the asset on first use; cache the HTMLImageElement
    if (!_STAG_IMG) {
      const im = asset('stag-circle.png');
      if (!im) return;   // asset not in pieces/<name>/assets/ — silently skip
      _STAG_IMG = im;
    }
    ctx.save();
    ctx.globalAlpha = a;
    // the logo PNG (447x447, transparent corners, circular crop)
    ctx.drawImage(_STAG_IMG, cx - r, cy - r, r * 2, r * 2);
    ctx.restore();
    // wordmark "thedigitalstag" — to the right of the logo
    ctx.save();
    ctx.font = `600 28px ${DSF}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.type;
    ctx.fillText('thedigitalstag', cx + r + 22, cy + 2);
    // small wordmark tagline (stag-themed, about our space)
    ctx.font = `400 16px ${DSF}`;
    ctx.fillStyle = DSB.muted;
    ctx.fillText('Locking horns with digital assets', cx + r + 22, cy + 28);
    ctx.restore();
  };
  if (DEFER) DEFER.push(f); else f();
}

// ---------------------------------------------------------------------
//  CAPTIONS: an Inter tag (top, small, cyan on Gero content) and a centered caption
//  (off-white body). Drawn after the camera (DEFER) so they sit at screen size.
// ---------------------------------------------------------------------
function dsTag(str, o = {}) {
  const f = () => {
    const size = o.size ?? 32;
    const x = o.x ?? 80, y = o.y ?? 220;
    const c = o.color || DSB.cyanHi;
    ctx.save();
    ctx.font = `600 ${size}px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = c;
    ctx.globalAlpha = popS(E0 + (o.delay ?? 0.15));
    ctx.fillText(str.toUpperCase(), x, y);
    ctx.restore();
  };
  if (DEFER) DEFER.push(f); else f();
}
function dsCaption(str, o = {}) {
  const f = () => {
    const size = o.size ?? 56;
    const c = o.color || DSB.type;
    const y = o.y ?? 1440;
    ctx.save();
    ctx.font = `500 ${size}px ${DSF}`;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'center';
    ctx.fillStyle = c;
    ctx.globalAlpha = 1;
    const w = ctx.measureText(str).width;
    if (o.frac != null && o.frac < 1) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(CX - w / 2 - 10, y - size * 1.2, w * clamp(o.frac) + 20, size * 1.6);
      ctx.clip();
      ctx.fillText(str, CX, y);
      ctx.restore();
    } else {
      ctx.fillText(str, CX, y);
    }
    ctx.restore();
  };
  if (DEFER) DEFER.push(f); else f();
}

// =====================================================================
//  STYLE — the renderer's hooks (kit/morph.js).
// =====================================================================
const STYLE = {
  name: 'thedigitalstag',
  paper: DSB.bg,                                                      // the sheet a morph happens on (dark, not paper)
  backdrop(c) { dsBackdrop(c); },                                     // the frame filled, with grain + vignette
  window(P, key, src) {                                               // the world seen through outline P: clean rectangular window
    // In the new no-morph format, P may be undefined. Just draw the era directly.
    if (!P) return;
    const Q = wobble(P, true, 1.6, key, 8);
    ctx.save(); trace(Q, true); ctx.clip(); ctx.drawImage(src, 0, 0); ctx.restore();
    ctx.save(); ink(Q, { closed: true, w: 3.0, color: DSB.line, key: key + 'rim', amt: 1.4 }); ctx.restore();
  },
  blob(P, c, key) {                                                   // the morphing shape: a stag-light slab
    if (!P) return;
    paint(wobble(P, true, 1.2, key, 8), { fill: c, key, line: DSB.line, w: 3, tex: [{ k: 'pencil', c: DSB.surface2, al: 0.35, per: 80 }] });
  },
  hero(x, y, r, o) { /* removed in the rebuild — the round circle was a v1 leftover */ },
  heroColor: DSB.ink,
  heroPts: (x, y, r) => ellipsePts(x, y, r, r * 0.95, 0, 96),
  post() { dsGrain(2400, 0.12); },                                    // denser grain for a more cinematic feel
  ones: false,                                                        // motion on 2s
};
