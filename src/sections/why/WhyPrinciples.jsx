"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Sparkles, 
  Target, 
  TrendingUp, 
  FileCode2, 
  Layers, 
  Clock, 
  Workflow, 
  RefreshCw 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const principles = [
  {
    num: "01",
    title: "Build for Purpose",
    desc: "Every line of code and feature must eliminate a real operational bottleneck. We reject unnecessary technical complexity.",
    icon: Target,
    badge: "PURPOSE"
  },
  {
    num: "02",
    title: "Engineer for Growth",
    desc: "Architectures, database index trees, and API routes are structured to handle 10x traffic expansion without requiring total rewrites.",
    icon: TrendingUp,
    badge: "SCALABILITY"
  },
  {
    num: "03",
    title: "Keep Systems Understandable",
    desc: "No developer obfuscation or proprietary magic. Clean codebases that your internal software engineers can inherit effortlessly.",
    icon: FileCode2,
    badge: "READABILITY"
  },
  {
    num: "04",
    title: "Reuse Where It Makes Sense",
    desc: "Leverage proven SaaS authentication, billing webhooks, and UI tokens to accelerate time-to-market without compromising uniqueness.",
    icon: Layers,
    badge: "EFFICIENCY"
  },
  {
    num: "05",
    title: "Think Beyond Launch",
    desc: "Software delivery is day zero. We engineer for ongoing reliability, automated security patches, and long-term 24/7 SLA guardianship.",
    icon: Clock,
    badge: "SUSTAINABILITY"
  },
  {
    num: "06",
    title: "Connect Tech to Business",
    desc: "Engineering decisions must produce measurable business ROI, revenue throughput, and operational hours saved.",
    icon: Workflow,
    badge: "ROI ALIGNMENT"
  },
  {
    num: "07",
    title: "Improve Continuously",
    desc: "Real telemetry and customer feedback roll directly back into platform upgrades, making every ecosystem participant stronger over time.",
    icon: RefreshCw,
    badge: "FLYWHEEL"
  }
];

const WhyPrinciples = () => {
  return (
    <section id="principles" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
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
            <ShieldCheck size={13} /> Engineering Standards
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            The 7 Principles Behind DevSamp
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            The core engineering and commercial standards that guide how we build, deploy, and maintain software for our clients and products.
          </motion.p>
        </div>

        {/* 7 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 uppercase shadow-2xs">
                      {p.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest block mb-1">
                    PRINCIPLE {p.num}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>STANDARD: ACTIVE</span>
                  <span className="text-indigo-600 font-bold">✓ ENFORCED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyPrinciples;
