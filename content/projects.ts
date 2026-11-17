export type ProjectLink = {
  label: "Live" | "GitHub" | "API";
  href: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** Short plain label, e.g. "Computer vision" */
  kind: string;
  /** One or two sentences: what it is, in plain words */
  summary: string;
  /** Three bullets at most */
  bullets: string[];
  highlights: { value: string; label: string }[];
  cardHighlights?: { value: string; label: string }[];
  featured?: boolean;
  stack: string[];
  links: ProjectLink[];
  /** Muted status line shown next to the buttons */
  note?: string;
  /** Longer write-up, shown collapsed under "Read more" */
  details?: { problem: string; built: string; outcome: string };
  image?: {
    src: string;
    alt: string;
    /** "plain" for captures that already carry their own chrome (e.g. a terminal) */
    frame?: "browser" | "plain";
    /** Narrow re-render of the same capture, readable at phone widths */
    mobileSrc?: string;
    caption?: string;
  };
  video?: { src: string; poster: string; alt: string; caption: string };
  visual?: "prepkit";
};

export type MoreProject = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  stack: string[];
  links: ProjectLink[];
  note?: string;
};

export const selectedWork: CaseStudy[] = [
  {
    slug: "issue-tracker-api",
    title: "Issue Tracker API",
    kind: "Backend",
    featured: true,
    summary:
      "An async FastAPI issue tracker for workspaces, projects, issues and comments, with API-key auth, cached reads and live events.",
    bullets: [
      "API keys stored as SHA-256 hashes and sent through the X-API-Key header; keyset pagination.",
      "Redis cache on hot reads with write invalidation; WebSocket events fan out across workers over Redis pub/sub.",
      "pytest suite and CI on main: ruff, mypy, Alembic, pytest against Postgres and Redis, and a Docker build.",
    ],
    highlights: [],
    cardHighlights: [
      { value: "87.5 → 285.4 req/s", label: "throughput · k6 load test (local, 500k issues) · after adding one composite index" },
      { value: "156.9 → 59.0 ms", label: "p95 latency · k6 load test (local, 500k issues) · after adding one composite index" },
    ],
    stack: ["Python 3.12", "FastAPI", "SQLAlchemy 2 asyncio", "asyncpg", "Alembic", "PostgreSQL 16", "Redis 7"],
    links: [
      { label: "API", href: "https://issue-tracker-api-29pv.onrender.com/docs" },
      { label: "GitHub", href: "https://github.com/Anshul3977/issue-tracker-api" },
    ],
    note: "Render free tier: API docs may cold-start.",
    details: {
      problem: "Track workspaces, projects, issues and comments through an async API.",
      built: "FastAPI with SQLAlchemy 2 asyncio and asyncpg, Alembic migrations, PostgreSQL 16 and Redis 7. API-key auth, keyset pagination, cached hot reads with write invalidation, and WebSocket live events with cross-worker Redis pub/sub fanout.",
      outcome: "A pytest test suite and CI on main cover ruff, mypy, Alembic, pytest against Postgres and Redis, and a Docker build.",
    },
  },
  {
    slug: "job-fit-rag-agent",
    title: "Job Fit RAG Agent",
    kind: "LLM agent",
    summary:
      "Upload a resume and a job post and get a 0–100 fit score. Every claim in the report quotes the resume word for word, so you can check it.",
    bullets: [
      "LangGraph agent pulls the job's requirements and finds evidence in the resume.",
      "Each quote is checked as an exact substring of a retrieved chunk before it's shown.",
      "Runs without an API key too, using a deterministic scorer on the same graph.",
    ],
    highlights: [
      { value: "19/20", label: "verdicts matched on a 20-pair test set" },
      { value: "41/41", label: "citations valid" },
      { value: "~3.1 s", label: "median response" },
    ],
    stack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "Chroma",
      "Groq",
      "React",
      "Docker",
    ],
    links: [
      { label: "Live", href: "https://job-fit-rag-agent.onrender.com" },
      {
        label: "GitHub",
        href: "https://github.com/Anshul3977/job-fit-rag-agent",
      },
    ],
    note: "Free Render tier: the first load can take 30–60 s",
    details: {
      problem:
        "Fit scores are often a model's free-form opinion. They're hard to audit and it's easy for the model to invent evidence.",
      built:
        "A React UI on a FastAPI backend with MiniLM embeddings and Chroma or pgvector. The agent extracts requirements, retrieves evidence and self-checks every quote; a plain function turns those judgments into the score.",
      outcome:
        "On a synthetic 20-pair labeled set, Groq matched the label on 19 of 20 with 41/41 valid citations. The set is synthetic, and the README says this is not a hiring tool.",
    },
    image: {
      src: "/projects/job-fit.png",
      alt: "Job Fit RAG Agent fit report on the live site",
    },
  },
  {
    slug: "fire-vision",
    title: "Fire-Vision",
    kind: "Computer vision",
    summary:
      "Detects fire and smoke in video, shows which way it's spreading, and sends one SMS and call alert when it finds a fire.",
    bullets: [
      "YOLOv8 detection plus optical flow to track spread and smoke direction.",
      "Live status streamed to the browser over WebSockets.",
      "Twilio sends one SMS and voice call per session.",
    ],
    highlights: [
      { value: "94.5%", label: "mAP@50 with YOLOv8-obb" },
      { value: "92.5%", label: "precision" },
      { value: "89.2%", label: "recall" },
    ],
    stack: ["Python", "Flask", "OpenCV", "YOLOv8", "Socket.IO", "Twilio"],
    links: [
      { label: "GitHub", href: "https://github.com/Anshul3977/Fire-Vision" },
    ],
    details: {
      problem:
        "Forest-fire footage is hard to watch at scale. Responders need detection, spread direction and alerts, not only a box.",
      built:
        "A Flask app that ingests video, detects fire and smoke, tracks progression with optical flow, and plots burned area, spread path and smoke direction.",
      outcome:
        "Scores are from the README's comparison of YOLOv8-obb against YOLOv8 and YOLOv5. There's no public live demo.",
    },
    video: {
      src: "/projects/fire-vision.mp4",
      poster: "/projects/fire-vision-poster.jpg",
      alt: "Fire-Vision processing a forest-fire clip: input, YOLOv8 boxes, fire mask, and spread with smoke flow",
      caption: "My code running on the repo's sample clip, on a CPU.",
    },
  },
  {
    slug: "workflow-builder",
    title: "Workflow Builder",
    kind: "LLM app",
    summary:
      "Chain LLM steps like summarize, extract and translate into one pipeline, run it, and see what each step did. Templates run without an account.",
    bullets: [
      "Next.js app and API on Vercel, Postgres and login on Neon.",
      "Demo mode: anyone can run a template, rate-limited to protect the API quota.",
      "Every run keeps each step's input, output, time and tokens.",
    ],
    highlights: [
      { value: "6", label: "step types" },
      { value: "5", label: "ready-made templates" },
      { value: "5/hr", label: "free demo runs per visitor" },
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Neon Postgres",
      "Neon Auth",
      "Groq",
      "Zustand",
    ],
    links: [
      { label: "Live", href: "https://workflow-builder-umber.vercel.app" },
      {
        label: "GitHub",
        href: "https://github.com/Anshul3977/workflow-builder",
      },
    ],
    note: "Templates run without an account",
    details: {
      problem:
        "One-off prompts don't compose. Real text work is a chain, and you need to see what each step did.",
      built:
        "Steps run in order and each output feeds the next. Signed-in users build and save their own workflows; guests can only run seeded templates, and the server takes those steps from the database, not the browser.",
      outcome:
        "It first ran on Supabase and an Express API on Render. When that database went away, I moved data and login to Neon and the API into Next.js route handlers.",
    },
    image: {
      src: "/projects/workflow-builder.jpg",
      alt: "Workflow Builder home page with its template gallery",
    },
  },
  {
    slug: "prep-kit",
    title: "Prep Kit",
    kind: "Full-stack LLM app",
    summary:
      "Paste a job description and a company URL and get an interview kit: company brief, questions, flashcards and a day-by-day plan. The public demo runs without an account.",
    bullets: [
      "Crawls the company's site (respecting robots.txt) and streams each pipeline step and LLM call live.",
      "Every kit is re-checked in code: must-have coverage, JD grounding, valid citations, schedule fit.",
      "The model writes the text; TypeScript owns the schedule, ids and allowed citations.",
    ],
    highlights: [{ value: "CI", label: "Unit + Playwright E2E tests" }],
    stack: [
      "Next.js 15",
      "Express",
      "MongoDB",
      "TypeScript",
      "Groq",
      "Playwright",
    ],
    links: [
      { label: "Live", href: "https://prep-kit-rho.vercel.app/demo" },
      { label: "GitHub", href: "https://github.com/Anshul3977/TraoAssignment" },
    ],
    note: "Demo runs without an account, 3 kits per hour",
    image: {
      src: "/projects/prep-kit.jpg",
      alt: "Prep Kit demo: a live kit for a GitLab backend role with its interview preparation plan",
    },
  },
];

export const moreWork: MoreProject[] = [
  {
    slug: "voice-rag-goa",
    title: "Voice RAG Goa",
    tag: "Voice · RAG",
    summary:
      "Ask a question out loud and get an answer that cites its sources. FAISS retrieval on CPU, with guardrails.",
    stack: ["Python", "FAISS", "MiniLM", "ElevenLabs", "Anthropic"],
    links: [
      { label: "GitHub", href: "https://github.com/Anshul3977/voice-rag-goa" },
    ],
  },
  {
    slug: "suisports-legends",
    title: "SuiSports Legends",
    tag: "Web3",
    summary:
      "Fantasy cricket where players are NFTs on Sui: collect them, build a five-player team and join weekly leagues.",
    stack: ["React", "TypeScript", "Tailwind", "Express", "Sui"],
    links: [
      { label: "Live", href: "https://sui-sports-legends.vercel.app" },
      {
        label: "GitHub",
        href: "https://github.com/Anshul3977/SuiSports-Legends",
      },
    ],
  },
  {
    slug: "trackflow",
    title: "TrackFlow",
    tag: "SaaS",
    summary:
      "Issue tracker where each team gets its own workspace, with Owner, Admin and Member roles and cookie-based JWT login.",
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
    slug: "credit-approval-system",
    title: "Credit Approval System",
    tag: "Backend",
    summary:
      "Loan eligibility API: credit score from past loans, EMI capped at half the salary, rate slabs. Excel imports run as Celery jobs.",
    stack: ["Django", "DRF", "PostgreSQL", "Celery", "Redis", "Docker"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Anshul3977/credit-approval-system",
      },
    ],
  },
  {
    slug: "prooflens-ai",
    title: "ProofLens AI",
    tag: "Prototype",
    summary:
      "Checks warehouse return videos: picks sharp, distinct frames and compares them to reference photos with ORB/RANSAC. A prototype, not a fraud detector.",
    stack: ["Python", "OpenCV", "NumPy", "ORB / RANSAC"],
    links: [
      { label: "GitHub", href: "https://github.com/Anshul3977/ProofLens-AI" },
    ],
  },
  {
    slug: "spendlens",
    title: "SpendLens",
    tag: "AI tool",
    summary:
      "Audits a team's AI tool spending. The math is plain code you can inspect; Gemini only writes the summary.",
    stack: ["Next.js", "Gemini", "Supabase"],
    links: [
      { label: "Live", href: "https://credex-kappa-one.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Anshul3977/Credex" },
    ],
  },
  {
    slug: "webhook-event-monitor",
    title: "Webhook Event Monitor",
    tag: "Backend",
    summary:
      "Stores GitHub push, PR and merge webhooks in MongoDB and shows them on a dashboard that refreshes every 15 s.",
    stack: ["Python", "Flask", "MongoDB", "Webhooks"],
    links: [
      { label: "GitHub", href: "https://github.com/Anshul3977/webhook-repo" },
    ],
  },
  {
    slug: "healthcare-backend-api",
    title: "Healthcare Backend API",
    tag: "Backend",
    summary:
      "Django REST API for patients and doctors with JWT login, Swagger docs, tests and Docker.",
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
    tag: "ML · Full-stack",
    summary:
      "Meal planner that suggests recipes with TF-IDF and nearest neighbours, then builds weekly plans and grocery lists.",
    stack: ["React", "Flask", "scikit-learn"],
    links: [
      { label: "GitHub", href: "https://github.com/Anshul3977/New-NutriSync" },
    ],
  },
];

/** Completed API project, included in the lab index. */
export const inProgress: MoreProject = {
  slug: "yolov8-detection-api",
  title: "YOLOv8 Detection API",
  tag: "Backend",
  summary: "A Dockerized REST API that serves a YOLOv8 fire and smoke model.",
  stack: ["Python", "FastAPI", "PyTorch", "Docker"],
  links: [
    {
      label: "GitHub",
      href: "https://github.com/Anshul3977/yolov8-detection-api",
    },
  ],
};

// Backend work is featured alongside the AI projects.
const credit = moreWork.find((p) => p.slug === "credit-approval-system")!;
const prep = selectedWork.pop()!;
selectedWork.push({
  ...credit,
  kind: credit.tag,
  bullets: [],
  highlights: [{ value: "5", label: "REST endpoints" }],
  details: {
    problem: "Loan eligibility needs consistent rules and reliable imports.",
    built: credit.summary,
    outcome:
      "Registration, eligibility and loan workflows exposed through a Dockerized API.",
  },
});
moreWork.splice(moreWork.indexOf(credit), 1);
moreWork.unshift({ ...prep, tag: prep.kind });
moreWork.push(inProgress);
