"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  Boxes, 
  Layers, 
  Cpu, 
  Workflow, 
  Users, 
  ShieldCheck, 
  TrendingUp,
  CheckCircle2,
  GitBranch
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultEcosystemElements = [
  {
    icon: Boxes,
    title: "Proprietary SaaS Products",
    description: "Battle-tested vertical software applications (like MedERP Pro and FlowPulse POS) built with production multi-tenancy from day one.",
    tag: "SOFTWARE ASSETS"
  },
  {
    icon: Layers,
    title: "Dedicated Engineering Pods",
    description: "Direct fullstack development teams delivering bespoke web platforms, custom workflows, and deep architectural extensions.",
    tag: "CUSTOM CAPABILITY"
  },
  {
    icon: Cpu,
    title: "Shared Platform Engine",
    description: "Standardized authentication, database indexing, telemetry pipelines, and security layers that power every application we ship.",
    tag: "UNIFIED STACK"
  },
  {
    icon: Workflow,
    title: "Open Developer Gateway",
    description: "Standardized REST endpoints, webhook relays, and type-safe SDKs allowing external teams to build and extend effortlessly.",
    tag: "EXTENSIBILITY"
  },
  {
    icon: Users,
    title: "Customer Solution Layer",
    description: "Translating complex operational problems in healthcare, retail, fintech, and startups into compounding business outcomes.",
    tag: "BUSINESS VALUE"
  },
  {
    icon: TrendingUp,
    title: "Continuous Flywheel",
    description: "Client feedback directly enhances our core software modules, accelerating future deployments for all ecosystem participants.",
    tag: "COMPOUNDING GROWTH"
  }
];

const EcosystemDefinition = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "Ecosystem Defined";
  const title = data?.title || "What Does \"Ecosystem\" Mean at DevSamp?";
  const statement = data?.statement || "DevSamp is not an isolated agency building disposable websites. We are an interconnected software ecosystem combining products, custom engineering, and developer platforms.";
  const description = data?.description || "Every component we engineer—from healthcare ERPs to retail POS systems, custom API gateways, and client engineering pods—is designed to interoperate, share telemetry, and compound long-term business value.";
  const highlight = data?.highlight || "Compounding Digital Value";

  return (
    <section id="definition" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
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
            <Sparkles size={13} /> {eyebrow}
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
            {statement}
          </motion.p>
        </div>

        {/* Highlight Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase, delay: 0.2 }}
          className="bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 border border-indigo-100 rounded-3xl p-6 sm:p-8 md:p-10 mb-12 shadow-xs"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 block">
                The Core Premise
              </span>
              <p className="text-slate-800 text-base sm:text-lg font-bold leading-relaxed">
                {description}
              </p>
            </div>
            <div className="shrink-0">
              <div className="px-4 py-2 rounded-2xl bg-white border border-indigo-200 text-indigo-700 font-mono text-xs font-extrabold shadow-xs">
                {highlight}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6 Structural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultEcosystemElements.map((elem, idx) => {
            const Icon = elem.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.07 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 uppercase">
                      {elem.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {elem.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {elem.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>LAYER INTEGRATED</span>
                  <span className="text-indigo-600 font-bold">✓ ACTIVE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EcosystemDefinition;
