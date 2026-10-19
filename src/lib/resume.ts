import { useEffect, useState } from 'react';
import { site } from '../data/portfolioData';
import { asset } from './assets';

export type ResumeState = 'checking' | 'available' | 'missing';

let check: Promise<boolean> | null = null;

/** Asks the server once whether public/assets/resume.pdf really exists and is a PDF. */
function resumeExists(): Promise<boolean> {
  if (!check) {
    check = fetch(asset(site.resume), { method: 'HEAD' })
      .then((r) => r.ok && (r.headers.get('content-type') ?? '').toLowerCase().includes('pdf'))
      .catch(() => false);
  }
  return check;
}

export function useResume(): ResumeState {
  const [state, setState] = useState<ResumeState>('checking');
  useEffect(() => {
    let alive = true;
    resumeExists().then((ok) => {
      if (alive) setState(ok ? 'available' : 'missing');
    });
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
