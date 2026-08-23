"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ShieldCheck, TrendingUp, Zap, Target, Lock, Users, Sparkles, Layers } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPillars = [
  { title: "Reliability", description: "Systems that operate predictably under peak business loads.", icon: "ShieldCheck", badge: "CORE", order: 1 },
  { title: "Scalability", description: "Architectures designed to handle 10x traffic growth without rewrites.", icon: "TrendingUp", badge: "GROWTH", order: 2 },
  { title: "Speed & 60fps", description: "Instant Core Web Vitals, sub-10ms queries, and fast page loads.", icon: "Zap", badge: "PERFORMANCE", order: 3 },
  { title: "Customer Value", description: "Delivering compounding ROI and eliminating execution headaches.", icon: "Target", badge: "ROI", order: 4 },
  { title: "Security & RBAC", description: "Enterprise-grade session encryption, RBAC, and data isolation.", icon: "Lock", badge: "SAFETY", order: 5 },
  { title: "Direct Ownership", description: "Senior engineers taking end-to-end pride in what we ship.", icon: "Users", badge: "CRAFT", order: 6 }
];

const MissionPillars = ({ data = [] }) => {
  const pillars = data && data.length > 0 ? data : defaultPillars;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Layers size={12} /> Strategic Foundations
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Mission Pillars
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            The core pillars that form the foundation of our engineering craft and client partnerships.
          </p>
        </div>

        {/* 6 Pillars 3-col Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-w-0">
          {pillars.map((pil, idx) => {
            const Icon = LucideIcons[pil.icon] || ShieldCheck;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 uppercase">
                      {pil.badge || `PILLAR 0${idx + 1}`}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-950 mb-1.5 truncate">
                    {pil.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {pil.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 text-[10px] font-mono text-indigo-700 font-bold">
                  ✓ CORE PILLAR
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MissionPillars;
