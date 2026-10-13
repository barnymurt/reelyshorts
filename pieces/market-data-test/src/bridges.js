// =====================================================================
//  ERAS, CAMERAS, BRIDGES — market-data-test (read by kit/morph.js)
// =====================================================================
const ERA_BG = ['#0E1A28', '#0E1A28'];     // both eras: same dark stage
function pieceCam(era, t) {
  if (era === 0) return push(t, 0.3, 5.7, { z: 1.04, p: [540, 1100], to: [540, 1080] }, 5.7, 5.9);
  if (era === 1) return push(t, 6.3, 11.7, { z: 1.04, p: [540, 1100], to: [540, 1080] }, 11.7, 11.9);
  return null;
}
// bridge: the cyan right-edge of the token card -> the left edge of the order book.
// Both are tall thin vertical strips, so the morph is clean.
const BRIDGES = [
  { tc: 6.0, A: () => ({ P: [[880, 680], [898, 680], [898, 1020], [880, 1020]], c: '#0CA3FB' }),
           B: () => ({ P: [[220, 680], [238, 680], [238, 1020], [220, 1020]], c: '#0CA3FB' }) },
];
