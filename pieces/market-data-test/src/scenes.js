// =====================================================================
//  SCENES — market-data-test v3. New format:
//    - No dsHero. The round circle is gone.
//    - Large white display text (2-3 words) with a soft glow.
//    - Full-viewport Gero UI screenshot for the reveal (not cropped).
//    - The accent word is in bright cyan.
//    - A subtle orange glow behind the text adds energy.
// =====================================================================

let _REVEAL_IMG = null;

// -- a 2-3 word display line, with an optional accent color on the last word.
function dsBigLine(words, opts = {}) {
  const size = opts.size ?? 180;
  const x = opts.x ?? 80;
  const y = opts.y ?? 720;
  // soft glow behind the line
  dsGlow(x + 50, y - size * 0.4, size * 4, opts.glowColor || DSB.glow, opts.glowAl || 0.55);
  ctx.save();
  ctx.font = `800 ${size}px ${DSF}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  // text with a soft shadow for legibility
  ctx.shadowColor = opts.color || DSB.paper;
  ctx.shadowBlur = 28;
  ctx.fillStyle = opts.color || DSB.paper;
  ctx.fillText(words, x, y);
  // second pass for crispness
  ctx.shadowBlur = 0;
  ctx.fillText(words, x, y);
  ctx.restore();
}

// =====================================================================
//  1 HOOK — "5 sites. / 5 prices. / One's right."
// =====================================================================
function sceneHook() {
  dsBackdrop();
  dsBigLine('5 sites.', { size: 160, y: 600, color: DSB.paper, glowAl: 0.4 });
  dsBigLine('5 prices.', { size: 160, y: 780, color: DSB.paper, glowAl: 0.4 });
  const pop = popS(0.6);
  if (pop > 0) {
    ctx.save();
    ctx.globalAlpha = pop;
    dsBigLine("One's right.", { size: 140, y: 960, color: DSB.cyanHi, glowAl: 0.6 });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  2 SHARPEN — "Not ADA. / Not SNEK."
// =====================================================================
function sceneSharpen() {
  dsBackdrop();
  dsBigLine('Not ADA.', { size: 180, y: 760, color: DSB.paper, glowAl: 0.4 });
  const pop = popS(0.2);
  if (pop > 0) {
    ctx.save();
    ctx.globalAlpha = pop;
    dsBigLine('Not SNEK.', { size: 180, y: 980, color: DSB.accent, glowAl: 0.6 });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  3 REVEAL — the full-viewport Gero UI screenshot. MUSIC DROP at 4.2s.
// =====================================================================
function sceneReveal() {
  if (!_REVEAL_IMG) {
    const im = asset('gero-fullpage.png');
    if (!im) return;
    _REVEAL_IMG = im;
  }
  // darken the screenshot slightly so the cyan text on top reads
  const pop = popS(0.0);
  if (pop > 0) {
    ctx.save();
    ctx.globalAlpha = pop * 0.35;  // dim the screenshot
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    ctx.drawImage(_REVEAL_IMG, 0, 0, W, H);
    ctx.restore();
  } else {
    // a quick fade-in (0.3s)
    const a = clamp((TT - 4.2) / 0.3);
    if (a > 0) {
      ctx.save();
      ctx.globalAlpha = a;
      ctx.drawImage(_REVEAL_IMG, 0, 0, W, H);
      ctx.restore();
    }
  }
  // the headline over the screenshot (in the top safe area)
  const cap = popS(0.4);
  if (cap > 0) {
    dsBigLine('Gero reads all 11.', { size: 80, y: 200, color: DSB.cyanHi, glowAl: 0.7, x: 80 });
    ctx.save();
    ctx.font = `500 36px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.paper;
    ctx.fillText('11 venues. 1 wallet. 1 price per token.', 80, 290);
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  4 PAY — "venue in / one tab."
// =====================================================================
function scenePay() {
  dsBackdrop();
  dsBigLine('venue in', { size: 160, y: 760, color: DSB.paper, glowAl: 0.4 });
  const pop = popS(0.3);
  if (pop > 0) {
    ctx.save();
    ctx.globalAlpha = pop;
    dsBigLine('one tab.', { size: 180, y: 940, color: DSB.cyanHi, glowAl: 0.6 });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  5 CTA — big gerowallet.io pill + tagline
// =====================================================================
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
