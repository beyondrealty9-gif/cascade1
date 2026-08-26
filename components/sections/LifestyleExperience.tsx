"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sun, Wind, Eye, Compass } from "lucide-react";
import cascadeContent from "@/content/cascade.json";

export default function LifestyleExperience() {
  const features = cascadeContent.lifestyle.features || cascadeContent.lifestyle.points || [];
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  const featureIcons = [
    <Sun className="w-5 h-5 text-[#7DF9FF]" key="0" />,
    <Wind className="w-5 h-5 text-[#7DF9FF]" key="1" />,
    <Eye className="w-5 h-5 text-[#7DF9FF]" key="2" />,
    <Compass className="w-5 h-5 text-[#7DF9FF]" key="3" />,
  ];

  return (
    <section id="lifestyle" className="relative py-12 sm:py-20 lg:py-24 overflow-hidden bg-slate-950 text-white border-b border-slate-800 flex items-center min-h-[500px]">
      {/* ANIMATION 2: Black Frame -> Expanding Full-Screen Moving Video Reveal */}
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 1 }
            : { scale: 0.25, borderRadius: "32px", opacity: 0.3 }
        }
        whileInView={
          prefersReducedMotion
            ? { opacity: 1 }
            : { scale: 1, borderRadius: "0px", opacity: 1 }
        }
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full overflow-hidden shadow-2xl"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/terrace-lawn.jpg"
          className="w-full h-full object-cover opacity-100"
        >
          <source src="/videos/balcony-river.mp4" type="video/mp4" />
        </video>
        {/* Subtle scrim for maximum contrast */}
        <div className="absolute inset-0 bg-slate-950/20" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-white text-slate-900 text-xs uppercase tracking-widest font-extrabold mb-6 shadow-lg backdrop-blur-md">
            <Heart className="w-3.5 h-3.5 text-[#7DF9FF]" />
            <span>UNRIVALED LIVING CONCEPT</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
            {cascadeContent.lifestyle.heading}
          </h2>

          <p className="font-body text-white text-lg sm:text-xl font-semibold leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            {cascadeContent.lifestyle.subheading}
          </p>
        </div>

        {/* 4 Emotive Feature Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/90 border border-white backdrop-blur-md shadow-2xl text-left flex flex-col justify-between text-slate-900 hover:bg-white transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
                {featureIcons[idx]}
              </div>
              <h3 className="font-display text-base font-extrabold text-slate-900 leading-snug">
                {feature}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
