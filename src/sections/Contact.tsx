import { ArrowUpRight, Mail, Phone, UserPlus } from 'lucide-react';
import { githubUrl, leetcodeUrl, linkedinUrl, site, telUrl, whatsappUrl } from '../data/portfolioData';
import ParticleField from '../components/ParticleField';
import ResumeButton from '../components/ResumeButton';
import Magnetic from '../components/Magnetic';
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, WhatsAppIcon } from '../components/Icons';
import { downloadContact } from '../lib/vcard';

export default function Contact() {
  const social = [
    { label: 'GitHub', url: githubUrl, icon: <GitHubIcon size={18} /> },
    { label: 'LinkedIn', url: linkedinUrl, icon: <LinkedInIcon size={18} /> },
    { label: 'LeetCode', url: leetcodeUrl, icon: <LeetCodeIcon size={18} /> },
    ...site.links.extra.map((e) => ({ label: e.label, url: e.url, icon: <ArrowUpRight size={18} /> })),
  ].filter((s) => s.url);

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <ParticleField className="contact__particles" count={40} />
      <div className="contact__glow" aria-hidden="true" />
      <div className="wrap contact__wrap">
        <h2 id="contact-title" className="contact__title">
          <span className="mask"><span data-rise>Let&apos;s build</span></span>
          <span className="mask"><span data-rise>something that</span></span>
          <span className="mask"><span data-rise>matters.</span></span>
        </h2>

        <div className="contact__side">
          <p>I&apos;m open to internships, collaborations, hackathons and learning opportunities. If you&apos;re building something, I&apos;d like to hear about it.</p>
          <div className="contact__actions">
            {telUrl && (
              <Magnetic>
                <a className="btn btn--primary" href={telUrl}>
                  <Phone size={16} aria-hidden="true" /> Call {site.phone}
                </a>
              </Magnetic>
            )}
            {whatsappUrl && (
              <a className="btn btn--ghost" href={whatsappUrl} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
            )}
            {site.email && (
              <a className="btn btn--ghost" href={`mailto:${site.email}`}>
                <Mail size={16} aria-hidden="true" /> {site.email}
              </a>
            )}
            {(site.phone || site.email) && (
              <button type="button" className="btn btn--ghost" onClick={downloadContact}>
                <UserPlus size={16} aria-hidden="true" /> Save contact
              </button>
            )}
            {!site.phone && !site.email && (
              <span className="btn btn--disabled" aria-disabled="true">Contact details coming soon</span>
            )}
          </div>

          {social.length > 0 && (
            <ul className="contact__links">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.icon} {s.label} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
          <ResumeButton label="Download Resume" />
        </div>
      </div>

      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} {site.name}</span>
        <span>Built with React, Vite and GSAP</span>
        <a href="#top">Back to top</a>
      </footer>
    </section>
  );
}
