"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ShieldCheck, TrendingUp, Boxes, Target, Sparkles, HelpCircle } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultMeanings = [
  {
    key: "reliable",
    title: "Reliable Systems",
    subtitle: "Zero Panic at Scale",
    description: "Software that works predictably 24/7 without silent data corruption, unhandled crashes, or unexpected downtime.",
    icon: "ShieldCheck",
    badge: "BASELINE",
    order: 1
  },
  {
    key: "scalable",
    title: "Scalable Architecture",
    subtitle: "10x Growth Ready",
    description: "Multi-tenant database isolation, sub-10ms compound indexes, and edge routing designed to scale without costly rewrites.",
    icon: "TrendingUp",
    badge: "ARCHITECTURE",
    order: 2
  },
  {
    key: "digitalProducts",
    title: "Digital Products",
    subtitle: "Real Operational Value",
    description: "Vertical SaaS suites and web platforms engineered to solve tangible operational bottlenecks in real industries.",
    icon: "Boxes",
    badge: "SOFTWARE",
    order: 3
  },
  {
    key: "customerValue",
    title: "Measurable Value",
    subtitle: "Compounding Business ROI",
    description: "Transforming technology investments into long-term appreciating business assets with direct ROI.",
    icon: "Target",
    badge: "IMPACT",
    order: 4
  }
];

const MissionMeaning = ({ data = [] }) => {
  const meanings = data && data.length > 0 ? data : defaultMeanings;

  return (
    <section id="meanings" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <HelpCircle size={12} /> Deconstructing the Mission
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            What Our Mission Means in Practice
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            Moving beyond buzzwords to define the exact engineering standards and operational outcomes we deliver every day.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {meanings.map((m, idx) => {
            const Icon = LucideIcons[m.icon] || ShieldCheck;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 uppercase">
                      {m.badge || `TENET 0${idx + 1}`}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                    {m.subtitle}
                  </span>

                  <h3 className="text-base font-black text-slate-950 mb-2 truncate">
                    {m.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {m.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-400 font-bold">
                  ✓ VERIFIED STANDARD
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MissionMeaning;
