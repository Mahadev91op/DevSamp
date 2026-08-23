"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ShieldCheck, Lock, Activity, Zap, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPrinciples = [
  { title: "Defensive Error Boundaries", description: "Every UI component and server action is wrapped with graceful fallback states and zero white screens.", icon: "ShieldCheck", badge: "UI SAFETY" },
  { title: "Strict Input Sanitization & RBAC", description: "Cryptographically verified session cookies, scope validation, and schema assertions at API boundaries.", icon: "Lock", badge: "SECURITY" },
  { title: "Automated Telemetry & Health Logging", description: "Instant error reporting, sub-second latency tracing, and automated cluster recovery alerts.", icon: "Activity", badge: "OBSERVABILITY" },
  { title: "Zero Layout Shift & Instant 60fps", description: "Strictly reserved container geometries ensuring rock-solid visual stability during fast data loads.", icon: "Zap", badge: "PERFORMANCE" }
];

const MissionReliability = ({ data = null }) => {
  const title = data?.title || "Reliability is Our Engineering Baseline";
  const description = data?.description || "Reliability is not an optional premium feature—it is the foundational standard for every product we ship.";
  const principles = data?.principles && data.principles.length > 0 ? data.principles : defaultPrinciples;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <ShieldCheck size={12} /> Reliability Baseline
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            {description}
          </p>
        </div>

        {/* 4 Reliability Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {principles.map((pr, idx) => {
            const Icon = LucideIcons[pr.icon] || ShieldCheck;

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
                      {pr.badge || `RULE 0${idx + 1}`}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-950 mb-2 truncate">
                    {pr.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {pr.description}
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

export default MissionReliability;
