"use client";

import { useState } from "react";
import { X, Download, CheckCircle2, FileText } from "lucide-react";
import cascadeContent from "@/content/cascade.json";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;

    setDownloaded(true);
    const link = document.createElement("a");
    link.href = "/content/cascade.json";
    link.download = "Codename_Cascade_E-Brochure.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-xl bg-brandRed-500 flex items-center justify-center text-white mb-4 shadow-md">
          <FileText className="w-6 h-6" />
        </div>

        <h3 className="font-display text-2xl font-black text-slate-900 mb-1">
          Download E-Brochure
        </h3>
        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          Get instant access to complete floor plans, tower layouts, pricing sheets, and amenity specifications for Codename Cascade.
        </p>

        {downloaded ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-display font-black text-slate-900 text-lg mb-1">Brochure Download Started!</h4>
            <p className="text-xs text-slate-600 mb-4">
              We have also dispatched a high-resolution PDF copy to {email}.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-md bg-slate-100 border border-slate-300 text-slate-900 text-xs font-black uppercase tracking-wider hover:bg-slate-200"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleDownload} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                Your Gmail Address (Valid Gmail Only) *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-[#7DF9FF] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                Mobile Number (10 Digits Only) *
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                value={phone}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 10);
                }}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-[#7DF9FF] focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-md bg-[#7DF9FF] hover:bg-[#AFEEEE] text-slate-950 font-black uppercase tracking-widest text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Instant Download Brochure</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
