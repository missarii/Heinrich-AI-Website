# Heinrich AI — Company Website

Official website for **Heinrich AI**, the autonomous coding agent for VS Code.

---

## About Heinrich AI

**Heinrich AI** is a free autonomous coding agent extension for Visual Studio Code. It plans tasks, reads your codebase, edits files, runs terminal commands, and can control a browser — always with your explicit approval. It is not another chat window; it is a full autonomous agent that understands your workspace, runs tools, manages tasks, and keeps a complete record of every action.

### Core capabilities

- **Multi-provider intelligence** — Anthropic, OpenRouter, AWS Bedrock, Gemini, Cerebras, Ollama, LM Studio, and VS Code's own models. Switch providers without changing how you work.
- **MCP-native ecosystem** — Connect Overthink for disciplined workflows and Mila for UI/UX intelligence, or any community MCP server.
- **Streaming and real-time feedback** — Watch the agent reason and act in real time. Partial updates, tool approval flows, and clear visibility into every step.
- **Task history and continuity** — Every conversation and action is preserved. Resume work days later with full context.

### Ecosystem — MCP servers

Heinrich AI is designed to work with purpose-built MCP servers from the same team:

| Product | Role | Repo |
|--------|------|------|
| **[Overthink](https://github.com/missarii/overthink)** | Strict discipline / problem-solving control layer for AI coding agents | [missarii/overthink](https://github.com/missarii/overthink) |
| **[Mila](https://github.com/missarii/Mila)** | AI UI/UX intelligence toolkit & MCP server (components, design rules, review) | [missarii/Mila](https://github.com/missarii/Mila) |

Both are promoted on the site under **Ecosystem**, with logos, feature summaries, and GitHub links.

---

## Technologies used

### Frontend / site
- **HTML5** — Semantic markup, Open Graph / Twitter Card meta tags, JSON-LD structured data
- **CSS3** — Custom properties (CSS variables), glassmorphism, flexbox/grid layouts, responsive media queries, reveal-on-scroll animations
- **JavaScript (Vanilla)** — Service Worker registration, IntersectionObserver reveal animations, scroll-driven parallax glass layers, ambient canvas starfield/network background

### Image caching (works on Surge.sh static hosting)
> **Note:** Surge.sh is static hosting with no server-side runtime, so **Redis cannot run on Surge**. Instead the site uses these client-side / edge cache layers:

| Cache layer | File | Purpose |
|-------------|------|---------|
| **Service Worker Cache API** | `sw.js` | Cache-first strategy for all `/Images/*` assets. Images are cached in the browser on first visit and load instantly (offline-capable) on repeat visits. |
| **HTTP Cache-Control** | `_headers` | `Cache-Control: public, max-age=31536000, immutable` for images, CSS, and JS so the CDN and browsers cache them for 1 year. |
| **Service Worker registration** | `script.js` | Registers `/sw.js` on page load. |
| **`fetchpriority="high"`** | `index.html` | Prioritizes the hero logo (above-the-fold LCP image). |
| **`loading="lazy"` + `decoding="async"`** | `index.html` | Below-the-fold feature images load lazily and decode off the main thread. |

### Hosting
- **Surge.sh** — Static site hosting (production)
- **Cloudflare Workers** — Alternate deployment (`web.heinrich-ai.workers.dev`)

### Product (VS Code extension)
- **TypeScript** — VS Code extension source (`missarii/Heinrich-AI`)
- **Model Context Protocol (MCP)** — Connects to Overthink and Mila servers
- **Multi-provider LLM support** — Anthropic, OpenRouter, AWS Bedrock, Gemini, Cerebras, Ollama, LM Studio, VS Code models

---

## Brand

- **Name:** Heinrich AI (used consistently across the site)
- **Logo:** `Images/heinrich-logo.png` (green emblem)
- **Feature images:** `Images/heinrich-providers.jpg`, `Images/heinrich-mcp.jpg`, `Images/heinrich-streaming.jpg`, `Images/heinrich-history.jpg`
- **Overthink / Mila logos:** loaded from their GitHub repos (raw)

---

## Project structure

```
.
├── Images/
│   ├── heinrich-logo.png
│   ├── heinrich-providers.jpg
│   ├── heinrich-mcp.jpg
│   ├── heinrich-streaming.jpg
│   └── heinrich-history.jpg
├── _headers                 # Surge cache headers (1-year Cache-Control)
├── index.html               # Main landing page
├── script.js                # Interactions + Service Worker registration
├── sw.js                    # Service Worker: Cache API image cache
├── styles.css               # Styles (glassmorphism, grid, animations)
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Local preview

```bash
# Serve the static site locally
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000` (or the port shown).

The Service Worker and cache headers work best when served over HTTP(S); local file:// previews may not register the SW.

---

## Install the product

Heinrich AI is available as a free VS Code extension:

**[Install from Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=heinrich-ai.heinrich-ai)**

Or search **“Heinrich AI”** in the VS Code Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`).

---

## Links

- **VS Code Extension:** [marketplace.visualstudio.com/items?itemName=heinrich-ai.heinrich-ai](https://marketplace.visualstudio.com/items?itemName=heinrich-ai.heinrich-ai)
- **Overthink MCP:** [github.com/missarii/overthink](https://github.com/missarii/overthink)
- **Mila MCP / UI toolkit:** [github.com/missarii/Mila](https://github.com/missarii/Mila)
- **Website repo:** [missarii/Heinrich-AI-Website](https://github.com/missarii/Heinrich-AI-Website)
- **Product source:** [missarii/Heinrich-AI](https://github.com/missarii/Heinrich-AI)
- **Live site:** [heinrich-ai.surge.sh](https://heinrich-ai.surge.sh/)


## 📞 Contacts

| Platform | Link |
|----------|------|
| **LinkedIn** | [Heinrich AI Company](https://www.linkedin.com/company/heinrich-ai/) |
| **Website** | [heinrich-ai.surge.sh](https://heinrich-ai.surge.sh/) |
| **VS Code Extension** | [Install Extension](https://marketplace.visualstudio.com/items?itemName=heinrich-ai.heinrich-ai) |

