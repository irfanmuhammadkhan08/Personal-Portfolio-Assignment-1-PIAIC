# Irfan Muhammad Khan — AI Developer Portfolio

A premium, immersive portfolio website built with HTML, CSS, and vanilla JavaScript. Features a live Three.js neural network background, full dark theme, resume and cover letter pages, and a comprehensive showcase of AI & agentic systems projects.

---

## Features

- **Three.js Neural Network** — Animated 3D particle network in the hero background; mobile-optimized with touch parallax
- **Immersive Dark Theme** — Deep navy-black base with electric cyan & violet accents using OKLCH color tokens
- **Responsive Layout** — Mobile-first; tested on Chrome, Firefox, and WebKit across mobile/tablet/desktop
- **Custom Cursor** — Dot + ring cursor with hover and click states (desktop only)
- **Loading Screen** — Animated progress bar on entry
- **Typing Effect** — Cycling specializations in the hero headline
- **Scroll Animations** — Intersection Observer–based reveal for sections, skill cards, and timeline
- **Project Filters** — Filter grid by category (Agentic AI / Web App / AI Tools)
- **Skill Bars** — Animated progress bars triggered on scroll
- **Counter Animation** — Stats count up when visible
- **Contact Form** — Client-side validation with toast notifications
- **Resume Page** — Printable A4 resume (`resume.html`)
- **Cover Letter Page** — Printable cover letter (`cover-letter.html`)
- **Scroll Progress Bar** — Fixed top indicator
- **Back to Top** — Appears after scrolling 400px
- **Accessibility** — Skip link, ARIA attributes, semantic HTML throughout

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 — semantic, ARIA-compliant |
| Styles | CSS3 — custom properties (OKLCH), Grid, Flexbox, `@property` animations |
| Scripting | Vanilla JavaScript (ES6+) — no frameworks |
| 3D Animation | Three.js — WebGL neural network particle system |
| Icons | Font Awesome 6.5 |
| Fonts | Space Grotesk (headings) · Inter (body) · JetBrains Mono (code) |

---

## Project Structure

```
portfolio/
├── index.html            # Main portfolio page
├── resume.html           # Printable resume (A4)
├── cover-letter.html     # Printable cover letter
├── css/
│   ├── themes.css        # Design tokens (OKLCH colors, spacing, typography)
│   ├── styles.css        # All component styles
│   └── resume.css        # Resume & cover letter print styles
├── js/
│   ├── main.js           # Core interactions (Three.js, cursor, nav, animations)
│   ├── projects.js       # Project data & card rendering
│   └── resume-data.js    # Resume & cover letter content data
├── assets/
│   └── images/           # Profile photo
├── screenshots/          # Browser compatibility screenshots
└── CLAUDE.md             # Project development guide
```

---

## Sections

1. **Hero** — Three.js neural network, typing effect, profile image, stats counter, CTA buttons
2. **About** — Bio, highlight cards, animated skill progress bars
3. **Skills** — Technology tags grouped by category (AI/ML, Backend, Frontend, Cloud, Tools)
4. **Projects** — Filterable card grid with 6 AI projects (problem → solution → impact format)
5. **Journey** — Vertical timeline of education and experience
6. **Contact** — Validated form with character counter + contact info sidebar
7. **Footer** — Social links, quick nav, copyright

---

## Projects Showcased

| Project | Type | Stack |
|---------|------|-------|
| **AgentFlow** — AI Task Automation Engine | Agentic AI | Python, OpenAI API, LangChain, FastAPI, ChromaDB |
| **DocuBot** — RAG Document Assistant | Agentic AI | Python, Claude API, LlamaIndex, Pinecone, Streamlit |
| **PromptLab** — Prompt Engineering Toolkit | AI Tools | HTML5, CSS3, JavaScript, OpenAI API, Gemini API |
| **BizMind** — AI Business Advisor | Agentic AI | Python, Claude API, FastAPI, PostgreSQL, React |
| **ContentForge** — AI Content Platform | AI Tools | Python, GPT-4o, DALL-E 3, Next.js, Tailwind CSS |
| **ResumeAI** — Smart Resume Builder | Web App | Python, OpenAI API, HTML5, CSS3, JavaScript |

---

## Design System

### Colors (OKLCH)
- **Cyan** `oklch(75% 0.18 210)` — primary interactive, glows, accents
- **Violet** `oklch(58% 0.27 283)` — secondary accents, gradients
- **Background** `oklch(5.5%–16% 0.018–0.03 262)` — deep navy scale

### Spacing
8px base grid: `8 · 16 · 24 · 32 · 48 · 64px`

### Typography
- Headings: **Space Grotesk** 700/600
- Body: **Inter** 400/500
- Code/mono: **JetBrains Mono** 400/500

---

## Mobile Optimizations

- Three.js connection lines disabled on mobile (removes O(n²) computation per frame)
- Particle count reduced to 30 on mobile (120 on desktop)
- Touch parallax via `touchmove` listener
- `orientationchange` handler for correct canvas sizing on screen rotation
- Animation paused when tab is hidden (`visibilitychange`)
- Hero height uses `100svh` to avoid iOS Safari browser-bar overflow

---

## Browser Support

Tested with Playwright across:
- Chromium (desktop · tablet · mobile)
- Firefox (desktop · tablet · mobile)
- WebKit / Safari (desktop · tablet · mobile)

---

## Setup

```bash
# Clone the repo
git clone https://github.com/irfanmuhammadkhan08/Personal-Portfolio-Assignment-1-PIAIC.git

# Open in browser — no build step required
open index.html
```

---

## License

MIT — feel free to use as inspiration for your own portfolio.
