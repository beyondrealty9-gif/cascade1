"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const DISPLAY_DURATION = 5000; // 5 seconds
const REDUCED_MOTION_DURATION = 2000; // shorter for accessibility

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Only show once per session
    const hasSeenLoader = sessionStorage.getItem("cascade_loader_seen");
    if (hasSeenLoader) {
      setIsVisible(false);
      setShouldRender(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const duration = shouldReduceMotion ? REDUCED_MOTION_DURATION : DISPLAY_DURATION;

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
          initial={{ y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 text-white selection:bg-none"
        >
          {/* Ambient Brand Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#E05800]/10 blur-3xl pointer-events-none" />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#007BA7]/10 blur-3xl pointer-events-none" />

          {/* Logo / Brand mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center flex flex-col items-center px-4"
          >
            <div className="p-3.5 bg-white rounded-2xl shadow-2xl border border-slate-800 mb-6 inline-flex items-center justify-center">
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

            <p className="text-slate-300 font-extrabold tracking-[0.3em] text-xs sm:text-sm uppercase font-display">
              CODENAME <span className="text-[#E05800]">CASCADE</span>
            </p>
            <p className="text-slate-400 tracking-[0.25em] text-[10px] sm:text-xs uppercase mt-2 font-medium">
              LIVE WHERE THE RIVER FLOWS
            </p>
          </motion.div>

          {/* Loading progress bar */}
          <div className="absolute bottom-16 w-56 sm:w-72 h-[3px] bg-slate-800 overflow-hidden rounded-full shadow-inner">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: (shouldReduceMotion ? REDUCED_MOTION_DURATION : DISPLAY_DURATION) / 1000,
                ease: "linear",
              }}
              className="h-full bg-gradient-to-r from-[#007BA7] via-[#E05800] to-amber-500 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
