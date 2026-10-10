# Portfolio

A minimal, dark-first personal site with an animated black hole behind the content.
Plain HTML/CSS/JS: no framework, no build step.

## Edit your content

All the content is in **`data.js`**: name, intro, experience, projects, skills, posts, email and links.
Search for `TODO` and replace each one. Then:

- Resume: put `resume.pdf` next to `index.html` and set `resume: "resume.pdf"` in `data.js`. The Resume link stays hidden until you do.
- The timeline currently shows Education. Change `timeline.label` and `timeline.title` and add entries when you have internships.
- Projects can take an `image: "shots/verdict.png"` screenshot. Without one, they get a generated cover.
- Set `writing: []` to hide the Writing section.

## Run locally

```bash
python3 -m http.server 5178
```

Then open http://localhost:5178.

## Deploy (free)

- **GitHub Pages:** push this folder to a repo, then go to Settings → Pages → "Deploy from branch" → `main` / root.
- **Netlify / Vercel / Cloudflare Pages:** drag and drop the folder, or connect the repo. No build command is needed.

## Features

- Black hole drawn on a canvas, with lensing and a Doppler-brightened disk. It reacts to scrolling and the mouse, and pauses when the tab is hidden.
- Dark and light themes that remember your choice (press `T`).
- Command menu: `⌘K` / `Ctrl+K` or `/`.
- Project filters, a cursor spotlight on project cards, scroll reveals, and a typing role line.
- Live local-time chip, a "currently building" block, and copy-to-clipboard for your email.
- Responsive layout with a full-screen mobile menu. Respects `prefers-reduced-motion`.

The contact form opens the visitor's mail app (`mailto:`). To receive messages without that,
create a free [Formspree](https://formspree.io) form, set the `<form>`'s `action` to its URL,
and remove the submit handler in `main.js`.
