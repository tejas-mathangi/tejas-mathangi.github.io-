# Portfolio Upgrade — Recruiter-Ready Redesign

Transform your portfolio from a student showcase into a professional developer portfolio that makes recruiters think: "This person builds real systems."

---

## GitHub Analysis — Top 6 Project Selection

After analyzing all 26 repositories, I filtered out forks (SkillCoach-MetaHack, Silo, Language-Agnostic-ChatBOT, ecommerce_bot, FAANG-Coding-Interview-Questions, programming-books, get-shit-done-for-antigravity), small practice repos (calculator-app, netflix-clone, message-board, newspaper), and duplicates. Here are the **6 strongest projects**, ranked by technical depth:

| # | Project | Why It's Strong | Tech Stack |
|---|---------|----------------|------------|
| 🔥1 | **MiniVC (mini-GIT)** | Built a version control system from scratch — SHA-256 content hashing, Myers diff algorithm, branching, full Web UI. Zero dependencies. This screams systems engineering. | Python, SHA-256, Custom Diff, HTTP Server |
| 2 | **ShortIt (URL Shortener)** | Full backend API with FastAPI, SQLAlchemy ORM, MySQL, Pydantic validation, click analytics — real-world microservice design. | FastAPI, SQLAlchemy, MySQL, Pydantic |
| 3 | **Event Booking API** | Production-style REST API with JWT auth, role-based access, capacity validation, Django + DRF — demonstrates backend architecture. | Django, DRF, JWT, REST API |
| 4 | **Screentime (Movie Search App)** | React + Vite app with debounced search, AbortController, localStorage watchlist, skeleton loading, responsive grid — solid frontend engineering. Live on Vercel. | React, Vite, OMDB API, CSS |
| 5 | **Matrix Insight** | Full-stack math visualizer: NumPy backend for linear algebra operations + animated JavaScript frontend for step-by-step matrix operation breakdown. | Python, NumPy, JavaScript, CSS |
| 6 | **OpenCV Color Detector** | Real-time computer vision — webcam + image mode, HSV color space segmentation, interactive pixel selection, masking pipeline. | Python, OpenCV, NumPy, Computer Vision |

> [!NOTE]
> I'm **removing** the following from the portfolio: To-Do CLI, Chess, Snake Game, BlackJack, Blog Platform, and "This Portfolio" — these are learning exercises that dilute the impact of your stronger work.

---

## Proposed Changes

### Rewritten Project Descriptions (Recruiter-Optimized)

Each project gets a strong title + 2-3 impactful bullets focused on *what problem it solves* and *what makes it technically interesting*:

#### 🔥 Featured Project: MiniVC — Version Control From Scratch
- Engineered a complete version control system in pure Python (zero dependencies) with SHA-256 content-addressed object storage, tree/blob/commit model, and full branching
- Implemented Myers diff algorithm (O(ND)) from scratch for line-by-line file comparison with color-coded output
- Built a self-contained dark-themed Web UI served via stdlib HTTP server with real-time 2-second polling, commit timeline, file tree browser, and diff viewer

#### ShortIt — URL Shortening Microservice
- Designed a RESTful URL shortener with FastAPI, implementing async route handlers, Pydantic request validation, and SQLAlchemy ORM for MySQL persistence
- Built click-tracking analytics endpoint that records access counts per short code — a production-ready pattern for link attribution systems

#### Event Booking API
- Architected a multi-role REST API with Django + DRF: JWT-authenticated user registration, admin-only event CRUD, and atomic booking with capacity validation
- Implemented role-based permission guards and serializer-level validation to prevent overbooking — handles concurrent edge cases at the API layer

#### Screentime — Movie Search Frontend
- Built a cinematic React + Vite movie search app with 500ms debounced input, AbortController-based race condition prevention, and paginated OMDB API integration
- Engineered persistent watchlist (localStorage), skeleton loading states, type/sort filtering, and keyboard navigation (Enter/Escape) — deployed live on Vercel

#### Matrix Insight — Linear Algebra Visualizer
- Created a full-stack matrix operations tool: NumPy backend computes multiply, transpose, determinant, and inverse with step-by-step breakdowns
- Built animated JavaScript frontend that renders interactive matrix grids with visual highlighting for row-column multiplication paths

#### OpenCV Color Detector
- Built a real-time computer vision pipeline that isolates user-selected colors from images or live webcam feeds using HSV color space segmentation
- Implemented interactive pixel-click color selection with dynamic HSV range calculation and mask-based highlighting — everything else desaturates to greyscale

---

### UI Redesign Plan

#### Structure Changes
The new layout keeps your existing codebase structure (HTML/CSS/JS, GitHub Pages compatible) but upgrades every section:

1. **Nav** — Add "Skills" link, keep same sticky behavior
2. **Hero** — Updated headline, stronger subtext, refreshed skills strip, add "Available for work" badge back
3. **Featured Projects** — Complete overhaul:
   - Project #1 (MiniVC) gets a **hero-sized featured card** spanning full width with highlight styling
   - Projects #2–6 in a 2-column grid with new descriptions
   - Each card: title, 2-3 bullet highlights, tech badges, GitHub link
   - Remove card numbers — use clean layout instead
4. **Skills** (NEW SECTION) — Categorized into: Languages, Backend, Frontend, Tools & Other
5. **About** — Rewritten to sound like an engineer, not a student. Updated stats.
6. **Contact** — Same structure, refreshed copy
7. **Footer** — Same structure

#### Design Upgrades
- **Font upgrade**: Replace DM Mono body font with Inter (much more readable for recruiters), keep Instrument Serif for headlines
- **Color palette**: Keep the terracotta accent but refine dark mode colors for better contrast
- **Featured card**: Subtle accent border-left + slightly elevated background for the #1 project
- **Bullet highlights**: Add small `◆` or `→` markers for project bullet points in cards
- **Scroll animations**: Keep IntersectionObserver fade-in, add staggered card reveals
- **Skills section**: Clean pill-badge layout grouped by category

---

### Files to Modify

#### [MODIFY] [index.html](file:///Users/200574/Desktop/TEJ/PROJECTS/WEB-DEV/portfolio/index.html)
- Update `<head>` fonts (add Inter, keep Instrument Serif)
- Rewrite hero section copy
- Replace all 8 project cards with 6 new ones (featured + grid)
- Add new Skills section between Hero and Projects
- Rewrite About section bio and stats
- Update contact copy

#### [MODIFY] [style.css](file:///Users/200574/Desktop/TEJ/PROJECTS/WEB-DEV/portfolio/style.css)
- Add Inter font, update `--font-mono` to `--font-body` (Inter)
- Add `.featured-card` styles (full-width, accent border)
- Add `.skills` section styles (category groups + pill grid)
- Add `.project-card__highlights` for bullet points inside cards
- Add staggered animation delay for cards
- Refine dark mode colors

#### [MODIFY] [script.js](file:///Users/200574/Desktop/TEJ/PROJECTS/WEB-DEV/portfolio/script.js)
- Update nav links array for new "Skills" section
- Add staggered reveal for project cards (sequential animation delay)

---

## Verification Plan

### Manual Verification
1. Open in browser locally to verify all sections render correctly
2. Test mobile responsiveness at 640px breakpoint
3. Verify dark mode renders correctly
4. Test all anchor links (nav → sections)
5. Verify all GitHub links point to correct repos
6. Test hamburger menu on mobile

### Browser Testing
- Open the updated portfolio locally and visually verify layout, animations, and responsiveness
