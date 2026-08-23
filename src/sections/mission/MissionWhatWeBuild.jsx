"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Boxes, Cpu, Workflow, Zap, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultCapabilities = [
  {
    title: "Vertical SaaS Software Products",
    description: "Battle-tested platforms like MedERP Pro and FlowPulse POS built for specific business verticals.",
    category: "Products",
    icon: "Boxes",
    badge: "FLAGSHIP",
    order: 1
  },
  {
    title: "Bespoke Full-Stack Web Platforms",
    description: "High-performance Next.js 15, Node.js, and MongoDB platforms custom-crafted for enterprise clients.",
    category: "Engineering",
    icon: "Cpu",
    badge: "CUSTOM SCOPE",
    order: 2
  },
  {
    title: "Unified API Gateways & Webhooks",
    description: "Standardized REST interfaces and event dispatchers enabling cross-system interoperability.",
    category: "APIs",
    icon: "Workflow",
    badge: "INTEGRATION",
    order: 3
  },
  {
    title: "Autonomous Operational Pipelines",
    description: "Sub-50ms deterministic automation for billing, report parsing, and multi-tenant telemetry.",
    category: "Automation",
    icon: "Zap",
    badge: "EFFICIENCY",
    order: 4
  }
];

const MissionWhatWeBuild = ({ data = [] }) => {
  const capabilities = data && data.length > 0 ? data : defaultCapabilities;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Boxes size={12} /> Systems & Products
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            What We Build
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            A balanced portfolio of proprietary vertical SaaS products and bespoke software platforms built to enterprise standards.
          </p>
        </div>

        {/* 4 Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {capabilities.map((cap, idx) => {
            const Icon = LucideIcons[cap.icon] || Boxes;

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
                      {cap.badge || cap.category}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-950 mb-2 truncate">
                    {cap.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                  <span>CATEGORY</span>
                  <span className="text-indigo-600 font-extrabold uppercase">{cap.category}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dual Actions CTA */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
          <Link href="/products">
            <button className="px-6 py-3 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer">
              <Boxes size={14} />
              <span>Explore Software Products</span>
              <ArrowRight size={14} />
            </button>
          </Link>
          <Link href="/#services">
            <button className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer">
              <Cpu size={14} className="text-indigo-600" />
              <span>Bespoke Engineering Services</span>
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default MissionWhatWeBuild;
