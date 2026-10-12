// =====================================================================
//  ERAS, CAMERAS, BRIDGES — thedigitalstag demo (read by kit/morph.js)
// =====================================================================
const ERA_BG = ['#0E1A28', '#0E1A28'];     // both eras are the same dark navy
function pieceCam(era, t) {
  return era === 0
    ? push(t, 0.3, 2.7, { z: 1.05, p: [540, 1100], to: [540, 1050] }, 2.7, 2.9)
    : null;
}
const BRIDGES = [
  // the cyan glow under the first slab becomes the row of "delegated" lines.
  // Both are roughly the same horizontal extent so the morph is clean.
  { tc: 3.0, A: () => ({ P: ellipsePts(290, 1080, 110, 22, 0, 48), c: '#0CA3FB' }), B: () => ({ P: [[180, 1000], [920, 1000], [920, 1010], [180, 1010]], c: '#0CA3FB' }) },
];
