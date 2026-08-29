"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FoldText from "@/components/ui/FoldText";
import cascadeContent from "@/content/cascade.json";

// Hero-only 3D water — lazy loaded, SSR disabled
const RealisticWater3D = dynamic(
  () => import("@/components/effects/RealisticWater3D"),
  { ssr: false }
);

interface HeroVideoProps {
  onOpenEnquiryModal: () => void;
}

export default function HeroVideo({ onOpenEnquiryModal }: HeroVideoProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default true = safe until measured

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
      // Skip expensive WebGL on mobile — real-estate traffic is 70%+ mobile
      const mq = window.matchMedia("(max-width: 768px)");
      setIsMobile(mq.matches);
      const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
  }, []);

  // Entire Hero Section Slide-Up Panel Entrance Variants as ONE solid block
  const sectionVariants = {
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { y: 120, scale: 1.03, opacity: 0 },
    animate: prefersReducedMotion
      ? { opacity: 1 }
      : { y: 0, scale: 1, opacity: 1 },
  };

  return (
    <div className="w-full min-h-[100dvh] overflow-hidden bg-slate-100 relative">
      {/* Entire Hero Section Motion Block */}
      <motion.section
        id="hero"
        initial="initial"
        animate="animate"
        variants={sectionVariants}
        transition={{
          duration: 1.2,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-start bg-slate-100 py-12 sm:py-0"
      >
        {/* Background: static image on mobile, video on desktop — saves 14MB video download on mobile */}
        <div className="absolute inset-0 w-full h-full">
          {isMobile ? (
            <img
              src="/images/swimming-pool.jpg"
              alt="Cascade by Motwani — Riverside Luxury Homes"
              className="object-cover object-center w-full h-full"
              fetchPriority="high"
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/swimming-pool.jpg"
              className="object-cover object-center w-full h-full"
            >
              <source src="/videos/drone-hero-valley.mp4" type="video/mp4" />
            </video>
          )}
          {/* Light gradient scrim for text contrast — desktop view 100% unchanged */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent lg:w-3/5 lg:from-white lg:via-white/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent lg:hidden" />
        </div>

        {/* 3D Water band — desktop only (Three.js is too heavy for mobile GPU/parse budget) */}
        {!prefersReducedMotion && !isMobile && (
          <div className="absolute bottom-0 left-0 right-0 h-[38%] opacity-80 pointer-events-none z-[1]">
            <RealisticWater3D />
          </div>
        )}

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-20 lg:pt-16 pointer-events-auto">
          <div className="max-w-xl lg:max-w-2xl space-y-6">
            
            {/* Top Eyebrow / Kicker text */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-tight text-slate-700">
              <span>{cascadeContent.project.developer}</span>
              <span>•</span>
              <span className="text-slate-900 font-bold">
                Live Where The River Flows.*
              </span>
            </div>

            {/* Headline with 3D FoldText Entrance */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              <FoldText
                text={"Your Next Dream\nHome Awaits\nOn The Mahanadi"}
                splitBy="char"
                hinge="top"
                trigger="mount"
                duration={0.65}
                stagger={0.035}
                ease="power3.out"
                perspective={700}
                creaseShading={0.55}
                color="#0F172A"
                fontWeight={900}
                className="font-display"
              />
            </h1>

            {/* Subtitle Paragraph Description */}
            <div className="font-body text-slate-800 text-sm sm:text-base font-semibold leading-relaxed max-w-lg pt-1 drop-shadow-sm relative z-20 space-y-3">
              <p className="text-slate-800 font-semibold leading-relaxed">
                Ultra-luxury 2, 3 & 4 BHK riverside residences at Trisulia, Cuttack.
              </p>
              
              {/* Block level price badge on mobile to prevent text wrapping into badge */}
              <div className="my-2.5 block sm:inline-block">
                <span className="font-black text-slate-950 bg-[#A4F4F9] px-3.5 py-1.5 rounded-lg border border-[#7DF9FF] shadow-sm text-xs sm:text-sm tracking-wide inline-flex items-center gap-1">
                  {cascadeContent.project.priceStarting}
                </span>
              </div>

              <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                60% open green space, sky amenities, and 100% RERA approval.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Primary DISCOVER Button */}
              <button
                onClick={onOpenEnquiryModal}
                className="px-8 py-3.5 rounded-md bg-[#7DF9FF] hover:bg-[#AFEEEE] text-slate-950 font-black tracking-wider uppercase text-xs shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                DISCOVER
              </button>

              {/* Secondary VIEW MASTER PLAN Button */}
              <a
                href="#masterplan"
                className="px-6 py-3.5 rounded-md bg-white/90 hover:bg-white text-slate-800 font-bold uppercase text-xs tracking-wider border border-slate-300 shadow-sm transition-all"
              >
                VIEW MASTER PLAN
              </a>
            </div>

            {/* Stat Numbers Grid */}
            <div className="pt-6 border-t border-slate-300/70 grid grid-cols-3 gap-4 max-w-md text-slate-900">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-black">
                  28+
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Years Heritage
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-black">
                  60%
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Open Space
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-black">
                  ₹69L*
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Starting Price
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-slate-500 pointer-events-none">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600">
            Scroll Down
          </span>
          <div className="animate-bounce">
            <ChevronDown className="w-4 h-4 text-slate-700" />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
