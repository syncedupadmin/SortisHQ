# Anthropic Claude API — Comprehensive Reference

# UPDATED — 2026-05-18: Added Haiku 3.5 batch + cache pricing, deprecated model aliases (claude-sonnet-4-0, claude-opus-4-0), inference_geo 400 warning, fast mode rate limit note.

> Compiled from official docs: platform.claude.com — May 2026

---

## Table of Contents

1. [Current Models](#1-current-models)
2. [Authentication & Headers](#2-authentication--headers)
3. [API Versioning](#3-api-versioning)
4. [Messages API — Full Spec](#4-messages-api--full-spec)
5. [Response Object](#5-response-object)
6. [Tool Use / Function Calling](#6-tool-use--function-calling)
7. [Extended Thinking & Adaptive Thinking](#7-extended-thinking--adaptive-thinking)
8. [Vision (Image Input)](#8-vision-image-input)
9. [Files API](#9-files-api)
10. [Streaming (SSE)](#10-streaming-sse)
11. [Prompt Caching](#11-prompt-caching)
12. [Message Batches API](#12-message-batches-api)
13. [Computer Use](#13-computer-use)
14. [Rate Limits](#14-rate-limits)
15. [Errors](#15-errors)
16. [Pricing](#16-pricing)
17. [Beta Headers Reference](#17-beta-headers-reference)
18. [SDK Usage — Python & TypeScript](#18-sdk-usage--python--typescript)
19. [Token Counting API](#19-token-counting-api)

---

## 1. Current Models

Base URL: `https://api.anthropic.com`

### Currently Active (Recommended) Models

| Feature                       | Claude Opus 4.7                                                | Claude Sonnet 4.6                          | Claude Haiku 4.5                           |
| :---------------------------- | :------------------------------------------------------------- | :----------------------------------------- | :----------------------------------------- |
| **API ID**                    | `claude-opus-4-7`                                              | `claude-sonnet-4-6`                        | `claude-haiku-4-5-20251001`                |
| **API alias**                 | `claude-opus-4-7`                                              | `claude-sonnet-4-6`                        | `claude-haiku-4-5`                         |
| **AWS Bedrock ID**            | `anthropic.claude-opus-4-7`                                    | `anthropic.claude-sonnet-4-6`              | `anthropic.claude-haiku-4-5-20251001-v1:0` |
| **Vertex AI ID**              | `claude-opus-4-7`                                              | `claude-sonnet-4-6`                        | `claude-haiku-4-5@20251001`                |
| **Description**               | Most capable GA model for complex reasoning and agentic coding | Best combination of speed and intelligence | Fastest with near-frontier intelligence    |
| **Input pricing**             | $5 / MTok                                                      | $3 / MTok                                  | $1 / MTok                                  |
| **Output pricing**            | $25 / MTok                                                     | $15 / MTok                                 | $5 / MTok                                  |
| **Extended thinking**         | No (use adaptive)                                              | Yes                                        | Yes                                        |
| **Adaptive thinking**         | Yes                                                            | Yes                                        | No                                         |
| **Priority Tier**             | Yes                                                            | Yes                                        | Yes                                        |
| **Context window**            | 1M tokens (~555k words)                                        | 1M tokens (~750k words)                    | 200k tokens (~150k words)                  |
| **Max output**                | 128k tokens                                                    | 64k tokens                                 | 64k tokens                                 |
| **Reliable knowledge cutoff** | Jan 2026                                                       | Aug 2025                                   | Feb 2025                                   |
| **Training data cutoff**      | Jan 2026                                                       | Jan 2026                                   | Jul 2025                                   |
| **Comparative latency**       | Moderate                                                       | Fast                                       | Fastest                                    |

> NOTE: Opus 4.7 uses a new tokenizer that may use up to 35% more tokens for the same fixed text vs prior models.

> NOTE: Max output values above apply to the synchronous Messages API. On the Message Batches API, Opus 4.7, Opus 4.6, and Sonnet 4.6 support up to **300k output tokens** using the `output-300k-2026-03-24` beta header.

### Special / Preview Models

- **Claude Mythos Preview** — Offered as research preview for defensive cybersecurity workflows via Project Glasswing. Invitation-only. No self-serve sign-up. Adaptive thinking is default; `display` defaults to `"omitted"`.

### Legacy / Still Available Models

| Model             | API ID                                                  | Context | Max Output | Input $  | Output $ | Notes                                 |
| :---------------- | :------------------------------------------------------ | :------ | :--------- | :------- | :------- | :------------------------------------ |
| Claude Opus 4.6   | `claude-opus-4-6`                                       | 1M      | 128k       | $5/MTok  | $25/MTok | Adaptive thinking recommended         |
| Claude Sonnet 4.5 | `claude-sonnet-4-5-20250929`                            | 200k    | 64k        | $3/MTok  | $15/MTok |                                       |
| Claude Opus 4.5   | `claude-opus-4-5-20251101`                              | 200k    | 64k        | $5/MTok  | $25/MTok |                                       |
| Claude Opus 4.1   | `claude-opus-4-1-20250805`                              | 200k    | 32k        | $15/MTok | $75/MTok |                                       |
| Claude Sonnet 4   | `claude-sonnet-4-20250514` (alias: `claude-sonnet-4-0`) | 200k    | 64k        | $3/MTok  | $15/MTok | **DEPRECATED** — retire June 15, 2026 |
| Claude Opus 4     | `claude-opus-4-20250514` (alias: `claude-opus-4-0`)     | 200k    | 32k        | $15/MTok | $75/MTok | **DEPRECATED** — retire June 15, 2026 |

> WARNING: Claude Sonnet 4 (`claude-sonnet-4-20250514`) and Claude Opus 4 (`claude-opus-4-20250514`) are deprecated and will be **retired June 15, 2026**. Migrate to Sonnet 4.6 and Opus 4.7 respectively.

### Model Notes

- Every Claude model ID is a pinned snapshot. Starting with Claude 4.6 generation, dateless format IDs are also pinned snapshots, NOT evergreen pointers.
- For pre-4.6 models, alias entries (e.g., `claude-sonnet-4-5`) resolve to a dated model ID.
- All current Claude models support text and image input, text output, multilingual capabilities, and vision.
- Query model capabilities programmatically with the Models API (`GET /v1/models`).

---

## 2. Authentication & Headers

### Required Headers on Every Request

| Header              | Value                                                                                           | Required                              |
| ------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------- |
| `x-api-key`         | Your API key from Console                                                                       | One of `x-api-key` or `Authorization` |
| `Authorization`     | `Bearer <token>` — short-lived token from `POST /v1/oauth/token` (Workload Identity Federation) | One of `x-api-key` or `Authorization` |
| `anthropic-version` | `2023-06-01`                                                                                    | Yes                                   |
| `content-type`      | `application/json`                                                                              | Yes                                   |

### Getting API Keys

- Create keys at: https://platform.claude.com/settings/keys
- Use Workspaces to segment API keys and control spend

### Authentication Methods

1. **API Key** (`x-api-key` header): Standard method for direct API access
2. **Workload Identity Federation** (`Authorization: Bearer <token>`): For cloud environments using IAM

### Response Headers

| Header                      | Description                                 |
| --------------------------- | ------------------------------------------- |
| `request-id`                | Globally unique identifier for the request  |
| `anthropic-organization-id` | Organization ID associated with the API key |

### Setting Up (Example)

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{...}'
```

---

## 3. API Versioning

Current version: **`2023-06-01`**

Send in every request:

```
anthropic-version: 2023-06-01
```

SDK handles this automatically.

### Version History

- **`2023-06-01`** (current):
  - New SSE streaming format: incremental completions (not cumulative)
  - All events are named events (not data-only)
  - Removed `data: [DONE]` event
  - Removed legacy `exception` and `truncated` values
- **`2023-01-01`**: Initial release (deprecated)

### Backward Compatibility Guarantees

For a given version, Anthropic will preserve:

- Existing input parameters
- Existing output parameters

Anthropic may add:

- Additional optional inputs
- Additional values to output
- Change conditions for specific error types
- Add new variants to enum-like output values (e.g., streaming event types)

---

## 4. Messages API — Full Spec

**Endpoint:** `POST /v1/messages`

### Required Parameters

#### `model` (string, required)

The model to use. See [Current Models](#1-current-models) for valid IDs.

#### `messages` (array, required)

Input conversation messages. Each message:

- `role`: `"user"` | `"assistant"`
- `content`: `string` OR `array of ContentBlockParam`

Rules:

- Models are trained on alternating user/assistant turns
- Consecutive same-role turns are combined into a single turn
- Limit: 100,000 messages per request
- Optional: Final `assistant` message can be a partial message to constrain Claude's response

```json
[{ "role": "user", "content": "Hello, Claude" }]
```

```json
[
  { "role": "user", "content": "Hello there." },
  { "role": "assistant", "content": "Hi, I'm Claude. How can I help?" },
  { "role": "user", "content": "Explain LLMs in plain English?" }
]
```

#### `max_tokens` (integer, required)

Maximum tokens to generate before stopping.

- Model may stop before reaching this limit
- Set to `0` to pre-warm prompt cache without generating a response (see [Prompt Caching](#11-prompt-caching))
- Different models have different maximums (see models table)

### Optional Parameters

#### `system` (string | array of TextBlockParam, optional)

System prompt:

```json
"You are a helpful assistant."
```

Or as array with cache_control:

```json
[
  {
    "type": "text",
    "text": "You are a helpful assistant.",
    "cache_control": { "type": "ephemeral" }
  }
]
```

#### `temperature` (number, optional, default: 1.0)

Range: `0.0` – `1.0`

- `0.0`: Analytical/multiple choice tasks
- `1.0`: Creative/generative tasks

#### `stop_sequences` (array of string, optional)

Custom text sequences causing model to stop generating. When triggered, `stop_reason` in response will be `"stop_sequence"` and `stop_sequence` field will have the matched value.

#### `stream` (boolean, optional, default: false)

Enable server-sent event streaming for incremental responses. See [Streaming](#10-streaming-sse).

#### `tools` (array of ToolUnion, optional)

Definitions of tools the model may use. See [Tool Use](#6-tool-use--function-calling).

#### `tool_choice` (ToolChoice, optional)

How model selects tools:

- `{"type": "auto"}` — Model decides (default)
- `{"type": "any"}` — Model must use at least one tool
- `{"type": "tool", "name": "tool_name"}` — Force specific tool
- `{"type": "none"}` — Disallow tool use
- Optional field: `disable_parallel_tool_use: boolean`

#### `thinking` (ThinkingConfigParam, optional)

Extended/adaptive thinking configuration:

- `{"type": "enabled", "budget_tokens": N}` — Manual extended thinking; N must be ≥1024 and < max_tokens. **NOT supported on Opus 4.7.**
- `{"type": "disabled"}` — Explicitly disable thinking
- `{"type": "adaptive"}` — Model auto-decides when to think; supported on Opus 4.7, Opus 4.6, Sonnet 4.6
- Optional field: `"display": "summarized" | "omitted"` — Controls how thinking content is returned (default: `"summarized"` for Claude 4 models; `"omitted"` for Opus 4.7 and Mythos)

#### `output_config` (OutputConfig, optional)

Output formatting options:

- `format: {"type": "json_schema", "schema": {...}}` — Structured JSON outputs
- `effort: "low" | "medium" | "high" | "xhigh" | "max"` — Processing effort level

#### `cache_control` (CacheControlEphemeral, optional) — Top-level automatic caching

Auto-applies cache marker to last cacheable block:

```json
{ "type": "ephemeral", "ttl": "5m" }
```

Or for 1-hour TTL:

```json
{ "type": "ephemeral", "ttl": "1h" }
```

#### `metadata` (Metadata, optional)

- `user_id`: UUID or hash for abuse detection. Do NOT include PII.

#### `service_tier` (string, optional, default: "auto")

- `"auto"` — Standard or priority capacity based on availability
- `"standard_only"` — Standard capacity only

#### `container` (string, optional)

Container identifier for reuse across requests.

#### `inference_geo` (string, optional)

Geographic region for inference. Uses workspace default if omitted. Specifying `"us"` applies a 1.1x pricing multiplier on models Opus 4.6+ and Sonnet 4.6+.

> WARNING: Passing `inference_geo` on models **older than Opus 4.6 / Sonnet 4.6** returns HTTP 400 (`invalid_request_error`). Only Opus 4.6+, Opus 4.7+, Sonnet 4.6+ support this parameter.

### Content Block Types (Input)

#### Text Block

```json
{
  "type": "text",
  "text": "Your message here",
  "cache_control": { "type": "ephemeral", "ttl": "5m" }
}
```

#### Image Block

```json
{
  "type": "image",
  "source": {
    "type": "base64",
    "media_type": "image/jpeg",
    "data": "<base64-encoded-data>"
  }
}
```

Or URL:

```json
{
  "type": "image",
  "source": {
    "type": "url",
    "url": "https://example.com/image.jpg"
  }
}
```

Or Files API:

```json
{
  "type": "image",
  "source": {
    "type": "file",
    "file_id": "file_011CNha..."
  }
}
```

#### Document Block (PDFs, text files)

```json
{
  "type": "document",
  "source": {
    "type": "base64",
    "media_type": "application/pdf",
    "data": "<base64-pdf-data>"
  },
  "title": "Optional title",
  "context": "Optional context",
  "citations": { "enabled": true }
}
```

Source types:

- `Base64PDFSource`: `{"type": "base64", "media_type": "application/pdf", "data": "..."}`
- `PlainTextSource`: `{"type": "text", "media_type": "text/plain", "data": "..."}`
- `URLPDFSource`: `{"type": "url", "url": "..."}`
- `FileSource`: `{"type": "file", "file_id": "file_..."}`

#### Tool Use Block (Input — for multi-turn with tool results)

```json
{
  "type": "tool_use",
  "id": "toolu_01...",
  "name": "tool_name",
  "input": {...}
}
```

#### Tool Result Block (Input — user sends back tool results)

```json
{
  "type": "tool_result",
  "tool_use_id": "toolu_01...",
  "content": "Result text or array of blocks",
  "is_error": false
}
```

#### Thinking Block (Input — for multi-turn with extended thinking)

```json
{
  "type": "thinking",
  "thinking": "...",
  "signature": "..."
}
```

Must be passed back unchanged in multi-turn conversations.

#### Search Result Block (Input)

```json
{
  "type": "search_result",
  "title": "...",
  "source": "...",
  "content": [{"type": "text", "text": "..."}],
  "citations": {...}
}
```

### Citation Types

#### `char_location`

```json
{
  "type": "char_location",
  "cited_text": "...",
  "document_index": 0,
  "document_title": "...",
  "start_char_index": 0,
  "end_char_index": 100
}
```

#### `page_location`

```json
{
  "type": "page_location",
  "cited_text": "...",
  "document_index": 0,
  "start_page_number": 1,
  "end_page_number": 3
}
```

#### `content_block_location`

```json
{
  "type": "content_block_location",
  "cited_text": "...",
  "document_index": 0,
  "start_block_index": 0,
  "end_block_index": 2
}
```

#### `web_search_result_location`

```json
{
  "type": "web_search_result_location",
  "cited_text": "...",
  "title": "...",
  "url": "...",
  "encrypted_index": "..."
}
```

### Full Request Example

```json
{
  "model": "claude-opus-4-7",
  "max_tokens": 2048,
  "temperature": 0.7,
  "system": "You are a helpful assistant.",
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "What is in this image?" },
        {
          "type": "image",
          "source": {
            "type": "url",
            "url": "https://example.com/image.jpg"
          }
        }
      ]
    }
  ],
  "tools": [
    {
      "name": "calculate",
      "description": "Perform calculations",
      "input_schema": {
        "type": "object",
        "properties": {
          "expression": { "type": "string" }
        },
        "required": ["expression"]
      }
    }
  ],
  "tool_choice": { "type": "auto" },
  "thinking": {
    "type": "adaptive",
    "display": "summarized"
  },
  "stop_sequences": ["END"],
  "stream": false,
  "cache_control": { "type": "ephemeral", "ttl": "1h" }
}
```

### Key Limits

| Parameter                       | Limit                |
| ------------------------------- | -------------------- |
| Messages per request            | 100,000              |
| Temperature range               | 0.0 – 1.0            |
| `budget_tokens` min             | 1,024                |
| `budget_tokens` constraint      | Must be < max_tokens |
| TTL values                      | `"5m"` or `"1h"`     |
| Max request size (Messages API) | 32 MB                |

---

## 5. Response Object

```json
{
  "id": "msg_01XFDUDYJgAACzvnptvVoYEL",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Hi! My name is Claude."
    }
  ],
  "model": "claude-opus-4-7",
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "usage": {
    "input_tokens": 25,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "output_tokens": 14
  }
}
```

### `stop_reason` Values

| Value             | Meaning                                                           |
| ----------------- | ----------------------------------------------------------------- |
| `"end_turn"`      | Model reached a natural stopping point                            |
| `"max_tokens"`    | Hit `max_tokens` limit (or `max_tokens: 0` for cache pre-warming) |
| `"stop_sequence"` | One of `stop_sequences` was matched                               |
| `"tool_use"`      | Model is requesting a tool call                                   |

### Response Content Block Types

- `text` — Text response
- `thinking` — Extended thinking content (only when thinking is enabled)
- `tool_use` — Model is requesting a tool call

### `usage` Fields

| Field                         | Description                                          |
| ----------------------------- | ---------------------------------------------------- |
| `input_tokens`                | Tokens AFTER last cache breakpoint (not total input) |
| `cache_creation_input_tokens` | Tokens written to cache                              |
| `cache_read_input_tokens`     | Tokens read from cache                               |
| `output_tokens`               | Tokens generated                                     |

**Total input tokens formula:**

```
total = cache_read_input_tokens + cache_creation_input_tokens + input_tokens
```

---

## 6. Tool Use / Function Calling

### How It Works

**Client tools** run in YOUR application:

1. Include tool definitions in `tools` array
2. Claude responds with `stop_reason: "tool_use"` and one or more `tool_use` content blocks
3. Your application executes the tool
4. Send back a `tool_result` in a new user message
5. Repeat until Claude responds without tool_use

**Server tools** (web_search, code_execution, web_fetch, tool_search) run on Anthropic's infrastructure — you see results directly.

### Defining Client Tools

```json
{
  "name": "get_stock_price",
  "description": "Get current stock price for a ticker symbol",
  "input_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "Stock ticker symbol (e.g., AAPL)"
      }
    },
    "required": ["ticker"]
  }
}
```

Optional fields:

- `strict: true` — Ensure Claude's tool calls always match schema exactly
- `allowed_callers: ["direct", "code_execution_20250825"]` — Control which callers can use this tool

### Tool Choice Options

```json
{"type": "auto"}                           // Model decides (default)
{"type": "any"}                            // Must use at least one tool
{"type": "tool", "name": "get_weather"}   // Force specific tool
{"type": "none"}                           // No tools allowed
```

Add `"disable_parallel_tool_use": true` to any of the above to prevent parallel tool calls.

### Server-Provided (Anthropic) Tools

| Tool Type                 | Description                       |
| ------------------------- | --------------------------------- |
| `web_search_20260209`     | Searches the web (latest version) |
| `web_search_20250305`     | Web search (older version)        |
| `web_fetch_20260209`      | Fetches web page content          |
| `code_execution_20250825` | Executes code                     |
| `bash_20250124`           | Runs bash commands                |
| `text_editor_20250728`    | File editing                      |
| `text_editor_20250429`    | File editing (earlier)            |
| `text_editor_20250124`    | File editing (earlier)            |
| `memory_20250818`         | Memory tool                       |

### Tool System Prompt Overhead

When tools are provided, an automatic system prompt is injected:

| Model             | `auto`/`none` tool choice | `any`/`tool` choice |
| ----------------- | ------------------------- | ------------------- |
| Claude 4.x models | 346 tokens                | 313 tokens          |
| Claude Haiku 3.5  | 264 tokens                | 340 tokens          |

### Parallel Tool Use

By default, Claude can call multiple tools in parallel (returns multiple `tool_use` blocks in a single response). Disable with `"disable_parallel_tool_use": true` in `tool_choice`.

### Multi-Turn Tool Use Pattern

```json
// Turn 1 - User asks question
{"role": "user", "content": "What's the weather in Paris?"}

// Turn 1 - Claude requests tool
{"role": "assistant", "content": [
  {"type": "tool_use", "id": "toolu_01...", "name": "get_weather", "input": {"location": "Paris"}}
]}

// Turn 2 - User provides tool result
{"role": "user", "content": [
  {"type": "tool_result", "tool_use_id": "toolu_01...", "content": "20°C, sunny"}
]}

// Turn 2 - Claude gives final answer
{"role": "assistant", "content": "The weather in Paris is 20°C and sunny."}
```

### Pricing for Tool Use

- Priced on total input tokens (including tool definitions) + output tokens
- Server-side tools may have additional per-use charges
- Web search: $10 per 1,000 searches
- Code execution: Free when used with web_search or web_fetch; otherwise $0.05/hour per container after 1,550 free hours/month
- Web fetch: No additional charges

---

## 7. Extended Thinking & Adaptive Thinking

### Overview

Extended thinking gives Claude enhanced reasoning capabilities. It creates `thinking` content blocks containing internal reasoning before delivering final answers.

### Model Support

| Model                 | Manual Extended Thinking         | Adaptive Thinking |
| --------------------- | -------------------------------- | ----------------- |
| Claude Opus 4.7       | NOT supported (returns 400)      | Yes (only mode)   |
| Claude Mythos Preview | Yes (also accepts budget_tokens) | Yes (default)     |
| Claude Opus 4.6       | Yes (deprecated, use adaptive)   | Yes (recommended) |
| Claude Sonnet 4.6     | Yes (deprecated for interleaved) | Yes (recommended) |
| Claude Haiku 4.5      | Yes                              | No                |
| Older Claude 4 models | Yes                              | No                |

### Enabling Manual Extended Thinking

```json
{
  "thinking": {
    "type": "enabled",
    "budget_tokens": 10000
  }
}
```

`budget_tokens` rules:

- Must be ≥ 1,024
- Must be < `max_tokens`
- Larger budgets can improve quality (Claude may use less than budget)
- Claude may not use full budget, especially above 32k

**NOT supported on Claude Opus 4.7.** Use adaptive instead.

### Enabling Adaptive Thinking

```json
{
  "thinking": {
    "type": "adaptive"
  }
}
```

Claude decides when thinking is needed. Best for Opus 4.7, Opus 4.6, Sonnet 4.6.

### Controlling Thinking Display

`display` field options:

**`"summarized"` (default on Claude 4 models):**

- Returns condensed summary of thinking
- You are charged for FULL thinking tokens, NOT summary tokens
- Billed output token count will NOT match displayed token count

**`"omitted"` (default on Opus 4.7 and Mythos Preview):**

- Thinking blocks have empty `thinking` field
- `signature` field carries encrypted thinking for multi-turn continuity
- Faster time-to-first-text-token when streaming
- Still charged for full thinking tokens

```json
{
  "thinking": {
    "type": "enabled",
    "budget_tokens": 10000,
    "display": "omitted"
  }
}
```

### Response Structure with Thinking

```json
{
  "content": [
    {
      "type": "thinking",
      "thinking": "Let me analyze this step by step...",
      "signature": "WaUjzkypQ2mUEVM36O2TxuC06KN8..."
    },
    {
      "type": "text",
      "text": "Based on my analysis..."
    }
  ]
}
```

### Extended Thinking with Tool Use

Limitations:

- Only `tool_choice: {"type": "auto"}` or `{"type": "none"}` are supported
- `{"type": "any"}` or `{"type": "tool", "name": "..."}` will error
- Must pass `thinking` blocks back unchanged in multi-turn tool use conversations

### Interleaved Thinking (Thinking Between Tool Calls)

Models with automatic interleaved thinking (no beta header needed):

- **Claude Opus 4.7** (automatic with adaptive thinking)
- **Claude Opus 4.6** (automatic with adaptive thinking)
- **Claude Sonnet 4.6** (automatic with adaptive thinking)
- **Claude Mythos Preview** (automatic)

For older Claude 4 models, add beta header: `interleaved-thinking-2025-05-14`

With interleaved thinking, `budget_tokens` represents total budget ACROSS all thinking blocks in one assistant turn (can exceed `max_tokens`).

### Output Token Limits with Thinking

| Model                                           | Max Output Tokens                                |
| ----------------------------------------------- | ------------------------------------------------ |
| Claude Mythos Preview, Opus 4.7, Opus 4.6       | 128k tokens                                      |
| Claude Sonnet 4.6, Claude Haiku 4.5             | 64k tokens                                       |
| Message Batches API (Opus 4.7, 4.6, Sonnet 4.6) | 300k tokens (with `output-300k-2026-03-24` beta) |

### Pricing

- Charged for FULL thinking tokens (not summary)
- Thinking tokens count as output tokens for pricing purposes

---

## 8. Vision (Image Input)

### Supported Image Formats

- `image/jpeg`
- `image/png`
- `image/gif` (only first frame of animated GIFs)
- `image/webp`

### Image Limits

| Context                                     | Limit                  |
| ------------------------------------------- | ---------------------- |
| API requests (200k context models)          | 100 images per request |
| API requests (all other models, 1M context) | 600 images per request |
| claude.ai                                   | 20 images per message  |
| Max dimensions                              | 8000x8000 px           |
| Max dimensions (>20 images in request)      | 2000x2000 px           |
| Max file size (API)                         | 5 MB per image         |
| Max file size (claude.ai)                   | 10 MB per image        |

### Image Token Calculation

`tokens ≈ width_px × height_px / 750`

Max native resolution per model:

- **Claude Opus 4.7**: 4,784 tokens max; 2,576px on long edge (high-res support, ~3x more tokens than prior models)
- **All other models**: 1,568 tokens max; 1,568px on long edge

Images larger than these limits are automatically resized while preserving aspect ratio. Images are padded to a multiple of 28px.

### Image Token Cost Examples (Claude Sonnet 4.6 at $3/MTok)

| Image Size   | Approx Tokens        | Cost/Image |
| ------------ | -------------------- | ---------- |
| 200x200 px   | ~54                  | ~$0.00016  |
| 1000x1000 px | ~1,334               | ~$0.004    |
| 1920x1080 px | ~1,568 (downsampled) | ~$0.0047   |

### Three Ways to Provide Images

**1. Base64-encoded:**

```json
{
  "type": "image",
  "source": {
    "type": "base64",
    "media_type": "image/jpeg",
    "data": "<base64-string>"
  }
}
```

**2. URL reference:**

```json
{
  "type": "image",
  "source": {
    "type": "url",
    "url": "https://example.com/photo.jpg"
  }
}
```

**3. Files API (best for multi-turn or repeated use):**

```json
{
  "type": "image",
  "source": {
    "type": "file",
    "file_id": "file_011CPMxVD3fHLUhvTqtsQA5w"
  }
}
```

Files API requires beta header: `anthropic-beta: files-api-2025-04-14`

### Best Practices

- Place images BEFORE related text in your prompt
- For >20 images or large images, use Files API to keep payload small
- For coordinate-based tasks: pre-resize images to avoid scale factor issues
- Claude does not parse or receive image metadata

### Vision Limitations

- Cannot identify people by name in images
- May hallucinate on low-quality, rotated, or very small images (<200px)
- Limited spatial reasoning precision (clocks, chess piece positions)
- Cannot generate or edit images
- Does not detect AI-generated images
- Does not process inappropriate/explicit content

---

## 9. Files API

**Beta header required:** `anthropic-beta: files-api-2025-04-14`

### Overview

Upload files once, reference by `file_id` in multiple API calls. Avoids re-uploading content repeatedly.

**Available on:** Claude API, Claude Platform on AWS, Microsoft Foundry  
**NOT available on:** Amazon Bedrock, Vertex AI  
**NOT eligible for ZDR.**

### Supported File Types

| File Type      | MIME Type         | Content Block      | Use Case                           |
| -------------- | ----------------- | ------------------ | ---------------------------------- |
| PDF            | `application/pdf` | `document`         | Text analysis, document processing |
| Plain text     | `text/plain`      | `document`         | Text analysis                      |
| JPEG           | `image/jpeg`      | `image`            | Image analysis                     |
| PNG            | `image/png`       | `image`            | Image analysis                     |
| GIF            | `image/gif`       | `image`            | Image analysis                     |
| WebP           | `image/webp`      | `image`            | Image analysis                     |
| Datasets/other | Varies            | `container_upload` | Code execution data analysis       |

### Upload a File

```bash
POST /v1/files
Headers: anthropic-beta: files-api-2025-04-14
Body: multipart/form-data with "file" field
```

```python
uploaded = client.beta.files.upload(
    file=("document.pdf", open("/path/to/file.pdf", "rb"), "application/pdf"),
)
file_id = uploaded.id  # e.g., "file_011CNha8iCJcU1wXNR6q4V8w"
```

Response:

```json
{
  "id": "file_011CNha8iCJcU1wXNR6q4V8w",
  "type": "file",
  "filename": "document.pdf",
  "mime_type": "application/pdf",
  "size_bytes": 1024000,
  "created_at": "2025-01-01T00:00:00Z",
  "downloadable": false
}
```

### Use a File in Messages

For a PDF document:

```json
{
  "type": "document",
  "source": {
    "type": "file",
    "file_id": "file_011CNha..."
  },
  "title": "Optional title",
  "context": "Optional context",
  "citations": { "enabled": true }
}
```

For an image:

```json
{
  "type": "image",
  "source": {
    "type": "file",
    "file_id": "file_011CPMxV..."
  }
}
```

### Manage Files

**List files:**

```bash
GET /v1/files
```

**Get file metadata:**

```bash
GET /v1/files/{file_id}
```

**Delete a file:**

```bash
DELETE /v1/files/{file_id}
```

**Download a file** (only files created by skills or code execution tool):

```bash
GET /v1/files/{file_id}/content
```

### Storage Limits

| Limit                       | Value                       |
| --------------------------- | --------------------------- |
| Max file size               | 500 MB per file             |
| Total storage               | 500 GB per organization     |
| File-related API rate limit | ~100 requests/minute (beta) |

### File Lifecycle

- Scoped to the workspace of the API key
- Other API keys in same workspace can access files
- Files persist until explicitly deleted
- Deleted files cannot be recovered

### File API Pricing

- Upload, download, list, metadata, delete operations: **FREE**
- File content used in Messages requests billed as input tokens

### Error Handling

| Error                  | HTTP | Cause                                                     |
| ---------------------- | ---- | --------------------------------------------------------- |
| File not found         | 404  | Invalid `file_id` or no access                            |
| Invalid file type      | 400  | File type doesn't match content block type                |
| Exceeds context window | 400  | File too large for context                                |
| Invalid filename       | 400  | Filename 0 chars, >255 chars, or contains forbidden chars |
| File too large         | 413  | Exceeds 500 MB limit                                      |
| Storage limit exceeded | 403  | Org reached 500 GB                                        |

---

## 10. Streaming (SSE)

Set `"stream": true` in your request. Responses use server-sent events (SSE).

### Stream Event Flow

1. `message_start` — Message object with empty content
2. For each content block:
   - `content_block_start` — Start of a content block
   - One or more `content_block_delta` events
   - `content_block_stop` — End of content block
3. One or more `message_delta` events — Top-level message changes
4. `message_stop` — Stream complete

Ping events (`ping`) may appear anywhere in the stream.

### Full SSE Response Example

```sse
event: message_start
data: {"type": "message_start", "message": {"id": "msg_1nZdL29xx5MUA1yADyHTEsnR8uuvGzszyY", "type": "message", "role": "assistant", "content": [], "model": "claude-opus-4-7", "stop_reason": null, "stop_sequence": null, "usage": {"input_tokens": 25, "output_tokens": 1}}}

event: content_block_start
data: {"type": "content_block_start", "index": 0, "content_block": {"type": "text", "text": ""}}

event: ping
data: {"type": "ping"}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "text_delta", "text": "Hello"}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "text_delta", "text": "!"}}

event: content_block_stop
data: {"type": "content_block_stop", "index": 0}

event: message_delta
data: {"type": "message_delta", "delta": {"stop_reason": "end_turn", "stop_sequence": null}, "usage": {"output_tokens": 15}}

event: message_stop
data: {"type": "message_stop"}
```

> NOTE: Token counts in `message_delta` usage are **cumulative**.

### Content Block Delta Types

**Text delta:**

```sse
event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "text_delta", "text": "ello frien"}}
```

**Input JSON delta (tool use input — partial JSON):**

```sse
event: content_block_delta
data: {"type": "content_block_delta", "index": 1, "delta": {"type": "input_json_delta", "partial_json": "{\"location\": \"San Fra"}}
```

Accumulate partial JSON strings; parse as JSON after `content_block_stop`.

**Thinking delta (extended thinking):**

```sse
event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "thinking_delta", "thinking": "I need to find the GCD..."}}
```

**Signature delta (thinking — end of thinking block):**

```sse
event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "signature_delta", "signature": "EqQBCgIYAhIM1gbcDa..."}}
```

When `display: "omitted"`: No `thinking_delta` events. Only a `signature_delta` then text streaming begins.

### Error Events in Stream

```sse
event: error
data: {"type": "error", "error": {"type": "overloaded_error", "message": "Overloaded"}}
```

Errors can occur after initial 200 response.

### Error Recovery (Interrupted Streams)

**Claude 4.5 and earlier:** Place partial assistant response as beginning of new assistant message, then continue.

**Claude 4.6 and later:** Add a user message with the partial response and instruction: "Your previous response was interrupted and ended with [previous_response]. Continue from where you left off."

### SDK Streaming Usage

**Python (get final message):**

```python
with client.messages.stream(
    max_tokens=128000,
    messages=[{"role": "user", "content": "..."}],
    model="claude-opus-4-7",
) as stream:
    message = stream.get_final_message()
print(message.content)
```

**TypeScript (get final message):**

```typescript
const stream = client.messages.stream({
  max_tokens: 128000,
  messages: [{ role: "user", content: "..." }],
  model: "claude-opus-4-7",
});
const message = await stream.finalMessage();
```

---

## 11. Prompt Caching

### Overview

Cache prompt prefixes to avoid re-processing identical content. Reduces cost and latency for repeated content.

**Default TTL:** 5 minutes (auto-refreshed on cache hits at no additional cost)  
**Eligible for ZDR:** Yes

### Two Methods

**Method 1: Automatic Caching (Recommended)**

Add a single `cache_control` at top level of request. System automatically manages cache breakpoints.

```json
{
  "model": "claude-opus-4-7",
  "max_tokens": 1024,
  "cache_control": {"type": "ephemeral"},
  "messages": [...]
}
```

Behavior in multi-turn:

- Cache breakpoint automatically moves to the last cacheable block each request
- Earlier content that was cached stays cached; new content gets written

**Method 2: Explicit Cache Breakpoints**

Place `cache_control` on individual content blocks:

```json
{
  "system": [
    { "type": "text", "text": "Role context..." },
    {
      "type": "text",
      "text": "Large document...",
      "cache_control": { "type": "ephemeral" }
    }
  ]
}
```

Max 4 explicit cache breakpoints per request.

### What Can Be Cached

- Tool definitions in `tools` array
- System messages (content blocks in `system`)
- Text messages (content blocks in `messages.content`)
- Images & documents in user turns
- Tool use and tool results

### What Cannot Be Cached

- Thinking blocks (cannot be explicitly marked, but ARE cached alongside other content)
- Sub-content blocks (citations)
- Empty text blocks

### Cache Minimum Token Requirements

| Models                                                         | Minimum Cacheable Tokens |
| -------------------------------------------------------------- | ------------------------ |
| Claude Mythos Preview, Opus 4.7, Opus 4.6, Opus 4.5, Haiku 4.5 | 4,096 tokens             |
| Claude Sonnet 4.6, Sonnet 4.5, Opus 4.1, Opus 4, Sonnet 4      | 1,024 tokens             |
| Claude Haiku 3.5                                               | 2,048 tokens             |

If prompt is below minimum: no error, just not cached.

### 1-Hour Cache Duration

Available on: Claude API, Claude Platform on AWS, Vertex AI, Microsoft Foundry (beta)  
NOT available on: Bedrock

```json
{ "cache_control": { "type": "ephemeral", "ttl": "1h" } }
```

Cost: 2x base input price (vs 1.25x for 5-minute)

When mixing TTLs: longer TTL entries MUST appear before shorter TTL entries.

### Cache Pricing (Per Million Tokens)

| Model                   | 5m Cache Write      | 1h Cache Write  | Cache Read        |
| ----------------------- | ------------------- | --------------- | ----------------- |
| Claude Opus 4.7/4.6/4.5 | $6.25/MTok (1.25x)  | $10/MTok (2x)   | $0.50/MTok (0.1x) |
| Claude Opus 4.1         | $18.75/MTok (1.25x) | $30/MTok (2x)   | $1.50/MTok (0.1x) |
| Claude Sonnet 4.6/4.5   | $3.75/MTok (1.25x)  | $6/MTok (2x)    | $0.30/MTok (0.1x) |
| Claude Haiku 4.5        | $1.25/MTok (1.25x)  | $2/MTok (2x)    | $0.10/MTok (0.1x) |
| Claude Haiku 3.5        | $1/MTok (1.25x)     | $1.60/MTok (2x) | $0.08/MTok (0.1x) |

Cache reads cost **0.1x** base input price (90% cheaper than uncached).

### Cache Rate Limit Advantage

For most models, **cache_read_input_tokens do NOT count toward ITPM rate limits** (only `input_tokens` and `cache_creation_input_tokens` count). Claude Haiku 3.5 is the exception — it counts cache reads toward ITPM.

Example: With 2M ITPM limit and 80% cache hit rate → effectively 10M total tokens/minute.

### Cache Performance Monitoring

Response `usage` fields:

- `cache_creation_input_tokens`: Tokens written to cache
- `cache_read_input_tokens`: Tokens read from cache
- `input_tokens`: Tokens after last cache breakpoint (NOT total input)

Verify cache: If both `cache_creation_input_tokens` and `cache_read_input_tokens` are 0, the prompt wasn't cached (likely below minimum token threshold).

### Cache Hierarchy

Cache prefixes created in order: `tools` → `system` → `messages`

Changes at each level invalidate that level and all subsequent levels.

### 20-Block Lookback Window

System checks at most 20 positions per breakpoint when looking for matching cache entries.

### Pre-warming the Cache

Use `max_tokens: 0` to pre-populate cache without generating output:

```python
client.messages.create(
    model="claude-opus-4-7",
    max_tokens=0,
    system=SYSTEM_PROMPT_WITH_CACHE_CONTROL,
    messages=[{"role": "user", "content": "warmup"}],
)
```

Limitations of `max_tokens: 0`:

- NOT allowed with `stream: true`
- NOT allowed with extended thinking (`thinking.type: "enabled"`)
- NOT allowed with structured outputs (`output_config.format`)
- NOT allowed with `tool_choice` of `{"type": "tool"}` or `{"type": "any"}`
- NOT allowed inside Message Batches requests

### Workspace Cache Isolation

As of February 5, 2026: Caches isolated per workspace (on Claude API, Claude Platform on AWS, Microsoft Foundry beta). Bedrock and Vertex AI use organization-level isolation only.

---

## 12. Message Batches API

**Endpoint:** `POST /v1/messages/batches`

50% cost reduction, asynchronous processing, most batches complete within 1 hour.

**NOT eligible for ZDR.**

### Batch Limitations

- Max 100,000 requests per batch OR 256 MB, whichever first
- Max processing time: 24 hours (batches expire after 24 hours)
- Results available for 29 days after creation
- Batches scoped to a Workspace
- `max_tokens: 0` (cache pre-warming) NOT supported in batches
- Each request in batch must have `max_tokens` ≥ 1

### What Can Be Batched

Any Messages API request:

- Vision, tool use, system messages, multi-turn conversations, any beta features
- Streaming NOT supported for batch requests

### Create a Batch

```bash
POST /v1/messages/batches
```

```json
{
  "requests": [
    {
      "custom_id": "req-001",
      "params": {
        "model": "claude-opus-4-7",
        "max_tokens": 1024,
        "messages": [{ "role": "user", "content": "Hello, world" }]
      }
    },
    {
      "custom_id": "req-002",
      "params": {
        "model": "claude-opus-4-7",
        "max_tokens": 1024,
        "messages": [{ "role": "user", "content": "Hi again!" }]
      }
    }
  ]
}
```

`custom_id` rules: 1–64 characters, alphanumeric + hyphens + underscores, regex: `^[a-zA-Z0-9_-]{1,64}$`

Response:

```json
{
  "id": "msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d",
  "type": "message_batch",
  "processing_status": "in_progress",
  "request_counts": {
    "processing": 2,
    "succeeded": 0,
    "errored": 0,
    "canceled": 0,
    "expired": 0
  },
  "ended_at": null,
  "created_at": "2024-09-24T18:37:24.100435Z",
  "expires_at": "2024-09-25T18:37:24.100435Z",
  "cancel_initiated_at": null,
  "results_url": null
}
```

### Poll Batch Status

```bash
GET /v1/messages/batches/{batch_id}
```

`processing_status` values:

- `"in_progress"` — Still processing
- `"canceling"` — Cancel initiated
- `"ended"` — Done (results available)

### Retrieve Results

```bash
GET /v1/messages/batches/{batch_id}/results
```

Returns JSONL (one JSON object per line). Each line has:

```json
{
  "custom_id": "req-001",
  "result": {
    "type": "succeeded",
    "message": {...}
  }
}
```

Result types:
| Type | Description | Billed? |
|------|-------------|---------|
| `succeeded` | Successful with message result | Yes |
| `errored` | Error, no message created | No |
| `canceled` | User canceled before processing | No |
| `expired` | 24-hour expiration before processing | No |

Results can be in ANY order. Always use `custom_id` to match results to requests.

### Cancel a Batch

```bash
POST /v1/messages/batches/{batch_id}/cancel
```

### List Batches

```bash
GET /v1/messages/batches?limit=20
```

### Extended Output Beta

Add header `anthropic-beta: output-300k-2026-03-24` to raise max_tokens cap to 300,000 for Opus 4.7, Opus 4.6, or Sonnet 4.6.

Available on: Claude API and Claude Platform on AWS only. NOT on Bedrock, Vertex AI, or Microsoft Foundry.

### Batch Pricing (50% off standard)

| Model             | Batch Input | Batch Output |
| ----------------- | ----------- | ------------ |
| Claude Opus 4.7   | $2.50/MTok  | $12.50/MTok  |
| Claude Opus 4.6   | $2.50/MTok  | $12.50/MTok  |
| Claude Sonnet 4.6 | $1.50/MTok  | $7.50/MTok   |
| Claude Haiku 4.5  | $0.50/MTok  | $2.50/MTok   |
| Claude Haiku 3.5  | $0.40/MTok  | $2.00/MTok   |

### Batch Rate Limits

| Tier   | RPM   | Max batch requests in queue | Max requests per batch |
| ------ | ----- | --------------------------- | ---------------------- |
| Tier 1 | 50    | 100,000                     | 100,000                |
| Tier 2 | 1,000 | 200,000                     | 100,000                |
| Tier 3 | 2,000 | 300,000                     | 100,000                |
| Tier 4 | 4,000 | 500,000                     | 100,000                |

---

## 13. Computer Use

**Beta feature.** Enables Claude to see and control desktop environments.

### Beta Headers Required

| Models                                                   | Beta Header               |
| -------------------------------------------------------- | ------------------------- |
| Claude Opus 4.7, Opus 4.6, Sonnet 4.6, Opus 4.5          | `computer-use-2025-11-24` |
| Claude Sonnet 4.5, Haiku 4.5, Opus 4.1, Sonnet 4, Opus 4 | `computer-use-2025-01-24` |

**Eligible for ZDR.**

### Tool Types

```json
{
  "type": "computer_20251124",
  "name": "computer",
  "display_width_px": 1024,
  "display_height_px": 768,
  "display_number": 1,
  "enable_zoom": false
}
```

| Parameter           | Required | Description                                    |
| ------------------- | -------- | ---------------------------------------------- |
| `type`              | Yes      | `"computer_20251124"` or `"computer_20250124"` |
| `name`              | Yes      | Must be `"computer"`                           |
| `display_width_px`  | Yes      | Display width in pixels                        |
| `display_height_px` | Yes      | Display height in pixels                       |
| `display_number`    | No       | Display number for X11                         |
| `enable_zoom`       | No       | Enable zoom action (`20251124` only)           |

### Computer Tool Versions

**`computer_20250124`** — Available on all supported models:

- `screenshot`, `left_click`, `type`, `key`, `mouse_move`
- `scroll`, `left_click_drag`, `right_click`, `middle_click`
- `double_click`, `triple_click`, `left_mouse_down`, `left_mouse_up`
- `hold_key`, `wait`

**`computer_20251124`** — Available on Opus 4.7, Opus 4.6, Sonnet 4.6, Opus 4.5:

- All `20250124` actions
- `zoom` action (requires `enable_zoom: true`) — view specific screen region at full resolution

### Available Actions (Examples)

```json
{"action": "screenshot"}
{"action": "left_click", "coordinate": [500, 300]}
{"action": "type", "text": "Hello, world!"}
{"action": "key", "text": "ctrl+s"}
{"action": "mouse_move", "coordinate": [500, 300]}
{"action": "scroll", "coordinate": [500, 400], "scroll_direction": "down", "scroll_amount": 3}
{"action": "zoom", "region": [100, 200, 400, 350]}
```

Modifier key with click:

```json
{ "action": "left_click", "coordinate": [500, 300], "text": "shift" }
```

### Companion Tools (No Beta Header Required Alone)

```json
{"type": "text_editor_20250728", "name": "str_replace_based_edit_tool"}
{"type": "bash_20250124", "name": "bash"}
```

### Pricing Overhead

| Item                                      | Tokens                 |
| ----------------------------------------- | ---------------------- |
| Computer use system prompt overhead       | 466–499 tokens         |
| Computer use tool definition (Claude 4.x) | 735 input tokens       |
| Bash tool                                 | 245 input tokens       |
| Text editor `20250429` (Claude 4.x)       | 700 input tokens       |
| Screenshots                               | Billed as image tokens |

### Coordinate Scaling

Claude Opus 4.7: Coordinates are 1:1 with image pixels. No scale-factor conversion needed.

Earlier models: API constrains images to max 1568px on longest edge. Must scale Claude's coordinates back to original screen coordinates:

```python
scale = min(1.0, 1568 / max(width, height))
# Scale Claude's returned coordinates back up:
screen_x = claude_x / scale
screen_y = claude_y / scale
```

### Key Limitations

1. Latency: Slower than human-directed actions
2. Computer vision accuracy: May make coordinate mistakes; extended thinking helps
3. Scrolling reliability: May need keyboard alternatives (Page Down)
4. Account creation on social platforms: Limited capability
5. Prompt injection risk: Classifiers run automatically to flag injections

### Security Recommendations

1. Use dedicated VM/container with minimal privileges
2. Avoid providing sensitive data (account credentials, etc.)
3. Limit internet access to allowlist of domains
4. Require human confirmation for consequential actions

---

## 14. Rate Limits

### About Rate Limits

- Token bucket algorithm (continuously replenished, not reset at fixed intervals)
- Per-organization limits
- You can set lower per-workspace limits
- Limits separated per model class (Opus, Sonnet, Haiku)

### Cache-Aware ITPM

**Most models:** Only uncached input tokens count toward ITPM:

- `input_tokens` + `cache_creation_input_tokens` COUNT toward ITPM
- `cache_read_input_tokens` do NOT count toward ITPM

**Claude Haiku 3.5 (exception†):** ALL tokens including cache reads count toward ITPM.

### Tier Requirements (to Advance)

| Tier              | Cumulative Credit Purchase | Max Credit Purchase | Monthly Spend Limit |
| ----------------- | -------------------------- | ------------------- | ------------------- |
| Tier 1            | $5                         | $500                | $500                |
| Tier 2            | $40                        | $500                | $500                |
| Tier 3            | $200                       | $1,000              | $1,000              |
| Tier 4            | $400                       | $200,000            | $200,000            |
| Monthly Invoicing | N/A                        | N/A                 | No limit            |

### Rate Limits Per Model Class

#### Tier 1

| Model             | RPM | ITPM    | OTPM   |
| ----------------- | --- | ------- | ------ |
| Claude Opus 4.x   | 50  | 500,000 | 80,000 |
| Claude Sonnet 4.x | 50  | 30,000  | 8,000  |
| Claude Haiku 4.5  | 50  | 50,000  | 10,000 |

#### Tier 2

| Model             | RPM   | ITPM      | OTPM    |
| ----------------- | ----- | --------- | ------- |
| Claude Opus 4.x   | 1,000 | 2,000,000 | 200,000 |
| Claude Sonnet 4.x | 1,000 | 450,000   | 90,000  |
| Claude Haiku 4.5  | 1,000 | 450,000   | 90,000  |

#### Tier 3

| Model             | RPM   | ITPM      | OTPM    |
| ----------------- | ----- | --------- | ------- |
| Claude Opus 4.x   | 2,000 | 5,000,000 | 400,000 |
| Claude Sonnet 4.x | 2,000 | 800,000   | 160,000 |
| Claude Haiku 4.5  | 2,000 | 1,000,000 | 200,000 |

#### Tier 4

| Model             | RPM   | ITPM       | OTPM    |
| ----------------- | ----- | ---------- | ------- |
| Claude Opus 4.x   | 4,000 | 10,000,000 | 800,000 |
| Claude Sonnet 4.x | 4,000 | 2,000,000  | 400,000 |
| Claude Haiku 4.5  | 4,000 | 4,000,000  | 800,000 |

Note: Opus 4.x is a combined limit across Opus 4.7, 4.6, 4.5, 4.1, and 4. Sonnet 4.x is combined across Sonnet 4.6, 4.5, and 4.

### Rate Limit Response Headers

| Header                                        | Description                                     |
| --------------------------------------------- | ----------------------------------------------- |
| `retry-after`                                 | Seconds to wait before retrying (on 429)        |
| `anthropic-ratelimit-requests-limit`          | Max requests in any rate limit period           |
| `anthropic-ratelimit-requests-remaining`      | Requests remaining                              |
| `anthropic-ratelimit-requests-reset`          | When request limit fully replenishes (RFC 3339) |
| `anthropic-ratelimit-tokens-limit`            | Max tokens in any rate limit period             |
| `anthropic-ratelimit-tokens-remaining`        | Tokens remaining (rounded to nearest 1000)      |
| `anthropic-ratelimit-tokens-reset`            | When token limit fully replenishes (RFC 3339)   |
| `anthropic-ratelimit-input-tokens-limit`      | Max input tokens                                |
| `anthropic-ratelimit-input-tokens-remaining`  | Input tokens remaining                          |
| `anthropic-ratelimit-input-tokens-reset`      | When input token limit replenishes              |
| `anthropic-ratelimit-output-tokens-limit`     | Max output tokens                               |
| `anthropic-ratelimit-output-tokens-remaining` | Output tokens remaining                         |
| `anthropic-ratelimit-output-tokens-reset`     | When output token limit replenishes             |

### Managed Agents Rate Limits

| Operation                                         | Limit   |
| ------------------------------------------------- | ------- |
| Create endpoints (agents, sessions, environments) | 300 RPM |
| Read endpoints (retrieve, list, stream)           | 600 RPM |

---

## 15. Errors

### HTTP Status Codes

| HTTP | Error Type              | Description                                                 |
| ---- | ----------------------- | ----------------------------------------------------------- |
| 400  | `invalid_request_error` | Issue with format or content of request                     |
| 401  | `authentication_error`  | API key issue (or AWS credentials issue on Platform on AWS) |
| 402  | `billing_error`         | Billing or payment issue                                    |
| 403  | `permission_error`      | API key lacks permission for resource                       |
| 404  | `not_found_error`       | Requested resource not found                                |
| 413  | `request_too_large`     | Request exceeds size limit                                  |
| 429  | `rate_limit_error`      | Rate limit exceeded; includes `retry-after` header          |
| 500  | `api_error`             | Internal Anthropic error                                    |
| 504  | `timeout_error`         | Request timed out; use streaming for long requests          |
| 529  | `overloaded_error`      | API temporarily overloaded                                  |

### Error Response Shape

```json
{
  "type": "error",
  "error": {
    "type": "not_found_error",
    "message": "The requested resource could not be found."
  },
  "request_id": "req_011CSHoEeqs5C35K2UUqR7Fy"
}
```

### Request Size Limits

| Endpoint           | Max Size |
| ------------------ | -------- |
| Messages API       | 32 MB    |
| Token Counting API | 32 MB    |
| Batch API          | 256 MB   |
| Files API          | 500 MB   |

### Common Validation Errors

**Prefill not supported:**
Claude Mythos Preview, Opus 4.7, Opus 4.6, and Sonnet 4.6 do NOT support prefilling assistant messages (sending a request with a prefilled last assistant message). Returns 400 `invalid_request_error`:

```json
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "Prefilling assistant messages is not supported for this model."
  }
}
```

Use structured outputs or `output_config.format` instead.

**Invalid beta header:**

```json
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "Unsupported beta header: invalid-beta-name"
  }
}
```

### Long Requests Best Practices

- Use streaming for requests expected to take >10 minutes
- Set TCP socket keep-alive for non-streaming requests
- For very long requests (>128k tokens output), use the Batch API
- SDKs validate non-streaming requests won't exceed 10-minute timeout and set TCP keep-alive

### Request ID Usage

```python
message = client.messages.create(...)
print(f"Request ID: {message._request_id}")
```

```typescript
const message = await client.messages.create({...});
console.log("Request ID:", message._request_id);
```

---

## 16. Pricing

All prices in USD per million tokens (MTok).

### Standard Model Pricing

| Model                                            | Input      | Output   |
| ------------------------------------------------ | ---------- | -------- |
| Claude Opus 4.7                                  | $5/MTok    | $25/MTok |
| Claude Opus 4.6                                  | $5/MTok    | $25/MTok |
| Claude Opus 4.5                                  | $5/MTok    | $25/MTok |
| Claude Opus 4.1                                  | $15/MTok   | $75/MTok |
| Claude Sonnet 4.6                                | $3/MTok    | $15/MTok |
| Claude Sonnet 4.5                                | $3/MTok    | $15/MTok |
| Claude Haiku 4.5                                 | $1/MTok    | $5/MTok  |
| Claude Haiku 3.5 (retired except Bedrock/Vertex) | $0.80/MTok | $4/MTok  |

### Prompt Caching Pricing

| Model            | 5m Cache Write | 1h Cache Write | Cache Read |
| ---------------- | -------------- | -------------- | ---------- |
| Opus 4.7/4.6/4.5 | $6.25/MTok     | $10/MTok       | $0.50/MTok |
| Opus 4.1         | $18.75/MTok    | $30/MTok       | $1.50/MTok |
| Sonnet 4.6/4.5   | $3.75/MTok     | $6/MTok        | $0.30/MTok |
| Haiku 4.5        | $1.25/MTok     | $2/MTok        | $0.10/MTok |
| Haiku 3.5        | $1/MTok        | $1.60/MTok     | $0.08/MTok |

Multipliers: 5m write = 1.25x base; 1h write = 2x base; read = 0.1x base.

### Batch API Pricing (50% off standard)

| Model            | Batch Input | Batch Output |
| ---------------- | ----------- | ------------ |
| Opus 4.7/4.6/4.5 | $2.50/MTok  | $12.50/MTok  |
| Opus 4.1         | $7.50/MTok  | $37.50/MTok  |
| Sonnet 4.6/4.5   | $1.50/MTok  | $7.50/MTok   |
| Haiku 4.5        | $0.50/MTok  | $2.50/MTok   |
| Haiku 3.5        | $0.40/MTok  | $2.00/MTok   |

### Server Tool Pricing

| Tool                                   | Additional Cost                                             |
| -------------------------------------- | ----------------------------------------------------------- |
| Web search (`web_search_20260209`)     | $10 per 1,000 searches                                      |
| Web fetch                              | No additional charge                                        |
| Code execution (standalone)            | $0.05/hour per container (after 1,550 free hours/month/org) |
| Code execution (with web search/fetch) | FREE                                                        |

### Fast Mode Pricing (Beta — Opus 4.6/4.7 only, NOT on Platform on AWS)

|           | Input    | Output    |
| --------- | -------- | --------- |
| Fast mode | $30/MTok | $150/MTok |

6x standard rates. Stacks with other pricing modifiers.

> NOTE: Fast mode uses a **dedicated rate limit pool** separate from standard Opus limits. Rate limit response headers for fast mode use the `anthropic-fast-*` prefix.

### Data Residency Pricing

`inference_geo: "us"` adds 1.1x multiplier on all token categories (Opus 4.6+, Sonnet 4.6+).

### Tool Use Overhead Tokens

Added automatically to system prompt:

- `auto`/`none` tool choice: +346 tokens (Claude 4.x)
- `any`/`tool` choice: +313 tokens (Claude 4.x)
- Bash tool: +245 tokens
- Text editor `20250429` (Claude 4.x): +700 tokens
- Computer use tool (Claude 4.x): +735 tokens + 466-499 system prompt overhead

### Managed Agents Pricing

- Tokens: Standard per-model rates (same as above)
- Session runtime: $0.08 per session-hour (measured during `running` status only)

---

## 17. Beta Headers Reference

Send as `anthropic-beta` header. Multiple features: comma-separated.

```http
anthropic-beta: feature1,feature2
```

Or in SDK:

```python
client.beta.messages.create(..., betas=["feature1", "feature2"])
```

### Active Beta Headers

| Header                            | Feature              | Notes                                                                      |
| --------------------------------- | -------------------- | -------------------------------------------------------------------------- |
| `files-api-2025-04-14`            | Files API            | Upload/manage files                                                        |
| `computer-use-2025-11-24`         | Computer Use (newer) | Opus 4.7, 4.6, Sonnet 4.6, Opus 4.5                                        |
| `computer-use-2025-01-24`         | Computer Use (older) | Sonnet 4.5, Haiku 4.5, Opus 4.1, Sonnet 4, Opus 4                          |
| `output-300k-2026-03-24`          | Extended output      | Batch API only; raises max_tokens to 300k for Opus 4.7, 4.6, Sonnet 4.6    |
| `managed-agents-2026-04-01`       | Managed Agents       | Required on `/v1/agents`, `/v1/sessions`, `/v1/environments` endpoints     |
| `interleaved-thinking-2025-05-14` | Interleaved thinking | For older Claude 4 models; ignored/no-op on Claude Opus 4.7/4.6/Sonnet 4.6 |

### Deprecated Beta Headers

| Header                            | Status                                                                            |
| --------------------------------- | --------------------------------------------------------------------------------- |
| `interleaved-thinking-2025-05-14` | Deprecated for Opus 4.6/Sonnet 4.6 (safely ignored); still works for older models |

### Endpoint-Specific Headers

| Endpoints                                        | Required Header             |
| ------------------------------------------------ | --------------------------- |
| `/v1/agents`, `/v1/sessions`, `/v1/environments` | `managed-agents-2026-04-01` |

---

## 18. SDK Usage — Python & TypeScript

### Installation

```bash
pip install anthropic           # Python
npm install @anthropic-ai/sdk   # TypeScript/Node.js
```

### Python — Basic Usage

```python
import anthropic

client = anthropic.Anthropic()  # Uses ANTHROPIC_API_KEY env var

message = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
)
print(message.content)
print(f"Request ID: {message._request_id}")
```

### TypeScript — Basic Usage

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // Uses ANTHROPIC_API_KEY env var

const message = await client.messages.create({
  model: "claude-opus-4-7",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
});
console.log(message.content);
console.log("Request ID:", message._request_id);
```

### Python — Streaming

```python
# Simple text streaming
with client.messages.stream(
    model="claude-opus-4-7",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)

# Get final message without writing event handlers
with client.messages.stream(
    model="claude-opus-4-7",
    max_tokens=128000,
    messages=[{"role": "user", "content": "Write a long analysis..."}],
) as stream:
    message = stream.get_final_message()
print(message.content)
```

### TypeScript — Streaming

```typescript
// Simple text streaming
const stream = client.messages
  .stream({
    model: "claude-opus-4-7",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello" }],
  })
  .on("text", (text) => {
    process.stdout.write(text);
  });

// Get final message
const message = await client.messages
  .stream({
    model: "claude-opus-4-7",
    max_tokens: 128000,
    messages: [{ role: "user", content: "Write a long analysis..." }],
  })
  .finalMessage();
```

### Python — Extended Thinking

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    thinking={"type": "enabled", "budget_tokens": 10000},
    messages=[{"role": "user", "content": "Solve this math problem..."}],
)
for block in response.content:
    if block.type == "thinking":
        print(f"Thinking: {block.thinking}")
    elif block.type == "text":
        print(f"Response: {block.text}")
```

### Python — Tool Use

```python
tools = [
    {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {"type": "string"}
            },
            "required": ["location"]
        }
    }
]

response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in Paris?"}]
)

# Handle tool use
if response.stop_reason == "tool_use":
    tool_use = next(b for b in response.content if b.type == "tool_use")
    # Execute tool: result = execute_weather_tool(tool_use.input)
    result = "20°C, sunny"

    # Continue conversation
    continuation = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1024,
        tools=tools,
        messages=[
            {"role": "user", "content": "What's the weather in Paris?"},
            {"role": "assistant", "content": response.content},
            {"role": "user", "content": [
                {
                    "type": "tool_result",
                    "tool_use_id": tool_use.id,
                    "content": result
                }
            ]}
        ]
    )
```

### Python — Prompt Caching

```python
# Automatic caching for multi-turn
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    cache_control={"type": "ephemeral"},
    system="You are an expert...",
    messages=[{"role": "user", "content": "Question?"}]
)

# Explicit cache breakpoints
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    system=[
        {"type": "text", "text": "You are helpful."},
        {
            "type": "text",
            "text": "Very long document...",
            "cache_control": {"type": "ephemeral"}
        }
    ],
    messages=[{"role": "user", "content": "Summarize this."}]
)
print(f"Cache read: {response.usage.cache_read_input_tokens}")
print(f"Cache write: {response.usage.cache_creation_input_tokens}")
```

### Python — Files API (Beta)

```python
# Upload a file
with open("/path/to/document.pdf", "rb") as f:
    file = client.beta.files.upload(
        file=("document.pdf", f, "application/pdf"),
    )
file_id = file.id

# Use in a message
response = client.beta.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Summarize this document."},
            {"type": "document", "source": {"type": "file", "file_id": file_id}}
        ]
    }],
    betas=["files-api-2025-04-14"],
)

# Delete a file
client.beta.files.delete(file_id)
```

### Python — Message Batches

```python
from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
from anthropic.types.messages.batch_create_params import Request

batch = client.messages.batches.create(
    requests=[
        Request(
            custom_id="req-001",
            params=MessageCreateParamsNonStreaming(
                model="claude-opus-4-7",
                max_tokens=1024,
                messages=[{"role": "user", "content": "Hello"}],
            ),
        ),
    ]
)

# Poll until done
import time
while True:
    batch = client.messages.batches.retrieve(batch.id)
    if batch.processing_status == "ended":
        break
    time.sleep(60)

# Stream results
for result in client.messages.batches.results(batch.id):
    if result.result.type == "succeeded":
        print(result.custom_id, result.result.message.content[0].text)
```

### Python — Computer Use (Beta)

```python
response = client.beta.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    tools=[
        {
            "type": "computer_20251124",
            "name": "computer",
            "display_width_px": 1024,
            "display_height_px": 768,
            "display_number": 1,
        },
        {"type": "text_editor_20250728", "name": "str_replace_based_edit_tool"},
        {"type": "bash_20250124", "name": "bash"},
    ],
    messages=[{"role": "user", "content": "Take a screenshot of the desktop."}],
    betas=["computer-use-2025-11-24"],
)
```

### SDK Requirements

| SDK        | Minimum            |
| ---------- | ------------------ |
| Python     | 3.9+               |
| TypeScript | 4.9+ (Node.js 20+) |
| Java       | 8+                 |
| Go         | 1.23+              |
| Ruby       | 3.2.0+             |
| C#         | .NET Standard 2.0  |
| PHP        | 8.1.0+             |

### All Available SDKs

| Language   | Install                                                 |
| ---------- | ------------------------------------------------------- |
| Python     | `pip install anthropic`                                 |
| TypeScript | `npm install @anthropic-ai/sdk`                         |
| Java       | `implementation("com.anthropic:anthropic-java:2.32.0")` |
| Go         | `go get github.com/anthropics/anthropic-sdk-go`         |
| Ruby       | `bundle add anthropic`                                  |
| C#         | `dotnet add package Anthropic`                          |
| PHP        | `composer require anthropic-ai/sdk`                     |
| CLI        | `brew install anthropics/tap/ant`                       |

---

## 19. Token Counting API

**Endpoint:** `POST /v1/messages/count_tokens`

Count tokens in a message BEFORE sending to manage costs and rate limits.

Same request body as Messages API except:

- No `max_tokens` (not needed)
- No `stream` (not needed)

Response:

```json
{
  "input_tokens": 2095
}
```

Max request size: 32 MB

---

## Available APIs Summary

### General Availability

| API                 | Endpoint                         | Description                          |
| ------------------- | -------------------------------- | ------------------------------------ |
| Messages API        | `POST /v1/messages`              | Conversational interactions          |
| Message Batches API | `POST /v1/messages/batches`      | Async bulk processing (50% discount) |
| Token Counting API  | `POST /v1/messages/count_tokens` | Count tokens before sending          |
| Models API          | `GET /v1/models`                 | List available models                |

### Beta

| API              | Endpoint                | Beta Header                 |
| ---------------- | ----------------------- | --------------------------- |
| Files API        | `POST /v1/files`        | `files-api-2025-04-14`      |
| Skills API       | `POST /v1/skills`       | —                           |
| Agents API       | `POST /v1/agents`       | `managed-agents-2026-04-01` |
| Sessions API     | `POST /v1/sessions`     | `managed-agents-2026-04-01` |
| Environments API | `POST /v1/environments` | `managed-agents-2026-04-01` |

---

## Quick Reference — Key Facts

| Fact                    | Value                            |
| ----------------------- | -------------------------------- |
| Base URL                | `https://api.anthropic.com`      |
| Current API version     | `2023-06-01`                     |
| Auth header             | `x-api-key: YOUR_KEY`            |
| Version header          | `anthropic-version: 2023-06-01`  |
| Content type            | `content-type: application/json` |
| Max request (Messages)  | 32 MB                            |
| Max request (Batch)     | 256 MB                           |
| Max request (Files)     | 500 MB                           |
| Best current model      | `claude-opus-4-7`                |
| Best fast/smart balance | `claude-sonnet-4-6`              |
| Best for cost           | `claude-haiku-4-5-20251001`      |
| Batch discount          | 50% off standard                 |
| Cache read discount     | 90% off standard (0.1x)          |
| Web search cost         | $10 per 1,000 searches           |

---

_Source: platform.claude.com official documentation — Compiled May 2026_
