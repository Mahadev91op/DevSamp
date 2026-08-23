"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { HelpCircle, AlertCircle, Sparkles, ArrowRight, Layers, TrendingUp, Cpu } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultReasons = [
  {
    title: "The Problem of Fragmented Toolchains",
    problem: "Modern enterprises stitch together 20+ disparate SaaS subscriptions with brittle zaps and fragile custom glue code.",
    opportunity: "A unified ecosystem layer where multi-tenant apps share authentication, billing, events, and telemetry natively.",
    direction: "DevSamp bridges independent business apps into a single interconnected mesh.",
    icon: "Layers",
    order: 1
  },
  {
    title: "The Compounding Software Dilemma",
    problem: "Most software built today depreciates rapidly into legacy technical debt requiring expensive rewrites.",
    opportunity: "Architecting modular platforms from day one with strict schema contracts, micro-optimizations, and zero layout shift.",
    direction: "Every DevSamp system is engineered as an appreciating asset that scales 10x without architectural rewrites.",
    icon: "TrendingUp",
    order: 2
  },
  {
    title: "The Need for High-Agency Autonomous Infrastructure",
    problem: "Repetitive operational workflows in healthcare, retail, and finance consume massive human engineering overhead.",
    opportunity: "Deterministic, edge-orchestrated workflow nodes that automate mission-critical billing, inventory, and diagnostics.",
    direction: "Embedding safe, sub-50ms automated pipelines directly into core SaaS products.",
    icon: "Cpu",
    order: 3
  }
];

const VisionReasons = ({ data = [] }) => {
  const reasons = data && data.length > 0 ? data : defaultReasons;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[11px] font-bold text-purple-700 uppercase tracking-widest mb-3">
            <HelpCircle size={12} /> Strategic Rationale
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Why We Are Architecting This Vision
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            Addressing the fundamental failure modes of fragmented enterprise software and disposable engineering.
          </p>
        </div>

        {/* 3 Strategic Reason Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-0">
          {reasons.map((r, idx) => {
            const Icon = LucideIcons[r.icon] || Layers;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-purple-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div className="space-y-4 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 uppercase">
                      INSIGHT 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-950 leading-snug">
                    {r.title}
                  </h3>

                  {/* Problem Box */}
                  <div className="p-3 bg-red-50/70 border border-red-100 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono font-bold text-red-600 uppercase flex items-center gap-1">
                      <AlertCircle size={10} /> THE INDUSTRY BOTTLENECK
                    </span>
                    <p className="text-slate-700 text-xs font-normal leading-relaxed">
                      {r.problem}
                    </p>
                  </div>

                  {/* Opportunity Box */}
                  <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase flex items-center gap-1">
                      <Sparkles size={10} /> THE ARCHITECTURAL OPPORTUNITY
                    </span>
                    <p className="text-slate-700 text-xs font-normal leading-relaxed">
                      {r.opportunity}
                    </p>
                  </div>
                </div>

                {/* DevSamp Direction Footer */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-purple-700 uppercase block">
                    DEVSAMP 2035 DIRECTION:
                  </span>
                  <p className="text-slate-800 text-xs font-bold leading-relaxed">
                    {r.direction}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default VisionReasons;
