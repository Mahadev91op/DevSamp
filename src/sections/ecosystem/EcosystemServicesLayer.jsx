"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Code2, 
  Workflow, 
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultServicesFallback = [
  {
    title: "Fullstack Web & SaaS Platforms",
    desc: "Production Next.js 15, Node.js microservices, and high-concurrency database architectures built with zero technical debt.",
    icon: "Code2",
    features: ["Next.js 15 App Router", "Sub-10ms DB Queries", "Multi-Tenant Isolation", "Automated CI/CD"]
  },
  {
    title: "UI/UX & Design Systems",
    desc: "High-fidelity component libraries, accessible interaction states, and 60fps animations engineered in pure Vanilla CSS and Framer Motion.",
    icon: "Sparkles",
    features: ["Custom Design Systems", "Fluid Responsive UI", "Micro-Interactions", "WCAG 2.1 AA Compliant"]
  },
  {
    title: "API Gateways & Cloud Infrastructure",
    desc: "Standardized RESTful APIs, distributed event webhooks, and multi-region edge synchronization for mission-critical enterprise workloads.",
    icon: "Workflow",
    features: ["OpenAPI 3.1 Standards", "Event Webhook Mesh", "Zero-Drop Queue Relays", "Global Edge SLA"]
  }
];

const EcosystemServicesLayer = ({ services = [] }) => {
  const displayServices = services && services.length > 0 ? services : defaultServicesFallback;

  return (
    <section id="services-layer" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 min-w-0">
          <div className="max-w-2xl min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3"
            >
              <Layers size={13} /> Layer 02 • Services
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-h2 font-black tracking-tight leading-tight text-slate-950 mb-3"
            >
              Dedicated Engineering Pods &amp; Custom Software
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-lead font-normal"
            >
              When off-the-shelf products do not cover 100% of your business requirements, our in-house engineering pods build bespoke solutions that integrate seamlessly into your workflow.
            </motion.p>
          </div>

          <div className="shrink-0">
            <Link href="/services">
              <button 
                className="px-6 py-3 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                data-cursor="Services"
              >
                <span>Explore Full Services Directory</span>
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {displayServices.slice(0, 3).map((service, idx) => {
            const IconComponent = LucideIcons[service.icon] || Layers;

            return (
              <motion.div
                key={service._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
                      <IconComponent size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 uppercase shadow-2xs">
                      [POD 0{idx + 1}]
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  {/* Feature Bullets */}
                  {service.features && (
                    <div className="space-y-2 pt-3.5 border-t border-slate-200/70 mb-5">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Pod Deliverables
                      </span>
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <CheckCircle2 size={13} className="text-indigo-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    100% IN-HOUSE POD
                  </span>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <span>Request Pod Quote</span>
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

export default EcosystemServicesLayer;
