# =====================================================================
#  voice-local.py — OmniVoice local voice clone, called from
#  bin/voice-local.mjs via a Python subprocess.
#
#  Generates speech from text using a voice cloned from a reference audio.
#  Outputs:
#    - <output>.wav  : the generated audio (24kHz mono)
#    - <output>.json : { text, duration_s, sample_rate, words: [{w, t0, t1}] }
#
#  Usage:
#    python voice-local.py \
#        --text "Locking horns with digital assets." \
#        --ref-audio path/to/ref.wav \
#        --ref-text "Transcript of ref audio." \
#        --output path/to/out.wav
# =====================================================================
import argparse
import json
import sys
from pathlib import Path


def transcribe_words(wav_path: str, language: str = "en"):
    """Use faster-whisper to get word-level timestamps."""
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        return None
    model = WhisperModel("base", device="cpu", compute_type="int8")
    segments, info = model.transcribe(
        wav_path, language=language, word_timestamps=True, vad_filter=True
    )
    words = []
    for seg in segments:
        for w in (seg.words or []):
            words.append({
                "w": w.word.strip(),
                "t0": round(w.start, 3),
                "t1": round(w.end, 3),
            })
    return words


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--text", required=True)
    p.add_argument("--ref-audio", required=True)
    p.add_argument("--ref-text", default="")
    p.add_argument("--output", required=True)
    p.add_argument("--language", default="English")
    p.add_argument("--num-step", type=int, default=32)
    p.add_argument("--guidance-scale", type=float, default=2.0)
    p.add_argument("--speed", type=float, default=1.0)
    p.add_argument("--duration", type=float, default=None)
    p.add_argument("--t-shift", type=float, default=0.1)
    p.add_argument("--denoise", type=lambda s: s.lower() in ("1", "true", "yes"), default=True)
    p.add_argument("--postprocess-output", dest="postprocess_output",
                   type=lambda s: s.lower() in ("1", "true", "yes"), default=True)
    p.add_argument("--layer-penalty-factor", type=float, default=5.0)
    p.add_argument("--position-temperature", type=float, default=5.0)
    p.add_argument("--class-temperature", type=float, default=0.0)
    p.add_argument("--device", default=None)
    p.add_argument("--model", default="k2-fsa/OmniVoice")
    p.add_argument("--transcribe", action="store_true",
                   help="Run faster-whisper for word timestamps (writes .json)")
    args = p.parse_args()

    import torch
    import soundfile as sf
    from omnivoice import OmniVoice

    device = args.device or ("cuda:0" if torch.cuda.is_available() else "cpu")
    print(f"[omnivoice] loading {args.model} on {device} ...", file=sys.stderr)
    model = OmniVoice.from_pretrained(
        args.model, device_map=device, dtype=torch.float16
    )
    sr = model.sampling_rate

    print(f"[omnivoice] generating: {args.text[:60]}...", file=sys.stderr)
    audios = model.generate(
        text=args.text,
        language=args.language,
        ref_audio=args.ref_audio,
        ref_text=args.ref_text,
        duration=args.duration,
        num_step=args.num_step,
        guidance_scale=args.guidance_scale,
        speed=args.speed,
        t_shift=args.t_shift,
        denoise=args.denoise,
        postprocess_output=args.postprocess_output,
        layer_penalty_factor=args.layer_penalty_factor,
        position_temperature=args.position_temperature,
        class_temperature=args.class_temperature,
    )

    sf.write(args.output, audios[0], sr)
    print(f"[voice] wrote {args.output}", file=sys.stderr)

    if args.transcribe:
        data, _ = sf.read(args.output)
        duration_s = len(data) / sr
        lang_code = args.language.split()[0].lower() if args.language else "en"
        words = transcribe_words(args.output, lang_code)
        out_json = Path(args.output).with_suffix(".json")
        out_json.write_text(json.dumps({
            "text": args.text,
            "duration_s": round(duration_s, 3),
            "sample_rate": sr,
            "words": words or [],
        }, indent=2))
        print(f"[voice] wrote {out_json}", file=sys.stderr)


if __name__ == "__main__":
    main()
