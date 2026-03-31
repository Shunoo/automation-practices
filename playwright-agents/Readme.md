# 🤖 Playwright Agents

Exploring the frontier of **AI-powered browser automation** using Playwright's agent capabilities.

This is a learning space — not production code. The goal is to understand how LLMs can be combined with Playwright to automate tasks that are difficult or impossible to script deterministically.

---

## 📁 Structure

```
agents/
├── examples/           # Standalone agent demos
│   ├── basic-navigation.ts
│   ├── form-fill-agent.ts
│   └── ...
│
├── tasks/              # Agent solutions for specific challenges
│   ├── challenge-agent-runner.ts
│   └── ...
│
├── utils/              # Agent helpers and prompt templates
│   └── prompts.ts
│
└── README.md           ← You are here
```

---

## 🧠 What Are Playwright Agents?

Traditional Playwright tests are deterministic scripts: you tell the browser exactly what to do, step by step.

Agents flip this model — you describe **what you want to accomplish**, and the agent figures out the steps using an LLM to interpret the page, decide actions, and recover from failures.

```
Goal: "Fill in the registration form and submit"
  ↓
Agent sees the DOM / screenshot
  ↓
LLM decides: click name field → type → click email → type → click submit
  ↓
Playwright executes each action
  ↓
Agent verifies success or retries
```

---

## 🚀 Getting Started

```bash
# From the playwright/ root
npm install

# Set your API key (if using an LLM provider)
export ANTHROPIC_API_KEY=your_key_here

# Run a basic agent example
npx ts-node agents/examples/basic-navigation.ts
```

---

## 🔬 Topics Covered

| Topic | Status | File |
|---|---|---|
| Basic page navigation via natural language | ⚪ | `examples/basic-navigation.ts` |
| Form filling with agent reasoning | ⚪ | `examples/form-fill-agent.ts` |
| Self-healing selectors | ⚪ | |
| Multi-step task completion | ⚪ | |
| Agent observability (tracing + logging) | ⚪ | |
| Autonomous challenge solving | ⚪ | `tasks/challenge-agent-runner.ts` |

> Status: 🟢 Done · 🟡 In Progress · ⚪ Not Started

---

## 📚 Resources

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Claude API Docs](https://docs.anthropic.com)
- [Playwright + AI patterns](https://playwright.dev/docs/codegen)

---

*"The best test is one that doesn't need to be updated every time the UI changes."*
