/*
 * ─────────────────────────────────────────────────────────────
 *  Everything on the site comes from this file.
 *  Edit the values below. You don't need to touch the HTML/CSS/JS.
 *  Fields marked TODO are worth double-checking.
 * ─────────────────────────────────────────────────────────────
 */
window.SITE = {
  name: "Tejas Mathangi",
  initials: "TM",
  domain: "tejas-mathangi.github.io", // TODO: change if you use a custom domain

  // Hero
  intro: [
    "CS (AI & ML) undergrad at JNTUH, Hyderabad",
    "Graph neural networks · ML systems · Backends",
    "I build systems that actually work."
  ],
  roles: ["ML Engineer", "Backend Developer", "Problem Solver"], // rotates in the hero

  location: "Hyderabad, India",
  timezone: "Asia/Kolkata",           // used for the live local-time chip
  status: "",                          // e.g. "Open to internships"; "" hides the badge

  email: "mathangi.tejas@gmail.com",
  resume: "",                          // TODO: add resume.pdf next to index.html and set this to "resume.pdf"
  socials: {
    github: "https://github.com/tejas-mathangi",
    linkedin: "https://www.linkedin.com/in/tejas-mathangi",
    x: "",                             // optional
    leetcode: ""                       // optional: your LeetCode profile URL
  },

  // About
  about: [
    "I'm a third-year Computer Science (AI & ML) student at JNTU Hyderabad. I enjoy understanding how things work under the hood, and building systems that teach me something new.",
    "Alongside projects, I've solved 360+ DSA problems on LeetCode and other platforms, and I'm getting into regular LeetCode and Codeforces contests to sharpen my problem-solving. I mostly work with Python, Java and C++, along with FastAPI, Spring Boot, Django, Docker, PostgreSQL, Redis and PyTorch."
  ],
  stats: [
    { value: "9.4",  label: "CGPA / 10" },
    { value: "360+", label: "DSA problems" },
    { value: "2028", label: "Graduating" }
  ],

  // Timeline (newest first). Rename the heading when you add internships.
  timeline: {
    label: "Education",
    title: "Where I'm learning",
    items: [
      {
        role: "B.Tech, Computer Science & Engineering (AI & ML)",
        org: "JNTUH College of Engineering Hyderabad",
        orgUrl: "",
        period: "Sep 2024 — Sep 2028",
        location: "Hyderabad",
        points: [
          "Specialisation in Artificial Intelligence & Machine Learning. Coursework includes data structures & algorithms and database management systems.",
          "Built FraudLens as part of the credited Real-Time Research Project course.",
          "Activities: hackathons & competitions, technical communities, badminton and volleyball."
        ],
        tags: ["AI & ML", "CGPA 9.4", "Python", "C"]
      },
      {
        role: "Intermediate, Science (MPC)",
        org: "Aakash Institute",
        orgUrl: "",
        period: "Jun 2022 — Jun 2024",
        location: "Hyderabad",
        points: ["Specialised in Mathematics, Physics and Chemistry."],
        tags: ["Grade 96%"]
      }
    ]
  },

  // Projects. `image` is optional (path to a screenshot); `cover: "graph"` draws a network cover.
  projects: [
    {
      name: "FraudLens",
      status: "",
      blurb: "Graph neural network fraud detection on the Elliptic Bitcoin dataset. Modern fraud is coordinated, so a single transaction in a ring can look clean. FraudLens models the whole transaction network with GraphSAGE and flags fraud at three levels: individual transactions, organised fraud rings, and the features and neighbours that explain each prediction.",
      metrics: [
        { value: "0.9885", label: "AUC-ROC" },
        { value: "0.8833", label: "F1 (illicit)" },
        { value: "10", label: "Fraud rings" },
        { value: "203K", label: "Graph nodes" }
      ],
      highlights: [
        "3-layer GraphSAGE with a 5.12× class-weighted loss for the heavily imbalanced data",
        "Louvain community detection on the raw graph; top rings were 97–100% illicit",
        "Gradient-based explanations of the features and neighbours behind each flag",
        "Streamlit dashboard for inspecting scores, rings and explanations"
      ],
      tags: ["PyTorch Geometric", "GraphSAGE", "NetworkX", "scikit-learn", "Streamlit"],
      repo: "https://github.com/tejas-mathangi/fraudlens",
      live: "",
      image: "",
      cover: "graph"
    }
  ],

  // Skills
  skills: {
    "Languages":   ["Python", "Java", "C++", "C", "SQL", "JavaScript"],
    "ML / DL":     ["PyTorch", "PyTorch Geometric", "scikit-learn", "Pandas", "NumPy", "OpenCV"],
    "Backend":     ["FastAPI", "Spring Boot", "Django", "Django REST Framework", "PostgreSQL", "Redis"],
    "Tools & CS":  ["Git", "Docker", "Linux", "Streamlit", "DSA", "OOP", "DBMS", "Operating Systems"]
  },

  // Writing. Add posts here (Medium/Hashnode/dev.to links). Empty array hides the section.
  writing: [],

  // "Currently" block
  now: "Building an online judge from scratch: it runs untrusted code inside sandboxed Docker containers, queues submissions through Redis, and returns verdicts like LeetCode does. I'm documenting the process, including what breaks and what I learn fixing it."
};
