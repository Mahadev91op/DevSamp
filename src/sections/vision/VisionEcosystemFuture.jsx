"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Workflow, Cpu, Boxes, Building2, Users, ArrowDown, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultLayers = [
  {
    layerName: "DEVSAMP CORE INFRASTRUCTURE",
    role: "Foundation Layer",
    description: "Multi-tenant database clusters, edge CDN, global encryption, and session isolation.",
    components: ["Next.js 15 Hybrid Runtime", "MongoDB Atlas Mesh", "Edge Key-Value Sync", "Zero-Trust RBAC"],
    icon: "Cpu",
    order: 1
  },
  {
    layerName: "UNIFIED APPLICATION & API LAYER",
    role: "Presentation & Integration",
    description: "Vertical SaaS suites and developer gateways communicating over standardized REST and event webhooks.",
    components: ["MedERP Pro Suite", "FlowPulse POS", "DevScale Core", "Open REST Gateway"],
    icon: "Boxes",
    order: 2
  },
  {
    layerName: "ORGANIZATIONS & TENANCY MESH",
    role: "Business Execution",
    description: "Granular enterprise organizations with custom domain routing, SLA retainers, and telemetry streams.",
    components: ["Hospital Networks", "Fintech Operators", "E-Commerce Brands", "Enterprise Engineering Pods"],
    icon: "Building2",
    order: 3
  },
  {
    layerName: "GLOBAL END-USER EXPERIENCES",
    role: "Interaction Layer",
    description: "Sub-50ms web interfaces, mobile web PWA clients, and instant offline-first dashboards.",
    components: ["Doctors & Clinicians", "Store Managers", "Platform Engineers", "End Consumers"],
    icon: "Users",
    order: 4
  }
];

const VisionEcosystemFuture = ({ data = [] }) => {
  const layers = data && data.length > 0 ? data : defaultLayers;

  return (
    <section id="ecosystem-future" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Workflow size={12} /> Target Architecture
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            The Future Connected Ecosystem Topology
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            A unified 4-tier structural model linking core infrastructure, software applications, business organizations, and global end users.
          </p>
        </div>

        {/* Stacked Architecture Hierarchy */}
        <div className="space-y-4 relative min-w-0">
          {layers.map((lay, idx) => {
            const Icon = LucideIcons[lay.icon] || Cpu;

            return (
              <div key={idx} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.08 }}
                  className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all min-w-0"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-indigo-700 uppercase">
                            LAYER 0{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-500 font-mono">
                            {lay.role}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-slate-950 truncate mt-0.5">
                          {lay.layerName}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-4">
                    {lay.description}
                  </p>

                  {/* Component Chips */}
                  {lay.components && lay.components.length > 0 && (
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                      {lay.components.map((comp, cIdx) => (
                        <span key={cIdx} className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs">
                          {comp}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Connection Arrow Down between layers */}
                {idx < layers.length - 1 && (
                  <div className="flex justify-center items-center py-1 text-indigo-400">
                    <div className="p-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
                      <ArrowDown size={14} className="animate-bounce" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default VisionEcosystemFuture;
