// =====================================================================
//  SCENES — market-data-table. 5 hard-cut frames:
//    1 hook, 2 sharpen, 3 reveal (screenshot), 4 pay, 5 cta.
//  No morphs. The reveal frame is a real Gero screenshot.
// =====================================================================

let _REVEAL_IMG = null;

// -- a single text frame: large white display text, centered, on the dark stage.
function dsFrame(text, opts = {}) {
  const lines = text.split('\n');
  const size = opts.size ?? 120;
  const yStart = opts.yStart ?? (H / 2 - (lines.length - 1) * size * 0.6);
  ctx.save();
  ctx.font = `700 ${size}px ${DSF}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const c = (opts.color && opts.color[i]) || opts.color || DSB.type;
    ctx.fillStyle = c;
    ctx.fillText(line, CX, yStart + i * size * 1.05);
  }
  ctx.restore();
}

// =====================================================================
//  1 HOOK — "Which Cardano token traded the most today?"
// =====================================================================
function sceneHook() {
  dsBackdrop();
  const show = clamp((TT - 0.2) / 0.35);
  if (show > 0) {
    ctx.save();
    ctx.globalAlpha = show;
    // 3 lines at 88px — readable in ~1.5s, fits the safe area
    dsFrame('Which Cardano', { size: 88, yStart: 540 });
    dsFrame('token traded', { size: 88, yStart: 540 + 88 * 1.05 });
    dsFrame('the most today?', { size: 88, yStart: 540 + 176 * 1.05, color: DSB.cyan });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  2 SHARPEN — "Not ADA. Not SNEK."
// =====================================================================
function sceneSharpen() {
  dsBackdrop();
  // a beat of silence (just the dark stage + watermark) at 2.4-2.7s
  const beat = clamp((TT - 2.7) / 0.2);
  if (beat > 0) {
    ctx.save();
    ctx.globalAlpha = beat;
    dsFrame('Not ADA.', { size: 120, yStart: 800 });
    dsFrame('Not SNEK.', { size: 120, yStart: 800 + 120 * 1.05, color: DSB.cyan });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  3 REVEAL — the actual screenshot of the Gero live data strip
// =====================================================================
function sceneReveal() {
  if (!_REVEAL_IMG) {
    const im = asset('gero-reveal.png');
    if (!im) return;
    _REVEAL_IMG = im;
  }
  // the screenshot is 1080x1080, shown centered on the 1080x1920 stage
  const pop = clamp((TT - 4.2) / 0.25);
  if (pop > 0) {
    ctx.save();
    ctx.globalAlpha = pop;
    const w = 1080, h = 1080;
    const x = 0, y = (H - h) / 2;
    ctx.drawImage(_REVEAL_IMG, x, y, w, h);
    // a thin cyan border drawn as a stroke (not a fill)
    ctx.strokeStyle = DSB.cyan;
    ctx.lineWidth = 3;
    ctx.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
    ctx.restore();
  }
  // a small caption in the dark navy safe area above the screenshot
  const cap = clamp((TT - 4.6) / 0.35);
  if (cap > 0) {
    ctx.save();
    ctx.globalAlpha = cap;
    ctx.font = `600 38px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillStyle = DSB.cyan;
    ctx.fillText('Live from gerowallet.io', CX, 320);
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  4 PAY — "Every token. Ranked. One table."
// =====================================================================
function scenePay() {
  dsBackdrop();
  const show = clamp((TT - 8.0) / 0.3);
  if (show > 0) {
    ctx.save();
    ctx.globalAlpha = show;
    dsFrame('Every token.', { size: 96, yStart: 660 });
    dsFrame('Ranked.', { size: 96, yStart: 660 + 96 * 1.05, color: DSB.cyan });
    dsFrame('One table.', { size: 96, yStart: 660 + 192 * 1.05 });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  5 CTA — "Gero Wallet -> Market tab" + teaser for #3
// =====================================================================
function sceneCta() {
  dsBackdrop();
  // the CTA
  const cta = popS(TIMELINE.cues.cta);
  if (cta > 0) {
    ctx.save();
    ctx.globalAlpha = cta;
    dsPill('gerowallet.io/wallet/market-data', CX, 900, 30);
    ctx.restore();
  }
  // the label above the pill
  const label = clamp((TT - 10.0) / 0.3);
  if (label > 0) {
    ctx.save();
    ctx.globalAlpha = label;
    ctx.font = `600 36px ${DSF}`;
    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'center';
    ctx.fillStyle = DSB.muted;
    ctx.fillText('Gero Wallet  →  Market tab', CX, 860);
    ctx.restore();
  }
  // the teaser for #3 (the order book)
  const tease = popS(TIMELINE.cues.teaser);
  if (tease > 0) {
    ctx.save();
    ctx.globalAlpha = tease;
    ctx.font = `500 30px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillStyle = DSB.muted;
    ctx.fillText('Next: why your swap moved the price.', CX, 1080);
    // a small arrow
    ctx.font = `400 40px ${DSF}`;
    ctx.fillText('↓', CX, 1120);
    ctx.restore();
  }
  // the hero spot
  dsHero(540, 1380, 50, { key: 'h5', mood: 'wow' });
  dsWatermark();
}
