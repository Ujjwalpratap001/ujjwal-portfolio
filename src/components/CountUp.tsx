import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../lib/motion';

/** Counts up to a REAL value. Only use it with data that was actually retrieved. */
export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = String(value);
      return;
    }
    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: value,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = String(Math.round(counter.n));
      },
    });
    return () => {
      tween.kill();
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
