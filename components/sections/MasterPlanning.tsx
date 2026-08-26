"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, CheckCircle, ChevronLeft, ChevronRight, Film } from "lucide-react";
import cascadeContent from "@/content/cascade.json";

export default function MasterPlanning() {
  const gallery = cascadeContent.masterplan.gallery; // 13 render items
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const reelTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  const activeItem = gallery[activeIdx] || gallery[0];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % gallery.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Scroll active thumbnail into view inside the film strip track
  useEffect(() => {
    if (reelTrackRef.current) {
      const activeEl = reelTrackRef.current.children[activeIdx] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeIdx]);

  const callouts = [
    "Grand Entrance Plaza with Water Cascade",
    "Podium Sky Deck & Twilight Lawn",
    "Rooftop Multi-Sport Arenas & Chess Court",
    "Double-Height Luxury Air-Conditioned Clubhouse",
  ];

  return (
    <div className="w-full overflow-hidden bg-slate-950 text-white">
      <section id="masterplan" className="py-24 bg-slate-950 relative overflow-hidden border-b border-slate-800">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[#E05800] text-xs uppercase tracking-widest font-extrabold mb-4 shadow-sm backdrop-blur-md">
              <Film className="w-3.5 h-3.5" />
              <span>Cinematic Architectural Gallery (13 Renders)</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              {cascadeContent.masterplan.heading}
            </h2>
            <p className="font-body text-slate-300 text-base sm:text-lg leading-relaxed">
              {cascadeContent.masterplan.subheading}
            </p>
          </div>

          {/* 4 Feature Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {callouts.map((callout, idx) => (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm"
              >
                <CheckCircle className="w-5 h-5 text-[#E05800] shrink-0" />
                <span className="text-xs font-bold text-slate-200">{callout}</span>
              </motion.div>
            ))}
          </div>

          {/* MAIN SPOTLIGHT CINEMA FRAME (Active Render 100% Centered & Un-clipped) */}
          <div className="relative w-full mb-10">
            <motion.div
              key={activeIdx}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full h-[380px] sm:h-[500px] rounded-3xl overflow-hidden border-2 border-[#E05800]/60 shadow-2xl shadow-[#E05800]/20 bg-slate-900 group cursor-pointer"
              onClick={() => setSelectedImage(activeItem.image)}
            >
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-90" />

              {/* Active Badge */}
              <div className="absolute top-6 left-6 font-display font-black text-xs text-white bg-[#E05800] border border-white/20 px-3.5 py-1.5 rounded-full shadow-xl backdrop-blur-md">
                🎬 VIEW {String(activeIdx + 1).padStart(2, "0")} / 13
              </div>

              {/* Maximize Icon */}
              <div className="absolute top-6 right-6 p-3 rounded-full bg-slate-950/80 text-white border border-slate-700 hover:bg-[#E05800] transition-colors shadow-lg">
                <Maximize2 className="w-5 h-5" />
              </div>

              {/* Active Item Description Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white max-w-3xl">
                <span className="text-xs uppercase font-black tracking-widest text-white bg-[#E05800] px-3 py-1 rounded-md mb-3 inline-block shadow-md">
                  {activeItem.category}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white mb-2 tracking-tight">
                  {activeItem.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                  {activeItem.desc}
                </p>
              </div>

              {/* Prev / Next Overlay Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 inset-x-4 flex items-center justify-between pointer-events-none z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="pointer-events-auto p-3.5 rounded-full bg-slate-950/80 border border-slate-700 hover:bg-[#E05800] text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
                  title="Previous Render"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="pointer-events-auto p-3.5 rounded-full bg-slate-950/80 border border-slate-700 hover:bg-[#E05800] text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
                  title="Next Render"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* 🎬 FILM STRIP THUMBNAILS HORIZONTAL REEL (13 Items) */}
          <div className="relative w-full bg-slate-900/60 rounded-2xl p-4 border border-slate-800 border-dashed">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs uppercase tracking-widest font-extrabold text-slate-400">
                Film Strip Track (Click thumbnail to view)
              </span>
              <span className="text-xs font-bold text-[#E05800]">
                {activeIdx + 1} of 13 Selected
              </span>
            </div>

            <div
              ref={reelTrackRef}
              className="flex items-center gap-4 overflow-x-auto scroll-smooth py-2 px-1 scrollbar-thin scrollbar-thumb-slate-700"
            >
              {gallery.map((item, idx) => {
                const isActive = idx === activeIdx;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative shrink-0 rounded-xl overflow-hidden transition-all duration-300 text-left border ${
                      isActive
                        ? "w-40 sm:w-48 h-28 border-2 border-[#E05800] shadow-lg shadow-[#E05800]/30 scale-105 z-10"
                        : "w-32 sm:w-36 h-24 border-slate-800 opacity-60 hover:opacity-100 hover:scale-102"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      sizes="180px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    
                    <span className="absolute top-2 left-2 text-[10px] font-black text-white bg-slate-950/80 px-2 py-0.5 rounded border border-white/20">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <span className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-white truncate">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
            >
              <div className="relative max-w-5xl w-full h-[80vh] rounded-2xl overflow-hidden border border-slate-800 bg-black">
                <Image src={selectedImage} alt="Masterplan Render" fill unoptimized className="object-contain" />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white font-bold bg-slate-800 p-2.5 rounded-full border border-slate-700 hover:bg-slate-700"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
