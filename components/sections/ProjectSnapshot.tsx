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
      duration: 1.2,
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
    <Home className="w-6 h-6 text-[#002B49] group-hover:text-white transition-colors" key="0" />,
    <Compass className="w-6 h-6 text-[#002B49] group-hover:text-white transition-colors" key="1" />,
    <Sparkles className="w-6 h-6 text-[#002B49] group-hover:text-white transition-colors" key="2" />,
    <Building2 className="w-6 h-6 text-[#002B49] group-hover:text-white transition-colors" key="3" />,
  ];

  // Grid Stagger Container Variants with staggerChildren: 0.12
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // Stat Card Scale + Fade In Variants
  const cardVariants = {
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.88, y: 35 },
    animate: prefersReducedMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        },
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.95 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs uppercase tracking-widest font-extrabold mb-4 shadow-sm"
          >
            <Tag className="w-3.5 h-3.5 text-[#002B49]" />
            <span>PROJECT SNAPSHOT</span>
          </motion.div>

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

        {/* 4 Stat Cards Grid with staggerChildren: 0.12 */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item, idx) => {
            const isHighlighted = idx === 1; // "Open Spaces" card highlighted

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }
                }
                className={`p-8 rounded-2xl bg-white transition-all duration-300 group cursor-pointer ${
                  isHighlighted
                    ? "border-2 border-[#002B49] shadow-lg shadow-[#002B49]/15"
                    : "border border-slate-200 shadow-sm hover:border-[#002B49]/40 hover:shadow-xl"
                }`}
              >
                {/* Pop Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#002B49] group-hover:border-[#002B49]">
                  <div className="transform group-hover:scale-108 transition-transform duration-300">
                    {icons[idx]}
                  </div>
                </div>

                <div className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-1">
                  {item.label}
                </div>

                {/* Value text with Count-Up animation for numeric stats */}
                <div className="font-display text-2xl sm:text-3xl font-black text-slate-900 mb-2 group-hover:text-[#002B49] transition-colors">
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
                  ) : idx === 3 ? (
                    <>
                      B+G+12 (
                      <AnimatedCountUp
                        target={212}
                        start={isSectionInView}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                      {" Units)"}
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
        </motion.div>

      </div>
    </section>
  );
}
