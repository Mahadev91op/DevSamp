"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ShieldCheck, Code2, Compass, CheckCircle2, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPoints = [
  { title: "100% In-House Precision", description: "Zero outsourcing. Every line of code is written and verified by core DevSamp engineers.", icon: "Code2" },
  { title: "Transparent Async Workflows", description: "Clear sprint milestones, detailed architecture documentation, and recorded walkthroughs.", icon: "Compass" },
  { title: "Automated QA & Linting", description: "Continuous integration pipelines enforcing zero layout shift and strict schema types.", icon: "CheckCircle2" },
  { title: "Guaranteed SLA Guardianship", description: "24/7 technical monitoring, security patch deployment, and priority escalation channels.", icon: "ShieldCheck" }
];

const MissionQualityTrust = ({ data = null }) => {
  const title = data?.title || "Engineering Standards You Can Trust";
  const description = data?.description || "Direct access to senior architects, transparent async documentation, automated regression testing, and production-grade SLAs.";
  const points = data?.points && data.points.length > 0 ? data.points : defaultPoints;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <ShieldCheck size={12} /> Quality Assurance
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            {description}
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {points.map((pt, idx) => {
            const Icon = LucideIcons[pt.icon] || ShieldCheck;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-950 mb-1.5 truncate">
                    {pt.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {pt.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono text-indigo-700 font-bold">
                  ✓ TRUST STANDARD
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MissionQualityTrust;
