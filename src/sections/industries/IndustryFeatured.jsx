"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  Building2, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const IndustryFeatured = ({ industries = [] }) => {
  const featuredList = industries.filter((i) => i.featured);

  if (!featuredList.length) return null;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      
      {/* Glow overlays */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-300">
              <Sparkles size={13} className="text-blue-400" />
              <span className="tracking-wide uppercase font-mono">FLAGSHIP VERTICALS</span>
            </div>
            
            <h2 className="text-fluid-h2 font-black tracking-tight text-white">
              Featured Industry Platforms
            </h2>
            
            <p className="text-slate-400 text-fluid-body font-normal">
              Specialized domain software ecosystems deployed across clinical healthcare, financial ledger auditing, and retail logistics.
            </p>
          </div>

          <Link href="/#contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Discuss Domain Architecture</span>
              <ArrowRight size={14} />
            </motion.button>
          </Link>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredList.map((ind, idx) => {
            const IconComponent = LucideIcons[ind.icon] || Building2;

            return (
              <motion.div
                key={ind._id || ind.slug || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-900/90 border border-white/10 hover:border-blue-500/50 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-blue-400 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                      <IconComponent size={22} />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-[10px] font-mono font-bold text-blue-300">
                      FLAGSHIP SECTOR
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white tracking-tight mb-1 group-hover:text-blue-400 transition-colors">
                    {ind.name}
                  </h3>

                  {ind.tagline && (
                    <div className="text-xs font-bold text-slate-400 mb-2">
                      {ind.tagline}
                    </div>
                  )}

                  <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                    {ind.summary || ind.description}
                  </p>

                  {/* Use Cases snippet */}
                  {Array.isArray(ind.useCases) && ind.useCases.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {ind.useCases.slice(0, 3).map((uc, uIdx) => (
                        <span
                          key={uIdx}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 font-medium"
                        >
                          {uc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/#contact?industry=${encodeURIComponent(ind.name || "")}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group/link"
                  >
                    <span>Deploy Domain Architecture</span>
                    <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default IndustryFeatured;
