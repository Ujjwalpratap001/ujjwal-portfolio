import { fetchJsonCached } from './fetchJson';
import type { FetchResult } from './fetchJson';

const SIX_HOURS = 6 * 60 * 60 * 1000;

export interface GitHubProfile {
  login: string;
  html_url: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
}

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubContributions {
  days: ContributionDay[];
  /** Sum of the daily counts below, i.e. contributions in the returned period */
  total: number;
}

interface ContributionsApiResponse {
  contributions?: { date: string; count: number; level: number }[];
}

/** Official GitHub REST API (public, no token). Limited to 60 requests/hour per visitor, so it is cached. */
export function getGitHubProfile(username: string): Promise<FetchResult<GitHubProfile>> {
  return fetchJsonCached<GitHubProfile>(
    `gh-profile:${username}`,
    `https://api.github.com/users/${encodeURIComponent(username)}`,
    SIX_HOURS,
  );
}

/**
 * GitHub has no public REST endpoint for the contribution calendar, so this uses a free public
 * service (github-contributions-api.jogruber.de) that reads the same public calendar GitHub shows
 * on your profile. If that service is down the UI shows a fallback and a link to GitHub.
 */
export async function getGitHubContributions(username: string): Promise<FetchResult<GitHubContributions>> {
  const res = await fetchJsonCached<ContributionsApiResponse>(
    `gh-contrib:${username}`,
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
    SIX_HOURS,
  );
  const raw = res.data.contributions;
  if (!Array.isArray(raw) || raw.length === 0) throw new Error('No contribution data returned');
  const days: ContributionDay[] = raw.map((d) => ({
    date: d.date,
    count: d.count,
    level: (Math.min(4, Math.max(0, d.level)) as 0 | 1 | 2 | 3 | 4),
  }));
  const total = days.reduce((sum, d) => sum + d.count, 0);
  return { data: { days, total }, fromCache: res.fromCache, savedAt: res.savedAt };
}
