import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { githubUrl, site } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';
import CountUp from '../components/CountUp';
import { GitHubIcon } from '../components/Icons';
import { useAsync, useInView, formatDate } from '../lib/hooks';
import { getGitHubContributions, getGitHubProfile } from '../lib/github';
import type { ContributionDay } from '../lib/github';

/** Lays the days out like GitHub does: one column per week, Sunday at the top. */
function Heatmap({ days }: { days: ContributionDay[] }) {
  const offset = new Date(`${days[0].date}T00:00:00`).getDay();
  const cells: (ContributionDay | null)[] = [...Array<null>(offset).fill(null), ...days];
  return (
    <div className="heat-scroll" role="img" aria-label="Contribution calendar for the last year">
      <div className="heat">
        {cells.map((d, i) =>
          d ? (
            <i
              key={d.date}
              className={`heat__cell lvl-${d.level}`}
              style={{ animationDelay: `${Math.floor(i / 7) * 9}ms` }}
              title={`${d.count} contribution${d.count === 1 ? '' : 's'} on ${d.date}`}
            />
          ) : (
            <i key={`pad-${i}`} className="heat__cell is-empty" />
          ),
        )}
      </div>
    </div>
  );
}

export default function GitHubActivity() {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref);
  const username = site.links.github.username;
  const enabled = seen && !!username;

  const profile = useAsync(() => getGitHubProfile(username), enabled, [username]);
  const contrib = useAsync(() => getGitHubContributions(username), enabled, [username]);

  return (
    <section id="activity" ref={ref} className="section activity" aria-labelledby="gh-title">
      <div className="wrap">
        <SectionHeading id="gh-title" lines={['Shipping,', 'one commit at a time.']} />

        {!username ? (
          <div className="state state--empty">
            <GitHubIcon size={28} />
            <p>GitHub activity will appear here once a username is added in <code>src/data/portfolioData.ts</code>.</p>
          </div>
        ) : (
          <div className="gh">
            <aside className="gh__profile">
              <img
                src={profile.status === 'success' ? profile.data.avatar_url : `https://github.com/${username}.png?size=160`}
                alt={`GitHub avatar of ${username}`}
                width={80}
                height={80}
                loading="lazy"
              />
              <div>
                <p className="gh__user">@{username}</p>
                <p className="gh__sub">GitHub profile</p>
              </div>

              <dl className="gh__stats">
                <div>
                  <dt>Public repositories</dt>
                  <dd>{profile.status === 'success' ? <CountUp value={profile.data.public_repos} /> : profile.status === 'loading' ? '…' : 'n/a'}</dd>
                </div>
                <div>
                  <dt>Contributions, last year</dt>
                  <dd>{contrib.status === 'success' ? <CountUp value={contrib.data.total} /> : contrib.status === 'loading' ? '…' : 'n/a'}</dd>
                </div>
              </dl>

              <a className="btn btn--primary" href={githubUrl} target="_blank" rel="noreferrer">
                <GitHubIcon size={16} /> View my repositories <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </aside>

            <div className="gh__graph">
              {contrib.status === 'loading' && <div className="skeleton" aria-busy="true" aria-label="Loading contributions" />}
              {contrib.status === 'error' && (
                <div className="state">
                  <p>The contribution graph could not be loaded right now ({contrib.message}). Your activity is always available on GitHub.</p>
                  <a className="btn btn--ghost" href={githubUrl} target="_blank" rel="noreferrer">Open GitHub profile</a>
                </div>
              )}
              {contrib.status === 'success' && (
                <>
                  <Heatmap days={contrib.data.days} />
                  <div className="legend">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map((l) => <i key={l} className={`heat__cell lvl-${l}`} />)}
                    <span>More</span>
                  </div>
                  <p className="source">
                    Counts come from GitHub&apos;s public contribution calendar, read through a free public service
                    (github-contributions-api.jogruber.de). {contrib.fromCache ? 'Saved copy from' : 'Fetched'} {formatDate(contrib.savedAt)}.
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
