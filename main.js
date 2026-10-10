(() => {
  "use strict";
  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ───────────── Icons ───────────── */
  const I = {
    github: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/></svg>',
    leetcode: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    ext: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>'
  };
  const socialLabel = { github: "GitHub", linkedin: "LinkedIn", x: "X", leetcode: "LeetCode" };

  /* ───────────── Render content ───────────── */
  function render() {
    document.title = S.name;
    $('meta[property="og:title"]').content = S.name;
    $("[data-initials]").textContent = S.initials;
    $("[data-initials]").setAttribute("aria-label", `${S.name}, home`);

    const parts = S.name.split(" ");
    $("[data-name]").innerHTML = parts.length > 1
      ? `${esc(parts.slice(0, -1).join(" "))}<br>${esc(parts.at(-1))}`
      : esc(S.name);
    $("[data-intro]").innerHTML = S.intro.map((l) => `<span>${esc(l)}</span>`).join("");

    if (S.status) $("[data-status-text]").textContent = S.status;
    else $("[data-status]").remove();

    const socials = Object.entries(S.socials).filter(([, url]) => url);
    const socialHTML = socials.map(([k, url]) =>
      `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${socialLabel[k] || k}" title="${socialLabel[k] || k}">${I[k] || I.ext}</a>`
    ).join("") + `<a href="mailto:${esc(S.email)}" aria-label="Email" title="Email">${I.mail}</a>`;
    $$("[data-socials]").forEach((el) => (el.innerHTML = socialHTML));

    $$("[data-resume]").forEach((a) => (S.resume ? (a.href = S.resume) : a.remove()));

    // About
    $("[data-about]").innerHTML = S.about.map((p) => `<p>${esc(p)}</p>`).join("");
    $("[data-stats]").innerHTML = S.stats.map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("");
    $("[data-location]").textContent = S.location;

    // Timeline (education / experience)
    $$("[data-timeline-label], [data-timeline-nav]").forEach((el) => (el.textContent = S.timeline.label));
    $("[data-timeline-title]").textContent = S.timeline.title;
    $("[data-timeline]").innerHTML = S.timeline.items.map((j, i) => `
      <li class="job reveal" style="--d:${i * 0.06}s">
        <div class="job-when">${esc(j.period)}<small>${esc(j.location || "")}</small></div>
        <div class="job-body">
          <h3>${esc(j.role)} <span class="at">at</span> ${j.orgUrl ? `<a href="${esc(j.orgUrl)}" target="_blank" rel="noopener">${esc(j.org)}</a>` : esc(j.org)}</h3>
          <ul>${j.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          <div class="tags">${(j.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div>
      </li>`).join("");

    // Projects
    const single = S.projects.length === 1;
    $("[data-projects]").classList.toggle("single", single);
    $("[data-projects]").innerHTML = S.projects.map((p, i) => `
      <article class="project card reveal${single ? " featured" : ""}" style="--d:${(i % 2) * 0.08}s" data-tags="${esc(p.tags.join("|"))}">
        <div class="cover">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)} screenshot" loading="lazy">` : p.cover === "graph" ? graphCover(p.name, i) : cover(p.name, i)}</div>
        <div class="project-body">
          <div class="project-top">
            <h3>${esc(p.name)}${p.status ? `<span class="badge">${esc(p.status)}</span>` : ""}</h3>
            <div class="project-links">
              ${p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener" aria-label="${esc(p.name)} source code">${I.github}</a>` : ""}
              ${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener" aria-label="${esc(p.name)} live site">${I.ext}</a>` : ""}
            </div>
          </div>
          <p>${esc(p.blurb)}</p>
          ${p.metrics?.length ? `<dl class="metrics">${p.metrics.map((x) => `<div><dt>${esc(x.label)}</dt><dd>${esc(x.value)}</dd></div>`).join("")}</dl>` : ""}
          ${p.highlights?.length ? `<ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
          <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div>
      </article>`).join("");
    buildFilters();

    // Skills
    $("[data-skills]").innerHTML = Object.entries(S.skills).map(([g, items], i) => `
      <div class="skill-group reveal" style="--d:${i * 0.06}s">
        <h3>${esc(g)}</h3>
        <ul>${items.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>`).join("");

    // Writing
    if (S.writing?.length) {
      const fmt = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" });
      $("[data-writing]").innerHTML = S.writing.map((w, i) => `
        <li class="reveal" style="--d:${i * 0.05}s"><a href="${esc(w.url)}" ${w.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>
          <time datetime="${esc(w.date)}">${fmt.format(new Date(w.date + "T00:00:00"))}</time>
          <span class="title">${esc(w.title)}</span>
          <span class="read">${esc(w.read || "")}<span class="arrow">↗</span></span>
        </a></li>`).join("");
    } else {
      $$('[data-if="writing"]').forEach((el) => el.remove());
    }

    $("[data-now]").textContent = S.now;
    const mail = $("[data-email-link]");
    mail.href = `mailto:${S.email}`;
    mail.textContent = S.email;
    $("[data-footer]").textContent = `${S.name} · ${S.domain} · ${new Date().getFullYear()}`;
  }

  // Deterministic generated cover art per project: orbits + dot field
  function cover(seedStr, idx) {
    let h = 2166136261;
    for (const ch of seedStr) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    const rnd = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507), h = Math.imul(h ^ (h >>> 13), 3266489909), (h ^= h >>> 16) >>> 0) / 4294967296);
    const cx = 220 + rnd() * 160, cy = 150 + rnd() * 40, tilt = -18 + rnd() * 36;
    let rings = "";
    const n = 4 + Math.floor(rnd() * 3);
    for (let i = 0; i < n; i++) {
      const rx = 60 + i * (28 + rnd() * 14), ry = rx * (0.22 + rnd() * 0.12);
      rings += `<ellipse cx="${cx}" cy="${cy}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="var(--fg-3)" stroke-opacity="${(0.55 - i * 0.07).toFixed(2)}" stroke-width="0.8" ${i % 2 ? 'stroke-dasharray="2 5"' : ""} transform="rotate(${tilt.toFixed(1)} ${cx} ${cy})"/>`;
    }
    let dots = "";
    for (let x = 14; x < 600; x += 22) for (let y = 14; y < 338; y += 22) dots += `<circle cx="${x}" cy="${y}" r="0.9"/>`;
    const r = 26 + rnd() * 14;
    return `<svg viewBox="0 0 600 338" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="g${idx}" cx="${(cx / 6).toFixed(1)}%" cy="${(cy / 3.38).toFixed(1)}%" r="45%">
          <stop offset="0" stop-color="var(--accent)" stop-opacity=".22"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <g fill="var(--fg-3)" opacity=".35">${dots}</g>
      <rect width="600" height="338" fill="url(#g${idx})"/>
      ${rings}
      <circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="var(--bg)" stroke="var(--accent-2)" stroke-width="1.2"/>
      <text x="24" y="314" font-family="Geist Mono, monospace" font-size="12" fill="var(--fg-3)" letter-spacing="1.5">${String(idx + 1).padStart(2, "0")} / ${esc(seedStr.toUpperCase())}</text>
    </svg>`;
  }

  // Cover for graph projects: a seeded transaction network with one highlighted fraud ring
  function graphCover(seedStr, idx) {
    let h = 2166136261;
    for (const ch of seedStr) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    const rnd = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507), h = Math.imul(h ^ (h >>> 13), 3266489909), (h ^= h >>> 16) >>> 0) / 4294967296);
    const W = 600, H = 338, nodes = [], edges = [];
    for (let i = 0; i < 70; i++) nodes.push({ x: 20 + rnd() * (W - 40), y: 18 + rnd() * (H - 60), ring: false });
    const rc = { x: W * 0.64, y: H * 0.44 };
    for (let i = 0; i < 13; i++) {
      const a = (i / 13) * Math.PI * 2 + rnd() * 0.4, r = 26 + rnd() * 46;
      nodes.push({ x: rc.x + Math.cos(a) * r * 1.35, y: rc.y + Math.sin(a) * r, ring: true });
    }
    const near = (i, k) => nodes.map((n, j) => [j, (n.x - nodes[i].x) ** 2 + (n.y - nodes[i].y) ** 2]).filter(([j]) => j !== i).sort((a, b) => a[1] - b[1]).slice(0, k).map(([j]) => j);
    nodes.forEach((n, i) => near(i, n.ring ? 3 : 2).forEach((j) => { if (i < j || !nodes[j].ring) edges.push([i, j]); }));
    const line = ([i, j]) => {
      const a = nodes[i], b = nodes[j], hot = a.ring && b.ring;
      return `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${hot ? "var(--accent)" : "var(--fg-3)"}" stroke-opacity="${hot ? 0.75 : 0.32}" stroke-width="${hot ? 1.1 : 0.7}"/>`;
    };
    const dot = (n) => n.ring
      ? `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="4.2" fill="var(--bg)" stroke="var(--accent-2)" stroke-width="1.4"/>`
      : `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${(1.6 + rnd() * 1.6).toFixed(1)}" fill="var(--fg-3)" fill-opacity=".7"/>`;
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs><radialGradient id="gg${idx}" cx="${(rc.x / W * 100).toFixed(1)}%" cy="${(rc.y / H * 100).toFixed(1)}%" r="38%">
        <stop offset="0" stop-color="var(--accent)" stop-opacity=".2"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/>
      </radialGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#gg${idx})"/>
      ${edges.map(line).join("")}
      <ellipse cx="${rc.x}" cy="${rc.y}" rx="104" ry="80" fill="none" stroke="var(--accent)" stroke-opacity=".45" stroke-width="0.8" stroke-dasharray="3 5"/>
      ${nodes.map(dot).join("")}
      <text x="${rc.x}" y="${rc.y - 90}" text-anchor="middle" font-family="Geist Mono, monospace" font-size="11" fill="var(--accent)" letter-spacing="1">FRAUD RING · 100% ILLICIT</text>
      <text x="24" y="314" font-family="Geist Mono, monospace" font-size="12" fill="var(--fg-3)" letter-spacing="1.5">${String(idx + 1).padStart(2, "0")} / ${esc(seedStr.toUpperCase())}</text>
    </svg>`;
  }

  function buildFilters() {
    const counts = {};
    S.projects.forEach((p) => p.tags.forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([t]) => t);
    const box = $("[data-filters]");
    if (S.projects.length < 3) { box.remove(); return; }
    box.innerHTML = ["All", ...top].map((t, i) => `<button role="tab" aria-selected="${i === 0}" data-filter="${esc(t)}">${esc(t)}</button>`).join("");
    box.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", box).forEach((x) => x.setAttribute("aria-selected", x === b));
      const f = b.dataset.filter;
      $$(".project").forEach((card) => {
        const show = f === "All" || card.dataset.tags.split("|").includes(f);
        card.classList.toggle("hide", !show);
      });
    });
  }

  /* ───────────── Interactions ───────────── */
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 1800);
  }

  function setTheme(next) {
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    $('meta[name="theme-color"]').content = next === "light" ? "#f7f5f1" : "#0a0a0a";
    window.dispatchEvent(new Event("themechange"));
  }
  const toggleTheme = () => setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");

  async function copyEmail() {
    try { await navigator.clipboard.writeText(S.email); toast("Email copied"); }
    catch (e) { toast(S.email); }
  }

  function interactions() {
    $("#theme-toggle").addEventListener("click", toggleTheme);
    $("#copy-email").addEventListener("click", copyEmail);

    // Nav background on scroll
    const nav = $("#nav");
    const onScroll = () => nav.classList.toggle("scrolled", scrollY > 24);
    onScroll(); addEventListener("scroll", onScroll, { passive: true });

    // Mobile menu
    const menuBtn = $("#menu-btn");
    const setMenu = (open) => {
      document.body.classList.toggle("menu-open", open);
      menuBtn.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
    $$("#nav-links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

    // Active section in nav
    const links = $$('#nav-links a[href^="#"]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${e.target.id}`));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("section[id]").forEach((s) => io.observe(s));

    // Reveal on scroll
    const rv = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    $$(".reveal").forEach((el, i) => {
      if (el.closest(".hero")) el.style.setProperty("--d", `${0.1 + i * 0.08}s`);
      rv.observe(el);
    });
    // the hero is above the fold: reveal it even if the observer is late (e.g. tab opened in background)
    setTimeout(() => $$(".hero .reveal").forEach((el) => el.classList.add("in")), 80);

    // Card spotlight follows cursor
    $$(".project").forEach((card) => card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }));

    // Local time
    const timeEl = $("[data-time]");
    const tf = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: S.timezone, timeZoneName: "short" });
    const tick = () => (timeEl.textContent = tf.format(new Date()));
    tick(); setInterval(tick, 15000);

    // Typing roles
    const roleEl = $("[data-role]");
    if (reduceMotion || S.roles.length < 2) roleEl.textContent = S.roles.join(" · ");
    else {
      let ri = 0, ci = 0, del = false;
      const step = () => {
        const word = S.roles[ri];
        ci += del ? -1 : 1;
        roleEl.textContent = word.slice(0, ci);
        let wait = del ? 35 : 70;
        if (!del && ci === word.length) { del = true; wait = 2200; }
        else if (del && ci === 0) { del = false; ri = (ri + 1) % S.roles.length; wait = 350; }
        setTimeout(step, wait);
      };
      setTimeout(step, 900);
    }

    // Contact form → opens mail client
    $("#contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target, note = $("#form-note");
      const msg = f.message.value.trim();
      if (!msg) { note.textContent = "write something first :)"; f.message.focus(); return; }
      const subject = `Hello from ${f.name.value.trim() || "your website"}`;
      const body = `${msg}\n\n${f.name.value.trim()}${f.email.value.trim() ? ` <${f.email.value.trim()}>` : ""}`;
      location.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      note.textContent = "opening your mail app…";
    });
  }

  /* ───────────── Command palette ───────────── */
  function palette() {
    const root = $("#palette"), input = $("#palette-input"), list = $("#palette-list");
    const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    const open = (url) => () => window.open(url, "_blank", "noopener");
    const cmds = [
      ...[["top", "Home"], ["about", "About"], ["timeline", S.timeline.label], ["projects", "Projects"], ["skills", "Skills"], ["writing", "Writing"], ["contact", "Contact"]]
        .filter(([id]) => document.getElementById(id))
        .map(([id, label]) => ({ group: "Navigate", label, hint: `#${id}`, run: go(id) })),
      { group: "Actions", label: "Toggle theme", hint: "T", run: toggleTheme },
      { group: "Actions", label: "Copy email", hint: S.email, run: copyEmail },
      ...(S.resume ? [{ group: "Actions", label: "Open resume", hint: "PDF", run: open(S.resume) }] : []),
      ...Object.entries(S.socials).filter(([, u]) => u).map(([k, u]) => ({ group: "Links", label: socialLabel[k] || k, hint: "↗", run: open(u) })),
      ...S.projects.map((p) => ({ group: "Projects", label: p.name, hint: p.repo ? "repo ↗" : "view", run: p.repo ? open(p.repo) : go("projects") }))
    ];
    let shown = [], sel = 0, lastFocus = null;

    const draw = () => {
      const q = input.value.trim().toLowerCase();
      shown = cmds.filter((c) => !q || `${c.label} ${c.group}`.toLowerCase().includes(q));
      sel = Math.min(sel, Math.max(shown.length - 1, 0));
      if (!shown.length) { list.innerHTML = `<li class="palette-empty">No results for “${esc(input.value)}”</li>`; return; }
      let html = "", g = "";
      shown.forEach((c, i) => {
        if (c.group !== g) { g = c.group; html += `<li class="palette-group" role="presentation">${esc(g)}</li>`; }
        html += `<li class="palette-item" role="option" data-i="${i}" aria-selected="${i === sel}"><span>${esc(c.label)}</span><span class="hint">${esc(c.hint)}</span></li>`;
      });
      list.innerHTML = html;
      $(`[data-i="${sel}"]`, list)?.scrollIntoView({ block: "nearest" });
    };
    const show = () => { lastFocus = document.activeElement; root.hidden = false; input.value = ""; sel = 0; draw(); input.focus(); };
    const hide = () => { root.hidden = true; lastFocus?.focus?.(); };
    const run = (i) => { const c = shown[i]; if (!c) return; hide(); c.run(); };

    $("#open-palette").addEventListener("click", show);
    root.addEventListener("click", (e) => { if (e.target.dataset.close !== undefined) hide(); });
    list.addEventListener("click", (e) => { const it = e.target.closest(".palette-item"); if (it) run(+it.dataset.i); });
    list.addEventListener("pointermove", (e) => {
      const it = e.target.closest(".palette-item");
      if (it && +it.dataset.i !== sel) { sel = +it.dataset.i; $$(".palette-item", list).forEach((x) => x.setAttribute("aria-selected", +x.dataset.i === sel)); }
    });
    input.addEventListener("input", () => { sel = 0; draw(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % Math.max(shown.length, 1); draw(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + shown.length) % Math.max(shown.length, 1); draw(); }
      else if (e.key === "Enter") { e.preventDefault(); run(sel); }
      else if (e.key === "Escape") hide();
      else if (e.key === "Tab") e.preventDefault();
    });
    addEventListener("keydown", (e) => {
      const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); root.hidden ? show() : hide(); }
      else if (!typing && root.hidden && e.key === "/") { e.preventDefault(); show(); }
      else if (!typing && root.hidden && e.key.toLowerCase() === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) toggleTheme();
    });
  }

  /* ───────────── Black hole ───────────── */
  function blackHole() {
    const c = $("#space"), ctx = c.getContext("2d");
    let W = 0, H = 0, dpr = 1, stars = [], parts = [], palette = {};
    let mx = 0, my = 0, tmx = 0, tmy = 0, last = 0, raf = 0, running = true;
    const TILT = -0.2, SQUASH = 0.17;

    const readTheme = () => {
      const light = document.documentElement.dataset.theme === "light";
      palette = light
        ? { light, blend: "source-over", hot: "rgb(190,130,55)", mid: "rgb(150,96,38)", cool: "rgb(185,145,95)", star: "rgba(60,40,20,", ring: "rgba(110,62,14,", glow: "rgba(190,130,60,", hole: "#0b0a09" }
        : { light, blend: "lighter", hot: "rgb(255,236,205)", mid: "rgb(240,190,120)", cool: "rgb(190,120,60)", star: "rgba(255,245,230,", ring: "rgba(255,232,190,", glow: "rgba(232,170,90,", hole: "#000" };
    };

    const build = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = c.clientWidth || innerWidth; H = c.clientHeight || innerHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const ns = Math.round((W * H) / 9000);
      stars = Array.from({ length: ns }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.1 + 0.2, p: Math.random() * 6.28, s: 0.4 + Math.random() * 1.4, d: 0.02 + Math.random() * 0.06 }));
      const N = W < 860 ? 1500 : 2800;
      parts = Array.from({ length: N }, () => {
        const r = 1.32 + Math.pow(Math.random(), 2.1) * 2.5;  // in units of hole radius
        const band = r < 1.8 ? "hot" : r < 2.6 ? "mid" : "cool";
        return { r, a: Math.random() * Math.PI * 2, w: 0.5 / Math.pow(r, 1.5), z: (Math.random() - 0.5) * 0.05 * r, s: Math.random() < 0.08 ? 1.6 : 0.6 + Math.random() * 0.8, b: 0.25 + Math.random() * 0.75, band };
      });
    };

    const layout = () => {
      const p = Math.min(scrollY / H, 1);
      const mobile = W < 860;
      let cx, cy, R, alpha;
      if (mobile) {
        R = Math.min(W * 0.25, H * 0.13);
        cx = W * 0.62; cy = H * 0.21 + p * H * 0.25;
        alpha = 0.95 - p * 0.55;
      } else {
        R = Math.min(W, H) * 0.18 * (1 + p * 0.25);
        cx = W * (0.71 - p * 0.21); cy = H * 0.5;
        alpha = 1 - p * 0.58;
      }
      return { cx: cx + mx * 14, cy: cy + my * 10, R, alpha, p };
    };

    const frame = (t) => {
      const dt = Math.min((t - last) / 1000 || 0, 0.05);
      last = t;
      mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;
      const { cx, cy, R, alpha, p } = layout();
      const P = palette;
      ctx.clearRect(0, 0, W, H);

      // stars
      ctx.globalCompositeOperation = "source-over";
      const starA = P.light ? 0.35 : 0.8;
      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin(s.p + t * 0.001 * s.s);
        const y = (((s.y - scrollY * s.d) % H) + H) % H;
        ctx.fillStyle = P.star + (starA * tw * (0.4 + s.r * 0.5)).toFixed(3) + ")";
        ctx.fillRect(s.x - mx * s.d * 60, y, s.r, s.r);
      }

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      ctx.rotate(TILT + mx * 0.02);

      // ambient glow
      const g = ctx.createRadialGradient(0, 0, R * 0.8, 0, 0, R * 4.2);
      g.addColorStop(0, P.glow + (P.light ? 0.16 : 0.13) + ")");
      g.addColorStop(0.4, P.glow + (P.light ? 0.05 : 0.04) + ")");
      g.addColorStop(1, P.glow + "0)");
      ctx.fillStyle = g;
      ctx.fillRect(-R * 4.5, -R * 4.5, R * 9, R * 9);

      // advance + split
      const back = [], front = [];
      for (const q of parts) {
        if (!reduceMotion) q.a += q.w * dt;
        (Math.sin(q.a) < 0 ? back : front).push(q);
      }
      ctx.globalCompositeOperation = P.blend;

      const drawDisk = (arr) => {
        for (const band of ["cool", "mid", "hot"]) {
          ctx.fillStyle = P[band];
          for (const q of arr) {
            if (q.band !== band) continue;
            const ca = Math.cos(q.a), sa = Math.sin(q.a);
            const doppler = 0.55 + 0.45 * ca;              // approaching side is brighter
            const fade = q.r > 3 ? Math.max(0, 1 - (q.r - 3) / 0.85) : 1;
            ctx.globalAlpha = alpha * q.b * doppler * fade * (P.light ? 0.75 : 0.9);
            ctx.fillRect(ca * q.r * R, sa * q.r * R * SQUASH + q.z * R, q.s, q.s);
          }
        }
      };
      // gravitationally lensed image of the disk: wraps over the top and under the hole
      const drawLensed = () => {
        ctx.fillStyle = P.hot;
        for (const q of parts) {
          if (q.r > 2.3) continue;
          const sa = Math.sin(q.a), ca = Math.cos(q.a);
          const rl = R * (1.05 + (q.r - 1.32) * 0.2);
          const under = sa > 0;
          ctx.globalAlpha = alpha * q.b * (under ? 0.22 : 0.5) * (0.6 + 0.4 * ca) * (P.light ? 0.8 : 1);
          ctx.fillRect(ca * rl, (under ? sa * 0.9 : sa) * rl, q.s * 0.8, q.s * 0.8);
        }
      };

      // smooth luminous bands underneath the particles
      const bands = (half) => {
        const [a0, a1] = half === "back" ? [Math.PI, Math.PI * 2] : [0, Math.PI];
        for (let k = 0; k < 16; k++) {
          const r = 1.34 + k * 0.12, a = (P.light ? 0.22 : 0.27) * Math.exp(-(r - 1.34) * 1.15);
          const lg = ctx.createLinearGradient(-r * R, 0, r * R, 0);
          lg.addColorStop(0, P.glow + (a * 0.3).toFixed(3) + ")");
          lg.addColorStop(0.5, P.glow + (a * 0.6).toFixed(3) + ")");
          lg.addColorStop(1, P.glow + a.toFixed(3) + ")");
          ctx.strokeStyle = lg;
          ctx.lineWidth = R * (k < 3 ? 0.03 : 0.05);
          ctx.beginPath(); ctx.ellipse(0, 0, r * R, r * R * SQUASH, 0, a0, a1); ctx.stroke();
        }
      };
      const lensBands = () => {
        for (let k = 0; k < 9; k++) {
          const r = 1.03 + k * 0.035, a = (P.light ? 0.28 : 0.3) * Math.exp(-k * 0.32);
          const lg = ctx.createLinearGradient(-r * R, 0, r * R, 0);
          lg.addColorStop(0, P.glow + (a * 0.4).toFixed(3) + ")");
          lg.addColorStop(1, P.glow + a.toFixed(3) + ")");
          ctx.strokeStyle = lg; ctx.lineWidth = R * 0.03;
          ctx.beginPath(); ctx.arc(0, 0, r * R, Math.PI * 1.02, Math.PI * 1.98); ctx.stroke();
          ctx.globalAlpha = alpha * 0.35;
          ctx.beginPath(); ctx.ellipse(0, 0, r * R, r * R * 0.92, 0, Math.PI * 0.05, Math.PI * 0.95); ctx.stroke();
          ctx.globalAlpha = alpha;
        }
      };

      ctx.globalAlpha = alpha;
      bands("back");
      drawDisk(back);
      ctx.globalAlpha = alpha;
      lensBands();
      drawLensed();

      // event horizon + photon ring
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = alpha;
      ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2);
      ctx.fillStyle = P.hole; ctx.fill();
      ctx.shadowBlur = R * 0.22; ctx.shadowColor = P.ring + "0.9)";
      ctx.lineWidth = Math.max(1.2, R * 0.012);
      ctx.strokeStyle = P.ring + "0.95)";
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.beginPath(); ctx.arc(0, 0, R * 1.03, 0, Math.PI * 2);
      ctx.lineWidth = 1; ctx.strokeStyle = P.ring + "0.18)"; ctx.stroke();

      ctx.globalCompositeOperation = P.blend;
      bands("front");
      drawDisk(front);
      ctx.restore();
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      if (running && !reduceMotion) raf = requestAnimationFrame(frame);
    };

    const redraw = () => { if (reduceMotion) requestAnimationFrame(frame); };
    readTheme(); build();
    raf = requestAnimationFrame(frame);

    let rt;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { build(); redraw(); }, 120); });
    addEventListener("themechange", () => { readTheme(); redraw(); });
    addEventListener("scroll", redraw, { passive: true });
    addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      tmx = e.clientX / W * 2 - 1; tmy = e.clientY / H * 2 - 1;
    }, { passive: true });
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running && !reduceMotion) { last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
    });
  }

  render();
  interactions();
  palette();
  blackHole();
})();
