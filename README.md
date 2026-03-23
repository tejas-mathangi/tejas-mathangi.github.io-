# Tejas Mathangi — Portfolio

A handcrafted personal portfolio website built with pure **HTML**, **CSS**, and **vanilla JavaScript**. No frameworks, no build tools — just the fundamentals.

> **Learning project.** This site was built as a deep-dive into web fundamentals: CSS custom properties, Grid, Flexbox, `clamp()`, IntersectionObserver, and GitHub Pages deployment.

---

## Tech Stack

| Layer      | Technology                            |
|------------|---------------------------------------|
| Structure  | HTML5 (semantic elements)             |
| Styling    | CSS3 (custom properties, Grid, Flex)  |
| Behaviour  | Vanilla JavaScript (ES6+)             |
| Fonts      | Google Fonts (Instrument Serif + DM Mono) |
| Hosting    | GitHub Pages                          |

---

## Features

- **Sticky navigation** — border appears on scroll via JS class toggle
- **Mobile hamburger menu** — CSS dropdown, toggled by JS
- **Smooth scroll** — `scrollIntoView({ behavior: 'smooth' })`
- **Scroll fade-in animations** — `IntersectionObserver` API
- **Active nav link** — highlights current section while scrolling
- **Full dark mode** — `@media (prefers-color-scheme: dark)` with CSS variables
- **Fluid typography** — `clamp()` for responsive font sizes without breakpoints
- **Responsive layout** — single `@media (max-width: 640px)` breakpoint

---

## Project Structure

```
portfolio/
├── index.html   ← all markup, semantically structured
├── style.css    ← design system + layout + animations
├── script.js    ← all JS features, heavily commented
└── README.md    ← this file
```

---

## Running Locally

No build step needed — just open the file:

```bash
# Option 1: open directly in browser
open index.html

# Option 2: use a local dev server (recommended)
npx serve .
# or with VS Code: right-click index.html → Open with Live Server
```

---

## Deploying to GitHub Pages

1. Push all files to a GitHub repo named `<your-username>.github.io`  
   *(or any repo — Pages works from any branch)*

2. Go to **Settings → Pages → Source → Deploy from a branch**

3. Select `main` branch, root `/` folder → Save

4. Your site will be live at:  
   `https://<your-username>.github.io`

---

## CSS Concepts Used

| Concept | Where |
|---------|-------|
| CSS custom properties (variables) | `:root` in `style.css` |
| `clamp()` fluid sizing | `.hero__headline`, `.contact__heading` |
| CSS Grid (2-col) | `.projects__grid`, `.about__grid` |
| CSS Grid nested | `.about__stats` inside `.about__grid` |
| Flexbox | Nav, hero CTAs, skills bar, footer |
| `@keyframes` | `.hero__dot` pulse animation |
| `IntersectionObserver` | Scroll fade-in in `script.js` |
| Mobile-first responsive | `@media (max-width: 640px)` |


---

*Built from scratch — no frameworks, no shortcuts.*
