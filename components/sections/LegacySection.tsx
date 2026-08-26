"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Building2, Users } from "lucide-react";
import ScrambledText from "@/components/ui/ScrambledText";
import WaterBubbles from "@/components/effects/WaterBubbles";
import WaveBackground from "@/components/effects/WaveBackground";
import cascadeContent from "@/content/cascade.json";

// Real 3D Water Drop Ripple Engine — canvas height field physics, SSR disabled
const SectionWaterDrop = dynamic(
  () => import("@/components/effects/SectionWaterDrop"),
  { ssr: false }
);

function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={counterRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function LegacySection() {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);

      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );

      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  // Framer Motion Scroll Progress for Outer Container (pin-and-cover range)
  const { scrollYProgress } = useScroll({
    target: outerContainerRef,
    offset: ["start start", "end end"],
  });

  // Drive Trusted Partners section y position from 100vh -> 0vh as user scrolls
  const coverY = useTransform(scrollYProgress, [0, 0.55, 1], ["100vh", "0vh", "0vh"]);
  const coverRadius = useTransform(scrollYProgress, [0, 0.55], ["48px", "0px"]);

  const disablePinCover = isMobile || prefersReducedMotion;

  const partners = [
    { name: "HDFC BANK", tag: "Approved Partner" },
    { name: "SBI HOME LOANS", tag: "State Bank of India" },
    { name: "ICICI BANK", tag: "Preferred Lender" },
    { name: "AXIS BANK", tag: "Financial Ally" },
    { name: "ORERA ODISHA", tag: "Reg: RP/19/2024" },
    { name: "CREDAI ODISHA", tag: "Member Developer" },
  ];

  return (
    <div
      ref={outerContainerRef}
      id="legacy"
      className={`w-full relative bg-white ${
        disablePinCover ? "py-16 sm:py-24" : "min-h-[220vh]"
      }`}
    >
      {/* ========================================================================= */}
      {/* PART A: DARK STATS BANNER SECTION (PINNED STICKY BASE)                  */}
      {/* ========================================================================= */}
      <div
        className={
          disablePinCover
            ? "w-full py-8 bg-slate-950 px-4 sm:px-6 lg:px-8 mb-12"
            : "sticky top-0 h-[85vh] z-[1] overflow-hidden flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8"
        }
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 group">
            <Image
              src="/images/motwani-heritage-banner.png"
              alt="Motwani Constructions - 25 Saal Ka Vishwas"
              width={1200}
              height={550}
              unoptimized
              priority
              className="w-full h-auto object-cover max-h-[75vh]"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PART B: TRUSTED PARTNERS & HERITAGE SECTION (SLIDES UP OVER PINNED BANNER) */}
      {/* ========================================================================= */}
      <motion.div
        style={
          disablePinCover
            ? {}
            : {
                y: coverY,
                borderTopLeftRadius: coverRadius,
                borderTopRightRadius: coverRadius,
              }
        }
        className={
          disablePinCover
            ? "w-full bg-white relative z-[2] px-4 sm:px-6 lg:px-8 overflow-hidden"
            : "relative z-[2] bg-white border-t border-slate-200 shadow-2xl py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        }
      >
        {/* Real 3D Shallow Water Physics Ripple Engine + Floating Bubbles & Waves */}
        <SectionWaterDrop opacity={0.45} />
        <WaterBubbles count={28} color="125,249,255" className="absolute inset-0 z-0 opacity-75" />
        <WaveBackground theme="white" height={160} position="bottom" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top Centered Paragraph with Interactive ScrambledText */}
          <div className="max-w-4xl mx-auto text-center mb-10">
            <ScrambledText
              radius={90}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:!@#$%"
              className="font-body text-slate-700 text-base sm:text-lg leading-relaxed font-normal"
            >
              At Motwani Constructions, we believe in growing together through strong and reliable partnerships. Our trusted financial allies and engineering teams bring years of experience, credibility, and dedication, ensuring every homeowner benefits from the best opportunities in real estate. By working hand in hand with our partners, we deliver value, transparency, and success in every landmark project.
            </ScrambledText>
          </div>

          {/* Centered Heading & Subtitle matching screenshot */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Trusted Real Estate Partners & Heritage
            </h2>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
              Building success together in real estate
            </p>
          </div>

          {/* Partner Logo Grid matching screenshot 1:1 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border border-slate-200 divide-x divide-y sm:divide-y-0 divide-slate-200 bg-slate-50/40 rounded-lg overflow-hidden shadow-sm mb-16">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="p-6 flex flex-col items-center justify-center text-center hover:bg-white transition-colors group cursor-default"
              >
                <span className="font-display font-black text-slate-700 text-lg tracking-widest uppercase group-hover:text-[#007BA7] transition-colors">
                  {partner.name}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                  {partner.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Motwani Trust Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cascadeContent.legacy.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#7DF9FF]/60 transition-all duration-300 shadow-sm hover:shadow-xl group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#7DF9FF] transition-colors">
                  {idx === 0 && <Award className="w-6 h-6 text-[#007BA7] group-hover:text-slate-950 transition-colors" />}
                  {idx === 1 && <Building2 className="w-6 h-6 text-[#007BA7] group-hover:text-slate-950 transition-colors" />}
                  {idx === 2 && <Users className="w-6 h-6 text-[#007BA7] group-hover:text-slate-950 transition-colors" />}
                </div>

                <div className="font-display text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-[#007BA7] transition-colors">
                  <AnimatedCounter end={stat.numeric} suffix={stat.suffix} />
                </div>
                <div className="font-display text-lg font-extrabold text-slate-800 mb-2">{stat.label}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
