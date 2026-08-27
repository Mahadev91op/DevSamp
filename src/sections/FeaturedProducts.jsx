"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  ArrowRight, 
  ArrowUpRight,
  ExternalLink, 
  Boxes, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  Layers
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const FeaturedProducts = ({ initialProducts = [], sectionData = null }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const products = Array.isArray(initialProducts) ? initialProducts : [];
  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const badge = sectionData?.badge || "Software Suite";
  const title = sectionData?.title || "Flagship Software Products & SaaS";
  const description = sectionData?.description || "Enterprise-grade software applications and SaaS tools engineered by DevSamp for high operational efficiency and effortless scalability.";

  return (
    <section id="products" className="py-16 md:py-24 bg-slate-50/60 border-y border-slate-200/70 text-slate-900 relative overflow-hidden">
      
      {/* Background subtle ambiance */}
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-5 min-w-0">
          <div className="max-w-2xl min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3"
            >
              <Boxes size={13} /> {badge}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-h2 font-black tracking-tight leading-tight text-slate-950 mb-2.5"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-body font-normal max-w-xl"
            >
              {description}
            </motion.p>
          </div>

          {/* Right Action: Clean Non-Clipping View All */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/products">
              <button 
                className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-slate-950 text-slate-900 hover:bg-slate-950 hover:text-white font-bold text-xs sm:text-sm transition-all shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                data-cursor="All"
              >
                <span>View All Products</span>
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        {categories.length > 2 && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none w-full min-w-0">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-950 text-white border-slate-950 shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-350 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => {
                const IconComponent = LucideIcons[product.logoIcon] || Boxes;
                const statusColor = 
                  product.status === "Live" 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                    : product.status === "Beta"
                      ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                      : "bg-blue-50 text-blue-700 border-blue-200";

                return (
                  <motion.div
                    key={product._id || product.slug || idx}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: smoothEase, delay: (idx % 3) * 0.08 }}
                    className="group bg-white border border-slate-200/90 hover:border-indigo-500/40 p-6 sm:p-7 md:p-8 rounded-3xl shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden min-w-0"
                  >
                    {/* Top gradient stripe */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradient || "from-blue-600 to-indigo-600"}`} />

                    <div className="min-w-0">
                      {/* Top Bar: Icon, Category & Status */}
                      <div className="flex justify-between items-start mb-5 pt-1">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${product.gradient || "from-blue-600 to-indigo-600"} shadow-sm group-hover:scale-105 transition-transform shrink-0`}>
                          <IconComponent size={22} />
                        </div>
                        
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColor}`}>
                          {product.status || "Active"}
                        </span>
                      </div>

                      {/* Product Name & Category */}
                      <div className="mb-2.5 min-w-0">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 font-mono block truncate">
                          {product.category || "SaaS Suite"}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 group-hover:text-indigo-600 transition-colors truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm sm:text-base font-bold text-slate-800 mt-1 line-clamp-2 leading-snug">
                          {product.tagline}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-5 line-clamp-3">
                        {product.description}
                      </p>

                      {/* Capabilities pills */}
                      {product.capabilities && product.capabilities.length > 0 && (
                        <div className="space-y-1.5 mb-5 pt-3.5 border-t border-slate-100">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                            Key Capabilities
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {product.capabilities.slice(0, 4).map((cap, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-700"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA & Link */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      {product.pricingSnippet ? (
                        <span className="text-xs font-mono font-bold text-slate-500 truncate">
                          {product.pricingSnippet}
                        </span>
                      ) : <div />}
                      
                      <a
                        href={product.productUrl || "#contact"}
                        target={product.productUrl?.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 text-white hover:bg-indigo-600 text-xs sm:text-sm font-bold transition-all shadow-xs group/btn shrink-0 cursor-pointer"
                        data-cursor="Open"
                      >
                        <span>Access Product</span>
                        <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-10 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <Boxes size={22} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1.5">No Products Published</h3>
            <p className="text-slate-500 text-xs font-medium mb-5">
              New flagship products are currently in compilation and testing. Check back soon or request early developer beta access.
            </p>
            <Link href="/#contact">
              <button className="px-6 py-2.5 rounded-full bg-slate-950 text-white font-bold text-xs hover:bg-indigo-600 transition-all cursor-pointer">
                Request Early Access
              </button>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedProducts;
