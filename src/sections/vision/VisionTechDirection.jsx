"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Cpu, Database, Zap, Lock, Sparkles, Terminal } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultStandards = [
  { title: "Server-First Next.js 15 & React 19", description: "Zero client-side JS bundle bloat with streaming SSR and Suspense boundaries.", icon: "Cpu", badge: "FRAMEWORK" },
  { title: "Optimized Mongo Document Index Trees", description: "Compound index structures guaranteeing sub-10ms query times at 10M+ documents.", icon: "Database", badge: "DATA LAYER" },
  { title: "Instant 60fps & Zero Visual Shift", description: "GPU-accelerated animations, strictly reserved layout boxes, and 100/100 Core Web Vitals.", icon: "Zap", badge: "UI PHYSICS" },
  { title: "End-to-End Type Safety & RBAC", description: "Strict schema contracts, payload validation, and HTTP-only encrypted session cookies.", icon: "Lock", badge: "SECURITY" }
];

const VisionTechDirection = ({ data = null }) => {
  const title = data?.title || "Next-Decade Engineering Standards";
  const description = data?.description || "Building on immutable server state, zero-overhead edge streaming, sub-10ms database indexes, and end-to-end type safety.";
  const standards = data?.standards && data.standards.length > 0 ? data.standards : defaultStandards;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Cpu size={12} /> Technical Rigor
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            {description}
          </p>
        </div>

        {/* 4 Standards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {standards.map((std, idx) => {
            const Icon = LucideIcons[std.icon] || Cpu;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 uppercase">
                      {std.badge || `RULE 0${idx + 1}`}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-950 mb-1.5 truncate">
                    {std.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {std.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                  <span>STANDARD</span>
                  <span className="text-indigo-700">✓ ENFORCED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default VisionTechDirection;
