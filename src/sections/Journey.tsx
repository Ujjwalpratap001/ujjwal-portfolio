import { journey } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';

export default function Journey() {
  const items = journey.filter((j) => j.kind === 'project' || j.kind === 'experience' || j.kind === 'event');
  const hasWork = items.some((j) => j.kind === 'experience' || j.kind === 'event');
  return (
    <section id="journey" className="section journey" aria-labelledby="journey-title">
      <div className="wrap">
        <SectionHeading id="journey-title" lines={['Experience, built', 'one project at a time.']} />

        <ol className="timeline">
          {items.map((j) => (
            <li key={`${j.kind}-${j.title}`} className="timeline__item">
              <span className="timeline__period">{j.period}</span>
              <div>
                <h3>{j.title}</h3>
                {j.place && <p className="timeline__place">{j.place}</p>}
                <p>{j.text}</p>
              </div>
            </li>
          ))}
          {!hasWork && (
            <li className="timeline__item timeline__item--open">
              <span className="timeline__period">Next</span>
              <div>
                <h3>Internships, hackathons and events</h3>
                <p>No professional experience yet. I&apos;m looking for a first internship or hackathon, and it will be added here when it&apos;s real.</p>
              </div>
            </li>
          )}
        </ol>
      </div>
    </section>
  );
}
