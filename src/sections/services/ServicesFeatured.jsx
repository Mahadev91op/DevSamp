"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const ServicesFeatured = ({ services = [] }) => {
  const featuredList = services.filter((s) => s.featured);

  if (!featuredList.length) return null;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      
      {/* Background glow overlay */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[350px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-300">
              <Sparkles size={13} className="text-indigo-400" />
              <span className="tracking-wide uppercase font-mono">FLAGSHIP CAPABILITIES</span>
            </div>
            
            <h2 className="text-fluid-h2 font-black tracking-tight text-white">
              Featured Engineering Services
            </h2>
            
            <p className="text-slate-400 text-fluid-body font-normal">
              High-impact architectural disciplines most frequently engaged by high-growth startups and enterprises.
            </p>
          </div>

          <Link href="/#contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Custom Engineering Scope</span>
              <ArrowRight size={14} />
            </motion.button>
          </Link>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredList.map((service, idx) => {
            const IconComponent = LucideIcons[service.icon] || Layers;

            return (
              <motion.div
                key={service._id || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-900/90 border border-white/10 hover:border-indigo-500/50 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                      <IconComponent size={22} />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-mono font-bold text-indigo-300">
                      FLAGSHIP
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white tracking-tight mb-2 group-hover:text-indigo-400 transition-colors">
                    {service.title || service.name}
                  </h3>

                  {service.tagline && (
                    <div className="text-xs font-bold text-slate-400 mb-2">
                      {service.tagline}
                    </div>
                  )}

                  <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                    {service.desc || service.description}
                  </p>

                  {/* Capability Badges */}
                  {Array.isArray(service.capabilities) && service.capabilities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {service.capabilities.slice(0, 4).map((cap, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 font-medium"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/#contact?service=${encodeURIComponent(service.title || service.name || "")}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors group/link"
                  >
                    <span>Engage Pod for This Service</span>
                    <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
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

export default ServicesFeatured;
