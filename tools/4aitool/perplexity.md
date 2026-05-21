# Perplexity AI API — Comprehensive Reference

# UPDATED — 2026-05-18: Added Cache Read Pricing column (Agent API), fixed contextualized embeddings T1-3 rate limit (835, not 850), added Sonar T1/T3 rate limit rows, added Claude Code to MCP server list.

> Compiled from official docs at https://docs.perplexity.ai — May 2026
> Focus: Current models only. Deprecated models excluded.

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Authentication](#2-authentication)
3. [APIs Overview](#3-apis-overview)
4. [Agent API](#4-agent-api)
   - 4.1 Endpoint & Request Schema
   - 4.2 All Models (with pricing)
   - 4.3 Tools
   - 4.4 Presets
   - 4.5 Streaming
   - 4.6 Structured Outputs
   - 4.7 Model Fallback
   - 4.8 Image Attachments
   - 4.9 Function Calling
   - 4.10 Response Schema
5. [Sonar API](#5-sonar-api)
   - 5.1 Model Cards
   - 5.2 Search Modes
   - 5.3 Citations & search_results
   - 5.4 Pricing
6. [Search API](#6-search-api)
7. [Embeddings API](#7-embeddings-api)
8. [Rate Limits & Usage Tiers](#8-rate-limits--usage-tiers)
9. [Pricing Summary](#9-pricing-summary)
10. [SDK Installation](#10-sdk-installation)
11. [Changelog (Current Era)](#11-changelog-current-era)

---

## 1. Platform Overview

The Perplexity API Platform provides real-time, web-wide research and Q&A capabilities through four main APIs:

| API                | Purpose                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Agent API**      | Multi-provider LLM access (OpenAI, Anthropic, Google, xAI, etc.) with integrated web search tools and transparent first-party pricing |
| **Sonar API**      | Perplexity's own web-grounded conversational AI with citations (OpenAI-compatible chat endpoint)                                      |
| **Search API**     | Raw, ranked web search results with domain/language filtering; no LLM processing                                                      |
| **Embeddings API** | High-quality text embeddings for semantic search and RAG; standard and contextualized variants                                        |

Console: https://console.perplexity.ai
API base URL: `https://api.perplexity.ai`
Documentation index: https://docs.perplexity.ai/llms.txt

---

## 2. Authentication

### API Key

- Generated in the console at https://console.perplexity.ai
- **Shown only once** at creation — cannot be retrieved afterward (one-time reveal model, enforced April 2026)
- Store securely; never expose in client-side code
- Environment variable: `PERPLEXITY_API_KEY` (auto-detected by both official SDKs)

### Request Header

```http
Authorization: Bearer <YOUR_API_KEY>
```

### Key Management Features

- Key rotation system with seamless transitions and audit trails
- Programmatic endpoints exist for generating and revoking tokens
- Zero-downtime rotation strategies supported
- Organization/API group management available in console

---

## 3. APIs Overview

### Endpoints

| API                          | Method | Endpoint                                                 |
| ---------------------------- | ------ | -------------------------------------------------------- |
| Agent API                    | POST   | `https://api.perplexity.ai/v1/agent`                     |
| Agent API (OpenAI alias)     | POST   | `https://api.perplexity.ai/v1/responses`                 |
| Sonar API (chat completions) | POST   | `https://api.perplexity.ai/chat/completions`             |
| Sonar API (async)            | POST   | (async endpoint with polling)                            |
| Search API                   | POST   | `https://api.perplexity.ai/search`                       |
| Embeddings API               | POST   | (standard embeddings endpoint)                           |
| Models list                  | GET    | `https://api.perplexity.ai/v1/models` (no auth required) |

---

## 4. Agent API

The Agent API is described as "a multi-provider, interoperable API specification for building LLM applications." It provides access to frontier models from OpenAI, Anthropic, Google, xAI, NVIDIA, and Perplexity itself through a single unified endpoint with no provider markup on pricing.

### 4.1 Endpoint & Request Schema

**Endpoint:** `POST https://api.perplexity.ai/v1/agent`  
**OpenAI-compatible alias:** `POST https://api.perplexity.ai/v1/responses`

#### Request Parameters

| Parameter           | Type            | Default | Description                                                                                          |
| ------------------- | --------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `model`             | string          | —       | Model ID with provider prefix (e.g., `"openai/gpt-5.4"`). Takes lower precedence than `models` array |
| `models`            | array\<string\> | —       | Up to 5 model IDs for automatic failover chain. Overrides `model` when both provided                 |
| `preset`            | string          | —       | Pre-configured setup name (e.g., `"pro-search"`). Bundles model, tools, system prompt, token limits  |
| `input`             | string          | —       | **Required.** User query or message                                                                  |
| `instructions`      | string          | —       | System-level guidance for the model                                                                  |
| `tools`             | array           | —       | Array of tool objects to enable (e.g., `[{"type": "web_search"}]`)                                   |
| `temperature`       | float           | —       | Generation randomness                                                                                |
| `top_p`             | float           | —       | Nucleus sampling                                                                                     |
| `max_output_tokens` | integer         | —       | Maximum tokens in the response                                                                       |
| `frequency_penalty` | float           | —       | Penalizes repeated tokens                                                                            |
| `presence_penalty`  | float           | —       | Penalizes tokens already in context                                                                  |
| `stream`            | boolean         | `false` | Enable streaming SSE response                                                                        |
| `response_format`   | object          | —       | JSON schema for structured outputs (see section 4.6)                                                 |
| `max_steps`         | integer         | —       | Maximum reasoning/tool-use iterations (1–50 depending on preset)                                     |
| `reasoning_effort`  | string          | —       | `"low"`, `"medium"`, or `"high"` — controls reasoning depth                                          |

#### Notes

- Both `model` and `preset` are optional but at least one should be provided unless using `models`
- `instructions` replaces system message (Agent API uses `input`/`instructions` pattern, not `messages`)
- Not all third-party models support all features (e.g., reasoning, tools)

### 4.2 All Models (Agent API)

Model IDs use `provider/model-name` prefix notation.

#### Perplexity

| Model ID           | Input $/1M | Output $/1M | Cache Read $/1M | Notes                                             |
| ------------------ | ---------- | ----------- | --------------- | ------------------------------------------------- |
| `perplexity/sonar` | $0.25      | $2.50       | $0.0625         | Perplexity's lightweight model with web grounding |

#### Anthropic

| Model ID                      | Input $/1M | Output $/1M | Cache Read $/1M |
| ----------------------------- | ---------- | ----------- | --------------- |
| `anthropic/claude-opus-4-7`   | $5         | $25         | $0.50           |
| `anthropic/claude-opus-4-6`   | $5         | $25         | $0.50           |
| `anthropic/claude-opus-4-5`   | $5         | $25         | $0.50           |
| `anthropic/claude-sonnet-4-6` | $3         | $15         | $0.30           |
| `anthropic/claude-sonnet-4-5` | $3         | $15         | $0.30           |
| `anthropic/claude-haiku-4-5`  | $1         | $5          | $0.10           |

#### OpenAI

| Model ID              | Input $/1M | Output $/1M | Cache Read $/1M |
| --------------------- | ---------- | ----------- | --------------- |
| `openai/gpt-5.5`      | $5         | $30         | $0.50           |
| `openai/gpt-5.4`      | $2.50      | $15         | $0.25           |
| `openai/gpt-5.4-mini` | $0.75      | $4.50       | $0              |
| `openai/gpt-5.4-nano` | $0.20      | $1.25       | $0              |
| `openai/gpt-5.2`      | $1.75      | $14         | $0.175          |
| `openai/gpt-5.1`      | $1.25      | $10         | $0.125          |
| `openai/gpt-5`        | $1.25      | $10         | $0.125          |
| `openai/gpt-5-mini`   | $0.25      | $2          | $0.025          |

#### Google

| Model ID                               | Input $/1M | Output $/1M | Cache Read $/1M | Notes                     |
| -------------------------------------- | ---------- | ----------- | --------------- | ------------------------- |
| `google/gemini-3.1-pro-preview`        | $2–4       | $12–18      | 90% discount    | Context-dependent pricing |
| `google/gemini-3-flash-preview`        | $0.50      | $3          | 90% discount    |                           |
| `google/gemini-3.1-flash-lite`         | $0.25      | $1.50       | 90% discount    |                           |
| `google/gemini-3.1-flash-lite-preview` | $0.25      | $1.50       | 90% discount    |                           |

**Note:** `google/gemini-2.5-flash`, `google/gemini-2.5-pro`, `google/gemini-3-pro-preview` were deprecated/removed March 2026.

#### xAI

| Model ID                      | Input $/1M | Output $/1M | Cache Read $/1M |
| ----------------------------- | ---------- | ----------- | --------------- |
| `xai/grok-4.3`                | $1.25      | $2.50       | $0.20           |
| `xai/grok-4.20-reasoning`     | $1.25      | $2.50       | $0.20           |
| `xai/grok-4.20-non-reasoning` | $1.25      | $2.50       | $0.20           |
| `xai/grok-4.20-multi-agent`   | $1.25      | $2.50       | $0.20           |

#### NVIDIA

| Model ID                            | Input $/1M | Output $/1M | Cache Read $/1M |
| ----------------------------------- | ---------- | ----------- | --------------- |
| `nvidia/nemotron-3-super-120b-a12b` | $0.25      | $2.50       | —               |

**Key rule:** All pricing reflects "direct first-party provider pricing with no markup." Prices updated monthly. Use `GET /v1/models` (no auth required) to get the current model list.

### 4.3 Tools

Tools are enabled per-request via the `tools` array. The model autonomously decides when to invoke them based on the query and instructions.

#### web_search

**Cost:** $0.005 per invocation ($5.00 per 1,000 searches) + token costs

Enable: `tools=[{"type": "web_search"}]`

**Configuration filters** (nested in the tool object or at request level):

| Filter                  | Type            | Description                                                                       |
| ----------------------- | --------------- | --------------------------------------------------------------------------------- |
| `search_domain_filter`  | array\<string\> | Max 20 domains. Allowlist or denylist mode. Use `"-domain.com"` prefix to exclude |
| `search_recency_filter` | string          | Time period: `"hour"`, `"day"`, `"week"`, `"month"`, `"year"`                     |
| `search_after_date`     | string          | Results after date in M/D/YYYY format                                             |
| `search_before_date`    | string          | Results before date in M/D/YYYY format                                            |
| `max_tokens_per_page`   | integer         | Control content extraction volume per result                                      |

**Use cases:** Breaking news, live events, current information, academic publications.

#### fetch_url

**Cost:** $0.0005 per request ($0.50 per 1,000 fetches) + token costs

Enable: `tools=[{"type": "fetch_url"}]`

Retrieves complete content from a specific URL rather than running a discovery search. Best for:

- Full article or document content retrieval
- Specific URL content verification
- Complete page analysis

Best practice: "Combine `web_search` and `fetch_url` for comprehensive research: search to find relevant pages, then fetch full content from the most relevant results."

#### finance_search

**Cost:** $0.005 per invocation ($5.00 per 1,000 invocations) + token costs

Enable: `tools=[{"type": "finance_search"}]`

Retrieves structured financial and market data. Covers:

- Company quotes, profiles, peers, market metadata
- Financials: income statements, balance sheets, cash flow (quarterly/annual), key ratios
- Real-time pricing, OHLCV ranges (1-minute to 1-month), pre/after-hours data
- Earnings: call transcripts, report filings, beat/miss history, guidance
- Segment/KPI tracking: revenue/profit by segment, geography, ARPU, subscriber counts, GMV
- Analyst coverage: forward revenue/EPS estimates, cover count, estimate changes
- Market activity: top gainers, losers, most active symbols
- Ownership and corporate actions: insider activity, splits, market events
- ETF and index details: constituents, shares, weights, market values

Response includes `finance_results` objects with structured data tables, model analysis, source URLs, and ticker symbols.

**Recommended configs:**

| Use Case               | Model                       | Max Steps | Cost Level |
| ---------------------- | --------------------------- | --------- | ---------- |
| Live quotes            | `perplexity/sonar`          | 1         | Low        |
| Single-company history | `openai/gpt-5.5`            | 5         | Medium     |
| Multi-company analysis | `anthropic/claude-opus-4-7` | 10        | High       |

#### people_search

**Cost:** $0.005 per invocation ($5.00 per 1,000 invocations)

Enable: `tools=[{"type": "people_search"}]`

Locates professionals and retrieves: names, job titles, companies, backgrounds. Powers lead research, recruiting pipelines, organizational mapping.

**Query optimization examples:**

- `"Find John Smith who works at Google"` (name + company)
- `"Who is the Head of Design at Figma?"` (role + company)
- `"Find marketing directors in San Francisco"` (role + location)
- `"Find machine learning researchers at Stanford"` (role + field)

Note: "The tool works best for people-related queries — it is not suited for general web search."

**Tiered configurations:**

| Tier          | Model                           | Reasoning | Tools                                | Max Steps |
| ------------- | ------------------------------- | --------- | ------------------------------------ | --------- |
| fast          | `google/gemini-3-flash-preview` | low       | web_search                           | 1         |
| pro           | `openai/gpt-5-mini`             | medium    | people_search, web_search, fetch_url | 5         |
| deep          | `google/gemini-3-flash-preview` | high      | all three                            | 10        |
| advanced-deep | `openai/gpt-5`                  | medium    | all three                            | 10        |
| ultra-deep    | `openai/gpt-5.5`                | high      | all three                            | 50        |

#### Custom Function Calling (tools array)

**Cost:** No additional charge; standard token pricing applies.

Define custom functions to connect the model to databases, APIs, and business logic.

```python
tools=[
    {
        "type": "function",
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "City name"}
            },
            "required": ["location"]
        }
    }
]
```

**Critical:** The `arguments` field in function_call responses returns a **JSON string** requiring parsing (`json.loads()` / `JSON.parse()`).

**Flow:**

1. Send request with tool definitions
2. Model returns `function_call` output item
3. Execute locally and return results as `function_call_output`
4. Model generates final response incorporating results

### 4.4 Presets

Presets are pre-configured setups bundling a model, token limits, reasoning steps, system prompt, and tools for specific use cases.

**Two usage modes:**

- **Dynamic (recommended):** Call by name — automatically receives Perplexity's latest optimized configuration without code changes
- **Frozen:** Copy the preset's current underlying settings into your request to lock in a specific setup

**Available Presets:**

| Preset                   | Best For                       | Model                           | Max Steps |
| ------------------------ | ------------------------------ | ------------------------------- | --------- |
| `fast-search`            | Quick, straightforward queries | `google/gemini-3-flash-preview` | 1         |
| `pro-search`             | Balanced, researched answers   | `openai/gpt-5.1`                | 3         |
| `deep-research`          | Complex, in-depth analysis     | `openai/gpt-5.2`                | 10        |
| `advanced-deep-research` | Institutional-grade research   | `anthropic/claude-opus-4-6`     | 10        |

**Customizing a preset** (override individual params while keeping defaults):

```python
response = client.responses.create(
    preset="pro-search",
    model="anthropic/claude-sonnet-4-6",  # Override model
    max_steps=5,                           # Override steps
    input="Your query here"
)
```

**Preset update policy:** When Perplexity updates presets, changes remain within the same cost/latency profile while optimizing quality. Preset names stay consistent.

### 4.5 Streaming

Enable streaming by setting `stream=True` (Python) or `stream: true` (TypeScript/cURL).

"Streaming allows you to receive partial responses from the Perplexity API as they are generated, rather than waiting for the complete response."

**Python:** Listen for `response.output_text.delta` events containing response chunks  
**TypeScript:** Iterate through stream chunks asynchronously

```python
with client.responses.stream(
    model="openai/gpt-5.4",
    input="Explain quantum computing",
    stream=True
) as stream:
    for event in stream:
        print(event.output_text.delta, end="")
```

**Error types in streaming:**

- `APIConnectionError` — network issues
- `RateLimitError` — 429 exceeded
- `APIStatusError` — other API errors

### 4.6 Structured Outputs

Enforce consistent JSON response formatting using JSON Schema validation.

```python
response = client.responses.create(
    model="openai/gpt-5.4",
    input="List top 3 programming languages",
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "language_list",   # Required: 1-64 alphanumeric chars
            "schema": {
                "type": "object",
                "properties": {
                    "languages": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                }
            }
        }
    }
)
```

**Important notes:**

- "The `name` field is required and must be 1-64 alphanumeric characters."
- "The first request with a new JSON Schema expects to incur delay on the first token" — 10–30 seconds for initial schema preparation; subsequent requests have no delay
- "Requesting links as part of a JSON response may not always work reliably" — use `citations` or `search_results` fields instead for URLs
- "LLM responses will match the specified format unless the output exceeds `max_tokens`"

### 4.7 Model Fallback

Specify up to 5 models in a `models` array for automatic failover. "The API tries each model in order until one succeeds, providing automatic failover when a model is unavailable."

```python
response = client.responses.create(
    models=["openai/gpt-5.4", "openai/gpt-5.2", "openai/gpt-5-mini"],
    input="Your question here"
)
```

- `models` takes precedence over `model` when both provided
- Billing is based on the model that serves the request (not all models in the chain)
- Response `model` field indicates which model processed the request
- Order preferred models first; consider pricing differences when arranging the chain

### 4.8 Image Attachments

**Supported formats:** PNG, JPEG, WEBP, GIF  
**Maximum size:** 50 MB per image (base64 encoding)  
**Remote images:** Must be publicly accessible HTTPS URLs

**Token calculation:** `(width × height) / 750`  
Examples: 1024×768 ≈ 1,048 tokens; 512×512 ≈ 349 tokens  
Image tokens are priced at the model's standard input token rate.

```python
response = client.responses.create(
    model="openai/gpt-5.4",
    input=[
        {
            "type": "input_image",
            "image_url": "https://example.com/image.jpg"
            # OR base64: "data:image/jpeg;base64,{base64_content}"
        },
        {"type": "input_text", "text": "Describe this image"}
    ]
)
```

### 4.9 Response Schema

The Agent API response includes:

```json
{
  "id": "resp_xxx",
  "status": "completed",
  "model": "openai/gpt-5.4",
  "output": [
    {
      "type": "message",
      "content": [{"type": "output_text", "text": "..."}]
    },
    {
      "type": "search_results",
      "results": [...]
    }
  ],
  "usage": {
    "input_tokens": 150,
    "output_tokens": 300,
    "input_tokens_cost": 0.000375,
    "output_tokens_cost": 0.0045,
    "request_cost": 0.005,
    "total_cost": 0.009875
  },
  "completed_at": "2026-05-17T10:00:00Z"
}
```

**Convenience property:** Both SDKs provide `output_text` that aggregates all text content without manual iteration through the output array.

**Cost breakdown fields (added July 2025):**

- `input_tokens_cost` — cost of input tokens
- `output_tokens_cost` — cost of output tokens
- `request_cost` — tool invocation costs
- `total_cost` — total request cost in USD

---

## 5. Sonar API

The Sonar API is Perplexity's own OpenAI-compatible chat completions endpoint for web-grounded conversational AI. It uses the `messages` array format (like OpenAI's `/v1/chat/completions`).

**Endpoint:** `POST https://api.perplexity.ai/chat/completions`

### 5.1 Model Cards

| Model ID              | Type      | Description                                                                                       |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------- |
| `sonar`               | Search    | "Lightweight, cost-effective search model with grounding"                                         |
| `sonar-pro`           | Search    | "Advanced search offering with grounding, supporting complex queries and follow-ups"              |
| `sonar-reasoning-pro` | Reasoning | "Precise reasoning offering with Chain of Thought (CoT)"                                          |
| `sonar-deep-research` | Research  | "Expert-level research model conducting exhaustive searches and generating comprehensive reports" |

**Note:** `sonar-reasoning` (non-pro) was deprecated December 2025. The older `llama-3.1-sonar-*` models were deprecated January 2025. `r1-1776` was removed August 2025.

**Use-case guidance:**

- **sonar / sonar-pro:** Quick factual queries, topic summaries, product comparisons, current events, follow-up conversations
  - NOT suited for multi-step analyses or exhaustive research
- **sonar-reasoning-pro:** Complex analyses requiring step-by-step thinking, logical problem-solving, multi-step reasoning
  - NOT recommended for simple factual queries (overkill)
- **sonar-deep-research:** Comprehensive topic reports, in-depth analysis, synthesis of multiple sources, institutional-grade research
  - Has asynchronous mode with 7-day TTL for long-running research

**Context windows, knowledge cutoffs:** Not published in the model cards page as of May 2026. The documentation does not specify exact context window sizes or knowledge cutoff dates for individual Sonar models.

### 5.2 Search Modes (Sonar API)

Three search context tiers that affect cost, depth, and quality:

| Mode   | Cost Factor          | Best For                           |
| ------ | -------------------- | ---------------------------------- |
| Low    | Cheapest             | Simple queries, cost optimization  |
| Medium | Balanced             | Most use cases                     |
| High   | Most expensive       | Complex queries, thorough research |
| Auto   | Varies by complexity | Let Perplexity decide              |

**Pro Search** (Sonar Pro model only):

- `fast` — standard search, $6/$10/$14 per 1K requests (Low/Medium/High context)
- `pro` — multi-step reasoning through intelligent tool orchestration, $14/$18/$22 per 1K requests
- `auto` — Perplexity decides based on query complexity

Pro Search became generally available November 2025.

### 5.3 Citations & search_results

**Historical note:** The `citations` field was deprecated May 2025 in favor of `search_results`. However, citation tokens are no longer charged (except for Sonar Deep Research).

**search_results field** (added May 2025, returned in Sonar API responses):
Each result object contains:

- `title` — page title
- `url` — source URL
- `snippet` — relevant excerpt
- `date` — publication date
- `last_updated` — content freshness timestamp

**Inline citation format:** Responses include numbered citations in the text (e.g., `[1]`, `[2]`) corresponding to the `search_results` array indices.

**Critical note for structured outputs:** "Requesting links as part of a JSON response may not always work reliably." Always use the `search_results` field to get source URLs rather than asking the model to include them in JSON output.

**Streaming with citations:** In streaming mode, citations/search_results arrive as part of the final delta event, not incrementally with each chunk.

### 5.4 Sonar API Pricing

**Token costs (per 1M tokens):**

| Model                 | Input | Output | Citations | Reasoning tokens | Search queries |
| --------------------- | ----- | ------ | --------- | ---------------- | -------------- |
| `sonar`               | $1    | $1     | —         | —                | —              |
| `sonar-pro`           | $3    | $15    | —         | —                | —              |
| `sonar-reasoning-pro` | $2    | $8     | —         | —                | —              |
| `sonar-deep-research` | $2    | $8     | $2/1M     | $3/1M            | $5/1K queries  |

**Request fees (per 1,000 requests, by search context size):**

| Model                   | Low | Medium | High |
| ----------------------- | --- | ------ | ---- |
| `sonar`                 | $5  | $8     | $12  |
| `sonar-pro` (fast mode) | $6  | $10    | $14  |
| `sonar-pro` (pro mode)  | $14 | $18    | $22  |
| `sonar-reasoning-pro`   | $6  | $10    | $14  |

**Note (April 2025 change):** Citation tokens are no longer charged for `sonar`, `sonar-pro`, and `sonar-reasoning-pro`. Only `sonar-deep-research` still bills citation tokens at $2/1M.

---

## 6. Search API

Delivers real-time ranked web search results without LLM processing. Charges per request only — no token costs.

**Endpoint:** `POST https://api.perplexity.ai/search`

**Price:** $5.00 per 1,000 requests (no token-based pricing)

### Request Parameters

| Parameter                | Type            | Default | Limits             | Description                                        |
| ------------------------ | --------------- | ------- | ------------------ | -------------------------------------------------- |
| `query`                  | string or array | —       | Up to 5 queries    | Single search string or batch array                |
| `max_results`            | integer         | 10      | 1–20               | Number of results per query                        |
| `country`                | string          | —       | ISO 3166-1 alpha-2 | Regional targeting (e.g., `"US"`, `"GB"`)          |
| `search_domain_filter`   | array\<string\> | —       | Max 20 domains     | Allowlist or denylist; use `"-"` prefix to exclude |
| `search_language_filter` | array\<string\> | —       | Up to 10 codes     | ISO 639-1 language codes                           |
| `max_tokens_per_page`    | integer         | 4096    | —                  | Content extraction per result                      |
| `max_tokens`             | integer         | 10,000  | Max 1,000,000      | Total content budget across all results            |

### Response Structure

Each result includes:

```json
{
  "title": "Page title",
  "url": "https://example.com/page",
  "snippet": "Relevant excerpt...",
  "date": "2026-05-01",
  "last_updated": "2026-05-10"
}
```

Multi-query requests group results per query in submission order.

**Rate limits:** Consistent across all tiers — 50 requests per second with 50-request burst capacity (leaky bucket).

**When to use:** Use Search API for raw results feeding custom pipelines. For AI-generated summaries, use Agent API or Sonar API instead.

---

## 7. Embeddings API

Generates text embeddings for semantic search and RAG pipelines. Two approaches: standard (independent texts) and contextualized (related document chunks sharing context).

### Models

| Model ID                     | Dimensions | Context Window | Price            |
| ---------------------------- | ---------- | -------------- | ---------------- |
| `pplx-embed-v1-0.6b`         | 1024       | 32K            | $0.004/1M tokens |
| `pplx-embed-v1-4b`           | 2560       | 32K            | $0.03/1M tokens  |
| `pplx-embed-context-v1-0.6b` | 1024       | 32K            | $0.008/1M tokens |
| `pplx-embed-context-v1-4b`   | 2560       | 32K            | $0.05/1M tokens  |

**Standard models** (`pplx-embed-v1-*`): For isolated texts, individual queries, single sentences.  
**Contextualized models** (`pplx-embed-context-v1-*`): For document chunks that share context with each other; better for RAG document retrieval.

### Technical Details

- Embeddings are **unnormalized**
- Distance metrics: cosine similarity for INT8 variants; Hamming distance for binary variants
- Quantization options: INT8 and BINARY
- MRL (Matryoshka Representation Learning) supported
- No instruction prefix needed
- Pooling: mean pooling

### Rate Limits

| Tier     | Standard QPS | Contextualized QPS |
| -------- | ------------ | ------------------ |
| Tier 0   | 85           | 415                |
| Tier 1–3 | 170          | 835                |
| Tier 4–5 | 335          | 1,670              |

Contextualized embeddings receive 5× higher limits than standard.

---

## 8. Rate Limits & Usage Tiers

### Tier Structure

Tiers are based on **cumulative lifetime spending** (not current balance):

| Tier   | Spending Threshold | Characteristics              |
| ------ | ------------------ | ---------------------------- |
| Tier 0 | $0                 | New accounts, limited access |
| Tier 1 | $50+               | Light usage, basic limits    |
| Tier 2 | $250+              | Regular usage                |
| Tier 3 | $500+              | Heavy usage                  |
| Tier 4 | $1,000+            | Production usage             |
| Tier 5 | $5,000+            | Enterprise usage             |

"Tiers are based on cumulative purchases across your account lifetime, not current balance."

Tier advancement is **automatic** upon reaching spending thresholds. Verify current tier in the API Platform console. Beyond Tier 5, submit a rate limit increase request form.

**Note (April 2025):** All features accessible to all tiers — no Tier 3 requirement. Structured outputs, all search modes, etc. are available from Tier 0.

### Agent API Rate Limits

| Tier     | QPS | Requests/Minute |
| -------- | --- | --------------- |
| Tier 0   | 1   | 50              |
| Tier 1   | 3   | 150             |
| Tier 2   | 8   | 500             |
| Tier 3   | 17  | 1,000           |
| Tier 4–5 | 33  | 2,000           |

### Search API Rate Limits

All tiers: **50 requests per second**, 50-request burst capacity. Uses leaky bucket algorithm. Independent of usage tier.

### Sonar API Rate Limits (by model)

| Model                                       | Tier 0                      | Tier 1  | Tier 2  | Tier 3    | Tier 4    | Tier 5    |
| ------------------------------------------- | --------------------------- | ------- | ------- | --------- | --------- | --------- |
| `sonar`, `sonar-pro`, `sonar-reasoning-pro` | 50 RPM                      | 150 RPM | 500 RPM | 1,000 RPM | 4,000 RPM | 4,000 RPM |
| `sonar-deep-research`                       | 5 RPM                       | 10 RPM  | —       | 40 RPM    | —         | 100 RPM   |
| Async POST                                  | 5 RPM                       | 10 RPM  | —       | 40 RPM    | —         | 100 RPM   |
| Async GET                                   | 3,000–6,000 RPM (all tiers) |         |         |           |           |           |

### Rate Limiting Mechanism

"A leaky bucket algorithm that allows for burst traffic while maintaining strict long-term rate control."

When limits are exceeded:

- Returns HTTP **429** error
- Token refill occurs continuously
- Burst capacity allows short spikes above steady-state limits

---

## 9. Pricing Summary

### Agent API

| Component               | Cost                                                                      |
| ----------------------- | ------------------------------------------------------------------------- |
| Model tokens            | Direct first-party provider pricing (no markup) — see model table in §4.2 |
| `web_search` tool       | $0.005 per invocation                                                     |
| `fetch_url` tool        | $0.0005 per invocation                                                    |
| `people_search` tool    | $0.005 per invocation                                                     |
| `finance_search` tool   | $0.005 per invocation                                                     |
| Custom function calling | No additional charge                                                      |
| Image tokens            | (width × height) / 750 tokens, at model's input rate                      |

### Sonar API

| Model                 | Input | Output | Citations | Reasoning | Search queries | Request fee (per 1K)  |
| --------------------- | ----- | ------ | --------- | --------- | -------------- | --------------------- |
| `sonar`               | $1/1M | $1/1M  | free      | —         | —              | $5–$12 (Low–High)     |
| `sonar-pro`           | $3/1M | $15/1M | free      | —         | —              | $6–$22 (Low–Pro High) |
| `sonar-reasoning-pro` | $2/1M | $8/1M  | free      | —         | —              | $6–$14                |
| `sonar-deep-research` | $2/1M | $8/1M  | $2/1M     | $3/1M     | $5/1K          | —                     |

### Search API

$5.00 per 1,000 requests (no token pricing)

### Embeddings API

| Model                        | Price            |
| ---------------------------- | ---------------- |
| `pplx-embed-v1-0.6b`         | $0.004/1M tokens |
| `pplx-embed-v1-4b`           | $0.03/1M tokens  |
| `pplx-embed-context-v1-0.6b` | $0.008/1M tokens |
| `pplx-embed-context-v1-4b`   | $0.05/1M tokens  |

---

## 10. SDK Installation

### Official SDKs

```bash
# Python
pip install perplexityai

# TypeScript/JavaScript
npm install @perplexity-ai/perplexity_ai
```

### OpenAI SDK Compatibility

The Agent API and Sonar API are compatible with the OpenAI SDK by configuring the base URL:

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_PERPLEXITY_API_KEY",
    base_url="https://api.perplexity.ai/v1"
)

# Agent API via /v1/responses alias
response = client.responses.create(
    model="openai/gpt-5.4",
    input="What happened today?"
)

# Sonar API via /chat/completions
# (set base_url to "https://api.perplexity.ai")
response = client.chat.completions.create(
    model="sonar-pro",
    messages=[{"role": "user", "content": "What's the latest news?"}]
)
```

### Native SDK Pattern (Python)

```python
from perplexityai import Perplexity

client = Perplexity()  # Auto-reads PERPLEXITY_API_KEY env var

# Agent API
response = client.responses.create(
    model="openai/gpt-5.4",
    input="Search for recent AI breakthroughs",
    tools=[{"type": "web_search"}]
)
print(response.output_text)  # Convenience aggregator

# Model fallback
response = client.responses.create(
    models=["openai/gpt-5.4", "openai/gpt-5.2", "openai/gpt-5-mini"],
    input="Your question"
)
```

### TypeScript/JavaScript

```typescript
import { Perplexity } from "@perplexity-ai/perplexity_ai";

const client = new Perplexity(); // Auto-reads PERPLEXITY_API_KEY

const response = await client.responses.create({
  model: "openai/gpt-5.4",
  input: "Latest developments in quantum computing",
  tools: [{ type: "web_search" }],
});

console.log(response.output_text);
```

### Framework Integrations

- **LangChain** — native integration available
- **Haystack** — native integration available
- **Vercel AI SDK** — compatible (added December 2025)
- **n8n** — native Perplexity node (added April 2026)
- **OpenClaw** terminal AI agent integration
- **AWS Marketplace** — available for consolidated billing (April 2026)

### MCP Server

One-click installation for Cursor, VS Code, Claude Desktop, and Claude Code (November 2025).

---

## 11. Changelog (Current Era)

### May 2026

- **Finance Search Tool Launch** — `finance_search` tool added to Agent API; retrieves structured financial and market data: quotes, financials, earnings, analyst estimates, segment KPIs, ETF constituents

### April 2026

- Agent API adds `anthropic/claude-opus-4-7`, `openai/gpt-5.5`, `xai/grok-4.20-reasoning`
- **API key security upgrade:** Keys now shown only once at creation; one-time reveal model
- AWS Marketplace availability for consolidated billing
- n8n native Perplexity node
- New `GET /v1/models` endpoint (no authentication required)

### March 2026

- Added: `openai/gpt-5.4`, `nvidia/nemotron-3-super-120b-a12b`, `anthropic/claude-sonnet-4-6`, `google/gemini-3.1-pro-preview`
- **Removed/deprecated:** `google/gemini-2.5-flash`, `google/gemini-2.5-pro`, `google/gemini-3-pro-preview`
- Canonical Agent API endpoint: `/v1/agent` (with `/v1/responses` alias for OpenAI SDK compatibility)

### February 2026

- Agent API general availability with production guidance
- Embeddings API launch with contextualized embeddings support

### December 2025

- `sonar-reasoning` (non-pro) deprecated and removed
- Media Classifier system for automatic visual content detection (exclusive to `sonar-pro`)
- Search API: `max_tokens` parameter, `last_updated_filter` support, Vercel AI SDK compatibility

### November 2025

- **Pro Search general availability** — "multi-step reasoning through intelligent tool orchestration"
- MCP Server one-click installation for Cursor, VS Code, Claude Desktop, and Claude Code

### October 2025

- Official Python and TypeScript SDKs released
- Interactive Search API Playground (no key required)
- New parameters: `language_preference`, `search_domain_filter` enhancements, date/time filters

### September 2025

- File attachments: PDF, DOC, DOCX, TXT, RTF via URL or upload (Sonar API)
- Standalone Search API for raw ranked results without LLM processing
- API Key Rotation system with audit trails

### August 2025

- `r1-1776` removed; migration to `sonar-reasoning-pro` recommended

### July 2025

- Cost transparency: responses now include `input_tokens_cost`, `output_tokens_cost`, `request_cost`, `total_cost`
- SEC filings filter: `search_domain: "sec"` for 10-K, 10-Q, 8-K documents

### June 2025

- `latest_updated` field for content freshness filtering
- Academic filter (`search_mode: "academic"`) for peer-reviewed sources

### May 2025

- `reasoning_effort` parameter for `sonar-deep-research` (values: `"low"`, `"medium"`, `"high"`)
- Asynchronous API for deep research with 7-day result TTL
- `search_results` field added to responses; `citations` field deprecated (but citation tokens no longer charged)

### April 2025

- New API Portal at console.perplexity.ai
- Location filtering support
- Image upload for all users (previously restricted)
- Date range filtering
- Citation tokens no longer charged (except Sonar Deep Research)
- All features accessible to all tiers (removed Tier 3 requirements)

### March 2025

- Structured outputs available to all users (removed Tier 3 requirement)
- Three search modes introduced: High, Medium, Low
- Legacy billing supported 30 days post-April 18, 2025

### January 2025

- Deprecated: `llama-3.1-sonar-small-128k-online`, `llama-3.1-sonar-large-128k-online`, `llama-3.1-sonar-huge-128k-online`
- New `sonar` and `sonar-pro` models with built-in citations, automatic rate limit scaling

---

## 12. Unique Features vs. Other Providers

| Feature                                | Perplexity                   | OpenAI               | Anthropic  |
| -------------------------------------- | ---------------------------- | -------------------- | ---------- |
| Multi-provider unified API (Agent API) | Yes — 6 providers, no markup | No                   | No         |
| Built-in real-time web search          | Yes (native tool)            | Via assistants/tools | Via tools  |
| Finance-specific search tool           | Yes (`finance_search`)       | No                   | No         |
| People/professional search             | Yes (`people_search`)        | No                   | No         |
| Standalone ranked search results API   | Yes (Search API)             | No                   | No         |
| Per-request cost breakdown in response | Yes (full USD breakdown)     | No                   | No         |
| Model fallback chains                  | Yes (up to 5)                | No                   | No         |
| Presets (named configs)                | Yes                          | No                   | No         |
| Contextualized embeddings              | Yes                          | No                   | No         |
| OpenAI SDK compatible                  | Yes                          | Native               | No         |
| Free models endpoint (no auth)         | Yes (`GET /v1/models`)       | No                   | No         |
| Tier-based auto-scaling rate limits    | Yes (6 tiers)                | Org-based            | Tier-based |
| Usage tier by cumulative spend         | Yes (lifetime)               | No                   | By spend   |
| Async deep research mode               | Yes (7-day TTL)              | No                   | No         |

---

## 13. Quick Reference — Model Selection Guide

### "I need web search + AI answer (simple)"

→ **Sonar API** with `sonar` model ($1/$1 per 1M + $5–$12/1K requests)

### "I need web search + AI answer (complex, multi-step)"

→ **Sonar API** with `sonar-pro` in pro mode, OR **Agent API** with `preset="pro-search"`

### "I need step-by-step reasoning + web search"

→ **Sonar API** with `sonar-reasoning-pro` ($2/$8 per 1M)

### "I need deep research report"

→ **Sonar API** with `sonar-deep-research` (async recommended for long research)

### "I need to use GPT-5.5 / Claude Opus 4.7 / Gemini with web search"

→ **Agent API** with specific model ID + `tools=[{"type": "web_search"}]`

### "I need financial market data"

→ **Agent API** with `tools=[{"type": "finance_search"}]`

### "I need raw search results for my own pipeline"

→ **Search API** ($5/1K requests, no token costs)

### "I need embeddings for RAG"

→ **Embeddings API** — `pplx-embed-v1-0.6b` for simple/fast; `pplx-embed-context-v1-4b` for best quality document chunks

### "I want the cheapest option with web search"

→ **Agent API** with `openai/gpt-5-mini` ($0.25/$2 per 1M) + `web_search` tool, or `perplexity/sonar` ($0.25/$2.50)

---

_Last updated: May 2026. Source: https://docs.perplexity.ai_
