import { githubUrl, linkedinUrl, site } from '../data/portfolioData';

const esc = (v: string) => v.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;');

/** Builds a .vcf contact card in the browser. Only fields you filled in are included. */
export function downloadContact(): void {
  const parts = site.name.trim().split(/\s+/);
  const family = parts.length > 1 ? parts[parts.length - 1] : '';
  const given = parts.length > 1 ? parts.slice(0, -1).join(' ') : parts[0];
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(family)};${esc(given)};;;`,
    `FN:${esc(site.name)}`,
    `ORG:${esc(site.education.university)}`,
    `TITLE:${esc(site.role)}`,
  ];
  if (site.phone) lines.push(`TEL;TYPE=CELL:${site.phone.replace(/[^\d+]/g, '')}`);
  if (site.email) lines.push(`EMAIL;TYPE=INTERNET:${site.email}`);
  if (linkedinUrl) lines.push(`URL:${linkedinUrl}`);
  if (githubUrl) lines.push(`URL:${githubUrl}`);
  lines.push(`ADR;TYPE=HOME:;;;;${esc(site.location)};;`, 'END:VCARD');

  const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${site.displayName.replace(/\s+/g, '-')}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
