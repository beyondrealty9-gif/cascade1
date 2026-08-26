"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import cascadeContent from "@/content/cascade.json";

interface HeroVideoProps {
  onOpenEnquiryModal: () => void;
}

export default function HeroVideo({ onOpenEnquiryModal }: HeroVideoProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
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
    <div className="w-full h-screen overflow-hidden bg-slate-100 relative">
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
        className="relative w-full h-screen overflow-hidden flex items-center justify-start bg-slate-100"
      >
        {/* Background Drone Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/swimming-pool.jpg"
            className="object-cover object-center w-full h-full"
          >
            <source src="/videos/drone-hero-valley.mp4" type="video/mp4" />
          </video>
          {/* Light gradient scrim on the left for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 sm:via-white/75 to-transparent lg:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 pt-16 pointer-events-auto">
          <div className="max-w-xl lg:max-w-2xl space-y-6">
            
            {/* Top Eyebrow / Kicker text */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-tight text-slate-700">
              <span>{cascadeContent.project.developer}</span>
              <span>•</span>
              <span className="text-slate-900 font-bold">
                Live Where The River Flows.*
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              Your Next Dream <br />
              Home Awaits <br />
              <span className="text-slate-900">On The Mahanadi</span>
            </h1>

            {/* Subtitle Paragraph Description */}
            <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg pt-1">
              Ultra-luxury 2, 3 & 4 BHK riverside residences at Trisulia, Cuttack
              starting at{" "}
              <span className="font-extrabold text-slate-900">
                {cascadeContent.project.priceStarting}
              </span>
              . 60% open green space, sky amenities, and 100% RERA approval.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Primary DISCOVER Button */}
              <button
                onClick={onOpenEnquiryModal}
                className="px-8 py-3.5 rounded-md bg-[#E05800] hover:bg-[#C74E00] text-white font-extrabold tracking-wider uppercase text-xs shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
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
