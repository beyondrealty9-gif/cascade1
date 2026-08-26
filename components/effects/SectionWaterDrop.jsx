'use client';

import { useEffect, useRef } from 'react';

/**
 * SectionWaterDrop
 * ----------------
 * Full-section pseudo-3D cyan water-drop ripple background.
 * High-contrast cyan palette on a slate base so it pops clearly
 * on any section background.
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <SectionWaterDrop opacity={0.55} />
 *     <div className="relative z-10">…content…</div>
 *   </section>
 */
export default function SectionWaterDrop({ opacity = 0.55, className = '' }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const runRef    = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Low-res simulation → scaled up via CSS for perf
    const W = 260;
    const H = 160;
    canvas.width  = W;
    canvas.height = H;

    let bufA = new Float32Array(W * H);
    let bufB = new Float32Array(W * H);
    const img = ctx.createImageData(W, H);
    const DAMP = 0.968;

    // ── drop ─────────────────────────────────────────────────────────────────
    const drop = (x, y, r = 12, s = 220) => {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < r) {
            const px = Math.round(x + dx);
            const py = Math.round(y + dy);
            if (px > 0 && px < W - 1 && py > 0 && py < H - 1) {
              bufA[py * W + px] += s * (1 - d / r);
            }
          }
        }
      }
    };

    // ── intro sequence (spread across whole canvas) ───────────────────────────
    drop(W * 0.50, H * 0.50, 16, 240);
    setTimeout(() => drop(W * 0.20, H * 0.70, 12, 210), 500);
    setTimeout(() => drop(W * 0.78, H * 0.28, 14, 230), 1000);
    setTimeout(() => drop(W * 0.10, H * 0.20, 10, 190), 1600);
    setTimeout(() => drop(W * 0.88, H * 0.82, 13, 220), 2200);
    setTimeout(() => drop(W * 0.55, H * 0.10, 11, 200), 2900);
    setTimeout(() => drop(W * 0.30, H * 0.90, 10, 185), 3600);

    // ── random drops ─────────────────────────────────────────────────────────
    const iv = setInterval(() => {
      if (!runRef.current) return;
      const x = 15 + Math.random() * (W - 30);
      const y = 10 + Math.random() * (H - 20);
      drop(x, y, 7 + Math.random() * 9, 130 + Math.random() * 130);
    }, 950);

    // ── VIVID Cyan palette ────────────────────────────────────────────────────
    // deep  = dark navy   (#04111f) — deep water trough
    // surf  = #7DF9FF Electric Blue — wave surface crest
    // foam  = #FFFFFF white — specular foam highlight
    const deepR =  4, deepG = 17,  deepB = 31;   // very dark navy
    const surfR = 125, surfG = 249, surfB = 255;  // #7DF9FF
    const foamR = 255, foamG = 255, foamB = 255;  // pure white foam

    // ── light ─────────────────────────────────────────────────────────────────
    const lightX = 0.8, lightY = -0.7, lightZ = 1.2;
    const lightLen = Math.sqrt(lightX**2 + lightY**2 + lightZ**2);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      if (!runRef.current) return;

      // propagate
      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          const i    = y * W + x;
          const next = (bufA[i-1] + bufA[i+1] + bufA[i-W] + bufA[i+W]) / 2 - bufB[i];
          bufB[i]    = next * DAMP;
        }
      }
      const tmp = bufA; bufA = bufB; bufB = tmp;

      // shade — high contrast: full dark→cyan→white range
      const data = img.data;
      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          const i  = y * W + x;
          const dX = bufA[i - 1] - bufA[i + 1];
          const dY = bufA[i - W] - bufA[i + W];

          const nx = dX * 0.016;
          const ny = dY * 0.016;
          const nz = 1.0;
          const nl = Math.max(0,
            (nx * lightX + ny * lightY + nz * lightZ) / lightLen
          );

          // stronger specular for vivid white foam crests
          const spec = Math.pow(nl, 22) * 1.1;
          const h    = Math.min(1, Math.max(0, bufA[i] / 90 + 0.5));

          const r = Math.min(255, deepR + (surfR - deepR) * h * (0.4 + nl * 0.6) + foamR * spec) | 0;
          const g = Math.min(255, deepG + (surfG - deepG) * h * (0.4 + nl * 0.6) + foamG * spec) | 0;
          const b = Math.min(255, deepB + (surfB - deepB) * h * (0.4 + nl * 0.6) + foamB * spec) | 0;

          const pi = i * 4;
          data[pi]     = r;
          data[pi + 1] = g;
          data[pi + 2] = b;
          data[pi + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    draw();

    // ── pause when off-screen ─────────────────────────────────────────────────
    const io = new IntersectionObserver(
      ([entry]) => { runRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(iv);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 w-full h-full z-0 ${className}`}
      style={{
        imageRendering: 'pixelated',
        opacity,
        // no blend mode — show raw vivid colors directly
      }}
    />
  );
}
