"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Waves, Wind, Eye } from "lucide-react";
import cascadeContent from "@/content/cascade.json";
import WaveBackground from "@/components/effects/WaveBackground";
import WaterBubbles from "@/components/effects/WaterBubbles";

export default function MahanadiAdvantage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const points = cascadeContent.mahanadi.points;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  // ⭐⭐⭐⭐⭐ Scroll-Driven Video Reveal: video progress follows scroll position 1:1
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Dynamic transforms derived from scroll progress
  const videoScale = useTransform(scrollYProgress, [0, 1], [0.72, 1]);
  const videoRadius = useTransform(scrollYProgress, [0, 1], ["36px", "0px"]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.35, 1]);

  return (
    <div ref={sectionRef} className="w-full overflow-hidden bg-slate-950 relative">
      <motion.section
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -120 }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative py-28 overflow-hidden bg-slate-950 text-white border-b border-slate-800 flex items-center min-h-[90vh]"
      >
        
        {/* ⭐⭐⭐⭐⭐ SCROLL-DRIVEN VIDEO REVEAL CONTAINER */}
        <motion.div
          style={
            prefersReducedMotion
              ? {}
              : {
                  scale: videoScale,
                  borderRadius: videoRadius,
                  opacity: videoOpacity,
                }
          }
          className="absolute inset-0 w-full h-full overflow-hidden shadow-2xl transition-all"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/side-elevation-twilight.jpg"
            className="w-full h-full object-cover opacity-100"
          >
            <source src="/videos/mahanadi-flythrough.mp4" type="video/mp4" />
          </video>
          {/* Subtle left scrim gradient for 100% video visibility + sharp text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-transparent lg:w-1/2" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
        </motion.div>

        {/* Ocean wave + bubbles overlay — on top of video, below text */}
        <WaveBackground theme="ocean" height={180} position="bottom" />
        <WaterBubbles count={18} color="125,249,255" className="absolute inset-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Text Content with Staggered Reveal */}
            <div>
              {/* Badge */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7DF9FF]/20 border border-[#7DF9FF]/40 text-[#7DF9FF] text-xs uppercase tracking-widest font-extrabold mb-4 backdrop-blur-md"
              >
                <Waves className="w-3.5 h-3.5 text-[#7DF9FF]" />
                <span>Exclusive Waterfront Living</span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight drop-shadow-lg"
              >
                {cascadeContent.mahanadi.heading}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="font-body text-slate-200 text-base sm:text-lg leading-relaxed mb-8"
              >
                {cascadeContent.mahanadi.subheading}
              </motion.p>

              {/* 4 Feature Points Cascade */}
              <div className="space-y-4">
                {points.map((point, idx) => (
                  <motion.div
                    key={idx}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.25 + idx * 0.1, ease: "easeOut" }}
                    whileHover={prefersReducedMotion ? {} : { x: 6 }}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-md shadow-md hover:border-[#7DF9FF]/60 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#7DF9FF] shrink-0 mt-0.5" />
                    <span className="text-white text-sm font-bold">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Visual Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.95 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={prefersReducedMotion ? {} : { y: -6 }}
                className="p-6 rounded-2xl bg-white/95 border border-white backdrop-blur-md shadow-xl text-slate-900 transition-transform"
              >
                <Eye className="w-8 h-8 text-[#7DF9FF] mb-4" />
                <h3 className="font-display text-lg font-extrabold text-slate-900 mb-2">Unmatched Horizons</h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  Enjoy endless views of water and sky from your private wide balcony.
                </p>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.95 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={prefersReducedMotion ? {} : { y: -6 }}
                className="p-6 rounded-2xl bg-white/95 border border-white backdrop-blur-md shadow-xl text-slate-900 transition-transform"
              >
                <Wind className="w-8 h-8 text-river-600 mb-4" />
                <h3 className="font-display text-lg font-extrabold text-slate-900 mb-2">Perpetual Microclimate</h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  Cool river breezes keep the ambient temperature significantly lower year-round.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.section>
    </div>
  );
}
