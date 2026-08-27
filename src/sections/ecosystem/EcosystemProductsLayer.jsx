"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  Boxes, 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  Activity
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultProductsFallback = [
  {
    name: "MedERP Pro",
    tagline: "Clinical Hospital & Diagnostics Orchestration Platform",
    category: "Healthcare SaaS",
    status: "Live",
    gradient: "from-blue-600 to-cyan-500",
    logoIcon: "Activity",
    capabilities: ["HIPAA Compliant", "Multi-Branch Ledger", "OPD/IPD Flow", "Real-Time Telemetry"],
    description: "Full clinical and diagnostic operations ERP engineered with multi-tenant hospital databases and automated billing relays."
  },
  {
    name: "FlowPulse POS",
    tagline: "High-Speed Retail Billing & Inventory Engine",
    category: "Retail Tech",
    status: "Live",
    gradient: "from-blue-600 to-indigo-600",
    logoIcon: "Boxes",
    capabilities: ["Offline First", "Barcode Scanner Relay", "Inventory Sync", "Instant Thermal Print"],
    description: "High-throughput point of sale and distributed warehouse inventory sync built for retail chains and modern storefronts."
  },
  {
    name: "DevScale Core",
    tagline: "Multi-Tenant SaaS Foundation & Auth Gateway",
    category: "Developer Tool",
    status: "Live",
    gradient: "from-blue-600 to-indigo-500",
    logoIcon: "Cpu",
    capabilities: ["JWT & RBAC Auth", "Tenant Schema Routing", "Stripe Metering", "Next.js 15 Starter"],
    description: "Production SaaS foundation boilerplate with tenant isolation, automated subscription webhooks, and clean microservice architecture."
  }
];

const EcosystemProductsLayer = ({ products = [] }) => {
  const displayProducts = products && products.length > 0 ? products : defaultProductsFallback;

  return (
    <section id="products-layer" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 min-w-0">
          <div className="max-w-2xl min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3"
            >
              <Boxes size={13} /> Layer 01 • Products
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-h2 font-black tracking-tight leading-tight text-slate-950 mb-3"
            >
              Reusable SaaS Assets &amp; Flagship Software
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-lead font-normal"
            >
              Products inside the DevSamp ecosystem are not one-off templates; they are production-grade vertical software systems that solve recurring operational problems for businesses.
            </motion.p>
          </div>

          <div className="shrink-0">
            <Link href="/products">
              <button 
                className="px-6 py-3 rounded-full bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                data-cursor="Products"
              >
                <span>Explore Full Product Catalog</span>
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {displayProducts.slice(0, 3).map((prod, idx) => {
            const IconComponent = LucideIcons[prod.logoIcon] || Boxes;

            return (
              <motion.div
                key={prod._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-blue-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Accent Stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${prod.gradient || "from-blue-600 to-indigo-600"}`} />

                <div>
                  <div className="flex justify-between items-start mb-5 pt-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${prod.gradient || "from-blue-600 to-cyan-500"} shadow-xs shrink-0`}>
                      <IconComponent size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                      {prod.status || "Live"}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 block mb-1">
                    {prod.category || "SaaS Suite"}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mb-1.5">
                    {prod.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 mb-3">
                    {prod.tagline}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                    {prod.description}
                  </p>

                  {/* Capabilities Chips */}
                  {prod.capabilities && prod.capabilities.length > 0 && (
                    <div className="space-y-1.5 pt-3.5 border-t border-slate-100 mb-5">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Core Capabilities
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {prod.capabilities.slice(0, 4).map((cap, cIdx) => (
                          <span key={cIdx} className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-700">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    ECOSYSTEM READY
                  </span>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>View Product Specs</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EcosystemProductsLayer;
