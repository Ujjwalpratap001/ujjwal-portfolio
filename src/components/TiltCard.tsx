import { useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import { isTouch, prefersReducedMotion } from '../lib/motion';

interface Props {
  children: ReactNode;
  className?: string;
  max?: number;
}

/** Perspective tilt and a soft light that follows the pointer. Does nothing on touch or reduced motion. */
export default function TiltCard({ children, className = '', max = 5 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useRef(!prefersReducedMotion() && !isTouch());

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled.current) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
      <span className="tilt__glow" aria-hidden="true" />
    </div>
  );
}
