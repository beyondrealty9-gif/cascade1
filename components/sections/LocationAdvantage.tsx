"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Navigation, TrendingUp, Trees } from "lucide-react";
import cascadeContent from "@/content/cascade.json";
import WaveBackground from "@/components/effects/WaveBackground";
import WaterBubbles from "@/components/effects/WaterBubbles";

export default function LocationAdvantage() {
  const cards = cascadeContent.location.cards;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  const icons = [
    <Navigation className="w-5 h-5 text-[#7DF9FF]" key="0" />,
    <TrendingUp className="w-5 h-5 text-[#7DF9FF]" key="1" />,
    <Trees className="w-5 h-5 text-emerald-600" key="2" />,
  ];

  return (
    <div className="w-full overflow-hidden bg-slate-950">
      {/* 03/11 Clip-Path Reveal Section with Architectural Render Background */}
      <motion.section
        id="location"
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : {
                clipPath: "inset(8% 6% 8% 6% round 24px)",
                opacity: 0,
                scale: 0.96,
              }
        }
        whileInView={
          prefersReducedMotion
            ? { opacity: 1 }
            : {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                opacity: 1,
                scale: 1,
              }
        }
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="py-24 bg-slate-950 relative overflow-hidden border-b border-slate-800 text-white"
      >
        {/* Full-Bleed Architectural Render Background (No Pure Blur - Clear & Vivid) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/location-bg-oat.jpg"
            alt="Terrace OAT Area Day Render"
            fill
            priority
            unoptimized
            className="object-cover opacity-65 brightness-95"
          />
          {/* Subtle gradient scrim overlay for 100% text contrast without heavy blur */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/45 to-slate-950/80" />
        </div>

        {/* Ocean waves rippling across the location render backdrop */}
        <WaveBackground theme="ocean" height={160} position="bottom" />
        <WaterBubbles count={14} color="164,244,249" className="absolute inset-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            
            {/* 1. PRIME STRATEGIC HUB Badge */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.95 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-white text-slate-900 text-xs uppercase tracking-widest font-extrabold mb-4 shadow-lg backdrop-blur-md"
            >
              <MapPin className="w-3.5 h-3.5 text-[#7DF9FF]" />
              <span>PRIME STRATEGIC HUB</span>
            </motion.div>

            {/* 2. Heading */}
            <motion.h2
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-lg"
            >
              {cascadeContent.location.heading}
            </motion.h2>

            {/* 3. Subheading Paragraph */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="font-body text-slate-100 text-base sm:text-lg leading-relaxed drop-shadow-md font-medium"
            >
              {cascadeContent.location.subheading}
            </motion.p>
          </div>

          {/* 4. Staggered 3 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, idx) => {
              const isHighlighted = idx === 1; // Middle card highlighted by default

              return (
                <motion.div
                  key={idx}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.25 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }
                  }
                  className={`p-8 rounded-2xl bg-white/95 border backdrop-blur-md transition-all duration-300 group cursor-pointer text-slate-900 ${
                    isHighlighted
                      ? "border-2 border-[#7DF9FF] shadow-2xl shadow-[#7DF9FF]/30"
                      : "border-white shadow-xl hover:border-[#7DF9FF]/80 hover:shadow-2xl"
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    {/* Icon with Pop-in Micro Animation */}
                    <motion.div
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.35 + idx * 0.12 }}
                      className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-[#7DF9FF]/20 transition-colors"
                    >
                      <div className="transform group-hover:scale-108 transition-transform duration-300">
                        {icons[idx]}
                      </div>
                    </motion.div>

                    <span className="text-[11px] uppercase font-black tracking-wider px-3 py-1 rounded-full bg-[#7DF9FF]/20 text-slate-950 border border-[#7DF9FF]/40">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-extrabold text-slate-900 mb-3 group-hover:text-[#007BA7] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </motion.section>
    </div>
  );
}
