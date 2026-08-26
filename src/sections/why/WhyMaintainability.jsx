"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Sparkles, 
  Code2, 
  GitBranch, 
  FileText, 
  CheckCircle2, 
  LockOpen 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const maintainabilityFeatures = [
  {
    icon: LockOpen,
    title: "100% Client Code Ownership",
    description: "You receive clean, well-documented source code repositories and full intellectual property rights upon milestone completion."
  },
  {
    icon: Code2,
    title: "Zero Obfuscation or Lock-In",
    description: "Built using standard Next.js 15, React 19, and Node.js conventions. Any competent developer can understand and extend our codebases."
  },
  {
    icon: FileText,
    title: "Comprehensive Documentation",
    description: "Every deployment includes schema definitions, API OpenAPI specifications, and architecture decision logs."
  },
  {
    icon: GitBranch,
    title: "Automated CI/CD Pipelines",
    description: "Automated testing, lint gates, and continuous deployment workflows that ensure smooth onboarding for your internal teams."
  }
];

const WhyMaintainability = () => {
  return (
    <section id="maintainability" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3"
          >
            <ShieldCheck size={13} /> True Ownership
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            100% Code Ownership &amp; Maintainable Conventions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            A system should never become impossible for another engineer to understand. We build clean, understandable software that stays an asset for years.
          </motion.p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {maintainabilityFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-emerald-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs shrink-0">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 uppercase shadow-2xs">
                      [STANDARD 0{idx + 1}]
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>PROPRIETARY LOCK-IN</span>
                  <span className="text-emerald-600 font-bold">✓ 0% GUARANTEED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyMaintainability;
