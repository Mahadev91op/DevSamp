"use client";

import { motion } from "framer-motion";
import { 
  Workflow, 
  Search, 
  Map, 
  Palette, 
  Cpu, 
  Boxes, 
  ShieldCheck, 
  RefreshCw,
  Sparkles
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const lifecycleStages = [
  {
    step: "01",
    name: "UNDERSTAND",
    title: "Domain Discovery & Policy Audits",
    desc: "Auditing compliance requirements, statutory tax structures, patient record rules, and specific vendor bottlenecks.",
    icon: Search,
  },
  {
    step: "02",
    name: "MAP",
    title: "Process & Data Handoff Mesh",
    desc: "Diagramming asynchronous entity relationships, state transitions, event triggers, and database schema trees.",
    icon: Map,
  },
  {
    step: "03",
    name: "DESIGN",
    title: "Domain Interface & Token Physics",
    desc: "Crafting specialized user experiences for doctors, cashier operators, warehouse managers, and executive auditors.",
    icon: Palette,
  },
  {
    step: "04",
    name: "ENGINEER",
    title: "High-Throughput Fullstack Sprints",
    desc: "Senior engineering pods building Next.js App Router frontends and low-latency Node.js / MongoDB services.",
    icon: Cpu,
  },
  {
    step: "05",
    name: "INTEGRATE",
    title: "Ecosystem & Hardware Bridges",
    desc: "Connecting barcode scanners, diagnostic telemetry, payment gateways, and legacy ERP database endpoints.",
    icon: Boxes,
  },
  {
    step: "06",
    name: "VALIDATE",
    title: "Penetration Testing & Stress QA",
    desc: "Simulating peak transaction loads, zero-trust vulnerability checks, and automated compliance auditing.",
    icon: ShieldCheck,
  },
  {
    step: "07",
    name: "IMPROVE",
    title: "24/7 SLA Telemetry & Evolution",
    desc: "Proactive database indexing, real-time error telemetry, and quarterly roadmap scaling adjustments.",
    icon: RefreshCw,
  },
];

const IndustrySolutionFramework = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "ENGINEERING FRAMEWORK";
  const title = data?.title || "Our 7-Stage Domain Adaptation Lifecycle";
  const description = data?.description || "How our senior architects transform complex industry friction points into resilient, automated software ecosystems.";

  return (
    <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[350px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-300">
            <Workflow size={13} className="text-blue-400" />
            <span className="tracking-wide uppercase font-mono">{eyebrow}</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-white">
            {title}
          </h2>

          <p className="text-slate-400 text-fluid-body font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* 7-Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifecycleStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-slate-950/80 border border-white/10 hover:border-blue-500/50 rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon size={18} />
                    </div>
                    <span className="font-mono text-xs font-black text-slate-500">
                      PHASE {stage.step}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
                    {stage.name}
                  </div>

                  <h3 className="text-base font-black text-white tracking-tight mb-2">
                    {stage.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>FRAMEWORK STANDARD</span>
                  <span className="text-emerald-400">✓ RIGOROUS</span>
                </div>
              </motion.div>
            );
          })}

          {/* Final 8th Card to complete balanced 4-column layout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.48 }}
            className="bg-gradient-to-br from-blue-900/60 to-indigo-900/60 border border-blue-500/40 rounded-3xl p-6 flex flex-col justify-between text-white"
          >
            <div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-blue-300 w-fit mb-4">
                <Sparkles size={18} />
              </div>
              <div className="text-[11px] font-mono font-bold text-blue-300 uppercase tracking-wider mb-1">
                SECTOR GOVERNANCE
              </div>
              <h3 className="text-base font-black text-white tracking-tight mb-2">
                100% In-House Accountability
              </h3>
              <p className="text-blue-200 text-xs leading-relaxed">
                Zero black-box outsourcing. Every database transaction, API connector, and UI state machine is written and maintained by DevSamp.
              </p>
            </div>
            <div className="pt-4 border-t border-white/15 text-[10px] font-mono text-blue-300 font-bold">
              FULL CODEBASE HANDOVER INCLUDED
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default IndustrySolutionFramework;
