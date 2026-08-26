"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Layers, 
  ShieldCheck 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const IndustryCustomCTA = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "CUSTOM SECTOR SCOPING";
  const title = data?.title || "Don't See Your Industry Listed?";
  const description = data?.description || "DevSamp specializes in architecting custom database models, API integrations, and intuitive interfaces for novel, emerging, and niche commercial sectors.";
  const primaryText = data?.primaryText || "Discuss Custom Requirement";
  const primaryLink = data?.primaryLink || "/#contact";
  const secondaryText = data?.secondaryText || "Explore Engineering Services";
  const secondaryLink = data?.secondaryLink || "/services";

  return (
    <section className="py-20 md:py-24 bg-slate-50/50 border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 border border-white/15 shadow-2xl relative overflow-hidden">
          
          {/* Background glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-blue-300">
              <Sparkles size={13} className="text-blue-400" />
              <span className="tracking-wide uppercase">{eyebrow}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href={primaryLink}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                >
                  <Building2 size={16} className="text-blue-600" />
                  <span>{primaryText}</span>
                  <ArrowRight size={15} />
                </motion.button>
              </Link>

              <Link href={secondaryLink}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Layers size={16} className="text-blue-300" />
                  <span>{secondaryText}</span>
                </motion.button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <ShieldCheck size={14} /> NDAs Signed Prior to Scoping
              </span>
              <span>•</span>
              <span>Custom Quote in 24–48 Hours</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default IndustryCustomCTA;
