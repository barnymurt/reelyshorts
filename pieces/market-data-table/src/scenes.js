// =====================================================================
//  SCENES — market-data-table v3. Same format as #1:
//    - No dsHero.
//    - Large white display text with a soft glow, one cyan accent word.
//    - Full-viewport Gero UI screenshot for the reveal.
//    - Bigger pill CTA at the end.
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

// 1 HOOK — "Which token / traded the most? / Not ADA. Not SNEK."
function sceneHook() {
  dsBackdrop();
  dsBigLine('Which token', { size: 150, y: 560, color: DSB.paper, glowAl: 0.4 });
  dsBigLine('traded most?', { size: 150, y: 730, color: DSB.paper, glowAl: 0.4 });
  // the answer, in cyan, pops in
  const pop = popS(0.6);
  if (pop > 0) {
    ctx.save();
    ctx.globalAlpha = pop;
    dsBigLine('Not ADA.', { size: 160, y: 950, color: DSB.accent, glowAl: 0.6 });
    dsBigLine('Not SNEK.', { size: 160, y: 1130, color: DSB.cyanHi, glowAl: 0.6 });
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
  // a slight dim + caption on top
  const cap = popS(0.4);
  if (cap > 0) {
    dsBigLine('NIGHT is #1.', { size: 120, y: 220, color: DSB.cyanHi, glowAl: 0.7, x: 80 });
    ctx.save();
    ctx.font = `500 32px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.paper;
    ctx.fillText('+$300K traded in 24h. Live from gerowallet.io.', 80, 370);
    ctx.restore();
  }
  dsWatermark();
}

// 3 PAY — "Every token. / One table."
function scenePay() {
  dsBackdrop();
  dsBigLine('Every token.', { size: 140, y: 740, color: DSB.paper, glowAl: 0.4 });
  const pop = popS(0.3);
  if (pop > 0) {
    ctx.save();
    ctx.globalAlpha = pop;
    dsBigLine('One table.', { size: 180, y: 920, color: DSB.cyanHi, glowAl: 0.6 });
    ctx.restore();
  }
  dsWatermark();
}

// 4 CTA — "Open it." + big pill + tagline
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
