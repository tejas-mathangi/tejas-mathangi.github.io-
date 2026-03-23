# Portfolio Build: Comprehensive Technical Documentation

This document serves as an exhaustive, step-by-step breakdown of every single technical decision, thought process, and implementation detail that went into building this portfolio website from scratch. 

If you want to understand *how* everything on this website works, from the fluid typography down to the exact math behind the hamburger menu animation, this is your masterclass.

---

## Part 1: Architecture & Philosophy

**The Goal:** Build a clean, minimalist, responsive single-page portfolio that loads instantly, is accessible to screen readers, and requires absolute zero build tools (no React, no Tailwind, no Webpack). We wanted "editorial minimalism" — it should look like a printed magazine, not a SaaS tech startup.

**The Stack: The Holy Trinity of the Web**
1. **HTML:** Semantic structure, telling the browser exactly *what* each piece of content is.
2. **CSS:** The design system, handling typography, layout, animations, and dark mode natively.
3. **Vanilla JavaScript:** Adding lightweight interactivity to the DOM (Document Object Model) without massive library overheads.

---

## Part 2: The Base Scaffold & Design System

Every good project starts with robust foundations. Before we wrote any actual content, we built the CSS skeleton.

### 1. CSS Custom Properties (Variables)
Instead of hardcoding `#1a1a1a` fifty times across `style.css`, we used CSS variables within the `:root` pseudo-class. 
```css
:root {
  --ink: #1a1a1a;
  --paper: #f7f6f2;
}
```
*Why this matters:* If we want to change the text color later, we change it in *one* place. More importantly, it allows us to do **Dark Mode natively** in a few lines of code (covered later).

### 2. The Universal Reset
Every browser natively applies its own default styles (margins on `<h1>`, padding on `<ul>`). We stripped these away using a CSS reset to gain total control:
```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
*Why `border-box`?* By default, adding 10px padding to a 100px wide box makes the box 120px wide. Setting `box-sizing: border-box` forces the browser to shrink the *inside* content instead, keeping the box exactly 100px. This prevents layout breakage.

### 3. Typography: `clamp()`
We chose **Instrument Serif** (headings) and **DM Mono** (body code). 
For the hero headline to look massive on desktop but not overflow on mobile, we used modern CSS `clamp()`:
```css
font-size: clamp(48px, 9vw, 110px);
```
*How it works:* 
- Min size: `48px`
- Ideal size: `9vw` (9% of the viewport width — so as you drag the window wider, the font perfectly expands)
- Max size: `110px`
This removes the need to write five different `@media` queries just to scale font sizes.

---

## Part 3: Building The Sections (HTML & CSS Layouts)

We built the site section by section, ensuring mobile-first responsive design.

### Section 1: The Navigation
The navigation consists of three parts: a logo, a hamburger menu `<button>`, and a list `<ul>` of links.
We used **Flexbox** (`display: flex`) with `justify-content: space-between` to instantly push the logo to the far left and the links/hamburger to the far right.

**The Sliding Accent Underline (::after pseudo-element)**
When you hover over a nav link, a terracotta line slides in. We didn't add extra HTML `<span>` tags. We generated the line using CSS:
```css
.nav__link {
  position: relative; /* Anchor point for the underline */
}
.nav__link::after {
  content: ''; /* Required, else it won't render */
  position: absolute;
  left: 0; bottom: -1px;
  width: 0; /* Invisible by default */
  height: 1px;
  background: var(--accent);
  transition: width 0.25s ease;
}
.nav__link:hover::after {
  width: 100%; /* Line grows from left to right */
}
```

**The Hamburger ☰ to × Morph Animation**
We drew the hamburger menu using three `<span/>` bars inside a `<button>`. 
To animate them into an `X`, we listen to the HTML accessibility attribute `aria-expanded="true"` (which JS toggles when clicked).

When open:
- Top bar: Moves down into the centre (`translateY(6.5px)`), then tilts 45 degrees.
- Middle bar: Shrinks to width zero (`scaleX(0)`) to vanish.
- Bottom bar: Moves up into the centre (`translateY(-6.5px)`), then tilts -45 degrees.
*The trick:* The `translateY` MUST happen before the `rotate`, otherwise the bars would rotate in their original positions and miss each other.

### Section 2: The Hero
We used a simple column Flexbox layout, placing the Headline, subtext, and buttons. 
To align the skill tags (`HTML / CSS`, `JavaScript`, `Django`, etc.) so they wrap to a new line on small screens, we simply used `display: flex; flex-wrap: wrap; gap: 8px;`.

### Section 3: The Projects Grid
This is where we get advanced. You have 8 cards. How do we cleanly separate them without clunky borders doubling up? 
**The 1px Gap Border Trick:**
```css
.projects__grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2 columns */
  gap: 1px;
  background: var(--border); /* Grid background is the border color */
}
.project-card {
  background: var(--paper); /* The cards block out the background */
}
```
Because the gap between cards is 1px wide, the `var(--border)` grid background peeks through that exact 1px space, creating a perfect, non-doubling grid line between all elements. 

To make the *entire* card clickable, we made the card itself an `<a>` tag `class="project-card" href="..."`. This is amazing for User Experience (UX) because the user doesn't have to precisely click the small "View on GitHub →" text.

### Section 4: About, Stats, Contact, and Footer
**The Stats:**
We used a nested grid. The overall `about` section is a 2-column grid (Bio on left, Stats on right). The Stats container itself is *also* a 2x2 grid (`grid-template-columns: 1fr 1fr;`).
We populated this with real stats: `8+` projects, `5` languages/frameworks, `100%` self-taught, and an `∞ Infinite aura farm`.

**The Socials & Contact:**
We used a lightweight `mailto:mathangi.tejas@gmail.com` link dressed up like a button. No heavy PHP backend forms necessary for a personal portfolio.

---

## Part 4: The Logic (Vanilla JavaScript)

Our `script.js` file handles 5 specific interactive features.

### 1. Sticky Nav Scrolled State (Adding depth)
We want a clean flat nav at the very top, but as soon as the user scrolls, a subtle bottom-border should appear to separate the nav from the content passing under it.
```javascript
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled') // Adds the border via CSS
  } else {
    nav.classList.remove('scrolled')
  }
})
```

### 2. Smooth Scroll for Anchors
By default, clicking `<a href="#projects">` violently teleports the user down the page. We hijack all anchor link clicks, prevent the default teleportation (`e.preventDefault()`), and instruct the browser to glide there smoothly:
```javascript
target.scrollIntoView({ behavior: 'smooth' })
```

### 3. Scroll Fade-In Animations (IntersectionObserver)
We wanted elements to elegantly slide up and fade in as the user scrolls to them. 
We *could* have used the slow, heavy method of listening to every single scroll event and checking math. Instead, we used the modern, ultra-fast browser API called `IntersectionObserver`.

1. We gather all HTML elements with the class `fade-in`.
2. In CSS, `.`fade-in` means `opacity: 0; transform: translateY(20px);` (invisible and pushed down 20 pixels).
3. The Observer acts like a tripwire. When an element hits a certain threshold in the browser screen (10% visible), the observer fires a callback function.
4. The callback adds the class `.visible`.
5. In CSS, `.visible` changes `opacity: 1; transform: translateY(0);`
6. CSS handles the transition, creating the fade-in effect.
7. We then tell the Observer to *stop watching* that element, so it only animates once per page load.

### 4. Scroll Spy (Active Nav Link Highlighting)
As you scroll down past the Hero and into "Projects", the "Projects" nav link underlines itself. 
1. We listen to `window.addEventListener('scroll')`.
2. We iterate over every `<section id="...">` tag.
3. We calculate `section.offsetTop - 100` (we subtract 100px so the highlight triggers slightly *before* the section hits the exact top, accounting for the height of the sticky nav).
4. Whichever section we are currently past becomes `currentId`.
5. We loop over the nav links and add the `.active` class to the link whose `href` matches `#currentId`.

### 5. Hamburger Menu Toggle
When the hamburger button is clicked:
1. JS toggles the `.open` class on the 5links `<ul>`.
2. JS updates the `<button aria-expanded="true">` attribute. (This triggers the CSS cross morph animation, and lets screen reader software know the menu opened).
3. We attached event listeners to every single link inside the mobile menu so that if a user clicks "About", the menu *closes* dynamically while smoothly scrolling them to that section.

---

## Part 5: Pure CSS Magic (Dark Mode & Responsiveness)

### Handling Mobile (Media Queries)
We designed *Desktop first*, and then added a single breakpoint at `640px` for mobile devices.
At `640px`:
- We hide the horizontal nav links `ul { display: none }` and show them as a vertical stack when the `.open` class is attached.
- We un-hide the hamburger button.
- We force all grids (`.projects__grid`, `.about__grid`) to `grid-template-columns: 1fr` (a single column).

### Dark Mode (Prefers-Color-Scheme)
Because we used CSS Custom Properties (Variables) in Part 2, implementing Dark Mode is laughably simple.

We use the `@media (prefers-color-scheme: dark)` rule. This rule natively asks the user's operating system (macOS/Windows/iOS/Android) if they have Dark Mode turned on globally.

If yes, we simply redefine the variables:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --ink: #f7f6f2; /* Text becomes cream */
    --paper: #131210; /* Background becomes deep gray-black */
    --surface: #1e1d1b; /* Cards become slightly lighter gray */
    --border: #2c2a27;
    --accent: #e07060; /* Terracotta made lighter for dark background contrast */
  }
}
```
No JavaScript toggles required. The browser instantly repaints every element on the site using the new color scheme.

---

## Part 6: Sourcing Real Repositories

At the very end of the build, we needed to dynamically pull your real project links. 
To do this, I executed a `bash` script loop directly inside your computer's filesystem.

1. I traversed the folders: `DJANGO/event-booking...`, `JAVA/black-jack-java`, `JAVA/SnakeGame-java`, etc.
2. In each folder, I ran `git remote get-url origin`
3. I extracted exact URLs (like `https://github.com/tejas-mathangi/MY-CODES`) 
4. I inserted those real URLs straight into the `href` attributes of the 8 grid cards.

---

## Part 7: Final Tweaks & Deployment

In the closing run:
1. I hunted down a stray broken HTML comment (`<em> = italic + terracotta accent colour. -->`) that leaked text onto the screen above your main headline. 
2. Changed "Cups of chai" to "Infinite aura farm" at your command.
3. Hooked up your real email: `mathangi.tejas@gmail.com`.
4. Staged (`git add .`), committed (`git commit`), and finally deployed the source code natively to your remote repository `https://github.com/tejas-mathangi/tejas-mathangi.github.io-.git`.

---

## The End Result
You now possess a deeply optimized, zero-dependency, screen-reader accessible web application that natively respects OS dark mode preferences, mathematically calculates responsive font sizes, and smoothly manages navigation state using vanilla DOM logic. 

**It is beautiful, it is functional, and it was hand-crafted code from absolute scratch.**
