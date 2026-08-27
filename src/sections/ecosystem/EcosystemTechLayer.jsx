"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Workflow, 
  GitBranch, 
  Database, 
  Lock, 
  Activity,
  Layers
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const techFoundations = [
  {
    icon: Layers,
    title: "Next.js 15 App Architecture",
    description: "Server Actions, React 19 streaming SSR, and zero layout-shift hydration across all web interfaces.",
    specs: "React 19 • App Router • Server Actions"
  },
  {
    icon: Database,
    title: "High-Concurrency Data Tier",
    description: "Optimized MongoDB schema indexing, isolated tenant schemas, and sub-10ms query execution times.",
    specs: "Sub-10ms Indexes • Replica Sets • Multi-Tenancy"
  },
  {
    icon: Lock,
    title: "Standardized Auth & RBAC",
    description: "Encrypted JWT sessions, httpOnly cookies, role-based redirects, and fine-grained API permission scopes.",
    specs: "JWT • PBKDF2 • Role Matrices • Session Guard"
  },
  {
    icon: GitBranch,
    title: "Event-Driven Webhook Relays",
    description: "Real-time dispatch on product mutations, client invoice generation, and system state transitions.",
    specs: "0-Drop Queue • HMAC Verification • Retries"
  },
  {
    icon: Activity,
    title: "Global Edge & Telemetry Mesh",
    description: "Vercel edge nodes combined with AWS compute clusters backed by continuous automated health checks.",
    specs: "99.9% SLA • <15ms Edge Latency • 100 PageSpeed"
  },
  {
    icon: ShieldCheck,
    title: "Production Patching & SLA",
    description: "Immutable production deployments, automated lint pipelines, and automated security patch schedules.",
    specs: "CI/CD Gate • Zero Downtime • Hot Patching"
  }
];

const EcosystemTechLayer = () => {
  return (
    <section id="tech-layer" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
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
            <Cpu size={13} /> Layer 03 • Technology
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Unified Engineering Foundation
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Every product and service inside DevSamp shares the same high-standard technical foundation. This eliminates duplicate infrastructure, accelerates deployment velocity, and guarantees enterprise uptime.
          </motion.p>
        </div>

        {/* 6 Technology Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techFoundations.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.07 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 uppercase">
                      STANDARDIZED
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {tech.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-4">
                    {tech.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-indigo-700 font-bold">
                  <span className="truncate">{tech.specs}</span>
                  <span className="shrink-0">✓ VERIFIED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EcosystemTechLayer;
