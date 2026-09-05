"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "919777979501"; // +91 97779 79501 (no spaces/dashes)
const PRE_FILLED_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in Cascade by Motwani Constructions — a luxury riverside home at Trisulia, Cuttack. Please share more details about pricing and availability."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${PRE_FILLED_MESSAGE}`;

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Tooltip label */}
      <div className="absolute right-14 bottom-1/2 translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
        <div className="bg-slate-900 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-xl border border-slate-700 flex items-center gap-1.5">
          <span className="text-green-400">●</span>
          <span>Chat on WhatsApp</span>
        </div>
        {/* Tooltip arrow */}
        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-slate-900" />
      </div>

      {/* Pulsing rings (always visible) */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping" />
      <span className="absolute inset-[-6px] rounded-full bg-[#25D366]/15 animate-ping" style={{ animationDelay: "0.4s" }} />

      {/* Main WhatsApp button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp — +91 97779 79501"
        title="WhatsApp: +91 97779 79501"
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-200"
        style={{
          background: "linear-gradient(145deg, #25D366 0%, #128C7E 100%)",
          boxShadow: "0 6px 30px rgba(37,211,102,0.55), 0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {/* Official WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.001 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.352.639 4.607 1.764 6.565L2.667 29.333l6.97-1.727A13.253 13.253 0 0 0 16.001 29.333c7.364 0 13.333-5.97 13.333-13.333 0-7.364-5.97-13.333-13.333-13.333Zm0 24.24a10.88 10.88 0 0 1-5.553-1.52l-.399-.237-4.135 1.025 1.065-3.897-.261-.413A10.874 10.874 0 0 1 5.12 16c0-5.998 4.883-10.88 10.881-10.88 5.998 0 10.88 4.882 10.88 10.88 0 5.998-4.882 10.907-10.88 10.907Zm5.974-8.152c-.326-.163-1.929-.95-2.228-1.06-.3-.108-.516-.162-.733.163-.217.326-.84 1.06-.03 1.278.218.109.679.351 1.005.543a4.73 4.73 0 0 0 1.44 1.007c.245.108.516.108.733-.027.217-.163.895-.84 1.14-1.114.244-.271.49-.217.814-.054.326.163 2.065.977 2.419 1.15.354.172.59.245.68.38.09.135.09.788-.19 1.548-.282.758-1.643 1.466-2.283 1.548-.638.081-1.248.108-4.16-1.006-3.54-1.358-5.754-4.948-5.927-5.174-.172-.227-1.412-1.876-1.412-3.575 0-1.7.894-2.534 1.21-2.878.319-.343.692-.43 1.005-.43h.733c.245 0 .516.081.707.543.217.516.705 1.712.76 1.836.055.121.082.272 0 .435-.082.163-.123.271-.245.414l-.49.572c-.136.135-.272.272-.136.516.136.244 1.005 1.656 2.147 2.679 1.483 1.319 2.705 1.722 3.115 1.885.409.163.652.135.895-.082.244-.217.895-.842 1.14-1.221Z" />
        </svg>
      </a>
    </motion.div>
  );
}
