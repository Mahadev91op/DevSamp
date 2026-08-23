"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Boxes, Layers, Terminal, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const AboutEcosystem = ({ products = [], services = [] }) => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Boxes size={12} /> Ecosystem Architecture
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            What We Build Across the DevSamp Ecosystem
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            An interconnected portfolio of software products, specialized engineering capabilities, and developer tools.
          </p>
        </div>

        {/* 2 Major Branches: Products & Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-w-0">
          
          {/* Branch 1: SaaS Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="bg-slate-50/80 border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs min-w-0"
          >
            <div className="space-y-4 min-w-0">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                  <Boxes size={22} />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 uppercase">
                  4 FLAGSHIP PRODUCTS
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-950 tracking-tight mb-2">
                  Vertical SaaS & Products
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                  Turnkey, production-grade applications engineered for healthcare, enterprise billing, offline retail, and AI automation.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {[
                  { name: "MedERP Pro", desc: "Clinical ERP & Hospital Orchestration" },
                  { name: "DevScale Core", desc: "Multi-Tenant SaaS Foundation & Billing" },
                  { name: "FlowPulse POS", desc: "Omnichannel Offline-First POS & Stock Mesh" },
                  { name: "OmniDesk AI", desc: "Autonomous CRM & Workflow Orchestration" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800">
                    <span className="truncate">{item.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold truncate">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/80">
              <Link href="/products">
                <button 
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
                  data-cursor="Products"
                >
                  <span>Explore All Products</span>
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Branch 2: Engineering Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="bg-slate-50/80 border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs min-w-0"
          >
            <div className="space-y-4 min-w-0">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shadow-xs">
                  <Layers size={22} />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 uppercase">
                  CUSTOM PODS
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-950 tracking-tight mb-2">
                  Bespoke Engineering Services
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                  Dedicated engineering squads building custom full-stack web platforms, mobile apps, and automated backend infrastructure.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {[
                  { name: "Full-Stack Web Engineering", desc: "Next.js 15, React 19 & High Performance" },
                  { name: "Mobile Applications", desc: "Cross-Platform React Native & Native Bridges" },
                  { name: "AI Workflow Solutions", desc: "Autonomous Agents, LLMs & Vector Search" },
                  { name: "Cloud & Database Architecture", desc: "MongoDB Atlas, Edge Caching & Multi-Region" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800">
                    <span className="truncate">{item.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold truncate">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/80">
              <Link href="/services">
                <button 
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  data-cursor="Services"
                >
                  <span>Explore Engineering Services</span>
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutEcosystem;
