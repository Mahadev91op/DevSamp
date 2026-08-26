"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Boxes, 
  Layers, 
  Sparkles, 
  Cpu, 
  Workflow, 
  ShieldCheck, 
  CheckCircle2,
  Terminal,
  Activity
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const matrixData = [
  {
    category: "01. Product Engineering",
    icon: Boxes,
    color: "from-blue-600 to-cyan-500",
    description: "Vertical SaaS applications, multi-tenant databases, and reusable business platforms.",
    capabilities: [
      "Clinical Hospital ERP (MedERP Pro)",
      "Multi-Branch Retail Billing (FlowPulse POS)",
      "Multi-Tenant SaaS Foundation (DevScale Core)",
      "Automated Database Migrations & Tenant Routing"
    ]
  },
  {
    category: "02. Custom Pod Development",
    icon: Layers,
    color: "from-indigo-600 to-purple-600",
    description: "Dedicated engineering pods building bespoke fullstack platforms from scratch.",
    capabilities: [
      "Next.js 15 & React 19 App Router Platforms",
      "High-Concurrency Node.js Microservices",
      "Tailored Workflow Logic & Custom Scopes",
      "100% In-House Senior Architect Codebase"
    ]
  },
  {
    category: "03. UI/UX & Design Systems",
    icon: Sparkles,
    color: "from-purple-600 to-pink-500",
    description: "Production design systems with zero layout shifts and hardware-accelerated animations.",
    capabilities: [
      "60fps Fluid Responsive Interfaces",
      "Design Token Systems in Pure CSS",
      "WCAG 2.1 AA Accessibility Compliance",
      "Custom Micro-Interactions & State HUDs"
    ]
  },
  {
    category: "04. Platform Infrastructure",
    icon: Cpu,
    color: "from-pink-600 to-rose-500",
    description: "Standardized authentication, database indexing, and event webhook gateways.",
    capabilities: [
      "OpenAPI 3.1 REST API Gateways",
      "Universal Event-Driven Webhook Relays",
      "Sub-10ms Compound Query Indexes",
      "Encrypted Cookie Sessions & Granular RBAC"
    ]
  },
  {
    category: "05. Long-Term Operations & SLA",
    icon: ShieldCheck,
    color: "from-emerald-600 to-teal-500",
    description: "Continuous cloud guardianship, telemetry monitoring, and security patch pipelines.",
    capabilities: [
      "24/7 Production SLA & Health Checks",
      "Automated CI/CD Deployment Gates",
      "Zero-Downtime Hot-Patching Protocols",
      "Direct Architect Priority Escalation"
    ]
  }
];

const WhyCapabilityMatrix = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="capabilities" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
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
            <Boxes size={13} /> Comprehensive Matrix
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Full-Spectrum Digital Capabilities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Everything required to design, engineer, deploy, and operate mission-critical modern software systems under one roof.
          </motion.p>
        </div>

        {/* 5 Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matrixData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.07 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${item.color} shadow-xs shrink-0`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 uppercase shadow-2xs">
                      [DOMAIN 0{idx + 1}]
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {item.category}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="space-y-2 pt-3.5 border-t border-slate-100">
                    {item.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs font-bold text-slate-700">
                        <CheckCircle2 size={13} className="text-indigo-600 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>CAPABILITY: ACTIVE</span>
                  <span className="text-indigo-600 font-bold">✓ DELIVERED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyCapabilityMatrix;
