# Heinrich AI — Company Website

Official website for **Heinrich AI**, the autonomous coding agent for VS Code.

## Install the product

Heinrich AI is available as a free VS Code extension:

**[Install from Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=heinrich-ai.heinrich-ai)**

Or search **“Heinrich AI”** in the VS Code Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`).

## Brand

- **Name:** Heinrich AI (used consistently across the site)
- **Logo:** `Images/heinrich-logo.png` (green emblem)

## Experience

Cinematic dark landing page with:

- Logo-integrated header, hero, CTA, and footer
- Primary CTAs that link to the VS Code Marketplace
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
- Website repo: [missarii/Heinrich-AI-Website](https://github.com/missarii/Heinrich-AI-Website)
- Product source: [missarii/Heinrich-AI](https://github.com/missarii/Heinrich-AI)
