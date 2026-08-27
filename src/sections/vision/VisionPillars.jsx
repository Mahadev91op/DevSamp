"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Boxes, Layers, Terminal, Cpu, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPillars = [
  {
    title: "Product-First Engineering",
    shortDescription: "We build and operate production SaaS platforms before offering architecture services to clients.",
    description: "Every pattern we deploy has been battle-tested on our own revenue-generating software.",
    icon: "Boxes",
    metric: "100% In-House",
    badge: "FOUNDATION",
    order: 1
  },
  {
    title: "Shared Infrastructure Mesh",
    shortDescription: "One reliable multi-tenant backbone powering authentication, billing, and webhooks across all apps.",
    description: "Eliminates duplicate engineering and creates an effortlessly compounding software suite.",
    icon: "Layers",
    metric: "Unified Core",
    badge: "ARCHITECTURE",
    order: 2
  },
  {
    title: "Open Developer Protocols",
    shortDescription: "Comprehensive REST APIs, event-driven webhooks, and SDKs for global developers.",
    description: "Empowering developers to extend, integrate, and automate workflows effortlessly.",
    icon: "Terminal",
    metric: "REST & Webhooks",
    badge: "EXTENSIBILITY",
    order: 3
  },
  {
    title: "Deterministic Automation",
    shortDescription: "Sub-50ms automated decision pipelines eliminating manual operational overhead.",
    description: "Reliable, audit-compliant background workflows that accelerate business velocity.",
    icon: "Cpu",
    metric: "<50ms Latency",
    badge: "EFFICIENCY",
    order: 4
  },
  {
    title: "SLA-Backed Enterprise Pods",
    shortDescription: "Direct access to software architects who write code and guarantee system reliability.",
    description: "Eliminating agency middle-managers and providing dedicated 24/7 technical guardianship.",
    icon: "ShieldCheck",
    metric: "99.9% Uptime",
    badge: "RELIABILITY",
    order: 5
  },
  {
    title: "Zero Architectural Debt",
    shortDescription: "Enforcing strict type safety, clean schemas, and instant 60fps Core Web Vitals.",
    description: "Software engineered as an appreciating asset designed to endure for decades.",
    icon: "TrendingUp",
    metric: "10x Scalability",
    badge: "QUALITY",
    order: 6
  }
];

const VisionPillars = ({ data = [] }) => {
  const pillars = data && data.length > 0 ? data : defaultPillars;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Sparkles size={12} /> Strategic Foundations
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            6 Core Strategic Pillars
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            The foundational capabilities that guide our product roadmaps, platform architectures, and engineering investments.
          </p>
        </div>

        {/* 6 Strategic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
          {pillars.map((pil, idx) => {
            const Icon = LucideIcons[pil.icon] || Boxes;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div className="space-y-3 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 uppercase">
                      {pil.badge || `PILLAR 0${idx + 1}`}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-950 truncate">
                    {pil.title}
                  </h3>

                  <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                    {pil.shortDescription}
                  </p>

                  <p className="text-slate-500 text-xs font-normal leading-relaxed">
                    {pil.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className="text-slate-400">BENCHMARK</span>
                  <span className="text-indigo-700">{pil.metric || "VERIFIED"}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default VisionPillars;
