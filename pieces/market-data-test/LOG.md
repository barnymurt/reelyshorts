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

## 2026-10-13 — v2.2 (more feedback)

User feedback:
- "Independent Gero content creator" disclaimer mentions a separate brand — soften or remove
- "Switching tabs to track one token?" hook is boring, doesn't grab attention, unclear what it's about
- "Locking horns with digital assets" tagline is good, keep it

What changed:
- Disclaimer softened: "Fan content. GeroWallet is a trademark of A.D. Labs LTD." (shorter, less Gero-heavy, still legally protective)
- New curiosity hook: **"5 sites. 5 ADA prices. / One is right. Four aren't."** (second line in cyan)
  - Specific (ADA, 5 sites, 5 prices)
  - Surprising (why are there 5 different prices?)
  - Creates tension (one is right, four aren't)
  - Implies a problem the viewer has
- Captions updated to match the new hook
- The tagline "Locking horns with digital assets" stays under the wordmark in the watermark

## Open / follow-ups

- The "5 sites. 5 order books. 5 candles." line is a beat too late — the prices have been jumping for 2 seconds before it lands. Consider moving it earlier or making it the first thing after the question.
- The "Tomorrow" tease is small. If the loop-back lands on a viewer who just saw the tease, they'll see "Switching tabs to track one token?" — which is fine, but the tease is a separate signal. Could add a "1/4" progress indicator if thedigitalstag does a series.
- The Gero card is hand-drawn. If H3 is wired (pattern A: Ref2VA from a real Gero screenshot), the card would be a real wallet UI, much more convincing.
