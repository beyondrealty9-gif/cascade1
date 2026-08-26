'use client';

import { useEffect, useRef } from 'react';

/**
 * PreloaderWater
 * --------------
 * Canvas-based pseudo-3D water drop ripple effect for the preloader screen.
 * Uses height-field simulation (shallow water equations) to produce realistic
 * concentric ripples that spread, bounce off edges, and interact with each other.
 *
 * No WebGL / Three.js needed — the 3D illusion comes from normal-mapped
 * shading on a 2D height field computed in a typed Float32Array.
 *
 * Performance: runs on one offscreen Float32Array buffer pair (~180×180 floats).
 * Pauses automatically when canvas unmounts.
 */
export default function PreloaderWater({ className = '' }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // --- setup ---------------------------------------------------------------
    const W = 320;
    const H = 320;
    canvas.width = W;
    canvas.height = H;

    // Height-field buffers A (current) and B (previous)
    let bufA = new Float32Array(W * H);
    let bufB = new Float32Array(W * H);
    const img = ctx.createImageData(W, H);

    // damping (0.97 = slight energy loss per tick)
    const DAMP = 0.971;

    // --- drop factory --------------------------------------------------------
    const drop = (x, y, radius = 12, strength = 180) => {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius) {
            const px = Math.round(x + dx);
            const py = Math.round(y + dy);
            if (px > 0 && px < W - 1 && py > 0 && py < H - 1) {
              bufA[py * W + px] += strength * (1 - dist / radius);
            }
          }
        }
      }
    };

    // --- initial drops -------------------------------------------------------
    drop(W * 0.5, H * 0.5, 18, 220);
    setTimeout(() => drop(W * 0.3, H * 0.65, 10, 160), 700);
    setTimeout(() => drop(W * 0.72, H * 0.35, 13, 180), 1400);
    setTimeout(() => drop(W * 0.2, H * 0.3, 8, 140), 2200);
    setTimeout(() => drop(W * 0.8, H * 0.75, 11, 170), 3100);

    // random ambient drops every 900ms
    const dropInterval = setInterval(() => {
      const x = 30 + Math.random() * (W - 60);
      const y = 30 + Math.random() * (H - 60);
      drop(x, y, 6 + Math.random() * 8, 80 + Math.random() * 100);
    }, 900);

    // --- Electric Blue / Turquoise palette -----------------------------------
    // Deep: #020617 (slate-950), Surface: #7DF9FF (Electric Blue)
    const deepR = 2,   deepG = 6,   deepB = 23;    // slate-950
    const surfR = 125, surfG = 249, surfB = 255;    // #7DF9FF
    const foamR = 224, foamG = 255, foamB = 255;    // #E0FFFF

    // --- render loop ---------------------------------------------------------
    let tick = 0;
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      tick++;

      // ---- height-field propagation (shallow water eq.) ----
      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          const i = y * W + x;
          const next =
            (bufA[i - 1] + bufA[i + 1] + bufA[i - W] + bufA[i + W]) / 2 -
            bufB[i];
          bufB[i] = next * DAMP;
        }
      }

      // swap buffers
      const tmp = bufA; bufA = bufB; bufB = tmp;

      // ---- shade pixels from height field (fake normal map) ----
      const data = img.data;
      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          const i = y * W + x;

          // surface normal approximation
          const dX = (bufA[i - 1] - bufA[i + 1]);
          const dY = (bufA[i - W] - bufA[i + W]);

          // light vector (top-left sun, gives a natural wet-surface feel)
          const lightX = 0.6;
          const lightY = -0.8;
          const lightZ = 1.5;
          const len = Math.sqrt(lightX * lightX + lightY * lightY + lightZ * lightZ);

          // dot-product shading
          const nx = dX * 0.012;
          const ny = dY * 0.012;
          const nz = 1.0;
          const nl = Math.max(0, (nx * lightX + ny * lightY + nz * lightZ) / len);

          // specular (Phong)
          const spec = Math.pow(nl, 28) * 0.9;

          // height-to-colour blend (depth cue)
          const h = Math.min(1, Math.max(0, bufA[i] / 120 + 0.5));

          const r = Math.min(255, deepR + (surfR - deepR) * h * nl + foamR * spec) | 0;
          const g = Math.min(255, deepG + (surfG - deepG) * h * nl + foamG * spec) | 0;
          const b = Math.min(255, deepB + (surfB - deepB) * h * nl + foamB * spec) | 0;

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

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(dropInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
