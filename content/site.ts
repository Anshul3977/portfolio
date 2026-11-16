export const site = {
  // Canonical address: used for metadataBase, og:url, the OG image, sitemap and robots.
  url: "https://anshulpalarpwar.vercel.app",
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
  impact: { value: string; label: string };
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
    impact: { value: "76 → 6 min", label: "video processing time, about 12× faster" },
    points: [
      "Got there with GPU parallelism and overlapping pipeline stages, and checked the output stayed correct.",
      "Work on the FastAPI services that connect video ingestion, YOLO detection, ByteTrack tracking, async jobs and Milvus.",
      "Debug API and job-state issues, help with the Linux server migration, and write up how things work.",
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
    impact: { value: "500+", label: "AI responses and code outputs evaluated" },
    points: [
      "Graded answers for correctness, following instructions and reasoning.",
      "Spotted repeat failure patterns and rewrote evaluation prompts to catch them.",
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
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  {
    label: "Data & infra",
    items: ["PostgreSQL", "MongoDB", "Docker", "Linux", "AWS EC2 / S3 / RDS", "Git"],
  },
] as const;
