"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  Boxes, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Activity 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const IndustryProductsBridge = ({ products = [] }) => {
  const displayProducts = products.slice(0, 3);

  if (!displayProducts.length) return null;

  return (
    <section className="py-20 md:py-28 bg-slate-50/50 border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
            <Boxes size={13} className="text-indigo-600" />
            <span className="tracking-wide uppercase font-mono">VERTICAL SOFTWARE PRODUCTS</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            Proprietary Software Platforms Built for Verticals
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            Production-tested software suites designed to solve complex operational challenges with instant deployment and continuous updates.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {displayProducts.map((prod, idx) => {
            const IconComponent = LucideIcons[prod.logoIcon] || Boxes;

            return (
              <motion.div
                key={prod._id || prod.slug || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/80 hover:border-indigo-500/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 group-hover:scale-105 transition-transform">
                      <IconComponent size={22} />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">
                      {prod.status || "Live"}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-950 tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">
                    {prod.name}
                  </h3>

                  {prod.tagline && (
                    <div className="text-xs font-bold text-slate-500 mb-3">
                      {prod.tagline}
                    </div>
                  )}

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/products/${prod.slug || ""}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors group/link"
                  >
                    <span>View Platform Details</span>
                    <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              <span>Explore All Software Products</span>
              <ArrowRight size={14} />
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default IndustryProductsBridge;
