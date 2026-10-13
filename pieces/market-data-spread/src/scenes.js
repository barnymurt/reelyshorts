// =====================================================================
//  SCENES — market-data-spread (#4). 6 hard-cut frames.
//  1 hook, 2 sharpen, 3 liquidity, 4 reveal, 5 pay, 6 cta.
// =====================================================================

let _REVEAL_IMG = null;

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
//  1 HOOK — "3 tokens. Same minute. 3 prices."
// =====================================================================
function sceneHook() {
  dsBackdrop();
  const show = clamp((TT - 0.2) / 0.3);
  if (show > 0) {
    ctx.save();
    ctx.globalAlpha = show;
    dsFrame('3 tokens.', { size: 100, yStart: 660 });
    dsFrame('Same minute.', { size: 100, yStart: 660 + 100 * 1.05 });
    dsFrame('3 prices.', { size: 100, yStart: 660 + 200 * 1.05, color: DSB.cyan });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  2 SHARPEN — "Why?"
// =====================================================================
function sceneSharpen() {
  dsBackdrop();
  const show = clamp((TT - 1.7) / 0.2);
  if (show > 0) {
    ctx.save();
    ctx.globalAlpha = show;
    dsFrame('Why?', { size: 220, yStart: 920, color: DSB.cyan });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  3 LIQUIDITY — "Liquidity is split across 11 DEXes."
// =====================================================================
function sceneLiquidity() {
  dsBackdrop();
  const show = clamp((TT - 3.0) / 0.3);
  if (show > 0) {
    ctx.save();
    ctx.globalAlpha = show;
    dsFrame('Liquidity is split', { size: 80, yStart: 760 });
    dsFrame('across 11 DEXes.', { size: 80, yStart: 760 + 80 * 1.05, color: DSB.cyan });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  4 REVEAL — the Gero screenshot
// =====================================================================
function sceneReveal() {
  if (!_REVEAL_IMG) {
    const im = asset('gero-reveal.png');
    if (!im) return;
    _REVEAL_IMG = im;
  }
  const pop = clamp((TT - 4.4) / 0.25);
  if (pop > 0) {
    ctx.save();
    ctx.globalAlpha = pop;
    const w = 1080, h = 1080;
    const x = 0, y = (H - h) / 2;
    ctx.drawImage(_REVEAL_IMG, x, y, w, h);
    ctx.strokeStyle = DSB.cyan;
    ctx.lineWidth = 3;
    ctx.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
    ctx.restore();
  }
  const cap = clamp((TT - 4.8) / 0.35);
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
//  5 PAY — "Gero shows you all of them."
// =====================================================================
function scenePay() {
  dsBackdrop();
  const show = clamp((TT - 8.0) / 0.3);
  if (show > 0) {
    ctx.save();
    ctx.globalAlpha = show;
    dsFrame('Gero shows you', { size: 100, yStart: 760 });
    dsFrame('all of them.', { size: 100, yStart: 760 + 100 * 1.05, color: DSB.cyan });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  6 CTA — "Gero Wallet -> Market tab" + teaser for #5
// =====================================================================
function sceneCta() {
  dsBackdrop();
  const cta = popS(TIMELINE.cues.cta);
  if (cta > 0) {
    ctx.save();
    ctx.globalAlpha = cta;
    dsPill('gerowallet.io/wallet/market-data', CX, 900, 30);
    ctx.restore();
  }
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
  // teaser for #5 (P&L)
  const tease = popS(TIMELINE.cues.teaser);
  if (tease > 0) {
    ctx.save();
    ctx.globalAlpha = tease;
    ctx.font = `500 30px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillStyle = DSB.muted;
    ctx.fillText('Next: are you up on Cardano in under 10 seconds?', CX, 1080);
    ctx.font = `400 40px ${DSF}`;
    ctx.fillText('↓', CX, 1120);
    ctx.restore();
  }
  dsHero(540, 1380, 50, { key: 'h7', mood: 'wow' });
  dsWatermark();
}
