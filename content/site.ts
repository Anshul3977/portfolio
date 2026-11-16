export const site = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://anshulpalarpwar.vercel.app",
  name: "Anshul Palarpwar",
  shortName: "Anshul",
  title: "Anshul Palarpwar — Full-stack AI products",
  description:
    "Portfolio of Anshul Palarpwar, a B.Tech CSE student at Ramdeobaba University building full-stack AI products.",
  oneLiner: "CSE student building full-stack AI products",
  email: "palarpwaranshul@gmail.com",
  location: "India",
  school: "Ramdeobaba University",
  degree: "B.Tech CSE",
  cgpa: "8.2",
  links: {
    email: "mailto:palarpwaranshul@gmail.com",
    github: "https://github.com/Anshul3977",
    linkedin: "https://www.linkedin.com/in/anshul-palarpwar-1a7315264/",
    x: "https://x.com/Anshul23182222",
    xHandle: "@Anshul23182222",
    codeforces: "https://codeforces.com/profile/Anshul3977",
    codeforcesHandle: "Anshul3977",
  },
} as const;

export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "C++", "Java", "SQL"],
  frameworks: [
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "Flask",
    "FastAPI",
    "Django REST",
  ],
  ai: [
    "LangGraph",
    "scikit-learn",
    "TensorFlow",
    "YOLOv8",
    "OpenCV",
    "FAISS",
    "NLP",
  ],
  tools: ["PostgreSQL", "MongoDB", "Prisma", "Docker", "Git", "AWS"],
} as const;
