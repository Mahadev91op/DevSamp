"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Boxes, 
  Layers, 
  Cpu, 
  Workflow, 
  Users, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GitBranch
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const coreLayers = [
  {
    layerId: "01",
    name: "Products Layer",
    subtitle: "Reusable Software & SaaS Assets",
    description: "Multi-tenant vertical SaaS applications engineered to eliminate business friction in healthcare, retail, and enterprise resource planning.",
    icon: Boxes,
    color: "from-blue-600 to-cyan-500",
    badge: "SOFTWARE ASSETS",
    linkUrl: "#products-layer",
    capabilities: ["Multi-Tenant Architecture", "Instant Subdomain Isolation", "Automated DB Migrations", "Modular Feature Flags"]
  },
  {
    layerId: "02",
    name: "Services Layer",
    subtitle: "Custom Fullstack Engineering Pods",
    description: "Dedicated software engineering pods pairing directly with business leaders to build, integrate, and support custom high-scale platforms.",
    icon: Layers,
    color: "from-indigo-600 to-purple-600",
    badge: "CUSTOM PODS",
    linkUrl: "#services-layer",
    capabilities: ["Next.js 15 & React 19", "High-Concurrency Node APIs", "60fps Responsive UI/UX", "Database Optimization"]
  },
  {
    layerId: "03",
    name: "Technology Layer",
    subtitle: "Public Platform Infrastructure",
    description: "Shared infrastructure foundation providing unified authentication, event-driven webhooks, low-latency database indexes, and edge SLA.",
    icon: Cpu,
    color: "from-purple-600 to-pink-500",
    badge: "PLATFORM CORE",
    linkUrl: "#tech-layer",
    capabilities: ["Standardized REST Gateways", "Event Webhook Dispatch", "Edge Node Telemetry", "Automated Security Patches"]
  },
  {
    layerId: "04",
    name: "Solutions Layer",
    subtitle: "Vertical Industry Frameworks",
    description: "Bridging business requirements with software execution through tailored workflows, regulatory compliance, and ERP customization.",
    icon: Workflow,
    color: "from-pink-600 to-rose-500",
    badge: "BUSINESS IMPACT",
    linkUrl: "#solutions-layer",
    capabilities: ["Clinical Healthcare (HIPAA)", "Multi-Branch Retail & POS", "Fintech Ledger Protocols", "Custom SaaS Integrations"]
  },
  {
    layerId: "05",
    name: "Customer Layer",
    subtitle: "Enterprise Workloads & Growth",
    description: "Real businesses running daily operational workloads backed by dedicated SLA monitoring and continuous software upgrades.",
    icon: Users,
    color: "from-emerald-600 to-teal-500",
    badge: "LONG-TERM PARTNERS",
    linkUrl: "#customer-layer",
    capabilities: ["24/7 Uptime SLA", "Predictable Maintenance", "Dedicated Escalation Pods", "Compounding Upgrades"]
  }
];

const EcosystemLayers = ({ data = null }) => {
  const [activeLayer, setActiveLayer] = useState(0);

  const eyebrow = data?.eyebrow || "Ecosystem Tiers";
  const title = data?.title || "The 5 Core Ecosystem Layers";
  const description = data?.description || "A cohesive modular stack that enables DevSamp to build, deliver, operate, and scale modern software systems without architectural friction.";

  return (
    <section id="layers" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
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
            <Layers size={13} /> {eyebrow}
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

        {/* 5 Core Layers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreLayers.map((layer, idx) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.07 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${layer.color} shadow-xs shrink-0`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 uppercase shadow-2xs">
                      [LAYER {layer.layerId}]
                    </span>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xl font-black text-slate-900 mb-1">
                      {layer.name}
                    </h3>
                    <p className="text-xs font-bold text-indigo-600 font-mono uppercase tracking-wider">
                      {layer.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                    {layer.description}
                  </p>

                  {/* Capabilities */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-200/70">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Core Layer Specs
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.capabilities.map((cap, cIdx) => (
                        <span key={cIdx} className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 text-slate-700">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70">
                  <a
                    href={layer.linkUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <span>Inspect Layer Deep Dive</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EcosystemLayers;
