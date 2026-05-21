# Gemini API — Comprehensive Reference (May 2026)

# UPDATED — 2026-05-20: Added gemini-3.5-flash + Gemini Omni Flash (both announced Google I/O May 19, 2026). Omni Flash = multimodal-input video generation with physics reasoning, SynthID watermarking; API coming weeks. 3.5 Flash = text/reasoning model beating 3.1 Pro on coding, 4× faster, ~40% cheaper.

# UPDATED — 2026-05-18: thinkingBudget ranges corrected (Pro: 128–32768, Flash: 0–24576), Gemini 3 Flash Preview pricing added, Lyria pricing added, TTS language count corrected (80+), OpenAI compat table corrected, earlier gemini-3-pro-preview shutdown noted.

> Sourced directly from ai.google.dev documentation. All model IDs, parameters, and limits are verified from official pages.

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [SDK Installation & Initialization](#2-sdk-installation--initialization)
3. [Model Catalog](#3-model-catalog)
4. [Pricing](#4-pricing)
5. [Rate Limits](#5-rate-limits)
6. [generateContent API — Full Spec](#6-generatecontent-api--full-spec)
7. [Streaming](#7-streaming)
8. [Multi-Turn Conversations (Chat)](#8-multi-turn-conversations-chat)
9. [System Instructions](#9-system-instructions)
10. [Thinking Mode](#10-thinking-mode)
11. [Vision (Image Input)](#11-vision-image-input)
12. [Video Input](#12-video-input)
13. [Audio Input](#13-audio-input)
14. [Document Processing (PDF)](#14-document-processing-pdf)
15. [Files API](#15-files-api)
16. [Function Calling / Tool Use](#16-function-calling--tool-use)
17. [Structured Output (JSON Mode)](#17-structured-output-json-mode)
18. [Grounding with Google Search](#18-grounding-with-google-search)
19. [URL Context](#19-url-context)
20. [Code Execution](#20-code-execution)
21. [Context Caching](#21-context-caching)
22. [Embeddings](#22-embeddings)
23. [Image Generation](#23-image-generation)
24. [Text-to-Speech (TTS)](#24-text-to-speech-tts)
25. [Live API (Real-Time Multimodal)](#25-live-api-real-time-multimodal)
26. [Safety Settings](#26-safety-settings)
27. [Token Counting](#27-token-counting)
28. [Long Context](#28-long-context)
29. [Batch API](#29-batch-api)
30. [Model Tuning / Fine-Tuning](#30-model-tuning--fine-tuning)
31. [OpenAI Compatibility Layer](#31-openai-compatibility-layer)
32. [Vertex AI / Enterprise Platform](#32-vertex-ai--enterprise-platform)

---

## 1. Authentication

### API Key (Developer API)

All Gemini Developer API requests use an API key. Get one at: https://aistudio.google.com/app/apikey

**REST header format:**

```
x-goog-api-key: $GEMINI_API_KEY
```

**Environment variable (auto-detected by all SDKs):**

```bash
export GEMINI_API_KEY="your-key-here"
```

**Python — explicit key:**

```python
client = genai.Client(api_key="YOUR_KEY")
```

**JavaScript — explicit key:**

```javascript
const ai = new GoogleGenAI({ apiKey: "YOUR_KEY" });
```

When `GEMINI_API_KEY` is set as an environment variable, the client auto-detects it:

```python
client = genai.Client()  # uses GEMINI_API_KEY env var
```

```javascript
const ai = new GoogleGenAI({}); // uses GEMINI_API_KEY env var
```

### OAuth / Service Accounts (Enterprise Only)

The Enterprise Agent Platform (Vertex AI backend) uses Google Cloud service accounts:

```python
# Enterprise / Vertex AI
client = genai.Client(vertexai=True, project='your-project-id', location='us-central1')
```

OAuth authentication details are in the Vertex AI documentation, not the Developer API.

---

## 2. SDK Installation & Initialization

### Python

**Requirements:** Python 3.9+

```bash
pip install -q -U google-genai
```

```python
from google import genai
from google.genai import types

client = genai.Client()  # or genai.Client(api_key="...")
```

### JavaScript / TypeScript

**Requirements:** Node.js v18+

```bash
npm install @google/genai
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({}); // uses GEMINI_API_KEY env var
```

### REST (cURL)

Base URL: `https://generativelanguage.googleapis.com/v1beta/`

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"contents": [{"parts": [{"text": "Hello"}]}]}'
```

---

## 3. Model Catalog

> Note: Fine-tuning is not available in the public Gemini API (as of May 2026).

### Gemini 3.5 Series (Newest — May 2026)

#### Gemini 3.5 Flash ⚠️ JUST ANNOUNCED — May 19, 2026 (Google I/O)

| Property           | Value                                                                            |
| ------------------ | -------------------------------------------------------------------------------- |
| **Model ID**       | `gemini-3.5-flash` _(exact API ID pending GA docs — verify in Google AI Studio)_ |
| Input token limit  | TBD (likely 1M)                                                                  |
| Output token limit | TBD                                                                              |
| Input types        | Text, Image, Video, Audio, PDF                                                   |
| Output types       | Text                                                                             |
| Knowledge cutoff   | TBD                                                                              |
| Thinking           | Yes                                                                              |
| Terminal-Bench     | 76.2% (beats Gemini 3.1 Pro)                                                     |
| MCP Atlas          | 83.6%                                                                            |
| Speed              | ~4× faster than Gemini 3.1 Pro                                                   |
| Price vs 3.1 Pro   | ~40% cheaper                                                                     |
| Availability       | Google AI Studio (now), API GA rollout in progress                               |

> **Note:** Exact API ID, pricing, and full context window confirmed once docs hit ai.google.dev. Use `gemini-3.5-flash` as the expected model ID. Currently available in Google AI Studio preview.

---

### Gemini 3 Series (Current Generation)

#### Gemini 3.1 Pro Preview

| Property                | Value                                |
| ----------------------- | ------------------------------------ |
| **Model ID**            | `gemini-3.1-pro-preview`             |
| **Variant (agentic)**   | `gemini-3.1-pro-preview-customtools` |
| Input token limit       | 1,048,576                            |
| Output token limit      | 65,536                               |
| Input types             | Text, Image, Video, Audio, PDF       |
| Output types            | Text                                 |
| Knowledge cutoff        | January 2025                         |
| Updated                 | February 2026                        |
| Thinking                | Yes                                  |
| Grounding               | Yes (Google Search + Maps)           |
| Code execution          | Yes                                  |
| Function calling        | Yes                                  |
| Structured output       | Yes                                  |
| Caching                 | Yes (min 4,096 tokens)               |
| Batch API               | Yes                                  |
| Flex/Priority inference | Yes                                  |
| URL context             | Yes                                  |
| File search             | Yes                                  |
| Live API                | No                                   |
| Image generation        | No                                   |
| Audio generation        | No                                   |

**Note:** The `customtools` variant supports agentic workflows combining bash + custom tools but "may see quality fluctuations in some use cases."

#### Gemini 3 Flash Preview

> Note: An earlier model also called `Gemini 3 Pro Preview` (distinct from `gemini-3.1-pro-preview`) was shut down March 9, 2026 per the deprecations page. `gemini-3.1-pro-preview` is the current active successor.

| Property                | Value                          |
| ----------------------- | ------------------------------ |
| **Model ID**            | `gemini-3-flash-preview`       |
| Input token limit       | 1,048,576                      |
| Output token limit      | 65,536                         |
| Input types             | Text, Image, Video, Audio, PDF |
| Output types            | Text                           |
| Knowledge cutoff        | January 2025                   |
| Updated                 | December 2025                  |
| Thinking                | Yes (default: high)            |
| Grounding               | Yes (Google Search + Maps)     |
| Code execution          | Yes                            |
| Computer use            | Yes                            |
| Function calling        | Yes                            |
| Structured output       | Yes                            |
| Caching                 | Yes (min 1,024 tokens)         |
| Batch API               | Yes                            |
| Flex/Priority inference | Yes                            |
| URL context             | Yes                            |
| File search             | Yes                            |
| Live API                | No                             |
| Image generation        | No                             |
| Audio generation        | No                             |

#### Gemini 3.1 Flash-Lite

| Property                | Value                          |
| ----------------------- | ------------------------------ |
| **Model ID**            | `gemini-3.1-flash-lite`        |
| Input token limit       | 1,048,576                      |
| Output token limit      | 65,536                         |
| Input types             | Text, Image, Video, Audio, PDF |
| Output types            | Text                           |
| Knowledge cutoff        | January 2025                   |
| Updated                 | May 2026                       |
| Thinking                | Yes                            |
| Grounding               | Yes (Google Search + Maps)     |
| Code execution          | Yes                            |
| Function calling        | Yes                            |
| Structured output       | Yes                            |
| Caching                 | Yes (min 1,024 tokens)         |
| Batch API               | Yes                            |
| Flex/Priority inference | Yes                            |
| URL context             | Yes                            |
| File search             | Yes                            |
| Live API                | No                             |
| Image generation        | No                             |
| Audio generation        | No                             |
| Computer use            | No                             |

**Use case:** High-frequency lightweight tasks — translation, transcription, data extraction, document processing at scale.

#### Gemini 3.1 Flash Image Preview (Image Generation)

| Property           | Value                            |
| ------------------ | -------------------------------- |
| **Model ID**       | `gemini-3.1-flash-image-preview` |
| Input token limit  | 131,072                          |
| Output token limit | 32,768                           |
| Input types        | Text, Image                      |
| Output types       | Text, Image                      |
| Knowledge cutoff   | January 2025                     |
| Updated            | February 2026                    |
| Image generation   | Yes                              |
| Thinking           | Yes                              |
| Grounding          | Yes (Google Search)              |
| Batch API          | Yes                              |
| Caching            | No                               |
| Code execution     | No                               |
| Function calling   | No                               |
| Structured output  | No                               |
| Live API           | No                               |
| URL context        | No                               |

**Unique features:** Resolutions 0.5K/1K/2K/4K; aspect ratios including ultra-wide 1:4, 4:1, 1:8, 8:1.

#### Gemini 3 Pro Image Preview (Image Generation)

| Property                | Value                        |
| ----------------------- | ---------------------------- |
| **Model ID**            | `gemini-3-pro-image-preview` |
| Input token limit       | 65,536                       |
| Output token limit      | 32,768                       |
| Input types             | Text, Image                  |
| Output types            | Text, Image                  |
| Knowledge cutoff        | January 2025                 |
| Updated                 | November 2025                |
| Image generation        | Yes                          |
| Thinking                | Yes                          |
| Grounding               | Yes (Google Search)          |
| Structured output       | Yes                          |
| Batch API               | Yes                          |
| Flex/Priority inference | Yes                          |
| Caching                 | No                           |
| Code execution          | No                           |
| Function calling        | No                           |
| Live API                | No                           |

**Use case:** Professional-grade image editing, complex graphic design, product mockups, accurate text rendering.

#### Gemini 3.1 Flash TTS Preview (Text-to-Speech)

| Property     | Value                                                                    |
| ------------ | ------------------------------------------------------------------------ |
| **Model ID** | `gemini-3.1-flash-tts-preview` (inferred; see TTS section for exact IDs) |
| Output       | Audio (PCM 24kHz)                                                        |
| Context      | 32,768 tokens max                                                        |
| Voices       | 30 voices                                                                |
| Languages    | 80+                                                                      |

#### Gemini 3.1 Flash Live Preview (Live API)

| Property     | Value                                        |
| ------------ | -------------------------------------------- |
| **Model ID** | `gemini-3.1-flash-live-preview` (inferred)   |
| Purpose      | Real-time voice/multimodal dialogue          |
| Input        | Audio (PCM 16kHz), Images (JPEG ≤1FPS), Text |
| Output       | Audio (PCM 24kHz)                            |
| Languages    | 70                                           |

---

### Gemini 2.5 Series

#### Gemini 2.5 Pro

| Property               | Value                          |
| ---------------------- | ------------------------------ |
| **Model ID**           | `gemini-2.5-pro`               |
| Input token limit      | 1,048,576                      |
| Output token limit     | 65,536                         |
| Input types            | Text, Image, Video, Audio, PDF |
| Output types           | Text                           |
| Knowledge cutoff       | January 2025                   |
| Updated                | June 2025                      |
| Thinking               | Yes (min 4,096 tokens)         |
| Grounding              | Yes (Google Search + Maps)     |
| Code execution         | Yes                            |
| Function calling       | Yes                            |
| Structured output      | Yes                            |
| Caching                | Yes                            |
| Batch API              | Yes                            |
| Flex/Priority          | Yes                            |
| URL context            | Yes                            |
| File search            | Yes                            |
| Live API               | No                             |
| Image/Audio generation | No                             |

#### Gemini 2.5 Flash

| Property               | Value                              |
| ---------------------- | ---------------------------------- |
| **Model ID**           | `gemini-2.5-flash`                 |
| **Deprecated alias**   | `gemini-2.5-flash-preview-09-2025` |
| Input token limit      | 1,048,576                          |
| Output token limit     | 65,536                             |
| Input types            | Text, Image, Video, Audio          |
| Output types           | Text                               |
| Knowledge cutoff       | January 2025                       |
| Updated                | June 2025                          |
| Thinking               | Yes (min 1,024 tokens)             |
| Grounding              | Yes (Google Search + Maps)         |
| Code execution         | Yes                                |
| Function calling       | Yes                                |
| Structured output      | Yes                                |
| Caching                | Yes                                |
| Batch API              | Yes                                |
| Flex/Priority          | Yes                                |
| URL context            | Yes                                |
| File search            | Yes                                |
| Live API               | No                                 |
| Image/Audio generation | No                                 |

**Note:** Described as "best model in terms of price-performance" for large-scale processing, low-latency, high-volume tasks.

#### Gemini 2.5 Flash-Lite

| Property               | Value                          |
| ---------------------- | ------------------------------ |
| **Model ID**           | `gemini-2.5-flash-lite`        |
| Input token limit      | 1,048,576                      |
| Output token limit     | 65,536                         |
| Input types            | Text, Image, Video, Audio, PDF |
| Output types           | Text                           |
| Knowledge cutoff       | January 2025                   |
| Updated                | July 2025                      |
| Thinking               | Yes                            |
| Grounding              | Yes (Google Search + Maps)     |
| Code execution         | Yes                            |
| Function calling       | Yes                            |
| Structured output      | Yes                            |
| Caching                | Yes                            |
| Batch API              | Yes                            |
| Flex/Priority          | Yes                            |
| URL context            | Yes                            |
| File search            | Yes                            |
| Live API               | No                             |
| Image/Audio generation | No                             |

**Use case:** "Most cost-efficient multimodal model" — classification, data extraction, low-latency applications.

---

### Embedding Models

#### Gemini Embedding 2

| Property          | Value                                      |
| ----------------- | ------------------------------------------ |
| **Model ID**      | `gemini-embedding-2`                       |
| Input token limit | 8,192                                      |
| Output dimensions | 128–3,072 (recommended: 768, 1,536, 3,072) |
| Input types       | Text, Image, Video, Audio, PDF             |
| Auto-normalizes   | Yes (truncated dimensions auto-normalized) |
| Updated           | April 2026                                 |

#### Gemini Embedding 001

| Property          | Value                                      |
| ----------------- | ------------------------------------------ |
| **Model ID**      | `gemini-embedding-001`                     |
| Input token limit | 2,048                                      |
| Output dimensions | 128–3,072 (recommended: 768, 1,536, 3,072) |
| Input types       | Text only                                  |
| Updated           | June 2025                                  |

---

### Generative Media Models

| Model                  | Model ID                                  | Purpose                                                                                                                                                                      |
| ---------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gemini Omni Flash      | `gemini-omni-flash` _(API ID pending GA)_ | ⚠️ NEW May 19 2026 — Multimodal input (image/audio/video/text) → video output, physics reasoning, SynthID watermark, multi-turn editing. Consumer live; dev API coming weeks |
| Imagen 4               | `imagen-4`                                | Text-to-image up to 2K                                                                                                                                                       |
| Imagen 4 Ultra         | `imagen-4-ultra`                          | Highest quality image generation                                                                                                                                             |
| Gemini 2.5 Flash Image | `gemini-2.5-flash-image`                  | High-speed image generation                                                                                                                                                  |
| Veo 3.1                | `veo-3.1-generate-preview`                | Video generation with native audio                                                                                                                                           |
| Lyria 3 Pro            | `lyria-3-pro`                             | Full-length song generation                                                                                                                                                  |
| Lyria 3 Clip           | `lyria-3-clip`                            | Short audio clips (≤30s)                                                                                                                                                     |

---

### Specialized Models

| Model                                      | Purpose                    |
| ------------------------------------------ | -------------------------- |
| Gemini Deep Research                       | Multi-step research agent  |
| Computer Use (Preview)                     | UI automation              |
| Gemini Robotics-ER 1.6                     | Embodied reasoning         |
| Gemini 2.5 Flash Live Native Audio Preview | Live API with native audio |

---

## 4. Pricing

All prices are per 1 million tokens (MTok) unless otherwise noted. Paid tier only — free tier has no per-token charge.

### Text / Multimodal Models

#### Gemini 3.1 Flash-Lite

| Tier     | Input (text/image/video) | Input (audio) | Output |
| -------- | ------------------------ | ------------- | ------ |
| Standard | $0.25                    | $0.50         | $1.50  |
| Batch    | $0.125                   | $0.25         | $0.75  |
| Flex     | $0.125                   | $0.25         | $0.75  |
| Priority | $0.45                    | $0.90         | $2.70  |

#### Gemini 3.1 Pro Preview

| Tier     | Input (≤200k tokens) | Output (≤200k) | Input (>200k) | Output (>200k) |
| -------- | -------------------- | -------------- | ------------- | -------------- |
| Standard | $2.00                | $12.00         | $4.00         | $18.00         |
| Batch    | $1.00                | $6.00          | $2.00         | $9.00          |
| Flex     | $1.00                | $6.00          | $2.00         | $9.00          |
| Priority | $3.60                | $21.60         | $7.20         | $32.40         |

#### Gemini 2.5 Pro

| Tier     | Input (≤200k) | Output (≤200k) | Input (>200k) | Output (>200k) |
| -------- | ------------- | -------------- | ------------- | -------------- |
| Standard | $1.25         | $10.00         | $2.50         | $15.00         |
| Batch    | $0.625        | $5.00          | $1.25         | $7.50          |
| Flex     | $0.625        | $5.00          | $1.25         | $7.50          |
| Priority | $2.25         | $18.00         | $4.50         | $27.00         |

#### Gemini 2.5 Flash

| Tier     | Input (text/image/video) | Input (audio) | Output |
| -------- | ------------------------ | ------------- | ------ |
| Standard | $0.30                    | $1.00         | $2.50  |
| Batch    | $0.15                    | $0.50         | $1.25  |
| Flex     | $0.15                    | $0.50         | $1.25  |
| Priority | $0.54                    | $1.80         | $4.50  |

#### Gemini 3 Flash Preview

| Tier     | Input (text/image/video) | Input (audio) | Output |
| -------- | ------------------------ | ------------- | ------ |
| Standard | $0.50                    | $1.00         | $3.00  |

(Free tier pricing: see Free Tier section. Batch pricing not confirmed on live docs as of May 2026.)

#### Gemini 2.5 Flash-Lite

| Tier     | Input (text/image/video) | Input (audio) | Output |
| -------- | ------------------------ | ------------- | ------ |
| Standard | $0.10                    | $0.30         | $0.40  |
| Batch    | $0.05                    | $0.15         | $0.20  |
| Flex     | $0.05                    | $0.15         | $0.20  |
| Priority | $0.18                    | $0.54         | $0.72  |

### Context Caching Pricing

| Model                  | Cached Input (per 1M tokens) | Storage (per 1M tokens/hour) |
| ---------------------- | ---------------------------- | ---------------------------- |
| Gemini 3.1 Pro Preview | $0.20–$0.40 (≤/> 200k)       | $4.50                        |
| Most other models      | $0.025–$0.45                 | $1.00                        |

### Image Generation Pricing

| Model                  | Price                     |
| ---------------------- | ------------------------- |
| Imagen 4               | $0.02–$0.06 per image     |
| Gemini 2.5 Flash Image | $0.0195–$0.0702 per image |

### Video Generation Pricing

| Model   | Price                                            |
| ------- | ------------------------------------------------ |
| Veo 3.1 | $0.05–$0.60 per second (varies by quality/speed) |

### Music Generation Pricing

| Model                | Price                 |
| -------------------- | --------------------- |
| Lyria 3 Clip Preview | $0.04 per song (≤30s) |
| Lyria 3 Pro Preview  | $0.08 per song        |

### Embeddings

| Type   | Price per 1M tokens |
| ------ | ------------------- |
| Text   | $0.20               |
| Images | $0.45               |

### Tools Pricing

| Tool                               | Pricing                                                  |
| ---------------------------------- | -------------------------------------------------------- |
| Google Search grounding (Gemini 3) | 5,000 prompts/month free, then $14/1,000 queries         |
| Google Maps grounding (Gemini 3)   | 5,000 prompts/month free, then $14/1,000 queries         |
| Code execution                     | No additional charge                                     |
| URL context                        | Counts toward input tokens (tool_use_prompt_token_count) |

### Batch API Discount

Standard 50% reduction vs. standard pricing on supported models.

### Thinking Tokens Billing

"Response pricing is the sum of output tokens and thinking tokens." Thinking tokens are billed at the output token rate even though only summaries are visible.

### Free Tier

Available models: Gemini 3.1 Flash-Lite, Gemini 3 Flash Preview, Gemini 2.5 Flash, Gemini 2.5 Flash-Lite.

- Input: Free
- Output: Free
- Context caching: Not available
- Data used to improve products: Yes

---

## 5. Rate Limits

Rate limits are measured across three dimensions:

- **RPM** — Requests per minute
- **TPM** — Input tokens per minute
- **RPD** — Requests per day

### Usage Tiers

| Tier   | Requirement                 | Monthly cap       |
| ------ | --------------------------- | ----------------- |
| Free   | Active project (no billing) | —                 |
| Tier 1 | Billing linked              | $250              |
| Tier 2 | $100+ spent + 3+ days       | $2,000            |
| Tier 3 | $1,000+ spent + 30+ days    | $20,000–$100,000+ |

**Exact RPM/TPM/RPD limits:** Vary by model and tier. Check the AI Studio dashboard at https://aistudio.google.com for current limits. The documentation does not publish a fixed table.

### Batch API Limits

| Limit                     | Value                                                                         |
| ------------------------- | ----------------------------------------------------------------------------- |
| Concurrent batch requests | 100                                                                           |
| Input file size           | 2 GB                                                                          |
| Storage                   | 20 GB                                                                         |
| Enqueued tokens           | Tier-dependent (e.g., Gemini 2.0 Flash: 10M tokens Tier 1 → 5B tokens Tier 3) |

### Priority Inference

Default rate limits for priority tier: 0.3× the standard rate limit for each model and tier.

---

## 6. generateContent API — Full Spec

### Endpoints

```
POST https://generativelanguage.googleapis.com/v1beta/{model=models/*}:generateContent
POST https://generativelanguage.googleapis.com/v1beta/{model=models/*}:streamGenerateContent
```

**Example:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent`

For streaming, append `?alt=sse` to the streamGenerateContent URL.

### Path Parameters

| Parameter | Type   | Required | Description                                                   |
| --------- | ------ | -------- | ------------------------------------------------------------- |
| `model`   | string | Yes      | Format: `models/{model}` e.g. `models/gemini-3-flash-preview` |

### Request Body

| Field               | Type               | Required | Description                                                               |
| ------------------- | ------------------ | -------- | ------------------------------------------------------------------------- |
| `contents[]`        | Content[]          | Yes      | Conversation turns. Array for multi-turn; single element for single-turn. |
| `tools[]`           | Tool[]             | No       | Tools the model may call (functions, code_execution, google_search, etc.) |
| `toolConfig`        | ToolConfig         | No       | Controls tool call behavior (AUTO/ANY/NONE)                               |
| `systemInstruction` | Content            | No       | Developer instructions prepended to every request. Text only.             |
| `generationConfig`  | GenerationConfig   | No       | Output configuration (temperature, tokens, format, etc.)                  |
| `safetySettings[]`  | SafetySetting[]    | No       | Per-category safety thresholds                                            |
| `cachedContent`     | string             | No       | Reference to cached content: `cachedContents/{id}`                        |
| `serviceTier`       | enum (ServiceTier) | No       | `flex`, `priority`, or `standard` (default)                               |
| `store`             | boolean            | No       | Override logging behavior for this request                                |

### Content Object

```json
{
  "role": "user", // "user" or "model"
  "parts": [
    { "text": "Hello" },
    { "inlineData": { "mimeType": "image/jpeg", "data": "<base64>" } },
    { "fileData": { "mimeType": "image/jpeg", "fileUri": "https://..." } },
    { "executableCode": { "language": "PYTHON", "code": "print('hi')" } },
    { "codeExecutionResult": { "outcome": "OK", "output": "hi" } },
    { "functionCall": { "name": "fn", "args": {} } },
    { "functionResponse": { "name": "fn", "response": {} } }
  ]
}
```

### GenerationConfig Parameters

| Parameter              | Type           | Default  | Range                            | Description                                                              |
| ---------------------- | -------------- | -------- | -------------------------------- | ------------------------------------------------------------------------ |
| `candidateCount`       | int32          | 1        | —                                | Number of response candidates to generate                                |
| `maxOutputTokens`      | int32          | —        | Model-dependent                  | Max tokens in response                                                   |
| `temperature`          | float          | 1.0      | 0.0–2.0                          | Randomness. For Gemini 3 models, default 1.0 is **strongly recommended** |
| `topP`                 | float          | —        | 0.0–1.0                          | Nucleus sampling threshold                                               |
| `topK`                 | int32          | —        | —                                | Top-K sampling                                                           |
| `stopSequences[]`      | string[]       | —        | —                                | Stop generation at these strings                                         |
| `responseMimeType`     | string         | —        | `text/plain`, `application/json` | Output format                                                            |
| `responseSchema`       | Schema         | —        | —                                | JSON Schema for structured output                                        |
| `thinkingConfig`       | ThinkingConfig | —        | —                                | Thinking mode settings (see §10)                                         |
| `presencePenalty`      | float          | —        | —                                | Penalize tokens already present                                          |
| `frequencyPenalty`     | float          | —        | —                                | Penalize tokens by frequency                                             |
| `responseModalities[]` | string[]       | ["TEXT"] | "TEXT", "IMAGE", "AUDIO"         | Output modalities                                                        |
| `speechConfig`         | SpeechConfig   | —        | —                                | TTS voice configuration                                                  |
| `mediaResolution`      | enum           | —        | LOW, MEDIUM, HIGH                | Token allocation per image/frame                                         |
| `seed`                 | int32          | —        | —                                | Reproducible generation                                                  |

### Response Schema: GenerateContentResponse

```json
{
  "candidates": [
    {
      "content": { "role": "model", "parts": [...] },
      "finishReason": "STOP",
      "safetyRatings": [...],
      "groundingMetadata": { ... },
      "urlContextMetadata": { ... }
    }
  ],
  "promptFeedback": {
    "blockReason": "SAFETY",
    "safetyRatings": [...]
  },
  "usageMetadata": {
    "promptTokenCount": 100,
    "cachedContentTokenCount": 50,
    "candidatesTokenCount": 200,
    "totalTokenCount": 300,
    "thoughtsTokenCount": 45,
    "toolUsePromptTokenCount": 10
  },
  "modelVersion": "gemini-3-flash-preview",
  "responseId": "abc123",
  "modelStatus": { ... }
}
```

### finishReason Values

| Value        | Meaning                         |
| ------------ | ------------------------------- |
| `STOP`       | Natural completion              |
| `MAX_TOKENS` | Hit maxOutputTokens limit       |
| `SAFETY`     | Blocked by safety filters       |
| `RECITATION` | Blocked for recitation concerns |
| `OTHER`      | Unknown                         |

### PromptFeedback blockReason Values

`SAFETY` · `OTHER` · `BLOCKLIST` · `PROHIBITED_CONTENT` · `IMAGE_SAFETY`

---

## 7. Streaming

### Python

```python
# Streaming generate
response = client.models.generate_content_stream(
    model="gemini-3-flash-preview",
    contents=["Explain how AI works"]
)
for chunk in response:
    print(chunk.text, end="")
```

### JavaScript

```javascript
const response = await ai.models.generateContentStream({
  model: "gemini-3-flash-preview",
  contents: "Explain how AI works",
});

for await (const chunk of response) {
  console.log(chunk.text);
}
```

### REST

Use `:streamGenerateContent` endpoint with `?alt=sse` for Server-Sent Events. Each event is a JSON `GenerateContentResponse` chunk.

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:streamGenerateContent?alt=sse" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents": [{"parts": [{"text": "Tell me a story"}]}]}'
```

---

## 8. Multi-Turn Conversations (Chat)

### Python

```python
client = genai.Client()
chat = client.chats.create(model="gemini-3-flash-preview")

response = chat.send_message("I have 2 dogs in my house.")
print(response.text)

response = chat.send_message("How many paws are in my house?")
print(response.text)

# Access history
for message in chat.get_history():
    print(f'role - {message.role}: {message.parts[0].text}')
```

### JavaScript

```javascript
const chat = ai.chats.create({
  model: "gemini-3-flash-preview",
  history: [
    { role: "user", parts: [{ text: "Hello" }] },
    { role: "model", parts: [{ text: "Great to meet you. What would you like to know?" }] },
  ],
});

const response1 = await chat.sendMessage({ message: "I have 2 dogs in my house." });
const response2 = await chat.sendMessage({ message: "How many paws are in my house?" });
```

### Streaming Chat

```python
response = chat.send_message_stream("I have 2 dogs in my house.")
for chunk in response:
    print(chunk.text, end="")
```

```javascript
const stream = await chat.sendMessageStream({ message: "I have 2 dogs in my house." });
for await (const chunk of stream) {
  console.log(chunk.text);
}
```

**Note:** "The full conversation history is sent to the model with each follow-up turn."

---

## 9. System Instructions

Set persistent behavior instructions that apply to all turns in a conversation.

### Python

```python
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    config=types.GenerateContentConfig(
        system_instruction="You are a cat. Your name is Neko."
    ),
    contents="Hello there"
)
```

### JavaScript

```javascript
const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: "Hello there",
  config: {
    systemInstruction: "You are a cat. Your name is Neko.",
  },
});
```

### REST

```json
{
  "system_instruction": {
    "parts": [{ "text": "You are a cat. Your name is Neko." }]
  },
  "contents": [{ "parts": [{ "text": "Hello there" }] }]
}
```

### Limitations

- Text only currently (no multimodal system instructions)
- Sent with every request, contributing to token count
- No documented hard length limit, but keep concise to manage costs

---

## 10. Thinking Mode

### Overview

Thinking mode enables models to reason through problems before responding. Available on all Gemini 3 and 2.5 series models.

**Important:** "You cannot disable thinking for Gemini 3.1 Pro." Thinking can be set to minimal but is always active.

**Billing:** "Response pricing is the sum of output tokens and thinking tokens." Thoughts are billed at output token rates even though only summaries appear.

### Gemini 3 Models — `thinkingLevel`

| Level     | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `minimal` | Matches 'no thinking' for most queries (does not guarantee thinking is off) |
| `low`     | Minimizes latency and cost; simple tasks                                    |
| `medium`  | Balanced for standard tasks                                                 |
| `high`    | Maximizes reasoning depth (default for Gemini 3)                            |

### Gemini 2.5 Models — `thinkingBudget`

| Value       | Behavior                                                             |
| ----------- | -------------------------------------------------------------------- |
| `0`         | Disables thinking (Flash models only; NOT valid for Pro)             |
| `-1`        | Dynamic thinking (default)                                           |
| `0–24576`   | Explicit budget for **Gemini 2.5 Flash**                             |
| `128–32768` | Explicit budget for **Gemini 2.5 Pro** (minimum 128, maximum 32,768) |

> WARNING: `thinkingBudget` is accepted but deprecated for Gemini 3 models. Using it with Gemini 3 Pro may result in unexpected performance. Use `thinkingLevel` (`minimal`/`low`/`medium`/`high`) for Gemini 3 models instead.

### Accessing Thoughts in Responses

Enable with `includeThoughts: true`. Iterate response parts and check the `thought` boolean:

```python
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="What is the sum of the first 50 prime numbers?",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(include_thoughts=True)
    )
)

for part in response.candidates[0].content.parts:
    if part.thought:
        print("Thought summary:", part.text)
    else:
        print("Answer:", part.text)
```

```javascript
const response = await ai.models.generateContentStream({
  model: "gemini-3-flash-preview",
  contents: "Your prompt here",
  config: { thinkingConfig: { includeThoughts: true } },
});

for await (const chunk of response) {
  for (const part of chunk.candidates[0].content.parts) {
    if (part.thought) console.log("Thought:", part.text);
    else console.log("Answer:", part.text);
  }
}
```

### Streaming vs Non-Streaming Thoughts

- **Non-streaming:** Returns single final thought summary
- **Streaming:** Returns rolling incremental summaries during generation

### Token Counting for Thoughts

```python
print("Thoughts tokens:", response.usage_metadata.thoughts_token_count)
print("Output tokens:", response.usage_metadata.candidates_token_count)
```

```javascript
console.log(`Thoughts tokens: ${response.usageMetadata.thoughtsTokenCount}`);
console.log(`Output tokens: ${response.usageMetadata.candidatesTokenCount}`);
```

### Thought Signatures

For multi-turn conversations with function calling, include `thought_signature` from model responses. Handled automatically by the Google GenAI SDK. Required when manually constructing conversation history.

### Thinking Level in REST

```json
{
  "contents": [{ "parts": [{ "text": "Your prompt" }] }],
  "generationConfig": {
    "thinkingConfig": { "thinkingLevel": "low" }
  }
}
```

### When to Use Thinking

| Task type                      | Recommendation           |
| ------------------------------ | ------------------------ |
| Fact retrieval, classification | Thinking unnecessary     |
| Comparisons, analogies         | Default thinking         |
| Advanced math, complex coding  | Maximize thinking budget |

---

## 11. Vision (Image Input)

### Supported Formats

`image/png` · `image/jpeg` · `image/webp` · `image/heic` · `image/heif`

### Size Limits

| Method                      | Limit |
| --------------------------- | ----- |
| Inline data (total request) | 20 MB |
| Files API                   | 2 GB  |
| Max images per request      | 3,600 |

### Token Calculation

| Image size              | Tokens                                           |
| ----------------------- | ------------------------------------------------ |
| Both dimensions ≤ 384px | 258 tokens                                       |
| Larger images           | Tiled into 768×768 sections, 258 tokens per tile |

### Inline Image Input

```python
from PIL import Image
from google import genai

client = genai.Client()
image = Image.open("/path/to/image.png")
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=[image, "Tell me about this instrument"]
)
```

```python
# As bytes
with open('image.jpg', 'rb') as f:
    image_bytes = f.read()

response = client.models.generate_content(
    model='gemini-3-flash-preview',
    contents=[
        types.Part.from_bytes(data=image_bytes, mime_type='image/jpeg'),
        "Describe this image"
    ]
)
```

### Files API Image Input

```javascript
const image = await ai.files.upload({ file: "/path/to/organ.png" });
const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: [
    createUserContent([
      "Tell me about this instrument",
      createPartFromUri(image.uri, image.mimeType),
    ]),
  ],
});
```

### Multiple Images

Combine multiple `Part` objects in the `contents` array — mix inline data and File API references freely.

### Capabilities

- Image captioning, classification, visual QA
- Object detection (returns normalized bounding boxes scaled to [0, 1000])
- Enhanced accuracy with `media_resolution` parameter

### Best Practices

- Verify images are correctly rotated before sending
- Use clear, non-blurry images
- Place text prompts **after** image parts in contents array

---

## 12. Video Input

### Supported Formats

`video/mp4` · `video/mpeg` · `video/quicktime` · `video/avi` · `video/x-flv` · `video/mpg` · `video/webm` · `video/wmv` · `video/3gpp`

### Size Limits by Method

| Method               | Max Size      | Best For                                    |
| -------------------- | ------------- | ------------------------------------------- |
| File API (paid tier) | 20 GB         | Large files (100MB+), long videos (10+ min) |
| File API (free tier) | 2 GB          | —                                           |
| Cloud Storage        | 2 GB per file | Persistent, reusable                        |
| Inline Data          | < 100 MB      | Small files, short (< 1 min)                |
| YouTube URL          | N/A           | Public YouTube videos only                  |

### Token Counting

| Resolution                    | Tokens per second                    |
| ----------------------------- | ------------------------------------ |
| Default                       | ~300 (263 for frames + 32 for audio) |
| Low (`media_resolution: LOW`) | ~100                                 |

Per frame: 258 tokens (default) or 66 tokens (low resolution).

### File API Upload

```python
myfile = client.files.upload(file="path/to/sample.mp4")
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=[myfile, "Summarize this video."]
)
```

### Inline Data

```python
video_bytes = open(video_file_name, 'rb').read()
response = client.models.generate_content(
    model='gemini-3-flash-preview',
    contents=types.Content(parts=[
        types.Part(inline_data=types.Blob(data=video_bytes, mime_type='video/mp4')),
        types.Part(text='Summarize the video in 3 sentences.')
    ])
)
```

### YouTube URL

```python
response = client.models.generate_content(
    model='gemini-3-flash-preview',
    contents=types.Content(parts=[
        types.Part(file_data=types.FileData(
            file_uri='https://www.youtube.com/watch?v=9hE5-98ZeCg'
        )),
        types.Part(text='Summarize in 3 sentences.')
    ])
)
```

### Timestamps

Use `MM:SS` format in prompts: `"What happens at 00:05 and 00:10?"`

### Custom Frame Rate

Default sampling: 1 FPS. Override with `video_metadata`:

```python
types.Part(
    inline_data=types.Blob(data=video_bytes, mime_type='video/mp4'),
    video_metadata=types.VideoMetadata(fps=5)
)
```

### Video Clipping

```python
video_metadata=types.VideoMetadata(
    start_offset='1250s',
    end_offset='1570s'
)
```

### Context Window Limits

| Resolution | Max Duration                |
| ---------- | --------------------------- |
| Default    | ~1 hour (within 1M context) |
| Low        | ~3 hours                    |

**Best practices:**

- One video per request for optimal results
- Place text prompts after video in contents array
- For videos > 10 minutes, use context caching to reduce costs

---

## 13. Audio Input

### Supported Formats

`audio/wav` · `audio/mp3` · `audio/aiff` · `audio/aac` · `audio/ogg` · `audio/flac`

### Limits

| Limit              | Value                |
| ------------------ | -------------------- |
| Max request size   | 20 MB total          |
| Max audio duration | 9.5 hours per prompt |
| Token rate         | 32 tokens per second |
| 1 minute of audio  | ~1,920 tokens        |

**Note:** "Gemini downsamples audio files to a 16 Kbps data resolution." Multi-channel audio is combined to mono.

### File API Upload (> 20 MB)

```python
myfile = client.files.upload(file="path/to/sample.mp3")
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=["Describe this audio clip", myfile]
)
```

### Inline Audio (< 20 MB)

```python
with open('path/to/small-sample.mp3', 'rb') as f:
    audio_bytes = f.read()

response = client.models.generate_content(
    model='gemini-3-flash-preview',
    contents=[
        'Describe this audio clip',
        types.Part.from_bytes(data=audio_bytes, mime_type='audio/mp3')
    ]
)
```

### Capabilities

- Transcription with timestamps (MM:SS format)
- Language detection per segment
- English translation of non-English content
- Speaker emotion detection (Happy/Sad/Angry/Neutral)
- Content summarization
- Reference specific sections: `"Provide a transcript from 02:30 to 03:29"`

**Limitation:** "The Gemini API doesn't support real-time transcription use cases. For real-time voice interactions refer to the Live API."

---

## 14. Document Processing (PDF)

### Supported Formats

PDF (`application/pdf`). TXT, Markdown, HTML, XML can be passed but are processed as plain text only — no visual interpretation of charts/diagrams.

### Limits

| Limit                          | Value                   |
| ------------------------------ | ----------------------- |
| File size                      | 50 MB                   |
| Page limit                     | 1,000 pages per request |
| Tokens per page                | ~258 tokens             |
| Combined pages (multiple PDFs) | Up to 1,000 total       |

### Page Scaling

| Original size | Scaled to            |
| ------------- | -------------------- |
| Large pages   | Max 3,072 × 3,072 px |
| Small pages   | Up to 768 × 768 px   |

### Inline (Small Documents)

Encode PDF as base64 and include directly.

### Files API (Recommended for Larger Files)

```python
myfile = client.files.upload(file="path/to/document.pdf")
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents=[myfile, "Summarize this document"]
)
```

Files API is free in all regions. Files stored for 48 hours.

### Native PDF Text

"You are **not charged** for tokens originating from the extracted **native text** in PDFs" (Gemini 3 models only).

### Capabilities

- Text, images, diagrams, charts, tables analysis
- Information extraction to structured formats
- Summarization and QA
- Transcription to HTML with layout preservation

---

## 15. Files API

### Upload

```python
# Python
myfile = client.files.upload(file="path/to/file.mp3")
print(myfile.name)  # files/abc123
print(myfile.uri)   # https://...
```

```javascript
// JavaScript
const myfile = await ai.files.upload({ file: "/path/to/file.mp3" });
```

### REST Upload (Two-Step Resumable)

```bash
# Step 1: Initial request
curl -X POST "https://generativelanguage.googleapis.com/upload/v1beta/files" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "X-Goog-Upload-Protocol: resumable" \
  -H "X-Goog-Upload-Command: start" \
  -H "X-Goog-Upload-Header-Content-Length: {FILE_SIZE}" \
  -H "X-Goog-Upload-Header-Content-Type: audio/mpeg" \
  -H "Content-Type: application/json" \
  -d '{"file": {"display_name": "My Audio"}}'

# Step 2: Upload bytes (use upload URL from step 1 response)
curl -X POST "{UPLOAD_URL}" \
  --data-binary @/path/to/file.mp3 \
  -H "X-Goog-Upload-Command: upload, finalize"
```

### Referencing Files in Requests

```json
{
  "contents": [
    {
      "parts": [
        { "text": "Describe this audio clip" },
        { "file_data": { "mime_type": "audio/mpeg", "file_uri": "files/abc123" } }
      ]
    }
  ]
}
```

### Operations

```python
# Get metadata
myfile = client.files.get(name="files/abc123")

# List all files
for f in client.files.list():
    print(f.name)

# Delete
client.files.delete(name=myfile.name)
```

### Limits & Supported Types

| Property           | Value                       |
| ------------------ | --------------------------- |
| Max file size      | 2 GB                        |
| PDF max            | 50 MB                       |
| Storage quota      | 20 GB per project           |
| File lifetime      | 48 hours (auto-deleted)     |
| Cost               | Free in all regions         |
| Use Files API when | Total request size > 100 MB |

**Supported MIME types:** Images (PNG, JPEG, WebP, HEIC, HEIF), Audio (WAV, MP3, AIFF, AAC, OGG, FLAC), Video (MP4, MPEG, MOV, AVI, FLV, MPG, WebM, WMV, 3GPP), Documents (PDF), and general media files.

**Note:** Files cannot be downloaded back — only metadata retrieval is available.

---

## 16. Function Calling / Tool Use

### Function Declaration Format

```json
{
  "name": "get_weather",
  "description": "Returns current weather for a given city",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "City name"
      },
      "unit": {
        "type": "string",
        "enum": ["celsius", "fahrenheit"],
        "description": "Temperature unit"
      }
    },
    "required": ["city"]
  }
}
```

### Tool Types

| Tool             | Config Key              | Description                        |
| ---------------- | ----------------------- | ---------------------------------- |
| Custom functions | `function_declarations` | Your own defined functions         |
| Code execution   | `code_execution`        | Execute Python                     |
| Google Search    | `google_search`         | Web search                         |
| Google Maps      | `google_maps`           | Location services                  |
| URL context      | `url_context`           | Fetch URL content                  |
| Computer use     | `computer_use`          | UI automation                      |
| File search      | `file_search`           | Query document collections         |
| MCP tools        | —                       | Model Context Protocol integration |

### Tool Configuration Modes

Set via `function_calling_config.mode`:

| Mode        | Behavior                                                                             |
| ----------- | ------------------------------------------------------------------------------------ |
| `AUTO`      | Default when only function_declarations enabled; model decides text or function call |
| `ANY`       | Model MUST return a function call; ensures schema adherence                          |
| `VALIDATED` | Default for tool combinations; constrains to valid calls or natural language         |
| `NONE`      | Disables function calling entirely                                                   |

Optional `allowed_function_names` restricts which functions the model may call.

### Python Example

```python
from google import genai
from google.genai import types

def get_weather(city: str) -> str:
    return f"Weather in {city}: 72°F, sunny"

tools = [types.Tool(function_declarations=[{
    "name": "get_weather",
    "description": "Get current weather for a city",
    "parameters": {
        "type": "object",
        "properties": {"city": {"type": "string"}},
        "required": ["city"]
    }
}])]

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="What's the weather in Paris?",
    config=types.GenerateContentConfig(tools=tools)
)
```

### Function Call Response Flow

The model returns a `functionCall` part:

```json
{
  "functionCall": {
    "id": "call_abc123",
    "name": "get_weather",
    "args": { "city": "Paris" }
  }
}
```

**Critical for Gemini 3 models:** Always include the `id` field from the functionCall in your functionResponse.

### Returning Function Results

```python
# Add function result to conversation
function_response = types.Part.from_function_response(
    name="get_weather",
    id="call_abc123",  # MUST match the functionCall id
    response={"result": "72°F, sunny in Paris"}
)
```

### Parallel Function Calling

The model can request multiple function calls in a single response. Return results in any order — the API maps each result to its call using the `id` field, enabling async execution.

### Compositional Function Calling

Chain multiple function calls where outputs feed into subsequent calls (e.g., get_weather → adjust_thermostat).

### Automatic Function Calling (Python SDK Only)

Pass Python functions directly — the SDK auto-generates declarations and executes calls:

```python
def get_weather(city: str) -> str:
    """Returns the current weather for a city."""
    return f"72°F, sunny"

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Weather in Paris?",
    config=types.GenerateContentConfig(tools=[get_weather])
)
```

### Multimodal Function Responses (Gemini 3)

Gemini 3 supports images, PDFs, and text in function responses via inline data with `displayName`.

### Best Practices

- Use specific, descriptive names and detailed descriptions
- Use enums for constrained values
- Provide 10–20 actively relevant tools maximum
- Implement robust error handling
- Validate high-consequence actions with users before executing
- Check `finishReason` in responses for failure cases
- For Gemini 3 models: maintain temperature at default 1.0

---

## 17. Structured Output (JSON Mode)

### How to Enable

Set `responseMimeType` to `application/json` optionally with `responseSchema`.

### Python (with Pydantic)

```python
from google import genai
from pydantic import BaseModel
from typing import List

class Recipe(BaseModel):
    recipe_name: str
    ingredients: List[str]

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Give me a pasta recipe",
    config={
        "response_format": {
            "text": {
                "mime_type": "application/json",
                "schema": Recipe.model_json_schema()
            }
        },
    },
)
import json
recipe = json.loads(response.text)
```

### JavaScript (with Zod)

```javascript
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const recipeSchema = z.object({
  recipe_name: z.string(),
  ingredients: z.array(z.string()),
});

const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: "Give me a pasta recipe",
  config: {
    responseFormat: {
      text: {
        mimeType: "application/json",
        schema: zodToJsonSchema(recipeSchema),
      },
    },
  },
});
```

### REST

```json
{
  "contents": [{ "parts": [{ "text": "Give me a pasta recipe" }] }],
  "generationConfig": {
    "responseFormat": {
      "text": {
        "mimeType": "application/json",
        "schema": {
          "type": "object",
          "properties": {
            "recipe_name": { "type": "string" },
            "ingredients": { "type": "array", "items": { "type": "string" } }
          },
          "required": ["recipe_name", "ingredients"]
        }
      }
    }
  }
}
```

### Supported JSON Schema Types

`string` · `number` · `integer` · `boolean` · `object` · `array` · `null`

### Schema Properties

**Object:**

- `properties` — key-value schemas
- `required` — mandatory property names
- `additionalProperties` — bool or schema

**String:**

- `enum` — restricted value set
- `format` — `date-time`, `date`, `time`

**Numeric:**

- `enum` — specific numeric values
- `minimum` / `maximum` — inclusive bounds

**Array:**

- `items` — schema for all items
- `prefixItems` — tuple-like per-position schemas
- `minItems` / `maxItems` — count bounds

**Descriptive:**

- `title` / `description` — guidance for the model

### Enum Support

```python
from typing import Literal

class Feedback(BaseModel):
    sentiment: Literal["positive", "neutral", "negative"]
    summary: str
```

### Streaming with Structured Output

Returns valid partial JSON strings that concatenate into complete objects.

### Supported Models

Gemini 3.1 Flash-Lite, 3.1 Pro Preview, 3 Flash Preview, 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite, and others.

### Limitations

- Not all JSON Schema features are supported
- Very large or deeply nested schemas may be rejected
- Gemini 2.0 Flash requires explicit `propertyOrdering`
- Syntactically valid JSON is not guaranteed to be semantically correct

---

## 18. Grounding with Google Search

### How to Enable

```python
from google import genai
from google.genai import types

grounding_tool = types.Tool(google_search=types.GoogleSearch())
config = types.GenerateContentConfig(tools=[grounding_tool])

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Who won the Euro 2024?",
    config=config,
)
```

```javascript
const config = { tools: [{ googleSearch: {} }] };
const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: "Who won the Euro 2024?",
  config,
});
```

### Response Format: groundingMetadata

```json
{
  "groundingMetadata": {
    "webSearchQueries": ["Euro 2024 winner"],
    "searchEntryPoint": {
      "renderedContent": "<HTML/CSS for search suggestion widget>"
    },
    "groundingChunks": [{ "web": { "uri": "https://...", "title": "Article title" } }],
    "groundingSupports": [
      {
        "segment": { "startIndex": 0, "endIndex": 45 },
        "groundingChunkIndices": [0, 1],
        "confidenceScores": [0.9, 0.8]
      }
    ]
  }
}
```

### Building Inline Citations

Use `groundingSupports` and `groundingChunks` together. Sort supports in reverse order, insert citation links at text segment endpoints to avoid index shifting.

### Supported Models

- Gemini 3.1 Flash-Lite, 3.1 Flash Image Preview, 3.1 Pro Preview
- Gemini 3 Pro Image Preview, 3 Flash Preview
- Gemini 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite
- Gemini 2.0 Flash

**Note:** Older models use `google_search_retrieval` instead of `google_search`.

### Pricing

5,000 free prompts/month (Gemini 3), then $14/1,000 queries.

### Compatibility

Compatible with code execution and URL context tools. Reduces hallucinations by accessing real-time data beyond the model's knowledge cutoff.

---

## 19. URL Context

### How to Enable

Include `url_context` in the tools array. Pass URLs directly in the prompt text.

```python
tools = [{"url_context": {}}]

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Summarize https://example.com/article",
    config=types.GenerateContentConfig(tools=tools)
)
```

```javascript
const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: "Summarize https://example.com/article",
  config: { tools: [{ urlContext: {} }] },
});
```

### Limits

| Property             | Value |
| -------------------- | ----- |
| Max URLs per request | 20    |
| Max content per URL  | 34 MB |

### Supported Content Types

- Text: HTML, JSON, plain text, XML, CSS, JavaScript, CSV, RTF
- Images: PNG, JPEG, BMP, WebP
- PDFs

**Not supported:** YouTube videos, Google Workspace files, paywalled content, video/audio files.

### How It Works

Two-step retrieval: checks internal index cache first; if not cached, performs live fetch.

### Response Format

```json
"url_context_metadata": {
  "url_metadata": [
    {
      "retrieved_url": "https://example.com",
      "url_retrieval_status": "URL_RETRIEVAL_STATUS_SUCCESS"
    }
  ]
}
```

Status values: `URL_RETRIEVAL_STATUS_SUCCESS` · `URL_RETRIEVAL_STATUS_UNSAFE`

### Token Counting

Retrieved content counts toward `tool_use_prompt_token_count` in `usage_metadata`.

### URL Context vs Grounding

- **URL context:** Retrieves content from URLs you specify
- **Grounding:** Model independently searches for relevant information
- Can be combined for: model searches broadly, then analyzes specific pages in depth

---

## 20. Code Execution

### How to Enable

```python
config = types.GenerateContentConfig(
    tools=[types.Tool(code_execution=types.ToolCodeExecution)]
)

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="What is the sum of the first 50 prime numbers?",
    config=config
)
```

### Response Parts

| Part type               | Contents                     |
| ----------------------- | ---------------------------- |
| `text`                  | Model explanatory text       |
| `executable_code`       | Generated Python code        |
| `code_execution_result` | Output from running the code |

### Supported Language

**Python only.** You can request other language code but the model cannot execute it.

### File I/O Support

- Input: CSV and text files
- Output: Inline images via Matplotlib (graphs, charts)
- Max runtime: 30 seconds
- Max input size: ~2 MB for text

### Built-In Libraries (40+)

NumPy, Pandas, Matplotlib, TensorFlow, scikit-learn, OpenCV, python-docx, python-pptx, PyPDF2, and many others.

**Limitation:** "You can't install your own libraries."

### Image Processing with Code Execution (Gemini 3)

When combined with Thinking mode, Gemini 3 Flash can write and execute Python code to:

- Zoom into small image details
- Perform visual math calculations
- Annotate images

### Multi-Turn History

When constructing history manually for REST or multi-turn use, pass back `id` and `thought_signature` fields from the API response to preserve context.

### Billing

"There's no additional charge for enabling code execution." Standard input/output token rates apply.

---

## 21. Context Caching

### Overview

Two caching mechanisms:

1. **Implicit caching** — Automatically enabled on Gemini 2.5+ models; no developer action required
2. **Explicit caching** — Manually configured; guaranteed cost savings for frequently reused content

### Minimum Token Requirements for Explicit Caching

| Model                  | Minimum cached tokens |
| ---------------------- | --------------------- |
| Gemini 3 Flash Preview | 1,024                 |
| Gemini 3.1 Flash-Lite  | 1,024                 |
| Gemini 3.1 Pro Preview | 4,096                 |
| Gemini 2.5 Flash       | 1,024                 |
| Gemini 2.5 Flash-Lite  | 1,024                 |
| Gemini 2.5 Pro         | 4,096                 |

### What Can Be Cached

- Video files (uploaded via Files API)
- PDF documents
- Text files
- System instructions

### Creating Cached Content

```python
import datetime
from google import genai
from google.genai import types

client = genai.Client()

# Upload content
myfile = client.files.upload(file="large_document.pdf")

# Create cache with TTL
cache = client.caches.create(
    model="gemini-3-flash-preview",
    config=types.CreateCachedContentConfig(
        system_instruction="You are an expert analyst.",
        contents=[myfile],
        ttl="3600s"  # 1 hour
    )
)
```

### TTL Options

| Method      | Format       | Example                                  |
| ----------- | ------------ | ---------------------------------------- |
| TTL string  | Duration     | `"300s"` (5 minutes), `"3600s"` (1 hour) |
| Expire time | ISO datetime | `"2025-01-27T16:02:36.473528+00:00"`     |

**Default:** 1 hour if unspecified.

### Using Cache in Requests

```python
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Summarize the main findings",
    config=types.GenerateContentConfig(
        cached_content=cache.name  # "cachedContents/abc123"
    )
)
```

### Cache Management

```python
# List caches (returns: name, model, display_name, usage_metadata, create_time, update_time, expire_time)
for cache in client.caches.list():
    print(cache)

# Get single cache
cache = client.caches.get(name="cachedContents/abc123")

# Update TTL or expiry only
client.caches.update(
    name=cache.name,
    config=types.UpdateCachedContentConfig(ttl='300s')
)

# Delete
client.caches.delete(cache.name)
```

### Pricing

| Cost component          | Billing                           |
| ----------------------- | --------------------------------- |
| Cached token usage      | Reduced rate per use              |
| Storage                 | TTL duration × cached token count |
| Non-cached input tokens | Standard rate                     |
| Output tokens           | Standard rate                     |

See §4 for per-model storage prices.

### Constraints

- Cached tokens count toward model token limits
- Standard rate limits apply
- Maximum cached content = model's maximum context window
- No inference distinction between cached and non-cached tokens

### Best Use Cases

- Large system instructions reused across many requests
- Video analysis done multiple times
- Large document queries
- Frequent code repository analysis

---

## 22. Embeddings

### Models

#### Gemini Embedding 2 (`gemini-embedding-2`)

- Input: Text, images, video, audio, PDFs
- Input token limit: 8,192
- Output dimensions: 128–3,072 (recommended: 768, 1,536, 3,072)
- Auto-normalizes truncated dimensions
- Updated: April 2026

#### Gemini Embedding 001 (`gemini-embedding-001`)

- Input: Text only
- Input token limit: 2,048
- Output dimensions: 128–3,072 (recommended: 768, 1,536, 3,072)
- Manual normalization required for non-3,072 dimensions
- Updated: June 2025

### Generating Embeddings

```python
result = client.models.embed_content(
    model="gemini-embedding-2",
    contents="What is the meaning of life?"
)
print(result.embeddings)
```

```javascript
const response = await ai.models.embedContent({
  model: "gemini-embedding-2",
  contents: "What is the meaning of life?",
});
```

### Output Dimensionality Control

```python
result = client.models.embed_content(
    model="gemini-embedding-2",
    contents="What is the meaning of life?",
    config=types.EmbedContentConfig(output_dimensionality=768)
)
```

### Task Types (Embedding 001)

Use `task_type` parameter:

| Task                   | Use Case                                 |
| ---------------------- | ---------------------------------------- |
| `SEMANTIC_SIMILARITY`  | Recommendation, duplicate detection      |
| `CLASSIFICATION`       | Sentiment analysis, spam detection       |
| `CLUSTERING`           | Document organization, anomaly detection |
| `RETRIEVAL_DOCUMENT`   | Indexing searchable content              |
| `RETRIEVAL_QUERY`      | General search queries                   |
| `CODE_RETRIEVAL_QUERY` | Code block search                        |
| `QUESTION_ANSWERING`   | Chatbots, QA systems                     |
| `FACT_VERIFICATION`    | Fact-checking                            |

### Task Types (Embedding 2)

Use prompt instructions directly:

| Task            | Prompt format          |
| --------------- | ---------------------- | ------------------ |
| Search query    | `"task: search result  | query: {content}"` |
| Search document | `"title: {title}       | text: {content}"`  |
| Classification  | `"task: classification | query: {content}"` |

### Multimodal Inputs (Embedding 2)

| Type   | Limit                                       |
| ------ | ------------------------------------------- |
| Images | Max 6 per request (PNG, JPEG)               |
| Audio  | Up to 180 seconds (MP3, WAV)                |
| Video  | Up to 120 seconds; 32 frames max (MP4, MOV) |
| PDFs   | Max 6 pages                                 |
| Text   | Up to 8,192 tokens                          |

```python
# Image embedding
with open('example.png', 'rb') as f:
    image_bytes = f.read()
result = client.models.embed_content(
    model='gemini-embedding-2',
    contents=[types.Part.from_bytes(data=image_bytes, mime_type='image/png')]
)
```

### Aggregation Behavior

**Aggregated (multiple inputs → single embedding):**

```python
result = client.models.embed_content(
    model='gemini-embedding-2',
    contents=["An image of a dog", types.Part.from_bytes(...)]
)  # Returns ONE embedding
```

**Separate (each input → its own embedding):**

```python
result = client.models.embed_content(
    model="gemini-embedding-2",
    contents=[
        types.Content(parts=[types.Part.from_text(text="...")]),
        types.Content(parts=[types.Part.from_bytes(...)])
    ]
)  # Returns TWO embeddings
```

### Batch Embeddings

Use Batch API for 50% reduced pricing on high-volume embedding jobs.

### Migration Notes: Embedding 001 → Embedding 2

1. Embedding spaces are **incompatible** — re-embed all existing data
2. Task specification changes — use prompt instructions instead of `task_type`
3. Aggregation behavior differs
4. Embedding 2 auto-normalizes; Embedding 001 requires manual normalization

---

## 23. Image Generation

### Available Models

| Model ID                         | Purpose                       | Resolutions      | Notes                                                        |
| -------------------------------- | ----------------------------- | ---------------- | ------------------------------------------------------------ |
| `gemini-3.1-flash-image-preview` | High-efficiency image gen     | 0.5K, 1K, 2K, 4K | Up to 10 object + 4 character refs; ultra-wide aspect ratios |
| `gemini-3-pro-image-preview`     | Professional-grade generation | 1K, 2K, 4K       | Up to 6 object + 5 character refs; uses Thinking             |
| `gemini-2.5-flash-image`         | High-speed/high-volume        | —                | Optimized for low latency                                    |
| `imagen-4`                       | Specialized image model       | Up to 2K         | —                                                            |
| `imagen-4-ultra`                 | Highest quality               | —                | —                                                            |

### Aspect Ratios

**Standard (all models):** 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

**Gemini 3.1 Flash extras:** 1:4, 4:1, 1:8, 8:1

### Text-to-Image Generation

```python
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="A photorealistic image of a red rose on a white background",
    config=types.GenerateContentConfig(
        response_modalities=["TEXT", "IMAGE"]
    )
)

for part in response.candidates[0].content.parts:
    if part.inline_data:
        # Base64 PNG image
        image_data = part.inline_data.data
        mime_type = part.inline_data.mime_type  # "image/png"
```

### Image Editing / Inpainting

```python
# Multi-turn editing
chat = client.chats.create(model="gemini-3.1-flash-image-preview")

with open("original.jpg", "rb") as f:
    image_bytes = f.read()

response = chat.send_message([
    types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"),
    "Remove the background and replace with a beach scene"
])
```

### Google Search Grounding (Image Gen)

```python
config = types.GenerateContentConfig(
    tools=[types.Tool(google_search=types.GoogleSearch())],
    response_modalities=["IMAGE", "TEXT"]
)
```

Gemini 3.1 Flash adds Image Search grounding: uses web images as visual context for generation.

### Reference Images

```python
# Up to 14 reference images total (Gemini 3.1 Flash: 10 objects + 4 characters)
response = client.models.generate_content(
    model="gemini-3.1-flash-image-preview",
    contents=[ref_image1, ref_image2, "Generate a similar style image of a mountain"],
    config=types.GenerateContentConfig(response_modalities=["IMAGE"])
)
```

### Thinking for Image Generation

Gemini 3 Pro Image generates up to two interim images to test composition and logic (enabled by default). Control via `thinkingLevel: minimal/high`.

### Output Format

All images are returned as base64-encoded inline data, MIME type `image/png`. "All generated images include a SynthID watermark."

### Thought Signatures

Encrypted representations preserving reasoning context across multi-turn image generation conversations.

---

## 24. Text-to-Speech (TTS)

### Available Models

| Model                          | Type                       |
| ------------------------------ | -------------------------- |
| `gemini-3.1-flash-tts-preview` | Single & multi-speaker TTS |
| `gemini-2.5-flash-preview-tts` | Single & multi-speaker TTS |
| `gemini-2.5-pro-preview-tts`   | Single & multi-speaker TTS |

### Audio Output Format

PCM format: 24kHz, mono, 16-bit samples. Typically saved as WAV files.

### Available Voices (30 total)

Zephyr · Puck · Charon · Kore · Fenrir · Leda · Orus · Aoede · Callirrhoe · Autonoe · Enceladus · Iapetus · Umbriel · Algieba · Despina · Erinome · Algenib · Rasalgethi · Laomedeia · Achernar · Alnilam · Schedar · Gacrux · Pulcherrima · Achird · Zubenelgenubi · Vindemiatrix · Sadachbia · Sadaltager · Sulafat

### Language Support

80+ languages — automatic detection.

### Single-Speaker TTS

```python
response = client.models.generate_content(
    model="gemini-3.1-flash-tts-preview",
    contents="Hello, welcome to our service!",
    config=types.GenerateContentConfig(
        response_modalities=["AUDIO"],
        speech_config=types.SpeechConfig(
            voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Zephyr")
            )
        )
    )
)
# Audio in response.candidates[0].content.parts[0].inline_data.data
```

### Multi-Speaker TTS (Up to 2 Speakers)

```python
speech_config = types.SpeechConfig(
    multi_speaker_voice_config=types.MultiSpeakerVoiceConfig(
        speaker_voice_configs=[
            types.SpeakerVoiceConfig(speaker="Speaker1", voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Aoede")
            )),
            types.SpeakerVoiceConfig(speaker="Speaker2", voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Puck")
            ))
        ]
    )
)
```

### Inline Style Control

Use audio tags in text for delivery control:

- `[whispers]` — whispering tone
- `[excited]` — excited tone
- `[laughs]` — laughter
- Natural language in prompts: "Say this slowly with a British accent"

### Advanced Prompt Structure

```
[Audio profile: friendly, professional female voice]
[Scene: phone customer service]
[Director's notes: warm, clear enunciation]
Text to speak here.
```

### Limitations

| Limitation     | Detail                                                |
| -------------- | ----------------------------------------------------- |
| Context window | 32k tokens max                                        |
| Streaming      | Not supported                                         |
| Long audio     | Quality may degrade beyond several minutes            |
| Text tokens    | Occasional text token returns — implement retry logic |

---

## 25. Live API (Real-Time Multimodal)

### Overview

The Live API uses a stateful WebSocket connection for real-time bidirectional communication.

### WebSocket Endpoint

```
wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent
```

### Audio Formats

| Direction | Format                               |
| --------- | ------------------------------------ |
| Input     | Raw 16-bit PCM, 16kHz, little-endian |
| Output    | Raw 16-bit PCM, 24kHz, little-endian |

### Supported Modalities

**Input:** Audio (PCM 16kHz), Images (JPEG ≤ 1FPS), Text

**Output:** Audio (PCM 24kHz)

### Key Features

| Feature          | Detail                                           |
| ---------------- | ------------------------------------------------ |
| Languages        | 70 supported                                     |
| Interruption     | Users can interrupt model at any time (barge-in) |
| Tool use         | Function calling + Google Search                 |
| Transcription    | Text transcripts of user and model               |
| Proactive audio  | Control response timing                          |
| Affective dialog | Adjusts style to match user expression           |

### Client Message Types

```json
// 1. Setup (first message)
{
  "setup": {
    "model": "models/gemini-3.1-flash-live-preview",
    "generationConfig": {
      "candidateCount": 1,
      "maxOutputTokens": 2048,
      "temperature": 1.0,
      "topP": 1.0,
      "topK": 40,
      "presencePenalty": 0,
      "frequencyPenalty": 0,
      "responseModalities": ["AUDIO"],
      "speechConfig": { "voiceConfig": { "prebuiltVoiceConfig": { "voiceName": "Aoede" } } },
      "mediaResolution": "MEDIUM"
    },
    "systemInstruction": { "parts": [{"text": "..."}] },
    "tools": [...],
    "realtimeInputConfig": {},
    "sessionResumption": {},
    "contextWindowCompression": {},
    "inputAudioTranscription": {},
    "outputAudioTranscription": {},
    "proactivity": {},
    "historyConfig": {}
  }
}

// 2. Content update (conversation turn)
{
  "clientContent": {
    "turns": [
      { "role": "user", "parts": [{"text": "Hello"}] }
    ],
    "turnComplete": true
  }
}

// 3. Real-time input (concurrent audio/video/text streams)
{
  "realtimeInput": {
    "audio": { "data": "<base64 PCM>", "mimeType": "audio/pcm;rate=16000" },
    "video": { "data": "<base64 JPEG>", "mimeType": "image/jpeg" },
    "text": "...",
    "activityStart": {},
    "activityEnd": {},
    "audioStreamEnd": {}
  }
}

// 4. Tool response
{
  "toolResponse": {
    "functionResponses": [
      { "id": "call_abc", "name": "get_weather", "response": {} }
    ]
  }
}
```

### Server Message Types

| Type                      | Description                |
| ------------------------- | -------------------------- |
| `setupComplete`           | Session initialized        |
| `serverContent`           | Model response audio/text  |
| `toolCall`                | Function execution request |
| `toolCallCancellation`    | Cancel a pending tool call |
| `goAway`                  | Disconnection notice       |
| `sessionResumptionUpdate` | Session resumption token   |
| All messages may include  | `usageMetadata`            |

### Session Configuration (`generationConfig` for Live)

All GenerationConfig parameters supported, plus:

- `responseModalities`
- `speechConfig`
- `mediaResolution`
- `presencePenalty`
- `frequencyPenalty`
- `realtimeInputConfig`
- `sessionResumption`
- `contextWindowCompression`
- `inputAudioTranscription` / `outputAudioTranscription`
- `proactivity`
- `historyConfig`

### Connection Patterns

1. **Server-to-server** — Backend WebSocket; reference: GenAI SDK tutorial
2. **Client-to-server** — Frontend WebSocket with ephemeral tokens; reference: WebSocket tutorial

### Integration Partners

LiveKit · Pipecat · Fishjam · Agent Development Kit (ADK)

---

## 26. Safety Settings

### Adjustable Harm Categories

| Category                          | Description                                              |
| --------------------------------- | -------------------------------------------------------- |
| `HARM_CATEGORY_HARASSMENT`        | Negative/harmful comments targeting protected attributes |
| `HARM_CATEGORY_HATE_SPEECH`       | Rude, disrespectful, or profane content                  |
| `HARM_CATEGORY_SEXUALLY_EXPLICIT` | References to sexual acts or lewd content                |
| `HARM_CATEGORY_DANGEROUS_CONTENT` | Promotes or facilitates harmful acts                     |
| `HARM_CATEGORY_CIVIC_INTEGRITY`   | Election/civic misinformation                            |

**Non-adjustable:** Child safety protections. These cannot be modified.

### Threshold Options

| Setting    | API Value                | Behavior                               |
| ---------- | ------------------------ | -------------------------------------- |
| Off        | `OFF`                    | Turn off the safety filter             |
| Block none | `BLOCK_NONE`             | Always show regardless of probability  |
| Block few  | `BLOCK_ONLY_HIGH`        | Block only when high probability       |
| Block some | `BLOCK_MEDIUM_AND_ABOVE` | Block medium or high probability       |
| Block most | `BLOCK_LOW_AND_ABOVE`    | Block low, medium, or high probability |

### Default Behavior

"The default block threshold is **Off** for Gemini 2.5 and 3 models."

### Configuration

```python
from google.genai import types

safety_settings = [
    types.SafetySetting(
        category="HARM_CATEGORY_HARASSMENT",
        threshold="BLOCK_ONLY_HIGH"
    ),
    types.SafetySetting(
        category="HARM_CATEGORY_HATE_SPEECH",
        threshold="BLOCK_MEDIUM_AND_ABOVE"
    ),
]

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Your prompt",
    config=types.GenerateContentConfig(safety_settings=safety_settings)
)
```

### Response When Content is Blocked

```json
{
  "candidates": [
    {
      "finishReason": "SAFETY",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "HIGH",
          "blocked": true
        }
      ]
    }
  ],
  "promptFeedback": {
    "blockReason": "SAFETY",
    "safetyRatings": [...]
  }
}
```

Blocked content itself is never returned.

### Safety Probability Values

`HIGH` · `MEDIUM` · `LOW` · `NEGLIGIBLE`

---

## 27. Token Counting

### Token Basics

"A token is equivalent to about 4 characters. 100 tokens is equal to about 60–80 English words."

### countTokens API

```python
response = client.models.count_tokens(
    model='gemini-3-flash-preview',
    contents=[myfile]  # or any contents array
)
print(response.total_tokens)
```

### Usage Metadata (After Generation)

```python
response = client.models.generate_content(...)
meta = response.usage_metadata
print(meta.prompt_token_count)          # Input tokens (includes cached)
print(meta.cached_content_token_count)  # Cached portion
print(meta.candidates_token_count)      # Output tokens
print(meta.total_token_count)           # Total
print(meta.thoughts_token_count)        # Thinking tokens
print(meta.tool_use_prompt_token_count) # Tool-use tokens
```

### Multimodal Token Rates

| Media Type                 | Token Rate                                  |
| -------------------------- | ------------------------------------------- |
| Images (≤ 384×384px)       | 258 tokens each                             |
| Images (larger)            | 258 tokens per 768×768 tile                 |
| Video (default resolution) | ~300 tokens/second (~263 frames + 32 audio) |
| Video (low resolution)     | ~100 tokens/second                          |
| Audio                      | 32 tokens/second                            |
| PDF pages                  | ~258 tokens/page                            |

### Getting Model Limits

```python
model_info = client.models.get(model="gemini-3-flash-preview")
print(model_info.input_token_limit)   # e.g., 1,048,576
print(model_info.output_token_limit)  # e.g., 65,536
```

### media_resolution Parameter

Controls tokens per image/frame — balances detail recognition against token usage and cost.

---

## 28. Long Context

### Context Window Sizes

Most current Gemini models: **1,048,576 tokens** input context.

### Effective Use

- Provide relevant information upfront instead of chunking
- "Put your query/question at the **end** of the prompt (after all other context)"
- Use many-shot learning (hundreds/thousands of examples) — can match fine-tuned model performance

### Use Cases

- Large document summarization
- Document QA (up to 1,000 PDF pages)
- Video/audio transcription and analysis
- Meeting summarization
- Real-time processing workflows

### Limitations

| Limitation              | Detail                                                                   |
| ----------------------- | ------------------------------------------------------------------------ |
| Multiple item retrieval | Accuracy lower when searching for multiple specific items simultaneously |
| Latency                 | Longer inputs → higher time-to-first-token                               |
| Cost                    | Without caching, full input tokens billed every request                  |

### Cost Management

Use context caching for repeated large inputs — significant cost reduction when same content queried multiple times.

---

## 29. Batch API

### Overview

Process multiple requests asynchronously at 50% reduced pricing vs standard. Ideal when latency is not critical.

### Limits

| Property                      | Value          |
| ----------------------------- | -------------- |
| Max concurrent batch requests | 100            |
| Max input file size           | 2 GB           |
| Storage                       | 20 GB          |
| Enqueued tokens               | Tier-dependent |

### Supported Operations

- `generateContent`
- Embeddings (`embedContent`)

### Creating a Batch Job

```python
# Submit batch
batch_job = client.batches.create(
    model="gemini-3-flash-preview",
    src="gs://your-bucket/requests.jsonl",
    config=types.CreateBatchJobConfig(dest="gs://your-bucket/responses/")
)

# Check status
job = client.batches.get(name=batch_job.name)
print(job.state)  # JOB_STATE_PENDING / JOB_STATE_RUNNING / JOB_STATE_SUCCEEDED

# List jobs
for job in client.batches.list():
    print(job.name, job.state)

# Cancel
client.batches.cancel(name=batch_job.name)

# Delete
client.batches.delete(name=batch_job.name)
```

### Request File Format (JSONL)

Each line is a JSON object:

```jsonl
{"key": "request-1", "request": {"contents": [{"parts": [{"text": "Hello"}]}]}}
{"key": "request-2", "request": {"contents": [{"parts": [{"text": "World"}]}]}}
```

### Pricing

50% reduction vs standard pricing on all supported models (see §4 for Batch column).

---

## 30. Model Tuning / Fine-Tuning

**Fine-tuning is not available in the Gemini Developer API as of May 2026.**

"With the deprecation of Gemini 1.5 Flash-001 in May 2025, we no longer have a model available which supports fine-tuning in the Gemini API or AI Studio."

**Alternative:** Supervised tuning is supported in the **Gemini Enterprise Agent Platform** (Vertex AI). See Vertex AI documentation for details.

Google has no immediate plans to reinstate public fine-tuning but welcomes feedback at: https://discuss.ai.google.dev/

---

## 31. OpenAI Compatibility Layer

### Base URL

```
https://generativelanguage.googleapis.com/v1beta/openai/
```

### Authentication

Use your Gemini API key where the OpenAI SDK expects an API key:

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_GEMINI_API_KEY",
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)
```

### Supported Models

| Gemini Model ID              | Capability                      |
| ---------------------------- | ------------------------------- |
| `gemini-3-flash-preview`     | Text generation                 |
| `gemini-2.5-flash-image`     | Image generation                |
| `gemini-3-pro-image-preview` | Image generation with grounding |
| `veo-3.1-generate-preview`   | Video generation                |
| `gemini-embedding-2-preview` | Multimodal embeddings           |
| `gemini-embedding-001`       | Text-only embeddings            |

### Supported Features

| Feature             | Notes                                                                            |
| ------------------- | -------------------------------------------------------------------------------- |
| Chat completions    | Full support, streaming                                                          |
| Image understanding | Base64 via `image_url` content type                                              |
| Image generation    | `/v1/images` endpoint; params: `prompt`, `model`, `n`, `size`, `response_format` |
| Video generation    | `/v1/videos` endpoint (Sora-compatible); async with polling                      |
| Audio input         | `input_audio` content type                                                       |
| Function calling    | Standard OpenAI format                                                           |
| Structured outputs  | JSON schema via Pydantic/Zod                                                     |
| Embeddings          | Standard endpoint                                                                |
| Batch API           | Jobs supported; file upload/download requires `genai` client                     |

### Reasoning / Thinking

Maps to OpenAI's `reasoning_effort`:

- `none` / `minimal` → thinking_level `minimal` / `low`
- `medium` → thinking_level `medium`
- `high` → thinking_level `high`

Note: "Reasoning cannot be turned off for Gemini 2.5 Pro or 3 models."

Access thought summaries via:

```python
response = client.chat.completions.create(
    model="gemini-3-flash-preview",
    messages=[...],
    extra_body={"include_thoughts": True}
)
```

### Inference Tiers (service_tier)

`flex` · `priority` · `standard` (default)

### Gemini-Specific Features via `extra_body`

```python
response = client.chat.completions.create(
    model="gemini-3-flash-preview",
    messages=[...],
    extra_body={
        "cached_content": "cachedContents/abc123",
        "thinking_config": {"thinkingLevel": "high"},
        "safety_settings": [...],
        "tools": [{"google_search": {}}],
        # Video-specific:
        "aspect_ratio": "16:9",
        "resolution": "720p",
        "duration_seconds": 8,
        "frame_rate": 24,
        "seed": 42,
        "negative_prompt": "blurry",
        "style": "cinematic",
        "person_generation": "allow_adult",
        # Image reference:
        "reference_images": [...],
        "image": {...},
        "last_frame": {...}
    }
)
```

### Limitations

- **Beta status:** "Support for the OpenAI libraries is still in beta while we extend feature support"
- Unsupported parameters are "silently ignored"
- File upload/download requires `genai` client (not OpenAI SDK)

---

## 32. Vertex AI / Enterprise Platform

The Enterprise Agent Platform uses Google Cloud's Vertex AI backend:

```python
from google import genai

# Enterprise / Vertex AI
client = genai.Client(
    vertexai=True,
    project='your-gcp-project-id',
    location='us-central1'
)
```

**Key differences:**

- Authentication: Google Cloud service accounts (not API keys)
- Access: Requires Google Cloud project
- Features: Supervised fine-tuning, enterprise-grade SLAs
- Models: Same model IDs as Developer API

For complete Vertex AI / Enterprise documentation: https://cloud.google.com/vertex-ai/generative-ai/docs/

---

## Quick Reference: Model ID Cheat Sheet

```
# Current generation (Gemini 3)
gemini-3.1-pro-preview              # Most capable, reasoning + all modalities
gemini-3.1-pro-preview-customtools  # Agentic variant (bash + custom tools)
gemini-3-flash-preview              # Fast, capable, computer use
gemini-3.1-flash-lite               # Cost-efficient workhorse

# Image generation models
gemini-3.1-flash-image-preview      # Fast image gen (0.5K-4K, ultra-wide)
gemini-3-pro-image-preview          # Professional image gen

# TTS models
gemini-3.1-flash-tts-preview        # Single & multi-speaker TTS
gemini-2.5-flash-preview-tts        # TTS
gemini-2.5-pro-preview-tts          # TTS

# Gemini 2.5 series
gemini-2.5-pro                      # Previous flagship
gemini-2.5-flash                    # Best price-performance
gemini-2.5-flash-lite               # Most cost-efficient

# Embeddings
gemini-embedding-2                  # Multimodal (latest)
gemini-embedding-001                # Text-only

# Generative media
imagen-4
imagen-4-ultra
veo-3.1-generate-preview
lyria-3-pro
lyria-3-clip
```

---

## Quick Reference: Key Limits

| Resource                   | Limit            |
| -------------------------- | ---------------- |
| Image inline request       | 20 MB total      |
| Max images per request     | 3,600            |
| Max audio duration         | 9.5 hours        |
| Max video (File API, paid) | 20 GB            |
| Max video (inline)         | 100 MB           |
| Max video (free File API)  | 2 GB             |
| Max PDF size               | 50 MB            |
| Max PDF pages              | 1,000            |
| Max file size (Files API)  | 2 GB             |
| File lifetime (Files API)  | 48 hours         |
| Storage quota (Files API)  | 20 GB/project    |
| Max URL context URLs       | 20               |
| Max URL content size       | 34 MB            |
| TTS context window         | 32k tokens       |
| Live API input audio       | PCM 16kHz 16-bit |
| Live API output audio      | PCM 24kHz 16-bit |
| Code execution runtime     | 30 seconds       |
| Most model context         | 1,048,576 tokens |
| Most model output          | 65,536 tokens    |

---

## Quick Reference: SDK Methods

```python
# Python google-genai SDK
client.models.generate_content(model, contents, config)
client.models.generate_content_stream(model, contents, config)
client.models.count_tokens(model, contents)
client.models.embed_content(model, contents, config)
client.models.get(model)
client.models.list()

client.chats.create(model, history, config)
chat.send_message(message)
chat.send_message_stream(message)
chat.get_history()

client.files.upload(file)
client.files.get(name)
client.files.list()
client.files.delete(name)

client.caches.create(model, config)
client.caches.get(name)
client.caches.list()
client.caches.update(name, config)
client.caches.delete(name)

client.batches.create(model, src, config)
client.batches.get(name)
client.batches.list()
client.batches.cancel(name)
client.batches.delete(name)
```

```javascript
// JavaScript @google/genai SDK
ai.models.generateContent({ model, contents, config });
ai.models.generateContentStream({ model, contents, config });
ai.models.countTokens({ model, contents });
ai.models.embedContent({ model, contents, config });

ai.chats.create({ model, history, config });
chat.sendMessage({ message });
chat.sendMessageStream({ message });

ai.files.upload({ file });
ai.files.get({ name });
ai.files.list();
ai.files.delete({ name });
```

---

_Last updated: May 2026. Source: ai.google.dev/gemini-api/docs_
