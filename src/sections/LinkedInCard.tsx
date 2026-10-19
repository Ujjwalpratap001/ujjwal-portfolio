import { linkedinUrl, site } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';
import { LinkedInIcon } from '../components/Icons';

export default function LinkedInCard() {
  const initials = site.displayName.split(' ').map((w) => w[0]).join('');
  return (
    <section id="linkedin" className="section linkedin" aria-labelledby="li-title">
      <div className="wrap">
        <SectionHeading id="li-title" lines={['Find me', 'on LinkedIn.']} />

        <div className="li-card" data-clip>
          <div className="li-card__avatar" aria-hidden="true">{initials}</div>
          <div className="li-card__body">
            <h3>{site.name}</h3>
            <p className="li-card__headline">{site.linkedin.headline}</p>
            <p className="li-card__focus">{site.linkedin.focus}</p>
            <p>{site.linkedin.about}</p>
            <div className="li-card__cta">
              {linkedinUrl ? (
                <>
                  <a className="btn btn--linkedin" href={linkedinUrl} target="_blank" rel="noreferrer">
                    <LinkedInIcon size={16} /> Connect on LinkedIn
                  </a>
                  <a className="btn btn--ghost" href={linkedinUrl} target="_blank" rel="noreferrer">View Profile</a>
                </>
              ) : (
                <span className="btn btn--disabled" aria-disabled="true">LinkedIn link coming soon</span>
              )}
            </div>
          </div>
          <span className="li-card__logo" aria-hidden="true"><LinkedInIcon size={28} /></span>
        </div>
      </div>
    </section>
  );
}
