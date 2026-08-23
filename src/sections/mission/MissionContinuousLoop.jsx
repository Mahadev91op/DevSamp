"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { RefreshCw, Code2, Activity, TrendingUp, Globe, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultSteps = [
  { step: "BUILD", label: "01. Build Clean", description: "Deploy modular, type-safe architecture.", icon: "Code2" },
  { step: "LEARN", label: "02. Learn Fast", description: "Capture real-time user telemetry & error metrics.", icon: "Activity" },
  { step: "IMPROVE", label: "03. Improve Daily", description: "Refactor bottlenecks and streamline interfaces.", icon: "TrendingUp" },
  { step: "SCALE", label: "04. Scale Globally", description: "Expand traffic capacity with zero downtime.", icon: "Globe" }
];

const MissionContinuousLoop = ({ data = null }) => {
  const title = data?.title || "The Continuous Engineering Loop";
  const description = data?.description || "We do not build once and walk away. Our systems evolve through continuous telemetry, monitoring, user feedback, and iterative performance tuning.";
  const steps = data?.steps && data.steps.length > 0 ? data.steps : defaultSteps;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <RefreshCw size={12} /> Continuous Evolution
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            {description}
          </p>
        </div>

        {/* 4 Steps Continuous Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {steps.map((st, idx) => {
            const Icon = LucideIcons[st.icon] || Code2;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0 relative"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-indigo-700">
                      {st.step}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-950 mb-1.5 truncate">
                    {st.label}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {st.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 text-[10px] font-mono text-indigo-700 font-bold">
                  ✓ ITERATION CYCLE
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MissionContinuousLoop;
