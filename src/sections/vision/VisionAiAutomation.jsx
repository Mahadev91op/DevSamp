"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Cpu, TrendingUp, Terminal, Sparkles, Activity, CheckCircle2 } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultFocusAreas = [
  { title: "Clinical & Diagnostic Automation", description: "Automated lab report parsing, diagnostic triage assistance, and patient workflow routing in MedERP Pro.", latencyTarget: "<40ms", icon: "Cpu" },
  { title: "Smart Inventory & Stock Telemetry", description: "Predictive re-ordering algorithms for multi-branch retail and pharmaceutical warehouses.", latencyTarget: "<25ms", icon: "TrendingUp" },
  { title: "Automated DevOps & Anomaly Detection", description: "Continuous index monitoring, slow-query tracing, and automated zero-downtime hot patches.", latencyTarget: "Real-time", icon: "Terminal" }
];

const VisionAiAutomation = ({ data = null }) => {
  const title = data?.title || "Deterministic Autonomous Workflows";
  const description = data?.description || "We focus on high-precision, low-latency automated intelligence—not gimmicks. Our systems eliminate operational bottlenecks in clinical workflows, inventory forecasting, and financial reconciliation.";
  const focusAreas = data?.focusAreas && data.focusAreas.length > 0 ? data.focusAreas : defaultFocusAreas;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[11px] font-bold text-purple-700 uppercase tracking-widest mb-3">
            <Cpu size={12} /> Autonomous Systems
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            {description}
          </p>
        </div>

        {/* 3 Focus Area Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-0">
          {focusAreas.map((area, idx) => {
            const Icon = LucideIcons[area.icon] || Cpu;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-purple-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div className="space-y-3 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                      {area.latencyTarget}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-950 leading-snug">
                    {area.title}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                  <span>ORCHESTRATION</span>
                  <span className="text-purple-700">✓ DETERMINISTIC</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default VisionAiAutomation;
