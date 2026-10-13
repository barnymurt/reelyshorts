// =====================================================================
//  SCENES — market-data-test v2.
//  Era 1 (0-6s): THE PROBLEM. 5 fake browser tabs, 5 prices for one token.
//  Era 2 (6-12s): THE FIX. One wallet, every venue. gerowallet.io CTA.
// =====================================================================

// -- a fake browser tab: a small rect with a dot, a DEX name, and a price.
function dsTab(x, y, w, h, dex, price, active, key) {
  paint(rrectPts(x, y, w, h, 8), {
    fill: active ? DSB.surface2 : DSB.surface, line: active ? DSB.cyan : DSB.lineDark, w: active ? 2.5 : 1.5, key: key + 'b',
    tex: [{ k: 'pencil', c: DSB.surface2, al: 0.3, per: 90 }],
  });
  // little traffic-light dot
  ctx.save();
  ctx.fillStyle = active ? DSB.cyan : DSB.lineDark;
  ctx.beginPath();
  ctx.arc(x + 22, y + h / 2, 5, 0, TAU);
  ctx.fill();
  ctx.restore();
  // DEX name (left)
  ctx.save();
  ctx.font = `500 20px ${DSF}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = active ? DSB.type : DSB.muted;
  ctx.fillText(dex, x + 42, y + h / 2);
  // price (right)
  ctx.font = `500 20px ${DSM}`;
  ctx.textAlign = 'right';
  ctx.fillStyle = active ? DSB.cyan : DSB.type;
  ctx.fillText('$' + price, x + w - 20, y + h / 2);
  ctx.restore();
}

// -- the Gero wallet card (one wallet, every venue)
function dsGeroCard(x, y, w, h, key) {
  dsCard(x, y, w, h, key);
  // the "11 venues" badge in the top-right of the card (within the safe area)
  paint(rrectPts(x + w - 200, y + 24, 130, 36, 8), { fill: DSB.cyan, key: key + 'badge' });
  ctx.save();
  ctx.font = `700 22px ${DSF}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = DSB.bg;
  ctx.fillText('11 VENUES', x + w - 135, y + 42);
  ctx.restore();
  // the "LIVE" indicator in the top-left
  ctx.save();
  ctx.fillStyle = DSB.cyan;
  ctx.beginPath();
  ctx.arc(x + 30, y + 42, 6, 0, TAU);
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.font = `600 18px ${DSF}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = DSB.cyan;
  ctx.fillText('LIVE FROM NEXUS', x + 46, y + 42);
  ctx.restore();
}

// -- an order book row: price (left), size (right), side-coloured.
function dsBookRow(x, y, w, h, price, size, side, key) {
  paint(rrectPts(x, y, w, h, 4), {
    fill: DSB.surface, line: DSB.lineDark, w: 1, key,
    tex: [{ k: 'pencil', c: DSB.surface2, al: 0.25, per: 120 }],
  });
  ctx.save();
  ctx.font = `500 24px ${DSM}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = side === 'bid' ? DSB.cyan : DSB.type;
  ctx.fillText(price, x + 16, y + h / 2);
  ctx.textAlign = 'right';
  ctx.fillStyle = DSB.muted;
  ctx.fillText(size, x + w - 16, y + h / 2);
  ctx.restore();
}

// -- a small candle: body + wicks. bullish = cyan, bearish = muted.
function dsCandle(cx, cyTop, bodyH, wickH, bullish, key) {
  const bodyTop = cyTop - bodyH;
  const bodyBot = cyTop;
  ink([[cx, cyTop - wickH], [cx, bodyBot + wickH * 0.2]], { w: 1.5, color: bullish ? DSB.cyan : DSB.muted, key: key + 'w', amt: 0.3 });
  paint(rrectPts(cx - 8, bodyTop, 16, bodyH, 2), {
    fill: bullish ? DSB.cyan : DSB.surface2, line: bullish ? DSB.cyan : DSB.line, w: 1.5, key,
  });
}

// =====================================================================
//  ERA 1 (0-6s) — THE PROBLEM
// =====================================================================
function sceneProblem() {
  dsBackdrop();
  // the question (curiosity hook)
  const q1a = 'Switching tabs to';
  const q1b = 'track one token?';
  const showQ1 = clamp((TT - 0.2) / 0.35);
  if (showQ1 > 0) {
    ctx.save();
    ctx.globalAlpha = showQ1;
    ctx.font = `700 80px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.type;
    ctx.fillText(q1a, 70, 320);
    ctx.fillText(q1b, 70, 320 + 92);
    ctx.restore();
  }
  // the 5 fake tabs
  const tabsIn = popS(TIMELINE.cues.tabs);
  if (tabsIn > 0) {
    // the 5 DEXs, the chaos prices
    const tabs = [
      { dex: 'MuesliSwap',  price: '0.2028', x:  60, y: 720, active: false },
      { dex: 'SundaeSwap',  price: '0.2031', x: 360, y: 720, active: true  },
      { dex: 'WingRiders',  price: '0.2019', x: 660, y: 720, active: false },
      { dex: 'VyFinance',   price: '0.2034', x: 100, y: 830, active: false },
      { dex: 'MinSwap',     price: '0.2025', x: 400, y: 830, active: false },
      { dex: 'Spectrum',    price: '0.2029', x: 700, y: 830, active: false },
    ];
    // the price jumps: each tab's price changes at jump1 (t=1.2) and jump2 (t=2.2)
    const j1 = clamp((TT - 1.2) * 4);
    const j2 = clamp((TT - 2.2) * 4);
    const newPrices = [
      ['0.2031', '0.2026', '0.2017'],   // MuesliSwap: original, j1, j2
      ['0.2028', '0.2034', '0.2022'],   // SundaeSwap (active): original, j1, j2
      ['0.2025', '0.2014', '0.2037'],   // WingRiders
      ['0.2029', '0.2041', '0.2018'],   // VyFinance
      ['0.2017', '0.2033', '0.2028'],   // MinSwap
      ['0.2032', '0.2020', '0.2035'],   // Spectrum
    ];
    for (let i = 0; i < tabs.length; i++) {
      const t = tabs[i];
      const w = 260, h = 64;
      const pop = tabsIn * (1 - i * 0.05);
      if (pop > 0) {
        ctx.save();
        ctx.translate(t.x + w / 2, t.y + h / 2);
        ctx.scale(pop, pop);
        ctx.translate(-(t.x + w / 2), -(t.y + h / 2));
        // determine the current price based on the jump state
        const ps = newPrices[i];
        const price = j2 > 0.5 ? ps[2] : (j1 > 0.5 ? ps[1] : ps[0]);
        dsTab(t.x, t.y, w, h, t.dex, price, t.active, 'tab' + i);
        // a small red "?" on inactive tabs to show confusion
        if (!t.active) {
          ctx.save();
          ctx.globalAlpha = 0.6;
          ctx.font = `700 14px ${DSF}`;
          ctx.textBaseline = 'top';
          ctx.textAlign = 'right';
          ctx.fillStyle = '#E0584A';
          ctx.fillText('?', t.x + w - 20, t.y + h - 18);
          ctx.restore();
        }
        ctx.restore();
      }
    }
  }
  // the labels at the bottom of era 1: "5 sites. 5 order books. 5 candles."
  const lbl = popS(TIMELINE.cues.labels);
  if (lbl > 0) {
    ctx.save();
    ctx.globalAlpha = lbl;
    ctx.font = `600 44px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillStyle = DSB.muted;
    ctx.fillText('5 sites.  5 order books.  5 candles.', CX, 1040);
    ctx.restore();
  }
  // the bridge object: a thin cyan strip on the active tab (SundaeSwap)
  // visible from t=4.8 onward, fading into the morph
  const bridge = clamp((TT - 4.8) * 3);
  if (bridge > 0) {
    ctx.save();
    ctx.globalAlpha = bridge;
    paint(rrectPts(460, 770, 8, 200, 4), { fill: DSB.cyan, key: 'brTab' });
    ctx.restore();
  }
  // "There's a better way." — the closing line of era 1
  const better = popS(TIMELINE.cues.better);
  if (better > 0) {
    ctx.save();
    ctx.globalAlpha = better;
    ctx.font = `700 56px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillStyle = DSB.cyan;
    ctx.fillText("There's a better way.", CX, 1180);
    ctx.restore();
  }
  // watermark + hero spot
  dsWatermark();
  dsHero(180, 1380, 50, { key: 'h1' });
}

// =====================================================================
//  ERA 2 (6-12s) — THE FIX
// =====================================================================
function sceneFix() {
  dsBackdrop();
  // the answer: "Gero has every venue in one tab."
  const fix = popS(TIMELINE.cues.fix);
  if (fix > 0) {
    ctx.save();
    ctx.globalAlpha = fix;
    ctx.font = `700 76px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.type;
    ctx.fillText('Gero has every', 70, 320);
    ctx.fillStyle = DSB.cyan;
    ctx.fillText('venue in one tab.', 70, 320 + 88);
    ctx.restore();
  }
  // the Gero wallet card (replacing the 5 tabs)
  const gerCard = { x: 80, y: 560, w: 920, h: 640 };
  const cardIn = popS(TIMELINE.cues.chart);
  if (cardIn > 0) {
    ctx.save();
    ctx.translate(gerCard.x + gerCard.w / 2, gerCard.y + gerCard.h / 2);
    ctx.scale(cardIn, cardIn);
    ctx.translate(-(gerCard.x + gerCard.w / 2), -(gerCard.y + gerCard.h / 2));
    dsGeroCard(gerCard.x, gerCard.y, gerCard.w, gerCard.h, 'gero');
    // the bridge's destination: the right edge of this card
    paint(rrectPts(980, 600, 8, 560, 4), { fill: DSB.cyan, key: 'brG' });
    // left: order book
    const asks = [
      ['0.2031', '4,210.50'],
      ['0.2029', '1,820.00'],
      ['0.2028', '12,640.00'],
      ['0.2027', '2,340.00'],
      ['0.2026', '5,180.00'],
    ];
    const bids = [
      ['0.2025', '8,210.00'],
      ['0.2024', '3,640.00'],
      ['0.2023', '9,120.00'],
      ['0.2021', '1,560.00'],
      ['0.2020', '2,800.00'],
    ];
    const bookH = 40, bookGap = 4;
    const bookX = gerCard.x + 24, bookW = gerCard.w / 2 - 48;
    const bookY = gerCard.y + 96;
    // ORDER BOOK label
    ctx.save();
    ctx.font = `500 18px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.muted;
    ctx.fillText('ORDER BOOK · ADA / USD', bookX, gerCard.y + 70);
    ctx.restore();
    for (let i = 0; i < asks.length; i++) {
      const y = bookY + i * (bookH + bookGap);
      const pop = clamp((TT - (TIMELINE.cues.book + 0.15 + i * 0.05)) * 4);
      if (pop > 0) {
        ctx.save();
        ctx.globalAlpha = pop;
        dsBookRow(bookX, y, bookW, bookH, asks[i][0], asks[i][1], 'ask', 'ask' + i);
        ctx.restore();
      }
    }
    const spreadY = bookY + 5 * (bookH + bookGap) + 14;
    ctx.save();
    ctx.font = `600 18px ${DSM}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = DSB.cyan;
    ctx.fillText('SPREAD  0.0003', bookX + bookW / 2, spreadY);
    ctx.restore();
    for (let i = 0; i < bids.length; i++) {
      const y = spreadY + 28 + i * (bookH + bookGap);
      const pop = clamp((TT - (TIMELINE.cues.book + 0.45 + i * 0.05)) * 4);
      if (pop > 0) {
        ctx.save();
        ctx.globalAlpha = pop;
        dsBookRow(bookX, y, bookW, bookH, bids[i][0], bids[i][1], 'bid', 'bid' + i);
        ctx.restore();
      }
    }
    // right: candle chart
    const chartX = gerCard.x + gerCard.w / 2 + 24;
    const chartW = gerCard.w / 2 - 48;
    const chartTop = gerCard.y + 110;
    const chartBottom = gerCard.y + gerCard.h - 60;
    // CANDLES label
    ctx.save();
    ctx.font = `500 18px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.muted;
    ctx.fillText('CANDLES · 1H', chartX, gerCard.y + 70);
    ctx.restore();
    const cw = chartW / 16;
    const R = RNG('candles');
    for (let i = 0; i < 16; i++) {
      const cx = chartX + i * cw + cw / 2;
      const center = (chartTop + chartBottom) / 2;
      const bodyH = 40 + R.r(0, 80);
      const wickH = 12 + R.r(0, 24);
      const bullish = i > 5 && i < 12;
      const pop = clamp((TT - (TIMELINE.cues.chart + 0.2 + i * 0.03)) * 5);
      if (pop > 0) {
        ctx.save();
        ctx.globalAlpha = pop;
        dsCandle(cx, center + (bullish ? -bodyH * 0.4 : bodyH * 0.4), bodyH, wickH, bullish, 'c' + i);
        ctx.restore();
      }
    }
    ink([[chartX, chartBottom + 4], [chartX + chartW, chartBottom + 4]], { w: 1, color: DSB.lineDark, key: 'axis' });
    ctx.restore();
  }
  // the stat strip below the card: "11 venues.  Real trades.  1 wallet."
  const stat = popS(TIMELINE.cues.stat);
  if (stat > 0) {
    ctx.save();
    ctx.globalAlpha = stat;
    ctx.font = `600 38px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    // three segments with the numbers in cyan
    ctx.fillStyle = DSB.type;
    ctx.fillText('11 venues.', CX - 280, 1240);
    ctx.fillStyle = DSB.cyan;
    ctx.fillText('Real trades.', CX, 1240);
    ctx.fillStyle = DSB.type;
    ctx.fillText('1 wallet.', CX + 280, 1240);
    ctx.restore();
  }
  // the gerowallet.io CTA — bigger and more prominent than v1
  const pill = popS(TIMELINE.cues.pill);
  if (pill > 0) {
    ctx.save();
    ctx.globalAlpha = pill;
    dsPill('gerowallet.io/wallet/market-data', CX, 1340, 30);
    ctx.restore();
  }
  // watermark + hero
  dsWatermark();
  dsHero(180, 1380, 50, { key: 'h2', mood: 'wow' });
}
