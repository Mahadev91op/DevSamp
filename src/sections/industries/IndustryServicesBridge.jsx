"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  Layers, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2,
  Workflow
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const IndustryServicesBridge = ({ services = [] }) => {
  const displayServices = services.slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700">
            <Layers size={13} className="text-blue-600" />
            <span className="tracking-wide uppercase font-mono">SERVICE INTEGRATION</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            Dedicated Engineering Services by Industry
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            Our engineering pods adapt specialized technical capabilities to execute custom platform builds, API integrations, and database migrations for each commercial sector.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayServices.map((srv, idx) => {
            const IconComponent = LucideIcons[srv.icon] || Layers;

            return (
              <motion.div
                key={srv._id || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 rounded-3xl p-6 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:scale-105 transition-transform">
                      <IconComponent size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {srv.category || "Engineering"}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {srv.title || srv.name}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {srv.desc || srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <Link
                    href={`/services`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors group/link"
                  >
                    <span>View Capability</span>
                    <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 rounded-full bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              <span>Explore All Engineering Services</span>
              <ArrowRight size={14} />
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default IndustryServicesBridge;
