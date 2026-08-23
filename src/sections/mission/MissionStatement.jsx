"use client";

import { motion } from "framer-motion";
import { Target, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const MissionStatement = ({ data = null }) => {
  const title = data?.title || "The Core Mandate";
  const statement = data?.statement || "Customers aur businesses ke liye reliable, scalable digital products banana.";
  const englishTranslation = data?.englishTranslation || "Engineering reliable, scalable digital products and technology assets for businesses and end-users.";
  const description = data?.description || "Every line of code, database schema, and interface interaction we build is focused on delivering measurable operational stability, effortless scalability, and compounding business value.";
  const highlightBadge = data?.highlightBadge || "Everyday Execution";

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      
      {/* Background ambient accent */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container max-w-4xl relative z-10 text-center space-y-8">
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest"
        >
          <Target size={12} /> {title} • {highlightBadge}
        </motion.div>

        {/* Large Primary Mission Statement */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
          className="text-fluid-h1 font-black tracking-tight text-slate-950 leading-[1.18] sm:leading-[1.15]"
        >
          &ldquo;{statement}&rdquo;
        </motion.blockquote>

        {/* English Translation / Clarification */}
        {englishTranslation && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.12 }}
            className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl max-w-2xl mx-auto text-xs sm:text-sm font-mono font-bold text-slate-700"
          >
            {englishTranslation}
          </motion.div>
        )}

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

        {/* Guiding Tenets Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase, delay: 0.24 }}
          className="pt-6 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs font-mono font-bold text-slate-400"
        >
          <span className="text-indigo-700 font-extrabold">✦ PREDICTABLE STABILITY</span>
          <span>✦ 10X HORIZONTAL SCALE</span>
          <span>✦ ZERO DEFECT DELIVERY</span>
          <span>✦ MEASURABLE ROI</span>
        </motion.div>

      </div>
    </section>
  );
};

export default MissionStatement;
