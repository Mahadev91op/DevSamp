"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { CheckCircle2, Activity, Boxes, Users, ArrowUpRight, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultExamples = [
  {
    title: "MedERP Pro Clinical Suite",
    principle: "Reliable Healthcare Software",
    realExample: "Engineered full hospital orchestration managing IPD, OPD, pharmacy inventory, and lab reporting.",
    outcome: "Zero clinical workflow downtime & instant patient triage.",
    icon: "Activity",
    order: 1
  },
  {
    title: "FlowPulse Multi-Branch POS",
    principle: "High-Speed Retail Systems",
    realExample: "Sub-50ms offline-first barcode billing engine synchronized across distributed retail branches.",
    outcome: "Blistering checkout speed even during network outages.",
    icon: "Boxes",
    order: 2
  },
  {
    title: "Dedicated Enterprise Pods",
    principle: "Custom Fullstack Engineering",
    realExample: "Deploying senior engineering pods for bespoke fintech, marketplace, and SaaS platforms.",
    outcome: "100% in-house code delivered with zero architectural debt.",
    icon: "Users",
    order: 3
  }
];

const MissionInPractice = ({ data = [] }) => {
  const examples = data && data.length > 0 ? data : defaultExamples;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <CheckCircle2 size={12} /> Case Evidence
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Mission in Active Practice
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            Real production systems demonstrating how our mission translates into measurable operational results.
          </p>
        </div>

        {/* 3 Real Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-0">
          {examples.map((item, idx) => {
            const Icon = LucideIcons[item.icon] || Activity;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div className="space-y-3 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                      ACTIVE SYSTEM
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-wider block">
                    {item.principle}
                  </span>

                  <h3 className="text-base sm:text-lg font-black text-slate-950 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                    {item.realExample}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
                    OUTCOME: {item.outcome}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MissionInPractice;
