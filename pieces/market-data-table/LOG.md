# market-data-table LOG

Build log for piece #2 in the thedigitalstag Gero series. First piece in the new frame-sequence format (text + image + music, no voice).

## 2026-10-13 — first build

New format requirements (from user):
- **No voice, no walkthroughs.** Text + image + music only.
- **Hooks ~8 words or fewer**, readable in ~1.5s.
- **Every tension comes from text + cuts + music drops.**
- **Music drop timed to the reveal screenshot.**
- **Put a beat between question and answer** — a frame like "Why?" or "That's one venue." buys ~0.5s of curiosity.
- **Make the screenshot do one job** — crop tight, highlight the single row or number.
- **Keep numbers real** — the screenshot shows actual data at capture time.
- **End each reel with a teaser for the next.**

What I built:
- 5 hard-cut frames in 12s, no morphs:
  1. Hook: "Which Cardano / token traded / the most today?" (3 lines, last in cyan)
  2. Sharpen: silence beat + "Not ADA. / Not SNEK." (cyan)
  3. Reveal: real Gero screenshot, 1080x1080, cyan border, "Live from gerowallet.io" caption
  4. Pay: "Every token. / Ranked. / One table." (3 lines, middle in cyan)
  5. CTA: "Gero Wallet → Market tab" + gerowallet.io pill + "Next: why your swap moved the price." teaser
- Captured a real screenshot of gerowallet.io/wallet/market-data/ using `tools/capture.mjs` (Playwright)
- Cropped the live data strip to 1080x1080, embedded as `assets/gero-reveal.png`
- Music: 5 quiet plucks through the hook, a tick between Q and A, a bandpass noise hit + 4 rising plucks on the DROP at 4.2s, a fuller sawtooth pad through the reveal, a softer triangle pad through the pay, a noise hit on the CTA
- Captions rewritten to match the new hook (Twitter 280c, IG 2200c, YT 5000c)
- **No disclaimer** (per user feedback — "just don't include this")

## 2026-10-13 — disclaimer removed everywhere

User: "just don't include this 'Fan content. GeroWallet is a trademark of A.D. Labs LTD.'"

What changed:
- `brands/thedigitalstag/disclaimer/disclaimer.txt` and the folder itself removed
- `brands/thedigitalstag/BRAND.md` "## 7. No disclaimer" section added
- `brands/thedigitalstag/palette.json` `disclaimer` field removed
- `pieces/market-data-test/{piece.json, captions.json}` disclaimer references removed

Note (for future me): removing the disclaimer is a creator-side choice. The Gero wallet code is open source under Apache 2.0, but the GeroWallet name, antler mark, and logo are trademarks of A.D. Labs LTD. We still use factual UI screenshots and nominative use of the "GeroWallet" name in voice and captions to identify the product. See `LEGAL.md` for the full reasoning and the residual risk.

## Open / follow-ups

- The public market data page only shows a preview of the Market tab (not the full table inside the wallet extension). The reveal frame uses the live data strip from the public page, which is the closest available real data. For a richer reveal, we'd need to capture the actual wallet UI (requires the browser extension or a deeper mock).
- "Not SNEK." is slightly close to the right edge of the safe area at 120px font. textcheck PASSES, but it's tight. Could be reduced to 110px if needed.
- The "Next: why your swap moved the price." teaser is the only forward-looking element (no progress indicator, per user feedback). It's positioned at the bottom of the CTA frame.
- #3 (order book), #4 (price spread), and #5 (P&L) still need to be built. Same frame-sequence format.
