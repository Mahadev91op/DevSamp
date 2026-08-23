"use client";

import { motion } from "framer-motion";
import { Compass, Sparkles, Quote } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const VisionStatement = ({ data = null }) => {
  const title = data?.title || "The Central Thesis";
  const statement = data?.statement || "To evolve from an elite product-engineering firm into the decentralized technology backbone that powers global digital commerce, healthcare, and infrastructure.";
  const description = data?.description || "Software over the next decade must transition from isolated, brittle monoliths into compounding, interconnected ecosystems with shared intelligence, instant edge sync, and sub-10ms operational latency.";
  const highlightBadge = data?.highlightBadge || "Decade Horizon";

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      
      {/* Background ambient accent */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container max-w-4xl relative z-10 text-center space-y-8">
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[11px] font-bold text-purple-700 uppercase tracking-widest"
        >
          <Sparkles size={12} /> {title} • {highlightBadge}
        </motion.div>

        {/* Large Typography Statement */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
          className="text-fluid-h1 font-black tracking-tight text-slate-950 leading-[1.18] sm:leading-[1.15]"
        >
          &ldquo;{statement}&rdquo;
        </motion.blockquote>

        {/* Supporting Explanation */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
          className="text-slate-600 text-fluid-body font-normal max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Key Guiding Pillars Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase, delay: 0.24 }}
          className="pt-6 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs font-mono font-bold text-slate-400"
        >
          <span className="text-purple-700 font-extrabold">✦ SUB-10MS LATENCY</span>
          <span>✦ SHARED INTELLIGENCE</span>
          <span>✦ DECENTRALIZED MESH</span>
          <span>✦ ZERO ACCIDENTAL COMPLEXITY</span>
        </motion.div>

      </div>
    </section>
  );
};

export default VisionStatement;
