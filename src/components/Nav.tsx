import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '../data/portfolioData';
import ResumeButton from './ResumeButton';

const links = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'activity', label: 'Activity' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const targets = links.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = open ? 'hidden' : '';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="nav__logo" href="#top" onClick={() => setOpen(false)}>
        <i aria-hidden="true" />
        {site.displayName}
      </a>

      <nav className="nav__links" aria-label="Primary">
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : ''} aria-current={active === l.id ? 'true' : undefined}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="nav__resume">
        <ResumeButton label="Resume" missingLabel="Resume soon" />
      </div>

      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div id="mobile-menu" className={`menu ${open ? 'menu--open' : ''}`}>
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <ResumeButton variant="primary" label="Download Resume" />
      </div>
    </header>
  );
}
