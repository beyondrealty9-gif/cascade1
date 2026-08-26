"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation, Clock, MapPin, Hospital, GraduationCap, Laptop, Trophy, Store, Building } from "lucide-react";
import cascadeContent from "@/content/cascade.json";

export default function ConnectivityMap() {
  const destinations = cascadeContent.connectivity.destinations;
  const [activeIdx, setActiveIdx] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  const icons = [
    <Hospital className="w-5 h-5" key="0" />,
    <Trophy className="w-5 h-5" key="1" />,
    <Laptop className="w-5 h-5" key="2" />,
    <GraduationCap className="w-5 h-5" key="3" />,
    <Store className="w-5 h-5" key="4" />,
    <Building className="w-5 h-5" key="5" />,
  ];

  // Calculated coordinates for 6 radial orbit positions relative to center (250, 225)
  const angles = [0, 60, 120, 180, 240, 300];
  const radii = [100, 140, 160, 175, 180, 185];

  const orbitPositions = destinations.map((_, idx) => {
    const angle = angles[idx];
    const rad = (angle * Math.PI) / 180;
    const targetX = Math.cos(rad) * radii[idx];
    const targetY = Math.sin(rad) * radii[idx];
    return { targetX, targetY };
  });

  return (
    <div className="w-full overflow-hidden bg-white">
      <section id="connectivity" className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.95 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs uppercase tracking-widest font-extrabold mb-4 shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5 text-[#007BA7]" />
              <span>Strategic Distance Radar</span>
            </motion.div>

            <motion.h2
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4"
            >
              {cascadeContent.connectivity.heading}
            </motion.h2>

            <motion.p
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="font-body text-slate-600 text-base sm:text-lg leading-relaxed"
            >
              {cascadeContent.connectivity.subheading}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Radial Radar Hub (SLIDE LEFT ENTRANCE + SVG RADIAL LINE DRAWING) */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -80 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden"
            >
              <div className="relative h-[380px] sm:h-[450px] w-full flex items-center justify-center">
                
                {/* SVG SVG PATHLENGTH ANIMATED CONNECTING RADAR LINES (0 -> 1) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 500 450"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {destinations.map((_, idx) => {
                    const pos = orbitPositions[idx];
                    // Center of 500x450 viewBox is (250, 225)
                    const x2 = 250 + pos.targetX;
                    const y2 = 225 + pos.targetY;
                    const isActive = activeIdx === idx;

                    return (
                      <motion.line
                        key={idx}
                        x1="250"
                        y1="225"
                        x2={x2}
                        y2={y2}
                        stroke={isActive ? "#E05800" : "#007BA7"}
                        strokeWidth={isActive ? "2.5" : "1.5"}
                        strokeDasharray="4 4"
                        initial={
                          prefersReducedMotion
                            ? { pathLength: 1, opacity: 1 }
                            : { pathLength: 0, opacity: 0 }
                        }
                        whileInView={
                          prefersReducedMotion
                            ? { pathLength: 1, opacity: 1 }
                            : { pathLength: 1, opacity: 0.85 }
                        }
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{
                          duration: 0.8,
                          delay: prefersReducedMotion ? 0 : 0.15 + idx * 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    );
                  })}
                </svg>

                {/* Central Project Hub ("Cascade" Node) */}
                <div className="absolute z-20 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#E05800] p-1 shadow-lg shadow-[#E05800]/30 animate-pulse">
                    <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center text-center p-2">
                      <MapPin className="w-6 h-6 text-[#E05800]" />
                      <span className="text-[9px] font-black uppercase text-slate-900 leading-tight">Cascade</span>
                    </div>
                  </div>
                </div>

                {/* Concentric Distance Rings with Pulsing Motion */}
                <motion.div
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.03, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-[180px] h-[180px] rounded-full border border-slate-300 pointer-events-none"
                />
                <motion.div
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.02, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute w-[280px] h-[280px] rounded-full border border-slate-300/60 pointer-events-none"
                />
                <div className="absolute w-[380px] h-[380px] rounded-full border border-slate-200 pointer-events-none" />

                {/* Radial Orbit Markers */}
                {destinations.map((dest, idx) => {
                  const pos = orbitPositions[idx];
                  const isActive = activeIdx === idx;

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, x: 0, y: 0, scale: 0.5 }
                      }
                      whileInView={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : {
                              opacity: 1,
                              x: pos.targetX,
                              y: pos.targetY,
                              scale: isActive ? 1.15 : 1,
                            }
                      }
                      animate={{
                        x: pos.targetX,
                        y: pos.targetY,
                        scale: isActive ? 1.15 : 1,
                      }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{
                        duration: 0.8,
                        delay: prefersReducedMotion ? 0 : 0.2 + idx * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ scale: isActive ? 1.2 : 1.1 }}
                      className={`absolute z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black shadow-md transition-colors ${
                        isActive
                          ? "bg-[#E05800] text-white shadow-lg shadow-[#E05800]/40 border-2 border-white"
                          : "bg-white border border-slate-200 text-slate-700 hover:border-[#E05800] hover:text-slate-900"
                      }`}
                    >
                      <span className="shrink-0">{icons[idx]}</span>
                      <span className="hidden sm:inline whitespace-nowrap">{dest.time}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Destination Detail Cards List (SYNCED STAGGERED FADE-UP) */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 80 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-3"
            >
              {destinations.map((dest, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <motion.div
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 25, x: 30 }
                    }
                    whileInView={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0, x: 0 }
                    }
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                      duration: 0.55,
                      delay: prefersReducedMotion ? 0 : 0.25 + idx * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={prefersReducedMotion ? {} : { x: 8 }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "bg-white border-2 border-[#E05800] shadow-md translate-x-2"
                        : "bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive ? "bg-[#E05800] text-white" : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {icons[idx]}
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-black text-slate-400">{dest.type}</div>
                        <h4 className="font-display font-extrabold text-slate-900 text-sm sm:text-base">{dest.name}</h4>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1 text-[#E05800] font-extrabold text-sm">
                        <Clock className="w-3.5 h-3.5" />
                        {dest.time}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500">{dest.distance}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
