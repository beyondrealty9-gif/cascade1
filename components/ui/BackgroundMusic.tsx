"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BackgroundMusic
 * ───────────────
 * Plays "CASCADE BGM.mp3" as a looping ambient background track.
 *
 * Browser autoplay policy: browsers block audio autoplay until the user
 * has interacted with the page. We handle this correctly by:
 *  1. Rendering the <audio> element muted + paused by default.
 *  2. On the user's FIRST interaction (scroll, click, keydown), we attempt
 *     to unmute + play automatically — giving a "music just started" feel.
 *  3. The floating icon always lets the user manually toggle on / off.
 *
 * Position: fixed bottom-left, so it doesn't clash with BackToTop (bottom-right).
 */
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // ── Attempt autoplay on first user interaction ──────────────────────────
  useEffect(() => {
    const tryAutoplay = async () => {
      if (hasInteracted) return;
      setHasInteracted(true);
      const audio = audioRef.current;
      if (!audio) return;
      try {
        audio.volume = 0.35;
        await audio.play();
        setIsPlaying(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch {
        // Autoplay blocked — user will see the icon and can click manually
      }
    };

    const events = ["scroll", "click", "keydown", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, tryAutoplay, { once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, tryAutoplay));
  }, [hasInteracted]);

  // ── Manual toggle ────────────────────────────────────────────────────────
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        audio.volume = 0.35;
        await audio.play();
        setIsPlaying(true);
      } catch {
        /* blocked */
      }
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/cascade-bgm.mp3"
        loop
        preload="none"
      />

      {/* Toast notification when music auto-starts */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: -24, y: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-24 left-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-950/90 border border-[#7DF9FF]/30 backdrop-blur-md shadow-2xl text-white text-xs font-semibold pointer-events-none select-none"
          >
            <span className="text-base">🎵</span>
            <span className="text-slate-200">Ambient music playing</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating music toggle button — bottom-left */}
      <motion.button
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
        onClick={toggle}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
        title={isPlaying ? "Music: ON — click to mute" : "Music: OFF — click to play"}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-xl border transition-all duration-300 group"
        style={{
          background: isPlaying
            ? "linear-gradient(135deg, #0f172a 60%, #164e63)"
            : "linear-gradient(135deg, #1e293b 60%, #0f172a)",
          borderColor: isPlaying ? "rgba(125,249,255,0.5)" : "rgba(148,163,184,0.3)",
          boxShadow: isPlaying
            ? "0 0 18px rgba(125,249,255,0.35), 0 4px 20px rgba(0,0,0,0.5)"
            : "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        {/* Animated vinyl / sound waves */}
        {isPlaying ? (
          <SoundWaveIcon />
        ) : (
          <MuteIcon />
        )}

        {/* Pulsing ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[#7DF9FF]/40 animate-ping opacity-60 pointer-events-none" />
        )}
      </motion.button>
    </>
  );
}

// ── Sound wave SVG (playing state) ──────────────────────────────────────────
function SoundWaveIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="text-[#7DF9FF]"
    >
      {/* Bar 1 — short */}
      <motion.rect
        x="2" y="10" width="3" height="4" rx="1.5"
        fill="currentColor"
        animate={{ scaleY: [1, 2.2, 0.8, 1.6, 1] }}
        transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
        style={{ originY: "50%", transformOrigin: "center" }}
      />
      {/* Bar 2 — tall */}
      <motion.rect
        x="7" y="6" width="3" height="12" rx="1.5"
        fill="currentColor"
        animate={{ scaleY: [1, 0.5, 2, 0.7, 1] }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.15 }}
        style={{ originY: "50%", transformOrigin: "center" }}
      />
      {/* Bar 3 — medium */}
      <motion.rect
        x="12" y="8" width="3" height="8" rx="1.5"
        fill="currentColor"
        animate={{ scaleY: [1, 1.8, 0.6, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut", delay: 0.3 }}
        style={{ originY: "50%", transformOrigin: "center" }}
      />
      {/* Bar 4 — short */}
      <motion.rect
        x="17" y="11" width="3" height="2" rx="1"
        fill="currentColor"
        animate={{ scaleY: [1, 3, 1, 2.5, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.45 }}
        style={{ originY: "50%", transformOrigin: "center" }}
      />
    </svg>
  );
}

// ── Muted icon ───────────────────────────────────────────────────────────────
function MuteIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(148,163,184,0.8)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}
