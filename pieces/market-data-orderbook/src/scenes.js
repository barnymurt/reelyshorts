// =====================================================================
//  SCENES — market-data-orderbook (#3).
//  Frame 1 hook, frame 2 sharpen (thin one-venue book, greyed out),
//  frame 3 reveal (Gero screenshot of all 11 DEXes), frame 4 pay,
//  frame 5 CTA + teaser for #4.
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

// -- a thin order book row: price (left), size (right), side-coloured
function dsBookRow(x, y, w, h, price, size, side, key) {
  paint(rrectPts(x, y, w, h, 4), {
    fill: DSB.surface, line: DSB.lineDark, w: 1, key,
    tex: [{ k: 'pencil', c: DSB.surface2, al: 0.25, per: 120 }],
  });
  ctx.save();
  ctx.font = `500 28px ${DSM}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = side === 'bid' ? DSB.cyan : DSB.type;
  ctx.fillText(price, x + 20, y + h / 2);
  ctx.textAlign = 'right';
  ctx.fillStyle = DSB.muted;
  ctx.fillText(size, x + w - 20, y + h / 2);
  ctx.restore();
}

// =====================================================================
//  1 HOOK — "You're only seeing half the order book."
// =====================================================================
function sceneHook() {
  dsBackdrop();
  const show = clamp((TT - 0.2) / 0.35);
  if (show > 0) {
    ctx.save();
    ctx.globalAlpha = show;
    // 3 lines at 88px — readable in ~1.5s, fits the safe area
    dsFrame("You're only seeing", { size: 88, yStart: 540 });
    dsFrame('half the', { size: 88, yStart: 540 + 88 * 1.05 });
    dsFrame('order book.', { size: 88, yStart: 540 + 176 * 1.05, color: DSB.cyan });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  2 SHARPEN — "That's one venue." + a thin hand-drawn single-DEX order book
// =====================================================================
function sceneSharpen() {
  dsBackdrop();
  // the order book card (MuesliSwap only — thin depth)
  const cardPop = popS(TIMELINE.cues.sharpen);
  if (cardPop > 0) {
    ctx.save();
    ctx.globalAlpha = cardPop * 0.5;   // greyed out
    const cx = 190, cy = 640, w = 700, h = 720;
    dsCard(cx, cy, w, h, 'oneBook');
    // header
    ctx.save();
    ctx.font = `500 22px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.muted;
    ctx.fillText('ORDER BOOK  ·  MuesliSwap  ·  ADA / USD', cx + 24, cy + 24);
    ctx.restore();
    // a thin book: just 2 asks and 2 bids with low depth
    const asks = [
      ['0.2031', '1,200'],
      ['0.2030', '900'],
    ];
    const bids = [
      ['0.2028', '800'],
      ['0.2027', '600'],
    ];
    const rowH = 52, rowGap = 6;
    const startY = cy + 80;
    for (let i = 0; i < asks.length; i++) {
      dsBookRow(cx + 24, startY + i * (rowH + rowGap), w - 48, rowH, asks[i][0], asks[i][1], 'ask', 'ob1a' + i);
    }
    const spreadY = startY + 2 * (rowH + rowGap) + 12;
    ctx.save();
    ctx.font = `600 22px ${DSM}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = DSB.cyan;
    ctx.fillText('SPREAD  0.0004', cx + w / 2, spreadY);
    ctx.restore();
    for (let i = 0; i < bids.length; i++) {
      dsBookRow(cx + 24, spreadY + 32 + i * (rowH + rowGap), w - 48, rowH, bids[i][0], bids[i][1], 'bid', 'ob1b' + i);
    }
    // a "?" overlay to show the viewer this is incomplete
    ctx.save();
    ctx.font = `700 80px ${DSF}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#E0584A';
    ctx.fillText('?', cx + w - 80, cy + h / 2);
    ctx.restore();
    ctx.restore();
  }
  // the sharpen text (over the greyed-out book, near the top)
  const beat = clamp((TT - 2.8) / 0.3);
  if (beat > 0) {
    ctx.save();
    ctx.globalAlpha = beat;
    dsFrame("That's one venue.", { size: 88, yStart: 1400, color: DSB.cyan });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  3 REVEAL — the actual Gero screenshot showing all 11 DEXes
// =====================================================================
function sceneReveal() {
  if (!_REVEAL_IMG) {
    const im = asset('gero-reveal.png');
    if (!im) return;
    _REVEAL_IMG = im;
  }
  const pop = clamp((TT - 4.2) / 0.25);
  if (pop > 0) {
    ctx.save();
    ctx.globalAlpha = pop;
    const w = 1080, h = 1080;
    const x = 0, y = (H - h) / 2;
    ctx.drawImage(_REVEAL_IMG, x, y, w, h);
    // a thin cyan border
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
//  4 PAY — "Every trade. Every venue. One view."
// =====================================================================
function scenePay() {
  dsBackdrop();
  const show = clamp((TT - 8.0) / 0.3);
  if (show > 0) {
    ctx.save();
    ctx.globalAlpha = show;
    dsFrame('Every trade.', { size: 96, yStart: 620 });
    dsFrame('Every venue.', { size: 96, yStart: 620 + 96 * 1.05, color: DSB.cyan });
    dsFrame('One view.', { size: 96, yStart: 620 + 192 * 1.05 });
    ctx.restore();
  }
  dsWatermark();
}

// =====================================================================
//  5 CTA — "Gero Wallet -> Market tab" + teaser for #4
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
  // teaser for #4 (price spread)
  const tease = popS(TIMELINE.cues.teaser);
  if (tease > 0) {
    ctx.save();
    ctx.globalAlpha = tease;
    ctx.font = `500 30px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillStyle = DSB.muted;
    ctx.fillText('Next: same token, same minute, 3% apart.', CX, 1080);
    ctx.font = `400 40px ${DSF}`;
    ctx.fillText('↓', CX, 1120);
    ctx.restore();
  }
  dsHero(540, 1380, 50, { key: 'h6', mood: 'wow' });
  dsWatermark();
}
