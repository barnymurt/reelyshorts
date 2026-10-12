# thedigitalstag demo brief

A 6s 9:16 morph chain that proves the thedigitalstag kit renders, the hero carries through, the watermark sits on the camera, the cyan accent reads as "Gero content", and the piece stays deterministic on 2s.

## Concept

"The wallet, ready to stake" → "Three taps and ADA is delegated." The visual moves from a card with three slabs (the first highlighted in cyan, the other two waiting) to the same row of three with a cyan check and "delegated" under each. The bridge object is the cyan glow under the first slab — it morphs into the row of cyan underlines.

## Beats

| t   | shot      | what happens |
|-----|-----------|--------------|
| 0.0 | stake     | dark navy stage, "STAKE WITH GERO" tag, "Three taps. Your keys." display, card with three slabs (first cyan), step pills, hero (happy) |
| 1.4 | stake     | cyan glow appears under the first slab |
| 3.0 | morph     | cyan glow -> row of cyan underlines |
| 3.4 | stakeDone | three cyan checks + "delegated" under each row |
| 5.0 | stakeDone | "Your ADA. Your keys. Your rewards." caption |

## Sound plan

- 0.0: a soft triangle pad (D3, A3, F4) holds through era 1
- 0.2 + 0.4: two plucks (D4, A4) on the tag/caption cues
- 2.7-3.05: a quiet sweep (500 -> 2600 Hz) lands on the morph
- 3.0: a fuller pad (D2, A2, F3, C4) holds through era 2
- 3.4 + 3.9 + 4.4: three blips (delegated chimes) on the 8th grid

## Style

- `thedigitalstag` (this style)
- 1080x1920, 24fps, 120 BPM
- On 2s
- Camera: gentle push on era 1 (1.05x zoom around the card centre)

## Bridge

| A (era 0) | B (era 1) |
|---|---|
| cyan ellipse at (290, 1080), rx 110 ry 22 | thin horizontal cyan strip from (180, 1000) to (920, 1010) |

Both shapes are similar in horizontal extent so the morph is clean.

## Hero

A stag-blue spot at (540, 1380), r 70. Mood `happy` in era 0, `wow` in era 1.

## Watermark

Top-left, ~50% opacity, stag silhouette with two tiny antlers + the wordmark "thedigitalstag". Drawn through `DEFER` so it sits over the camera.
