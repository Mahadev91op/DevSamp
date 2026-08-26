"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Workflow, 
  Boxes, 
  Layers, 
  Cpu, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  ArrowDown, 
  ChevronRight,
  GitBranch,
  Terminal,
  Activity,
  CheckCircle2
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultTiers = [
  {
    tierId: "tier-1",
    level: "TIER 01",
    name: "DevSamp Orchestration Hub",
    badge: "CORE ENGINE",
    description: "Central platform orchestration coordinating tenant state, authentication gateways, telemetry monitors, and cloud deployments.",
    components: ["Multi-Tenant RBAC", "Global Telemetry Monitor", "CI/CD Deployment Mesh", "Universal Event Relays"],
    color: "from-blue-600 to-indigo-600",
    icon: Cpu
  },
  {
    tierId: "tier-2",
    level: "TIER 02",
    name: "Tri-Pillar Delivery Matrix",
    badge: "CAPABILITIES",
    description: "Three interconnected delivery channels providing software assets, bespoke engineering, and developer extensibility.",
    subTiers: [
      { name: "SaaS Products", desc: "MedERP Pro, FlowPulse POS, DevScale Core", icon: Boxes, color: "text-blue-600 bg-blue-50" },
      { name: "Engineering Pods", desc: "Fullstack web platforms, AI systems, custom UI", icon: Layers, color: "text-indigo-600 bg-indigo-50" },
      { name: "Developer Layer", desc: "Open REST APIs, event webhooks, modular SDKs", icon: Terminal, color: "text-purple-600 bg-purple-50" }
    ],
    components: ["Reusable SaaS Apps", "Custom Development Pods", "Public API Gateways"],
    color: "from-indigo-600 to-purple-600",
    icon: Layers
  },
  {
    tierId: "tier-3",
    level: "TIER 03",
    name: "Vertical Solution Frameworks",
    badge: "SOLUTIONS",
    description: "Configurable business solutions tailored for specific industries—combining pre-built products with custom workflow logic.",
    components: ["Clinical & Healthcare", "Retail & POS Chains", "Fintech & Ledgers", "Startup SaaS Engines"],
    color: "from-purple-600 to-pink-600",
    icon: Workflow
  },
  {
    tierId: "tier-4",
    level: "TIER 04",
    name: "Enterprise & Client Operations",
    badge: "OUTCOMES",
    description: "High-growth businesses operating live production workloads backed by continuous SLA retainers and direct architect pairing.",
    components: ["24/7 Production SLA", "Automated Security Patches", "Direct Engineer Retainers", "Predictable Scaling"],
    color: "from-emerald-600 to-teal-600",
    icon: Users
  }
];

const EcosystemArchitecture = ({ data = null }) => {
  const [activeTier, setActiveTier] = useState("tier-1");

  const eyebrow = data?.eyebrow || "System Topology";
  const title = data?.title || "The DevSamp Structural Hierarchy";
  const description = data?.description || "How data, services, products, and customer applications interact within our unified architectural model.";
  const tiers = data?.tiers && data.tiers.length > 0 ? data.tiers : defaultTiers;

  const selectedTier = tiers.find(t => t.tierId === activeTier) || tiers[0];
  const SelectedIcon = selectedTier.icon || Cpu;

  return (
    <section id="architecture" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
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
            <Workflow size={13} /> {eyebrow}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* Interactive Architecture Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stacked Interactive Tiers Flow */}
          <div className="lg:col-span-7 space-y-4">
            {tiers.map((tier, idx) => {
              const TierIcon = tier.icon || Cpu;
              const isSelected = activeTier === tier.tierId;

              return (
                <div key={tier.tierId || idx} className="relative">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActiveTier(tier.tierId)}
                    className={`p-5 sm:p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/20"
                        : "bg-white/80 border-slate-200/90 hover:border-slate-300 shadow-xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${tier.color || "from-blue-600 to-indigo-600"} shadow-xs shrink-0`}>
                          <TierIcon size={18} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest block">
                            {tier.level}
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-slate-900">
                            {tier.name}
                          </h3>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 uppercase shrink-0">
                        {tier.badge}
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                      {tier.description}
                    </p>

                    {/* Sub-tiers preview if available */}
                    {tier.subTiers && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100">
                        {tier.subTiers.map((sub, sIdx) => {
                          const SubIcon = sub.icon;
                          return (
                            <div key={sIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg ${sub.color} shrink-0`}>
                                <SubIcon size={13} />
                              </div>
                              <span className="text-xs font-bold text-slate-800 truncate">{sub.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>

                  {/* Connecting Flow Arrow */}
                  {idx < tiers.length - 1 && (
                    <div className="flex justify-center my-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-2xs">
                        <ArrowDown size={12} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Tier Deep Inspector */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 bg-white border border-indigo-100 p-6 sm:p-8 rounded-3xl shadow-sm relative space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${selectedTier.color || "from-blue-600 to-indigo-600"} shadow-xs shrink-0`}>
                <SelectedIcon size={22} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest block">
                  LAYER INSPECTOR • {selectedTier.level}
                </span>
                <h3 className="text-lg font-black text-slate-900">{selectedTier.name}</h3>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                LAYER RESPONSIBILITY
              </span>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                {selectedTier.description}
              </p>
            </div>

            {selectedTier.components && selectedTier.components.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  ACTIVE SUB-SYSTEM COMPONENTS
                </span>
                <div className="space-y-2">
                  {selectedTier.components.map((comp, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-slate-800 truncate">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
              <span>CONTRACT: ENFORCED</span>
              <span className="text-indigo-600">✓ ZERO DRIFT</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EcosystemArchitecture;
