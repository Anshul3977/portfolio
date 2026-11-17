export const site = {
  // Canonical address: used for metadataBase, og:url, the OG image, sitemap and robots.
  url: "https://anshulpalarpwar.vercel.app",
  name: "Anshul Palarpwar",
  shortName: "Anshul",
  title: "Anshul Palarpwar — Software Engineer, Backend & AI/ML",
  description:
    "Anshul Palarpwar, software engineer (backend and AI/ML). At AIMonk Labs he built the FastAPI ML service and computer-vision pipeline behind a factory video-analytics product. Available now for Hyderabad or remote roles.",
  role: "Software Engineer, Backend & AI/ML",
  oneLiner:
    "I build computer-vision pipelines, LLM apps and the backends behind them. At AIMonk Labs I own the ML service behind a factory video-analytics product.",
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
    where: "",
    period: "June 2026 — Present",
    current: true,
    project: "Worker Activity Monitoring",
    summary:
      "I own the ML side of a computer-vision product that turns factory CCTV into per-worker active, idle and absent time, with alerts and photo evidence.",
    impact: {
      value: "76.5 → ~6.2 min",
      label:
        "end-to-end on a 10-minute reference video, ~12× faster (quiet GPUs)",
    },
    metrics: [
      { value: "72 → 39 ms/frame", label: "real-time live analysis" },
      { value: "25 fps", label: "real-time conveyor analysis (2 GPUs)" },
      { value: "0.843 → 0.921", label: "activity accuracy" },
      { value: "≈1%", label: "face false-accept rate" },
    ],
    points: [
      "Profiled the pipeline (pose was 91% of runtime), parallelised pose across GPUs with an exact output match (37,020/37,020 rows), and swapped MediaPipe for RTMPose-small, which also raised accuracy from 0.843 to 0.921 on 140 blind-labelled clips.",
      "Calibrated face recognition to one threshold at ≈1% false-accept rate and fixed a masked-face gallery gap, with 0 identity flips across 25 tracks.",
      "Built the production FastAPI ML service for uploads, streamed uploads and live RTSP cameras with HLS preview, and got live analysis to real time at 25 fps (72 → ~39 ms/frame) with TensorRT, FP16 and a two-GPU split.",
      "Hardened it for a shared GPU server (OOM-safe GPU job queue, pre-warmed model processes) and migrated it to a new server with identical outputs verified by smoke tests.",
    ],
    stack: [
      "Python",
      "PyTorch",
      "FastAPI",
      "YOLO11",
      "RTMPose / RTMW",
      "Face recognition",
      "TensorRT",
      "ONNX Runtime",
      "OpenCV",
      "ffmpeg / HLS",
      "Linux",
    ],
  },
  {
    company: "Alignerr",
    title: "LLM Evaluator & Prompt Engineer",
    where: "Remote",
    period: "Oct 2023 — Jan 2025",
    summary:
      "Evaluated 500+ AI-generated responses and code outputs for correctness, instruction-following and reasoning, documented failure patterns, and rewrote evaluation prompts to catch them.",
    impact: { value: "500+", label: "AI responses and code outputs evaluated" },
    points: [
      "Graded answers for correctness, following instructions and reasoning.",
      "Spotted repeat failure patterns and rewrote evaluation prompts to catch them.",
    ],
    stack: ["LLM evaluation", "Prompt engineering", "Code review"],
  },
];

export const skillGroups = [
  {
    label: "Languages",
    items: ["Python", "C++", "TypeScript", "JavaScript", "SQL"],
  },
  {
    label: "AI / ML",
    items: [
      "PyTorch",
      "YOLO",
      "OpenCV",
      "ByteTrack",
      "LLM APIs",
      "Embeddings",
      "LangGraph",
      "FAISS",
    ],
  },
  {
    label: "Backend",
    items: [
      "FastAPI",
      "Django",
      "Flask",
      "Node.js",
      "Express",
      "Celery",
      "REST & webhooks",
    ],
  },
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  {
    label: "Data & infra",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Linux",
      "MinIO (S3 API)",
      "Git",
    ],
  },
] as const;
