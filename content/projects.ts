export type ProjectLink = {
  label: "Live" | "GitHub" | "API";
  href: string;
};

export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  problem: string;
  built: string;
  outcome: string;
  stack: string[];
  links: ProjectLink[];
  image?: {
    src: string;
    alt: string;
    urlLabel: string;
  };
  featured?: boolean;
};

export type MoreProject = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  links: ProjectLink[];
};

export const selectedWork: CaseStudy[] = [
  {
    slug: "job-fit-rag-agent",
    number: "01",
    title: "Job Fit RAG Agent",
    tagline: "Resume-to-job fit, scored with citations",
    problem:
      "Fit scores are often a model's free-form opinion — hard to audit, easy to invent evidence.",
    built:
      "Upload a resume and a job post. A LangGraph retrieval agent extracts requirements, retrieves evidence, and self-checks that every quote is an exact substring of a retrieved chunk. A pure function turns those judgments into a 0–100 score. When no LLM key is set, a deterministic scorer runs the same graph. The UI is React; the API is FastAPI with MiniLM embeddings and Chroma or pgvector.",
    outcome:
      "Live on Render's free tier (the first request after idle can take about 30–60 seconds). On a synthetic 20-pair labeled set run on 15 Nov 2026, Groq matched the labeled verdict on 19/20, with 41/41 citation validity. A paced sample had a median of about 3.1 seconds. The README is explicit: the set is synthetic and is not a hiring decision.",
    stack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "Chroma",
      "fastembed",
      "Groq",
      "React",
      "Vite",
      "Docker",
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
    slug: "prep-kit",
    number: "02",
    title: "Prep Kit",
    tagline: "Interview kits grounded in a real JD and company site",
    problem:
      "Interview prep is usually a pile of generic questions, not tied to a specific company, role, and timeline.",
    built:
      "Paste a job description, a company URL, and days until the interview. The pipeline crawls the company site (respecting robots.txt), searches public interview discussion, and builds a kit: company brief, role breakdown, question bank, flashcards, and a day-by-day schedule. You can edit any part and regenerate one section without losing edits. The model drafts text; TypeScript owns schedule math, coverage gaps, stable ids, and which URLs may be cited.",
    outcome:
      "The web app is live on Vercel. The API sits on Render; free instances sleep after idle, so the first request can take around 50 seconds. The browser talks only to the Next.js origin; Vercel rewrites /api/* to Express.",
    stack: [
      "Next.js 15",
      "Tailwind",
      "Express",
      "MongoDB",
      "TypeScript",
      "Gemini",
      "Groq",
    ],
    links: [
      { label: "Live", href: "https://prep-kit-rho.vercel.app" },
      { label: "API", href: "https://prep-kit-fjgi.onrender.com/health" },
      { label: "GitHub", href: "https://github.com/Anshul3977/TraoAssignment" },
    ],
  },
  {
    slug: "fire-vision",
    number: "03",
    title: "Fire-Vision",
    tagline: "Fire and smoke detection from video, with spread analysis",
    problem:
      "Forest-fire footage is hard to watch at scale. Responders need detection, spread direction, and alerts — not only a bounding box.",
    built:
      "A Flask app that ingests a video, detects fire and smoke with YOLOv8, tracks progression with optical flow, streams status over WebSockets, and plots burned area, spread path, and smoke direction. When fire or smoke is detected it can send an SMS and a voice call through Twilio, once per session.",
    outcome:
      "The README reports YOLO-v8-obb PT v0 at 92.5% precision, 89.2% recall, and 94.5% mAP@50, compared with YOLO-v8 PT and YOLO-v5-NU on the same table. No public live demo is listed in the repository.",
    stack: [
      "Flask",
      "Flask-SocketIO",
      "OpenCV",
      "YOLOv8",
      "NumPy",
      "Matplotlib",
      "Twilio",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Anshul3977/Fire-Vision" },
    ],
  },
  {
    slug: "voice-rag-goa",
    number: "04",
    title: "Voice RAG Goa",
    tagline: "Voice in, grounded answers out, with retrieval guardrails",
    problem:
      "Spoken questions over a document set need answers that stay faithful to source passages, and retrieval has to stay fast on CPU.",
    built:
      "Built for HH Goa 2026, Task 2. Audio goes through ElevenLabs speech-to-text, then three chunking strategies (fixed, semantic, metadata-aware) are searched in separate FAISS indexes and merged. Generation is forced to cite chunk ids; guardrails reject off-topic or unsafe input and check that claims overlap the cited text. Retrieval-side work (embed, search, guardrails) is budgeted under 200ms, excluding STT and LLM network time. The corpus is a subset of ai4bharat/MSMARCO-XI.",
    outcome:
      "The repo ships latency (P50/P70/P100) and Recall@k benchmark scripts against MSMARCO gold passages. Published numeric results are not in the README, and no public live URL is listed.",
    stack: [
      "Python",
      "Uvicorn",
      "ElevenLabs",
      "FAISS",
      "MiniLM",
      "Anthropic",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Anshul3977/voice-rag-goa" },
    ],
  },
  {
    slug: "suisports-legends",
    number: "05",
    title: "SuiSports Legends",
    tagline: "Fantasy cricket with player NFTs on Sui",
    problem:
      "Fantasy cricket usually lives in a web2 silo. This project explores collecting player NFTs, building teams, and joining leagues on the Sui blockchain.",
    built:
      "A React and TypeScript app with a collection, a five-player team builder, weekly leagues, a marketplace, staking, a leaderboard, and a profile. The Express backend uses an in-memory mock database in demo mode. Sui Wallet Kit handles wallet connection and testnet balance fetches; the README notes that many chain interactions are still mocked, with hooks for a future marketplace contract.",
    outcome:
      "The frontend is live on Vercel. The README describes this as a demo-mode deployment with real wallet tooling and mocked marketplace state, not a fully on-chain production market.",
    stack: [
      "React",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "Vite",
      "Express",
      "Sui",
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
    summary:
      "Multi-tenant issue tracker with isolated workspaces, JWT httpOnly sessions, and role-based access (Owner, Admin, Member). Issues move through Open → In Progress → Resolved → Closed.",
    stack: ["Next.js 14", "Express", "Prisma", "PostgreSQL", "JWT"],
    links: [
      {
        label: "Live",
        href: "https://mini-saa-s-multi-tenant-issue-track.vercel.app",
      },
      {
        label: "GitHub",
        href: "https://github.com/Anshul3977/Mini-SaaS-Multi-Tenant-Issue-Tracker",
      },
    ],
  },
  {
    slug: "spendlens",
    title: "SpendLens",
    summary:
      "A free AI-spend audit for founders and engineering managers. Audit math is deterministic and inspectable; Gemini writes the summary narrative. Built as a lead-generation tool for Credex.",
    stack: ["Next.js", "Gemini", "Supabase"],
    links: [
      { label: "Live", href: "https://credex-kappa-one.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Anshul3977/Credex" },
    ],
  },
  {
    slug: "healthcare-backend-api",
    title: "Healthcare Backend API",
    summary:
      "Django REST API for healthcare management: JWT auth, patient and doctor CRUD, patient–doctor mapping, Swagger/OpenAPI docs, automated tests, and Docker.",
    stack: ["Django 5", "DRF", "PostgreSQL", "SimpleJWT", "Docker"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Anshul3977/healthcare-backend-api",
      },
    ],
  },
  {
    slug: "nutrisync",
    title: "NutriSync",
    summary:
      "AI-powered meal planning: personalized recipe suggestions with TF-IDF and nearest neighbors, health-goal tracking, weekly plans, and grocery lists. Featured on the GitHub profile README.",
    stack: ["React", "Flask", "scikit-learn", "Python"],
    links: [
      { label: "GitHub", href: "https://github.com/Anshul3977/New-NutriSync" },
    ],
  },
];
