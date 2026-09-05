import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import cascadeContent from "@/content/cascade.json";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column with Official Logo Badge */}
          <div className="md:col-span-5 space-y-5">
            <a href="#hero" className="inline-block">
              <div className="p-3 bg-white rounded-xl shadow-md border border-slate-700 inline-flex items-center justify-center hover:scale-102 transition-transform">
                <Image
                  src="/images/logo.png"
                  alt="Motwani Constructions - Cascade"
                  width={200}
                  height={52}
                  priority
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </a>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {cascadeContent.project.subtitle}. Designed for discerning families seeking an elevated lifestyle on the banks of the Mahanadi River.
            </p>

          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-extrabold text-white text-base">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-[#7DF9FF] transition-colors">Overview</a></li>
              <li><a href="#legacy" className="hover:text-[#7DF9FF] transition-colors">Motwani Heritage</a></li>
              <li><a href="#location" className="hover:text-[#7DF9FF] transition-colors">Location Advantage</a></li>
              <li><a href="#connectivity" className="hover:text-[#7DF9FF] transition-colors">Connectivity Radar</a></li>
              <li><a href="#masterplan" className="hover:text-[#7DF9FF] transition-colors">Master Plan Renders</a></li>
              <li><a href="#amenities" className="hover:text-[#7DF9FF] transition-colors">25+ Amenities</a></li>
              <li><a href="#contact" className="hover:text-[#7DF9FF] transition-colors">Enquiry & VIP Visit</a></li>
            </ul>
          </div>

          {/* Contact Details & 3% Brokerage Callout */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-extrabold text-white text-base">Sales & Marketing Office</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#7DF9FF] shrink-0 mt-0.5" />
                <span>{cascadeContent.project.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#7DF9FF] shrink-0" />
                <a href={`tel:${cascadeContent.project.phone}`} className="hover:text-[#7DF9FF]">{cascadeContent.project.phone}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 text-[11px] text-slate-400 leading-relaxed space-y-3">
          <p>
            <strong className="text-slate-300">Legal Disclaimer:</strong> The information provided on this website is for guidance only. Architectural renderings, elevation views, interior visual representations, computer-generated images, and stock videos are artistic impressions and conceptual representations. Actual product layout, colors, and specifications may vary. Price starting ₹69 Lakhs* excludes government taxes, stamp duty, registration charges, and statutory fees.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
            <div>© {new Date().getFullYear()} {cascadeContent.project.developer}. All Rights Reserved.</div>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#masterplan" className="hover:text-white">Master Plan</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
