  // SCORE BODY — market-data-test v3. 140 BPM, more energy.
  // Driving kick on every quarter, 16th-note plucks, a bigger drop on the reveal.
  const T = TIMELINE, cu = T.cues;
  to = 'm';
  // driving kick on every quarter (0-6s)
  for (let bar = 0; bar < 6; bar++) {
    noiseHit(bar * BEAT, 0.05, 'lowpass', 100, 8, 0.08, -0.02);
  }
  // 16th-note plucks through the hook (0-2.4s)
  for (let i = 0; i < 9; i++) pluck(0.2 + i * 0.25, nz(['C5', 'D5', 'E5', 'G5', 'A5', 'C6', 'D6', 'E6', 'G6'][i % 9]), 0.04, 0.0, 0.18, 2600, 0.22);
  // a quieter pad through the sharpen (1.6-3.0s)
  pad(0.0, 4.2, ['D3', 'A3', 'F4'], 0.030, { type: 'sawtooth', cut: 1400, att: 0.05, rel: 0.15, send: 0.2 });
  // the DROP at 4.2s — a bandpass noise hit + a chord stab
  to = 's';
  noiseHit(4.2, 0.08, 'bandpass', 600, 6, 0.12, 0);
  noiseHit(4.3, 0.06, 'lowpass', 100, 6, 0.10, -0.02);
  to = 'm';
  // a bigger chord stab
  pluck(4.2, nz('C4'), 0.06, 0.0, 0.60, 1200, 0.35);
  pluck(4.25, nz('E4'), 0.06, 0.0, 0.60, 1200, 0.35);
  pluck(4.3, nz('G4'), 0.06, 0.0, 0.60, 1200, 0.35);
  pluck(4.35, nz('C5'), 0.06, 0.0, 0.60, 1200, 0.35);
  pluck(4.4, nz('E5'), 0.06, 0.0, 0.60, 1200, 0.35);
  // 16th-note plucks through the reveal
  for (let i = 0; i < 14; i++) pluck(4.5 + i * 0.25, nz(['C5', 'E5', 'G5', 'A5'][i % 4]), 0.04, 0.0, 0.20, 2400, 0.25);
  // a softer pad through the pay (8-10s)
  pad(8.0, 10.0, ['D3', 'A3', 'F4', 'C5'], 0.030, { type: 'triangle', cut: 1200, att: 0.05, rel: 0.2, send: 0.2 });
  // a CTA stab
  noiseHit(10.2, 0.05, 'bandpass', 800, 4, 0.08, -0.03);
  pluck(10.2, nz('A4'), 0.05, 0.0, 0.30, 2000, 0.25);
