"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Building2, Users } from "lucide-react";
import ScrambledText from "@/components/ui/ScrambledText";
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
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to true for mobile-first safety
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Framer Motion Scroll Progress for Outer Container (pin-and-cover range on Desktop only)
  const { scrollYProgress } = useScroll({
    target: outerContainerRef,
    offset: ["start start", "end end"],
  });

  // Drive Trusted Partners section y position from 100vh -> 0vh as user scrolls (Desktop only)
  const coverY = useTransform(scrollYProgress, [0, 0.55, 1], ["100vh", "0vh", "0vh"]);
  const coverRadius = useTransform(scrollYProgress, [0, 0.55], ["48px", "0px"]);

  // Enable sticky pin-cover ONLY on desktop (mounted && !isMobile && !prefersReducedMotion)
  const enablePinCover = mounted && !isMobile && !prefersReducedMotion;

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
        enablePinCover ? "min-h-[220vh]" : "py-12 sm:py-20 lg:py-24"
      }`}
    >
      {/* ========================================================================= */}
      {/* PART A: DARK STATS BANNER SECTION (DESKTOP PINNED STICKY BASE / MOBILE NORMAL) */}
      {/* ========================================================================= */}
      <div
        className={
          enablePinCover
            ? "sticky top-0 h-[85vh] z-[1] overflow-hidden flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8"
            : "w-full py-6 sm:py-10 bg-slate-950 px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12"
        }
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* ── Cinematic Video Reveal Card ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 32 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)] border border-white/10 bg-black"
            style={{ aspectRatio: "16/7" }}
          >
            {/* ── Video layer ── */}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/images/motwani-heritage-banner.png"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/riverside-heritage.mp4" type="video/mp4" />
            </video>

            {/* ── Multi-directional dark vignette ── */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50 pointer-events-none" />

            {/* ── Film-grain texture overlay ── */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
                backgroundSize: "180px",
              }}
            />

            {/* ── TOP-LEFT: Brand Heritage Badge ── */}
            <div className="absolute top-4 left-5 sm:top-6 sm:left-8 flex items-center gap-2 z-10">
              <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 backdrop-blur-sm">
                <span className="text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
                  Since 1999 · Odisha&apos;s Most Trusted
                </span>
              </div>
            </div>

            {/* ── TOP-RIGHT: RERA Badge ── */}
            <div className="absolute top-4 right-5 sm:top-6 sm:right-8 z-10">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-right">
                <p className="text-white/50 text-[9px] uppercase tracking-widest">RERA Approved</p>
                <p className="text-white text-[11px] sm:text-xs font-black tracking-wide">RP/19/2024/CASCADE</p>
              </div>
            </div>

            {/* ── CENTER-LEFT: Hero Title Block ── */}
            <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8 lg:px-14 z-10 max-w-full sm:max-w-[65%]">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-amber-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-2 sm:mb-3"
              >
                Motwani Constructions
              </motion.p>

              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2
                  className="font-display font-black leading-none tracking-tight text-white mb-1 sm:mb-2"
                  style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
                >
                  <span className="text-amber-400">25</span> Saal
                </h2>
                <h2
                  className="font-display font-black leading-none tracking-tight text-white"
                  style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
                >
                  <span className="italic text-white/70">ka</span>{" "}
                  <span className="text-white">Vishwas</span>
                </h2>
              </motion.div>

              {/* Divider line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-3 sm:mt-5 h-[2px] w-16 sm:w-24 bg-gradient-to-r from-amber-400 to-amber-400/0 origin-left"
              />

              {/* ── Animated Stats Row ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.85, duration: 0.7 }}
                className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 sm:gap-x-6"
              >
                {[
                  { num: 4500,  suf: "+", label: "Homes" },
                  { num: 48,    suf: "+", label: "Projects" },
                  { num: 27000, suf: "+", label: "Lives Touched" },
                  { num: 55,    suf: " L", label: "Sq.ft Completed" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-display font-black text-white text-xl sm:text-2xl lg:text-3xl leading-none">
                      <AnimatedCounter end={s.num} suffix={s.suf} duration={2200} />
                    </span>
                    <span className="text-white/50 text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold mt-0.5">
                      {s.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── BOTTOM: Cinematic letterbox bars ── */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400/0 via-amber-400/60 to-amber-400/0 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-white/0 via-white/20 to-white/0 pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PART B: TRUSTED PARTNERS & HERITAGE SECTION (SLIDES UP ON DESKTOP / STACKS ON MOBILE) */}
      {/* ========================================================================= */}
      <motion.div
        style={
          enablePinCover
            ? {
                y: coverY,
                borderTopLeftRadius: coverRadius,
                borderTopRightRadius: coverRadius,
              }
            : {}
        }
        className={
          enablePinCover
            ? "relative z-[2] bg-white border-t border-slate-200 shadow-2xl py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
            : "w-full bg-white relative z-[2] px-4 sm:px-6 lg:px-8 py-8 sm:py-16"
        }
      >
        {/* Real 3D Shallow Water Physics Ripple Engine & Wave Background */}
        <SectionWaterDrop opacity={0.45} />
        <WaveBackground theme="white" height={160} position="bottom" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top Centered Paragraph inside a High-Contrast Card Container */}
          <div className="max-w-3xl mx-auto text-center mb-12 p-6 sm:p-8 rounded-2xl bg-white/95 border border-slate-200 shadow-md backdrop-blur-md">
            <ScrambledText
              radius={90}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:!@#$%"
              className="font-body text-slate-900 text-sm sm:text-base leading-relaxed font-semibold"
            >
              At Motwani Constructions, we believe in growing together through strong and reliable partnerships. Our trusted financial allies and engineering teams bring years of experience, credibility, and dedication, ensuring every homeowner benefits from the best opportunities in real estate. By working hand in hand with our partners, we deliver value, transparency, and success in every landmark project.
            </ScrambledText>
          </div>

          {/* Centered Heading & Subtitle */}
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

          {/* Motwani Trust Stats Cards (Mobile Sticky-Stack Scroll Effect / Desktop 3-Column Grid) */}
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
            {cascadeContent.legacy.stats.map((stat, idx) => {
              const stickyZIndex = idx === 0 ? "z-10" : idx === 1 ? "z-20" : "z-30";
              const stickyMb = idx < 2 ? "mb-8 md:mb-0" : "";

              return (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-[#7DF9FF]/60 transition-all duration-300 shadow-md hover:shadow-xl group hover:-translate-y-1 sticky top-24 ${stickyZIndex} md:static md:z-auto ${stickyMb}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#7DF9FF] transition-colors">
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
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
