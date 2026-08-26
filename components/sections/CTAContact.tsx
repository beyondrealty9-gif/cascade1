"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import cascadeContent from "@/content/cascade.json";

const enquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"),
  email: z.string().email("Please enter a valid email address"),
  unitInterest: z.enum(["2 BHK", "3 BHK", "4 BHK", "Penthouse"]),
  preferredVisitDate: z.string().optional(),
  message: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export default function CTAContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      unitInterest: "3 BHK",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        setErrorMessage(resData.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFieldVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 },
    visible: (i: number) =>
      prefersReducedMotion
        ? { opacity: 1 }
        : {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, delay: 0.35 + i * 0.08, ease: "easeOut" },
          },
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Staggered Info & Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Badge with Sparkle Pulse */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.95 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs uppercase tracking-widest font-extrabold shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7DF9FF] animate-spin-slow" />
              <span>VIP Pre-Launch Enquiries</span>
            </motion.div>

            {/* Step 2: Heading */}
            <motion.h2
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            >
              {cascadeContent.contact.heading}
            </motion.h2>

            {/* Step 3: Subheading Paragraph */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="font-body text-slate-600 text-base leading-relaxed"
            >
              {cascadeContent.contact.subheading}
            </motion.p>

            {/* Step 4: Staggered Contact Details List with Magnetic Shift */}
            <div className="space-y-4 pt-2">
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                whileHover={prefersReducedMotion ? {} : { x: 6 }}
                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-950 shrink-0 group-hover:bg-[#7DF9FF] group-hover:text-slate-950 transition-colors">
                  <Phone className="w-5 h-5 text-[#7DF9FF] group-hover:text-slate-950" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Sales Desk</div>
                  <a href={`tel:${cascadeContent.project.phone}`} className="font-display text-lg font-black text-slate-900 group-hover:text-[#007BA7] transition-colors">
                    {cascadeContent.project.phone}
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                whileHover={prefersReducedMotion ? {} : { x: 6 }}
                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-river-600 shrink-0 group-hover:bg-river-600 group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Email Enquiries</div>
                  <a href={`mailto:${cascadeContent.project.email}`} className="font-display text-base font-black text-slate-900 group-hover:text-river-600 transition-colors">
                    {cascadeContent.project.email}
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                whileHover={prefersReducedMotion ? {} : { x: 6 }}
                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-950 shrink-0 group-hover:bg-[#7DF9FF] group-hover:text-slate-950 transition-colors">
                  <MapPin className="w-5 h-5 text-[#7DF9FF] group-hover:text-slate-950" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Site Experience Center</div>
                  <p className="text-sm font-bold text-slate-800 leading-snug">
                    {cascadeContent.project.address}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: 3D Floating VIP Lead Form Card */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 50, scale: 0.96 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.3 } }}
            className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-[#7DF9FF]/10 relative hover:border-[#7DF9FF]/60 transition-all duration-300"
          >
            <motion.h3
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={formFieldVariants}
              className="font-display text-2xl font-black text-slate-900 mb-2"
            >
              {cascadeContent.contact.formTitle}
            </motion.h3>

            <motion.p
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={formFieldVariants}
              className="text-sm text-slate-600 mb-6"
            >
              Register now for priority unit selection & special inauguration pricing benefits.
            </motion.p>

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display text-2xl font-black text-slate-900 mb-2">Enquiry Received!</h4>
                <p className="text-sm text-slate-700 max-w-md leading-relaxed mb-6">
                  Thank you for your interest in Codename Cascade. Our luxury residential consultant will contact you within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 text-xs font-black uppercase tracking-wider hover:bg-slate-200 transition-colors"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
                    {errorMessage}
                  </div>
                )}

                <motion.div
                  custom={2}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={formFieldVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      {...register("fullName")}
                      placeholder="e.g. Ananya Pattnaik"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-[#7DF9FF] focus:bg-white focus:outline-none transition-colors"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-[#7DF9FF] focus:bg-white focus:outline-none transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  custom={3}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={formFieldVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-[#7DF9FF] focus:bg-white focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                      Preferred Configuration *
                    </label>
                    <select
                      {...register("unitInterest")}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#7DF9FF] focus:bg-white focus:outline-none transition-colors"
                    >
                      <option value="2 BHK">2 BHK Luxury Residence</option>
                      <option value="3 BHK">3 BHK River-Facing Residence</option>
                      <option value="4 BHK">4 BHK Sky Residence</option>
                      <option value="Penthouse">Riverfront Penthouse</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div
                  custom={4}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={formFieldVariants}
                >
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                    Preferred VIP Visit Date (Optional)
                  </label>
                  <input
                    type="date"
                    {...register("preferredVisitDate")}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#7DF9FF] focus:bg-white focus:outline-none transition-colors"
                  />
                </motion.div>

                <motion.div
                  custom={5}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={formFieldVariants}
                >
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                    Special Requirements / Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder="Tell us about your home preferences..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-[#7DF9FF] focus:bg-white focus:outline-none transition-colors"
                  />
                </motion.div>

                <motion.div
                  custom={6}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={formFieldVariants}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-md bg-[#7DF9FF] hover:bg-[#AFEEEE] text-slate-950 font-black uppercase tracking-widest text-sm shadow-lg shadow-[#7DF9FF]/30 transition-all flex items-center justify-center gap-2 transform active:scale-98 hover:scale-[1.01] animate-pulse-glow"
                  >
                    {isSubmitting ? (
                      <span>Submitting Enquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>Request VIP Callback & Site Visit</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
