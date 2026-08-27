"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Sparkles, Layers, Cpu, Workflow, ShieldCheck, Boxes, CheckCircle2, ArrowUpRight, Globe, Code2 } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPoints = [
  {
    title: "4 Flagship SaaS Products",
    description: "Production ERPs, billing engines, and offline-first POS systems in active operation.",
    icon: "Boxes",
    tag: "LIVE PLATFORMS"
  },
  {
    title: "100% In-House Engineering",
    description: "Direct developer pods specializing in Next.js 15, Node microservices, and high-performance databases.",
    icon: "Cpu",
    tag: "SPECIALIZED PODS"
  },
  {
    title: "Standardized API Protocol",
    description: "Interconnected REST gateways, webhooks, and unified RBAC authentication across all products.",
    icon: "Workflow",
    tag: "OPEN PROTOCOLS"
  },
  {
    title: "SLA-Backed Reliability",
    description: "24/7 infrastructure telemetry, automated CI/CD patch pipelines, and direct escalation channels.",
    icon: "ShieldCheck",
    tag: "ENTERPRISE SUPPORT"
  }
];

const AboutOverview = ({ data = null }) => {
  const companyType = data?.companyType || "Technology Ecosystem & Software Products Company";
  const focus = data?.focus || "SaaS Platforms, Digital Infrastructure & Bespoke Engineering";
  const model = data?.model || "Product-First Engineering & Dedicated Pods";
  const orientation = data?.orientation || "Multi-Tenant Architecture, Edge Telemetry & High Availability";
  const points = data?.points && data.points.length > 0 ? data.points : defaultPoints;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Split Editorial Manifesto Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start min-w-0">
          
          {/* Left Column: Manifesto Statement */}
          <div className="lg:col-span-5 space-y-6 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest">
              <Sparkles size={12} /> At a Glance
            </div>

            <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950 leading-tight">
              A company built on the intersection of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
                software products & elite engineering.
              </span>
            </h2>

            <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
              DevSamp is not a traditional agency that builds disposable websites. We are a product-first engineering firm operating proprietary vertical software while deploying dedicated development pods for ambitious enterprises.
            </p>

            {/* Compact Specifications Box */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-400 font-bold">TYPE</span>
                <span className="text-slate-800 font-bold">{companyType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-400 font-bold">MODEL</span>
                <span className="text-slate-800 font-bold">{model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">POSTURE</span>
                <span className="text-indigo-600 font-bold">{orientation}</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Editorial Identity Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 min-w-0">
            {points.map((pt, idx) => {
              const Icon = LucideIcons[pt.icon] || CheckCircle2;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.08 }}
                  className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                        <Icon size={20} />
                      </div>
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 uppercase">
                        {pt.tag || `ITEM 0${idx + 1}`}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 mb-1.5">
                      {pt.title}
                    </h3>
                    
                    <p className="text-slate-500 text-xs leading-relaxed font-normal">
                      {pt.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/70 text-[10px] font-mono text-indigo-600 font-bold">
                    ✓ VERIFIED SPECIFICATION
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutOverview;
