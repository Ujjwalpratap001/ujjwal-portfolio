import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

interface Props {
  count?: number;
  className?: string;
}

interface Point { x: number; y: number; vx: number; vy: number; r: number }

/**
 * Decorative network of drifting nodes. It is only a visual motif, not a real AI model.
 * It pauses when off-screen or when the tab is hidden, and draws one still frame for reduced motion.
 */
export default function ParticleField({ count = 55, className = '' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const total = window.innerWidth < 700 ? Math.round(count * 0.5) : count;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let pts: Point[] = [];
    let raf = 0;
    let running = false;
    let visible = true;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const reach = Math.min(140, w * 0.18);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.fillStyle = 'rgba(255,106,43,0.7)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < reach) {
            ctx.strokeStyle = `rgba(255,59,36,${(1 - d / reach) * 0.22})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduced || running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = Array.from({ length: total }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
      }));
      draw();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };

    resize();
    io.observe(canvas);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [count]);

  return <canvas ref={ref} className={`particles ${className}`} aria-hidden="true" />;
}
