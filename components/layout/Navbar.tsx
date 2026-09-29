"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, X, User, Menu, Download, Phone } from "lucide-react";
import cascadeContent from "@/content/cascade.json";

interface NavbarProps {
  onOpenEnquiryModal: () => void;
  onOpenBrochureModal: () => void;
}

export default function Navbar({ onOpenEnquiryModal, onOpenBrochureModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass =
    "text-xs font-black uppercase tracking-wider text-slate-700 hover:text-[#D8232A] transition-colors";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">

      {/* Top Utility Announcement Bar */}
      <div className="bg-[#111827] text-slate-300 text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800 font-medium">
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between gap-4 overflow-hidden">
          <div className="flex items-center gap-4 whitespace-nowrap text-slate-300">
            <span>Trisulia, Cuttack — Luxury 2, 3 &amp; 4 BHK Riverside Homes</span>
            <span className="text-slate-600">—</span>
            <span className="text-amber-400 font-bold">Starting at {cascadeContent.project.priceStarting}</span>
            <span className="text-slate-600">—</span>
            <span>Motwani Constructions Heritage</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300 shrink-0">
            <a
              href={`tel:${cascadeContent.project.phone}`}
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{cascadeContent.project.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`bg-white transition-all duration-300 ${
          isScrolled
            ? "shadow-md py-2 border-b border-slate-200"
            : "py-3 border-b border-slate-200/80"
        }`}
      >
        <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[68px] sm:min-h-[80px]">

          {/* LEFT: Search Bar */}
          <div className="hidden md:flex items-center relative w-64 lg:w-[300px] shrink-0 z-10">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search for "Products"'
              className="w-full pl-9 pr-8 py-2 text-xs rounded-full border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* CENTER: Logo (absolutely centered) */}
          <a
            href="#hero"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center shrink-0 overflow-visible"
          >
            <div className="relative h-[68px] sm:h-[80px] w-auto min-w-[220px] sm:min-w-[280px] flex items-center justify-center overflow-visible">
              <Image
                src="/images/logo.png"
                alt="Motwani Constructions - Cascade"
                width={300}
                height={78}
                priority
                className="object-contain h-[68px] sm:h-[80px] w-auto"
              />
            </div>
          </a>

          {/* RIGHT: Nav Links + Actions */}
          <div className="flex items-center gap-4 lg:gap-5 shrink-0 z-10 ml-auto">

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center gap-5">
              <a href="#hero" className={linkClass}>HOME</a>
              <a href="#location" className={linkClass}>SERVICES</a>
              <a href="#legacy" className={linkClass}>ABOUT</a>
              <a href="#amenities" className={linkClass}>BLOG</a>
            </nav>

            {/* Icon Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenEnquiryModal}
                className="p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                title="Enquire"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenBrochureModal}
                className="hidden sm:flex p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                title="Download Brochure"
              >
                <Download className="w-5 h-5" />
              </button>

              {/* DISCOVER CTA — cyan, matching screenshot */}
              <button
                onClick={onOpenEnquiryModal}
                className="hidden sm:inline-block px-5 py-2 rounded-md bg-[#7DF9FF] hover:bg-[#AFEEEE] text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm transition-all"
              >
                DISCOVER
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-xl">
          <div className="flex flex-col gap-5">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-wider text-slate-800 hover:text-[#D8232A]">HOME</a>
            <a href="#location" onClick={() => setMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-wider text-slate-800 hover:text-[#D8232A]">SERVICES</a>
            <a href="#legacy" onClick={() => setMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-wider text-slate-800 hover:text-[#D8232A]">ABOUT</a>
            <a href="#amenities" onClick={() => setMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-wider text-slate-800 hover:text-[#D8232A]">BLOG</a>

            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenBrochureModal(); }}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 py-3 rounded-md border border-slate-300 bg-slate-50"
              >
                <Download className="w-4 h-4" /> Download Brochure
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenEnquiryModal(); }}
                className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-slate-950 bg-[#7DF9FF] hover:bg-[#AFEEEE] py-3 rounded-md shadow-md"
              >
                DISCOVER
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
