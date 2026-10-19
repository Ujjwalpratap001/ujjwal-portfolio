import { fetchJsonCached } from './fetchJson';
import type { FetchResult } from './fetchJson';

const SIX_HOURS = 6 * 60 * 60 * 1000;

export interface LeetCodeStats {
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  totalEasy?: number;
  totalMedium?: number;
  totalHard?: number;
  /** which public service answered */
  source: string;
}

type Json = Record<string, unknown>;
const num = (v: unknown): number | undefined => (typeof v === 'number' && Number.isFinite(v) ? v : undefined);

interface Source {
  name: string;
  url: (user: string) => string;
  parse: (json: Json) => LeetCodeStats | null;
}

/**
 * LeetCode has no official public stats API, so two community-run services are tried in order.
 * Both are free and may be slow or offline at times: that is why the UI has fallbacks.
 */
const sources: Source[] = [
  {
    name: 'leetcode-stats-api',
    url: (u) => `https://leetcode-stats-api.herokuapp.com/${encodeURIComponent(u)}`,
    parse: (j) => {
      if (j.status !== 'success') return null;
      const solved = num(j.totalSolved);
      const easy = num(j.easySolved);
      const medium = num(j.mediumSolved);
      const hard = num(j.hardSolved);
      if (solved === undefined || easy === undefined || medium === undefined || hard === undefined) return null;
      return {
        solved,
        easy,
        medium,
        hard,
        totalEasy: num(j.totalEasy),
        totalMedium: num(j.totalMedium),
        totalHard: num(j.totalHard),
        source: 'leetcode-stats-api',
      };
    },
  },
  {
    name: 'alfa-leetcode-api',
    url: (u) => `https://alfa-leetcode-api.onrender.com/${encodeURIComponent(u)}/solved`,
    parse: (j) => {
      const solved = num(j.solvedProblem);
      const easy = num(j.easySolved);
      const medium = num(j.mediumSolved);
      const hard = num(j.hardSolved);
      if (solved === undefined || easy === undefined || medium === undefined || hard === undefined) return null;
      return { solved, easy, medium, hard, source: 'alfa-leetcode-api' };
    },
  },
];

export async function getLeetCodeStats(username: string): Promise<FetchResult<LeetCodeStats>> {
  let lastError: Error = new Error('No LeetCode service answered');
  for (const s of sources) {
    try {
      const res = await fetchJsonCached<Json>(`lc:${s.name}:${username}`, s.url(username), SIX_HOURS, 9000);
      const stats = s.parse(res.data);
      if (stats) return { data: stats, fromCache: res.fromCache, savedAt: res.savedAt };
      lastError = new Error('The service did not recognise that username');
    } catch (e) {
      lastError = e instanceof Error ? e : lastError;
    }
  }
  throw lastError;
}
