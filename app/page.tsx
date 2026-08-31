"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import Navbar from "@/components/layout/Navbar";
import HeroVideo from "@/components/sections/HeroVideo";
import BackToTop from "@/components/ui/BackToTop";
import EnquiryModal from "@/components/ui/EnquiryModal";
import BrochureModal from "@/components/ui/BrochureModal";
import BackgroundMusic from "@/components/ui/BackgroundMusic";

// ─── Code-split every below-the-fold section into its own JS chunk ─────────
// dynamic() without ssr:false is required when used inside a "use client" page.
// Next.js still splits each section into a separate chunk — they are fetched
// after the page shell renders, cutting the initial bundle size significantly.
const LegacySection       = dynamic(() => import("@/components/sections/LegacySection"));
const LocationAdvantage   = dynamic(() => import("@/components/sections/LocationAdvantage"));
const MahanadiAdvantage   = dynamic(() => import("@/components/sections/MahanadiAdvantage"));
const ProjectSnapshot     = dynamic(() => import("@/components/sections/ProjectSnapshot"));
const ConnectivityMap     = dynamic(() => import("@/components/sections/ConnectivityMap"));
const MasterPlanning      = dynamic(() => import("@/components/sections/MasterPlanning"));
const Amenities           = dynamic(() => import("@/components/sections/Amenities"));
const LifestyleExperience = dynamic(() => import("@/components/sections/LifestyleExperience"));
const CTAContact          = dynamic(() => import("@/components/sections/CTAContact"));
const Footer              = dynamic(() => import("@/components/layout/Footer"));

export default function Home() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);

  useEffect(() => {
    // Force manual scroll restoration to ALWAYS show Hero section first on load
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.scrollTo(0, { immediate: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen bg-background relative selection:bg-gold-500/30">
      <Navbar
        onOpenEnquiryModal={() => setEnquiryModalOpen(true)}
        onOpenBrochureModal={() => setBrochureModalOpen(true)}
      />

      <HeroVideo onOpenEnquiryModal={() => setEnquiryModalOpen(true)} />

      <LegacySection />

      <LocationAdvantage />

      <MahanadiAdvantage />

      <ProjectSnapshot />

      <ConnectivityMap />

      <MasterPlanning />

      <Amenities />

      <LifestyleExperience />

      <CTAContact />

      <Footer />

      <BackToTop />

      <BackgroundMusic />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />

      <BrochureModal
        isOpen={brochureModalOpen}
        onClose={() => setBrochureModalOpen(false)}
      />
    </main>
  );
}
