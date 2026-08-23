"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Building2, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const fallbackIndustries = [
  {
    name: "Healthcare & Life Sciences",
    slug: "healthcare",
    summary: "HIPAA-compliant hospital ERP, telemedicine gateways, and automated electronic medical records mesh.",
    icon: "Activity",
    badge: "Clinical Grade",
    useCases: ["Hospital ERP", "Electronic Health Records (EHR)", "Lab Test Telemetry", "Telemedicine"],
    relatedProducts: ["MedERP Pro"],
    linkUrl: "/#contact"
  },
  {
    name: "Financial Tech & Invoicing",
    slug: "fintech",
    summary: "High-security ledger systems, multi-currency invoicing, and real-time payment reconciliation APIs.",
    icon: "CreditCard",
    badge: "PCI DSS Standard",
    useCases: ["Payment Gateway Connectors", "Automated Invoicing", "Subscription Billing Engine"],
    relatedProducts: ["DevScale Core"],
    linkUrl: "/#contact"
  },
  {
    name: "Retail & Omnichannel POS",
    slug: "retail",
    summary: "Omnichannel inventory orchestration, lightning-fast storefronts, and multi-location POS systems.",
    icon: "ShoppingBag",
    badge: "Omnichannel",
    useCases: ["Offline-First POS", "Real-Time Stock Mesh", "Custom Headless Storefronts"],
    relatedProducts: ["FlowPulse POS"],
    linkUrl: "/#contact"
  },
  {
    name: "Startups & Emerging SaaS",
    slug: "startups",
    summary: "Rapid prototyping, scalable multi-tenant foundations, and high-conversion product landing architectures.",
    icon: "Rocket",
    badge: "Rapid Launch",
    useCases: ["MVP to Scale Pipeline", "Admin Control Portals", "Lighthouse 100 Performance"],
    relatedProducts: ["DevScale Core", "OmniDesk AI"],
    linkUrl: "/#contact"
  }
];

const IndustriesSection = ({ initialIndustries = [], sectionData = null }) => {
  const industries = initialIndustries.length > 0 ? initialIndustries : fallbackIndustries;

  const badge = sectionData?.badge || "Vertical Solutions";
  const title = sectionData?.title || "Tailored Solutions for Core Industries";
  const description = sectionData?.description || "Proven software architectures and products addressing the operational, compliance, and scalability demands of modern business sectors.";

  return (
    <section id="industries" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      
      <div className="ecosystem-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3"
          >
            <Sparkles size={12} /> {badge}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-2.5 tracking-tight leading-tight text-slate-950"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-body font-normal"
          >
            {description}
          </motion.p>
        </div>

        {/* 4 Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 min-w-0">
          {industries.map((ind, idx) => {
            const Icon = LucideIcons[ind.icon] || Building2;
            
            return (
              <motion.div
                key={ind.slug || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="group bg-white border border-slate-200/90 hover:border-indigo-500/40 p-6 md:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between min-w-0"
              >
                <div className="min-w-0">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 uppercase">
                      {ind.badge || "Industry"}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-black text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors truncate">
                    {ind.name}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed mb-5 font-normal">
                    {ind.summary}
                  </p>

                  {/* Use Cases */}
                  {ind.useCases && ind.useCases.length > 0 && (
                    <div className="space-y-1.5 mb-5 pt-3.5 border-t border-slate-100">
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Deployment Scope
                      </span>
                      {ind.useCases.map((useCase, uIdx) => (
                        <div key={uIdx} className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                          <span className="truncate">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link href={ind.linkUrl || "/#contact"}>
                    <button 
                      className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-950 text-slate-800 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                      data-cursor="Scope"
                    >
                      <span>Explore Scope</span>
                      <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform shrink-0" />
                    </button>
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

export default IndustriesSection;
