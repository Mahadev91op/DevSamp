"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Workflow 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const alignmentPillars = [
  {
    icon: Target,
    title: "Solving Actual Operational Pain",
    description: "We don't over-engineer buzzwords. We automate manual spreadsheets, eliminate billing bottlenecks, and streamline workflows.",
    metric: "Tangible ROI"
  },
  {
    icon: Clock,
    title: "60% Faster Time-to-Market",
    description: "By leveraging pre-built authentication, multi-tenant database schemas, and modular UI tokens, we deliver weeks ahead of schedule.",
    metric: "Rapid Velocity"
  },
  {
    icon: ShieldCheck,
    title: "Defensive Business Stability",
    description: "Preventing silent data corruption and downtime protects your revenue, customer trust, and brand reputation.",
    metric: "99.9% Uptime"
  }
];

const WhyBusinessAlignment = () => {
  return (
    <section id="business-alignment" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3"
          >
            <Target size={13} /> Business-Aligned
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Connecting Technical Execution to Real Business ROI
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Software is only valuable when it moves your business forward. We evaluate every technical decision through both an engineering lens and a commercial ROI lens.
          </motion.p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {alignmentPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-blue-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-xs shrink-0">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 uppercase shadow-2xs">
                      {item.metric}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>OUTCOME: MEASURED</span>
                  <span className="text-blue-600 font-bold">✓ DELIVERED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyBusinessAlignment;
