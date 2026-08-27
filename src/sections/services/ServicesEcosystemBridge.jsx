"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Boxes, 
  Layers, 
  Workflow, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Terminal,
  Cpu
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const ServicesEcosystemBridge = ({ products = [] }) => {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
            <Workflow size={13} className="text-indigo-600" />
            <span className="tracking-wide uppercase font-mono">ECOSYSTEM TOPOLOGY</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            How Services Connect With Products & Ecosystem
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            Whether building bespoke enterprise platforms from scratch or extending DevSamp products like MedERP, our engineering services provide seamless technical integration.
          </p>
        </div>

        {/* 3 Interlocking Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          
          {/* Card 1: Custom Standalone Build */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white hover:border-indigo-500/40 hover:shadow-xl transition-all"
          >
            <div>
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 w-fit mb-5">
                <Terminal size={22} />
              </div>
              <div className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider mb-1">
                PATHWAY A
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                Bespoke Standalone Solutions
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Full-lifecycle engineering designed specifically for your unique industry workflows, with 100% custom codebase and zero vendor lock-in.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 text-xs font-bold text-slate-700">
              ✓ Custom Stack & Private Cloud
            </div>
          </motion.div>

          {/* Card 2: Product Extensions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.08 }}
            className="bg-indigo-50/50 border border-indigo-200/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white hover:border-indigo-500/40 hover:shadow-xl transition-all"
          >
            <div>
              <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 w-fit mb-5">
                <Boxes size={22} />
              </div>
              <div className="text-[11px] font-mono font-bold text-indigo-600 uppercase tracking-wider mb-1">
                PATHWAY B
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                DevSamp Product Customization
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Tailor pre-built DevSamp SaaS platforms (e.g. MedERP Pro, DevSamp Auth) with custom enterprise connectors, localized tax modules, and specialized reports.
              </p>
            </div>
            <div className="pt-4 border-t border-indigo-100 text-xs font-bold text-indigo-900">
              ✓ Accelerated Time-to-Market
            </div>
          </motion.div>

          {/* Card 3: Universal API Mesh */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.16 }}
            className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white hover:border-indigo-500/40 hover:shadow-xl transition-all"
          >
            <div>
              <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 w-fit mb-5">
                <Cpu size={22} />
              </div>
              <div className="text-[11px] font-mono font-bold text-indigo-600 uppercase tracking-wider mb-1">
                PATHWAY C
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                Ecosystem Integration Mesh
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Unify ERPs, legacy CRMs, payment gateways, and warehouse systems into a unified, secure real-time event pipeline.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 text-xs font-bold text-slate-700">
              ✓ Bidirectional REST & Webhooks
            </div>
          </motion.div>

        </div>

        {/* Action Link to Ecosystem & Products */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/ecosystem">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore DevSamp Ecosystem Topology</span>
              <ArrowRight size={14} />
            </motion.button>
          </Link>

          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Discover Software Products</span>
              <Boxes size={14} className="text-indigo-600" />
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ServicesEcosystemBridge;
