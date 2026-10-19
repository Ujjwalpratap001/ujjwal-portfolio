import { useState } from 'react';
import { skillGroups } from '../data/portfolioData';
import type { SkillLevel } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';

const levels: SkillLevel[] = ['Learning', 'Practicing', 'Building with'];

export default function Skills() {
  const [filter, setFilter] = useState<SkillLevel | null>(null);
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHeading id="skills-title" lines={['What I work with,', 'and how well.']} />

        <div className="skills__intro">
          <p>Levels describe how I use each skill today. They are not scores. Tap a level to highlight it.</p>
          <div className="filters" role="group" aria-label="Highlight by level">
            {levels.map((l) => (
              <button key={l} type="button" className="chip" aria-pressed={filter === l} onClick={() => setFilter(filter === l ? null : l)}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="skills__groups">
          {skillGroups.map((g) => (
            <div key={g.title} className="skills__group">
              <h3>{g.title}</h3>
              <ul>
                {g.skills.map((s) => (
                  <li key={s.name} className={filter && filter !== s.level ? 'is-dim' : ''}>
                    <span className="skill__name">{s.name}</span>
                    <span className="meter" aria-hidden="true">
                      {levels.map((l, i) => <i key={l} className={i <= levels.indexOf(s.level) ? 'on' : ''} />)}
                    </span>
                    <span className="skill__level">{s.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
