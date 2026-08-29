"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Boxes, Layers, Building2, CreditCard, ArrowRight } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

export default function CustomerRelationshipBridge({ products = [], services = [], industries = [] }) {
  const pathways = [
    {
      title: "Proprietary Software Suite",
      badge: "Products",
      description: "Explore turnkey SaaS applications engineered for clinical hospitals, multi-branch retail, and developer automation.",
      icon: Boxes,
      link: "/products",
      cta: "Explore Products",
      countText: `${products.length || 2}+ Software Platforms`
    },
    {
      title: "Fullstack Engineering Retainers",
      badge: "Services",
      description: "Dedicated engineering pods building Next.js 16 web applications, cloud APIs, and high-concurrency event meshes.",
      icon: Layers,
      link: "/services",
      cta: "Explore Services",
      countText: `${services.length || 6}+ Engineering Capabilities`
    },
    {
      title: "Industry Domain Architectures",
      badge: "Industries",
      description: "Specialized data schemas and compliance boundaries shaped around healthcare, fintech, retail, and modern startups.",
      icon: Building2,
      link: "/industries",
      cta: "Explore Industries",
      countText: `${industries.length || 4}+ Domain Sectors`
    },
    {
      title: "Commercial Blueprints & Retainers",
      badge: "Pricing",
      description: "Transparent pricing models for SaaS licenses and engineering pods with 100% intellectual property ownership.",
      icon: CreditCard,
      link: "/pricing",
      cta: "View Pricing",
      countText: "Predictable Cost Structure"
    }
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-transparent border-b border-slate-200/60 overflow-hidden">
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
            <Layers size={12} className="text-blue-600" />
            <span>ECOSYSTEM CROSSWAYS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight"
          >
            Connected Foundations of DevSamp
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.1 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            DevSamp integrates software products, engineering pods, and vertical domain architectures under one unified digital ecosystem.
          </motion.p>
        </div>

        {/* 4 Connected Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={item.link}
                    className="text-xs font-bold text-blue-600 group-hover:text-blue-800 flex items-center gap-1 transition-colors"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[10px] font-mono text-slate-400">
                    {item.countText}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
