import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/portfolioData';
import type { FeatureState, Project } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';
import Magnetic from '../components/Magnetic';
import { GitHubIcon } from '../components/Icons';
import { GalleryMockup, QuizMockup } from '../components/Mockups';
import { asset } from '../lib/assets';

const stateLabel: Record<FeatureState, string> = {
  built: 'Built',
  'in-progress': 'In progress',
  planned: 'Planned',
};

function LinkButtons({ p }: { p: Project }) {
  return (
    <div className="project__links">
      {p.live ? (
        <Magnetic>
          <a className="btn btn--primary" href={p.live} target="_blank" rel="noreferrer">
            View Live Project <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Magnetic>
      ) : (
        <span className="btn btn--disabled" aria-disabled="true">Live link coming soon</span>
      )}
      {p.github ? (
        <Magnetic>
          <a className="btn btn--ghost" href={p.github} target="_blank" rel="noreferrer">
            <GitHubIcon size={16} /> Explore Source Code
          </a>
        </Magnetic>
      ) : (
        <span className="btn btn--disabled" aria-disabled="true">Source link coming soon</span>
      )}
    </div>
  );
}

function Stage({ p }: { p: Project }) {
  return (
    <div className="project__stage" data-clip>
      <i className="stage__glow" data-drift aria-hidden="true" />
      <TiltCard className="stage__card">
        {p.image ? (
          <img className="stage__img" src={asset(p.image)} alt={`Screenshot of ${p.title}`} loading="lazy" />
        ) : p.mockup === 'quiz' ? (
          <QuizMockup />
        ) : p.mockup === 'gallery' ? (
          <GalleryMockup />
        ) : (
          <div className="mock mock--empty">Add a screenshot in portfolioData.ts</div>
        )}
      </TiltCard>
      {!p.image && p.mockup !== 'none' && <p className="stage__caption">Interface sketch. Replace with a real screenshot.</p>}
    </div>
  );
}

function Feature({ p, flip }: { p: Project; flip: boolean }) {
  return (
    <article className={`project ${flip ? 'project--flip' : ''}`} aria-labelledby={`${p.id}-title`}>
      <span className="project__ghost" aria-hidden="true">{p.title}</span>

      <div className="project__body">
        <p className="project__meta">{p.category} <span className="project__status">{p.status}</span></p>
        <h3 id={`${p.id}-title`} className="project__title">{p.title}</h3>
        <p className="project__tagline">{p.tagline}</p>
        <p className="project__desc">{p.description}</p>

        <ul className="features" aria-label={`${p.title} features`}>
          {p.features.map((f) => (
            <li key={f.label} data-state={f.state}>
              <i aria-hidden="true" />
              <span>{f.label}</span>
              <em>{stateLabel[f.state]}</em>
            </li>
          ))}
        </ul>

        {p.stack.length > 0 && (
          <ul className="stack" aria-label="Technologies">
            {p.stack.map((s) => <li key={s}>{s}</li>)}
          </ul>
        )}
        <LinkButtons p={p} />
      </div>

      <Stage p={p} />
    </article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHeading id="projects-title" lines={['Projects I', 'am building.']} />

        {featured.map((p, i) => <Feature key={p.id} p={p} flip={i % 2 === 1} />)}

        {others.length > 0 && (
          <div className="more">
            <h3>More projects</h3>
            <ul>
              {others.map((p) => (
                <li key={p.id}>
                  <strong>{p.title}</strong>
                  <p>{p.description}</p>
                  <LinkButtons p={p} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
