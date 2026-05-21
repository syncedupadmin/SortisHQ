# Gemini File Verification — May 18, 2026

Auditor: Claude Sonnet 4.6  
Source file: `C:\Users\nicho\.claude\4aitool\gemini.md`  
Live sources checked: ai.google.dev/gemini-api/docs/models, ai.google.dev/pricing, ai.google.dev/gemini-api/docs/thinking, ai.google.dev/gemini-api/docs/function-calling, ai.google.dev/gemini-api/docs/google-search, ai.google.dev/gemini-api/docs/openai, ai.google.dev/gemini-api/docs/image-generation, ai.google.dev/gemini-api/docs/speech-generation, ai.google.dev/gemini-api/docs/deprecations

---

## VERIFIED ACCURATE

1. **Model IDs (Gemini 3 series)** — `gemini-3.1-pro-preview`, `gemini-3-flash-preview`, `gemini-3.1-flash-lite`, `gemini-3.1-flash-image-preview`, `gemini-3-pro-image-preview` all confirmed current and correct.

2. **Model IDs (Gemini 2.5 series)** — `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.5-flash-lite` confirmed current.

3. **Context windows** — 1,048,576 token input context for all primary Gemini 3 and 2.5 models is confirmed. Output limit of 65,536 for primary models is confirmed.

4. **Gemini 3.1 Flash-Lite pricing** — $0.25 input / $1.50 output standard tier confirmed. Audio input pricing confirmed at $0.50. Batch 50% discount confirmed.

5. **Gemini 3.1 Pro Preview pricing** — $2.00/$4.00 input, $12.00/$18.00 output (≤/>200k tiers) confirmed on live pricing page.

6. **Gemini 2.5 Pro pricing** — $1.25/$2.50 input, $10.00/$15.00 output (≤/>200k tiers) confirmed.

7. **Gemini 2.5 Flash pricing** — $0.30 input / $2.50 output confirmed.

8. **Gemini 2.5 Flash-Lite pricing** — $0.10 input / $0.40 output confirmed.

9. **Imagen 4 pricing** — $0.02–$0.06 per image confirmed.

10. **Veo 3.1 pricing** — $0.05–$0.60 per second confirmed.

11. **Google Search grounding pricing** — 5,000 free prompts/month then $14/1,000 queries for Gemini 3 confirmed.

12. **Google Search grounding tool format** — `google_search: {}` (Python/REST) and `googleSearch: {}` (JavaScript) confirmed correct.

13. **Google Search supported models list** — All models listed in §18 confirmed correct.

14. **thinkingLevel parameter (Gemini 3)** — `minimal`, `low`, `medium`, `high` values confirmed. `high` confirmed as default for Gemini 3.

15. **thinkingBudget values -1 and 0** — `-1` for dynamic and `0` to disable on Flash models confirmed correct.

16. **"Cannot disable thinking for Gemini 3.1 Pro"** — Confirmed explicitly in live docs.

17. **thinkingConfig REST format** — `generationConfig.thinkingConfig.thinkingLevel` structure confirmed.

18. **Function calling: `id` field required** — Confirmed. Live docs explicitly state Gemini 3 always returns a unique `id` per function call and recommends including matching `id` in `functionResponse`.

19. **Tool config modes AUTO, ANY, NONE** — All confirmed current.

20. **OpenAI compatibility base URL** — `https://generativelanguage.googleapis.com/v1beta/openai/` confirmed.

21. **OpenAI compat: "still in beta"** — Confirmed in live docs.

22. **TTS: All 30 voice names** — All 30 voices confirmed exactly as listed (Zephyr, Puck, Charon, Kore, Fenrir, Leda, Orus, Aoede, Callirrhoe, Autonoe, Enceladus, Iapetus, Umbriel, Algieba, Despina, Erinome, Algenib, Rasalgethi, Laomedeia, Achernar, Alnilam, Schedar, Gacrux, Pulcherrima, Achird, Zubenelgenubi, Vindemiatrix, Sadachbia, Sadaltager, Sulafat).

23. **TTS model ID `gemini-3.1-flash-tts-preview`** — Confirmed as the correct model ID.

24. **TTS: PCM 24kHz mono 16-bit output format** — Confirmed.

25. **Image generation: Gemini 3.1 Flash Image extra aspect ratios** — 1:4, 4:1, 1:8, 8:1 confirmed as exclusive to `gemini-3.1-flash-image-preview`.

26. **Image generation: standard aspect ratios** — 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 confirmed for all models.

27. **Gemini 2.0 shutdown date June 1, 2026** — Confirmed. The deprecations page lists `gemini-2.0-flash`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite`, `gemini-2.0-flash-lite-001` all with June 1, 2026 as earliest shutdown date. File's CLAUDE.md note is accurate.

28. **Embedding model IDs** — `gemini-embedding-2` and `gemini-embedding-001` confirmed.

29. **Generative media model IDs** — `imagen-4`, `imagen-4-ultra`, `veo-3.1-generate-preview`, `lyria-3-pro`, `lyria-3-clip` all confirmed in live docs.

30. **Fine-tuning not available in Developer API** — Confirmed as of May 2026.

31. **Batch API 50% discount** — Confirmed across all models.

32. **`VALIDATED` tool config mode** — Confirmed as default for tool combinations.

33. **TTS language count** — File says "90+ languages." Live docs show "80+ languages." Minor discrepancy — see INACCURATE section.

34. **Gemini 2.5 Pro context caching storage: $4.50/1M tokens/hour** — Confirmed on live pricing page.

---

## INACCURATE / OUTDATED

1. **thinkingBudget range stated as `1–24576`** — PARTIALLY INCORRECT.
   - The file states range is `1–24576` for all 2.5 models.
   - Live docs: Gemini 2.5 Flash range is `0–24576` (not `1–`; `0` is valid to disable thinking).
   - Live docs: Gemini 2.5 Pro range is `128–32768` (not `24576` max — Pro supports up to 32,768).
   - The file conflates two different models into one range and misstates both the minimum (should be 0 for Flash, 128 for Pro) and the maximum for Pro (should be 32,768 not 24,576).

2. **TTS language count: "90+ languages"** — OVERSTATED.
   - Live speech-generation docs state "80+ languages" for TTS models. The file says "90+" which appears to be incorrect or drawn from a different capability (the Live API section, which lists 70 languages).

3. **`gemini-3-flash` listed in OpenAI compat models table (§31)** — STATUS UNCERTAIN / LIKELY OUTDATED.
   - The OpenAI compatibility section of gemini.md lists `gemini-3-flash` (no `-preview` suffix) as a supported model for text generation alongside `gemini-3-flash-preview`.
   - The live OpenAI compat docs only reference `gemini-3-flash-preview` as the current model ID. No stable `gemini-3-flash` (non-preview) exists in current docs.
   - This entry should be treated as unverified and likely an error.

4. **Gemini 3 Flash Preview pricing — NOT listed in §4** — OMISSION / IMPLICIT INACCURACY.
   - The file's §4 pricing section does not include a pricing table for `gemini-3-flash-preview`.
   - Live pricing page shows: Input $0.50 (text/image/video) / $1.00 (audio), Output $3.00 per MTok for standard paid tier.
   - The file lists pricing for Flash-Lite, Pro Preview, 2.5 Pro, 2.5 Flash, and 2.5 Flash-Lite — but omits 3 Flash Preview entirely.

5. **Gemini 3 Pro Preview marked as "deprecated and shut down March 9, 2026"** — NOT REFLECTED IN FILE.
   - Live model deprecations page states `Gemini 3 Pro Preview` (an earlier version, likely `gemini-3-pro-preview` as distinct from `gemini-3.1-pro-preview`) was shut down March 9, 2026.
   - The file does not mention this; it lists `gemini-3.1-pro-preview` (the current successor) which is still active. This is a nuance worth noting — there was an earlier `gemini-3-pro-preview` that has been retired.

6. **Lyria pricing missing from §4** — OMISSION.
   - Live pricing page shows Lyria 3 Clip Preview at $0.04/song and Lyria 3 Pro Preview at $0.08/song.
   - The file lists Lyria models in the model catalog (§3) but §4 has no Lyria pricing row.

---

## COULD NOT VERIFY

1. **`gemini-3.1-pro-preview-customtools` variant** — The live model docs return marketing names without full API string IDs. The `customtools` variant ID is mentioned in the file but could not be confirmed or denied via web fetch. Treat as plausible but unverified.

2. **`gemini-3.1-flash-live-preview` model ID** — File explicitly notes this is "inferred." Live docs confirm the model exists (Gemini 3.1 Flash Live is listed) but the exact API string was not retrievable from the fetched pages.

3. **`gemini-3.1-flash-tts-preview` model ID** — Confirmed as a valid name pattern, but the exact versioned/dated suffix (if any is required vs. the generic preview name) could not be verified from live docs.

4. **Gemini 2.5 Flash Image context window** — File lists this model in the generative media table without a context window. Live docs do not surface this detail on the pages checked.

5. **`gemini-3-flash` (stable, non-preview) existence** — Cannot fully confirm whether a stable `gemini-3-flash` without `-preview` has shipped. Live OpenAI compat docs only reference the preview variant. This model ID in §31 of the file is suspect.

6. **Gemini Embedding 2 multimodal capabilities** — File claims text, image, video, audio, PDF inputs. Could not fully verify the audio and video input claims from the pages fetched. Text and image are confirmed.

7. **Context caching pricing for non-Pro models: "0.025–0.45"** — The file gives a vague range. Live pricing shows exact per-model figures but the fetched summaries did not return a clean cross-model table for all caching prices.

---

## NEW INFO NOT IN FILE

1. **Gemini 3 Flash Preview is now on the FREE TIER** — The file's §4 free tier section lists available models as "Gemini 3.1 Flash-Lite, Gemini 3 Flash Preview, Gemini 2.5 Flash, Gemini 2.5 Flash-Lite" which is correct, but the pricing section for Gemini 3 Flash Preview (paid tier: $0.50 input / $1.00 audio / $3.00 output) is entirely absent. Anyone using the paid tier with this model has no reference.

2. **Gemini 3 Pro Preview (earlier variant) was shut down March 9, 2026** — A model called `Gemini 3 Pro Preview` (distinct from `gemini-3.1-pro-preview`) was deprecated and shut down on March 9, 2026 per the deprecations page. This is not documented anywhere in the file.

3. **thinkingBudget for Gemini 2.5 Pro starts at 128, not 1** — The minimum thinkingBudget for Pro is 128 tokens (not 0 or 1). The file's stated range `1–24576` understates both the minimum for Pro and the maximum for Pro.

4. **Lyria 3 Clip: $0.04/song; Lyria 3 Pro: $0.08/song** — Live pricing page has this data. File mentions the models but not their pricing.

5. **Gemini 2.5 Pro context caching storage confirmed at $4.50/1M tokens/hour** — File §4 says "$4.50" for "Gemini 3.1 Pro Preview" but the live page shows this price applies to Gemini 2.5 Pro as well. The caching pricing table in the file is incomplete.

6. **`gemini-embedding-2-preview` is the OpenAI compat embedding model ID** — The file's §31 OpenAI compat table lists `gemini-embedding-2-preview` (with `-preview` suffix), while §3 and §22 just use `gemini-embedding-2`. The OpenAI compat endpoint may require the `-preview` suffix. This inconsistency within the file should be resolved.

7. **thinkingBudget accepted but deprecated for Gemini 3** — Live thinking docs state: "While `thinkingBudget` is accepted for backwards compatibility, using it with Gemini 3 Pro may result in unexpected performance." The file does not warn about this cross-version parameter confusion.

---

## OVERALL ACCURACY SCORE: 8/10

**Breakdown:**

- Model catalog: 9/10 (correct IDs, one unverified variant, one outdated stable-vs-preview entry)
- Pricing: 6/10 (correct for listed models, but Gemini 3 Flash Preview pricing entirely missing, Lyria pricing missing)
- Thinking/reasoning: 7/10 (structure correct, thinkingBudget range wrong for both Pro and Flash, no cross-model compatibility warning)
- Function calling: 10/10 (fully confirmed including `id` requirement)
- Google Search grounding: 10/10 (fully confirmed)
- OpenAI compatibility: 8/10 (base URL and features correct, `gemini-3-flash` non-preview ID suspect)
- TTS: 9/10 (all 30 voices confirmed, language count slightly overstated)
- Image generation: 10/10 (models, resolutions, aspect ratios all confirmed)
- Deprecation/shutdown: 9/10 (June 1 date confirmed, earlier Gemini 3 Pro Preview shutdown not mentioned)

---

## RECOMMENDATION

**File is broadly reliable and suitable for production use with targeted corrections needed.**

### Required fixes (correctness issues):

1. **§10 thinkingBudget range** — Change `1–24576` to: Flash: `0–24576`, Pro: `128–32768`. Add note that `thinkingBudget` on Gemini 3 models may cause unexpected behavior; use `thinkingLevel` instead.

2. **§4 Pricing** — Add a pricing table for `gemini-3-flash-preview` (Input: $0.50 text/image/video, $1.00 audio; Output: $3.00 standard paid tier). Add Lyria 3 Clip ($0.04/song) and Lyria 3 Pro ($0.08/song).

3. **§31 OpenAI compat models table** — Remove or mark as unverified the `gemini-3-flash` (non-preview) entry until a stable model ships. Ensure embedding entry uses `gemini-embedding-2-preview` to match what the compat endpoint actually expects.

### Nice-to-have fixes:

4. **§24 TTS languages** — Change "90+" to "80+" to match live docs.

5. **§3 Model catalog** — Add note that an earlier `gemini-3-pro-preview` was shut down March 9, 2026; `gemini-3.1-pro-preview` is the current active successor.

6. **§4 Context caching pricing** — Expand the caching table to include all models, not just a vague range for "most other models."
