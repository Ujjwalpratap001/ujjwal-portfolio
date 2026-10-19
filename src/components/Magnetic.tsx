import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { isTouch, prefersReducedMotion } from '../lib/motion';

/** Wraps a button/link so it leans slightly toward the pointer. Desktop only. */
export default function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isTouch()) return;
    const moveX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      moveX((e.clientX - (r.left + r.width / 2)) * strength);
      moveY((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      moveX(0);
      moveY(0);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { clearProps: 'transform' });
    };
  }, [strength]);

  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  );
}
