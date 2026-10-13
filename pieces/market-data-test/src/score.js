  // SCORE BODY — market-data-test v2 (inside buildScore(); see kit/score-head.js)
  // 12s, 120 BPM, upbeat dancey: a nervous pulse for the problem, a resolved chord stab for the payoff.
  const T = TIMELINE, cu = T.cues;
  to = 'm';
  // era 1: nervous low pulse (the chaos) + occasional dissonant plucks (price jumps)
  for (let bar = 0; bar < 6; bar++) {
    noiseHit(bar * BEAT, 0.04, 'lowpass', 100, 6, 0.05, -0.08);                 // soft kick
    noiseHit(bar * BEAT + BEAT / 2, 0.03, 'bandpass', 300, 4, 0.04, -0.12);         // off-beat blip
  }
  // the two price-jump moments: a dissonant pluck on each
  pluck(cu.jump1, nz('Ds5'), 0.05, 0.0, 0.25, 3200, 0.18);
  pluck(cu.jump2, nz('Fs5'), 0.05, 0.0, 0.25, 3200, 0.18);
  // a quiet pad through era 1
  pad(0.0, 6.0, ['D3', 'A3', 'F4'], 0.025, { type: 'triangle', cut: 900, att: 0.05, rel: 0.2, send: 0.3 });
  // the sweep into the morph (5.7 - 6.3)
  sweep(5.7, 6.3, 0.012, 400, 3200, 0);
  // era 2: a fuller, brighter score (the fix)
  for (let bar = 0; bar < 6; bar++) {
    noiseHit(6.0 + bar * BEAT, 0.05, 'lowpass', 120, 8, 0.06, -0.04);            // kick
  }
  pad(6.0, 12.0, ['D3', 'A3', 'F4', 'C5'], 0.030, { type: 'sawtooth', cut: 2200, att: 0.05, rel: 0.2, send: 0.3 });
  // 8th-note plucks for the dancey feel
  for (let i = 0; i < 24; i++) {
    const t = 6.0 + i * E8;
    if (t < DURATION) pluck(t, 880 + (i % 4) * 110, 0.025, 0.0, 0.18, 2400, 0.22);
  }
  to = 's';
  // candle-by-candle chimes (6.8 - 7.4)
  for (let i = 0; i < 16; i++) blip(6.8 + i * 0.04, 1600 + i * 60, 400, 0.015, 0.03);
  // order book row reveals (7.6 - 8.6)
  for (let i = 0; i < 5; i++) blip(7.6 + i * 0.1, 1400, 600, 0.02, 0.04);
  for (let i = 0; i < 5; i++) blip(7.9 + i * 0.1, 1200, 600, 0.02, 0.04);
  // the payoff hit on the gerowallet.io CTA (10.4)
  noiseHit(10.4, 0.04, 'bandpass', 800, 4, 0.07, -0.05);
