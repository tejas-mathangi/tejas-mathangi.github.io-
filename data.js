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
  status: "Open to internships",       // or "" to hide

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
    "I'm Tejas, a computer science undergraduate specialising in AI & machine learning at JNTUH, Hyderabad. I like problems where the structure of the data matters as much as the data itself.",
    "Lately that means graph neural networks: modelling transactions as networks to catch coordinated fraud that tabular models miss. I care about the whole system, not just the score: sound baselines, explainable predictions and a dashboard someone can actually use."
  ],
  stats: [
    { value: "9.3",  label: "CGPA / 10" },        // TODO: update to your current CGPA
    { value: "320+", label: "DSA problems" },     // TODO: update your count
    { value: "2028", label: "Graduating" }
  ],

  // Timeline (newest first). Rename the heading when you add internships.
  timeline: {
    label: "Education",
    title: "Where I'm learning",
    items: [
      {
        role: "B.Tech, Computer Science & Engineering (AI & ML)",
        org: "JNTU Hyderabad",
        orgUrl: "",
        period: "2024 — 2028",
        location: "Hyderabad",
        points: [
          "Coursework in data structures, operating systems, DBMS, compiler design and machine learning.",
          "Built FraudLens as part of the credited Real-Time Research Project course."
        ],
        tags: ["AI & ML", "CGPA 9.3"]             // TODO: keep CGPA current
      },
      {
        role: "Class XII, MPC",
        org: "Aakash Institute",
        orgUrl: "",
        period: "2022 — 2024",
        location: "Hyderabad",
        points: ["Mathematics, Physics and Chemistry. Scored 95%."],
        tags: []
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
    "Backend":     ["Django", "Django REST Framework", "FastAPI", "Spring Boot", "REST APIs"],
    "Tools & CS":  ["Git", "Linux", "Streamlit", "LaTeX", "DSA", "OOP", "DBMS", "Operating Systems"]
  },

  // Writing. Add posts here (Medium/Hashnode/dev.to links). Empty array hides the section.
  writing: [],

  // "Currently" block
  now: "Building Verdict, a sandboxed online judge, one phase at a time: running untrusted code safely, queueing submissions and getting verdicts right. Also solving DSA problems every week."
};
