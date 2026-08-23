"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Compass, Target, Code2, Lock, Cpu, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPrinciples = [
  { title: "Build for Real Problems", description: "Every component must solve an actual business need. We never build speculative fluff.", icon: "Target", badge: "PURPOSE", order: 1 },
  { title: "Keep Systems Maintainable", description: "Readable code with clear conventions always triumphs over opaque, clever abstractions.", icon: "Code2", badge: "READABILITY", order: 2 },
  { title: "Security by Default", description: "HTTP-only cookie sessions, granular RBAC scopes, and strict input validation at every layer.", icon: "Lock", badge: "SECURITY", order: 3 },
  { title: "Automate Repetitive Work", description: "Sub-50ms deterministic pipelines for reporting, synchronization, and testing.", icon: "Cpu", badge: "AUTOMATION", order: 4 }
];

const MissionEngineeringPrinciples = ({ data = [] }) => {
  const principles = data && data.length > 0 ? data : defaultPrinciples;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Compass size={12} /> Engineering Standards
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Core Engineering Principles
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            The non-negotiable coding standards and technical guardrails that govern every pull request we merge.
          </p>
        </div>

        {/* 4 Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {principles.map((pr, idx) => {
            const Icon = LucideIcons[pr.icon] || Compass;

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
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 uppercase">
                      {pr.badge || `RULE 0${idx + 1}`}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-950 mb-2 truncate">
                    {pr.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {pr.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                  <span>GUARDRAIL</span>
                  <span className="text-indigo-700">✓ ENFORCED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MissionEngineeringPrinciples;
