import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { site } from '../data/portfolioData';
import ParticleField from '../components/ParticleField';
import Portrait from '../components/Portrait';
import Magnetic from '../components/Magnetic';
import ResumeButton from '../components/ResumeButton';
import { isTouch, prefersReducedMotion } from '../lib/motion';

// Decorative labels that float around the portrait. They only name areas of interest.
const tags = [
  { label: 'Java', x: '55%', y: '24%', d: '0s' },
  { label: 'Python', x: '84%', y: '30%', d: '-1.4s' },
  { label: 'AI', x: '52%', y: '62%', d: '-2.2s' },
  { label: 'Data', x: '88%', y: '62%', d: '-0.8s' },
  { label: 'Code', x: '66%', y: '84%', d: '-3s' },
];

export default function Hero({ play }: { play: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [first, ...rest] = site.displayName.split(' ');
  const last = rest.join(' ');

  // Entry choreography: runs once, when the intro lets go.
  useLayoutEffect(() => {
    const el = root.current;
    if (!play || !el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.h-label', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('.h-bg', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power4.inOut' }, 0.1)
        .fromTo('.h-name .mask > span', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.1, ease: 'power4.out' }, 0.25)
        .fromTo('.h-portrait', { clipPath: 'inset(14% 10% 100% 10%)', scale: 1.08 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.2, ease: 'power3.inOut' }, 0.35)
        .fromTo('.h-ring', { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.15 }, 0.7)
        .fromTo('.h-tag', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.09 }, 1)
        .fromTo('.h-copy', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 1);
    }, el);
    return () => ctx.revert();
  }, [play]);

  // Mouse parallax: the portrait, the huge background text and the tags drift at different depths.
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion() || isTouch()) return;
    const targets = [
      { sel: '.h-portrait__inner', dx: -22, dy: -12 },
      { sel: '.h-bg-inner', dx: 28, dy: 10 },
      { sel: '.h-tags', dx: -38, dy: -18 },
    ].map((t) => {
      const node = el.querySelector(t.sel);
      return node
        ? { ...t, qx: gsap.quickTo(node, 'x', { duration: 0.9, ease: 'power3' }), qy: gsap.quickTo(node, 'y', { duration: 0.9, ease: 'power3' }) }
        : null;
    });
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targets.forEach((t) => {
        if (!t) return;
        t.qx(nx * t.dx);
        t.qy(ny * t.dy);
      });
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <section id="top" ref={root} className={`hero ${play ? '' : 'hero--pre'}`} aria-label="Introduction">
      <ParticleField className="hero__particles" count={55} />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__bgtext h-bg" aria-hidden="true">
        <div className="h-bg-inner">
          <span>Building</span>
          <span>the future</span>
        </div>
      </div>

      <div className="hero__orbit" aria-hidden="true">
        <i className="ring ring--a h-ring" />
        <i className="ring ring--b h-ring" />
      </div>

      <div className="hero__portrait h-portrait">
        <div className="h-portrait__inner">
          <Portrait />
        </div>
      </div>

      <div className="hero__tags h-tags" aria-hidden="true">
        {tags.map((t) => (
          <span key={t.label} className="tag h-tag" style={{ left: t.x, top: t.y }}>
            <span className="tag__float" style={{ animationDelay: t.d }}>
              {t.label}
            </span>
          </span>
        ))}
      </div>

      <div className="hero__main">
        <p className="hero__label h-label">
          <span className="pulse" aria-hidden="true" />
          {site.availability}
        </p>

        <h1 className="hero__name h-name" aria-label={site.displayName}>
          <span className="mask" aria-hidden="true"><span>{first}</span></span>
          <span className="mask" aria-hidden="true"><span>{last}</span></span>
        </h1>

        <p className="hero__headline h-copy">{site.headline}</p>
        <p className="hero__sub h-copy">{site.subheadline}</p>

        <div className="hero__cta h-copy">
          <Magnetic>
            <a className="btn btn--primary" href="#projects">Explore My Work</a>
          </Magnetic>
          <Magnetic>
            <ResumeButton label="Download Resume" />
          </Magnetic>
        </div>
      </div>

      <dl className="hero__meta h-copy">
        <div><dt>Studying</dt><dd>{site.education.degree}</dd></div>
        <div><dt>University</dt><dd>{site.education.university}</dd></div>
        <div><dt>Based in</dt><dd>{site.location}</dd></div>
      </dl>
    </section>
  );
}
