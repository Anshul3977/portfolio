import { cacheLife } from "next/cache";
import snapshot from "../../content/github-snapshot.json";

const USER = "Anshul3977";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
};

export type Day = { date: string; count: number; level: number };

export type GitHubData = {
  source: "live" | "snapshot";
  fetchedAt: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  memberSince: string;
  contributionsLastYear: number;
  days: Day[];
  languages: { name: string; count: number }[];
  recent: Repo[];
};

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  size: number;
};

const HIDE = new Set([USER, "portfolio", "action-repo", "qw"]);

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "anshul-portfolio" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return (await res.json()) as T;
}

export function shape(
  user: { public_repos: number; followers: number; created_at: string },
  repos: ApiRepo[],
  contrib: { total: Record<string, number>; contributions: Day[] },
  source: GitHubData["source"],
  fetchedAt: string,
): GitHubData {
  const own = repos.filter((r) => !r.fork);
  const langCount = new Map<string, number>();
  for (const r of own) {
    if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
  }
  const recent = own
    .filter((r) => !HIDE.has(r.name) && r.size > 40)
    .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage || null,
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
    }));
  return {
    source,
    fetchedAt,
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars: own.reduce((n, r) => n + r.stargazers_count, 0),
    memberSince: user.created_at,
    contributionsLastYear: contrib.total.lastYear ?? 0,
    days: contrib.contributions,
    languages: [...langCount.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    recent,
  };
}

export async function getGitHub(): Promise<GitHubData> {
  "use cache";
  cacheLife("hours");
  try {
    const [user, repos, contrib] = await Promise.all([
      getJson<{ public_repos: number; followers: number; created_at: string }>(
        `https://api.github.com/users/${USER}`,
      ),
      getJson<ApiRepo[]>(
        `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`,
      ),
      getJson<{ total: Record<string, number>; contributions: Day[] }>(
        `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`,
      ),
    ]);
    return shape(user, repos, contrib, "live", new Date().toISOString());
  } catch {
    return snapshot as GitHubData;
  }
}
