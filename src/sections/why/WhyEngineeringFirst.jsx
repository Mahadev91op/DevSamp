"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Sparkles, 
  Database, 
  Zap, 
  ShieldCheck, 
  Activity, 
  GitBranch, 
  CheckCircle2 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const engineeringTenets = [
  {
    icon: Database,
    title: "Sub-10ms Database Queries",
    description: "Compound index trees and strict MongoDB tenant partitioning ensure high-throughput execution under concurrency.",
    specs: "Index Optimization • No Table Scans • High Concurrency"
  },
  {
    icon: Zap,
    title: "Zero Layout Shift & 60fps UI",
    description: "Hydration stability, reserved container geometry, and hardware-accelerated CSS animations.",
    specs: "Next.js 15 App Router • React 19 • Tailwind v4"
  },
  {
    icon: ShieldCheck,
    title: "Defensive Error Boundaries",
    description: "Every server action and critical component is wrapped with graceful fallback states, eliminating white screens.",
    specs: "Defensive Fallbacks • Schema Validation • Graceful Degradation"
  },
  {
    icon: GitBranch,
    title: "Strict API Schema Contracts",
    description: "Predictable REST API endpoints, OpenAPI documentation, and verified webhook signatures.",
    specs: "OpenAPI 3.1 • HMAC Signatures • Rate-Limiting"
  },
  {
    icon: Activity,
    title: "Edge Telemetry & Health Checks",
    description: "Automated latency tracing, error boundary telemetry, and real-time operational cluster alerts.",
    specs: "Vercel Edge • AWS Clusters • Sub-15ms Latency"
  },
  {
    icon: Cpu,
    title: "100% In-House Code Craft",
    description: "Every line of code is engineered directly by senior software architects with zero outsourcing.",
    specs: "Zero Subcontracting • Code Ownership • Direct Pairing"
  }
];

const WhyEngineeringFirst = () => {
  return (
    <section id="engineering-first" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3"
          >
            <Cpu size={13} /> Engineering Discipline
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Software Crafted by Engineers, Not Sales Middlemen
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            We take pride in our craft. Every architectural choice is made to ensure long-term stability, predictable maintenance, and effortless scalability.
          </motion.p>
        </div>

        {/* 6 Engineering Tenets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineeringTenets.map((tenet, idx) => {
            const Icon = tenet.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.07 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 uppercase">
                      DISCIPLINE
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {tenet.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-4">
                    {tenet.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-indigo-700 font-bold">
                  <span className="truncate">{tenet.specs}</span>
                  <span className="shrink-0">✓ VERIFIED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyEngineeringFirst;
