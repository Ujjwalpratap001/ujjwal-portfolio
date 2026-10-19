import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { leetcodeUrl, site } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';
import CountUp from '../components/CountUp';
import { LeetCodeIcon } from '../components/Icons';
import { useAsync, useInView, formatDate } from '../lib/hooks';
import { getLeetCodeStats } from '../lib/leetcode';
import type { LeetCodeStats } from '../lib/leetcode';

const R = 54;
const C = 2 * Math.PI * R;

function Dashboard({ stats }: { stats: LeetCodeStats }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setGo(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const rows = [
    { key: 'easy', label: 'Easy', solved: stats.easy, total: stats.totalEasy },
    { key: 'medium', label: 'Medium', solved: stats.medium, total: stats.totalMedium },
    { key: 'hard', label: 'Hard', solved: stats.hard, total: stats.totalHard },
  ];
  const sum = stats.easy + stats.medium + stats.hard;
  let start = 0;
  const arcs = rows.map((r) => {
    const len = sum > 0 ? (r.solved / sum) * C : 0;
    const arc = { key: r.key, len, start };
    start += len;
    return arc;
  });

  return (
    <div className="lc">
      <div className="lc__ring">
        <svg viewBox="0 0 140 140" role="img" aria-label={`${stats.solved} problems solved: ${stats.easy} easy, ${stats.medium} medium, ${stats.hard} hard`}>
          <circle cx="70" cy="70" r={R} className="ring-track" />
          {arcs.map((a) => (
            <circle
              key={a.key}
              cx="70"
              cy="70"
              r={R}
              className={`ring-arc ring-arc--${a.key}`}
              strokeDasharray={`${go ? Math.max(a.len - 2, 0) : 0} ${C}`}
              strokeDashoffset={-a.start}
              transform="rotate(-90 70 70)"
            />
          ))}
        </svg>
        <div className="lc__center">
          <strong><CountUp value={stats.solved} /></strong>
          <span>solved</span>
        </div>
      </div>

      <ul className="lc__bars">
        {rows.map((r) => {
          const pct = r.total ? (r.solved / r.total) * 100 : sum ? (r.solved / sum) * 100 : 0;
          return (
            <li key={r.key}>
              <div className="lc__row">
                <span>{r.label}</span>
                <span>
                  <CountUp value={r.solved} />
                  {r.total ? ` of ${r.total}` : ''}
                </span>
              </div>
              <div className="bar"><i className={`bar__fill bar__fill--${r.key}`} style={{ width: go ? `${Math.min(pct, 100)}%` : '0%' }} /></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function LeetCodeProgress() {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref);
  const username = site.links.leetcode.username;
  const stats = useAsync(() => getLeetCodeStats(username), seen && !!username, [username]);
  const manual = site.leetcodeManual;

  return (
    <section id="leetcode" ref={ref} className="section leetcode" aria-labelledby="lc-title">
      <div className="wrap">
        <SectionHeading id="lc-title" lines={['Practice,', 'tracked honestly.']} />

        <div className="panel">
          {!username && (
            <div className="state state--empty">
              <LeetCodeIcon size={28} />
              <p>LeetCode progress will appear here once a username is added in <code>src/data/portfolioData.ts</code>.</p>
            </div>
          )}

          {username && stats.status === 'loading' && <div className="skeleton skeleton--tall" aria-busy="true" aria-label="Loading LeetCode stats" />}

          {username && stats.status === 'error' && (
            <div className="state">
              <p>Live LeetCode numbers are unavailable right now ({stats.message}).</p>
              {manual.solved !== null && (
                <p className="manual">
                  Last updated by hand{manual.updated ? ` on ${manual.updated}` : ''}: <strong>{manual.solved}</strong> problems solved. This is not live data.
                </p>
              )}
            </div>
          )}

          {username && stats.status === 'success' && (
            <>
              <Dashboard stats={stats.data} />
              <p className="source">
                Live numbers via the community service {stats.data.source}. {stats.fromCache ? 'Saved copy from' : 'Fetched'} {formatDate(stats.savedAt)}.
              </p>
            </>
          )}

          {username && (
            <a className="btn btn--primary panel__cta" href={leetcodeUrl} target="_blank" rel="noreferrer">
              <LeetCodeIcon size={16} /> Visit my LeetCode profile <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
