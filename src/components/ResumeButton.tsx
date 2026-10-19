import { Download } from 'lucide-react';
import { site } from '../data/portfolioData';
import { asset } from '../lib/assets';
import { useResume } from '../lib/resume';

interface Props {
  variant?: 'primary' | 'ghost';
  label?: string;
  missingLabel?: string;
  className?: string;
}

/** A real download link when resume.pdf exists; otherwise a clearly disabled button. */
export default function ResumeButton({
  variant = 'ghost',
  label = 'Download Resume',
  missingLabel = 'Resume coming soon',
  className = '',
}: Props) {
  const state = useResume();
  if (state === 'available') {
    return (
      <a
        className={`btn btn--${variant} ${className}`}
        href={asset(site.resume)}
        download={`${site.displayName.replace(/\s+/g, '-')}-Resume.pdf`}
      >
        <Download size={16} aria-hidden="true" />
        {label}
      </a>
    );
  }
  return (
    <span
      className={`btn btn--disabled ${className}`}
      aria-disabled="true"
      title="The owner has not added resume.pdf yet"
    >
      <Download size={16} aria-hidden="true" />
      {state === 'checking' ? label : missingLabel}
    </span>
  );
}
