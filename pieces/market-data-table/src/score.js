  // SCORE BODY — market-data-table (inside buildScore(); see kit/score-head.js)
  // 12s, 120 BPM. Quiet plucks through the hook + sharpen. A big drop on the reveal.
  // A soft stab on the CTA. Music drop lands at 4.2s (the screenshot reveal).
  const T = TIMELINE, cu = T.cues;
  to = 'm';
  // a quiet plucky pulse through the hook (0.0 - 2.4s)
  for (let i = 0; i < 5; i++) pluck(0.2 + i * 0.48, nz(['C5', 'D5', 'E5', 'G5', 'A5'][i % 5]), 0.05, 0.0, 0.30, 2200, 0.18);
  // the beat between question and answer (a tick)
  pluck(2.4, nz('A4'), 0.03, 0.0, 0.20, 2800, 0.20);
  // a low pad holds through the sharpen
  pad(0.0, 4.2, ['D3', 'A3'], 0.020, { type: 'triangle', cut: 800, att: 0.05, rel: 0.2, send: 0.2 });
  // the DROP at 4.2s — a noise hit + a chord stab on the screenshot reveal
  to = 's';
  noiseHit(4.2, 0.05, 'bandpass', 800, 5, 0.08, -0.02);
  to = 'm';
  pad(4.2, 8.0, ['D3', 'A3', 'F4', 'C5'], 0.040, { type: 'sawtooth', cut: 1800, att: 0.02, rel: 0.15, send: 0.3 });
  pluck(4.2, nz('C4'), 0.04, 0.0, 0.40, 1600, 0.30);
  pluck(4.3, nz('E4'), 0.04, 0.0, 0.40, 1600, 0.30);
  pluck(4.4, nz('G4'), 0.04, 0.0, 0.40, 1600, 0.30);
  pluck(4.5, nz('C5'), 0.04, 0.0, 0.50, 1600, 0.30);
  // a softer hold through the pay frame
  pad(8.0, 12.0, ['D3', 'A3', 'F4'], 0.030, { type: 'triangle', cut: 1200, att: 0.05, rel: 0.2, send: 0.2 });
  pluck(8.2, nz('A4'), 0.04, 0.0, 0.30, 2000, 0.22);
  // the CTA stab
  noiseHit(10.2, 0.04, 'bandpass', 800, 4, 0.06, -0.04);
