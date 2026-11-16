export const site = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://anshulpalarpwar.vercel.app",
  name: "Anshul Palarpwar",
  shortName: "Anshul",
  title: "Anshul Palarpwar — AI engineer & full-stack developer",
  description:
    "Anshul Palarpwar is an AI engineer and full-stack developer: production computer vision at AIMonk Labs (76 → 6 min video processing), LLM apps, and deployed Next.js + Python products.",
  role: "AI engineer & full-stack developer",
  oneLiner:
    "I build computer-vision pipelines, LLM apps and the backends behind them. Right now I'm making production video processing faster at AIMonk Labs.",
  email: "palarpwaranshul@gmail.com",
  location: "Nagpur, India",
  school: "Ramdeobaba University, Nagpur",
  schoolShort: "Ramdeobaba University",
  degree: "B.Tech CSE (Data Science)",
  gradYear: "2026",
  years: "2022 – 2026",
  cgpa: "8.3",
  resumes: {
    ai: "/anshul-palarpwar-resume-ai.pdf",
    fullstack: "/anshul-palarpwar-resume-fullstack.pdf",
  },
  links: {
    email: "mailto:palarpwaranshul@gmail.com",
    github: "https://github.com/Anshul3977",
    githubHandle: "Anshul3977",
    linkedin: "https://www.linkedin.com/in/anshul-palarpwar-1a7315264/",
    x: "https://x.com/Anshul23182222",
    xHandle: "@Anshul23182222",
    codeforces: "https://codeforces.com/profile/Anshul3977",
    codeforcesHandle: "Anshul3977",
  },
} as const;

export const metrics = [
  {
    id: "speedup",
    value: 12,
    prefix: "~",
    suffix: "×",
    label: "faster video processing",
    detail: "76 → 6 min at AIMonk Labs",
  },
  {
    id: "dsa",
    value: 600,
    suffix: "+",
    label: "DSA problems solved",
    detail: "C++ · Codeforces",
  },
  {
    id: "llm",
    value: 500,
    suffix: "+",
    label: "LLM outputs evaluated",
    detail: "Alignerr, 2023 – 2025",
  },
  {
    id: "cgpa",
    value: 8.3,
    decimals: 1,
    label: "CGPA",
    detail: "B.Tech CSE (Data Science)",
  },
] as const;

export type Role = {
  company: string;
  title: string;
  where: string;
  period: string;
  current?: boolean;
  summary: string;
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "AIMonk Labs",
    title: "ML Engineering Intern",
    where: "Remote",
    period: "Jun 2026 — Present",
    current: true,
    summary:
      "I work on a production worker-monitoring platform: video comes in, people are detected and tracked, and events go out to the app.",
    points: [
      "Cut end-to-end video processing from ~76 to ~6 minutes (~12×) with GPU parallelism and overlapping pipeline stages — with output correctness checked, not assumed.",
      "Work on the Python/FastAPI services that connect video ingestion, YOLO detection, ByteTrack tracking, async jobs and Milvus-backed downstream workflows.",
      "Debug API and job-state issues, support the Linux server migration and production readiness, and document technical flows and validation findings.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "YOLO",
      "ByteTrack",
      "OpenCV",
      "CUDA / GPU",
      "Milvus",
      "Linux",
    ],
  },
  {
    company: "Alignerr",
    title: "LLM Evaluator & Prompt Engineer",
    where: "Remote",
    period: "Oct 2023 — Jan 2025",
    summary:
      "I checked AI answers and AI-written code for correctness, and wrote up what went wrong.",
    points: [
      "Evaluated 500+ AI-generated responses and code outputs for correctness, instruction adherence and reasoning quality.",
      "Identified recurring failure patterns, documented actionable feedback and improved evaluation prompts.",
    ],
    stack: ["LLM evaluation", "Prompt engineering", "Code review"],
  },
];

export const skillGroups = [
  { label: "Languages", items: ["Python", "C++", "TypeScript", "JavaScript", "SQL"] },
  {
    label: "AI / ML",
    items: ["PyTorch", "YOLO", "OpenCV", "ByteTrack", "LLM APIs", "Embeddings", "Milvus", "LangGraph", "FAISS"],
  },
  {
    label: "Backend",
    items: ["FastAPI", "Django", "Flask", "Node.js", "Express", "Celery", "REST & webhooks"],
  },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind", "Motion"] },
  {
    label: "Data & infra",
    items: ["PostgreSQL", "MongoDB", "Docker", "Linux", "AWS EC2 / S3 / RDS", "Git"],
  },
] as const;
