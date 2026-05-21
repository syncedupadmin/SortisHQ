# Anthropic File Verification — May 18, 2026

Sources checked:

- Models overview: https://platform.claude.com/docs/en/docs/about-claude/models/overview
- Messages API: https://platform.claude.com/docs/en/api/messages
- Extended thinking: https://platform.claude.com/docs/en/docs/build-with-claude/extended-thinking
- Rate limits: https://platform.claude.com/docs/en/api/rate-limits
- Pricing: https://platform.claude.com/docs/en/about-claude/pricing

---

## VERIFIED ACCURATE

- **Claude Opus 4.7 API ID** (`claude-opus-4-7`): confirmed from models overview
- **Claude Sonnet 4.6 API ID** (`claude-sonnet-4-6`): confirmed from models overview
- **Claude Haiku 4.5 API ID** (`claude-haiku-4-5-20251001`) and alias (`claude-haiku-4-5`): confirmed from models overview
- **Context windows**: Opus 4.7 = 1M tokens, Sonnet 4.6 = 1M tokens, Haiku 4.5 = 200k tokens — confirmed from models overview
- **Max output tokens**: Opus 4.7 = 128k, Sonnet 4.6 = 64k, Haiku 4.5 = 64k — confirmed from models overview
- **Standard pricing — Opus 4.7**: $5 input / $25 output per MTok — confirmed from pricing page
- **Standard pricing — Sonnet 4.6**: $3 input / $15 output per MTok — confirmed from pricing page
- **Standard pricing — Haiku 4.5**: $1 input / $5 output per MTok — confirmed from pricing page
- **Standard pricing — Opus 4.6**: $5 input / $25 output per MTok — confirmed from pricing page
- **Standard pricing — Opus 4.1**: $15 input / $75 output per MTok — confirmed from pricing page
- **Standard pricing — Sonnet 4.5**: $3 input / $15 output per MTok — confirmed from pricing page
- **Standard pricing — Haiku 3.5**: $0.80 input / $4 output per MTok — confirmed from pricing page
- **Reliable knowledge cutoff — Opus 4.7**: Jan 2026 — confirmed from models overview
- **Reliable knowledge cutoff — Sonnet 4.6**: Aug 2025 — confirmed from models overview
- **Training data cutoff — Opus 4.7**: Jan 2026 — confirmed from models overview
- **Training data cutoff — Sonnet 4.6**: Jan 2026 — confirmed from models overview
- **Training data cutoff — Haiku 4.5**: Jul 2025 — confirmed from models overview
- **Opus 4.7 adaptive thinking only (no budget_tokens)**: confirmed — docs explicitly state "NOT supported — returns 400 error" for manual extended thinking on Opus 4.7; adaptive is the only mode
- **Deprecation of Sonnet 4 and Opus 4 — retire June 15, 2026**: confirmed — warning box in models overview states exact date
- **Sonnet 4 deprecated API ID** (`claude-sonnet-4-20250514`): confirmed from models overview
- **Opus 4 deprecated API ID** (`claude-opus-4-20250514`): confirmed from models overview
- **Prompt caching — 5m write multiplier = 1.25x**: confirmed from pricing page
- **Prompt caching — 1h write multiplier = 2x**: confirmed from pricing page
- **Prompt caching — cache read = 0.1x**: confirmed from pricing page
- **Prompt cache pricing — Opus 4.7/4.6/4.5**: $6.25 / $10 / $0.50 per MTok — confirmed from pricing page
- **Prompt cache pricing — Opus 4.1**: $18.75 / $30 / $1.50 per MTok — confirmed from pricing page
- **Prompt cache pricing — Sonnet 4.6/4.5**: $3.75 / $6 / $0.30 per MTok — confirmed from pricing page
- **Prompt cache pricing — Haiku 4.5**: $1.25 / $2 / $0.10 per MTok — confirmed from pricing page
- **Batch pricing — Opus 4.7/4.6**: $2.50 input / $12.50 output per MTok — confirmed from pricing page
- **Batch pricing — Opus 4.5**: $2.50 / $12.50 per MTok — confirmed from pricing page
- **Batch pricing — Opus 4.1**: $7.50 / $37.50 per MTok — confirmed from pricing page
- **Batch pricing — Sonnet 4.6/4.5**: $1.50 / $7.50 per MTok — confirmed from pricing page
- **Batch pricing — Haiku 4.5**: $0.50 / $2.50 per MTok — confirmed from pricing page
- **Tier advancement requirements** (Tier 1 $5, Tier 2 $40, Tier 3 $200, Tier 4 $400): confirmed from rate limits page
- **Monthly spend limits** (Tier 1–2 $500, Tier 3 $1,000, Tier 4 $200,000): confirmed from rate limits page
- **Rate limits — Tier 1, Opus 4.x**: 50 RPM / 500k ITPM / 80k OTPM — confirmed from rate limits page
- **Rate limits — Tier 1, Sonnet 4.x**: 50 RPM / 30k ITPM / 8k OTPM — confirmed from rate limits page
- **Rate limits — Tier 1, Haiku 4.5**: 50 RPM / 50k ITPM / 10k OTPM — confirmed from rate limits page
- **Rate limits — Tier 2, Opus 4.x**: 1,000 RPM / 2M ITPM / 200k OTPM — confirmed from rate limits page
- **Rate limits — Tier 2, Sonnet 4.x**: 1,000 RPM / 450k ITPM / 90k OTPM — confirmed from rate limits page
- **Rate limits — Tier 2, Haiku 4.5**: 1,000 RPM / 450k ITPM / 90k OTPM — confirmed from rate limits page
- **Rate limits — Tier 3, Opus 4.x**: 2,000 RPM / 5M ITPM / 400k OTPM — confirmed from rate limits page
- **Rate limits — Tier 3, Sonnet 4.x**: 2,000 RPM / 800k ITPM / 160k OTPM — confirmed from rate limits page
- **Rate limits — Tier 3, Haiku 4.5**: 2,000 RPM / 1M ITPM / 200k OTPM — confirmed from rate limits page
- **Rate limits — Tier 4, Opus 4.x**: 4,000 RPM / 10M ITPM / 800k OTPM — confirmed from rate limits page
- **Rate limits — Tier 4, Sonnet 4.x**: 4,000 RPM / 2M ITPM / 400k OTPM — confirmed from rate limits page
- **Rate limits — Tier 4, Haiku 4.5**: 4,000 RPM / 4M ITPM / 800k OTPM — confirmed from rate limits page
- **cache_read_input_tokens do NOT count toward ITPM** (except Haiku 3.5†): confirmed from rate limits page
- **Beta header `files-api-2025-04-14`**: confirmed from pricing page (referenced in file upload docs)
- **Beta header `computer-use-2025-11-24`**: confirmed (referenced in pricing overhead table)
- **Beta header `output-300k-2026-03-24`**: confirmed from models overview note on 300k batch output
- **Beta header `managed-agents-2026-04-01`**: confirmed from rate limits page (Managed Agents section)
- **Beta header `interleaved-thinking-2025-05-14`** for older Claude 4 models: confirmed from extended thinking page
- **Web search cost**: $10 per 1,000 searches — confirmed from pricing page
- **Code execution**: free with web_search/web_fetch; $0.05/hour per container after 1,550 free hours/month — confirmed from pricing page
- **Fast mode pricing**: $30 input / $150 output per MTok (6x standard) — confirmed from pricing page
- **Fast mode**: available on Opus 4.6 and Opus 4.7 only, NOT on Claude Platform on AWS — confirmed from pricing page
- **inference_geo: "us" adds 1.1x multiplier** on Opus 4.6+, Sonnet 4.6+: confirmed from pricing page
- **Managed Agents session runtime**: $0.08 per session-hour — confirmed from pricing page
- **Managed Agents rate limits**: Create = 300 RPM, Read = 600 RPM — confirmed from rate limits page
- **Tool use system prompt overhead — Claude 4.x, auto/none**: 346 tokens; any/tool: 313 tokens — confirmed from pricing page
- **Tool use system prompt overhead — Haiku 3.5, auto/none**: 264 tokens; any/tool: 340 tokens — confirmed from pricing page
- **Computer use tool overhead**: 735 tokens per tool definition (Claude 4.x) + 466–499 system prompt — confirmed from pricing page
- **Bash tool**: 245 additional input tokens — confirmed from pricing page
- **Text editor `20250429` (Claude 4.x)**: 700 additional input tokens — confirmed from pricing page
- **Opus 4.7 new tokenizer note** (up to 35% more tokens): confirmed from pricing page
- **AWS Bedrock IDs**: all three current models match exactly — confirmed from models overview
- **Vertex AI IDs**: all three current models match exactly — confirmed from models overview
- **Max output on Batch API (300k with output-300k-2026-03-24)**: confirmed from models overview
- **Reliable knowledge cutoff — Haiku 4.5**: Feb 2025 — confirmed from models overview

---

## INACCURATE / OUTDATED

- **Legacy model — Sonnet 4 alias**: file says no alias shown; live docs show `claude-sonnet-4-0` as the API alias. Minor omission. Source: models overview
- **Legacy model — Opus 4 alias**: file says no alias shown; live docs show `claude-opus-4-0` as the API alias. Minor omission. Source: models overview
- **Legacy model context windows — Opus 4.6**: file says 1M tokens, live docs confirm 1M tokens — ACTUALLY VERIFIED CORRECT. No change needed.
- **Haiku 3.5 prompt cache pricing — 5m write**: file says "$1/MTok" but the live pricing page shows the column heading is "5m Cache Writes" for Haiku 3.5 at $1/MTok — ACTUALLY MATCHES. No change needed.
- **Haiku 3.5 prompt cache pricing — 1h write**: file says "not listed"; live pricing page shows $1.60/MTok for Haiku 3.5 1h cache write. The file's Prompt Caching section (Section 11) only shows Haiku 4.5, not 3.5. Minor omission rather than inaccuracy.
- **Batch pricing — Haiku 3.5**: file does NOT list Haiku 3.5 batch pricing; live docs show $0.40 input / $2.00 output per MTok. Source: pricing page
- **Legacy model — Opus 4 pricing**: file says Opus 4 is $15 input / $75 output. Live docs show Opus 4 (deprecated) at the same rates — CONFIRMED CORRECT. No discrepancy.
- **Legacy model — Sonnet 4 pricing**: file says $3/$15. Live docs confirm — CONFIRMED CORRECT.

**Confirmed inaccuracies (items file gets definitively wrong or omits with consequence):**

1. **Haiku 3.5 batch pricing missing from Section 12**: File's batch pricing table (Section 12) omits Haiku 3.5. Live docs show $0.40/$2.00 per MTok. Source: https://platform.claude.com/docs/en/about-claude/pricing

2. **Legacy model aliases omitted**: Sonnet 4 has alias `claude-sonnet-4-0` and Opus 4 has alias `claude-opus-4-0` on the live docs. The file omits these aliases. Source: models overview

3. **Haiku 3.5 1h cache write missing**: The file's cache pricing table omits Haiku 3.5 entirely. Live docs show: 5m write $1/MTok, 1h write $1.60/MTok, cache read $0.08/MTok. Source: pricing page

---

## COULD NOT VERIFY (no live source found)

- **Claude Mythos Preview details** (Project Glasswing, invitation-only, adaptive default, display omits): the models overview mentions it exists but redirects to anthropic.com/glasswing which was not separately fetched. The extended thinking doc confirms the `omitted` default and adaptive behavior for Mythos, so most claims are indirectly confirmed.
- **Workspace cache isolation as of February 5, 2026**: specific date claim in Section 11. Not contradicted by any live source, but the date was not re-stated on the current pricing or rate limit pages.
- **`container` parameter** (for reuse across requests): mentioned as optional in Section 4. Not contradicted by the Messages API summary returned, but the summary was condensed.
- **`inference_geo` parameter returning 400 on older models**: claimed in pricing page note about data residency — ACTUALLY CONFIRMED by the pricing page: "Earlier models do not support the `inference_geo` parameter and always use standard pricing; requests that include the parameter on these models return a 400 error."
- **Error recovery behavior difference between Claude 4.5 and earlier vs 4.6+**: Section 10 claim. Not contradicted but not re-confirmed in this audit.
- **Sonnet 4.6 Haiku 4.5 max output claims for thinking** (Section 7 table): 64k tokens — consistent with models table max output values.

---

## NEW INFO NOT IN FILE

1. **`inference_geo` returns 400 on pre-4.6 models**: The pricing page explicitly states "requests that include the parameter on these models return a 400 error." The file mentions the multiplier applies to Opus 4.6+/Sonnet 4.6+ but does not warn that passing it on older models causes an error.

2. **Haiku 3.5 batch pricing ($0.40/$2.00 per MTok)**: Listed on pricing page but absent from the file's batch pricing tables.

3. **Haiku 3.5 1h cache write = $1.60/MTok, cache read = $0.08/MTok**: Listed on pricing page but absent from the file's cache pricing tables (file shows Haiku 3.5 only in the standard pricing section, not in caching).

4. **Model aliases for deprecated models**: `claude-sonnet-4-0` and `claude-opus-4-0` are listed as API aliases on the live models overview. The file lists the dated IDs but omits the undated aliases.

5. **Fast mode has separate rate limits** with `anthropic-fast-*` response headers: Rate limits page notes fast mode has dedicated rate limits separate from standard Opus limits, with its own headers. The file mentions fast mode pricing but not its dedicated rate limit pool.

6. **`max_tokens: 0` returns 400 with `inference_geo` on older models**: implied by the pricing page note but worth flagging as a potential unexpected error source.

7. **Bedrock global vs. regional endpoints (10% premium for regional)**: Starting with Claude Sonnet 4.5+, Bedrock and Vertex AI regional endpoints carry a 10% premium over global endpoints. The file does not mention this distinction at all.

8. **Text editor `20250728`**: The file mentions `text_editor_20250728` as a server tool in Section 6 (tool list) and in the computer use companion tools in Section 13. The pricing page's tool overhead table only explicitly shows `20250429` at 700 tokens for Claude 4.x. The token cost for `20250728` is not separately broken out on the live pricing page (it inherits standard tool pricing).

---

## OVERALL ACCURACY SCORE: 9/10

The file is highly accurate. All pricing, model IDs, context windows, deprecation dates, rate limit tiers, and the critical Opus 4.7 adaptive-only constraint are confirmed correct. The gaps are three omissions (Haiku 3.5 batch pricing, Haiku 3.5 cache pricing, deprecated model aliases) and one missing warning (inference_geo returns 400 on pre-4.6 models). No numbers in the file were found to be wrong — only absent.

## RECOMMENDATION: Needs minor update

Priority fixes:

1. Add Haiku 3.5 to the batch pricing table in Section 12 and Section 16: $0.40/$2.00 per MTok
2. Add Haiku 3.5 to the cache pricing table in Section 11 and Section 16: 5m write $1/MTok, 1h write $1.60/MTok, read $0.08/MTok
3. Add aliases `claude-sonnet-4-0` and `claude-opus-4-0` to the legacy models table in Section 1
4. Add a note in Section 4 (inference_geo parameter) that passing it on pre-Opus 4.6 / pre-Sonnet 4.6 models returns HTTP 400
5. Add a note in Section 14 (Rate Limits) that fast mode uses a dedicated rate limit pool separate from standard Opus limits
