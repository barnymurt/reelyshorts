  // SCORE BODY — market-data-orderbook v3. 140 BPM, more energy.
  const T = TIMELINE, cu = T.cues;
  to = 'm';
  for (let bar = 0; bar < 3; bar++) noiseHit(bar * BEAT, 0.05, 'lowpass', 100, 8, 0.08, -0.02);
  for (let i = 0; i < 10; i++) pluck(0.2 + i * 0.28, nz(['C5', 'D5', 'E5', 'G5', 'A5', 'C6', 'D6', 'E6', 'G6', 'A6'][i % 10]), 0.04, 0.0, 0.18, 2600, 0.22);
  pad(0.0, 3.0, ['D3', 'A3', 'F4'], 0.030, { type: 'sawtooth', cut: 1400, att: 0.05, rel: 0.15, send: 0.2 });
  to = 's';
  noiseHit(3.0, 0.08, 'bandpass', 600, 6, 0.12, 0);
  noiseHit(3.1, 0.06, 'lowpass', 100, 6, 0.10, -0.02);
  to = 'm';
  pluck(3.0, nz('C4'), 0.06, 0.0, 0.60, 1200, 0.35);
  pluck(3.05, nz('E4'), 0.06, 0.0, 0.60, 1200, 0.35);
  pluck(3.1, nz('G4'), 0.06, 0.0, 0.60, 1200, 0.35);
  pluck(3.15, nz('C5'), 0.06, 0.0, 0.60, 1200, 0.35);
  pluck(3.2, nz('E5'), 0.06, 0.0, 0.60, 1200, 0.35);
  for (let i = 0; i < 18; i++) pluck(3.3 + i * 0.25, nz(['C5', 'E5', 'G5', 'A5'][i % 4]), 0.04, 0.0, 0.20, 2400, 0.25);
  pad(8.0, 10.0, ['D3', 'A3', 'F4', 'C5'], 0.030, { type: 'triangle', cut: 1200, att: 0.05, rel: 0.2, send: 0.2 });
  noiseHit(10.2, 0.05, 'bandpass', 800, 4, 0.08, -0.03);
  pluck(10.2, nz('A4'), 0.05, 0.0, 0.30, 2000, 0.25);
