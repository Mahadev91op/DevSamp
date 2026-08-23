"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Target, TrendingUp, Users, Zap, ShieldCheck, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPillars = [
  { title: "Zero Legacy Technical Debt", description: "Codebases engineered with strict conventions that don't need expensive rewrites next year.", icon: "TrendingUp" },
  { title: "100% In-House Accountability", description: "Direct pairing with software architects who write code—no outsourced middlemen.", icon: "Users" },
  { title: "Accelerated Time-to-Production", description: "Battle-tested boilerplates and standardized components shorten delivery timelines.", icon: "Zap" },
  { title: "Continuous SLA Guardianship", description: "Dedicated retainers guaranteeing system patches, security updates, and priority support.", icon: "ShieldCheck" }
];

const MissionCustomerValue = ({ data = null }) => {
  const title = data?.title || "Connecting Engineering to Business Outcomes";
  const description = data?.description || "We measure technical success not by lines of code written, but by operational hours saved, downtime prevented, and business revenue compounded.";
  const valuePillars = data?.valuePillars && data.valuePillars.length > 0 ? data.valuePillars : defaultPillars;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Target size={12} /> Compounding ROI
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            {description}
          </p>
        </div>

        {/* 4 Value Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {valuePillars.map((vp, idx) => {
            const Icon = LucideIcons[vp.icon] || Target;

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
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-950 mb-1.5 truncate">
                    {vp.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {vp.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 text-[10px] font-mono text-indigo-700 font-bold">
                  ✓ BUSINESS OUTCOME
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MissionCustomerValue;
