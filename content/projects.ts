export type ProjectLink = {
  label: "Live" | "GitHub" | "API";
  href: string;
};

export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  kind: string;
  tagline: string;
  problem: string;
  built: string;
  outcome: string;
  stack: string[];
  links: ProjectLink[];
  highlights: { value: string; label: string }[];
  image?: {
    src: string;
    alt: string;
    urlLabel: string;
  };
  visual?: "fire" | "voice" | "prepkit";
  featured?: boolean;
};

export type MoreProject = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  stack: string[];
  links: ProjectLink[];
  wide?: boolean;
};

export const selectedWork: CaseStudy[] = [
  {
    slug: "job-fit-rag-agent",
    number: "01",
    title: "Job Fit RAG Agent",
    kind: "LLM agent · RAG · Live",
    tagline: "Resume-to-job fit, scored with citations it can't make up",
    problem:
      "Fit scores are often a model's free-form opinion — hard to audit, easy to invent evidence.",
    built:
      "Upload a resume and a job post. A LangGraph retrieval agent extracts requirements, retrieves evidence, and self-checks that every quote is an exact substring of a retrieved chunk. A pure function turns those judgments into a 0–100 score. When no LLM key is set, a deterministic scorer runs the same graph. React UI; FastAPI with MiniLM embeddings and Chroma or pgvector.",
    outcome:
      "Live on Render's free tier (the first request after idle can take 30–60 s). On a synthetic 20-pair labeled set, Groq matched the labeled verdict on 19/20 with 41/41 citation validity; a paced sample had a median of ~3.1 s. The README is explicit that the set is synthetic and this is not a hiring decision.",
    stack: ["Python", "FastAPI", "LangGraph", "Chroma", "fastembed", "Groq", "React", "Docker"],
    highlights: [
      { value: "19/20", label: "verdicts matched (synthetic set)" },
      { value: "41/41", label: "citations validated" },
      { value: "~3.1s", label: "median response" },
    ],
    links: [
      { label: "Live", href: "https://job-fit-rag-agent.onrender.com" },
      { label: "GitHub", href: "https://github.com/Anshul3977/job-fit-rag-agent" },
    ],
    image: {
      src: "/projects/job-fit.png",
      alt: "Job Fit RAG Agent fit report on the live site",
      urlLabel: "job-fit-rag-agent.onrender.com",
    },
    featured: true,
  },
  {
    slug: "fire-vision",
    number: "02",
    title: "Fire-Vision",
    kind: "Computer vision · YOLOv8",
    tagline: "Fire and smoke detection from video — with spread analysis and alerts",
    problem:
      "Forest-fire footage is hard to watch at scale. Responders need detection, spread direction and alerts — not only a bounding box.",
    built:
      "A Flask app that ingests video, detects fire and smoke with YOLOv8, tracks progression with optical flow, streams status over WebSockets, and plots burned area, spread path and smoke direction. On detection it sends one SMS and voice call per session through Twilio.",
    outcome:
      "The README reports YOLO-v8-obb at 92.5% precision, 89.2% recall and 94.5% mAP@50, compared against YOLO-v8 and YOLO-v5 on the same table. No public live demo.",
    stack: ["Flask", "Flask-SocketIO", "OpenCV", "YOLOv8", "NumPy", "Matplotlib", "Twilio"],
    highlights: [
      { value: "94.5%", label: "mAP@50 (YOLO-v8-obb)" },
      { value: "Live", label: "status over WebSockets" },
      { value: "1×", label: "SMS + call alert per session" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/Anshul3977/Fire-Vision" }],
    visual: "fire",
  },
  {
    slug: "workflow-builder",
    number: "03",
    title: "Workflow Builder",
    kind: "LLM app · Next.js · Live",
    tagline: "Chain LLM steps into pipelines, run them, and keep the receipts",
    problem:
      "One-off prompts don't compose. Real text work is a chain — summarize, extract, classify, translate — and you need to see what each step did.",
    built:
      "A deployed Next.js 16 app where you build multi-step text workflows from typed steps (summarization, extraction, categorization, translation, sentiment), run them against a Groq-hosted model, and inspect per-run results, history and backend health. Zustand stores, typed API layer, shadcn/ui.",
    outcome:
      "Live on Vercel with end-to-end interaction flows tested: build → run → result → history.",
    stack: ["Next.js 16", "TypeScript", "Groq", "Zustand", "shadcn/ui", "Tailwind"],
    highlights: [
      { value: "5", label: "step types to chain" },
      { value: "Live", label: "on Vercel" },
      { value: "Groq", label: "model backend" },
    ],
    links: [
      { label: "Live", href: "https://workflow-builder-umber.vercel.app" },
      { label: "GitHub", href: "https://github.com/Anshul3977/workflow-builder" },
    ],
    image: {
      src: "/projects/workflow-builder.png",
      alt: "Workflow Builder home page on the live site",
      urlLabel: "workflow-builder-umber.vercel.app",
    },
  },
  {
    slug: "prep-kit",
    number: "04",
    title: "Prep Kit",
    kind: "Full-stack · LLM · Live",
    tagline: "Interview kits grounded in a real JD and the company's own site",
    problem:
      "Interview prep is usually a pile of generic questions, not tied to a specific company, role and timeline.",
    built:
      "Paste a job description, a company URL and days until the interview. The pipeline crawls the company site (respecting robots.txt), searches public interview discussion, and builds a kit: company brief, role breakdown, question bank, flashcards and a day-by-day schedule. Edit any part and regenerate one section without losing edits. The model drafts text; TypeScript owns schedule math, coverage gaps, stable ids and which URLs may be cited.",
    outcome:
      "Web app live on Vercel; API on Render (first request after idle can take ~50 s). The browser only talks to the Next.js origin — Vercel rewrites /api/* to Express.",
    stack: ["Next.js 15", "Express", "MongoDB", "TypeScript", "Gemini", "Groq"],
    highlights: [
      { value: "5", label: "kit sections per role" },
      { value: "1", label: "section regenerated, edits kept" },
      { value: "robots.txt", label: "respected while crawling" },
    ],
    links: [
      { label: "Live", href: "https://prep-kit-rho.vercel.app" },
      { label: "GitHub", href: "https://github.com/Anshul3977/TraoAssignment" },
    ],
    visual: "prepkit",
  },
  {
    slug: "voice-rag-goa",
    number: "05",
    title: "Voice RAG Goa",
    kind: "Voice · RAG · Guardrails",
    tagline: "Voice in, grounded answers out — with a retrieval budget under 200 ms",
    problem:
      "Spoken questions over a document set need answers that stay faithful to source passages, and retrieval has to stay fast on CPU.",
    built:
      "Built for HH Goa 2026. Audio goes through ElevenLabs speech-to-text; three chunking strategies (fixed, semantic, metadata-aware) are searched in separate FAISS indexes and merged. Generation must cite chunk ids; guardrails reject off-topic or unsafe input and check that claims overlap the cited text. Embed + search + guardrails are budgeted under 200 ms on CPU, excluding STT and LLM network time.",
    outcome:
      "Ships latency (P50/P70/P100) and Recall@k benchmark scripts against MSMARCO gold passages. Published numbers aren't in the README yet, and there's no public live URL.",
    stack: ["Python", "ElevenLabs", "FAISS", "MiniLM", "Anthropic", "Uvicorn"],
    highlights: [
      { value: "3", label: "chunking strategies merged" },
      { value: "<200ms", label: "retrieval budget (CPU)" },
      { value: "Cited", label: "chunk ids required in answers" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/Anshul3977/voice-rag-goa" }],
    visual: "voice",
  },
  {
    slug: "suisports-legends",
    number: "06",
    title: "SuiSports Legends",
    kind: "Web3 · React · Live demo",
    tagline: "Fantasy cricket with player NFTs on Sui",
    problem:
      "Fantasy cricket usually lives in a web2 silo. This explores collecting player NFTs, building teams and joining leagues on the Sui blockchain.",
    built:
      "A React + TypeScript app with a collection, a five-player team builder, weekly leagues, a marketplace, staking, a leaderboard and a profile. Sui Wallet Kit handles wallet connection and testnet balances; the Express backend runs an in-memory mock database in demo mode.",
    outcome:
      "Frontend live on Vercel as a demo-mode deployment: real wallet tooling, mocked marketplace state — not a fully on-chain production market.",
    stack: ["React", "TypeScript", "Tailwind", "Framer Motion", "Express", "Sui"],
    highlights: [
      { value: "7", label: "app surfaces" },
      { value: "5", label: "players per team" },
      { value: "Testnet", label: "wallet + balances" },
    ],
    links: [
      { label: "Live", href: "https://sui-sports-legends.vercel.app" },
      { label: "GitHub", href: "https://github.com/Anshul3977/SuiSports-Legends" },
    ],
    image: {
      src: "/projects/suisports.png",
      alt: "SuiSports Legends live app",
      urlLabel: "sui-sports-legends.vercel.app",
    },
  },
];

export const moreWork: MoreProject[] = [
  {
    slug: "trackflow",
    title: "TrackFlow",
    tag: "SaaS · Live",
    summary:
      "Multi-tenant issue tracker: isolated workspaces, httpOnly JWT sessions and Owner / Admin / Member roles. Issues move Open → In Progress → Resolved → Closed.",
    stack: ["Next.js 14", "Express", "Prisma", "PostgreSQL", "JWT"],
    links: [
      { label: "Live", href: "https://mini-saa-s-multi-tenant-issue-track.vercel.app" },
      { label: "GitHub", href: "https://github.com/Anshul3977/Mini-SaaS-Multi-Tenant-Issue-Tracker" },
    ],
    wide: true,
  },
  {
    slug: "credit-approval-system",
    title: "Credit Approval System",
    tag: "Backend",
    summary:
      "Five REST endpoints for registration, eligibility and loans: credit score from history, EMI ≤ 50% of salary, interest-rate slabs. Excel ingestion runs as a Celery job. Fully dockerized.",
    stack: ["Django", "DRF", "PostgreSQL", "Celery", "Redis", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/Anshul3977/credit-approval-system" }],
  },
  {
    slug: "yolov8-detection-api",
    title: "YOLOv8 Detection API",
    tag: "In progress · CV",
    summary:
      "Containerized inference API for fire and smoke detection: a YOLOv8 model served behind REST endpoints. Currently being built.",
    stack: ["Python", "FastAPI", "PyTorch", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/Anshul3977/yolov8-detection-api" }],
  },
  {
    slug: "prooflens-ai",
    title: "ProofLens AI",
    tag: "Prototype · CV",
    summary:
      "Prototype for video-first warehouse return inspection: validates clips, scores frame quality, picks distinct keyframes, and checks against references with QR lookup and ORB/RANSAC alignment. Explicitly not a fraud detector or a production system.",
    stack: ["Python", "OpenCV", "NumPy", "ORB / RANSAC"],
    links: [{ label: "GitHub", href: "https://github.com/Anshul3977/ProofLens-AI" }],
  },
  {
    slug: "spendlens",
    title: "SpendLens",
    tag: "AI tool · Live",
    summary:
      "Free AI-spend audit for founders and engineering managers. The audit math is deterministic and inspectable; Gemini only writes the narrative.",
    stack: ["Next.js", "Gemini", "Supabase"],
    links: [
      { label: "Live", href: "https://credex-kappa-one.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Anshul3977/Credex" },
    ],
  },
  {
    slug: "webhook-event-monitor",
    title: "Webhook Event Monitor",
    tag: "Backend · Realtime",
    summary:
      "Receives GitHub push, pull-request and merge webhooks, dedupes and stores them in MongoDB, and shows them on a dashboard that refreshes every 15 seconds.",
    stack: ["Python", "Flask", "MongoDB", "Webhooks"],
    links: [{ label: "GitHub", href: "https://github.com/Anshul3977/webhook-repo" }],
  },
  {
    slug: "healthcare-backend-api",
    title: "Healthcare Backend API",
    tag: "Backend",
    summary:
      "Django REST API with JWT auth, patient and doctor CRUD, patient–doctor mapping, Swagger docs, automated tests and Docker.",
    stack: ["Django 5", "DRF", "PostgreSQL", "SimpleJWT", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/Anshul3977/healthcare-backend-api" }],
  },
  {
    slug: "nutrisync",
    title: "NutriSync",
    tag: "ML · Full-stack",
    summary:
      "AI meal planning: TF-IDF + nearest-neighbour recipe suggestions, health-goal tracking, weekly plans and grocery lists.",
    stack: ["React", "Flask", "scikit-learn"],
    links: [{ label: "GitHub", href: "https://github.com/Anshul3977/New-NutriSync" }],
  },
];
