// =====================================================================
//  SCENES — market-data-test. 4 beats, F4 mission, 2 eras joined by one shape morph.
//  Era 1 (0-6s): the WANT + SETUP — a card with three token rows.
//  Era 2 (6-12s): the PROOF + PAYOFF — order book, candle chart, Nexus callout, big stat, end card.
// =====================================================================

// -- a small token row: ticker, price, 24h change, sparkline.
function dsTokenRow(x, y, w, h, ticker, price, change, sparkSeed, key) {
  const R = RNG('spark', key);
  // background: a thin surface card
  paint(rrectPts(x, y, w, h, 8), {
    fill: DSB.surface, line: DSB.lineDark, w: 1.5, key: key + 'b',
    tex: [{ k: 'pencil', c: DSB.surface2, al: 0.3, per: 90 }],
  });
  // ticker on the left
  ctx.save();
  ctx.font = `700 36px ${DSM}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = DSB.type;
  ctx.fillText(ticker, x + 22, y + h / 2);
  // price in the middle
  ctx.font = `500 32px ${DSM}`;
  ctx.textAlign = 'center';
  ctx.fillStyle = DSB.type;
  ctx.fillText(price, x + w / 2 - 60, y + h / 2);
  // change % on the right
  ctx.font = `500 28px ${DSM}`;
  ctx.textAlign = 'right';
  ctx.fillStyle = change.startsWith('+') ? DSB.cyan : DSB.muted;
  ctx.fillText(change, x + w - 22, y + h / 2);
  // small sparkline in the gap between price and change
  const sx = x + w / 2 + 10, sy = y + h / 2, sw = 70, sh = h * 0.5;
  const pts = [];
  for (let i = 0; i < 14; i++) {
    const v = 0.5 + R.n(0.32) + (change.startsWith('+') ? i * 0.012 : -i * 0.008);
    pts.push([sx + (i / 13) * sw, sy + (0.5 - clamp(v)) * sh]);
  }
  // a faint area under the line (stippled)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(pts[0][0], sy + sh * 0.5);
  for (const p of pts) ctx.lineTo(p[0], p[1]);
  ctx.lineTo(pts[pts.length - 1][0], sy + sh * 0.5);
  ctx.closePath();
  ctx.fillStyle = change.startsWith('+') ? 'rgba(12, 163, 251, 0.18)' : 'rgba(159, 176, 191, 0.12)';
  ctx.fill();
  ctx.restore();
  // the line itself
  ink(pts, { w: 2, color: change.startsWith('+') ? DSB.cyan : DSB.line, key: key + 's', amt: 0.8 });
  ctx.restore();
}

// -- a small candle: body + wicks. bullish = cyan, bearish = muted.
function dsCandle(cx, cyTop, bodyH, wickH, bullish, key) {
  const bodyTop = cyTop - bodyH;
  const bodyBot = cyTop;
  // wick
  ink([[cx, cyTop - wickH], [cx, bodyBot + wickH * 0.2]], { w: 1.5, color: bullish ? DSB.cyan : DSB.muted, key: key + 'w', amt: 0.3 });
  // body
  paint(rrectPts(cx - 8, bodyTop, 16, bodyH, 2), {
    fill: bullish ? DSB.cyan : DSB.surface2, line: bullish ? DSB.cyan : DSB.line, w: 1.5, key,
  });
}

// -- a small order book row: price (left), size (right), side-coloured.
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

// =====================================================================
//  ERA 1 (0-6s) — the WANT + SETUP
// =====================================================================
function sceneList() {
  dsBackdrop();
  // tag pops in
  dsTag('MARKET DATA', { color: DSB.cyanHi, y: 200, size: 36 });
  // display title
  const titleA = 'Every token.';
  const titleB = 'Every venue.';
  const showB = clamp((TT - 0.4) / 0.35);
  ctx.save();
  ctx.font = `700 96px ${DSF}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.fillStyle = DSB.type;
  ctx.fillText(titleA, 80, 380);
  if (showB > 0) {
    ctx.fillStyle = DSB.cyan;
    ctx.fillText(titleB, 80, 380 + 100);
  }
  ctx.restore();
  // the card
  const card = { x: 80, y: 720, w: 920, h: 700 };
  const cardPop = popS(TIMELINE.cues.card);
  if (cardPop > 0) {
    ctx.save();
    ctx.translate(card.x + card.w / 2, card.y + card.h / 2);
    ctx.scale(cardPop, cardPop);
    ctx.translate(-(card.x + card.w / 2), -(card.y + card.h / 2));
    dsCard(card.x, card.y, card.w, card.h, 'card');
    // three token rows inside
    const rowH = 110, rowGap = 50;
    const rowX = card.x + 50, rowW = card.w - 100;
    const rows = [
      { ticker: 'ADA',  price: '$0.2028', change: '-4.2%', seed: 'a' },
      { ticker: 'GERO', price: '$0.0059', change: '+0.0%', seed: 'g' },
      { ticker: 'NIGHT',price: '$0.0204', change: '+3.2%', seed: 'n' },
    ];
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const y = card.y + 80 + i * (rowH + rowGap);
      const rowPop = popS(TIMELINE.cues.rows + i * 0.18);
      if (rowPop > 0) {
        ctx.save();
        ctx.translate(rowX + rowW / 2, y + rowH / 2);
        ctx.scale(rowPop, rowPop);
        ctx.translate(-(rowX + rowW / 2), -(y + rowH / 2));
        dsTokenRow(rowX, y, rowW, rowH, r.ticker, r.price, r.change, r.seed, r.ticker);
        ctx.restore();
        // the selected (middle) row gets a cyan accent bar on the left
        if (i === 1) {
          const a = clamp((TT - 2.6) * 4);
          ctx.save();
          ctx.globalAlpha = a;
          paint(rrectPts(rowX - 8, y + 8, 6, rowH - 16, 3), { fill: DSB.cyan, key: 'sel' + r.ticker });
          ctx.restore();
        }
      }
    }
    // the card's right edge (the bridge object) — visible from t=2.4 onward
    const glow = popS(TIMELINE.cues.glow);
    if (glow > 0) {
      ctx.save();
      ctx.globalAlpha = glow;
      paint(rrectPts(880, 680, 12, 340, 6), { fill: DSB.cyan, key: 'brR' });
      ctx.restore();
    }
    ctx.restore();
  }
  // hero at the bottom
  dsHero(540, 1300, 70, { key: 'h1' });
  // caption
  dsCaption('Live from the chain.', { y: 1500 });
  // watermark
  dsWatermark();
}

// =====================================================================
//  ERA 2 (6-12s) — the PROOF + PAYOFF
// =====================================================================
function sceneCharts() {
  dsBackdrop();
  // tag
  dsTag('POWERED BY NEXUS', { color: DSB.cyanHi, y: 200, size: 32 });
  // small display title
  ctx.save();
  ctx.font = `700 80px ${DSF}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.fillStyle = DSB.type;
  ctx.fillText('Order books.', 80, 360);
  ctx.fillText('Real trades.', 80, 360 + 84);
  ctx.restore();
  // left card: order book
  const bookCard = { x: 80, y: 560, w: 460, h: 760 };
  const bookPop = popS(TIMELINE.cues.book);
  if (bookPop > 0) {
    ctx.save();
    ctx.translate(bookCard.x + bookCard.w / 2, bookCard.y + bookCard.h / 2);
    ctx.scale(bookPop, bookPop);
    ctx.translate(-(bookCard.x + bookCard.w / 2), -(bookCard.y + bookCard.h / 2));
    dsCard(bookCard.x, bookCard.y, bookCard.w, bookCard.h, 'book');
    // the bridge's destination — the left edge of this card
    paint(rrectPts(220, 680, 12, 340, 6), { fill: DSB.cyan, key: 'brL' });
    // book header
    ctx.save();
    ctx.font = `500 22px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.muted;
    ctx.fillText('ORDER BOOK', bookCard.x + 24, bookCard.y + 24);
    ctx.textAlign = 'right';
    ctx.fillText('ADA / USD', bookCard.x + bookCard.w - 24, bookCard.y + 24);
    ctx.restore();
    // asks (top, descending price)
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
    const rowH = 52, rowGap = 4;
    const startY = bookCard.y + 80;
    for (let i = 0; i < asks.length; i++) {
      const y = startY + i * (rowH + rowGap);
      const pop = clamp((TT - (TIMELINE.cues.book + 0.15 + i * 0.05)) * 4);
      if (pop > 0) {
        ctx.save();
        ctx.globalAlpha = pop;
        dsBookRow(bookCard.x + 24, y, bookCard.w - 48, rowH, asks[i][0], asks[i][1], 'ask', 'ask' + i);
        ctx.restore();
      }
    }
    // spread
    const spreadY = startY + 5 * (rowH + rowGap) + 12;
    ctx.save();
    ctx.font = `600 24px ${DSM}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = DSB.cyan;
    ctx.fillText('SPREAD  0.0003', bookCard.x + bookCard.w / 2, spreadY);
    ctx.restore();
    for (let i = 0; i < bids.length; i++) {
      const y = spreadY + 30 + i * (rowH + rowGap);
      const pop = clamp((TT - (TIMELINE.cues.book + 0.45 + i * 0.05)) * 4);
      if (pop > 0) {
        ctx.save();
        ctx.globalAlpha = pop;
        dsBookRow(bookCard.x + 24, y, bookCard.w - 48, rowH, bids[i][0], bids[i][1], 'bid', 'bid' + i);
        ctx.restore();
      }
    }
    ctx.restore();
  }
  // right card: candle chart
  const chartCard = { x: 560, y: 560, w: 440, h: 360 };
  const chartPop = popS(TIMELINE.cues.chart);
  if (chartPop > 0) {
    ctx.save();
    ctx.translate(chartCard.x + chartCard.w / 2, chartCard.y + chartCard.h / 2);
    ctx.scale(chartPop, chartPop);
    ctx.translate(-(chartCard.x + chartCard.w / 2), -(chartCard.y + chartCard.h / 2));
    dsCard(chartCard.x, chartCard.y, chartCard.w, chartCard.h, 'chart');
    // header
    ctx.save();
    ctx.font = `500 22px ${DSF}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.muted;
    ctx.fillText('CANDLES', chartCard.x + 24, chartCard.y + 24);
    ctx.textAlign = 'right';
    ctx.fillStyle = DSB.type;
    ctx.fillText('ADA / USD · 1H', chartCard.x + chartCard.w - 24, chartCard.y + 24);
    ctx.restore();
    // candles
    const chartLeft = chartCard.x + 30;
    const chartRight = chartCard.x + chartCard.w - 30;
    const chartTop = chartCard.y + 70;
    const chartBottom = chartCard.y + chartCard.h - 30;
    const cw = (chartRight - chartLeft) / 14;
    const R = RNG('candles');
    for (let i = 0; i < 14; i++) {
      const cx = chartLeft + i * cw + cw / 2;
      const center = (chartTop + chartBottom) / 2;
      const bodyH = 30 + R.r(0, 50);
      const wickH = 10 + R.r(0, 18);
      const bullish = i > 4 && i < 11;
      const pop = clamp((TT - (TIMELINE.cues.chart + 0.2 + i * 0.04)) * 5);
      if (pop > 0) {
        ctx.save();
        ctx.globalAlpha = pop;
        dsCandle(cx, center + (bullish ? -bodyH * 0.4 : bodyH * 0.4), bodyH, wickH, bullish, 'c' + i);
        ctx.restore();
      }
    }
    // axis line at the bottom
    ink([[chartLeft, chartBottom + 4], [chartRight, chartBottom + 4]], { w: 1, color: DSB.lineDark, key: 'axis' });
    ctx.restore();
  }
  // stats card (smaller, stacked: big "11" on the left, labels on the right)
  const statsCard = { x: 560, y: 940, w: 440, h: 380 };
  const statPop = popS(TIMELINE.cues.stat);
  if (statPop > 0) {
    ctx.save();
    ctx.translate(statsCard.x + statsCard.w / 2, statsCard.y + statsCard.h / 2);
    ctx.scale(statPop, statPop);
    ctx.translate(-(statsCard.x + statsCard.w / 2), -(statsCard.y + statsCard.h / 2));
    dsCard(statsCard.x, statsCard.y, statsCard.w, statsCard.h, 'stats');
    // big "11" on the left
    ctx.save();
    ctx.font = `700 160px ${DSF}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.cyan;
    ctx.fillText('11', statsCard.x + 30, statsCard.y + statsCard.h / 2);
    // a thin vertical divider
    paint(rrectPts(statsCard.x + 200, statsCard.y + 60, 2, statsCard.h - 120, 1), { fill: DSB.lineDark, key: 'sdiv' });
    // three labels on the right, stacked
    ctx.font = `500 26px ${DSF}`;
    ctx.textAlign = 'left';
    ctx.fillStyle = DSB.type;
    ctx.fillText('DEX venues indexed', statsCard.x + 230, statsCard.y + 100);
    ctx.font = `500 22px ${DSF}`;
    ctx.fillStyle = DSB.muted;
    ctx.fillText('real trades', statsCard.x + 230, statsCard.y + 150);
    ctx.fillText('live, in your wallet', statsCard.x + 230, statsCard.y + 190);
    // a cyan accent under the labels
    const a = clamp((TT - 10.6) * 3);
    if (a > 0) {
      ctx.save();
      ctx.globalAlpha = a;
      paint(rrectPts(statsCard.x + 230, statsCard.y + 230, 120, 3, 1), { fill: DSB.cyan, key: 'sund' });
      ctx.restore();
    }
    ctx.restore();
    ctx.restore();
  }
  // hero at y=1380 (above the safe area edge at y=1500)
  dsHero(160, 1380, 45, { key: 'h2', mood: 'wow' });
  // the gerowallet.io pill just above the safe area, centered-right
  const pillPop = popS(TIMELINE.cues.pill);
  if (pillPop > 0) {
    ctx.save();
    ctx.globalAlpha = pillPop;
    dsPill('gerowallet.io', 780, 1380, 24);
    ctx.restore();
  }
  // watermark
  dsWatermark();
}
