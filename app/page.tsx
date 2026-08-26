"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "@/components/layout/Navbar";
import HeroVideo from "@/components/sections/HeroVideo";
import LegacySection from "@/components/sections/LegacySection";
import LocationAdvantage from "@/components/sections/LocationAdvantage";
import MahanadiAdvantage from "@/components/sections/MahanadiAdvantage";
import ProjectSnapshot from "@/components/sections/ProjectSnapshot";
import ConnectivityMap from "@/components/sections/ConnectivityMap";
import MasterPlanning from "@/components/sections/MasterPlanning";
import Amenities from "@/components/sections/Amenities";
import LifestyleExperience from "@/components/sections/LifestyleExperience";
import CTAContact from "@/components/sections/CTAContact";
import Footer from "@/components/layout/Footer";
import BrochureModal from "@/components/ui/BrochureModal";
import EnquiryModal from "@/components/ui/EnquiryModal";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

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
