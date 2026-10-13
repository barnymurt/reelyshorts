# market-data-test LOG

Build log for the 12s 9:16 test piece. v2 restructured around a curiosity hook and a clear payoff.

## 2026-10-13 — v2 (rewrite)

User feedback (after comparing to a fit50 reference):
- The piece needs a **curiosity hook** that poses a problem the viewer has
- It needs a **clear payoff** — the viewer should know what the video is about and where to go
- The **logo** should be the actual PNG, not a code-drawn silhouette
- The logo file had white corners — reprocessed `stag-circle.png` with proper alpha transparency
- The logo should only appear in the top-left, not as a hero

What changed in v2:
- Era 1 rewritten as the **problem**: "Switching tabs to track one token?" with 6 fake browser tabs showing 6 different prices for the same token (the chaos)
- Era 2 rewritten as the **fix**: "Gero has every venue in one tab" with the order book + candle chart (the proof)
- New "11 venues. Real trades. 1 wallet." stat strip
- New "gerowallet.io/wallet/market-data" CTA pill (bigger and more prominent)
- `dsWatermark()` in `styles/thedigitalstag/kit.js` rewritten to use the actual `stag-circle.png` PNG via the animate toolkit's `asset()` function
- `brands/thedigitalstag/logos/stag-circle.png` reprocessed with `pillow` — corners are now `(0,0,0,0)` (fully transparent)
- Pieces now include `pieces/<name>/assets/stag-circle.png` (copied from the brand folder)
- Hero is still a code-drawn small spot at the bottom (different element from the logo)

## 2026-10-13 — v2.1 (corrections after fit50 comparison)

User feedback:
- No progress indicator (content posted in 1 day, not across days)
- No "Tomorrow" loop tease (same reason)
- Tagline: "Independent Gero content" mentions a separate brand (Gero) — should be about our own space, stag-themed

What changed:
- Removed the "Tomorrow: a 60-second order book / Part 2 of the Gero series" tease from era 2
- New tagline: **"Locking horns with digital assets"** (stag play, about our own space)
  - Updated in `styles/thedigitalstag/kit.js` `dsWatermark()` (visible under the wordmark in every piece)
  - Added to `brands/thedigitalstag/palette.json` as `tagline`
  - Added to `brands/thedigitalstag/BRAND.md` next to the disclaimer section
  - Captions (IG) updated to remove the "Tomorrow" reference
- The disclaimer still reads "Independent Gero content creator..." — that's correct (it's a *disclosure* of independence, not a tagline)

## Open / follow-ups

- The "5 sites. 5 order books. 5 candles." line is a beat too late — the prices have been jumping for 2 seconds before it lands. Consider moving it earlier or making it the first thing after the question.
- The "Tomorrow" tease is small. If the loop-back lands on a viewer who just saw the tease, they'll see "Switching tabs to track one token?" — which is fine, but the tease is a separate signal. Could add a "1/4" progress indicator if thedigitalstag does a series.
- The Gero card is hand-drawn. If H3 is wired (pattern A: Ref2VA from a real Gero screenshot), the card would be a real wallet UI, much more convincing.
