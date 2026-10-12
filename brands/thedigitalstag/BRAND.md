# thedigitalstag — Brand Guideline

Independent content channel covering the Gero wallet (and the wider Cardano / Midnight / Apex Fusion space). Short-form video for Twitter, Instagram, and YouTube Shorts.

This document is the source of truth. `palette.json` is the machine-readable version of the color tokens. Anything below is canonical unless `palette.json` says otherwise.

---

## 1. Logo

The mark is a photograph of a real blue stag bust (thedigitalstag profile photo), rendered as a circular-cropped asset for use on dark or paper surfaces.

| File | Use |
|---|---|
| `brands/thedigitalstag/logos/stag-circle.png` | Default. 447x447, transparent background, thin stag-blue border. Use in app icons, profile images, intro/outro cards, watermarks. |
| `brands/thedigitalstag/logos/stag-original.png` | Source photograph. Keep on hand but rarely use in output — the circle crop is the brand. |

### Do
- Place on `#0E1A28` (dark mode bg) or `#EAEEF2` (paper).
- Keep a clear space around the mark of at least 0.5x the mark's diameter.
- Use at 64px or larger in rendered output.

### Don't
- Recolor the stag.
- Rotate the stag.
- Stretch the stag.
- Place on busy or low-contrast backgrounds without the dark or paper surface beneath it.
- Use the original photo with its real-world background (kitchen wall, frames, etc.) in rendered output — always the circle crop.

### Visual rhyme with Gero
Gero's mark is an antler silhouette. The stag (which has antlers) is a visual rhyme, not a copy. The two marks should never be confused: Gero's antler is a clean two-prong icon, thedigitalstag's stag is a full blue bust in a circle. Different shape, different color, different treatment.

---

## 2. Color

### Primary — stag blue
| Token | Hex | Use |
|---|---|---|
| `stag_blue.deep` | `#0F2A4A` | Deepest darks, end-card backgrounds, never as type |
| `stag_blue.primary` | `#1C3E69` | Brand color. Default type on light, default surface on dark |
| `stag_blue.mid` | `#324975` | Hover, active, secondary surfaces |
| `stag_blue.light` | `#5A7FA0` | Highlights, line work, dividers on dark |

### Neutrals
| Token | Hex | Use |
|---|---|---|
| `cool_grey` | `#B2B7B7` | Dividers, muted UI |
| `warm_grey` | `#BABBC2` | Soft surfaces, photo backgrounds |
| `off_white` | `#F0F0EE` | High-contrast text on dark |
| `paper` | `#EAEEF2` | Light-mode surface, intro card |

### Dark mode
| Token | Hex | Use |
|---|---|---|
| `bg` | `#0E1A28` | Default video background |
| `surface` | `#142A3E` | Cards on dark |
| `border` | `#243A52` | Dividers on dark |

### Type
| Token | Hex | Use |
|---|---|---|
| `on_light` | `#1C3E69` | Body text on paper |
| `on_dark` | `#F0F0EE` | Body text on dark |
| `muted_on_dark` | `#9FB0BF` | Captions, footnotes |

### Gero accent (use sparingly)
| Token | Hex | Use |
|---|---|---|
| `gero_accent.gradient_start` | `#0CA3FB` | Gradient start |
| `gero_accent.gradient_end` | `#00EAEF` | Gradient end |
| `gero_accent.solid` | `#00A8C8` | Single-tone icons, type |

**Rule:** Gero cyan only appears on Gero-wallet content. The cyan signals "this piece is about Gero." On general thedigitalstag content (other wallets, creator stuff, behind-the-scenes), only the stag blue palette is used.

Prominence on Gero-wallet pieces (locked): subtle. Cyan appears on the wallet UI, key numbers, and the word "Gero" on screen. The stag blue dominates the rest of the frame.

---

## 3. Typography

| Role | Family | Weight |
|---|---|---|
| Display | Inter | 700 |
| Headings | Inter | 600 |
| Body | Inter | 400 / 500 |
| Mono / captions | JetBrains Mono | 400 |

System fallbacks: `system-ui`, `Segoe UI`, `Roboto`, `sans-serif` (Inter). For mono: `Consolas`, `monospace` (JetBrains Mono).

Type sizes for 9:16 output (1080x1920): Display 96–128px, H1 64–80px, H2 48–56px, Body 32–40px, Caption 24–28px.

Type sizes for 1:1 output (1080x1080): Display 80–96px, H1 56–64px, H2 40–48px, Body 28–32px, Caption 20–24px.

---

## 4. Voice

Tone: **calm, knowledgeable, independent, specific.**

- **Calm** — we don't shout. Confidence is quiet.
- **Knowledgeable** — we've actually used the product. Speak from experience.
- **Independent** — we're a fan channel, not the brand. Be clear about it. (See disclaimer.)
- **Specific** — numbers, names, facts. Vague claims read as ads.

### Cloned voice
The voice used in pieces is a clone of thedigitalstag's own voice, hosted on ElevenLabs Instant Voice Clone. Set up once with `reelyshorts voice setup`. Every narration thereafter uses the same `voice_id` from `brands/thedigitalstag/voice.json`. If the clone is unavailable, pieces fall back to text-only with on-screen captions and procedural music.

---

## 5. Stag mark in pieces

| Placement | Behavior |
|---|---|
| End card | Full lockup: circle stag + "thedigitalstag" wordmark + disclaimer text. |
| Throughout | Small corner watermark (top-left, ~10% of frame width, ~50% opacity). Reminds the viewer of the brand without competing with the content. |
| Intro card | Not used. The piece opens on the wallet UI or a hook frame. |

---

## 6. Motion

- **Tempo**: ~30% slower than the upbeat reference (`refs/gero-earn-vertical-upbeat.mp4`) — feels "verified" not "hype."
- **Easing**: ease-in-out, springs, no linear.
- **Cuts**: synced to the beat grid of the procedural score.
- **Transitions**: shape-morph where possible (the old world closes in on one object, it morphs into the next world's counterpart, the new world opens out of it).
- **Cameras**: very slow drifts, never shaky.

---

## 7. Disclaimer

Every published piece carries the disclaimer:

> Independent Gero content creator. Not affiliated with GeroWallet / A.D. Labs LTD.

Where it appears:
- End card, full lockup.
- Captions (`caption.disclaimer` in each piece's `piece.json`).
- YouTube description and About section.

This is a brand requirement, not a legal one. The Gero wallet code is open source under Apache 2.0, but the **GeroWallet** name, antler mark, and logo are trademarks of A.D. Labs LTD. We never render the Gero mark or wordmark in our pieces; we use the wallet's actual UI screenshots (factual depiction) and rely on nominative use of the "GeroWallet" name in voice and captions to identify the product. See `LEGAL.md` for the full reasoning.

---

## 8. Do / Don't

| Do | Don't |
|---|---|
| Use wallet UI screenshots | Render the Gero antler mark in our output |
| Say "GeroWallet" when naming the product | Imply we're affiliated with the Gero team |
| Cite features with specific numbers | Make vague claims ("the best wallet") |
| Show our process (terminal, tool, etc.) | Promise things we haven't verified in the wallet |
| Have fun with the visual style | Drift into clickbait framing |

---

## 9. Files

```
brands/thedigitalstag/
├── BRAND.md               <-- this file
├── BRAND.pdf              <-- printable version (run `reelyshorts brand export`)
├── palette.json           <-- machine-readable color tokens
├── voice.json             <-- ElevenLabs voice clone config
├── voice-samples/         <-- audio uploaded to ElevenLabs (gitignored)
├── logos/
│   ├── stag-original.png  <-- source photo
│   └── stag-circle.png    <-- primary mark
├── type/                  <-- font files (add as needed)
└── disclaimer/            <-- end-card assets
```
