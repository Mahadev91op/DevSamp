"use client";

import { motion } from "framer-motion";
import { 
  Workflow, 
  Search, 
  FileCode, 
  Palette, 
  Cpu, 
  ShieldCheck, 
  Rocket, 
  RefreshCw,
  Sparkles
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const steps = [
  {
    num: "01",
    name: "DISCOVER",
    title: "Domain & Friction Discovery",
    desc: "We analyze business workflows, data bottlenecks, compliance requirements, and existing technical debt.",
    icon: Search,
  },
  {
    num: "02",
    name: "DEFINE",
    title: "Architecture & Schema Contracts",
    desc: "Drafting strict schema definitions, API boundaries, entity relationships, and security protocols.",
    icon: FileCode,
  },
  {
    num: "03",
    name: "DESIGN",
    title: "System Architecture & UI Physics",
    desc: "Interactive Figma design systems, component trees, state machine blueprints, and responsive mockups.",
    icon: Palette,
  },
  {
    num: "04",
    name: "BUILD",
    title: "Fullstack Engineering Pod Sprint",
    desc: "Modular code execution in Next.js & Node.js, continuous git merges, and structured repository commits.",
    icon: Cpu,
  },
  {
    num: "05",
    name: "VALIDATE",
    title: "Rigorous QA & Stress Profiling",
    desc: "Automated test suites, end-to-end user path validation, load testing, and edge network benchmarking.",
    icon: ShieldCheck,
  },
  {
    num: "06",
    name: "DEPLOY",
    title: "Edge Production Cutover",
    desc: "Zero-downtime deployment pipelines, DNS propagation, SSL verification, and database sync verification.",
    icon: Rocket,
  },
  {
    num: "07",
    name: "IMPROVE",
    title: "Continuous Observability & Scaling",
    desc: "Real-time telemetry, synthetic latency checks, quarterly database index tuning, and feature extensions.",
    icon: RefreshCw,
  },
];

const ServicesDeliveryApproach = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "EXECUTION METHODOLOGY";
  const title = data?.title || "A Disciplined, 7-Step Delivery Process";
  const description = data?.description || "How our senior engineering pods turn ambiguous business requirements into high-throughput, resilient software systems.";

  return (
    <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-300">
            <Workflow size={13} className="text-indigo-400" />
            <span className="tracking-wide uppercase font-mono">{eyebrow}</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-white">
            {title}
          </h2>

          <p className="text-slate-400 text-fluid-body font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* 7-Step Horizontal / Vertical Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-slate-950/80 border border-white/10 hover:border-indigo-500/50 rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Icon size={18} />
                    </div>
                    <span className="font-mono text-xs font-black text-slate-500">
                      PHASE {step.num}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider mb-1">
                    {step.name}
                  </div>

                  <h3 className="text-base font-black text-white tracking-tight mb-2">
                    {step.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>STATUS: GUARANTEED</span>
                  <span className="text-emerald-400">✓ VERIFIED</span>
                </div>
              </motion.div>
            );
          })}

          {/* Final Summary Card to complete 8-card 4-col layout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.48 }}
            className="bg-gradient-to-br from-slate-900/80 to-blue-950/80 border border-indigo-500/40 rounded-3xl p-6 flex flex-col justify-between text-white"
          >
            <div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-indigo-300 w-fit mb-4">
                <Sparkles size={18} />
              </div>
              <div className="text-[11px] font-mono font-bold text-indigo-300 uppercase tracking-wider mb-1">
                LIFECYCLE GUARANTEE
              </div>
              <h3 className="text-base font-black text-white tracking-tight mb-2">
                100% In-House Accountability
              </h3>
              <p className="text-indigo-200 text-xs leading-relaxed">
                Zero third-party outsourcing. Every line of code, test case, and schema is engineered by our dedicated senior engineers.
              </p>
            </div>
            <div className="pt-4 border-t border-white/15 text-[10px] font-mono text-indigo-300 font-bold">
              FULL CODEBASE HANDOVER INCLUDED
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ServicesDeliveryApproach;
