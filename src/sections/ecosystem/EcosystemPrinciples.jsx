"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Cpu, 
  Workflow, 
  Zap, 
  CheckCircle2, 
  HeartHandshake 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPrinciples = [
  {
    icon: Workflow,
    title: "Connected by Design",
    description: "No product or pod operates in an isolated silo. Everything connects through shared authentication, APIs, and standardized telemetry.",
    badge: "INTEROPERABILITY"
  },
  {
    icon: Layers,
    title: "Reusable Software Capital",
    description: "We invest in reusable multi-tenant SaaS modules and boilerplate cores that eliminate repetitive boilerplate development.",
    badge: "EFFICIENCY"
  },
  {
    icon: Cpu,
    title: "Zero Architectural Debt",
    description: "Strict schema contracts, type safety, sub-10ms query indexes, and clean Next.js 15 App Router conventions.",
    badge: "CODE CRAFT"
  },
  {
    icon: ShieldCheck,
    title: "Enterprise SLA & Reliability",
    description: "Guaranteed uptime, automated hot-patch pipelines, and direct pairing with software architects who take pride in production code.",
    badge: "UPTIME SLA"
  }
];

const EcosystemPrinciples = ({ data = [] }) => {
  const principles = data && data.length > 0 ? data : defaultPrinciples;

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
            <ShieldCheck size={13} /> Architectural Tenets
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Core Ecosystem Principles
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            The foundational engineering standards that govern how every product is built, how every pod operates, and how data flows across our platform.
          </motion.p>
        </div>

        {/* 4 Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {principles.map((p, idx) => {
            const Icon = p.icon || ShieldCheck;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 uppercase shadow-2xs">
                      {p.badge || "STANDARD"}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>COMPLIANCE: VERIFIED</span>
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

export default EcosystemPrinciples;
