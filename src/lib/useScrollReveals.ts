import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Three scroll effects, switched on by attributes in the markup:
 *   data-rise  heading text rises out of a mask
 *   data-clip  panel/image is revealed with a clip-path wipe
 *   data-drift soft parallax on decorative glows
 * With "reduce motion" enabled nothing is hidden or moved.
 */
export function useScrollReveals(): void {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: el.parentElement ?? el, start: 'top 92%', once: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.1,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    void document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);
}
