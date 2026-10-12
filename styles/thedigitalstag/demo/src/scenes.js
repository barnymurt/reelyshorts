// =====================================================================
//  SCENES — thedigitalstag demo. Two dark eras. The first: a card with three steps
//  (three pale slabs in a row, the first one picked out in cyan). The second: the
//  same row, but every slab is filled cyan and a small "delegated" line is drawn
//  under each. The bridge object is the cyan glow under the first slab — it morphs
//  into the row of "delegated" lines.
// =====================================================================

function dsStepPillX(cx, y, n, key, done) {
  // a small step indicator: a circle with a number, at the given x
  const r = 28;
  paint(ellipsePts(cx, y, r, r, 0, 32), {
    fill: done ? DSB.cyan : DSB.surface, line: done ? DSB.cyan : DSB.line, w: done ? 2.5 : 2, key: key + 'd',
    tex: [{ k: 'pencil', c: DSB.surface2, al: 0.3, per: 80 }],
  });
  ctx.save();
  ctx.font = `700 30px ${DSF}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = done ? DSB.bg : DSB.type;
  ctx.fillText(String(n), cx, y + 2);
  ctx.restore();
  return y + r;
}

function sceneStake() {
  dsBackdrop();
  // title block at the top
  dsTag('STAKE WITH GERO');
  // display title
  ctx.save();
  ctx.font = `700 96px ${DSF}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.fillStyle = DSB.type;
  ctx.fillText('Three taps.', 80, 360);
  ctx.fillText('Your keys.',  80, 470);
  ctx.restore();
  // the wallet card in the middle
  dsCard(120, 700, 840, 540, 'card');
  // three slabs inside the card, the first one highlighted in cyan
  const slabY = 1000, slabW = 200, slabH = 120;
  const gap = 70;
  const startX = CX - (slabW * 3 + gap * 2) / 2;
  for (let i = 0; i < 3; i++) {
    const x = startX + i * (slabW + gap);
    const top = i === 0 ? DSB.cyan : DSB.surface;
    dsSlab(x + slabW / 2, slabY, slabW, slabH, 's' + i, { top, left: DSB.lineDark, right: DSB.ink });
  }
  // the step pills above each slab
  for (let i = 0; i < 3; i++) {
    const x = startX + i * (slabW + gap) + slabW / 2;
    dsStepPillX(x, slabY - 140, i + 1, 'p' + i, i === 0);
  }
  // a faint cyan glow under the first slab (the bridge object)
  const glow = popS(TIMELINE.cues.accent) * (1 - clamp((TT - 2.8) / 0.2));
  if (glow > 0) {
    ctx.save();
    ctx.globalAlpha = glow * 0.6;
    const grad = ctx.createRadialGradient(startX + slabW / 2, slabY + slabH / 2 + 30, 10, startX + slabW / 2, slabY + slabH / 2 + 30, 130);
    grad.addColorStop(0, DSB.cyanHi);
    grad.addColorStop(1, 'rgba(12, 163, 251, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }
  // caption (bottom)
  dsCaption('Pick a pool. Delegate. Done.', { y: 1620 });
  // the watermark is present in every era
  dsWatermark();
  // the hero is always present, calm, watching
  dsHero(540, 1320, 70, { key: 'h1', mood: 'happy' });
}

function sceneStakeDone() {
  dsBackdrop();
  dsTag('STAKE WITH GERO');
  ctx.save();
  ctx.font = `700 96px ${DSF}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.fillStyle = DSB.type;
  ctx.fillText('Three taps.', 80, 360);
  ctx.fillText('Delegated.',   80, 470);
  ctx.restore();
  dsCard(120, 700, 840, 540, 'card2');
  // the row of "delegated" lines (the bridge's counterpart)
  const lineY = 950;
  for (let i = 0; i < 3; i++) {
    const x = 180 + i * 280;
    // a small cyan check
    ink([[x, lineY], [x + 24, lineY + 24], [x + 80, lineY - 32]], { w: 6, color: DSB.cyan, key: 'ck' + i, amt: 1.0, frac: ev(TIMELINE.cues.done + i * 0.15, 0.4) });
    // the "delegated" text
    ctx.save();
    ctx.font = `500 36px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.type;
    ctx.globalAlpha = ev(TIMELINE.cues.done + i * 0.15 + 0.2, 0.4);
    ctx.fillText('delegated', x + 96, lineY - 20);
    ctx.restore();
  }
  // a thin cyan underline under "delegated"
  dsAccent(180, lineY + 50, 240, 'ul', { al: 0.7, h: 3 });
  // a stats block: the number of pools in Gero
  const stats = [
    { label: 'Pools',    val: '3,000+' },
    { label: 'No lockup', val: 'true' },
    { label: 'Hardware',  val: 'Ledger, Trezor, Keystone' },
  ];
  for (let i = 0; i < stats.length; i++) {
    const x = 180, y = 1100 + i * 50;
    ctx.save();
    ctx.font = `500 32px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.muted;
    ctx.fillText(stats[i].label, x, y);
    ctx.font = `500 32px ${DSM}`;
    ctx.fillStyle = DSB.type;
    ctx.textAlign = 'right';
    ctx.fillText(stats[i].val, 880, y);
    ctx.restore();
  }
  dsCaption('Your ADA. Your keys. Your rewards.', { y: 1620 });
  dsWatermark();
  // the hero carries through with a different mood — "happy" because it's done
  dsHero(540, 1320, 70, { key: 'h2', mood: 'wow' });
}
