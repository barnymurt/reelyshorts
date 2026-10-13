// =====================================================================
//  ERAS, CAMERAS, BRIDGES — market-data-test v2 (read by kit/morph.js)
// =====================================================================
const ERA_BG = ['#0E1A28', '#0E1A28'];     // both eras: same dark stage
function pieceCam(era, t) {
  if (era === 0) return push(t, 0.3, 5.7, { z: 1.04, p: [540, 900], to: [540, 880] }, 5.7, 5.9);
  if (era === 1) return push(t, 6.3, 11.7, { z: 1.04, p: [540, 900], to: [540, 880] }, 11.7, 11.9);
  return null;
}
// bridge: one of the 5 fake browser tabs (the third, center) -> the Gero wallet card.
// Both are horizontal rectangles of similar proportions, so the morph is clean.
const BRIDGES = [
  { tc: 6.0,
    A: () => ({ P: [[280, 740], [800, 740], [800, 920], [280, 920]], c: '#1B3650' }),
    B: () => ({ P: [[80, 700], [1000, 700], [1000, 1280], [80, 1280]], c: '#0E1A28' }) },
];
