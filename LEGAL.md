# Legal posture

This project is **independent content** about the Gero wallet. It is not affiliated with, endorsed by, or sponsored by GeroWallet / A.D. Labs LTD. This document records the reasoning behind the brand and content choices so the system can re-derive them later.

## The facts

- **GeroWallet** is a non-custodial wallet for Cardano, Midnight, and Apex Fusion.
- The wallet code is open source under **Apache License 2.0**: https://github.com/Gero-Labs/gerowallet
- The **GeroWallet name, antler mark, and logo** are trademarks of A.D. Labs LTD. Apache 2.0 explicitly does not grant trademark rights. (Section 6 of the license.)
- The Gero media kit at https://gerowallet.io/media-kit/ restricts logo use to "press, partners and community." Independent fan content is a gray area.
- thedigitalstag has a working relationship with the Gero team but no written trademark license.
- The animate toolkit (vendored in `tools/animate/`) is MIT-licensed (https://github.com/cth9191/animate).

## What we do

1. **Use the thedigitalstag mark and palette.** Our brand is the blue stag (`#1C3E69` family), not the Gero cyan gradient. The viewer identifies the content as thedigitalstag first.
2. **Use the Gero wallet's actual UI screenshots.** Factual depiction of a public product. Strongest recognition signal without using the brand marks.
3. **Use the Gero cyan gradient as an accent, sparingly.** The cyan appears only on Gero-wallet content, on the wallet UI, key numbers, and the word "Gero" on screen. It signals "this piece is about Gero" without becoming the brand.
4. **Name the product.** "GeroWallet" appears in voice, captions, and end cards under nominative fair use — we use the name to identify the product, not to brand our content.
5. **Carry a disclaimer on every piece.** "Independent Gero content creator. Not affiliated with GeroWallet / A.D. Labs LTD." This is a brand requirement, not a legal one.
6. **Reference, don't copy, official assets.** `refs/gero-earn-vertical-upbeat.mp4` is kept for measurement (color, motion rhythm) only. We don't copy frames or motion wholesale.

## What we don't do

1. **Don't render the Gero antler mark in our output.** Even though it would visually rhyme with our stag (both have antlers), it's the clearest trademark element and the strongest copy trigger.
2. **Don't render the "GeroWallet" wordmark in our output.** Same reasoning. We name the product in voice/captions instead.
3. **Don't imply affiliation.** No "official," "partnered," "in collaboration with GeroWallet," etc. The disclaimer is on every piece for a reason.
4. **Don't copy the official Gero video frame-for-frame.** We measure it (color, tempo, cut rhythm) and build a different piece in the same family.
5. **Don't redistribute the Gero source code or wallet build in this repo.** Apache 2.0 lets us *use* the code; this repo is not the place to redistribute it. The wallet build ZIP (`Gero-v2.6.0-Beta.zip`, 117MB) was kept locally for reference and intentionally excluded from this repo via `.gitignore`.

## What changes if the Gero team grants written permission

If A.D. Labs LTD ever gives thedigitalstag explicit written permission to use the Gero brand assets:

- Add `brands/thedigitalstag-geroofficial/` as a sibling brand variant
- Enable a `--style gero-official` flag in the CLI
- Add the antler mark + wordmark to the end-card lockup
- Remove the disclaimer requirement (or soften it to a credit)

The architecture is built to make this a 30-second change.

## What changes if the Gero team asks us to stop

- Pause publication immediately
- Remove the affected pieces from the gallery
- The repo itself stays (it's just a tool + brand kit; the Gero source docs are kept locally for reference but the publication is what gets pulled)
- Replace Gero source material in `refs/gero-source/` with non-Gero content; the system still works for other subjects

## References

- Apache License 2.0, Section 6 (Trademarks): https://www.apache.org/licenses/LICENSE-2.0
- Gero media kit: https://gerowallet.io/media-kit/
- Gero source: https://github.com/Gero-Labs/gerowallet
- Vendored animate toolkit: https://github.com/cth9191/animate (MIT)
- thedigitalstag brand spec: `brands/thedigitalstag/BRAND.md`
