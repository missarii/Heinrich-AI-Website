# Heinrich AI — Company Website

Official website for **Heinrich AI**, the autonomous coding agent for VS Code.

## Install the product

Heinrich AI is available as a free VS Code extension:

**[Install from Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=heinrich-ai.heinrich-ai)**

Or search **“Heinrich AI”** in the VS Code Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`).

## Ecosystem — MCP servers

Heinrich AI is designed to work with purpose-built MCP servers from the same team:

| Product | Role | Repo |
|--------|------|------|
| **[Overthink](https://github.com/missarii/overthink)** | Strict discipline / problem-solving control layer for AI coding agents | [missarii/overthink](https://github.com/missarii/overthink) |
| **[Mila](https://github.com/missarii/Mila)** | AI UI/UX intelligence toolkit & MCP server (components, design rules, review) | [missarii/Mila](https://github.com/missarii/Mila) |

Both are promoted on the site under **Ecosystem**, with logos, feature summaries, and GitHub links.

## Brand

- **Name:** Heinrich AI (used consistently across the site)
- **Logo:** `Images/heinrich-logo.png` (green emblem)
- **Overthink / Mila logos:** loaded from their GitHub repos (raw)

## Experience

Cinematic dark landing page with:

- Logo-integrated header, hero, CTA, and footer
- Primary CTAs that link to the VS Code Marketplace
- Ecosystem section for Overthink + Mila MCP servers
- Scroll-driven glass depth layers (parallax)
- Soft 3D card lifts and floating visual panels
- IntersectionObserver reveal animations
- Ambient starfield tinted to the brand green
- Glassmorphism panels and frosted header

## Structure

```
.
├── Images/
│   └── heinrich-logo.png
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Local preview

```bash
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:3000` (or the port shown).

## Links

- **VS Code Extension:** [marketplace.visualstudio.com/items?itemName=heinrich-ai.heinrich-ai](https://marketplace.visualstudio.com/items?itemName=heinrich-ai.heinrich-ai)
- **Overthink MCP:** [github.com/missarii/overthink](https://github.com/missarii/overthink)
- **Mila MCP / UI toolkit:** [github.com/missarii/Mila](https://github.com/missarii/Mila)
- Website repo: [missarii/Heinrich-AI-Website](https://github.com/missarii/Heinrich-AI-Website)
- Product source: [missarii/Heinrich-AI](https://github.com/missarii/Heinrich-AI)
