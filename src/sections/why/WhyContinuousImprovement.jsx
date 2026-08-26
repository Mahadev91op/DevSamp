"use client";

import { motion } from "framer-motion";
import { 
  RefreshCw, 
  Sparkles, 
  Code2, 
  Activity, 
  Lightbulb, 
  TrendingUp, 
  Zap, 
  CheckCircle2 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const improvementStages = [
  {
    step: "01",
    label: "BUILD",
    title: "Disciplined Delivery",
    desc: "Ship with clean Next.js 15, sub-10ms DB indexes, and strict RBAC schemas.",
    icon: Code2,
    color: "from-blue-600 to-indigo-600"
  },
  {
    step: "02",
    label: "MEASURE",
    title: "Edge Telemetry",
    desc: "Observe real user latencies, error traces, and operational peak load.",
    icon: Activity,
    color: "from-indigo-600 to-purple-600"
  },
  {
    step: "03",
    label: "LEARN",
    title: "Workflow Feedback",
    desc: "Gather direct operational insights and identify workflow friction.",
    icon: Lightbulb,
    color: "from-purple-600 to-pink-600"
  },
  {
    step: "04",
    label: "IMPROVE",
    title: "Core Refinements",
    desc: "Roll optimizations back into shared platform modules.",
    icon: Zap,
    color: "from-pink-600 to-rose-600"
  },
  {
    step: "05",
    label: "SCALE",
    title: "Compounding Growth",
    desc: "Future deployments become faster, safer, and more resilient.",
    icon: TrendingUp,
    color: "from-emerald-600 to-teal-600"
  }
];

const WhyContinuousImprovement = () => {
  return (
    <section id="continuous-improvement" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
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
            <RefreshCw size={13} className="animate-spin-slow text-indigo-600" /> Compounding Flywheel
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            A Feedback-Driven Software Lifecycle
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Software is never static. Our continuous improvement cycle ensures every product iteration and pod sprint makes your system stronger.
          </motion.p>
        </div>

        {/* 5-Step Continuous Loop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {improvementStages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.07 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-5 sm:p-6 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${item.color} shadow-xs shrink-0`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                      {item.label}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
                  <span>STAGE 0{idx + 1}</span>
                  <span className="text-indigo-600">✓ COMPOUND</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyContinuousImprovement;
