# OpenAI API — Comprehensive Reference (May 2026)

# UPDATED — 2026-05-20: Added gpt-5.5-instant (released May 5, 2026 — new ChatGPT default, replaces gpt-5.3-instant, 52.5% fewer hallucinations on high-stakes prompts, rolling out as `chat-latest` alias in API).

# UPDATED — 2026-05-18: Verified against SDK v2.37.0. Marked gpt-5-chat-latest as unconfirmed in SDK type. Added Responses-API-only note for gpt-5-pro-2025-10-06.

> Compiled from the OpenAI Python SDK source, OpenAPI spec v2.3.0, and Node.js SDK README.
> All model IDs, parameters, types, and defaults are sourced directly from the SDK type files.
> Pricing section is best-effort from public sources; verify at https://openai.com/pricing before billing.

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Current Models](#2-current-models)
3. [Chat Completions API](#3-chat-completions-api)
4. [Responses API (New)](#4-responses-api-new)
5. [Legacy Completions API](#5-legacy-completions-api)
6. [Embeddings API](#6-embeddings-api)
7. [Images API](#7-images-api)
8. [Audio API](#8-audio-api)
9. [Moderation API](#9-moderation-api)
10. [Files API](#10-files-api)
11. [Fine-Tuning API](#11-fine-tuning-api)
12. [Batch API](#12-batch-api)
13. [Vector Stores API](#13-vector-stores-api)
14. [Assistants API (Beta)](#14-assistants-api-beta)
15. [Realtime API (Beta)](#15-realtime-api-beta)
16. [Function Calling / Tool Use](#16-function-calling--tool-use)
17. [Structured Outputs](#17-structured-outputs)
18. [Vision (Image Input)](#18-vision-image-input)
19. [Streaming](#19-streaming)
20. [Reasoning Models (o-series & GPT-5)](#20-reasoning-models-o-series--gpt-5)
21. [Built-in Tools](#21-built-in-tools)
22. [Rate Limits](#22-rate-limits)
23. [Error Codes](#23-error-codes)
24. [SDK Usage — Python](#24-sdk-usage--python)
25. [SDK Usage — Node.js / TypeScript](#25-sdk-usage--nodejs--typescript)
26. [Production Best Practices](#26-production-best-practices)

---

## 1. Authentication

### API Key

All endpoints require Bearer token authentication via the `Authorization` header.

```
Authorization: Bearer sk-...
```

Set via environment variable (recommended):

```bash
export OPENAI_API_KEY="sk-..."
```

### Organization / Project ID (Optional)

```
OpenAI-Organization: org-...
OpenAI-Project: proj-...
```

### Beta Endpoints

Assistants API requires an additional header:

```
OpenAI-Beta: assistants=v2
```

### Workload Identity (Kubernetes, Azure, GCP)

The Python and Node SDKs support workload identity authentication — mutually exclusive with `apiKey`:

- Kubernetes service accounts
- Azure managed identity
- GCP compute engine metadata server

Parameters: `identityProviderId`, `serviceAccountId`, `provider`

### Azure OpenAI

Use `AzureOpenAI` class (Python) or constructor (Node) with:

- `api_version`
- `azure_endpoint`
- Azure API key or managed identity

### Base URL

```
https://api.openai.com/v1
```

---

## 2. Current Models

> Legacy models (GPT-3, GPT-3.5 family, davinci, curie, babbage, ada) are excluded.
> Source: `openai.types.shared.chat_model` + `openai.types.shared.responses_model` (SDK v2.37.0, May 2026)

### GPT-5.5 Series (Newest — May 2026)

| Model ID          | Notes                                                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gpt-5.5-instant` | **NEW May 5, 2026** — Replaces gpt-5.3-instant as ChatGPT default. API pointer `chat-latest`. 52.5% fewer hallucinations on high-stakes prompts. Rolling out to API users. |

---

### GPT-5 Series (Current Generation)

| Model ID                  | Notes                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `gpt-5.4`                 | Latest GPT-5 generation                                                                      |
| `gpt-5.4-mini`            | Smaller GPT-5.4 variant                                                                      |
| `gpt-5.4-mini-2026-03-17` | Dated snapshot                                                                               |
| `gpt-5.4-nano`            | Smallest GPT-5.4 variant                                                                     |
| `gpt-5.4-nano-2026-03-17` | Dated snapshot                                                                               |
| `gpt-5.3-chat-latest`     | Latest pointer for gpt-5.3 chat                                                              |
| `gpt-5.2`                 | GPT-5.2 flagship                                                                             |
| `gpt-5.2-2025-12-11`      | Dated snapshot                                                                               |
| `gpt-5.2-chat-latest`     | Latest pointer                                                                               |
| `gpt-5.2-pro`             | GPT-5.2 Pro tier                                                                             |
| `gpt-5.2-pro-2025-12-11`  | Dated snapshot                                                                               |
| `gpt-5.1`                 | GPT-5.1                                                                                      |
| `gpt-5.1-2025-11-13`      | Dated snapshot                                                                               |
| `gpt-5.1-codex`           | Agentic coding specialist                                                                    |
| `gpt-5.1-mini`            | Mini variant                                                                                 |
| `gpt-5.1-chat-latest`     | Latest pointer                                                                               |
| `gpt-5.1-codex-max`       | Max capacity Codex (Responses API only)                                                      |
| `gpt-5`                   | GPT-5 flagship                                                                               |
| `gpt-5-mini`              | Mini variant                                                                                 |
| `gpt-5-nano`              | Nano variant                                                                                 |
| `gpt-5-2025-08-07`        | Dated snapshot                                                                               |
| `gpt-5-mini-2025-08-07`   | Dated snapshot                                                                               |
| `gpt-5-nano-2025-08-07`   | Dated snapshot                                                                               |
| `gpt-5-chat-latest`       | Latest pointer ⚠️ _Unconfirmed in SDK ChatModel type — may be an API alias or may not exist_ |
| `gpt-5-codex`             | Codex variant (Responses API only)                                                           |
| `gpt-5-pro`               | Pro tier (Responses API only)                                                                |
| `gpt-5-pro-2025-10-06`    | Dated snapshot (Responses API only)                                                          |

### GPT-4.1 Series

| Model ID                  | Notes          |
| ------------------------- | -------------- |
| `gpt-4.1`                 | GPT-4.1        |
| `gpt-4.1-mini`            | Mini variant   |
| `gpt-4.1-nano`            | Nano variant   |
| `gpt-4.1-2025-04-14`      | Dated snapshot |
| `gpt-4.1-mini-2025-04-14` | Dated snapshot |
| `gpt-4.1-nano-2025-04-14` | Dated snapshot |

### o-Series Reasoning Models

| Model ID                           | Notes                                      |
| ---------------------------------- | ------------------------------------------ |
| `o4-mini`                          | Latest mini reasoning model                |
| `o4-mini-2025-04-16`               | Dated snapshot                             |
| `o4-mini-deep-research`            | Deep research variant (Responses API only) |
| `o4-mini-deep-research-2025-06-26` | Dated snapshot                             |
| `o3`                               | o3 flagship reasoning                      |
| `o3-2025-04-16`                    | Dated snapshot                             |
| `o3-mini`                          | Smaller o3 reasoning                       |
| `o3-mini-2025-01-31`               | Dated snapshot                             |
| `o3-pro`                           | o3 Pro (Responses API only)                |
| `o3-pro-2025-06-10`                | Dated snapshot                             |
| `o3-deep-research`                 | Deep research (Responses API only)         |
| `o3-deep-research-2025-06-26`      | Dated snapshot                             |
| `o1`                               | o1 reasoning model                         |
| `o1-2024-12-17`                    | Dated snapshot                             |
| `o1-preview`                       | Preview (legacy)                           |
| `o1-preview-2024-09-12`            | Dated snapshot                             |
| `o1-mini`                          | Smaller o1                                 |
| `o1-mini-2024-09-12`               | Dated snapshot                             |
| `o1-pro`                           | o1 Pro (Responses API only)                |
| `o1-pro-2025-03-19`                | Dated snapshot                             |

### GPT-4o Series

| Model ID                                | Notes                    |
| --------------------------------------- | ------------------------ |
| `gpt-4o`                                | GPT-4o flagship          |
| `gpt-4o-2024-11-20`                     | Dated snapshot           |
| `gpt-4o-2024-08-06`                     | Dated snapshot           |
| `gpt-4o-2024-05-13`                     | Dated snapshot           |
| `gpt-4o-mini`                           | GPT-4o Mini              |
| `gpt-4o-mini-2024-07-18`                | Dated snapshot           |
| `gpt-4o-audio-preview`                  | Audio I/O capable        |
| `gpt-4o-audio-preview-2024-10-01`       | Dated snapshot           |
| `gpt-4o-audio-preview-2024-12-17`       | Dated snapshot           |
| `gpt-4o-audio-preview-2025-06-03`       | Dated snapshot           |
| `gpt-4o-mini-audio-preview`             | Mini audio I/O           |
| `gpt-4o-mini-audio-preview-2024-12-17`  | Dated snapshot           |
| `gpt-4o-search-preview`                 | Built-in web search      |
| `gpt-4o-search-preview-2025-03-11`      | Dated snapshot           |
| `gpt-4o-mini-search-preview`            | Mini with web search     |
| `gpt-4o-mini-search-preview-2025-03-11` | Dated snapshot           |
| `chatgpt-4o-latest`                     | ChatGPT-aligned snapshot |

### Specialized Models

| Model ID                          | Notes                             |
| --------------------------------- | --------------------------------- |
| `computer-use-preview`            | Computer use (Responses API only) |
| `computer-use-preview-2025-03-11` | Dated snapshot                    |
| `codex-mini-latest`               | Codex mini                        |

### GPT-4 Turbo / Legacy (Still Active)

| Model ID                 | Notes             |
| ------------------------ | ----------------- |
| `gpt-4-turbo`            | GPT-4 Turbo       |
| `gpt-4-turbo-2024-04-09` | Dated snapshot    |
| `gpt-4-0125-preview`     | Preview           |
| `gpt-4-turbo-preview`    | Preview alias     |
| `gpt-4-1106-preview`     | Preview           |
| `gpt-4-vision-preview`   | Vision model      |
| `gpt-4`                  | Standard GPT-4    |
| `gpt-4-0314`             | Legacy snapshot   |
| `gpt-4-0613`             | Legacy snapshot   |
| `gpt-4-32k`              | 32K context GPT-4 |
| `gpt-4-32k-0314`         | Legacy snapshot   |
| `gpt-4-32k-0613`         | Legacy snapshot   |

### Audio / Speech / Transcription Models

| Model ID                            | Notes                                  |
| ----------------------------------- | -------------------------------------- |
| `gpt-4o-mini-tts`                   | TTS model                              |
| `gpt-4o-mini-tts-2025-12-15`        | Dated snapshot                         |
| `tts-1`                             | Legacy TTS                             |
| `tts-1-hd`                          | High-definition TTS                    |
| `gpt-4o-transcribe`                 | Transcription model                    |
| `gpt-4o-transcribe-diarize`         | Transcription with speaker diarization |
| `gpt-4o-mini-transcribe`            | Mini transcription                     |
| `gpt-4o-mini-transcribe-2025-12-15` | Dated snapshot                         |
| `whisper-1`                         | Legacy transcription/translation       |

### Embedding Models

| Model ID                 | Notes                   |
| ------------------------ | ----------------------- |
| `text-embedding-3-small` | Efficient embedding     |
| `text-embedding-3-large` | High-accuracy embedding |
| `text-embedding-ada-002` | Legacy (still active)   |

### Image Models

| Model ID                 | Notes                      |
| ------------------------ | -------------------------- |
| `dall-e-3`               | DALL-E 3                   |
| `dall-e-2`               | DALL-E 2 (legacy)          |
| `gpt-image-1`            | GPT-based image generation |
| `gpt-image-1-mini`       | Smaller variant            |
| `gpt-image-1.5`          | Updated gpt-image-1        |
| `gpt-image-2`            | GPT Image 2                |
| `gpt-image-2-2026-04-21` | Dated snapshot             |

### Moderation Models

| Model ID                     | Notes                  |
| ---------------------------- | ---------------------- |
| `omni-moderation-latest`     | Latest omni moderation |
| `omni-moderation-2024-09-26` | Dated snapshot         |
| `text-moderation-latest`     | Text-only moderation   |
| `text-moderation-stable`     | Stable text moderation |

### Realtime Models

| Model ID                       | Notes             |
| ------------------------------ | ----------------- |
| `gpt-realtime`                 | Realtime flagship |
| `gpt-realtime-2025-08-28`      | Dated snapshot    |
| `gpt-4o-realtime-preview`      | GPT-4o realtime   |
| `gpt-4o-mini-realtime-preview` | Mini realtime     |

---

## 3. Chat Completions API

**Endpoint:** `POST /v1/chat/completions`

**SDK:** `client.chat.completions.create(...)`

### Request Parameters

#### Required

| Parameter  | Type               | Description                                         |
| ---------- | ------------------ | --------------------------------------------------- |
| `model`    | `str \| ChatModel` | Model ID (e.g., `gpt-4o`, `o3`, `gpt-5.2`)          |
| `messages` | `array`            | List of message objects comprising the conversation |

#### Message Object Roles

- `system` — System/developer instructions (use `developer` in newer models)
- `developer` — Developer-level instructions (newer convention replacing `system`)
- `user` — User turn
- `assistant` — Prior assistant turn
- `tool` — Tool output
- `function` — Deprecated; use `tool`

#### Optional Parameters

| Parameter                | Type                                                                         | Default         | Description                                                                         |
| ------------------------ | ---------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------- |
| `audio`                  | `ChatCompletionAudioParam`                                                   | —               | Audio output settings. Required when `modalities: ["audio"]`                        |
| `frequency_penalty`      | `float`                                                                      | `0`             | -2.0 to 2.0. Positive values reduce repetition of already-used tokens               |
| `function_call`          | `"none" \| "auto" \| {name}`                                                 | —               | **Deprecated.** Use `tool_choice` instead                                           |
| `functions`              | `array`                                                                      | —               | **Deprecated.** Use `tools` instead                                                 |
| `logit_bias`             | `Dict[str, int]`                                                             | `null`          | Token ID → bias value (-100 to 100). Modifies token selection probability           |
| `logprobs`               | `bool`                                                                       | `false`         | Return log probabilities for output tokens                                          |
| `max_completion_tokens`  | `int`                                                                        | `null`          | Max tokens including reasoning. Preferred over `max_tokens` for o-series            |
| `max_tokens`             | `int`                                                                        | `null`          | **Deprecated for o-series.** Max tokens in response                                 |
| `metadata`               | `object`                                                                     | `null`          | Up to 16 key-value pairs (keys ≤64 chars, values ≤512 chars)                        |
| `modalities`             | `["text"] \| ["text","audio"]`                                               | `["text"]`      | Output types to generate                                                            |
| `n`                      | `int`                                                                        | `1`             | Number of completion choices per prompt. Each is charged separately                 |
| `parallel_tool_calls`    | `bool`                                                                       | `true`          | Allow parallel function calls in a single response                                  |
| `prediction`             | `ChatCompletionPredictionContentParam`                                       | —               | Predicted output for regeneration efficiency                                        |
| `presence_penalty`       | `float`                                                                      | `0`             | -2.0 to 2.0. Positive values encourage new topic tokens                             |
| `prompt_cache_key`       | `str`                                                                        | —               | Cache optimization key (replaces `user`)                                            |
| `prompt_cache_retention` | `"in_memory" \| "24h"`                                                       | —               | Cache persistence duration                                                          |
| `reasoning_effort`       | `ReasoningEffort`                                                            | model-dependent | See Reasoning section                                                               |
| `response_format`        | `ResponseFormatText \| ResponseFormatJSONObject \| ResponseFormatJSONSchema` | —               | Output format. `json_schema` enables Structured Outputs                             |
| `safety_identifier`      | `str`                                                                        | —               | User identifier for abuse detection (≤64 chars). Replaces `user`                    |
| `seed`                   | `int`                                                                        | `null`          | Beta: deterministic sampling. Same seed + params → same output (best effort)        |
| `service_tier`           | `"auto" \| "default" \| "flex" \| "scale" \| "priority"`                     | `"auto"`        | Processing tier                                                                     |
| `stop`                   | `str \| array`                                                               | `null`          | Up to 4 stop sequences. Output excludes the stop sequence. Not for reasoning models |
| `store`                  | `bool`                                                                       | `false`         | Store output for model distillation and evals                                       |
| `stream`                 | `bool`                                                                       | `false`         | Stream partial results via SSE                                                      |
| `stream_options`         | `ChatCompletionStreamOptionsParam`                                           | —               | Only valid with `stream: true`. See Streaming section                               |
| `temperature`            | `float`                                                                      | `1`             | 0 to 2. Higher = more random. Do not use with `top_p` simultaneously                |
| `tool_choice`            | `"none" \| "auto" \| "required" \| {type, function: {name}}`                 | `"auto"`        | Tool selection strategy                                                             |
| `tools`                  | `array`                                                                      | —               | List of tool objects (functions) the model can call                                 |
| `top_logprobs`           | `int`                                                                        | `null`          | 0 to 20. Most likely tokens at each position. Requires `logprobs: true`             |
| `top_p`                  | `float`                                                                      | `1`             | 0 to 1. Nucleus sampling. Alternative to `temperature`                              |
| `user`                   | `str`                                                                        | —               | **Deprecated.** Use `safety_identifier` and `prompt_cache_key`                      |
| `verbosity`              | `"low" \| "medium" \| "high"`                                                | —               | Response conciseness constraint                                                     |
| `web_search_options`     | `WebSearchOptions`                                                           | —               | Enable web search augmentation                                                      |

#### WebSearchOptions

| Parameter             | Type                           | Description                                 |
| --------------------- | ------------------------------ | ------------------------------------------- |
| `search_context_size` | `"low" \| "medium" \| "high"`  | Context window space for search results     |
| `user_location`       | `WebSearchOptionsUserLocation` | Approximate user location for local results |

### Response Object: ChatCompletion

```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "gpt-4o",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "...",
        "tool_calls": [],
        "refusal": null
      },
      "finish_reason": "stop",
      "logprobs": null
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  },
  "service_tier": "default",
  "system_fingerprint": "fp_..."
}
```

#### finish_reason Values

| Value              | Meaning                                         |
| ------------------ | ----------------------------------------------- |
| `"stop"`           | Natural completion or stop sequence hit         |
| `"length"`         | `max_completion_tokens` or `max_tokens` reached |
| `"tool_calls"`     | Model wants to call a tool                      |
| `"content_filter"` | Content filtered                                |
| `"function_call"`  | Deprecated function call                        |

#### service_tier Values

`"auto"` | `"default"` | `"flex"` | `"scale"` | `"priority"`

---

## 4. Responses API (New)

The Responses API is the **current standard** for new integrations. It supersedes Chat Completions for most use cases.

**Endpoint:** `POST /v1/responses`

**SDK:**

- Python: `client.responses.create(...)`
- Node: `client.responses.create(...)`

### Request Parameters

#### Required

| Parameter | Type                        | Description                                                    |
| --------- | --------------------------- | -------------------------------------------------------------- |
| `model`   | `ResponsesModel`            | Model ID. Accepts all ChatModel IDs plus Responses-only models |
| `input`   | `str \| ResponseInputParam` | Text, image, or file inputs                                    |
| `text`    | `ResponseTextConfigParam`   | Text response configuration (plain or structured JSON)         |

#### Optional

| Parameter                | Type                                                     | Default      | Description                                                                                                                                                                                                                                                                |
| ------------------------ | -------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `background`             | `bool`                                                   | `false`      | Run model response in background (async)                                                                                                                                                                                                                                   |
| `context_management`     | `array[ContextManagement]`                               | —            | Context management. Currently only `{type: "compaction", compact_threshold: N}`                                                                                                                                                                                            |
| `conversation`           | `str \| ResponseConversationParamParam`                  | —            | Conversation reference. Prepends conversation items to input                                                                                                                                                                                                               |
| `include`                | `array[ResponseIncludable]`                              | —            | Additional data to include. Values: `web_search_call.action.sources`, `code_interpreter_call.outputs`, `computer_call_output.output.image_url`, `file_search_call.results`, `message.input_image.image_url`, `message.output_text.logprobs`, `reasoning.encrypted_content` |
| `instructions`           | `str`                                                    | —            | System/developer message                                                                                                                                                                                                                                                   |
| `max_output_tokens`      | `int`                                                    | —            | Upper bound on generated tokens including reasoning                                                                                                                                                                                                                        |
| `max_tool_calls`         | `int`                                                    | —            | Max calls to built-in tools                                                                                                                                                                                                                                                |
| `metadata`               | `object`                                                 | —            | 16 key-value pairs (keys ≤64, values ≤512)                                                                                                                                                                                                                                 |
| `parallel_tool_calls`    | `bool`                                                   | `true`       | Allow parallel tool execution                                                                                                                                                                                                                                              |
| `previous_response_id`   | `str`                                                    | —            | Prior response ID for multi-turn (stateful) conversations                                                                                                                                                                                                                  |
| `prompt`                 | `ResponsePromptParam`                                    | —            | Prompt template with variables                                                                                                                                                                                                                                             |
| `prompt_cache_key`       | `str`                                                    | —            | Cache optimization identifier                                                                                                                                                                                                                                              |
| `prompt_cache_retention` | `"in_memory" \| "24h"`                                   | —            | Cache persistence                                                                                                                                                                                                                                                          |
| `reasoning`              | `Reasoning`                                              | —            | Reasoning config for o-series / GPT-5 models                                                                                                                                                                                                                               |
| `safety_identifier`      | `str`                                                    | —            | Stable user ID for abuse detection                                                                                                                                                                                                                                         |
| `service_tier`           | `"auto" \| "default" \| "flex" \| "scale" \| "priority"` | `"auto"`     | Processing tier                                                                                                                                                                                                                                                            |
| `store`                  | `bool`                                                   | `false`      | Store response for later retrieval                                                                                                                                                                                                                                         |
| `stream`                 | `bool`                                                   | `false`      | Enable SSE streaming                                                                                                                                                                                                                                                       |
| `stream_options`         | `StreamOptions`                                          | —            | `{include_obfuscation: bool}`                                                                                                                                                                                                                                              |
| `temperature`            | `float`                                                  | `1`          | 0 to 2                                                                                                                                                                                                                                                                     |
| `tool_choice`            | `ToolChoice`                                             | `"auto"`     | Tool selection                                                                                                                                                                                                                                                             |
| `tools`                  | `array[ToolParam]`                                       | —            | Built-in, MCP, or custom tools                                                                                                                                                                                                                                             |
| `top_logprobs`           | `int`                                                    | —            | 0 to 20                                                                                                                                                                                                                                                                    |
| `top_p`                  | `float`                                                  | `1`          | Nucleus sampling                                                                                                                                                                                                                                                           |
| `truncation`             | `"auto" \| "disabled"`                                   | `"disabled"` | Context truncation strategy                                                                                                                                                                                                                                                |
| `user`                   | `str`                                                    | —            | Deprecated; use `safety_identifier`                                                                                                                                                                                                                                        |

#### ContextManagement Object

```json
{
  "type": "compaction",
  "compact_threshold": 50000
}
```

Currently only `"compaction"` type is supported.

### Response Object

```json
{
  "id": "resp_...",
  "object": "response",
  "created_at": 1234567890.0,
  "completed_at": 1234567891.0,
  "model": "gpt-4o",
  "status": "completed",
  "output": [...],
  "output_text": "...",
  "usage": {
    "input_tokens": 10,
    "output_tokens": 20,
    "total_tokens": 30,
    "input_tokens_details": {"cached_tokens": 0},
    "output_tokens_details": {"reasoning_tokens": 0}
  },
  "instructions": null,
  "temperature": 1.0,
  "top_p": 1.0,
  "service_tier": "default",
  "metadata": {}
}
```

#### status Values

`"queued"` | `"in_progress"` | `"completed"` | `"failed"` | `"incomplete"` | `"cancelled"`

#### Output Item Types (ResponseOutputItem union)

| Type                                  | Description                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------ |
| `ResponseOutputMessage`               | Text message output                                                            |
| `ResponseReasoningItem`               | Model reasoning chain                                                          |
| `ResponseCompactionItem`              | Compacted context                                                              |
| `ResponseFunctionToolCall`            | Function invocation                                                            |
| `ResponseFunctionToolCallOutputItem`  | Function result                                                                |
| `ResponseFileSearchToolCall`          | File search operation                                                          |
| `ResponseComputerToolCall`            | Computer interaction                                                           |
| `ResponseComputerToolCallOutputItem`  | Computer action result                                                         |
| `ResponseFunctionShellToolCall`       | Shell command                                                                  |
| `ResponseFunctionShellToolCallOutput` | Shell output                                                                   |
| `ResponseCodeInterpreterToolCall`     | Code execution                                                                 |
| `ResponseApplyPatchToolCall`          | Patch application                                                              |
| `ResponseApplyPatchToolCallOutput`    | Patch result                                                                   |
| `ResponseCustomToolCall`              | Custom tool call                                                               |
| `ResponseCustomToolCallOutputItem`    | Custom tool result                                                             |
| `ResponseToolSearchCall`              | Tool search                                                                    |
| `ResponseToolSearchOutputItem`        | Search result                                                                  |
| `ResponseFunctionWebSearch`           | Web search                                                                     |
| `ImageGenerationCall`                 | Image generation (id, result, status, type)                                    |
| `LocalShellCall`                      | Local shell (id, action, call_id, status, type)                                |
| `LocalShellCallOutput`                | Local shell output (id, output, type, status)                                  |
| `McpCall`                             | MCP tool invocation (id, arguments, name, server_label, status, error, output) |
| `McpListTools`                        | Available MCP tools (id, server_label, tools, type)                            |
| `McpApprovalRequest`                  | MCP approval request                                                           |
| `McpApprovalResponse`                 | MCP approval response                                                          |

### Additional Response API Endpoints

```
GET  /v1/responses/{response_id}          # Retrieve stored response
DELETE /v1/responses/{response_id}        # Delete stored response
GET  /v1/responses/{response_id}/input_items  # List input items
```

---

## 5. Legacy Completions API

> For legacy text-in/text-out tasks. For new work, use Chat Completions or Responses API.

**Endpoint:** `POST /v1/completions`

**SDK:** `client.completions.create(...)`

### Supported Models

- `gpt-3.5-turbo-instruct`
- `davinci-002`
- `babbage-002`

### Parameters

| Parameter           | Type                               | Required | Default | Description                                           |
| ------------------- | ---------------------------------- | -------- | ------- | ----------------------------------------------------- |
| `model`             | `str`                              | Yes      | —       | Model ID                                              |
| `prompt`            | `str \| str[] \| int[] \| int[][]` | Yes      | —       | Prompt(s) to complete                                 |
| `best_of`           | `int`                              | No       | `1`     | Generate N server-side, return best                   |
| `echo`              | `bool`                             | No       | `false` | Echo prompt in response                               |
| `frequency_penalty` | `float`                            | No       | `0`     | -2.0 to 2.0                                           |
| `logit_bias`        | `Dict[str, int]`                   | No       | `null`  | Token probability adjustments                         |
| `logprobs`          | `int`                              | No       | `null`  | Return top-N log probabilities                        |
| `max_tokens`        | `int`                              | No       | `16`    | Max tokens to generate                                |
| `n`                 | `int`                              | No       | `1`     | Completions per prompt                                |
| `presence_penalty`  | `float`                            | No       | `0`     | -2.0 to 2.0                                           |
| `seed`              | `int`                              | No       | `null`  | Deterministic sampling                                |
| `stop`              | `str \| str[]`                     | No       | `null`  | Up to 4 stop sequences                                |
| `stream`            | `bool`                             | No       | `false` | Enable SSE streaming                                  |
| `stream_options`    | `object`                           | No       | —       | Only with `stream: true`                              |
| `suffix`            | `str`                              | No       | `null`  | Suffix after completion (gpt-3.5-turbo-instruct only) |
| `temperature`       | `float`                            | No       | `1`     | 0 to 2                                                |
| `top_p`             | `float`                            | No       | `1`     | Nucleus sampling                                      |
| `user`              | `str`                              | No       | —       | End-user ID for abuse detection                       |

---

## 6. Embeddings API

**Endpoint:** `POST /v1/embeddings`

**SDK:** `client.embeddings.create(...)`

### Parameters

| Parameter         | Type                               | Required | Description                                                                                         |
| ----------------- | ---------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `model`           | `str \| EmbeddingModel`            | Yes      | Embedding model ID                                                                                  |
| `input`           | `str \| str[] \| int[] \| int[][]` | Yes      | Text/token arrays to embed. Max 8,192 tokens per input; 300,000 tokens across all inputs in request |
| `dimensions`      | `int`                              | No       | Output dimensionality. Only supported in `text-embedding-3` and later                               |
| `encoding_format` | `"float" \| "base64"`              | No       | Format of returned embeddings. Default: `"float"`                                                   |
| `user`            | `str`                              | No       | End-user identifier                                                                                 |

### Embedding Models

| Model                    | Dimensions       | Max Input Tokens | Notes                |
| ------------------------ | ---------------- | ---------------- | -------------------- |
| `text-embedding-3-large` | 3072 (reducible) | 8,191            | Best accuracy        |
| `text-embedding-3-small` | 1536 (reducible) | 8,191            | Cost-efficient       |
| `text-embedding-ada-002` | 1536 (fixed)     | 8,191            | Legacy, still active |

### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [0.0023, -0.009, ...]
    }
  ],
  "model": "text-embedding-3-small",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
```

---

## 7. Images API

### 7.1 Image Generation

**Endpoint:** `POST /v1/images/generations`

**SDK:** `client.images.generate(...)`

| Parameter            | Type                                  | Required | Description                                                                                                                                                                        |
| -------------------- | ------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prompt`             | `str`                                 | Yes      | Text description. Max: 32,000 chars (GPT models), 4,000 chars (DALL-E-3), 1,000 chars (DALL-E-2)                                                                                   |
| `model`              | `str \| ImageModel`                   | No       | Default: `dall-e-2` (unless GPT-specific param used). Options: `dall-e-2`, `dall-e-3`, `gpt-image-1`, `gpt-image-1-mini`, `gpt-image-1.5`, `gpt-image-2`, `gpt-image-2-2026-04-21` |
| `n`                  | `int`                                 | No       | 1–10 images. DALL-E-3 only supports `n=1`                                                                                                                                          |
| `size`               | `str`                                 | No       | `"auto"`, `"256x256"`, `"512x512"`, `"1024x1024"`, `"1536x1024"`, `"1024x1536"`, `"1792x1024"`, `"1024x1792"`. GPT models support custom `WIDTHxHEIGHT`                            |
| `quality`            | `str`                                 | No       | `"auto"`, `"standard"`, `"hd"`, `"low"`, `"medium"`, `"high"`. Model-dependent availability                                                                                        |
| `style`              | `"vivid" \| "natural"`                | No       | **DALL-E-3 only.** `"vivid"` = hyper-real; `"natural"` = natural                                                                                                                   |
| `response_format`    | `"url" \| "b64_json"`                 | No       | DALL-E models only. URLs valid for 60 minutes. GPT models always return base64                                                                                                     |
| `background`         | `"transparent" \| "opaque" \| "auto"` | No       | Transparency for GPT image models                                                                                                                                                  |
| `output_format`      | `"png" \| "jpeg" \| "webp"`           | No       | GPT image models only                                                                                                                                                              |
| `output_compression` | `int`                                 | No       | 0–100% for webp/jpeg GPT models. Default: 100                                                                                                                                      |
| `moderation`         | `"low" \| "auto"`                     | No       | Content filter intensity for GPT image models                                                                                                                                      |
| `partial_images`     | `int`                                 | No       | 0–3 intermediate images in streaming                                                                                                                                               |
| `stream`             | `bool`                                | No       | Streaming mode (GPT image models only)                                                                                                                                             |
| `user`               | `str`                                 | No       | End-user identifier                                                                                                                                                                |

### 7.2 Image Editing

**Endpoint:** `POST /v1/images/edits`

**SDK:** `client.images.edit(...)`

| Parameter            | Type                                  | Required | Description                                                                       |
| -------------------- | ------------------------------------- | -------- | --------------------------------------------------------------------------------- |
| `image`              | `FileTypes \| FileTypes[]`            | Yes      | PNG, WebP, or JPG ≤50MB (GPT, up to 16 images); single square PNG ≤4MB (DALL-E-2) |
| `prompt`             | `str`                                 | Yes      | Edit description. Max 1,000 chars (DALL-E-2); 32,000 chars (GPT)                  |
| `model`              | `str \| ImageModel`                   | No       | Default: `gpt-image-1.5`                                                          |
| `mask`               | `FileTypes`                           | No       | PNG with transparent areas indicating regions to edit                             |
| `background`         | `"transparent" \| "opaque" \| "auto"` | No       | Background transparency. Not for `gpt-image-2`                                    |
| `input_fidelity`     | `"high" \| "low"`                     | No       | Style/feature match intensity. GPT image 1+. Default: `"low"`                     |
| `n`                  | `int`                                 | No       | 1–10                                                                              |
| `output_format`      | `"png" \| "jpeg" \| "webp"`           | No       | GPT models only. Default: `"png"`                                                 |
| `output_compression` | `int`                                 | No       | 0–100%. GPT webp/jpeg                                                             |
| `quality`            | `str`                                 | No       | `"standard"`, `"low"`, `"medium"`, `"high"`, `"auto"`. Default: `"auto"`          |
| `response_format`    | `"url" \| "b64_json"`                 | No       | DALL-E-2 only. GPT always base64                                                  |
| `size`               | `str`                                 | No       | Preset or custom `WIDTHxHEIGHT`                                                   |
| `partial_images`     | `int`                                 | No       | 0–3 streaming intermediate images                                                 |
| `stream`             | `bool`                                | No       | Streaming mode                                                                    |
| `user`               | `str`                                 | No       | End-user identifier                                                               |

### 7.3 Image Variations

**Endpoint:** `POST /v1/images/variations`

**SDK:** `client.images.create_variation(...)`

> DALL-E-2 only. Create variations of an existing image.

---

## 8. Audio API

### 8.1 Text-to-Speech (TTS)

**Endpoint:** `POST /v1/audio/speech`

**SDK:** `client.audio.speech.create(...)`

Returns binary audio content.

| Parameter         | Type                 | Required | Description                                                                                                                          |
| ----------------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `input`           | `str`                | Yes      | Text to convert. Max 4,096 characters                                                                                                |
| `model`           | `str \| SpeechModel` | Yes      | `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts`, `gpt-4o-mini-tts-2025-12-15`                                                                 |
| `voice`           | `Voice`              | Yes      | `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, `shimmer`, `verse`, `marin`, `cedar` (or custom VoiceID) |
| `instructions`    | `str`                | No       | Voice control directives. Incompatible with older TTS models                                                                         |
| `response_format` | `str`                | No       | `mp3`, `opus`, `aac`, `flac`, `wav`, `pcm`. Default: `mp3`                                                                           |
| `speed`           | `float`              | No       | 0.25 to 4.0. Default: 1.0                                                                                                            |
| `stream_format`   | `"sse" \| "audio"`   | No       | Streaming format. `sse` unsupported for older models                                                                                 |

### 8.2 Speech-to-Text (Transcription)

**Endpoint:** `POST /v1/audio/transcriptions`

**SDK:** `client.audio.transcriptions.create(...)`

| Parameter                  | Type                                  | Required | Description                                                                                                                  |
| -------------------------- | ------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `file`                     | `FileTypes`                           | Yes      | Audio file: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm                                                                  |
| `model`                    | `str \| AudioModel`                   | Yes      | `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe-diarize`, `whisper-1` |
| `chunking_strategy`        | `"auto" \| ChunkingStrategyVadConfig` | No       | Audio chunking. `"auto"` = normalize + VAD. Required for diarize with inputs >30s                                            |
| `include`                  | `array[TranscriptionInclude]`         | No       | Additional data. `logprobs` only with `json` format + specific models                                                        |
| `known_speaker_names`      | `str[]`                               | No       | Speaker identifiers (e.g., "customer", "agent"). Up to 4                                                                     |
| `known_speaker_references` | `str[]`                               | No       | Audio sample data URLs for speaker identification. 2–10 seconds each                                                         |
| `language`                 | `str`                                 | No       | ISO-639-1 language code (e.g., `"en"`). Improves accuracy and latency                                                        |
| `prompt`                   | `str`                                 | No       | Guidance matching audio language. Not supported for `gpt-4o-transcribe-diarize`                                              |
| `response_format`          | `AudioResponseFormat`                 | No       | `json`, `text`, `srt`, `verbose_json`, `vtt`, `diarized_json`. Model-specific constraints                                    |
| `temperature`              | `float`                               | No       | 0 to 1. Default: 0 (uses log probability for auto fallback)                                                                  |
| `timestamp_granularities`  | `["word" \| "segment"]`               | No       | Requires `verbose_json`. Word timestamps incur extra latency                                                                 |
| `stream`                   | `bool`                                | No       | Enable SSE streaming                                                                                                         |

#### ChunkingStrategyVadConfig

```json
{
  "type": "server_vad",
  "prefix_padding_ms": 300,
  "silence_duration_ms": 500,
  "threshold": 0.5
}
```

### 8.3 Audio Translation

**Endpoint:** `POST /v1/audio/translations`

**SDK:** `client.audio.translations.create(...)`

Translates non-English audio to English text.

| Parameter         | Type                | Required | Description                                  |
| ----------------- | ------------------- | -------- | -------------------------------------------- |
| `file`            | `FileTypes`         | Yes      | Audio file                                   |
| `model`           | `str \| AudioModel` | Yes      | `whisper-1`                                  |
| `response_format` | `str`               | No       | `json`, `text`, `srt`, `verbose_json`, `vtt` |
| `prompt`          | `str`               | No       | English guidance text                        |
| `temperature`     | `float`             | No       | 0 to 1                                       |

### 8.4 Custom Voices

**Endpoint:** `POST /v1/audio/voices`

Creates a custom voice (requires voice consent recording).

| Parameter      | Type                   | Required |
| -------------- | ---------------------- | -------- |
| `name`         | `str`                  | Yes      |
| `consent`      | `VoiceConsentResource` | Yes      |
| `audio_sample` | `FileTypes`            | Yes      |

**Voice Consent Endpoints:**

- `POST /v1/audio/voice_consents` — Upload consent recording
- `GET /v1/audio/voice_consents` — List consents (params: `after`, `limit` 1–100, default 20)
- `GET /v1/audio/voice_consents/{consent_id}` — Retrieve
- `POST /v1/audio/voice_consents/{consent_id}` — Update metadata
- `DELETE /v1/audio/voice_consents/{consent_id}` — Delete

---

## 9. Moderation API

**Endpoint:** `POST /v1/moderations`

**SDK:** `client.moderations.create(...)`

| Parameter | Type                                          | Required | Description                                                                                                |
| --------- | --------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `input`   | `str \| str[] \| ModerationMultiModalInput[]` | Yes      | Text or multi-modal inputs to classify                                                                     |
| `model`   | `str \| ModerationModel`                      | No       | `omni-moderation-latest`, `omni-moderation-2024-09-26`, `text-moderation-latest`, `text-moderation-stable` |

### Moderation Categories

`harassment`, `harassment/threatening`, `hate`, `hate/threatening`, `illicit`, `illicit/violent`, `self-harm`, `self-harm/instructions`, `self-harm/intent`, `sexual`, `sexual/minors`, `violence`, `violence/graphic`

---

## 10. Files API

**Endpoint base:** `/v1/files`

**SDK:** `client.files.*`

| Method                  | Endpoint                          | Description                                   |
| ----------------------- | --------------------------------- | --------------------------------------------- |
| `create()`              | `POST /v1/files`                  | Upload a file                                 |
| `retrieve(file_id)`     | `GET /v1/files/{file_id}`         | Get file metadata                             |
| `list()`                | `GET /v1/files`                   | List files                                    |
| `delete(file_id)`       | `DELETE /v1/files/{file_id}`      | Delete a file                                 |
| `content(file_id)`      | `GET /v1/files/{file_id}/content` | Download file content                         |
| `wait_for_processing()` | —                                 | Helper: poll until file status is `processed` |

### File Purposes (FilePurpose)

`"assistants"` | `"assistants_output"` | `"batch"` | `"batch_output"` | `"fine-tune"` | `"fine-tune-results"` | `"vision"`

### FileObject Schema

```json
{
  "id": "file-...",
  "object": "file",
  "bytes": 1234,
  "created_at": 1234567890,
  "filename": "training.jsonl",
  "purpose": "fine-tune",
  "status": "processed"
}
```

### Multipart Upload (Large Files)

For files too large for a single upload:

- `POST /v1/uploads` — Create upload
- `POST /v1/uploads/{upload_id}/parts` — Add parts
- `POST /v1/uploads/{upload_id}/complete` — Finalize
- `POST /v1/uploads/{upload_id}/cancel` — Cancel

---

## 11. Fine-Tuning API

**Endpoint base:** `/v1/fine_tuning`

**SDK:** `client.fine_tuning.jobs.*`

### Create Fine-Tuning Job

**Endpoint:** `POST /v1/fine_tuning/jobs`

| Parameter         | Type     | Required | Description                                                              |
| ----------------- | -------- | -------- | ------------------------------------------------------------------------ |
| `model`           | `str`    | Yes      | Base model: `gpt-4o-mini`, `gpt-3.5-turbo`, `babbage-002`, `davinci-002` |
| `training_file`   | `str`    | Yes      | File ID of JSONL training data                                           |
| `method`          | `Method` | Yes      | Fine-tuning method                                                       |
| `validation_file` | `str`    | No       | File ID of JSONL validation data                                         |
| `hyperparameters` | `object` | No       | **Deprecated.** Use `method` instead                                     |
| `integrations`    | `array`  | No       | Integrations (e.g., `wandb`)                                             |
| `metadata`        | `object` | No       | 16 key-value pairs                                                       |
| `seed`            | `int`    | No       | Reproducibility seed                                                     |
| `suffix`          | `str`    | No       | Up to 64-char suffix appended to fine-tuned model name                   |

#### Method Object

```json
{
  "type": "supervised",
  "supervised": {
    "hyperparameters": {
      "batch_size": "auto",
      "learning_rate_multiplier": "auto",
      "n_epochs": "auto"
    }
  }
}
```

| type              | Description                     |
| ----------------- | ------------------------------- |
| `"supervised"`    | Standard supervised fine-tuning |
| `"dpo"`           | Direct Preference Optimization  |
| `"reinforcement"` | Reinforcement fine-tuning       |

#### Weights & Biases Integration

```json
{
  "type": "wandb",
  "wandb": {
    "project": "my-project",
    "entity": "my-org",
    "name": "run-name",
    "tags": ["tag1", "tag2"]
  }
}
```

### Job Management Endpoints

| Method                     | Description               |
| -------------------------- | ------------------------- |
| `retrieve(job_id)`         | Get job status            |
| `list()`                   | List jobs                 |
| `cancel(job_id)`           | Cancel a running job      |
| `list_events(job_id)`      | Get job events            |
| `pause(job_id)`            | Pause a running job       |
| `resume(job_id)`           | Resume a paused job       |
| `checkpoints.list(job_id)` | List training checkpoints |

### Fine-Tuned Model Permissions

```
POST   /v1/fine_tuning/jobs/{checkpoint}/permissions
GET    /v1/fine_tuning/jobs/{checkpoint}/permissions
DELETE /v1/fine_tuning/jobs/{permission_id}
```

### Alpha Graders

```
POST /v1/fine_tuning/alpha/graders/run
POST /v1/fine_tuning/alpha/graders/validate
```

Grader types: `LabelModelGrader`, `MultiGrader`, `PythonGrader`, `ScoreModelGrader`, `StringCheckGrader`, `TextSimilarityGrader`

---

## 12. Batch API

**Endpoint base:** `/v1/batches`

**SDK:** `client.batches.*`

Process large numbers of API requests asynchronously at lower cost.

### Create Batch

**Endpoint:** `POST /v1/batches`

| Parameter              | Type                 | Required | Description                                         |
| ---------------------- | -------------------- | -------- | --------------------------------------------------- |
| `input_file_id`        | `str`                | Yes      | File ID of JSONL input (max 50,000 requests, 200MB) |
| `endpoint`             | `str`                | Yes      | Target endpoint                                     |
| `completion_window`    | `"24h"`              | Yes      | Processing time limit (currently only `"24h"`)      |
| `metadata`             | `object`             | No       | 16 key-value pairs                                  |
| `output_expires_after` | `OutputExpiresAfter` | No       | Expiration policy for output files                  |

#### Supported Batch Endpoints

- `/v1/responses`
- `/v1/chat/completions`
- `/v1/embeddings`
- `/v1/completions`
- `/v1/moderations`
- `/v1/images/generations`
- `/v1/images/edits`
- `/v1/videos`

#### OutputExpiresAfter

```json
{
  "anchor": "created_at",
  "seconds": 86400
}
```

`seconds` range: 3,600 to 2,592,000

### Input JSONL Format

Each line:

```json
{
  "custom_id": "request-1",
  "method": "POST",
  "url": "/v1/chat/completions",
  "body": {
    "model": "gpt-4o",
    "messages": [{ "role": "user", "content": "Hello" }]
  }
}
```

### Batch Status Values

`"validating"` | `"failed"` | `"in_progress"` | `"finalizing"` | `"completed"` | `"expired"` | `"cancelling"` | `"cancelled"`

### Batch Object

```json
{
  "id": "batch_...",
  "object": "batch",
  "endpoint": "/v1/chat/completions",
  "input_file_id": "file-...",
  "output_file_id": "file-...",
  "error_file_id": "file-...",
  "status": "completed",
  "request_counts": {
    "total": 100,
    "completed": 98,
    "failed": 2
  },
  "created_at": 1234567890,
  "completed_at": 1234567899
}
```

### Management

| Method               | Description                 |
| -------------------- | --------------------------- |
| `retrieve(batch_id)` | Get batch status            |
| `list()`             | List all batches            |
| `cancel(batch_id)`   | Cancel an in-progress batch |

---

## 13. Vector Stores API

**Endpoint base:** `/v1/vector_stores`

**SDK:** `client.vector_stores.*`

### Create Vector Store

**Endpoint:** `POST /v1/vector_stores`

| Parameter           | Type                        | Required | Description                                        |
| ------------------- | --------------------------- | -------- | -------------------------------------------------- |
| `name`              | `str`                       | No       | Vector store name                                  |
| `description`       | `str`                       | No       | Purpose description                                |
| `file_ids`          | `str[]`                     | No       | File IDs to include. Chunking applied if non-empty |
| `chunking_strategy` | `FileChunkingStrategyParam` | No       | `"auto"` (default) or static config                |
| `metadata`          | `object`                    | No       | 16 key-value pairs                                 |
| `expires_after`     | `ExpiresAfter`              | No       | Expiration policy                                  |

#### ExpiresAfter

```json
{
  "anchor": "last_active_at",
  "days": 30
}
```

#### Chunking Strategies

**Auto (default):** 800 token max chunks, 400 token overlap

**Static:**

```json
{
  "type": "static",
  "static": {
    "max_chunk_size_tokens": 800,
    "chunk_overlap_tokens": 400
  }
}
```

`max_chunk_size_tokens`: 100–4,096  
`chunk_overlap_tokens`: max = half of chunk size

### Management Endpoints

```
GET    /v1/vector_stores                          # List
GET    /v1/vector_stores/{id}                     # Retrieve
POST   /v1/vector_stores/{id}                     # Update
DELETE /v1/vector_stores/{id}                     # Delete
POST   /v1/vector_stores/{id}/search              # Search

POST   /v1/vector_stores/{id}/files               # Add file
GET    /v1/vector_stores/{id}/files/{file_id}     # Retrieve file
POST   /v1/vector_stores/{id}/files/{file_id}     # Update file
GET    /v1/vector_stores/{id}/files               # List files
DELETE /v1/vector_stores/{id}/files/{file_id}     # Remove file
GET    /v1/vector_stores/{id}/files/{file_id}/content  # File content

POST   /v1/vector_stores/{id}/file_batches         # Create file batch
GET    /v1/vector_stores/{id}/file_batches/{batch} # Retrieve batch
POST   /v1/vector_stores/{id}/file_batches/{batch}/cancel
GET    /v1/vector_stores/{id}/file_batches/{batch}/files
```

### VectorStoreSearchResponse

```json
{
  "object": "vector_store.search_results.page",
  "data": [
    {
      "file_id": "file-...",
      "filename": "doc.pdf",
      "score": 0.95,
      "attributes": {},
      "content": [{ "type": "text", "text": "..." }]
    }
  ],
  "has_more": false
}
```

---

## 14. Assistants API (Beta)

> Requires header: `OpenAI-Beta: assistants=v2`

**Endpoint base:** `/v1/assistants`

### Create Assistant

**Endpoint:** `POST /v1/assistants`

| Parameter          | Type                            | Required | Description                                                         |
| ------------------ | ------------------------------- | -------- | ------------------------------------------------------------------- |
| `model`            | `str \| ChatModel`              | Yes      | Model ID                                                            |
| `name`             | `str`                           | No       | Max 256 characters                                                  |
| `description`      | `str`                           | No       | Max 512 characters                                                  |
| `instructions`     | `str`                           | No       | System prompt. Max 256,000 characters                               |
| `tools`            | `AssistantToolParam[]`          | Yes      | Max 128 tools. Types: `code_interpreter`, `file_search`, `function` |
| `tool_resources`   | `ToolResources`                 | No       | Files for code_interpreter, vector stores for file_search           |
| `temperature`      | `float`                         | No       | 0–2. Default: 1                                                     |
| `top_p`            | `float`                         | No       | Nucleus sampling                                                    |
| `reasoning_effort` | `ReasoningEffort`               | No       | `none`, `minimal`, `low`, `medium`, `high`, `xhigh`                 |
| `response_format`  | `AssistantResponseFormatOption` | No       | JSON schema or JSON object mode                                     |
| `metadata`         | `object`                        | No       | 16 key-value pairs                                                  |

#### ToolResources

```json
{
  "code_interpreter": {
    "file_ids": ["file-..."]
  },
  "file_search": {
    "vector_store_ids": ["vs-..."]
  }
}
```

- `code_interpreter.file_ids`: max 20 files
- `file_search.vector_store_ids`: max 1

### Threads

**Endpoint:** `POST /v1/threads`

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello",
      "attachments": [{ "file_id": "file-...", "tools": [{ "type": "file_search" }] }],
      "metadata": {}
    }
  ],
  "tool_resources": {},
  "metadata": {}
}
```

### Runs

**Create Run:** `POST /v1/threads/{thread_id}/runs`

| Parameter                 | Type              | Required | Description                                                     |
| ------------------------- | ----------------- | -------- | --------------------------------------------------------------- |
| `assistant_id`            | `str`             | Yes      | Assistant to use                                                |
| `model`                   | `str`             | No       | Override assistant's model                                      |
| `instructions`            | `str`             | No       | Override system instructions                                    |
| `additional_instructions` | `str`             | No       | Append to existing instructions                                 |
| `tools`                   | `array`           | No       | Override tools                                                  |
| `tool_choice`             | `str`             | No       | `none`, `auto`, `required`, or named tool                       |
| `temperature`             | `float`           | No       | 0–2                                                             |
| `top_p`                   | `float`           | No       | Nucleus sampling                                                |
| `reasoning_effort`        | `ReasoningEffort` | No       | Reasoning intensity                                             |
| `max_completion_tokens`   | `int`             | No       | Max completion tokens for run                                   |
| `max_prompt_tokens`       | `int`             | No       | Max prompt tokens for run                                       |
| `truncation_strategy`     | `object`          | No       | `{type: "auto"}` or `{type: "last_messages", last_messages: N}` |
| `response_format`         | `object`          | No       | Output format                                                   |
| `parallel_tool_calls`     | `bool`            | No       | Allow parallel tool calls                                       |
| `include`                 | `array`           | No       | `file_search_result.content` etc.                               |
| `additional_messages`     | `array`           | No       | Messages to add before run                                      |
| `metadata`                | `object`          | No       | 16 key-value pairs                                              |
| `stream`                  | `bool`            | No       | SSE streaming                                                   |

#### Run Status Values

`"queued"` | `"in_progress"` | `"requires_action"` | `"cancelling"` | `"cancelled"` | `"failed"` | `"completed"` | `"incomplete"` | `"expired"`

#### Run Object

```json
{
  "id": "run_...",
  "object": "thread.run",
  "assistant_id": "asst_...",
  "thread_id": "thread_...",
  "status": "completed",
  "model": "gpt-4o",
  "instructions": "...",
  "tools": [],
  "required_action": null,
  "last_error": null,
  "usage": {
    "prompt_tokens": 100,
    "completion_tokens": 50,
    "total_tokens": 150
  },
  "created_at": 1234567890,
  "started_at": 1234567891,
  "completed_at": 1234567892,
  "expires_at": null,
  "failed_at": null,
  "cancelled_at": null,
  "temperature": 1.0,
  "top_p": 1.0,
  "max_completion_tokens": null,
  "max_prompt_tokens": null,
  "truncation_strategy": { "type": "auto" },
  "metadata": {}
}
```

### Messages

**Create:** `POST /v1/threads/{thread_id}/messages`

| Parameter     | Type                               | Required |
| ------------- | ---------------------------------- | -------- |
| `content`     | `str \| MessageContentPartParam[]` | Yes      |
| `role`        | `"user" \| "assistant"`            | Yes      |
| `attachments` | `Attachment[]`                     | No       |
| `metadata`    | `object`                           | No       |

### Create Thread and Run

`POST /v1/threads/runs` — Creates thread and run in one call.
`POST /v1/threads/runs` with `stream: true` — Returns `AssistantStreamEvent` SSE.

---

## 15. Realtime API (Beta)

Low-latency, multi-modal conversational API via WebSocket.

**WebSocket URL:** `wss://api.openai.com/v1/realtime?model={model_id}`

### Session Creation (REST, for ephemeral tokens)

**Endpoint:** `POST /v1/realtime/sessions`

| Parameter                     | Type                                        | Description                                                                                                             |
| ----------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `model`                       | `str`                                       | `gpt-realtime`, `gpt-realtime-2025-08-28`, `gpt-4o-realtime-preview`, `gpt-4o-mini-realtime-preview` (+ dated variants) |
| `modalities`                  | `["text", "audio"]`                         | Response modes                                                                                                          |
| `instructions`                | `str`                                       | System message                                                                                                          |
| `voice`                       | `str`                                       | `alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`, `shimmer`, `verse`                                                   |
| `input_audio_format`          | `"pcm16" \| "g711_ulaw" \| "g711_alaw"`     | Input audio format                                                                                                      |
| `output_audio_format`         | `"pcm16" \| "g711_ulaw" \| "g711_alaw"`     | Output audio (24kHz)                                                                                                    |
| `input_audio_noise_reduction` | `{type: "near_field" \| "far_field"}`       | Noise filtering                                                                                                         |
| `input_audio_transcription`   | `InputAudioTranscription`                   | Transcription config                                                                                                    |
| `turn_detection`              | `TurnDetection`                             | Speech detection config                                                                                                 |
| `tools`                       | `array`                                     | Functions available to model                                                                                            |
| `tool_choice`                 | `"auto" \| "none" \| "required" \| fn_name` | Tool selection                                                                                                          |
| `temperature`                 | `float`                                     | 0.6–1.2                                                                                                                 |
| `max_response_output_tokens`  | `int \| "inf"`                              | 1–4,096 or `"inf"`                                                                                                      |
| `speed`                       | `float`                                     | Speech rate 0.25–1.5                                                                                                    |
| `tracing`                     | `"auto" \| TracingConfig`                   | Session tracing                                                                                                         |
| `client_secret`               | `ClientSecret`                              | Ephemeral token config                                                                                                  |

#### TurnDetection

```json
{
  "type": "server_vad",
  "threshold": 0.5,
  "prefix_padding_ms": 300,
  "silence_duration_ms": 500,
  "create_response": true,
  "interrupt_response": true,
  "eagerness": "auto"
}
```

| Field       | Values                                  |
| ----------- | --------------------------------------- |
| `type`      | `"server_vad"` or `"semantic_vad"`      |
| `eagerness` | `"low"`, `"medium"`, `"high"`, `"auto"` |

#### InputAudioTranscription

```json
{
  "model": "gpt-4o-transcribe",
  "language": "en",
  "prompt": "optional guidance"
}
```

Models: `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `whisper-1`

#### ClientSecret Expiry

```json
{
  "expires_after": {
    "anchor": "created_at",
    "seconds": 60
  }
}
```

`seconds`: 10–7,200

### Transcription Session

**Endpoint:** `POST /v1/realtime/transcription_sessions`

Audio-only transcription without conversation capability.

### Client → Server Events

| Event                        | Description               |
| ---------------------------- | ------------------------- |
| `session.update`             | Update session config     |
| `input_audio_buffer.append`  | Add audio bytes           |
| `input_audio_buffer.commit`  | Commit audio buffer       |
| `input_audio_buffer.clear`   | Clear buffer              |
| `conversation.item.create`   | Add conversation item     |
| `conversation.item.retrieve` | Retrieve item             |
| `conversation.item.truncate` | Truncate item audio       |
| `conversation.item.delete`   | Delete item               |
| `response.create`            | Trigger response          |
| `response.cancel`            | Cancel in-flight response |

### Server → Client Events

| Event                                                   | Description              |
| ------------------------------------------------------- | ------------------------ |
| `session.created`                                       | Initial session data     |
| `session.updated`                                       | Updated session config   |
| `conversation.created`                                  | New conversation         |
| `conversation.item.created`                             | Item added               |
| `conversation.item.input_audio_transcription.completed` | Input transcription done |
| `conversation.item.input_audio_transcription.delta`     | Partial input transcript |
| `conversation.item.input_audio_transcription.failed`    | Transcription error      |
| `conversation.item.truncated`                           | Item truncated           |
| `conversation.item.deleted`                             | Item deleted             |
| `input_audio_buffer.committed`                          | Buffer committed         |
| `input_audio_buffer.cleared`                            | Buffer cleared           |
| `input_audio_buffer.speech_started`                     | Speech detected          |
| `input_audio_buffer.speech_stopped`                     | Speech ended             |
| `response.created`                                      | Response started         |
| `response.done`                                         | Response complete        |
| `response.output_item.added`                            | Output item added        |
| `response.output_item.done`                             | Output item complete     |
| `response.content_part.added`                           | Content part added       |
| `response.content_part.done`                            | Content part done        |
| `response.text.delta`                                   | Text chunk               |
| `response.text.done`                                    | Text complete            |
| `response.audio.delta`                                  | Audio chunk              |
| `response.audio.done`                                   | Audio complete           |
| `response.audio_transcript.delta`                       | Audio transcript chunk   |
| `response.audio_transcript.done`                        | Audio transcript done    |
| `response.function_call_arguments.delta`                | Function args chunk      |
| `response.function_call_arguments.done`                 | Function args done       |
| `rate_limits.updated`                                   | Rate limit update        |
| `error`                                                 | Error event              |

### Node.js WebSocket Example

```javascript
import { OpenAIRealtimeWebSocket } from "openai/realtime/websocket";

const rt = new OpenAIRealtimeWebSocket({ model: "gpt-realtime" });
rt.on("response.text.delta", (event) => process.stdout.write(event.delta));
rt.on("response.done", () => console.log("Done"));
```

---

## 16. Function Calling / Tool Use

### Function Definition

```json
{
  "type": "function",
  "function": {
    "name": "get_weather",
    "description": "Get weather for a location",
    "parameters": {
      "type": "object",
      "properties": {
        "location": { "type": "string" },
        "unit": { "type": "string", "enum": ["celsius", "fahrenheit"] }
      },
      "required": ["location"]
    },
    "strict": true
  }
}
```

#### FunctionDefinition Fields

| Field         | Type                 | Description                                                                                       |
| ------------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| `name`        | `str` (required)     | a-z, A-Z, 0-9, underscores, dashes. Max 64 chars                                                  |
| `description` | `str`                | How/when to call this function                                                                    |
| `parameters`  | `FunctionParameters` | JSON Schema object. Omit for zero-parameter function                                              |
| `strict`      | `bool \| null`       | Enforce schema adherence (Structured Outputs). Only a JSON Schema subset is supported when `true` |

### tool_choice Options

```json
"none"        // never call tools
"auto"        // model decides
"required"    // must call at least one tool
{"type": "function", "function": {"name": "my_fn"}}  // force specific function
```

### Tool Call in Response

```json
{
  "role": "assistant",
  "content": null,
  "tool_calls": [
    {
      "id": "call_abc123",
      "type": "function",
      "function": {
        "name": "get_weather",
        "arguments": "{\"location\": \"San Francisco\"}"
      }
    }
  ]
}
```

### Submitting Tool Results

```json
{
  "role": "tool",
  "tool_call_id": "call_abc123",
  "content": "{\"temperature\": 72, \"unit\": \"fahrenheit\"}"
}
```

### Parallel Tool Calls

When the model calls multiple tools simultaneously, `tool_calls` contains multiple items. Process all, then submit all results in one request.

```python
# Submit multiple tool results at once
messages.append({
    "role": "tool",
    "tool_call_id": "call_1",
    "content": "result 1"
})
messages.append({
    "role": "tool",
    "tool_call_id": "call_2",
    "content": "result 2"
})
```

To disable: `"parallel_tool_calls": false`

---

## 17. Structured Outputs

### Via response_format (Chat Completions / Responses API)

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
                "properties": {
                    "name": {"type": "string"},
                    "date": {"type": "string"},
                    "participants": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                },
                "required": ["name", "date", "participants"],
                "additionalProperties": False
            }
        }
    }
)
```

### ResponseFormatJSONSchema Fields

| Field         | Type            | Required | Description            |
| ------------- | --------------- | -------- | ---------------------- |
| `type`        | `"json_schema"` | Yes      | Always `"json_schema"` |
| `json_schema` | `JSONSchema`    | Yes      | Schema definition      |

#### JSONSchema Fields

| Field         | Type                | Required | Description                                      |
| ------------- | ------------------- | -------- | ------------------------------------------------ |
| `name`        | `str`               | Yes      | a-z, A-Z, 0-9, underscores, dashes. Max 64 chars |
| `description` | `str`               | No       | Purpose description for the model                |
| `schema`      | `Dict[str, object]` | No       | JSON Schema object                               |
| `strict`      | `bool \| null`      | No       | Enforce strict adherence                         |

### Via function strict mode

Set `"strict": true` in `FunctionDefinition.function` to enforce schema for tool arguments.

### Supported JSON Schema Subset (when strict=true)

- `type`: `object`, `array`, `string`, `number`, `integer`, `boolean`, `null`
- `properties`, `required`, `additionalProperties: false`
- `enum`
- `$ref` (for recursion)
- `anyOf` (for unions/optional)
- `$defs`

**Not supported in strict mode:** `oneOf`, `allOf`, `not`, `if/then/else`, `default`, `pattern`, `format`, `minLength`, `maxLength`, `minimum`, `maximum`

### Python SDK Parse Helper

```python
from pydantic import BaseModel

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

completion = client.beta.chat.completions.parse(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Extract event"}],
    response_format=CalendarEvent
)
event = completion.choices[0].message.parsed
```

---

## 18. Vision (Image Input)

### Supported Formats

- JPEG, PNG, GIF, WebP
- URL or base64-encoded data URI

### Detail Levels

| Level    | Description                            | Cost        |
| -------- | -------------------------------------- | ----------- |
| `"auto"` | Model selects                          | Variable    |
| `"low"`  | 512x512 fixed thumbnail                | 85 tokens   |
| `"high"` | Tile-based: 512x512 per tile + 85 base | More tokens |

### Chat Completions Image Input

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "What's in this image?"
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://example.com/image.jpg",
                        "detail": "auto"
                    }
                }
            ]
        }
    ]
)
```

### Base64 Image

```python
import base64

with open("image.jpg", "rb") as f:
    b64 = base64.b64encode(f.read()).decode()

content = {
    "type": "image_url",
    "image_url": {
        "url": f"data:image/jpeg;base64,{b64}",
        "detail": "high"
    }
}
```

### Responses API Image Input

```python
response = client.responses.create(
    model="gpt-4o",
    input=[
        {
            "type": "message",
            "role": "user",
            "content": [
                {"type": "input_text", "text": "Describe this"},
                {"type": "input_image", "image_url": "https://..."}
            ]
        }
    ]
)
```

---

## 19. Streaming

### Chat Completions SSE

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

#### ChatCompletionChunk Schema

```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion.chunk",
  "created": 1234567890,
  "model": "gpt-4o",
  "choices": [
    {
      "index": 0,
      "delta": {
        "role": "assistant",
        "content": "partial text...",
        "tool_calls": [],
        "refusal": null
      },
      "finish_reason": null,
      "logprobs": null
    }
  ],
  "service_tier": "default",
  "system_fingerprint": "fp_...",
  "usage": null
}
```

Final chunk: `finish_reason` is set, `delta.content` is `null` or empty.

When `stream_options: {"include_usage": true}` — a final chunk after `[DONE]` contains usage.

#### SSE Format

```
data: {"id":"chatcmpl-...","choices":[...],...}

data: {"id":"chatcmpl-...","choices":[{"delta":{},"finish_reason":"stop",...}],...}

data: [DONE]
```

### Responses API Streaming Event Types (51 events)

**Lifecycle:**

- `response.created`, `response.in_progress`, `response.completed`
- `response.failed`, `response.incomplete`, `response.queued`, `response.error`

**Text:**

- `response.text.delta`, `response.text.done`

**Audio:**

- `response.audio.delta`, `response.audio.done`
- `response.audio_transcript.delta`, `response.audio_transcript.done`

**Content:**

- `response.content_part.added`, `response.content_part.done`
- `response.output_item.added`, `response.output_item.done`

**Function Calls:**

- `response.function_call_arguments.delta`, `response.function_call_arguments.done`

**Code Interpreter:** 5 events (code deltas, completion, execution states)

**File Search / Web Search / Image Generation:** 12 events total

**MCP:** 8 events (tool calls, listing)

**Reasoning:** 6 events (text delta/done, summary delta/done, encrypted)

**Refusal:** 2 events

**Annotations:** 1 event

### Async Streaming (Python)

```python
async with await client.responses.create(
    model="gpt-4o",
    input="Tell me a story",
    stream=True
) as stream:
    async for event in stream:
        print(event)
```

### Node.js Streaming

```javascript
const stream = await client.responses.create({
  model: "gpt-4o",
  input: 'Say "Sheep sleep deep" ten times fast!',
  stream: true,
});

for await (const event of stream) {
  if (event.type === "response.text.delta") {
    process.stdout.write(event.delta);
  }
}
```

---

## 20. Reasoning Models (o-series & GPT-5)

### Applicable Models

`o1`, `o1-mini`, `o3`, `o3-mini`, `o4-mini`, `o1-pro`, `o3-pro`, `o3-deep-research`, `o4-mini-deep-research`, `gpt-5`, `gpt-5.1`, `gpt-5.2`, `gpt-5-pro`, `gpt-5-codex`, `computer-use-preview`

### Reasoning Configuration

```python
response = client.responses.create(
    model="o3",
    input="Solve this step-by-step: ...",
    reasoning={
        "effort": "high",
        "summary": "detailed"
    }
)
```

#### Reasoning Object Fields

| Field              | Type                                | Description                                                                                  |
| ------------------ | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| `effort`           | `ReasoningEffort`                   | Reasoning intensity                                                                          |
| `summary`          | `"auto" \| "concise" \| "detailed"` | Reasoning summary output. `concise` supported on computer-use-preview and models after gpt-5 |
| `generate_summary` | `"auto" \| "concise" \| "detailed"` | **Deprecated.** Use `summary`                                                                |

#### ReasoningEffort Values

| Value       | Description                                  |
| ----------- | -------------------------------------------- |
| `"none"`    | No reasoning (default for gpt-5.1)           |
| `"minimal"` | Minimal reasoning                            |
| `"low"`     | Low reasoning                                |
| `"medium"`  | Medium reasoning (default for most o-series) |
| `"high"`    | High reasoning                               |
| `"xhigh"`   | Maximum reasoning                            |

> `gpt-5.1` defaults to `"none"`. Earlier models default to `"medium"`. `gpt-5-pro` defaults to `"high"`.

### Reasoning Model Limitations

- `stop` sequences: **not supported**
- `max_tokens`: **deprecated** — use `max_completion_tokens` instead
- `temperature` / `top_p`: may have restricted ranges
- Reasoning tokens are billed but not shown in output by default (use `include: ["reasoning.encrypted_content"]` to access encrypted form)
- Context window consumed by reasoning tokens counts toward `max_completion_tokens`

### Counting Reasoning Tokens

```python
usage = response.usage
reasoning_tokens = usage.output_tokens_details.reasoning_tokens
```

### Deep Research Models

`o3-deep-research` and `o4-mini-deep-research` (Responses API only) are specialized for long-horizon research tasks. They autonomously plan and execute multi-step research with web search.

---

## 21. Built-in Tools

### Web Search

Available in: Responses API (`type: "web_search"`), Chat Completions (`web_search_options`)

```json
{
  "type": "web_search",
  "search_context_size": "medium",
  "filters": {
    "allowed_domains": ["example.com", "openai.com"]
  },
  "user_location": {
    "type": "approximate",
    "city": "San Francisco",
    "country": "US",
    "region": "California",
    "timezone": "America/Los_Angeles"
  }
}
```

| Field                     | Values                                      |
| ------------------------- | ------------------------------------------- |
| `type`                    | `"web_search"` or `"web_search_2025_08_26"` |
| `search_context_size`     | `"low"`, `"medium"` (default), `"high"`     |
| `filters.allowed_domains` | Array of permitted domains                  |

### File Search

```json
{
  "type": "file_search",
  "vector_store_ids": ["vs-..."],
  "max_num_results": 20,
  "filters": {...},
  "ranking_options": {
    "ranker": "auto",
    "score_threshold": 0.0,
    "hybrid_search": {
      "embedding_weight": 0.5,
      "text_weight": 0.5
    }
  }
}
```

| Field                             | Description                            |
| --------------------------------- | -------------------------------------- |
| `vector_store_ids`                | Required. Vector store IDs to search   |
| `max_num_results`                 | 1–50. Default: 20                      |
| `filters`                         | `ComparisonFilter` or `CompoundFilter` |
| `ranking_options.ranker`          | `"auto"` or `"default-2024-11-15"`     |
| `ranking_options.score_threshold` | 0.0–1.0                                |

### Code Interpreter

```json
{
  "type": "code_interpreter",
  "container": {
    "type": "auto",
    "file_ids": ["file-..."],
    "memory": "4g"
  }
}
```

Container memory options: `"1g"`, `"4g"`, `"16g"`, `"64g"`

### Computer Use

Available only with `computer-use-preview` model.

```json
{
  "type": "computer"
}
```

The model can control a virtual computer (click, type, screenshot, etc.).

### Image Generation (Built-in Tool)

```json
{
  "type": "image_generation",
  "action": "generate",
  "model": "gpt-image-1",
  "size": "1024x1024",
  "quality": "high",
  "output_format": "png",
  "background": "auto",
  "moderation": "auto",
  "output_compression": 100,
  "input_fidelity": "low",
  "partial_images": 0
}
```

`action`: `"generate"`, `"edit"`, or `"auto"`

### Local Shell

```json
{
  "type": "local_shell"
}
```

Enables model execution of local shell commands.

### MCP (Model Context Protocol)

```json
{
  "type": "mcp",
  "server_label": "my-mcp-server",
  "server_url": "https://mcp.example.com",
  "authorization": "Bearer token",
  "allowed_tools": ["tool1", "tool2"],
  "require_approval": "never",
  "headers": { "X-Custom": "value" },
  "defer_loading": false
}
```

Supported connectors: Dropbox, Gmail, Google Calendar, Google Drive, Microsoft Teams, Outlook Calendar/Email, SharePoint.

---

## 22. Rate Limits

> Exact numbers vary by tier, organization, and model. These are representative limits.
> Check current limits at: https://platform.openai.com/account/rate-limits

### Rate Limit Tiers

OpenAI uses usage-based tiers (Tier 1–5) that unlock higher limits as you spend more.

| Tier   | Minimum Spend | Notes             |
| ------ | ------------- | ----------------- |
| Free   | —             | Very low limits   |
| Tier 1 | $5 paid       | Moderate limits   |
| Tier 2 | $50 paid      | Higher limits     |
| Tier 3 | $100 paid     | Business limits   |
| Tier 4 | $250 paid     | High-volume       |
| Tier 5 | $1,000+ paid  | Enterprise limits |

### Rate Limit Headers

Every API response includes:

```
x-ratelimit-limit-requests: 10000
x-ratelimit-limit-tokens: 2000000
x-ratelimit-remaining-requests: 9999
x-ratelimit-remaining-tokens: 1999000
x-ratelimit-reset-requests: 6ms
x-ratelimit-reset-tokens: 28ms
```

### Service Tiers

| Tier         | Description                                          |
| ------------ | ---------------------------------------------------- |
| `"default"`  | Standard processing                                  |
| `"flex"`     | Lower priority, up to 50% lower cost, longer queuing |
| `"scale"`    | Higher throughput                                    |
| `"priority"` | Highest priority processing                          |

### Batch API Rate Limits

Batch requests use a separate queue with higher throughput but 24-hour completion window.

### Rate Limit Best Practices

1. Use exponential backoff on 429 errors
2. Spread requests over time with request queuing
3. Monitor `x-ratelimit-remaining-*` headers
4. Use Batch API for non-latency-sensitive workloads
5. Tier up by increasing monthly spend

---

## 23. Error Codes

### HTTP Error Classes

| Exception                  | Status | Description                                                    |
| -------------------------- | ------ | -------------------------------------------------------------- |
| `BadRequestError`          | 400    | Invalid request parameters, malformed JSON                     |
| `AuthenticationError`      | 401    | Missing or invalid API key                                     |
| `OAuthError`               | 401    | OAuth authentication failure (subclass of AuthenticationError) |
| `PermissionDeniedError`    | 403    | Insufficient permissions for the requested action              |
| `NotFoundError`            | 404    | Requested resource does not exist                              |
| `ConflictError`            | 409    | Request conflicts with existing state                          |
| `UnprocessableEntityError` | 422    | Request is well-formed but semantically incorrect              |
| `RateLimitError`           | 429    | Rate limit exceeded                                            |
| `InternalServerError`      | 5xx    | Server-side error                                              |

### Non-HTTP Errors

| Exception                        | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `APIConnectionError`             | Network connection failure                           |
| `APITimeoutError`                | Request timed out                                    |
| `LengthFinishReasonError`        | Response truncated by length limit (could not parse) |
| `ContentFilterFinishReasonError` | Content rejected by safety filter                    |
| `InvalidWebhookSignatureError`   | Webhook signature verification failed                |
| `WebSocketConnectionClosedError` | WebSocket connection closed with unsent messages     |
| `WebSocketQueueFullError`        | Outgoing WebSocket message queue at byte-size limit  |

### Error Response Body

```json
{
  "error": {
    "message": "The model `gpt-5-pro` does not exist or you do not have access to it.",
    "type": "invalid_request_error",
    "param": "model",
    "code": "model_not_found"
  }
}
```

### Common error.type Values

- `"invalid_request_error"` — Bad parameters
- `"authentication_error"` — Auth failure
- `"permission_error"` — Access denied
- `"not_found_error"` — Resource not found
- `"rate_limit_error"` — Rate exceeded
- `"api_error"` — Internal server error
- `"server_error"` — Infrastructure error

### Handling Errors (Python)

```python
import openai

try:
    response = client.chat.completions.create(...)
except openai.RateLimitError as e:
    print(f"Rate limit: {e.status_code} - {e.message}")
    # Implement exponential backoff
except openai.AuthenticationError as e:
    print(f"Auth error: {e}")
except openai.BadRequestError as e:
    print(f"Bad request: {e.param} - {e.message}")
except openai.APIConnectionError as e:
    print(f"Connection error: {e}")
except openai.APIStatusError as e:
    print(f"API error {e.status_code}: {e.response}")
```

All errors include `_request_id` for debugging with OpenAI support.

---

## 24. SDK Usage — Python

### Installation

```bash
pip install openai
```

Requires Python 3.9+.

### Basic Setup

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # default: reads OPENAI_API_KEY env var
    organization="org-...",        # optional
    project="proj-...",            # optional
    max_retries=2,                 # default: 2
    timeout=600.0,                 # default: 600s (10 minutes)
)
```

### Chat Completions (Python)

```python
completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "developer", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is the capital of France?"}
    ]
)
print(completion.choices[0].message.content)
```

### Responses API (Python)

```python
response = client.responses.create(
    model="gpt-5.2",
    instructions="You are a coding assistant that talks like a pirate.",
    input="How do I check if a Python object is an instance of a class?"
)
print(response.output_text)
```

### Streaming (Python)

```python
# Chat Completions streaming
with client.chat.completions.stream(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Tell me a story"}],
) as stream:
    for text in stream.text_stream:
        print(text, end="")

# Responses API streaming
with client.responses.stream(
    model="gpt-5.2",
    input="Count to 10 slowly",
) as stream:
    for event in stream:
        if event.type == "response.text.delta":
            print(event.delta, end="")
```

### Async Client (Python)

```python
import asyncio
from openai import AsyncOpenAI

async_client = AsyncOpenAI()

async def main():
    response = await async_client.responses.create(
        model="gpt-4o",
        input="Hello"
    )
    print(response.output_text)

asyncio.run(main())
```

### Pagination (Python)

```python
# Auto-pagination - iterates all pages
for job in client.fine_tuning.jobs.list(limit=20):
    print(job.id)

# Manual pagination
page = client.fine_tuning.jobs.list()
while page.has_next_page():
    page = page.next_page()
    for job in page.data:
        print(job.id)
```

### Raw Response Access (Python)

```python
response = client.chat.completions.with_raw_response.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello"}]
)
print(response.headers["x-request-id"])
completion = response.parse()
```

### Error Handling (Python)

```python
from openai import OpenAI, RateLimitError, APIConnectionError
import time

client = OpenAI()

def with_retry(fn, max_retries=3):
    for attempt in range(max_retries):
        try:
            return fn()
        except RateLimitError:
            wait = 2 ** attempt
            time.sleep(wait)
        except APIConnectionError as e:
            if attempt == max_retries - 1:
                raise
            time.sleep(1)
    raise Exception("Max retries exceeded")
```

### File Upload (Python)

```python
with open("training.jsonl", "rb") as f:
    file = client.files.create(file=f, purpose="fine-tune")
print(file.id)
```

### Azure OpenAI (Python)

```python
from openai import AzureOpenAI

client = AzureOpenAI(
    api_key="...",
    api_version="2024-08-01-preview",
    azure_endpoint="https://my-resource.openai.azure.com/"
)
```

### Webhook Verification (Python)

```python
payload = request.body
headers = request.headers
event = client.webhooks.unwrap(payload, headers)
```

---

## 25. SDK Usage — Node.js / TypeScript

### Installation

```bash
npm install openai
# or
deno add jsr:@openai/openai
```

Requires Node.js 20 LTS+. TypeScript ≥4.9 required.

Supported runtimes: Node.js 20+, Deno v1.28+, Bun 1.0+, Cloudflare Workers, Vercel Edge Runtime

### Basic Setup

```typescript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // default
  organization: "org-...", // optional
  project: "proj-...", // optional
  maxRetries: 2, // default: 2
  timeout: 600_000, // 10 minutes in ms
  logLevel: "warn", // 'debug'|'info'|'warn'|'error'|'off'
  // dangerouslyAllowBrowser: true  // only for browser use
});
```

### Chat Completions (Node)

```typescript
const completion = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "developer", content: "Talk like a pirate." },
    { role: "user", content: "Are semicolons optional in JavaScript?" },
  ],
});

console.log(completion.choices[0].message.content);
```

### Responses API (Node)

```typescript
const response = await client.responses.create({
  model: "gpt-5.2",
  instructions: "You are a coding assistant that talks like a pirate",
  input: "Are semicolons optional in JavaScript?",
});

console.log(response.output_text);
```

### Streaming (Node)

```typescript
const stream = await client.responses.create({
  model: "gpt-5.2",
  input: 'Say "Sheep sleep deep" ten times fast!',
  stream: true,
});

for await (const event of stream) {
  if (event.type === "response.text.delta") {
    process.stdout.write(event.delta);
  }
}
```

### Vision (Node)

```typescript
const response = await client.responses.create({
  model: "gpt-4o",
  input: [
    {
      type: "message",
      role: "user",
      content: [
        { type: "input_text", text: "Describe this image" },
        { type: "input_image", image_url: "https://example.com/image.jpg" },
      ],
    },
  ],
});
```

### File Upload (Node)

```typescript
import fs from "fs";
import { toFile } from "openai";

// From ReadStream
const file = await client.files.create({
  file: fs.createReadStream("training.jsonl"),
  purpose: "fine-tune",
});

// From fetch Response
const imageFile = await toFile(fetch("https://example.com/image.png"), "image.png");
```

### Error Handling (Node)

```typescript
import OpenAI from 'openai';

try {
    const response = await client.responses.create({ ... });
} catch (err) {
    if (err instanceof OpenAI.BadRequestError) {
        console.error('Bad request:', err.message);     // 400
    } else if (err instanceof OpenAI.AuthenticationError) {
        console.error('Auth error');                    // 401
    } else if (err instanceof OpenAI.PermissionDeniedError) {
        console.error('Permission denied');             // 403
    } else if (err instanceof OpenAI.NotFoundError) {
        console.error('Not found');                     // 404
    } else if (err instanceof OpenAI.UnprocessableEntityError) {
        console.error('Unprocessable');                 // 422
    } else if (err instanceof OpenAI.RateLimitError) {
        console.error('Rate limit exceeded');           // 429
    } else if (err instanceof OpenAI.InternalServerError) {
        console.error('Server error');                  // 5xx
    } else if (err instanceof OpenAI.APIConnectionError) {
        console.error('Connection error');
    }
    // All errors have: err._request_id
}
```

### Auto-Pagination (Node)

```typescript
for await (const item of client.fineTuning.jobs.list({ limit: 20 })) {
  console.log(item.id);
}
```

### Request ID (Node)

```typescript
const response = await client.chat.completions.create({ ... });
console.log(response._request_id);  // for debugging with OpenAI support
```

### Logging (Node)

```bash
OPENAI_LOG=debug node my-script.js
```

Or at client level:

```typescript
const client = new OpenAI({ logLevel: "debug" });
```

### Realtime WebSocket (Node)

```typescript
import { OpenAIRealtimeWebSocket } from "openai/realtime/websocket";

const rt = new OpenAIRealtimeWebSocket({ model: "gpt-realtime" });

rt.on("session.created", (event) => {
  rt.send({ type: "response.create", response: { modalities: ["text"] } });
});

rt.on("response.text.delta", (event) => {
  process.stdout.write(event.delta);
});

rt.on("response.done", () => {
  rt.close();
});
```

---

## 26. Production Best Practices

### Authentication

- Store API keys in environment variables, never in code
- Use per-project API keys (rotate regularly)
- For server-to-server: consider workload identity (Kubernetes, Azure, GCP)

### Reliability

- Enable automatic retries (default: 2). The SDK retries on `429` and `5xx` with exponential backoff
- Set appropriate timeouts: `timeout=30.0` for interactive, `timeout=600.0` for batch
- Use `seed` parameter for reproducibility testing
- Implement circuit breakers for high-traffic systems

### Performance

- Use `service_tier: "flex"` for non-urgent workloads (lower cost, longer queue)
- Use Batch API for ≥100 requests that don't need real-time results
- Enable prompt caching with `prompt_cache_retention: "24h"` for repeated prefixes
- Use `stream: true` to show first token faster (lower perceived latency)
- For Chat Completions streaming, use `stream_options: {include_usage: true}` to get usage stats
- Use `gpt-4o-mini` or `gpt-4.1-nano` for classification, routing, and simple tasks

### Cost Management

- Use `max_completion_tokens` to cap per-request costs
- Monitor `usage.output_tokens_details.reasoning_tokens` on o-series models
- Prefer smaller models (`gpt-4.1-mini`, `gpt-5.4-nano`) for simple tasks
- Cache common prefixes to reduce input token costs
- Use Batch API for 50% cost reduction on eligible endpoints

### Content Safety

- Use `safety_identifier` (or `user`) to track end-users for abuse detection
- Implement Moderation API before user-submitted content reaches generation
- Use `moderation: "auto"` for image generation
- Set appropriate `service_tier` to ensure consistent processing

### Structured Outputs

- Prefer `response_format: {"type": "json_schema", ...}` over prompting for JSON
- Use `strict: true` for deterministic schema adherence
- Define `additionalProperties: false` to prevent extra fields
- All required fields must be listed in `required` array

### Tool Use

- Describe tools clearly in `description` — model uses this to decide when to call
- Use `parallel_tool_calls: false` when order matters
- Keep tool parameter schemas simple and well-documented
- Validate tool arguments before calling downstream services

### API Version Stability

- Pin to dated model snapshots (e.g., `gpt-4o-2024-11-20`) for production
- Use `*-latest` aliases only in development
- Test migrations to new model versions with evals before switching production

### Monitoring

- Log `_request_id` from every response for debugging
- Track `usage.total_tokens`, `usage.output_tokens_details.reasoning_tokens`
- Monitor `finish_reason` distribution (`content_filter` spikes indicate prompt issues)
- Set up alerts for 429 rate limit errors

### Security

- Never pass raw user input directly to system prompts (prompt injection risk)
- Sanitize content before embedding in prompts
- For multi-tenant: never share conversation history across users
- Use `store: false` (default) unless you need stored completions for evals/distillation

---

## Appendix: Key SDK Types Reference

### ReasoningEffort

```
"none" | "minimal" | "low" | "medium" | "high" | "xhigh"
```

### ResponseIncludable

```
"web_search_call.action.sources"
"code_interpreter_call.outputs"
"computer_call_output.output.image_url"
"file_search_call.results"
"message.input_image.image_url"
"message.output_text.logprobs"
"reasoning.encrypted_content"
```

### ServiceTier

```
"auto" | "default" | "flex" | "scale" | "priority"
```

### ToolChoiceOptions

```
"none" | "auto" | "required"
```

Or a specific tool:

```json
{
  "type": "function",
  "function": { "name": "my_function" }
}
```

### FilePurpose

```
"assistants" | "assistants_output" | "batch" | "batch_output"
| "fine-tune" | "fine-tune-results" | "vision"
```

### FinishReason (Chat)

```
"stop" | "length" | "tool_calls" | "content_filter" | "function_call"
```

### RunStatus (Assistants)

```
"queued" | "in_progress" | "requires_action" | "cancelling"
| "cancelled" | "failed" | "completed" | "incomplete" | "expired"
```

### BatchStatus

```
"validating" | "failed" | "in_progress" | "finalizing"
| "completed" | "expired" | "cancelling" | "cancelled"
```

### ResponseStatus

```
"queued" | "in_progress" | "completed" | "failed"
| "incomplete" | "cancelled"
```

---

_Sources: OpenAI Python SDK v2.37.0 type files (May 2026), OpenAPI spec v2.3.0, Node.js SDK README._
_Always verify current pricing, rate limits, and model availability at https://platform.openai.com/docs_
