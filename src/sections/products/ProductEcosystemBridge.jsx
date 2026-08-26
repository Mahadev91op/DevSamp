"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Workflow, 
  Sparkles, 
  ArrowRight, 
  Boxes, 
  Layers, 
  Cpu, 
  TrendingUp 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const ProductEcosystemBridge = () => {
  return (
    <section id="ecosystem-bridge" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
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
              <Workflow size={13} /> Compounding Value
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-h2 font-black tracking-tight leading-tight text-slate-950 mb-3"
            >
              How Our Products Fuel Custom Engineering
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-lead font-normal"
            >
              Building SaaS software sharpens our engineering standards. Every performance optimization and database index we deploy into our products immediately benefits our custom client builds.
            </motion.p>
          </div>

          <div className="shrink-0">
            <Link href="/ecosystem">
              <button className="px-6 py-3 rounded-full bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer">
                <span>Explore Full Ecosystem</span>
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>

        {/* 4 Bridge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Proprietary Products",
              desc: "We build and operate production SaaS platforms that solve real operational friction.",
              icon: Boxes
            },
            {
              step: "02",
              title: "Shared Foundation",
              desc: "Standardized authentication, telemetry, and database indexing are reused across all systems.",
              icon: Cpu
            },
            {
              step: "03",
              title: "Dedicated Pods",
              desc: "Senior engineering pods customize core engines for clients 60% faster than starting from scratch.",
              icon: Layers
            },
            {
              step: "04",
              title: "Compounding Growth",
              desc: "Continuous SLA upgrades and security patches roll back to all platform users over time.",
              icon: TrendingUp
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-blue-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-xs shrink-0">
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
                  <span>STAGE {item.step}</span>
                  <span className="text-blue-600">✓ ACTIVE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductEcosystemBridge;
