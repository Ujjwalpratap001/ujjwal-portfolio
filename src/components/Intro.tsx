import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { site } from '../data/portfolioData';

interface Props {
  /** called when the wipe starts, so the hero can begin animating underneath */
  onReveal: () => void;
  /** called when the overlay is finished and can be removed */
  onDone: () => void;
}

/** Short first-visit intro (about 2 seconds). It can be skipped, and returning visitors never see it. */
export default function Intro({ onReveal, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    document.body.style.overflow = '';
    onDone();
  };

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    document.body.style.overflow = 'hidden';
    const tl = gsap.timeline();
    tlRef.current = tl;
    tl.fromTo('.intro__label', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo('.intro__name span', { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: 'power4.out', stagger: 0.08 }, '-=0.2')
      .fromTo('.intro__line', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.3')
      .add(onReveal, '+=0.15')
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'power4.inOut' }, '<')
      .add(finish);
    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => {
    tlRef.current?.kill();
    onReveal();
    finish();
  };

  const [first, ...rest] = site.displayName.split(' ');

  return (
    <div ref={root} className="intro" role="status" aria-label="Loading portfolio">
      <p className="intro__label">Portfolio</p>
      <p className="intro__name" aria-hidden="true">
        <span>{first}</span> <span>{rest.join(' ')}</span>
      </p>
      <i className="intro__line" aria-hidden="true" />
      <button type="button" className="intro__skip" onClick={skip}>
        Skip intro
      </button>
    </div>
  );
}
