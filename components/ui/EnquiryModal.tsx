"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Mail, CheckCircle2, Sparkles, Home } from "lucide-react";
import cascadeContent from "@/content/cascade.json";

const brochureModalSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full Name must contain letters only (A-Z, a-z)")
    .regex(/^[a-zA-Z\s]+$/, "Full Name must contain letters only (A-Z, a-z)"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits only"),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/i,
      "Please enter a valid Gmail address (e.g. user@gmail.com)"
    ),
  unitInterest: z.string().min(1, "Please select configuration"),
  purchaseTimeline: z.string().min(1, "Please select timeline"),
  sendWhatsApp: z.boolean().default(true),
});

type BrochureModalFormData = z.infer<typeof brochureModalSchema>;

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrochureModalFormData>({
    resolver: zodResolver(brochureModalSchema),
    defaultValues: {
      unitInterest: "3 BHK",
      purchaseTimeline: "Within 1 Month",
      sendWhatsApp: true,
    },
  });

  const onSubmit = async (data: BrochureModalFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
          unitInterest: data.unitInterest,
          message: `Timeline: ${data.purchaseTimeline} | Send WhatsApp: ${data.sendWhatsApp ? "Yes" : "No"}`,
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        setErrorMessage(resData.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Content Card matching reference screenshot 1:1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-900 border border-slate-100 my-auto"
          >
            {/* Close X Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-[#7DF9FF] hover:text-slate-950 transition-colors shadow-md z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
                <Home className="w-4 h-4 text-[#7DF9FF]" />
                <span>BOOK A FREE SITE VISIT</span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold max-w-xs mx-auto leading-relaxed">
                Get instant brochure delivery on Email & WhatsApp, plus latest price & floor plans.
              </p>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-black text-slate-900 mb-2">Brochure & Pricing Sent!</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Thank you, {cascadeContent.project.name} brochure and instant price sheet have been sent to your WhatsApp & Email.
                </p>
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#7DF9FF] text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:bg-[#AFEEEE] transition-colors"
                >
                  Close & View Site
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
                    {errorMessage}
                  </div>
                )}

                {/* FULL NAME (LETTERS ONLY) */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-slate-700 mb-1">
                    FULL NAME (LETTERS ONLY) <span className="text-[#7DF9FF]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      {...register("fullName")}
                      onInput={(e: React.FormEvent<HTMLInputElement>) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, "");
                      }}
                      placeholder="Enter full name (A-Z letters only)"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-[#7DF9FF] focus:bg-white focus:outline-none transition-colors font-medium"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* MOBILE NUMBER (NUMBERS ONLY) */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-slate-700 mb-1">
                    MOBILE NUMBER (NUMBERS ONLY) <span className="text-[#7DF9FF]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      {...register("phone")}
                      onInput={(e: React.FormEvent<HTMLInputElement>) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 10);
                      }}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-[#7DF9FF] focus:bg-white focus:outline-none transition-colors font-medium"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* EMAIL ADDRESS (FOR EMAIL DELIVERY) */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-slate-700 mb-1">
                    EMAIL ADDRESS (VALID GMAIL ONLY) <span className="text-[#7DF9FF]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      {...register("email")}
                      placeholder="Enter valid @gmail.com email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-[#7DF9FF] focus:bg-white focus:outline-none transition-colors font-medium"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* CONFIGURATION & PURCHASE TIMELINE DROPDOWNS */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-slate-700 mb-1">
                      CONFIGURATION ▼
                    </label>
                    <select
                      {...register("unitInterest")}
                      className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:border-[#7DF9FF] focus:bg-white focus:outline-none transition-colors"
                    >
                      <option value="2 BHK">2 BHK Residence</option>
                      <option value="3 BHK">3 BHK River View</option>
                      <option value="4 BHK">4 BHK Sky Deck</option>
                      <option value="Penthouse">Penthouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-slate-700 mb-1">
                      PURCHASE TIMELINE ▼
                    </label>
                    <select
                      {...register("purchaseTimeline")}
                      className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:border-[#7DF9FF] focus:bg-white focus:outline-none transition-colors"
                    >
                      <option value="Within 1 Month">Within 1 Month</option>
                      <option value="1-3 Months">1-3 Months</option>
                      <option value="3-6 Months">3-6 Months</option>
                      <option value="Investment">Investment</option>
                    </select>
                  </div>
                </div>

                {/* CHECKBOX: Send e-brochure to WhatsApp & Email */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="sendWhatsApp"
                    {...register("sendWhatsApp")}
                    className="w-4 h-4 rounded text-[#7DF9FF] focus:ring-[#7DF9FF] border-slate-300 accent-[#7DF9FF]"
                  />
                  <label htmlFor="sendWhatsApp" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Send e-brochure to my WhatsApp & Email.
                  </label>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7DF9FF] via-[#A4F4F9] to-[#AFEEEE] hover:from-[#AFEEEE] hover:to-[#7DF9FF] text-slate-950 font-black uppercase tracking-widest text-xs shadow-lg shadow-[#7DF9FF]/40 transition-all flex items-center justify-center gap-2 transform active:scale-98 hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    <span>Processing Request...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>GET PRICE & BROCHURE</span>
                    </>
                  )}
                </button>

                {/* TRUST FOOTER */}
                <div className="text-center pt-2 text-[11px] font-bold text-slate-500 flex items-center justify-center gap-1">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span>Trusted by Hundreds of Homebuyers</span>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
