import { ArrowUpRight, BadgeCheck, FileText } from 'lucide-react';
import { certificates } from '../data/certificates';
import SectionHeading from '../components/SectionHeading';
import { asset } from '../lib/assets';

export default function Certificates() {
  return (
    <section id="certificates" className="section certs" aria-labelledby="certs-title">
      <div className="wrap">
        <SectionHeading id="certs-title" lines={['Certificates', 'and achievements.']} />

        {certificates.length === 0 ? (
          <div className="state state--empty">
            <BadgeCheck size={28} aria-hidden="true" />
            <p>No certificates added yet. Earned certificates will be listed here, with links to the originals.</p>
          </div>
        ) : (
          <ul className="cert-grid">
            {certificates.map((c) => (
              <li key={c.id} className="cert">
                <div className="cert__preview">
                  {c.preview || c.type === 'image' ? (
                    <img src={asset(c.preview ?? c.file)} alt={`Certificate: ${c.title}`} loading="lazy" />
                  ) : (
                    <span className="cert__pdf"><FileText size={34} aria-hidden="true" />PDF</span>
                  )}
                </div>
                <h3>{c.title}</h3>
                <p className="cert__meta">{c.issuer}, {c.date}</p>
                <div className="cert__links">
                  <a className="btn btn--ghost" href={asset(c.file)} target="_blank" rel="noreferrer">View certificate</a>
                  {c.verifyUrl && (
                    <a className="btn btn--link" href={c.verifyUrl} target="_blank" rel="noreferrer">
                      Verify <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
