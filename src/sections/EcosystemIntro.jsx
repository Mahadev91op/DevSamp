"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Boxes, 
  Layers, 
  Terminal, 
  GitBranch, 
  Users, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Workflow
} from "lucide-react";
import Link from "next/link";

const ecosystemPillars = [
  {
    id: "products",
    title: "Software Products & SaaS",
    desc: "Production-grade vertical SaaS systems and platforms engineered to scale seamlessly across enterprise demands.",
    icon: Boxes,
    gradient: "from-blue-600 to-cyan-500",
    badge: "SaaS Layer",
    points: ["Healthcare ERP (MedERP)", "Retail POS Mesh", "Multi-tenant Engines"]
  },
  {
    id: "services",
    title: "Engineering & Solutions",
    desc: "Bespoke technology architecture, Next.js web systems, custom mobile apps, and high-concurrency database engineering.",
    icon: Layers,
    gradient: "from-indigo-600 to-purple-600",
    badge: "Services Layer",
    points: ["Fullstack Next.js 15", "Cloud DevOps & Edge", "UI/UX System Design"]
  },
  {
    id: "developers",
    title: "Developer Platform",
    desc: "Open APIs, webhooks, modular SDKs, and developer tooling empowering teams to build and extend within our platform.",
    icon: Terminal,
    gradient: "from-purple-600 to-pink-600",
    badge: "Platform Layer",
    points: ["REST & GraphQL Gateways", "Event Webhooks", "Zero-config Boilerplates"]
  },
  {
    id: "integrations",
    title: "Mesh Integrations & SLA",
    desc: "Deep interoperability with payment gateways, enterprise ERPs, cloud services, and 24/7 dedicated engineering support.",
    icon: Workflow,
    gradient: "from-emerald-600 to-teal-500",
    badge: "Infrastructure Layer",
    points: ["Payment & Auth Gateways", "Automated CI/CD Pipelines", "Continuous SLA Monitoring"]
  }
];

const EcosystemIntro = ({ sectionData = null }) => {
  const [activePillar, setActivePillar] = useState(0);

  const badge = sectionData?.badge || "Connected Architecture";
  const title = sectionData?.title || "One ecosystem. Multiple possibilities.";
  const description = sectionData?.description || "DevSamp bridges the gap between pre-built software products, bespoke engineering services, and developer infrastructure into one cohesive, scalable ecosystem.";

  return (
    <section id="ecosystem-intro" className="relative py-16 md:py-24 bg-transparent text-slate-900 overflow-hidden">
      
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3.5"
          >
            <Sparkles size={12} /> {badge}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm md:text-base font-semibold leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = activePillar === idx;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setActivePillar(idx)}
                className={`group relative p-6 md:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? "bg-white border-indigo-500/50 shadow-xl shadow-indigo-500/10 -translate-y-1" 
                    : "bg-white/80 border-slate-200/80 hover:border-slate-300 shadow-sm"
                }`}
              >
                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex justify-between items-start mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${pillar.gradient} shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200/60 text-slate-500 uppercase">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                {/* Key Points */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EcosystemIntro;
