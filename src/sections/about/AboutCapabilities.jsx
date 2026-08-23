"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Cpu, Boxes, Server, Workflow, Sparkles, ShieldCheck } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultCapabilities = [
  {
    title: "Full-Stack Web Architecture",
    description: "Next.js 15 App Router, React 19 Server Components, SSR, and micro-frontend orchestration.",
    icon: "Cpu",
    category: "Engineering"
  },
  {
    title: "Multi-Tenant SaaS Engineering",
    description: "Database isolation, automated tenant provisioning, stripe/payment billing meshes, and RBAC.",
    icon: "Boxes",
    category: "SaaS"
  },
  {
    title: "High-Performance Cloud & Edge",
    description: "Global edge caching, serverless compute, containerized deployments, and sub-50ms regional latency.",
    icon: "Server",
    category: "Infrastructure"
  },
  {
    title: "API Gateways & Real-Time Mesh",
    description: "OpenAPI 3.1 specifications, webhook dispatchers, WebSockets, and event-driven architectures.",
    icon: "Workflow",
    category: "APIs"
  },
  {
    title: "High-Precision UI/UX Design",
    description: "Vercel-level interactive design systems, fluid responsive typography, and micro-interactions.",
    icon: "Sparkles",
    category: "Design"
  },
  {
    title: "Enterprise Security & SLA",
    description: "JWT session encryption, automated CI/CD lint pipelines, dependency patching, and 99.9% uptime SLA.",
    icon: "ShieldCheck",
    category: "Security"
  }
];

const AboutCapabilities = ({ data = [] }) => {
  const capabilities = data && data.length > 0 ? data : defaultCapabilities;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Cpu size={12} /> Technical Mastery
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Core Engineering & Architectural Capabilities
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            The technical competencies our engineers deploy to solve complex enterprise problems.
          </p>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 min-w-0">
          {capabilities.map((cap, idx) => {
            const Icon = LucideIcons[cap.icon] || Cpu;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 md:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div className="min-w-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 uppercase">
                      {cap.category || "Domain"}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 mb-1.5 truncate">
                    {cap.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
                  <span>PRODUCTION TESTED</span>
                  <span className="text-emerald-600 font-extrabold">✓ HIGH VELOCITY</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutCapabilities;
