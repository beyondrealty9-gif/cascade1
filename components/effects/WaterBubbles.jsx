'use client';

import { useEffect, useRef } from 'react';

/**
 * WaterBubbles
 * ------------
 * Canvas-based rising bubbles. Cheap (one <canvas>, one rAF loop),
 * pauses when off-screen via IntersectionObserver so it doesn't burn
 * CPU on sections the user hasn't scrolled to yet.
 *
 * Usage:
 *   <WaterBubbles count={22} color="255,255,255" className="absolute inset-0" />
 */
export default function WaterBubbles({
  count = 25,
  color = '255,255,255', // rgb string, alpha applied per-bubble
  className = '',
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const bubblesRef = useRef([]);
  const runningRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height, dpr;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makeBubble = (randomY = true) => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 20,
      r: 2 + Math.random() * 6,
      speed: 0.4 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 0.6,
      alpha: 0.15 + Math.random() * 0.35,
      wobble: Math.random() * Math.PI * 2,
    });

    resize();
    bubblesRef.current = Array.from({ length: count }, () => makeBubble(true));

    const draw = () => {
      if (!runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      for (const b of bubblesRef.current) {
        b.y -= b.speed;
        b.wobble += 0.03;
        b.x += Math.sin(b.wobble) * b.drift;

        if (b.y < -10) Object.assign(b, makeBubble(false));

        // bubble body
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${b.alpha})`;
        ctx.fill();

        // tiny highlight for a "glassy" real bubble look
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255, ${Math.min(b.alpha + 0.3, 0.8)})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pause animation when off-screen (perf)
    const io = new IntersectionObserver(
      ([entry]) => { runningRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, [count, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
