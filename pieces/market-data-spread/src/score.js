  // SCORE BODY — market-data-spread (#4)
  // Same structure: quiet plucks → tick → DROP at 4.4s → fuller pad → pay stab.
  const T = TIMELINE, cu = T.cues;
  to = 'm';
  // hook plucks (0-1.6s)
  for (let i = 0; i < 3; i++) pluck(0.2 + i * 0.5, nz(['C5', 'E5', 'G5'][i]), 0.05, 0.0, 0.30, 2200, 0.18);
  // a tick on the sharpen frame (1.6s)
  pluck(1.7, nz('A4'), 0.04, 0.0, 0.30, 2600, 0.22);
  // a deeper tick on the liquidity frame (3.0s)
  pluck(3.1, nz('F4'), 0.05, 0.0, 0.40, 1800, 0.25);
  // a low pad holds
  pad(0.0, 4.4, ['D3', 'A3'], 0.020, { type: 'triangle', cut: 800, att: 0.05, rel: 0.2, send: 0.2 });
  // the DROP at 4.4s
  to = 's';
  noiseHit(4.4, 0.05, 'bandpass', 800, 5, 0.08, -0.02);
  to = 'm';
  pad(4.4, 8.0, ['D3', 'A3', 'F4', 'C5'], 0.040, { type: 'sawtooth', cut: 1800, att: 0.02, rel: 0.15, send: 0.3 });
  pluck(4.4, nz('C4'), 0.04, 0.0, 0.40, 1600, 0.30);
  pluck(4.5, nz('E4'), 0.04, 0.0, 0.40, 1600, 0.30);
  pluck(4.6, nz('G4'), 0.04, 0.0, 0.40, 1600, 0.30);
  pluck(4.7, nz('C5'), 0.04, 0.0, 0.50, 1600, 0.30);
  pad(8.0, 12.0, ['D3', 'A3', 'F4'], 0.030, { type: 'triangle', cut: 1200, att: 0.05, rel: 0.2, send: 0.2 });
  pluck(8.2, nz('A4'), 0.04, 0.0, 0.30, 2000, 0.22);
  noiseHit(10.2, 0.04, 'bandpass', 800, 4, 0.06, -0.04);
