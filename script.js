/* =====================================================
   PORTFOLIO — script.js
   Author: Tejas Mathangi
   
   FEATURES IN THIS FILE:
   1. Sticky nav — adds .scrolled class on scroll
   2. Mobile hamburger — toggles .open on nav links
   3. Smooth scroll — for all a[href^="#"] anchors
   4. Scroll animations — IntersectionObserver fade-in
   5. Active nav link — highlights current section
===================================================== */


/* ──────────────────────────────────────────────────
   1. STICKY NAV — adds .scrolled class when user
      scrolls past 20px. CSS then reveals the border.
      
   How it works:
   - We listen for the 'scroll' event on the window
   - window.scrollY tells us how far the page has scrolled
   - classList.add / .remove toggles the CSS class
────────────────────────────────────────────────── */
const nav = document.getElementById('nav')

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled')    // CSS border appears
  } else {
    nav.classList.remove('scrolled') // CSS border disappears
  }
})


/* ──────────────────────────────────────────────────
   2. MOBILE HAMBURGER MENU
   
   How it works:
   - The <button> has id="hamburger"
   - The <ul> has id="nav-links"
   - Clicking the button toggles .open on the <ul>
   - CSS shows the dropdown when .open is present
   - We also close the menu when any link is clicked
     (good UX — stops the menu staying open after nav)
────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger')
const navLinks  = document.getElementById('nav-links')

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open')
  
  // Update aria-expanded so screen readers know the state
  hamburger.setAttribute('aria-expanded', isOpen)
})

// Close menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open')
    hamburger.setAttribute('aria-expanded', 'false')
  })
})


/* ──────────────────────────────────────────────────
   3. SMOOTH SCROLL for anchor links
   
   How it works:
   - We select all <a> tags where href starts with "#"
     (that's what the CSS selector a[href^="#"] means)
   - On click, we prevent the default jump behaviour
   - We smoothly scroll to the target section instead
   
   Note: html { scroll-behavior: smooth } in CSS also
   does this, but JS gives us more control and works
   better cross-browser.
────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href')  // e.g. "#projects"
    const target   = document.querySelector(targetId)
    
    if (target) {
      e.preventDefault() // stop the default instant-jump
      target.scrollIntoView({ behavior: 'smooth' })
    }
  })
})


/* ──────────────────────────────────────────────────
   4. SCROLL ANIMATIONS (IntersectionObserver)
   
   How it works:
   - We create an IntersectionObserver — a browser API
     that watches elements and fires a callback whenever
     they enter or leave the viewport (visible screen area)
   - Elements with class="fade-in" start invisible (CSS)
   - When they enter the viewport, we add class="visible"
   - CSS then animates them in with opacity + translateY
   - We unobserve after animating so it only plays once
   
   NEW CONCEPT — IntersectionObserver:
   It's a performant alternative to listening for scroll
   events and calculating element positions manually.
   threshold: 0.1 means "trigger when 10% is visible".
   rootMargin offsets the trigger zone.
────────────────────────────────────────────────── */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {         // element is in view
        entry.target.classList.add('visible')
        fadeObserver.unobserve(entry.target) // stop watching it
      }
    })
  },
  {
    threshold:  0.1,              // trigger when 10% visible
    rootMargin: '0px 0px -40px 0px' // start 40px before edge
  }
)

// Watch every element with class="fade-in"
document.querySelectorAll('.fade-in').forEach(el => {
  fadeObserver.observe(el)
})


/* ──────────────────────────────────────────────────
   5. ACTIVE NAV LINK — highlights current section
   
   How it works:
   - We watch the scroll position on every scroll event
   - We loop through all <section> elements that have an id
   - When the user scrolls past a section's top, we
     store that section id as the "current" one
   - We then find the matching nav link and add .active
   
   The -100 offset accounts for the sticky nav height
   so the link activates slightly before the section top.
────────────────────────────────────────────────── */
const sections   = document.querySelectorAll('section[id]')
const navAnchors = document.querySelectorAll('.nav__link')

window.addEventListener('scroll', () => {
  let currentId = ''

  sections.forEach(section => {
    // Section top position, offset by nav height
    const sectionTop = section.offsetTop - 100
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute('id') // e.g. "projects"
    }
  })

  // Update nav link classes
  navAnchors.forEach(link => {
    link.classList.remove('active')
    // link.href ends in "#projects", we match against currentId
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active')
    }
  })
})
