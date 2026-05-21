# 4AI Tool — Master Reference Guide

> Compiled: May 2026 | Verified against live docs: 2026-05-20 | All 4 providers cross-checked | Self-update check required on each use (see Section 0)

---

## HOW TO USE THIS TOOL

This master file is your starting point for any cross-provider AI question. It contains:

- All current model IDs and pricing from all 4 providers
- Quick-reference auth, endpoints, and feature comparisons
- Side-by-side code examples for tool use, streaming, vision, structured output, and reasoning

**For multi-provider orchestration** (routing, fallbacks, chaining, consensus):

- `C:\Users\nicho\.claude\4aitool\multi-provider.md` ← START HERE for "use them together"

**For deep-dive technical work on a specific provider**, also open the individual file:

- Anthropic full spec: `C:\Users\nicho\.claude\4aitool\anthropic.md`
- OpenAI full spec: `C:\Users\nicho\.claude\4aitool\openai.md`
- Gemini full spec: `C:\Users\nicho\.claude\4aitool\gemini.md`
- Perplexity full spec: `C:\Users\nicho\.claude\4aitool\perplexity.md`

**To invoke this tool as a slash command:** type `/4aitool [your question]`

---

## SECTION 0: LIVE VERIFICATION PROTOCOL

This master was compiled **May 2026**. AI models change rapidly — new models ship weekly.

**Before answering from this file — ALWAYS, every invocation:**

1. Run parallel WebSearches for current models from all 4 providers (see Step 1 in the slash command)
2. Compare search results against Section 1 below
3. If something has changed: mark the relevant individual provider file with a `# NEEDS UPDATE — [date]` flag AND update Section 1 below
4. Report the live check result to the user before answering

---

## SECTION 1: CURRENT MODELS — ALL PROVIDERS (Master Table)

### Anthropic Claude Models

| Model                 | API ID                      | Context     | Max Output | Input $/MTok | Output $/MTok | Strengths                                                                   | Knowledge Cutoff |
| --------------------- | --------------------------- | ----------- | ---------- | ------------ | ------------- | --------------------------------------------------------------------------- | ---------------- |
| Claude Opus 4.7       | `claude-opus-4-7`           | 1M tokens   | 128k       | $5           | $25           | Best GA model, complex reasoning, agentic coding, adaptive thinking         | Jan 2026         |
| Claude Sonnet 4.6     | `claude-sonnet-4-6`         | 1M tokens   | 64k        | $3           | $15           | Speed + intelligence balance, extended thinking, beats prior Opus on coding | Aug 2025         |
| Claude Haiku 4.5      | `claude-haiku-4-5-20251001` | 200k tokens | 64k        | $1           | $5            | Fastest, cheapest, near-frontier                                            | Feb 2025         |
| Claude Mythos Preview | invitation only             | 1M tokens   | 128k       | $5           | $25           | Most advanced (gated/Project Glasswing, defensive cybersecurity)            | —                |

**Legacy (still available):**

- `claude-opus-4-6` — $5/$25, 1M ctx, 128k out
- `claude-sonnet-4-5-20250929` — $3/$15, 200k ctx
- `claude-opus-4-5-20251101` — $5/$25, 200k ctx
- `claude-opus-4-1-20250805` — $15/$75, 200k ctx

**DEPRECATED (retire June 15, 2026):** `claude-sonnet-4-20250514`, `claude-opus-4-20250514`

> NOTE: Opus 4.7 uses a new tokenizer — up to 35% more tokens for identical text vs prior models.

---

### OpenAI GPT Models

| Model            | API ID                | Notes                                                                                | Input $/MTok           | Output $/MTok |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------ | ---------------------- | ------------- |
| GPT-5.5 Instant  | `gpt-5.5-instant`     | ⚠️ NEW May 5 2026 — ChatGPT default, `chat-latest` alias, 52.5% fewer hallucinations | TBD                    | TBD           |
| GPT-5.4          | `gpt-5.4`             | Latest flagship                                                                      | $2.50 (via Perplexity) | $15           |
| GPT-5.4 Mini     | `gpt-5.4-mini`        | Smaller variant                                                                      | $0.75                  | $4.50         |
| GPT-5.4 Nano     | `gpt-5.4-nano`        | Smallest                                                                             | $0.20                  | $1.25         |
| GPT-5.3 Codex    | `gpt-5.3-chat-latest` | Agentic coding                                                                       | —                      | —             |
| GPT-5.2          | `gpt-5.2`             | Flagship                                                                             | $1.75 (via Perplexity) | $14           |
| GPT-5.2 Pro      | `gpt-5.2-pro`         | Premium tier, Responses API only                                                     | —                      | —             |
| GPT-5.1          | `gpt-5.1`             | —                                                                                    | $1.25                  | $10           |
| GPT-5.1 Codex    | `gpt-5.1-codex`       | Agentic coding                                                                       | —                      | —             |
| GPT-5            | `gpt-5`               | —                                                                                    | $1.25                  | $10           |
| GPT-5 Mini       | `gpt-5-mini`          | —                                                                                    | $0.25                  | $2            |
| GPT-5 Codex      | `gpt-5-codex`         | Responses API only                                                                   | —                      | —             |
| GPT-5 Pro        | `gpt-5-pro`           | Responses API only, high reasoning                                                   | —                      | —             |
| GPT-4.1          | `gpt-4.1`             | —                                                                                    | —                      | —             |
| GPT-4.1 Mini     | `gpt-4.1-mini`        | —                                                                                    | —                      | —             |
| GPT-4.1 Nano     | `gpt-4.1-nano`        | Cost-efficient                                                                       | —                      | —             |
| GPT-4o           | `gpt-4o`              | Previous gen flagship                                                                | —                      | —             |
| GPT-4o Mini      | `gpt-4o-mini`         | Previous gen efficient                                                               | —                      | —             |
| o4-mini          | `o4-mini`             | Reasoning, latest mini                                                               | —                      | —             |
| o3               | `o3`                  | Reasoning flagship                                                                   | —                      | —             |
| o3 Pro           | `o3-pro`              | Responses API only                                                                   | —                      | —             |
| o3 Deep Research | `o3-deep-research`    | Responses API only                                                                   | —                      | —             |
| o1               | `o1`                  | Reasoning                                                                            | —                      | —             |
| o1 Pro           | `o1-pro`              | Responses API only                                                                   | —                      | —             |

> NOTE: OpenAI pricing changes frequently. Verify at https://openai.com/pricing. The Perplexity Agent API lists first-party prices for OpenAI models (no markup).

> NOTE: GPT-5.5 appears in CLAUDE.md as the "latest flagship (Apr 2026)" — verify current availability via web search before using.

---

### Google Gemini Models

| Model                  | API ID                            | Context      | Max Output | Input $/MTok    | Output $/MTok  | Strengths                                                                           |
| ---------------------- | --------------------------------- | ------------ | ---------- | --------------- | -------------- | ----------------------------------------------------------------------------------- |
| Gemini 3.5 Flash       | `gemini-3.5-flash` _(pending GA)_ | ~1M          | TBD        | ~40% < 3.1 Pro  | ~40% < 3.1 Pro | ⚠️ NEW May 19 2026 (I/O) — beats 3.1 Pro on coding, 4× faster, Terminal-Bench 76.2% |
| Gemini 3.1 Pro Preview | `gemini-3.1-pro-preview`          | 1M tokens    | 65,536     | $2–4 (≤200k)    | $12–18 (≤200k) | Complex reasoning, agentic workflows                                                |
| Gemini 3 Flash Preview | `gemini-3-flash-preview`          | 1M tokens    | 65,536     | $0.50           | $3             | Speed + intelligence, computer use                                                  |
| Gemini 3.1 Flash-Lite  | `gemini-3.1-flash-lite`           | 1M tokens    | 65,536     | $0.25           | $1.50          | High-volume lightweight tasks, best price/perf                                      |
| Gemini 2.5 Pro         | `gemini-2.5-pro`                  | 1M tokens    | 65,536     | $1.25 (≤200k)   | $10 (≤200k)    | Complex coding/math, thinking mode                                                  |
| Gemini 2.5 Flash       | `gemini-2.5-flash`                | 1M tokens    | 65,536     | $0.30           | $2.50          | Best price-performance for large-scale processing                                   |
| Gemini 2.5 Flash-Lite  | `gemini-2.5-flash-lite`           | 1M tokens    | 65,536     | $0.10           | $0.40          | Most cost-efficient multimodal                                                      |
| Gemini Embedding 2     | `gemini-embedding-2`              | 8,192 tokens | 3,072 dims | $0.20/1M (text) | —              | Multimodal embeddings                                                               |
| Gemini 3.1 Flash Image | `gemini-3.1-flash-image-preview`  | 131,072      | 32,768     | —               | —              | Image generation, ultra-wide aspect ratios                                          |
| Gemini 3 Pro Image     | `gemini-3-pro-image-preview`      | 65,536       | 32,768     | —               | —              | Professional image editing                                                          |

**Generative Media (non-text output):**

- `gemini-omni-flash` _(API ID pending GA)_ — ⚠️ NEW May 19 2026 — Multimodal-in (image/audio/video/text) → video out, physics reasoning, SynthID watermark. Consumer live; developer API "coming weeks"
- `imagen-4` — Text-to-image up to 2K ($0.02–$0.06/image)
- `imagen-4-ultra` — Highest quality images
- `veo-3.1-generate-preview` — Video generation with native audio ($0.05–$0.60/sec)
- `lyria-3-pro` / `lyria-3-clip` — Music generation

> NOTE: Gemini 2.0 models shut down June 1, 2026. Migrate to 2.5 or 3 series.

---

### Perplexity Sonar Models (Native)

| Model               | API ID                | Input $/MTok | Output $/MTok | Req Fee/1K | Strengths                                 |
| ------------------- | --------------------- | ------------ | ------------- | ---------- | ----------------------------------------- |
| Sonar               | `sonar`               | $1           | $1            | $5–12      | Lightweight, cost-effective, web-grounded |
| Sonar Pro           | `sonar-pro`           | $3           | $15           | $6–22      | Advanced web search, complex queries      |
| Sonar Reasoning Pro | `sonar-reasoning-pro` | $2           | $8            | $6–14      | Chain-of-thought + web search             |
| Sonar Deep Research | `sonar-deep-research` | $2           | $8            | —          | Exhaustive multi-source research reports  |

**Perplexity Embedding Models:**

- `pplx-embed-v1-0.6b` — 1024 dims, 32K context, $0.004/1M tokens
- `pplx-embed-v1-4b` — 2560 dims, 32K context, $0.03/1M tokens
- `pplx-embed-context-v1-0.6b` — Contextualized, $0.008/1M tokens
- `pplx-embed-context-v1-4b` — Contextualized, $0.05/1M tokens

---

## SECTION 2: QUICK AUTHENTICATION REFERENCE

### Anthropic

```
Base URL:    https://api.anthropic.com
Auth header: x-api-key: YOUR_ANTHROPIC_API_KEY
Version:     anthropic-version: 2023-06-01  (required on every request)
Content:     content-type: application/json
Env var:     ANTHROPIC_API_KEY
```

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-opus-4-7","max_tokens":1024,"messages":[{"role":"user","content":"Hello"}]}'
```

### OpenAI

```
Base URL:    https://api.openai.com/v1
Auth header: Authorization: Bearer sk-...
Env var:     OPENAI_API_KEY
Optional:    OpenAI-Organization: org-...
             OpenAI-Project: proj-...
```

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'
```

### Gemini (Google)

```
Base URL:    https://generativelanguage.googleapis.com/v1beta/
Auth header: x-goog-api-key: YOUR_GEMINI_API_KEY
Env var:     GEMINI_API_KEY
Alternatives: OAuth / Service Account (Vertex AI enterprise)
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

### Perplexity

```
Base URL:    https://api.perplexity.ai
Auth header: Authorization: Bearer YOUR_PERPLEXITY_API_KEY
Env var:     PERPLEXITY_API_KEY
Note:        API key shown ONCE at creation — store securely
```

```bash
curl https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"sonar-pro","messages":[{"role":"user","content":"Hello"}]}'
```

---

## SECTION 3: API ENDPOINT QUICK REFERENCE

### Anthropic

| Endpoint                            | Method          | Description                     |
| ----------------------------------- | --------------- | ------------------------------- |
| `/v1/messages`                      | POST            | Chat/completions (primary API)  |
| `/v1/messages/count_tokens`         | POST            | Count tokens before sending     |
| `/v1/messages/batches`              | POST            | Batch API (50% discount, async) |
| `/v1/messages/batches/{id}`         | GET             | Poll batch status               |
| `/v1/messages/batches/{id}/results` | GET             | Retrieve batch results (JSONL)  |
| `/v1/files`                         | POST/GET/DELETE | Files API (beta, needs header)  |
| `/v1/models`                        | GET             | List available models           |
| `/v1/agents`                        | POST            | Managed Agents (beta)           |

### OpenAI

| Endpoint                           | Method          | Description                  |
| ---------------------------------- | --------------- | ---------------------------- |
| `/v1/chat/completions`             | POST            | Chat Completions (standard)  |
| `/v1/responses`                    | POST            | Responses API (new standard) |
| `/v1/embeddings`                   | POST            | Text embeddings              |
| `/v1/images/generations`           | POST            | Image generation             |
| `/v1/images/edits`                 | POST            | Image editing                |
| `/v1/audio/speech`                 | POST            | Text-to-speech               |
| `/v1/audio/transcriptions`         | POST            | Speech-to-text               |
| `/v1/files`                        | POST/GET/DELETE | File management              |
| `/v1/batches`                      | POST            | Batch API                    |
| `/v1/fine_tuning/jobs`             | POST            | Fine-tuning                  |
| `/v1/vector_stores`                | POST            | Vector store management      |
| `/v1/assistants`                   | POST            | Assistants API (beta)        |
| `wss://api.openai.com/v1/realtime` | WebSocket       | Realtime audio API           |

### Gemini

| Endpoint                                                            | Method           | Description                |
| ------------------------------------------------------------------- | ---------------- | -------------------------- |
| `/v1beta/models/{model}:generateContent`                            | POST             | Standard generation        |
| `/v1beta/models/{model}:streamGenerateContent`                      | POST             | Streaming (add `?alt=sse`) |
| `/v1beta/models/{model}:countTokens`                                | POST             | Token counting             |
| `/upload/v1beta/files`                                              | POST             | File upload (resumable)    |
| `/v1beta/files/{name}`                                              | GET/DELETE       | File management            |
| `/v1beta/cachedContents`                                            | POST             | Create cache               |
| `/v1beta/cachedContents/{name}`                                     | GET/PATCH/DELETE | Manage cache               |
| `/v1beta/models/{model}:embedContent`                               | POST             | Embeddings                 |
| `wss://generativelanguage.googleapis.com/ws/...BidiGenerateContent` | WebSocket        | Live API                   |

### Perplexity

| Endpoint            | Method | Description                   |
| ------------------- | ------ | ----------------------------- |
| `/chat/completions` | POST   | Sonar API (OpenAI-compatible) |
| `/v1/agent`         | POST   | Agent API (multi-provider)    |
| `/v1/responses`     | POST   | Agent API (OpenAI alias)      |
| `/search`           | POST   | Raw search results (no LLM)   |
| `/v1/models`        | GET    | List models (no auth needed)  |
| Embeddings          | POST   | Text embeddings               |

---

## SECTION 4: CROSS-PROVIDER FEATURE MATRIX

| Feature                         | Anthropic                            | OpenAI                                 | Gemini                                              | Perplexity                                  |
| ------------------------------- | ------------------------------------ | -------------------------------------- | --------------------------------------------------- | ------------------------------------------- |
| **Tool/Function calling**       | Yes (client + server tools)          | Yes (functions + built-in tools)       | Yes (+ automatic calling in Python SDK)             | Yes (via Agent API)                         |
| **Streaming (SSE)**             | Yes (`stream: true`)                 | Yes (`stream: true`)                   | Yes (`:streamGenerateContent?alt=sse`)              | Yes (`stream: true`)                        |
| **Vision (image input)**        | Yes (JPEG/PNG/GIF/WebP)              | Yes (JPEG/PNG/GIF/WebP)                | Yes (PNG/JPEG/WebP/HEIC/HEIF)                       | Yes (PNG/JPEG/WEBP/GIF, via Agent API)      |
| **Audio input**                 | No                                   | Yes (Whisper, transcribe)              | Yes (WAV/MP3/AIFF/AAC/OGG/FLAC)                     | No                                          |
| **Video input**                 | No                                   | No                                     | Yes (MP4/MPEG/MOV/AVI/etc.)                         | No                                          |
| **Code execution**              | Yes (server tool)                    | Yes (built-in tool)                    | Yes (Python, built-in)                              | No                                          |
| **Web search (built-in)**       | Yes (server tool, $10/1K)            | Yes (Responses API, Chat Completions)  | Yes (Google Search grounding, $14/1K after 5K free) | Yes (native, $5/1K)                         |
| **Extended thinking/reasoning** | Yes (adaptive + manual, Opus/Sonnet) | Yes (o-series, reasoning_effort param) | Yes (thinkingLevel/thinkingBudget)                  | Yes (sonar-reasoning-pro, reasoning_effort) |
| **Structured output/JSON mode** | Yes (`output_config.format`)         | Yes (`response_format: json_schema`)   | Yes (`responseMimeType: application/json`)          | Yes (`response_format: json_schema`)        |
| **Embeddings**                  | No                                   | Yes (`text-embedding-3-*`)             | Yes (`gemini-embedding-2`)                          | Yes (`pplx-embed-*`)                        |
| **Image generation**            | No                                   | Yes (DALL-E-3, GPT-Image series)       | Yes (Imagen 4, Gemini image models)                 | No                                          |
| **Files API**                   | Yes (beta, `files-api-2025-04-14`)   | Yes (GA)                               | Yes (Files API, 48h TTL, 2GB/file)                  | No                                          |
| **Batch API**                   | Yes (50% off, async, 24h)            | Yes (50% off, async, 24h)              | Yes (50% off, async)                                | No                                          |
| **Context caching**             | Yes (5m default, 1h option)          | Yes (`prompt_cache_retention`)         | Yes (implicit on 2.5+, explicit on all)             | No                                          |
| **Realtime/WebSocket API**      | No                                   | Yes (`gpt-realtime` WebSocket)         | Yes (Live API WebSocket)                            | No                                          |
| **Computer use**                | Yes (beta, Opus 4.7/4.6/Sonnet 4.6)  | Yes (`computer-use-preview` model)     | Yes (Gemini 3 Flash Preview)                        | No                                          |
| **Fine-tuning**                 | No                                   | Yes                                    | No (as of May 2026)                                 | No                                          |
| **Multi-provider access**       | No                                   | No                                     | No                                                  | Yes (Agent API: 6 providers)                |
| **Web search with citations**   | Via web_search tool                  | Via search models/tools                | Via grounding metadata                              | Native (search_results field)               |

---

## SECTION 5: TOOL USE / FUNCTION CALLING — SIDE BY SIDE

### Defining a Tool

**Anthropic:**

```json
{
  "name": "get_weather",
  "description": "Get current weather for a location",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": { "type": "string", "description": "City name" }
    },
    "required": ["location"]
  }
}
```

**OpenAI:**

```json
{
  "type": "function",
  "function": {
    "name": "get_weather",
    "description": "Get weather for a location",
    "parameters": {
      "type": "object",
      "properties": {
        "location": { "type": "string" }
      },
      "required": ["location"]
    },
    "strict": true
  }
}
```

**Gemini:**

```json
{
  "name": "get_weather",
  "description": "Returns current weather for a given city",
  "parameters": {
    "type": "object",
    "properties": {
      "city": { "type": "string", "description": "City name" }
    },
    "required": ["city"]
  }
}
```

**Perplexity (Agent API):**

```json
{
  "type": "function",
  "name": "get_weather",
  "description": "Get current weather for a location",
  "parameters": {
    "type": "object",
    "properties": {
      "location": { "type": "string", "description": "City name" }
    },
    "required": ["location"]
  }
}
```

### Sending Tool Results Back

**Anthropic** (new user message with `tool_result` block):

```json
{
  "role": "user",
  "content": [{ "type": "tool_result", "tool_use_id": "toolu_01...", "content": "20°C, sunny" }]
}
```

**OpenAI** (new message with role `"tool"`):

```json
{ "role": "tool", "tool_call_id": "call_abc123", "content": "{\"temperature\": 72}" }
```

**Gemini** (`functionResponse` part in user turn):

```json
{
  "role": "user",
  "parts": [
    {
      "functionResponse": {
        "id": "call_abc123",
        "name": "get_weather",
        "response": { "result": "72°F, sunny" }
      }
    }
  ]
}
```

> CRITICAL for Gemini 3: Must include the `id` from the `functionCall` in your response.

**Perplexity Agent API** (send `function_call_output` item).

### Force Tool Use

- **Anthropic:** `"tool_choice": {"type": "any"}` — must use at least one tool
- **OpenAI:** `"tool_choice": "required"`
- **Gemini:** `"function_calling_config": {"mode": "ANY"}`
- **Perplexity:** Pass the tool; model decides (no force mode in Agent API)

---

## SECTION 6: VISION — SIDE BY SIDE

### Pass an Image URL

**Anthropic:**

```json
{ "type": "image", "source": { "type": "url", "url": "https://example.com/image.jpg" } }
```

**OpenAI (Chat Completions):**

```json
{ "type": "image_url", "image_url": { "url": "https://example.com/image.jpg", "detail": "auto" } }
```

**OpenAI (Responses API):**

```json
{ "type": "input_image", "image_url": "https://example.com/image.jpg" }
```

**Gemini:**

```python
types.Part(file_data=types.FileData(file_uri="https://example.com/image.jpg", mime_type="image/jpeg"))
# OR just pass PIL Image object directly in Python SDK
```

**Perplexity (Agent API):**

```json
{ "type": "input_image", "image_url": "https://example.com/image.jpg" }
```

### Pass a Base64 Image

**Anthropic:**

```json
{ "type": "image", "source": { "type": "base64", "media_type": "image/jpeg", "data": "<base64>" } }
```

**OpenAI:**

```json
{ "type": "image_url", "image_url": { "url": "data:image/jpeg;base64,<base64>", "detail": "high" } }
```

**Gemini:**

```json
{ "inlineData": { "mimeType": "image/jpeg", "data": "<base64>" } }
```

**Perplexity:**

```json
{ "type": "input_image", "image_url": "data:image/jpeg;base64,<base64_content>" }
```

### Image Size Limits

| Provider   | Inline limit          | Per-image max        | Formats                     |
| ---------- | --------------------- | -------------------- | --------------------------- |
| Anthropic  | 5 MB/image            | 8000×8000 px         | JPEG, PNG, GIF, WebP        |
| OpenAI     | N/A                   | N/A                  | JPEG, PNG, GIF, WebP        |
| Gemini     | 20 MB (total request) | 2 GB (via Files API) | PNG, JPEG, WebP, HEIC, HEIF |
| Perplexity | 50 MB                 | —                    | PNG, JPEG, WEBP, GIF        |

---

## SECTION 7: STREAMING — SIDE BY SIDE

### Enable Streaming (Python)

**Anthropic:**

```python
with client.messages.stream(
    model="claude-opus-4-7",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Tell me a story"}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

**OpenAI (Responses API):**

```python
with client.responses.stream(
    model="gpt-5.2",
    input="Tell me a story",
) as stream:
    for event in stream:
        if event.type == "response.text.delta":
            print(event.delta, end="")
```

**OpenAI (Chat Completions):**

```python
stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Tell me a story"}],
    stream=True,
    stream_options={"include_usage": True}
)
for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

**Gemini:**

```python
response = client.models.generate_content_stream(
    model="gemini-3-flash-preview",
    contents=["Tell me a story"]
)
for chunk in response:
    print(chunk.text, end="")
```

**Perplexity:**

```python
with client.responses.stream(
    model="openai/gpt-5.4",
    input="Tell me a story",
    stream=True
) as stream:
    for event in stream:
        print(event.output_text.delta, end="")
```

### Enable Streaming (TypeScript/JavaScript)

**Anthropic:**

```typescript
const stream = client.messages
  .stream({
    model: "claude-opus-4-7",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello" }],
  })
  .on("text", (text) => {
    process.stdout.write(text);
  });
const message = await stream.finalMessage();
```

**OpenAI:**

```typescript
const stream = await client.responses.create({
  model: "gpt-5.2",
  input: "Tell me a story",
  stream: true,
});
for await (const event of stream) {
  if (event.type === "response.text.delta") process.stdout.write(event.delta);
}
```

**Gemini:**

```javascript
const response = await ai.models.generateContentStream({
  model: "gemini-3-flash-preview",
  contents: "Tell me a story",
});
for await (const chunk of response) {
  console.log(chunk.text);
}
```

### Key SSE Fields to Handle

| Provider           | Text event type                      | Finish signal                                       |
| ------------------ | ------------------------------------ | --------------------------------------------------- |
| Anthropic          | `content_block_delta` → `delta.text` | `message_stop` event                                |
| OpenAI (Responses) | `response.text.delta` → `delta`      | `response.completed` event                          |
| OpenAI (Chat)      | `choices[0].delta.content`           | `choices[0].finish_reason == "stop"`, then `[DONE]` |
| Gemini             | `chunk.text`                         | Last chunk has `finishReason: "STOP"`               |
| Perplexity         | `event.output_text.delta`            | Stream ends                                         |

---

## SECTION 8: STRUCTURED OUTPUT / JSON MODE — SIDE BY SIDE

### Force JSON with a Schema

**Anthropic** (via `output_config`):

```python
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    output_config={"format": {"type": "json_schema", "schema": {"type": "object", "properties": {"name": {"type": "string"}}}}},
    messages=[{"role": "user", "content": "Extract the name"}],
)
```

> NOTE: Prefilling with `{` in the assistant message also works for older models, but is NOT supported on Opus 4.7, Opus 4.6, Sonnet 4.6.

**OpenAI:**

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Extract the event"}],
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "CalendarEvent",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {"name": {"type": "string"}, "date": {"type": "string"}},
                "required": ["name", "date"],
                "additionalProperties": False
            }
        }
    }
)
# Python SDK parse helper (auto-validates against Pydantic model):
from pydantic import BaseModel
class Event(BaseModel):
    name: str
    date: str
completion = client.beta.chat.completions.parse(model="gpt-4o", messages=[...], response_format=Event)
event = completion.choices[0].message.parsed
```

**Gemini:**

```python
from pydantic import BaseModel
class Recipe(BaseModel):
    recipe_name: str
    ingredients: list[str]

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Give me a pasta recipe",
    config={
        "response_format": {
            "text": {"mime_type": "application/json", "schema": Recipe.model_json_schema()}
        }
    },
)
import json
recipe = json.loads(response.text)
```

**Perplexity (Agent API):**

```python
response = client.responses.create(
    model="openai/gpt-5.4",
    input="List top 3 programming languages",
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "language_list",  # REQUIRED, 1-64 alphanumeric chars
            "schema": {"type": "object", "properties": {"languages": {"type": "array", "items": {"type": "string"}}}}
        }
    }
)
```

> NOTE Perplexity: First request with a new schema incurs 10–30 second delay for schema preparation.

---

## SECTION 9: EXTENDED THINKING / REASONING — SIDE BY SIDE

### Anthropic — Extended & Adaptive Thinking

| Mode                   | Config                                        | Who supports it                                    |
| ---------------------- | --------------------------------------------- | -------------------------------------------------- |
| Adaptive (recommended) | `{"type": "adaptive"}`                        | Opus 4.7, Opus 4.6, Sonnet 4.6                     |
| Manual (budget)        | `{"type": "enabled", "budget_tokens": 10000}` | Sonnet 4.6, Haiku 4.5, Opus 4.6 (NOT Opus 4.7)     |
| Display omitted        | add `"display": "omitted"`                    | Faster TTFT; still billed for full thinking tokens |

```python
# Adaptive (Opus 4.7)
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=16000,
    thinking={"type": "adaptive"},
    messages=[{"role": "user", "content": "Solve this complex problem..."}],
)

# Manual budget (Sonnet 4.6)
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    thinking={"type": "enabled", "budget_tokens": 10000},
    messages=[{"role": "user", "content": "Complex math problem..."}],
)
for block in response.content:
    if block.type == "thinking":
        print(f"Thinking: {block.thinking}")
    elif block.type == "text":
        print(f"Answer: {block.text}")
```

### OpenAI — reasoning_effort (o-series & GPT-5)

Applicable models: `o1`, `o3`, `o4-mini`, `o1-pro`, `o3-pro`, `gpt-5`, `gpt-5.2`, `gpt-5-pro`

```python
# Responses API (recommended)
response = client.responses.create(
    model="o3",
    input="Solve step-by-step: ...",
    reasoning={"effort": "high", "summary": "detailed"}
)

# Chat Completions
response = client.chat.completions.create(
    model="o3",
    messages=[{"role": "user", "content": "..."}],
    reasoning_effort="high",
    max_completion_tokens=10000  # Use this, NOT max_tokens
)
reasoning_tokens = response.usage.output_tokens_details.reasoning_tokens
```

| reasoning_effort | Description                    |
| ---------------- | ------------------------------ |
| `"none"`         | No reasoning (gpt-5.1 default) |
| `"minimal"`      | Minimal                        |
| `"low"`          | Low                            |
| `"medium"`       | Medium (default most o-series) |
| `"high"`         | High                           |
| `"xhigh"`        | Maximum                        |

> NOTE: `stop` sequences not supported on reasoning models. Use `max_completion_tokens` not `max_tokens`.

### Gemini — thinkingConfig

```python
# Gemini 3 models: use thinkingLevel
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="What is the sum of the first 50 prime numbers?",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(
            thinking_level="high",  # minimal/low/medium/high
            include_thoughts=True
        )
    )
)
for part in response.candidates[0].content.parts:
    if part.thought:
        print("Thought:", part.text)
    else:
        print("Answer:", part.text)

# Gemini 2.5 models: use thinkingBudget
config = types.GenerateContentConfig(
    thinking_config=types.ThinkingConfig(thinking_budget=8192)  # 0 disables, -1 dynamic
)
```

> NOTE: Cannot fully disable thinking on Gemini 3.1 Pro. Thinking billed at output token rates.

### Perplexity — reasoning_effort

Available on `sonar-reasoning-pro` and via Agent API's `reasoning_effort` parameter:

```python
response = client.responses.create(
    model="sonar-reasoning-pro",  # or Agent API with reasoning model
    input="Complex analysis question...",
    reasoning_effort="high"  # "low", "medium", or "high"
)
```

---

## SECTION 10: PRICING COMPARISON TABLE

Sorted by input price ascending (standard/non-batch, per million tokens).

| Provider   | Model                          | Input $/MTok | Output $/MTok | Notes                          |
| ---------- | ------------------------------ | ------------ | ------------- | ------------------------------ |
| Gemini     | gemini-2.5-flash-lite          | $0.10        | $0.40         | Most cost-efficient multimodal |
| Gemini     | gemini-3.1-flash-lite          | $0.25        | $1.50         | Lightweight tasks              |
| OpenAI     | gpt-5.4-nano                   | $0.20        | $1.25         | Via Perplexity pricing         |
| OpenAI     | gpt-5-mini                     | $0.25        | $2.00         | Via Perplexity pricing         |
| OpenAI     | gpt-5.4-mini                   | $0.75        | $4.50         | Via Perplexity pricing         |
| Gemini     | gemini-2.5-flash               | $0.30        | $2.50         | Best Gemini price/performance  |
| Gemini     | gemini-3-flash-preview         | $0.50        | $3.00         | Fast + capable                 |
| Anthropic  | claude-haiku-4-5               | $1.00        | $5.00         | Fastest Claude                 |
| OpenAI     | gpt-5 / gpt-5.1                | $1.25        | $10.00        | Via Perplexity pricing         |
| OpenAI     | gpt-5.2                        | $1.75        | $14.00        | Via Perplexity pricing         |
| Perplexity | sonar                          | $1.00        | $1.00         | + request fees                 |
| Gemini     | gemini-2.5-pro (≤200k)         | $1.25        | $10.00        | Thinking model                 |
| OpenAI     | gpt-5.4                        | $2.50        | $15.00        | Via Perplexity pricing         |
| Perplexity | sonar-reasoning-pro            | $2.00        | $8.00         | + request fees                 |
| Perplexity | sonar-deep-research            | $2.00        | $8.00         | + search/citation fees         |
| Gemini     | gemini-3.1-pro-preview (≤200k) | $2.00        | $12.00        | Latest Gemini flagship         |
| Anthropic  | claude-sonnet-4-6              | $3.00        | $15.00        | Best Claude speed/intelligence |
| Perplexity | sonar-pro                      | $3.00        | $15.00        | + request fees                 |
| Anthropic  | claude-opus-4-7                | $5.00        | $25.00        | Best GA Claude                 |
| OpenAI     | gpt-5.5                        | $5.00        | $30.00        | Latest OpenAI flagship         |

**Batch discounts (50% off):** Available on Anthropic, OpenAI, Gemini.  
**Cache reads (90% off):** Available on Anthropic (0.1x base price).  
**Cache reads Gemini:** Varies per model; implicit caching on Gemini 2.5+.  
**OpenAI context caching:** Via `prompt_cache_retention`.

---

## SECTION 11: RATE LIMITS COMPARISON

### Anthropic Rate Limits (Token Bucket Algorithm)

| Tier   | Requirement | Opus 4.x RPM | Opus ITPM | Sonnet 4.x RPM | Sonnet ITPM | Haiku RPM | Haiku ITPM |
| ------ | ----------- | ------------ | --------- | -------------- | ----------- | --------- | ---------- |
| Tier 1 | $5 paid     | 50           | 500K      | 50             | 30K         | 50        | 50K        |
| Tier 2 | $40 paid    | 1,000        | 2M        | 1,000          | 450K        | 1,000     | 450K       |
| Tier 3 | $200 paid   | 2,000        | 5M        | 2,000          | 800K        | 2,000     | 1M         |
| Tier 4 | $400 paid   | 4,000        | 10M       | 4,000          | 2M          | 4,000     | 4M         |

NOTE: Cache read tokens do NOT count toward ITPM for most models (except Haiku 3.5).

### OpenAI Rate Limits (Usage-Based Tiers)

| Tier   | Min Spend | Notes           |
| ------ | --------- | --------------- |
| Free   | —         | Very low limits |
| Tier 1 | $5        | Moderate        |
| Tier 2 | $50       | Higher          |
| Tier 3 | $100      | Business        |
| Tier 4 | $250      | High-volume     |
| Tier 5 | $1,000+   | Enterprise      |

Check current limits at: https://platform.openai.com/account/rate-limits

### Gemini Rate Limits

| Tier   | Requirement             | Monthly cap    |
| ------ | ----------------------- | -------------- |
| Free   | Active project          | —              |
| Tier 1 | Billing linked          | $250           |
| Tier 2 | $100+ spent, 3+ days    | $2,000         |
| Tier 3 | $1,000+ spent, 30+ days | $20,000–$100K+ |

Exact RPM/TPM: Check AI Studio dashboard (not published in docs).

### Perplexity Rate Limits

| Tier     | Threshold     | Agent API QPS | Agent API RPM | Sonar RPM |
| -------- | ------------- | ------------- | ------------- | --------- |
| Tier 0   | $0            | 1             | 50            | 50        |
| Tier 1   | $50+          | 3             | 150           | 500       |
| Tier 2   | $250+         | 8             | 500           | 500       |
| Tier 3   | $500+         | 17            | 1,000         | —         |
| Tier 4–5 | $1,000–5,000+ | 33            | 2,000         | 4,000     |

Tier advancement is automatic on cumulative lifetime spend.

---

## SECTION 12: ERROR CODES — ALL PROVIDERS

### Anthropic

| HTTP | Error Type              | Description                                     |
| ---- | ----------------------- | ----------------------------------------------- |
| 400  | `invalid_request_error` | Bad format or content                           |
| 401  | `authentication_error`  | API key issue                                   |
| 402  | `billing_error`         | Payment issue                                   |
| 403  | `permission_error`      | Lacks permission                                |
| 404  | `not_found_error`       | Resource not found                              |
| 413  | `request_too_large`     | Exceeds size limit                              |
| 429  | `rate_limit_error`      | Rate limit exceeded; check `retry-after` header |
| 500  | `api_error`             | Internal error                                  |
| 504  | `timeout_error`         | Request timed out                               |
| 529  | `overloaded_error`      | Temporarily overloaded                          |

Error response shape:

```json
{
  "type": "error",
  "error": { "type": "not_found_error", "message": "..." },
  "request_id": "req_..."
}
```

### OpenAI

| HTTP | Exception                  | Description              |
| ---- | -------------------------- | ------------------------ |
| 400  | `BadRequestError`          | Invalid parameters       |
| 401  | `AuthenticationError`      | Bad/missing API key      |
| 403  | `PermissionDeniedError`    | Insufficient permissions |
| 404  | `NotFoundError`            | Resource doesn't exist   |
| 409  | `ConflictError`            | State conflict           |
| 422  | `UnprocessableEntityError` | Semantically incorrect   |
| 429  | `RateLimitError`           | Rate exceeded            |
| 5xx  | `InternalServerError`      | Server error             |
| N/A  | `APIConnectionError`       | Network failure          |
| N/A  | `APITimeoutError`          | Request timed out        |

Error response shape:

```json
{
  "error": {
    "message": "...",
    "type": "invalid_request_error",
    "param": "model",
    "code": "model_not_found"
  }
}
```

### Gemini

| `finishReason` | Meaning                  |
| -------------- | ------------------------ |
| `STOP`         | Natural completion       |
| `MAX_TOKENS`   | Hit output limit         |
| `SAFETY`       | Blocked by safety filter |
| `RECITATION`   | Blocked for recitation   |
| `OTHER`        | Unknown                  |

`promptFeedback.blockReason`: `SAFETY` · `OTHER` · `BLOCKLIST` · `PROHIBITED_CONTENT` · `IMAGE_SAFETY`

HTTP errors follow standard Google API error format with `status` and `message` fields.

### Perplexity

| HTTP | Error                | Description         |
| ---- | -------------------- | ------------------- |
| 429  | `RateLimitError`     | Rate limit exceeded |
| N/A  | `APIConnectionError` | Network issues      |
| N/A  | `APIStatusError`     | Other API errors    |

---

## SECTION 13: SDK INSTALLATION QUICK REF

### Python

```bash
pip install anthropic                    # Anthropic
pip install openai                       # OpenAI
pip install -q -U google-genai          # Gemini
pip install perplexityai                 # Perplexity (official)
```

### Node.js / TypeScript

```bash
npm install @anthropic-ai/sdk            # Anthropic
npm install openai                       # OpenAI
npm install @google/genai               # Gemini
npm install @perplexity-ai/perplexity_ai # Perplexity (official)
```

### Minimum Runtime Requirements

| SDK        | Python | Node.js                   |
| ---------- | ------ | ------------------------- |
| Anthropic  | 3.9+   | 20+ (TypeScript 4.9+)     |
| OpenAI     | 3.9+   | 20 LTS+ (TypeScript 4.9+) |
| Gemini     | 3.9+   | 18+                       |
| Perplexity | —      | —                         |

### OpenAI SDK Compatibility (Perplexity)

Both Perplexity's Sonar API and Agent API are compatible with the OpenAI SDK:

```python
from openai import OpenAI
client = OpenAI(api_key="YOUR_PERPLEXITY_KEY", base_url="https://api.perplexity.ai/v1")
# Use client.responses.create() for Agent API, client.chat.completions.create() for Sonar
```

### Basic Client Initialization

**Anthropic (Python):**

```python
import anthropic
client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY
```

**OpenAI (Python):**

```python
from openai import OpenAI
client = OpenAI()  # reads OPENAI_API_KEY
```

**Gemini (Python):**

```python
from google import genai
client = genai.Client()  # reads GEMINI_API_KEY
```

**Perplexity (Python):**

```python
from perplexityai import Perplexity
client = Perplexity()  # reads PERPLEXITY_API_KEY
```

---

## SECTION 14: BEST MODEL FOR THE JOB

### Best for Complex Coding / Agentic Tasks

1. **Anthropic `claude-opus-4-7`** — 87.6% SWE-bench Verified, best GA agentic model
2. **OpenAI `gpt-5.1-codex` / `gpt-5.3-chat-latest`** — Codex specialist for agentic coding
3. **Gemini `gemini-3.1-pro-preview`** — Strong coding with code execution built-in

### Best for Deep Reasoning / Math

1. **OpenAI `o3` / `o4-mini`** — Purpose-built reasoning with `reasoning_effort` control
2. **Anthropic `claude-sonnet-4-6`** with `thinking: {type: "enabled", budget_tokens: 32000}`
3. **Gemini `gemini-3.1-pro-preview`** with `thinkingLevel: "high"`

### Best for Speed (Lowest Latency)

1. **Anthropic `claude-haiku-4-5`** — Fastest Claude, cheapest, near-frontier
2. **Gemini `gemini-3.1-flash-lite`** — Best Gemini speed/cost ratio
3. **Gemini `gemini-2.5-flash-lite`** — Most cost-efficient multimodal

### Best for Cost (Cheapest per Token)

1. **Gemini `gemini-2.5-flash-lite`** — $0.10/$0.40 per MTok
2. **Gemini `gemini-3.1-flash-lite`** — $0.25/$1.50 per MTok
3. **OpenAI `gpt-5.4-nano`** — $0.20/$1.25 per MTok (via Perplexity pricing)

### Best for Vision / Image Analysis

1. **Anthropic `claude-opus-4-7`** — High-resolution vision (4,784 tokens max), 600 images/request
2. **Gemini `gemini-3.1-pro-preview`** — Native video + audio + image + PDF
3. **OpenAI `gpt-4o` / `gpt-5`** — Strong vision with `detail: "high"` option

### Best for Real-Time Web Search + AI Answer

1. **Perplexity `sonar-pro`** — Purpose-built web-grounded AI with citations
2. **Perplexity Agent API** with `web_search` tool and `preset="pro-search"`
3. **Gemini** with `google_search` grounding

### Best for Real-Time Voice / Audio

1. **OpenAI `gpt-realtime`** — WebSocket, low-latency, voice I/O
2. **Gemini Live API** — WebSocket, 70 languages, barge-in support

### Best for Multi-Provider Access / Model Fallback

1. **Perplexity Agent API** — Access OpenAI, Anthropic, Google, xAI, NVIDIA from one endpoint; no markup; up to 5-model fallback chain

### Best for Image Generation

1. **OpenAI `gpt-image-2`** or **`dall-e-3`** — High quality, flexible sizes
2. **Gemini `imagen-4-ultra`** — Highest quality Gemini images
3. **Gemini `gemini-3-pro-image-preview`** — Professional image editing with thinking

### Best for Long Documents / Large Context

1. **Anthropic `claude-opus-4-7`** or **`claude-sonnet-4-6`** — 1M token context
2. **Gemini `gemini-3.1-pro-preview`** — 1M context, native video/audio, PDF text free
3. **OpenAI** (check current context limits for GPT-5 series)

### Best for Research Reports

1. **Perplexity `sonar-deep-research`** — Exhaustive multi-source, async mode
2. **Perplexity Agent API** `preset="deep-research"` — GPT-5.2, 10 steps
3. **OpenAI `o3-deep-research`** (Responses API only)

---

## SECTION 15: PROVIDER-SPECIFIC GOTCHAS

### Anthropic Gotchas

1. **`anthropic-version: 2023-06-01` is REQUIRED on every request** — missing this header causes errors.

2. **Opus 4.7 does NOT support manual extended thinking** (`budget_tokens`) — use `{"type": "adaptive"}` instead. Passing `type: "enabled"` returns 400.

3. **Prefilling assistant messages NOT supported on Opus 4.7, Opus 4.6, Sonnet 4.6** — returns 400 `invalid_request_error`. Use `output_config.format` for structured outputs instead.

4. **Opus 4.7 tokenizer**: Uses up to 35% more tokens than prior models for the same text. Budget accordingly.

5. **Cache minimum tokens**: 4,096 tokens required for Opus 4.7/4.6, only 1,024 for Sonnet 4.6. Below minimum = not cached (no error, just no cache).

6. **`input_tokens` in response is NOT total input** — it's tokens AFTER the last cache breakpoint. Total = `cache_read_input_tokens + cache_creation_input_tokens + input_tokens`.

7. **Thinking tokens billed at full rate, not summary rate** — if you use `display: "summarized"`, you still pay for full thinking tokens even though the response shows a summary.

8. **Beta headers must be comma-separated in single `anthropic-beta` header**: `"files-api-2025-04-14,computer-use-2025-11-24"`.

9. **Files API NOT available on Amazon Bedrock or Vertex AI** — only direct API, AWS Claude Platform, Microsoft Foundry.

10. **Deprecated June 15, 2026**: `claude-sonnet-4-20250514`, `claude-opus-4-20250514` — migrate now.

11. **`inference_geo` returns 400 on pre-Opus 4.6 / pre-Sonnet 4.6 models** — only Opus 4.6+, Opus 4.7+, Sonnet 4.6+ support this parameter.

12. **Fast mode has its own rate limit pool** — separate from standard Opus limits; response headers use `anthropic-fast-*` prefix.

---

### OpenAI Gotchas

1. **Reasoning models**: Use `max_completion_tokens` NOT `max_tokens`. `stop` sequences are not supported on o-series.

2. **`tool_calls` arguments is a JSON STRING** — must `JSON.parse()` / `json.loads()` to use. Don't try to access properties directly.

3. **Responses API vs Chat Completions**: Responses API is the new standard. It uses `input` + `instructions` (not `messages`). Chat Completions uses `messages`. They are different endpoints with different response shapes.

4. **`developer` role replaces `system`** in newer models. `system` still works but `developer` is the modern convention.

5. **Parallel tool calls**: If model returns multiple tool calls, submit ALL results in one request before getting the next model response.

6. **`user` field is deprecated** — use `safety_identifier` for abuse detection and `prompt_cache_key` for caching.

7. **GPT-5 Pro, GPT-5 Codex, o3-pro, o3 Deep Research**: Responses API only, not available in Chat Completions.

8. **Batch API limit**: 50,000 requests per batch, 200 MB file size max.

9. **`include_usage: true` in stream_options**: Required to get token counts in streaming mode for Chat Completions.

10. **Azure OpenAI**: Use `AzureOpenAI` class with `api_version` and `azure_endpoint` — different setup from standard OpenAI.

---

### Gemini Gotchas

1. **Cannot disable thinking on Gemini 3.1 Pro** — even `thinkingLevel: "minimal"` doesn't guarantee thinking is off. Budget for thinking tokens.

1a. **`thinkingBudget` is deprecated for Gemini 3 models** — use `thinkingLevel` instead. `thinkingBudget` ranges: Flash `0–24576`, Pro `128–32768` (NOT `1–24576`). Passing `thinkingBudget` on Gemini 3 Pro may cause unexpected performance.

2. **Gemini 3 function calling: MUST include `id` in functionResponse** matching the `id` from the `functionCall` response. Missing this breaks multi-turn tool conversations.

3. **Temperature default 1.0 is STRONGLY recommended for Gemini 3 models** — don't change temperature when using function calling/tools.

4. **Files have a 48-hour TTL** — files auto-delete. Re-upload or use context caching for persistent content.

5. **Gemini 2.0 models shut down June 1, 2026** — migrate to 2.5 or 3 series immediately.

6. **PDF native text is FREE on Gemini 3** — not charged for tokens from extracted native PDF text.

7. **Auth header is `x-goog-api-key`** NOT `Authorization: Bearer` — this is different from all other providers.

8. **Streaming endpoint is separate** (`:streamGenerateContent`) — add `?alt=sse` for SSE format. Not the same URL as `:generateContent`.

9. **Files API: no download** — you can only get file metadata, not download content back.

10. **Google Search grounding**: 5,000 free prompts/month, then $14 per 1,000 queries. Structured output (`responseSchema`) and grounding cannot be used simultaneously.

11. **Implicit caching** is automatic on Gemini 2.5+ — you don't need to do anything, but you're also charged for storage even if you didn't set up explicit caching.

---

### Perplexity Gotchas

1. **API key shown ONCE at creation** (since April 2026) — store it immediately; cannot be retrieved after.

2. **Sonar API uses OpenAI-style `/chat/completions` with `messages[]`; Agent API uses `/v1/agent` with `input` + `instructions`** — they're different endpoints with different request shapes.

3. **`citations` field is deprecated** (May 2025) — use `search_results` field instead for source URLs.

4. **Structured outputs first-request delay**: 10–30 seconds for new schema preparation. Subsequent requests are fast.

5. **Links in JSON structured outputs are unreliable** — always use the `search_results` field in the response for URLs, don't ask the model to include URLs in JSON.

6. **Model IDs use `provider/model-name` format in Agent API** (e.g., `"openai/gpt-5.4"`) — Sonar API uses plain model IDs (e.g., `"sonar-pro"`).

7. **`models` array (plural) overrides `model` (singular)** when both provided in Agent API. Models listed first are tried first.

8. **Custom function `arguments` field is a JSON string** — must call `json.loads()` / `JSON.parse()` before accessing.

9. **`sonar-reasoning` (non-pro) was deprecated December 2025** — use `sonar-reasoning-pro`.

10. **`GET /v1/models` requires no authentication** — useful for checking current available models programmatically.

11. **Tier advancement is based on cumulative lifetime spend**, not current balance. Can't "downgrade" by depleting funds.

12. **Agent API has Cache Read Pricing** — check the models table in `perplexity.md` §4.2; Anthropic/OpenAI models have a cache read column that reduces repeated-prompt costs significantly.

---

## QUICK LOOKUP CHEAT SHEET

### I need to call the API right now — minimum required fields

**Anthropic:**

```python
import anthropic
client = anthropic.Anthropic()  # ANTHROPIC_API_KEY
msg = client.messages.create(model="claude-opus-4-7", max_tokens=1024, messages=[{"role":"user","content":"Hi"}])
print(msg.content[0].text)
```

**OpenAI:**

```python
from openai import OpenAI
client = OpenAI()  # OPENAI_API_KEY
r = client.responses.create(model="gpt-5.2", input="Hi")
print(r.output_text)
```

**Gemini:**

```python
from google import genai
client = genai.Client()  # GEMINI_API_KEY
r = client.models.generate_content(model="gemini-3-flash-preview", contents="Hi")
print(r.text)
```

**Perplexity:**

```python
from perplexityai import Perplexity
client = Perplexity()  # PERPLEXITY_API_KEY
r = client.responses.create(model="sonar-pro", input="Hi")
print(r.output_text)
```

---

_Source files: anthropic.md, openai.md, gemini.md, perplexity.md — Compiled May 2026_
_For full specs, open the individual provider files listed in the HOW TO USE section above._
