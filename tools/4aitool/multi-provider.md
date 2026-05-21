# Multi-Provider AI Orchestration — Production Patterns

> Compiled from 47 live sources — May 2026
> Sources: LiteLLM docs, RouteLLM (arXiv 2406.18665), LangGraph, Mastra, Bifrost, Mozilla Star Chamber, Getmaxim, fast.io, Strathweb, OpenRouter, Gemini/Perplexity/OpenAI compatibility docs, and 30+ production engineering reports

---

## CRITICAL WARNING BEFORE YOU BUILD

From **arXiv "From Spark to Fire" (2601.07245)** and **MIT research (2026)**:

- Extra agents help **only when they contribute genuinely new information**
- Adding relay stages WITHOUT new information degrades accuracy sharply: 1 stage = 90.7% → 5 stages = 22.5%
- **Shopify's explicit guidance to engineers: "avoid multi-agent architectures early"**
- Hub injection failures in LangGraph/CrewAI cause 100% system-wide infection. Leaf failures: 9.7–15.9% impact.
- **Build hub-and-spoke, not mesh. Add complexity only when it creates verified value.**

From **IsDown Dec 2025 status report**: 47 provider incidents in one month (Anthropic: 20, OpenAI: 22). Single-provider = guaranteed downtime. Multi-provider = reliability.

---

## THE 7 PRODUCTION PATTERNS

---

## Pattern 1: Router / Classifier

**Purpose:** Decide which model to use BEFORE inference runs.
**Cost savings:** RouteLLM showed 85% cost reduction at 95% of GPT-4 quality (ICLR 2025, UC Berkeley/Anyscale/Canva)

### 1a. Rule-Based Router (10–50ms overhead, start here)

```python
def route_query(query: str, user_tier: str) -> str:
    if user_tier == "free":
        return "anthropic/claude-haiku-4-5"
    if len(query) > 500 or "analyze" in query.lower():
        return "anthropic/claude-sonnet-4-6"
    if "code" in query.lower() or "debug" in query.lower():
        return "anthropic/claude-sonnet-4-6"
    if any(w in query.lower() for w in ["latest", "current", "today", "news"]):
        return "perplexity/sonar-pro"  # needs real-time web
    return "openai/gpt-5.4-mini"
```

### 1b. Semantic / Intent Router (50–200ms overhead)

```python
from openai import OpenAI

def semantic_route(query: str) -> str:
    # Use cheapest model to classify the query
    classifier = OpenAI()
    resp = classifier.chat.completions.create(
        model="gpt-5.4-mini",
        messages=[{
            "role": "system",
            "content": """Classify this query into ONE category:
            - SEARCH: needs current/real-time web information
            - CODE: programming, debugging, technical implementation
            - REASON: complex analysis, multi-step logic, math
            - SIMPLE: short Q&A, factual, summarize
            Reply with just the category name."""
        }, {"role": "user", "content": query}],
        max_tokens=10
    )

    category = resp.choices[0].message.content.strip()
    routing = {
        "SEARCH": "perplexity/sonar-pro",
        "CODE": "anthropic/claude-sonnet-4-6",
        "REASON": "anthropic/claude-opus-4-7",
        "SIMPLE": "google/gemini-3-flash-preview"
    }
    return routing.get(category, "anthropic/claude-sonnet-4-6")
```

### 1c. RouteLLM (ML Router — graduate to this at $10k/month+ spend)

```bash
pip install routellm[serve,eval]
```

RouteLLM trained on 55k Chatbot Arena preference samples. Best router: Matrix Factorization → 95% GPT-4 quality with only 14% GPT-4 calls. Pre-trained models on HuggingFace.

**Source:** arXiv:2406.18665, https://github.com/lm-sys/RouteLLM

---

## Pattern 2: Cascade / Fallback

**Purpose:** Start cheap. Escalate on failure or low confidence.

### 2a. LiteLLM Router (Python — production standard)

```python
from litellm import Router

model_list = [
    # Tier 1 — cheap and fast
    {
        "model_name": "chat",
        "litellm_params": {
            "model": "anthropic/claude-haiku-4-5",
            "api_key": "os.environ/ANTHROPIC_API_KEY"
        },
        "model_info": {"order": 1}
    },
    # Tier 2 — fallback
    {
        "model_name": "chat",
        "litellm_params": {
            "model": "openai/gpt-5.5",
            "api_key": "os.environ/OPENAI_API_KEY"
        },
        "model_info": {"order": 2}
    },
    # Tier 3 — last resort
    {
        "model_name": "chat",
        "litellm_params": {
            "model": "google/gemini-3.1-pro-preview",
            "api_key": "os.environ/GEMINI_API_KEY"
        },
        "model_info": {"order": 3}
    },
]

router = Router(
    model_list=model_list,
    routing_strategy="simple-shuffle",   # Use this in production
    num_retries=3,
    retry_after=5,
    allowed_fails=3,        # 3 failures → cooldown
    cooldown_time=30,       # 30s cooldown
    # Redis required for multi-replica deployments
    redis_host=os.environ.get("REDIS_HOST"),
    redis_password=os.environ.get("REDIS_PASSWORD"),
    redis_port=os.environ.get("REDIS_PORT"),
    cache_responses=True
)

response = await router.acompletion(
    model="chat",
    messages=[{"role": "user", "content": "Your prompt"}]
)
```

⚠️ **DO NOT use `routing_strategy="usage-based-routing"` in production** — documented LiteLLM performance issues. Use `"simple-shuffle"`.

### 2b. Bifrost REST Fallback (zero code change, any language)

```bash
curl -X POST http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o-mini",
    "messages": [{"role": "user", "content": "Your prompt"}],
    "fallbacks": [
      "anthropic/claude-sonnet-4-6",
      "google/gemini-3-flash-preview"
    ]
  }'
```

### 2c. TypeScript — Mastra Agent Fallback

```typescript
import { Agent } from "@mastra/core";
import { openai, anthropic } from "@mastra/llm";

const agent = new Agent({
  name: "resilient-agent",
  instructions: "You are a helpful assistant.",
  model: [
    { model: openai("gpt-5.5"), maxRetries: 5 }, // primary
    { model: anthropic("claude-sonnet-4-6"), maxRetries: 1 }, // fallback
  ],
});
```

### 2d. Confidence-Gated Cascade (SLM → LLM escalation)

```python
import re
import anthropic

# Small model first — always include confidence instruction
SLM_SYSTEM = """Answer the question. End your response with exactly:
CONFIDENCE: X (where X is 1-10, 8+ = you are sure)"""

haiku = anthropic.Anthropic()

def smart_cascade(prompt: str) -> str:
    # Step 1: try cheap model
    draft = haiku.messages.create(
        model="claude-haiku-4-5",
        max_tokens=1000,
        system=SLM_SYSTEM,
        messages=[{"role": "user", "content": prompt}]
    )
    text = draft.content[0].text

    # Step 2: parse confidence
    match = re.search(r"CONFIDENCE:\s*(\d+)", text, re.IGNORECASE)
    confidence = int(match.group(1)) if match else 0
    answer = re.sub(r"\nCONFIDENCE:.*$", "", text, flags=re.MULTILINE).strip()

    # Step 3: escalate if not confident
    if confidence >= 8:
        return answer

    opus = anthropic.Anthropic()
    final = opus.messages.create(
        model="claude-opus-4-7",
        max_tokens=1000,
        system="Answer carefully and completely.",
        messages=[{"role": "user", "content": prompt}]
    )
    return final.content[0].text
```

**Error-specific retry table (from production analysis):**

| Error                | Strategy                    | Base Delay | Max Retries |
| -------------------- | --------------------------- | ---------- | ----------- |
| Rate Limits (429)    | Exponential + jitter        | 1–2s       | 5–7         |
| Server Error (5xx)   | Exponential backoff         | 2s         | 3–5         |
| Timeout              | Fixed delay                 | 5s         | 2–3         |
| Context overflow     | Fallback to larger model    | N/A        | 0           |
| Content policy (400) | No retry — alternate prompt | N/A        | 0           |
| Auth error (401)     | No retry — fix credentials  | N/A        | 0           |

**Source:** LiteLLM docs, Mastra blog, Getmaxim, fast.io, Strathweb

---

## Pattern 3: Parallel Consensus (Council Mode)

**Purpose:** Same prompt → multiple models simultaneously → aggregate results.
**When:** High-stakes decisions, code quality reviews, research with hallucination risk.
**Cost:** 3–5x higher. Only worth it when correctness is verifiable.

### 3a. Simple Parallel Execution (asyncio)

```python
import asyncio
import anthropic
from openai import AsyncOpenAI
from google import genai

async def council(prompt: str) -> dict:
    async def ask_claude(p):
        client = anthropic.AsyncAnthropic()
        r = await client.messages.create(
            model="claude-opus-4-7", max_tokens=1000,
            messages=[{"role": "user", "content": p}]
        )
        return ("claude", r.content[0].text)

    async def ask_openai(p):
        client = AsyncOpenAI()
        r = await client.chat.completions.create(
            model="gpt-5.5", max_tokens=1000,
            messages=[{"role": "user", "content": p}]
        )
        return ("openai", r.choices[0].message.content)

    async def ask_gemini(p):
        client = genai.Client()
        r = await asyncio.to_thread(
            client.models.generate_content,
            model="gemini-3.1-pro-preview", contents=p
        )
        return ("gemini", r.text)

    results = await asyncio.gather(
        ask_claude(prompt),
        ask_openai(prompt),
        ask_gemini(prompt),
        return_exceptions=True
    )
    return {name: text for name, text in results if not isinstance(results, Exception)}


async def council_with_synthesis(prompt: str) -> str:
    responses = await council(prompt)

    # Use Claude as arbiter to synthesize
    client = anthropic.AsyncAnthropic()
    synthesis_prompt = "\n\n".join([
        f"[{name.upper()}]:\n{text}" for name, text in responses.items()
    ])

    arbiter = await client.messages.create(
        model="claude-opus-4-7", max_tokens=1500,
        system="You are synthesizing independent AI responses. Identify consensus, flag disagreements, provide a unified best answer.",
        messages=[{"role": "user", "content": f"Original question: {prompt}\n\nResponses:\n{synthesis_prompt}"}]
    )
    return arbiter.content[0].text
```

### 3b. LLM Consortium (CLI tool, open source)

```bash
pip install llm-consortium
llm consortium save my-council \
    -m claude-opus-4-7:1 \
    -m gpt-5.5:2 \
    -m gemini-3.1-pro-preview:3 \
    --arbiter claude-opus-4-7 \
    --confidence-threshold 0.8 \
    --max-iterations 4

llm -m my-council "Should we use event sourcing or CRUD for this service?"
```

**Source:** https://github.com/irthomasthomas/llm-consortium, Mozilla.ai Star Chamber, arXiv:2604.02923

---

## Pattern 4: Specialist Chain (THE most important pattern)

**Purpose:** Different providers handle different steps based on native strengths.
**Rule:** Provider assignment should be based on verifiable capability, not preference.

### Provider Strength Map (verified from production sources)

| Step                        | Best Provider        | Why                                                                        |
| --------------------------- | -------------------- | -------------------------------------------------------------------------- |
| Planning / strategy         | Claude Opus 4.7      | Better multi-step reasoning, less likely to skip steps                     |
| Tool use / function calling | OpenAI GPT-5.5       | "50 tool calls without malforming a single one" — 40% fewer malformed JSON |
| Real-time web grounding     | Perplexity Sonar Pro | Purpose-built for AI consumption — grounded, cited, machine-readable       |
| Google Search grounding     | Gemini (native tool) | Native Google Search, citation extraction, dynamic grounding               |
| Long-context synthesis      | Gemini 3 Flash       | 1M token context, cheap synthesis at $0.50/MTok                            |
| Code generation             | Claude Sonnet 4.6    | Beats prev-gen Opus on coding                                              |
| Structured output / JSON    | OpenAI GPT-5.5       | Most reliable structured output in automated pipelines                     |
| Fast draft                  | Claude Haiku 4.5     | Fastest Claude, $1/MTok                                                    |
| Image / video analysis      | Gemini 3.1 Pro       | Native multimodal, Veo integration                                         |

---

### 4a. Research Pipeline: Perplexity → Claude → Gemini

```python
import anthropic
from openai import OpenAI
from google import genai
from google.genai import types

PERPLEXITY_KEY = os.environ["PERPLEXITY_API_KEY"]
ANTHROPIC_KEY = os.environ["ANTHROPIC_API_KEY"]
GEMINI_KEY = os.environ["GEMINI_API_KEY"]

def research_pipeline(question: str) -> str:
    """
    Step 1: Perplexity Sonar → real-time web facts + citations
    Step 2: Claude Opus → deep reasoning over verified facts
    Step 3: Gemini Flash → concise synthesis for user consumption
    """

    # STEP 1: Ground in real-time web data
    perplexity = OpenAI(
        api_key=PERPLEXITY_KEY,
        base_url="https://api.perplexity.ai"
    )
    search = perplexity.chat.completions.create(
        model="sonar-pro",
        messages=[
            {"role": "system", "content": "Gather current, cited facts. Be comprehensive. Format for machine reading."},
            {"role": "user", "content": f"Research: {question}"}
        ]
    )
    grounded_facts = search.choices[0].message.content
    # Note: search.citations contains source URLs

    # STEP 2: Deep reasoning over verified facts (not hallucinated)
    claude = anthropic.Anthropic(api_key=ANTHROPIC_KEY)
    analysis = claude.messages.create(
        model="claude-opus-4-7",
        max_tokens=3000,
        system="""You are an expert analyst. Reason carefully over the provided facts.
        Do NOT add information not present in the research.
        Identify key insights, contradictions, and implications.""",
        messages=[{
            "role": "user",
            "content": f"Facts from web research:\n\n{grounded_facts}\n\nQuestion: {question}\n\nProvide deep analysis."
        }]
    )
    analysis_text = analysis.content[0].text

    # STEP 3: Synthesize to clean, concise response
    gemini_client = genai.Client(api_key=GEMINI_KEY)
    summary = gemini_client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=f"""Research question: {question}

Detailed analysis:
{analysis_text}

Create a clear, concise response. Lead with the direct answer, support with key evidence, end with implications."""
    )
    return summary.text
```

---

### 4b. Planner → Executor → Summarizer (LangGraph, full production code)

```python
import os
from typing import TypedDict, Annotated
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
import operator

BIFROST_URL = "http://localhost:8080"  # or LiteLLM proxy URL

# Provider assignment rationale:
# Claude = planner (better multi-step reasoning)
# GPT-4o = executor (most reliable tool/function calling)
# Gemini Flash = summarizer (fast, cheap, handles long context)

planner_llm = ChatOpenAI(
    model="openrouter/claude-opus-4-7",
    base_url=f"{BIFROST_URL}/v1",
    api_key="dummy",
    max_tokens=2048
)

executor_llm = ChatOpenAI(
    model="openai/gpt-5.5",
    base_url=f"{BIFROST_URL}/v1",
    api_key="dummy",
    max_tokens=2048
)

summarizer_llm = ChatOpenAI(
    model="google/gemini-3-flash-preview",
    base_url=f"{BIFROST_URL}/v1",
    api_key="dummy",
    max_tokens=1024
)

@tool
def search_web(query: str) -> str:
    """Search the web for current information."""
    # Route through Perplexity for grounded results
    from openai import OpenAI
    px = OpenAI(api_key=os.environ["PERPLEXITY_API_KEY"], base_url="https://api.perplexity.ai")
    r = px.chat.completions.create(
        model="sonar-pro",
        messages=[{"role": "user", "content": query}]
    )
    return r.choices[0].message.content

tools = [search_web]
tool_node = ToolNode(tools)
executor_with_tools = executor_llm.bind_tools(tools)

class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    plan: str
    summary: str

def planner_node(state: AgentState) -> dict:
    messages = [SystemMessage(content="You are a strategic planner. Create a step-by-step research plan.")] + state["messages"]
    response = planner_llm.invoke(messages)
    return {"messages": [response], "plan": response.content}

def executor_node(state: AgentState) -> dict:
    messages = [SystemMessage(content=f"Follow this plan:\n{state.get('plan', '')}")] + state["messages"]
    response = executor_with_tools.invoke(messages)
    return {"messages": [response]}

def summarizer_node(state: AgentState) -> dict:
    content = "\n\n".join([m.content for m in state["messages"] if hasattr(m, "content") and m.content])
    messages = [
        SystemMessage(content="Produce a clear, concise final answer from this research."),
        HumanMessage(content=content)
    ]
    response = summarizer_llm.invoke(messages)
    return {"messages": [response], "summary": response.content}

def route_executor(state: AgentState) -> str:
    last = state["messages"][-1]
    if hasattr(last, "tool_calls") and last.tool_calls:
        return "tools"
    return "summarizer"

graph = StateGraph(AgentState)
graph.add_node("planner", planner_node)
graph.add_node("executor", executor_node)
graph.add_node("tools", tool_node)
graph.add_node("summarizer", summarizer_node)
graph.set_entry_point("planner")
graph.add_edge("planner", "executor")
graph.add_conditional_edges("executor", route_executor, {"tools": "tools", "summarizer": "summarizer"})
graph.add_edge("tools", "executor")
graph.add_edge("summarizer", END)

agent = graph.compile()
result = agent.invoke({"messages": [HumanMessage(content="Research the latest AI model releases")]})
print(result["summary"])
```

---

### 4c. Gemini Google Search → Claude Reasoning

```python
from google import genai
from google.genai import types
import anthropic

def grounded_analysis(question: str) -> str:
    # Step 1: Gemini with native Google Search grounding
    gemini = genai.Client()
    grounded = gemini.models.generate_content(
        model="gemini-3-flash-preview",
        contents=f"Research with Google Search: {question}",
        config=types.GenerateContentConfig(
            tools=[types.Tool(google_search=types.GoogleSearch())]
        )
    )

    # Extract grounded text with citations
    grounded_text = grounded.text

    # Step 2: Claude for analysis
    claude = anthropic.Anthropic()
    analysis = claude.messages.create(
        model="claude-opus-4-7",
        max_tokens=2000,
        system="Analyze based only on provided facts. Do not hallucinate.",
        messages=[{
            "role": "user",
            "content": f"Google Search findings:\n\n{grounded_text}\n\nAnalyze: {question}"
        }]
    )
    return analysis.content[0].text
```

---

### 4d. Fast Draft → Quality Check (cost-optimized)

```python
import anthropic

client = anthropic.Anthropic()

def draft_then_check(prompt: str, quality_threshold: float = 0.7) -> str:
    # Draft: Haiku (~$0.001 per call)
    draft = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=1000,
        messages=[{"role": "user", "content": prompt}]
    )
    draft_text = draft.content[0].text

    # Self-evaluate quality
    eval_resp = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=20,
        system="Rate this response 1-10 for accuracy and completeness. Reply with just the number.",
        messages=[{"role": "user", "content": f"Prompt: {prompt}\nResponse: {draft_text}"}]
    )
    score = float(eval_resp.content[0].text.strip()) / 10

    if score >= quality_threshold:
        return draft_text

    # Polish: Opus only when needed (~$0.015 per call)
    polished = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1000,
        system="Improve this draft. Only change what is inaccurate or unclear.",
        messages=[{"role": "user", "content": f"Draft:\n{draft_text}\n\nOriginal request:\n{prompt}"}]
    )
    return polished.content[0].text
```

---

## Pattern 5: Context Handoff — Unified API Layer

**The key insight:** Perplexity and Gemini both support the OpenAI API format. This means all 4 providers can share a single OpenAI SDK client with just a base_url change.

### 5a. Unified Client Factory

```python
from openai import OpenAI

def get_client(provider: str) -> tuple[OpenAI, str]:
    """Returns (client, model_id) for any provider using one SDK."""
    configs = {
        "anthropic":  (OpenAI(api_key=os.environ["ANTHROPIC_API_KEY"],
                              base_url="https://api.anthropic.com/v1/"),
                       "claude-opus-4-7"),
        "openai":     (OpenAI(api_key=os.environ["OPENAI_API_KEY"]),
                       "gpt-5.5"),
        "gemini":     (OpenAI(api_key=os.environ["GEMINI_API_KEY"],
                              base_url="https://generativelanguage.googleapis.com/v1beta/openai/"),
                       "gemini-3.1-pro-preview"),
        "perplexity": (OpenAI(api_key=os.environ["PERPLEXITY_API_KEY"],
                              base_url="https://api.perplexity.ai"),
                       "sonar-pro"),
    }
    return configs[provider]

# Use any provider with identical code
for provider in ["openai", "gemini", "perplexity"]:
    client, model = get_client(provider)
    r = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": "Hello"}]
    )
    print(f"{provider}: {r.choices[0].message.content}")
```

⚠️ **Gemini OpenAI compatibility is still in beta** (per official Gemini docs). Test thoroughly before production.

### 5b. Context Window Limits (when chaining, watch these)

| Provider   | Model            | Context Window | Notes                           |
| ---------- | ---------------- | -------------- | ------------------------------- |
| Anthropic  | Claude Opus 4.7  | 1M tokens      | Best for long document chains   |
| Anthropic  | Claude Haiku 4.5 | 200K tokens    |                                 |
| OpenAI     | GPT-5.5          | 1M tokens      |                                 |
| Google     | Gemini 3.1 Pro   | 1M tokens      | Best for long context synthesis |
| Perplexity | Sonar Pro        | 200K tokens    |                                 |

**Always log token counts when chaining to avoid silent overflow.**

---

## Pattern 6: LiteLLM Gateway (recommended for any multi-provider production system)

**What it is:** A proxy/SDK providing a unified API over 100+ providers. 8ms P95 latency at 1k RPS.

### Complete config file (`litellm_config.yaml`)

```yaml
model_list:
  # Primary stack
  - model_name: "fast"
    litellm_params:
      model: anthropic/claude-haiku-4-5
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: "balanced"
    litellm_params:
      model: anthropic/claude-sonnet-4-6
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: "powerful"
    litellm_params:
      model: anthropic/claude-opus-4-7
      api_key: os.environ/ANTHROPIC_API_KEY

  # Fallback stack
  - model_name: "fast"
    litellm_params:
      model: openai/gpt-5.4-mini
      api_key: os.environ/OPENAI_API_KEY

  - model_name: "balanced"
    litellm_params:
      model: openai/gpt-5.5
      api_key: os.environ/OPENAI_API_KEY

  # Search
  - model_name: "search"
    litellm_params:
      model: openai/sonar-pro
      api_key: os.environ/PERPLEXITY_API_KEY
      base_url: https://api.perplexity.ai

router_settings:
  routing_strategy: simple-shuffle # USE THIS — not usage-based-routing
  num_retries: 3
  retry_after: 5
  allowed_fails: 3
  cooldown_time: 30
  redis_host: os.environ/REDIS_HOST
  redis_password: os.environ/REDIS_PASSWORD
  cache_responses: true

litellm_settings:
  context_window_fallbacks:
    - claude-haiku-4-5: ["claude-sonnet-4-6"]
    - claude-sonnet-4-6: ["claude-opus-4-7"]
  content_policy_fallbacks:
    - claude-sonnet-4-6: ["openai/gpt-5.5"]
```

```bash
# Deploy as proxy
litellm --config litellm_config.yaml --port 4000

# Now all your code uses one endpoint
# Just change base_url to http://localhost:4000
```

**Source:** https://docs.litellm.ai/docs/routing, https://github.com/BerriAI/litellm

---

## Pattern 7: Circuit Breaker

**Purpose:** Stop sending requests to a failing provider before users experience errors.

```python
from litellm import Router
from litellm.types.router import AlertingConfig

router = Router(
    model_list=model_list,
    allowed_fails=3,        # After 3 failures within the window...
    cooldown_time=30,       # ...stop sending requests for 30 seconds
    alerting_config=AlertingConfig(
        alerting_threshold=10,
        webhook_url="https://your-slack-webhook.com/alerts"
    )
)
```

**Circuit breaker thresholds (from production analysis):**

| Metric           | Normal | Degraded             | Open Circuit |
| ---------------- | ------ | -------------------- | ------------ |
| Error rate       | < 5%   | > 20% / 100 requests | > 50% / 60s  |
| Response latency | < 5s   | > 15s                | > 30s        |
| Token quota      | < 60%  | 60–80%               | > 80%        |

**Source:** Getmaxim, Brandon Hendricks production reports

---

## Recommended Starter Stack

### For most production apps:

```
GATEWAY: LiteLLM proxy (routing + fallbacks + caching — one deployment)

TIER 1 (60% of traffic): claude-haiku-4-5 / gemini-3-flash-preview
→ Simple Q&A, classification, short generation

TIER 2 (30% of traffic): claude-sonnet-4-6 / gpt-5.5
→ Coding, analysis, tool use, structured output

TIER 3 (10% of traffic): claude-opus-4-7
→ Complex planning, multi-step reasoning, high-stakes decisions

SEARCH: perplexity/sonar-pro (any time you need real-time web facts)

FALLBACK CHAIN: Claude Sonnet → GPT-5.5 → Gemini 3.1 Pro
```

### For research / RAG pipelines:

```
1. Perplexity Sonar Pro    → ground in real-time web facts
2. Claude Opus 4.7         → deep reasoning over verified facts
3. Gemini 3 Flash          → synthesize to concise output
```

### For code / technical tasks:

```
1. Claude Sonnet 4.6       → understand and plan
2. GPT-5.5                 → generate (most reliable structured output)
3. Claude Haiku 4.5        → review and summarize
```

---

## When NOT to Use Multi-Provider

Per Shopify and MIT research:

- ❌ Do NOT use multi-agent/multi-provider for simple tasks that one model handles well
- ❌ Do NOT add more stages just because you can
- ❌ Do NOT use parallel consensus for real-time interactive UX (too slow, too expensive)
- ❌ Do NOT use cascade patterns for creative tasks (first response quality matters)
- ✅ DO use multi-provider for: reliability (fallbacks), cost optimization (routing), grounding (search → reason), and high-stakes decisions (consensus)

---

## OpenRouter as Quick Alternative

If you don't want to manage LiteLLM, OpenRouter gives you a unified API with 1 API key for 200+ models:

```python
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["OPENROUTER_API_KEY"],
    base_url="https://openrouter.ai/api/v1"
)

# Add web search to ANY model with :online suffix
response = client.chat.completions.create(
    model="anthropic/claude-opus-4-7:online",  # Claude with web search
    messages=[{"role": "user", "content": "What happened in AI today?"}]
)

# Or use auto-routing (OpenRouter picks best model)
response = client.chat.completions.create(
    model="openrouter/auto",
    messages=[{"role": "user", "content": "Your prompt"}]
)
```

**Source:** https://openrouter.ai/docs/docs/guides/features/plugins/web-search

---

_All patterns sourced from live production reports, official docs, and peer-reviewed papers — May 2026._
_Core sources: LiteLLM, RouteLLM (arXiv 2406.18665), LangGraph, Mastra, Bifrost, Mozilla Star Chamber, Getmaxim, Gemini docs, Perplexity docs, OpenRouter docs_
