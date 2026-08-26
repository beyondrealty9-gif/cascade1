"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Users, Sun, Coffee, Sparkles } from "lucide-react";
import cascadeContent from "@/content/cascade.json";
import WaveBackground from "@/components/effects/WaveBackground";

export default function Amenities() {
  const categories = cascadeContent.amenities.categories;
  const [activeTab, setActiveTab] = useState(categories[0].id);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  const categoryIcons: Record<string, React.ReactNode> = {
    wellness: <Dumbbell className="w-4 h-4" />,
    family: <Users className="w-4 h-4" />,
    outdoor: <Sun className="w-4 h-4" />,
    community: <Coffee className="w-4 h-4" />,
  };

  const currentCategory =
    categories.find((cat) => cat.id === activeTab) || categories[0];

  return (
    <div className="w-full overflow-hidden bg-white">
      <motion.section
        id="amenities"
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 60 }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="py-12 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-200"
      >
        {/* White-theme wave — decorative bottom watermark */}
        <WaveBackground theme="white" height={140} position="bottom" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs uppercase tracking-widest font-extrabold mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#7DF9FF]" />
              <span>25+ World-Class Amenities</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              {cascadeContent.amenities.heading}
            </h2>
            <p className="font-body text-slate-600 text-base sm:text-lg leading-relaxed">
              {cascadeContent.amenities.subheading}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-[#7DF9FF] text-slate-950 shadow-md shadow-[#7DF9FF]/30 scale-105"
                      : "bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  {categoryIcons[cat.id]}
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Amenity Cards Grid with Spiral Path Entrance -> Settle into Grid Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {currentCategory.items.map((item, idx) => {
                // Calculate Spiral Path offset parameters for each image card
                const angle = idx * 1.35 - 1.2;
                const radius = 180;
                const initialX = Math.cos(angle) * radius;
                const initialY = Math.sin(angle) * radius + 60;
                const initialRotate = idx * 18 - 25;

                return (
                  <motion.div
                    key={item.name}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : {
                            x: initialX,
                            y: initialY,
                            rotate: initialRotate,
                            scale: 0.55,
                            opacity: 0,
                          }
                    }
                    whileInView={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : {
                            x: 0,
                            y: 0,
                            rotate: 0,
                            scale: 1,
                            opacity: 1,
                          }
                    }
                    viewport={{ once: false, amount: 0.15 }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }}
                    transition={{
                      duration: 0.9,
                      delay: prefersReducedMotion ? 0 : idx * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }
                    }
                    className="group relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 hover:border-[#7DF9FF]/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col cursor-pointer"
                  >
                    {/* Card Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Card Copy */}
                    <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <h3 className="font-display font-extrabold text-slate-900 text-base mb-1 group-hover:text-[#007BA7] transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

        </div>
      </motion.section>
    </div>
  );
}
