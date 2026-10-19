import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../lib/motion';

/** A thin ring that trails the pointer on desktop. The normal cursor stays visible. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const x = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3' });
    const onMove = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      el.classList.add('is-on');
      const target = e.target as HTMLElement | null;
      el.classList.toggle('is-link', !!target?.closest('a, button, [role="button"]'));
    };
    const onLeave = () => el.classList.remove('is-on');
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
