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
  /** Project / product line shown under the title */
  project?: string;
  summary: string;
  impact: { value: string; label: string };
  /** Small metric chips under the headline number */
  metrics?: { value: string; label: string }[];
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "AIMonk Labs",
    title: "ML Engineering Intern",
    where: "Remote",
    period: "Jul 2026 — Present",
    current: true,
    project: "Worker Activity Monitoring",
    summary:
      "I own the ML side of a computer-vision product that turns factory CCTV into per-worker active, idle and absent time, with alerts and photo evidence.",
    impact: { value: "76.5 → 6.2 min", label: "end-to-end pipeline on a 10-minute video, ~12× faster" },
    metrics: [
      { value: "~12×", label: "faster pipeline" },
      { value: "25 fps", label: "real-time live analysis" },
      { value: "0.843 → 0.921", label: "activity accuracy" },
      { value: "≈1%", label: "face false-accept rate" },
    ],
    points: [
      "Cut the end-to-end pipeline from ~76.5 to ~6.2 min (~12×): profiled pose as 91% of runtime, parallelised it across GPUs, and swapped MediaPipe for RTMPose-small, which also raised accuracy from 0.843 to 0.921 on 140 blind-labelled clips.",
      "Calibrated face recognition to one threshold at ≈1% false-accept rate and fixed a masked-face gallery gap, with 0 identity flips across 25 tracks.",
      "Built the production FastAPI ML service for uploads, streamed uploads and live RTSP cameras with HLS preview, and got live analysis to real time at 25 fps (72 → ~39 ms/frame) with TensorRT, FP16 and a two-GPU split.",
      "Hardened it for a shared GPU server (OOM-safe GPU job queue, pre-warmed model processes) and migrated it to a new server with identical outputs verified by smoke tests.",
    ],
    stack: ["Python", "PyTorch", "FastAPI", "YOLO11", "RTMPose / RTMW", "Face recognition", "TensorRT", "ONNX Runtime", "OpenCV", "ffmpeg / HLS", "Linux"],
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
