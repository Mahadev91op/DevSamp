"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Boxes, 
  Activity, 
  Layers 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const WhyProof = ({ caseStudies = [], products = [] }) => {
  return (
    <section id="proof" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3"
          >
            <ShieldCheck size={13} /> Verified Execution
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Backed by Production Software &amp; Live Deployments
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Our proof is not fabricated marketing slogans. It is our live vertical SaaS platforms operating in healthcare, retail billing, and enterprise platform management.
          </motion.p>
        </div>

        {/* Real Production Proof Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {[
            {
              title: "MedERP Pro Clinical Suite",
              type: "LIVE SAAS PLATFORM",
              desc: "Hospital and clinical orchestration with multi-tenant database isolation, doctor OPD/IPD scheduling, and automated billing ledgers.",
              link: "/products/mederp-pro",
              icon: Activity,
              color: "from-blue-600 to-cyan-500"
            },
            {
              title: "FlowPulse POS & Billing",
              type: "LIVE SAAS PLATFORM",
              desc: "High-throughput retail POS and distributed multi-branch warehouse inventory synchronization built for modern retail chains.",
              link: "/products",
              icon: Boxes,
              color: "from-indigo-600 to-purple-600"
            },
            {
              title: "Bespoke Engineering Pods",
              type: "PRODUCTION DELIVERY",
              desc: "Custom platforms engineered with Next.js 15, sub-10ms query indexes, and strict 100% in-house code ownership.",
              link: "/services",
              icon: Layers,
              color: "from-purple-600 to-pink-600"
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
                className="bg-white border border-slate-200/90 hover:border-emerald-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${item.color} shadow-xs shrink-0`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                      VERIFIED
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest block mb-1">
                    {item.type}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    PRODUCTION READY
                  </span>
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <span>View System</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Case Studies snippet if available from MongoDB */}
        {caseStudies && caseStudies.length > 0 && (
          <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl">
            <h4 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-wider mb-4">
              Verified Production Case Studies
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseStudies.map((cs, cIdx) => (
                <div key={cIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                  <div>
                    <h5 className="text-base font-black text-slate-900">{cs.title}</h5>
                    <p className="text-xs text-slate-600 mt-1">{cs.clientName || cs.industry}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 shrink-0">✓ Delivered</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default WhyProof;
