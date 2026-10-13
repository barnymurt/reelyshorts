  // SCORE BODY — market-data-test (inside buildScore(); see kit/score-head.js)
  // 12s, 120 BPM, upbeat dancey: driving kick on every quarter + 8th-note plucks + bright pad + a chord stab on the payoff.
  const T = TIMELINE, cu = T.cues;
  to = 'm';
  // a driving 4-on-the-floor kick: a noise hit on every quarter (BEAT)
  for (let bar = 0; bar < 12; bar++) {
    noiseHit(bar * BEAT, 0.05, 'lowpass', 120, 8, 0.06, -0.05);                  // kick
    noiseHit(bar * BEAT + BEAT / 2, 0.04, 'lowpass', 220, 6, 0.05, -0.10);        // snare on 2 and 4 (off-beat)
  }
  // 8th-note plucks: a bright pluck on every 8th for the dancey feel
  for (let i = 0; i < 48; i++) {
    const t = i * E8;
    if (t < DURATION) pluck(t, 880 + (i % 4) * 110, 0.025, 0.0, 0.18, 2400, 0.22);
  }
  // a bright pad through the whole piece
  pad(0.0, 12.0, ['A3', 'C4', 'E4', 'G4'], 0.025, { type: 'sawtooth', cut: 2400, att: 0.05, rel: 0.2, send: 0.3 });
  // a sweep into the morph (5.7 - 6.3)
  sweep(5.7, 6.3, 0.012, 400, 3200, 0);
  // payoff hit: a chord stab on the big "11" (10.0s)
  noiseHit(10.0, 0.04, 'bandpass', 800, 4, 0.07, -0.05);
  to = 's';
  // blip on each order book row reveal (7.5 - 8.8)
  for (let i = 0; i < 5; i++) blip(7.5 + i * 0.1, 1400, 600, 0.02, 0.04);
  for (let i = 0; i < 5; i++) blip(8.05 + i * 0.1, 1200, 600, 0.02, 0.04);
  // candle-by-candle chimes (7.0 - 7.6)
  for (let i = 0; i < 14; i++) blip(7.0 + i * 0.06, 1600 + i * 60, 400, 0.015, 0.03);
