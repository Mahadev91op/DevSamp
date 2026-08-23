"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Workflow, HelpCircle, Compass, Code2, ShieldCheck, Zap, TrendingUp, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultProcess = [
  { stepNumber: "01", title: "Understand", description: "Deep architectural discovery into business workflows, edge cases, and user bottlenecks.", deliverable: "System Requirement Spec", icon: "HelpCircle", order: 1 },
  { stepNumber: "02", title: "Plan & Architect", description: "Data schema design, database index strategy, API contracts, and UX wireframes.", deliverable: "Technical Blueprint", icon: "Compass", order: 2 },
  { stepNumber: "03", title: "Build In-House", description: "Sprint-driven fullstack development with Next.js 15, Tailwind, and MongoDB Atlas.", deliverable: "Production Codebase", icon: "Code2", order: 3 },
  { stepNumber: "04", title: "Test & Benchmark", description: "Strict type validation, Core Web Vitals profiling, and load testing under concurrency.", deliverable: "Zero-Defect QA Report", icon: "ShieldCheck", order: 4 },
  { stepNumber: "05", title: "Deploy & Telemetry", description: "CI/CD automated pipeline launch with SSL, CDN caching, and 24/7 uptime monitoring.", deliverable: "Live Production Node", icon: "Zap", order: 5 },
  { stepNumber: "06", title: "Iterate & Compound", description: "Ongoing performance tuning, feature expansions, and automated background optimization.", deliverable: "Compounding Growth", icon: "TrendingUp", order: 6 }
];

const MissionProcess = ({ data = [] }) => {
  const steps = data && data.length > 0 ? data : defaultProcess;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Workflow size={12} /> Execution Lifecycle
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Product Engineering Process
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            How our engineering pods systematically take complex ideas from architectural blueprints to live production nodes.
          </p>
        </div>

        {/* 6 Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 min-w-0">
          {steps.map((st, idx) => {
            const Icon = LucideIcons[st.icon] || Code2;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      PHASE {st.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-950 mb-1.5 truncate">
                    {st.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {st.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>OUTPUT:</span>
                  <span className="text-slate-900 font-bold">{st.deliverable}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MissionProcess;
