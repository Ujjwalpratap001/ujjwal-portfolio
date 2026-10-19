import { site, journey } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';

export default function About() {
  const path = journey.filter((j) => j.kind === 'education' || j.kind === 'learning');
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHeading id="about-title" lines={site.statement} />

        <div className="about__grid">
          <div className="about__text">
            {site.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl className="about__facts" data-clip>
            <div><dt>University</dt><dd>{site.education.university}</dd></div>
            <div><dt>Degree</dt><dd>{site.education.degree}</dd></div>
            <div><dt>Specialization</dt><dd>{site.education.specialization}</dd></div>
            <div><dt>Stage</dt><dd>{site.education.stage}</dd></div>
            <div><dt>Based in</dt><dd>{site.location}</dd></div>
            <div><dt>Exploring</dt><dd>{site.currentlyExploring.join(', ')}</dd></div>
          </dl>
        </div>

        <ul className="rail" aria-label="Learning journey">
          {path.map((item) => (
            <li key={item.title} className="rail__item">
              <span className="rail__period">{item.period}</span>
              <h3>{item.title}</h3>
              {item.place && <p className="rail__place">{item.place}</p>}
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
