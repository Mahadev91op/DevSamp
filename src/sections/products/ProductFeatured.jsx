"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  Boxes, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Cpu 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const ProductFeatured = ({ products = [] }) => {
  const featuredProducts = products.filter(p => p.featured);

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <section id="featured-products" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3"
          >
            <Sparkles size={13} /> Flagship Software
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Featured Production Platforms
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Our primary vertical platforms deployed in production, delivering mission-critical workflow orchestration and high-concurrency performance.
          </motion.p>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {featuredProducts.map((product, idx) => {
            const Icon = LucideIcons[product.logoIcon] || Boxes;
            const statusColor = 
              product.status === "Live"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : product.status === "Beta"
                  ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                  : "bg-blue-50 text-blue-700 border-blue-200";

            return (
              <motion.div
                key={product._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.1 }}
                className="bg-white border-2 border-indigo-500/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-indigo-500/5 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Pill */}
                <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-2xl bg-indigo-600 text-white font-mono text-[10px] font-black uppercase tracking-wider">
                  FLAGSHIP
                </div>

                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${product.gradient || "from-blue-600 to-indigo-600"} shadow-md`}>
                      <Icon size={26} />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border mr-16 ${statusColor}`}>
                      {product.status || "Live"}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                    {product.category} {product.version ? `• ${product.version}` : ""}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-sm font-bold text-slate-700 mb-3">
                    {product.tagline}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Capabilities */}
                  {product.capabilities && product.capabilities.length > 0 && (
                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        Core Capabilities
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.capabilities.map((cap, cIdx) => (
                          <span
                            key={cIdx}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70 text-[11px] font-bold text-slate-700"
                          >
                            ✓ {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                  {product.pricingSnippet ? (
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {product.pricingSnippet}
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-slate-400">
                      ENTERPRISE LICENSE
                    </span>
                  )}

                  {product.slug ? (
                    <Link href={`/products/${product.slug}`}>
                      <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-sm cursor-pointer">
                        <span>Explore Product</span>
                        <ArrowRight size={13} />
                      </button>
                    </Link>
                  ) : (
                    <a
                      href={product.productUrl || "/#contact"}
                      target={product.productUrl?.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <span>Access Platform</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductFeatured;
