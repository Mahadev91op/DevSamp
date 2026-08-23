"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Building2, ArrowUpRight, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const VisionIndustriesExpansion = ({ industries = [] }) => {
  if (!industries || industries.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[11px] font-bold text-purple-700 uppercase tracking-widest mb-3">
            <Building2 size={12} /> Industry Expansion
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Target Industry Expansion Vectors
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            Deepening software orchestration across critical sectors that demand strict compliance, high availability, and multi-branch scaling.
          </p>
        </div>

        {/* 4 Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {industries.map((ind, idx) => {
            const Icon = LucideIcons[ind.icon] || Building2;

            return (
              <motion.div
                key={ind.slug || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="group bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-purple-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div className="min-w-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 uppercase">
                      {ind.badge || "Industry"}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-950 mb-1.5 truncate">
                    {ind.name}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed font-normal mb-4">
                    {ind.summary}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-200/70">
                  <Link href="/#contact">
                    <button className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-950 text-slate-800 hover:text-white border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                      <span>Explore Vertical Scope</span>
                      <ArrowUpRight size={13} />
                    </button>
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

export default VisionIndustriesExpansion;
