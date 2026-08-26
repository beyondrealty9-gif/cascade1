"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Water drop ripple — canvas only, no SSR needed
const PreloaderWater = dynamic(
  () => import("@/components/effects/PreloaderWater"),
  { ssr: false }
);

const DISPLAY_DURATION = 5000;
const REDUCED_MOTION_DURATION = 2000;

// Floating particle specs (purely decorative)
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${8 + Math.round(((i * 73) % 84))}%`,
  y: `${5 + Math.round(((i * 47) % 90))}%`,
  size: 2 + (i % 4),
  delay: (i * 0.18) % 2.5,
  duration: 3 + (i % 3),
}));

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("cascade_loader_seen");
    if (hasSeenLoader) {
      setIsVisible(false);
      setShouldRender(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const duration = shouldReduceMotion ? REDUCED_MOTION_DURATION : DISPLAY_DURATION;

    // Smooth progress counter
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("cascade_loader_seen", "true");
      document.body.style.overflow = "";
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [shouldReduceMotion]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence onExitComplete={() => setShouldRender(false)}>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { y: "-100%", opacity: 0 }
          }
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden select-none"
        >

          {/* ── 1. 3D WATER DROP RIPPLE — fills the whole background ── */}
          {!shouldReduceMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <PreloaderWater className="w-full h-full absolute inset-0 opacity-60" />
            </motion.div>
          )}

          {/* ── 3. LARGE AMBIENT GLOW ORBS (electric blue radials) ── */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : { scale: [1, 1.18, 1], opacity: [0.18, 0.32, 0.18] }
            }
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[520px] h-[520px] rounded-full bg-[#7DF9FF]/15 blur-[80px] pointer-events-none"
          />
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : { scale: [1, 1.12, 1], opacity: [0.12, 0.22, 0.12] }
            }
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute w-[380px] h-[380px] rounded-full bg-[#AFEEEE]/12 blur-[60px] pointer-events-none"
          />

          {/* ── 4. FLOATING PARTICLES ── */}
          {!shouldReduceMotion &&
            PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-[#7DF9FF] pointer-events-none"
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 0.7, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* ── 5. RIPPLE RING PULSES ── */}
          {!shouldReduceMotion && (
            <div className="absolute pointer-events-none flex items-center justify-center inset-0">
              {[0, 0.6, 1.2].map((delay, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-[#7DF9FF]/25"
                  animate={{
                    width: ["120px", "500px"],
                    height: ["120px", "500px"],
                    opacity: [0.55, 0],
                  }}
                  transition={{
                    duration: 3.2,
                    delay,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}

          {/* ── 6. CENTRAL CONTENT ── */}
          <div className="relative z-10 flex flex-col items-center gap-5 px-6">

            {/* Logo card with a water-shimmer shimmer border */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Animated glow ring around logo */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : { rotate: 360 }
                }
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#7DF9FF] via-[#AFEEEE] to-[#A4F4F9] opacity-60 blur-sm"
              />
              <div className="relative p-3.5 bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 inline-flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Motwani Constructions - Cascade"
                  width={220}
                  height={56}
                  priority
                  unoptimized
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Brand text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="text-center"
            >
              <p className="text-slate-300 font-extrabold tracking-[0.3em] text-xs sm:text-sm uppercase font-display">
                CODENAME{" "}
                <motion.span
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          textShadow: [
                            "0 0 8px #7DF9FF44",
                            "0 0 24px #7DF9FFcc",
                            "0 0 8px #7DF9FF44",
                          ],
                        }
                  }
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[#7DF9FF]"
                >
                  CASCADE
                </motion.span>
              </p>
              <p className="text-slate-500 tracking-[0.25em] text-[10px] sm:text-xs uppercase mt-1.5 font-medium">
                LIVE WHERE THE RIVER FLOWS
              </p>
            </motion.div>

            {/* Animated water-drop icon */}
            {!shouldReduceMotion && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.55, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center gap-2 mt-1"
              >
                {/* Drop SVG */}
                <motion.svg
                  viewBox="0 0 32 40"
                  className="w-8 h-10 drop-shadow-[0_0_8px_#7DF9FF]"
                  animate={{ y: [0, -6, 0], scaleY: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path
                    d="M16 2 C16 2, 3 18, 3 26 A13 13 0 0 0 29 26 C29 18, 16 2, 16 2Z"
                    fill="url(#dropGrad)"
                    stroke="#7DF9FF"
                    strokeWidth="0.8"
                    strokeOpacity="0.6"
                  />
                  {/* inner highlight */}
                  <path
                    d="M12 22 Q14 16 16 14"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7DF9FF" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* splash rings under drop */}
                <motion.div
                  className="w-6 h-1.5 rounded-full border border-[#7DF9FF]/50"
                  animate={{ scaleX: [0.6, 1.4, 0.6], opacity: [0.8, 0.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            )}
          </div>

          {/* ── 7. PROGRESS BAR ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 flex flex-col items-center gap-3 w-64 sm:w-80"
          >
            {/* percentage text */}
            <div className="flex items-center justify-between w-full px-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                Loading Experience
              </span>
              <motion.span
                className="text-[10px] font-black tabular-nums text-[#7DF9FF]"
              >
                {progress}%
              </motion.span>
            </div>

            {/* track */}
            <div className="w-full h-[3px] bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration:
                    (shouldReduceMotion
                      ? REDUCED_MOTION_DURATION
                      : DISPLAY_DURATION) / 1000,
                  ease: "linear",
                }}
                className="h-full rounded-full bg-gradient-to-r from-[#7DF9FF] via-[#A4F4F9] to-[#AFEEEE] relative"
              >
                {/* glowing leading edge */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white blur-[2px] opacity-80" />
              </motion.div>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
