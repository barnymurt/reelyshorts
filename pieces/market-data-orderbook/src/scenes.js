// =====================================================================
//  SCENES — market-data-orderbook v3. Same format as #1 and #2.
// =====================================================================

let _REVEAL_IMG = null;

function dsBigLine(words, opts = {}) {
  const size = opts.size ?? 160;
  const x = opts.x ?? 80;
  const y = opts.y ?? 720;
  dsGlow(x + 50, y - size * 0.4, size * 4, opts.glowColor || DSB.glow, opts.glowAl || 0.55);
  ctx.save();
  ctx.font = `800 ${size}px ${DSF}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.shadowColor = opts.color || DSB.paper;
  ctx.shadowBlur = 28;
  ctx.fillStyle = opts.color || DSB.paper;
  ctx.fillText(words, x, y);
  ctx.shadowBlur = 0;
  ctx.fillText(words, x, y);
  ctx.restore();
}

// 1 HOOK — "You're seeing / half the book."
function sceneHook() {
  dsBackdrop();
  dsBigLine("You're seeing", { size: 130, y: 600, color: DSB.paper, glowAl: 0.4 });
  dsBigLine('half the book.', { size: 140, y: 760, color: DSB.paper, glowAl: 0.4 });
  // the punch word, in cyan, pops in
  const pop = popS(0.6);
  if (pop > 0) {
    ctx.save();
    ctx.globalAlpha = pop;
    dsBigLine('1 venue.', { size: 200, y: 980, color: DSB.cyanHi, glowAl: 0.6 });
    ctx.restore();
  }
  dsWatermark();
}

// 2 REVEAL — the Gero screenshot. MUSIC DROP.
function sceneReveal() {
  if (!_REVEAL_IMG) {
    const im = asset('gero-fullpage.png');
    if (!im) return;
    _REVEAL_IMG = im;
  }
  const a = clamp((TT - 3.0) / 0.3);
  if (a > 0) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.drawImage(_REVEAL_IMG, 0, 0, W, H);
    ctx.restore();
  }
  const cap = popS(0.4);
  if (cap > 0) {
    dsBigLine('Gero reads all 11.', { size: 100, y: 220, color: DSB.cyanHi, glowAl: 0.7, x: 80 });
    ctx.save();
    ctx.font = `500 32px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.paper;
    ctx.fillText('Every trade. Every bid. Every ask. In one view.', 80, 340);
    ctx.restore();
  }
  dsWatermark();
}

// 3 PAY — "Every trade. / One view."
function scenePay() {
  dsBackdrop();
  dsBigLine('Every trade.', { size: 140, y: 740, color: DSB.paper, glowAl: 0.4 });
  const pop = popS(0.3);
  if (pop > 0) {
    ctx.save();
    ctx.globalAlpha = pop;
    dsBigLine('One view.', { size: 180, y: 920, color: DSB.cyanHi, glowAl: 0.6 });
    ctx.restore();
  }
  dsWatermark();
}

// 4 CTA
function sceneCta() {
  dsBackdrop();
  dsBigLine('Open it.', { size: 200, y: 680, color: DSB.paper, glowAl: 0.5 });
  const pillPop = popS(0.4);
  if (pillPop > 0) {
    ctx.save();
    ctx.globalAlpha = pillPop;
    dsPill('gerowallet.io/wallet/market-data', CX, 960, 36);
    ctx.restore();
  }
  ctx.save();
  ctx.font = `500 28px ${DSF}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';
  ctx.fillStyle = DSB.muted;
  ctx.fillText('Locking horns with digital assets', CX, 1300);
  ctx.restore();
  dsWatermark();
}
