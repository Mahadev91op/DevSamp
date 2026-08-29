"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Boxes, Workflow, Layers, Zap, ArrowRight, ShieldCheck } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

export default function CustomerEngagementTypes({ data = null }) {
  const models = [
    {
      title: "Enterprise SaaS Platforms",
      badge: "Software License",
      description: "Turnkey deployment of our proprietary vertical platforms such as MedERP Pro (Hospital/Diagnostics) and FlowPulse POS (Multi-Branch Retail).",
      icon: Boxes,
      link: "/products",
      cta: "View Software Portfolio"
    },
    {
      title: "Dedicated Engineering Pods",
      badge: "Monthly Retainer",
      description: "Fullstack engineering pods embedded directly into your product lifecycle for high-velocity software development with predictable sprint cadence.",
      icon: Workflow,
      link: "/services",
      cta: "Explore Engineering Services"
    },
    {
      title: "Custom Cloud & API Meshes",
      badge: "Architectural Build",
      description: "Bespoke distributed architectures, multi-tenant databases, real-time telemetry streaming, and high-concurrency payment gateways.",
      icon: Layers,
      link: "/#contact",
      cta: "Discuss Custom Mesh"
    },
    {
      title: "Strategic Technology Alliances",
      badge: "Strategic Partner",
      description: "Long-term co-engineering partnerships and cloud integrations with domain leaders to deliver compounding technological advantage.",
      icon: Zap,
      link: "/#contact",
      cta: "Partner With DevSamp"
    }
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-slate-50/50 border-b border-slate-200/60 overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider shadow-2xs"
          >
            <Workflow size={12} className="text-blue-600" />
            <span>COMMERCIAL COLLABORATION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight"
          >
            How Organizations Engage DevSamp
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.1 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            From turnkey SaaS deployments to bespoke engineering retainers, our engagement models adapt to your product roadmap and scale.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((model, idx) => {
            const Icon = model.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.08 }}
                className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 uppercase">
                      {model.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {model.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {model.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={model.link}
                    className="text-xs font-bold text-blue-600 group-hover:text-blue-800 flex items-center gap-1.5 transition-colors"
                  >
                    <span>{model.cta}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <ShieldCheck size={12} className="text-emerald-600" />
                    <span>SLA Guaranteed</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
