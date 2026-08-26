"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Home, Compass, Sparkles, Building2, Tag } from "lucide-react";
import cascadeContent from "@/content/cascade.json";

function AnimatedCountUp({
  target,
  start = false,
  prefersReducedMotion = false,
}: {
  target: number;
  start: boolean;
  prefersReducedMotion?: boolean;
}) {
  const [displayVal, setDisplayVal] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!start || prefersReducedMotion) {
      if (prefersReducedMotion) setDisplayVal(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayVal(Math.round(latest)),
    });

    return () => controls.stop();
  }, [target, start, prefersReducedMotion]);

  return <span>{displayVal}</span>;
}

export default function ProjectSnapshot() {
  const items = cascadeContent.snapshot.items;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  const icons = [
    <Home className="w-6 h-6 text-[#E05800]" key="0" />,
    <Compass className="w-6 h-6 text-river-600" key="1" />,
    <Sparkles className="w-6 h-6 text-amber-500" key="2" />,
    <Building2 className="w-6 h-6 text-[#E05800]" key="3" />,
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          
          {/* Step 1: Badge */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.95 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs uppercase tracking-widest font-extrabold mb-4 shadow-sm"
          >
            <Tag className="w-3.5 h-3.5 text-[#E05800]" />
            <span>PROJECT SNAPSHOT</span>
          </motion.div>

          {/* Step 2: Heading */}
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            {cascadeContent.snapshot.heading}
          </motion.h2>
        </div>

        {/* Step 3: Staggered 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const isHighlighted = idx === 1; // "Open Spaces" card highlighted

            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.96 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.2 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }
                }
                className={`p-8 rounded-2xl bg-white transition-all duration-300 group cursor-pointer ${
                  isHighlighted
                    ? "border-2 border-river-500 shadow-lg shadow-river-500/10 animate-pulse-glow-border"
                    : "border border-slate-200 shadow-sm hover:border-[#E05800]/40 hover:shadow-xl"
                }`}
              >
                {/* Step 3b: Spring Pop Icon */}
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.3 + idx * 0.12 }}
                  className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                >
                  <div className="transform group-hover:scale-108 transition-transform duration-300">
                    {icons[idx]}
                  </div>
                </motion.div>

                <div className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-1">
                  {item.label}
                </div>

                {/* Step 4: Value text with Count-Up animation for numeric stats */}
                <div className="font-display text-2xl sm:text-3xl font-black text-slate-900 mb-2 group-hover:text-[#E05800] transition-colors">
                  {idx === 1 ? (
                    <>
                      <AnimatedCountUp
                        target={60}
                        start={isSectionInView}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                      % Greenery
                    </>
                  ) : idx === 2 ? (
                    <>
                      ₹
                      <AnimatedCountUp
                        target={69}
                        start={isSectionInView}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                      {" Lakhs*"}
                    </>
                  ) : (
                    item.value
                  )}
                </div>

                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  {item.detail}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
