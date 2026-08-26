"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Workflow, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  CheckCircle2 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const formulaNodes = [
  {
    step: "01",
    title: "Industry Context",
    subtitle: "Domain Reality & Regulation",
    desc: "Understanding legal constraints, clinical workflows, trade tax compliance, and sector-specific terminology.",
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    step: "02",
    title: "Business Process",
    subtitle: "Operational Handoffs",
    desc: "Mapping how employees, customers, inventory, and payment ledgers actually move through your daily operations.",
    icon: Workflow,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    step: "03",
    title: "DevSamp Technology",
    subtitle: "Proven Platform Foundations",
    desc: "Deploying our high-concurrency database models, sub-10ms query indexes, and multi-tenant authentication.",
    icon: Layers,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    step: "04",
    title: "Useful Digital Solution",
    subtitle: "Compounding Growth & SLA",
    desc: "Delivering custom, durable software that accelerates team throughput and eliminates operational friction.",
    icon: Sparkles,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const IndustryEcosystemIntro = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "DOMAIN ARCHITECTURE";
  const title = data?.title || "Industry Context + Technical Rigor = Compounding Business Value";
  const description = data?.description || "We do not believe in one-size-fits-all generic platforms. Every industry solution is tailored to specific data schemas, workflow handoffs, and compliance boundaries.";

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700">
            <Sparkles size={13} className="text-blue-600" />
            <span className="tracking-wide uppercase font-mono">{eyebrow}</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            {title}
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* 4-Card Adaptation Lifecycle Formula */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {formulaNodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 rounded-3xl p-6 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${node.bg} ${node.color} border border-slate-200/60 shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon size={18} />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      [{node.step} / PILLAR]
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-950 tracking-tight mb-1">
                    {node.title}
                  </h3>

                  <div className="text-xs font-bold text-blue-600 mb-2">
                    {node.subtitle}
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {node.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  <span>SECTOR COMPLIANT</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default IndustryEcosystemIntro;
