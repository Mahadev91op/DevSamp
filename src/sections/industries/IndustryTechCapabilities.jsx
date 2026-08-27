"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Zap, 
  Workflow, 
  Lock,
  Layers,
  Sparkles
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const capabilities = [
  {
    title: "1. Zero-Trust Security & Isolation",
    desc: "Strict tenant data boundary isolation, AES-256 encrypted storage, and JWT token rotation with HttpOnly cookies.",
    icon: Lock,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "2. High-Throughput Database Meshes",
    desc: "Compound MongoDB B-tree indexes, Redis in-memory cache layers, and sub-10ms query performance guarantees.",
    icon: Database,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "3. Real-Time Hardware & API Sync",
    desc: "Bidirectional WebSockets and edge webhook dispatchers for lab analyzers, POS thermal printers, and payment terminals.",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "4. Compliance & Audit Telemetry",
    desc: "Immutable timestamped event ledgers, automated schema validations, and continuous uptime monitoring probes.",
    icon: ShieldCheck,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const IndustryTechCapabilities = () => {
  return (
    <section className="py-20 md:py-28 bg-slate-50/50 border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
            <Cpu size={13} className="text-blue-600" />
            <span className="tracking-wide uppercase font-mono">SECTOR INFRASTRUCTURE</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            Engineered for Compliance, Speed & Reliability
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            Every vertical deployment adheres to enterprise security standards, sub-10ms database execution, and zero vendor lock-in.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-white border border-slate-200/80 hover:border-blue-500/40 rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${cap.bg} ${cap.color} border border-slate-200/60 shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="text-base font-black text-slate-950 tracking-tight mb-2">
                    {cap.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                  <span>ENTERPRISE SPEC</span>
                  <span className="text-emerald-600">✓ ENFORCED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default IndustryTechCapabilities;
