"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  ArrowRight, 
  ExternalLink, 
  Boxes, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  Layers
} from "lucide-react";

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
    <section id="products" className="py-16 md:py-28 bg-transparent text-slate-900 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-[30%] right-0 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3.5"
            >
              <Boxes size={12} /> {badge}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black mb-3 tracking-tight leading-tight"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-sm md:text-base font-semibold"
            >
              {description}
            </motion.p>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 2 && (
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                      : "bg-white/80 text-slate-600 border-slate-200 hover:border-slate-350"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => {
                const IconComponent = LucideIcons[product.logoIcon] || Boxes;
                const statusColor = 
                  product.status === "Live" 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                    : product.status === "Beta"
                      ? "bg-purple-50 text-purple-700 border-purple-200"
                      : "bg-blue-50 text-blue-700 border-blue-200";

                return (
                  <motion.div
                    key={product._id || product.slug || idx}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                    className="group bg-white/90 border border-slate-200/80 hover:border-indigo-500/40 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Top gradient stripe */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${product.gradient || "from-blue-600 to-indigo-600"}`} />

                    <div>
                      {/* Top Bar: Icon, Category & Status */}
                      <div className="flex justify-between items-start mb-5 pt-1">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${product.gradient || "from-blue-600 to-indigo-600"} shadow-md group-hover:scale-105 transition-transform`}>
                          <IconComponent size={22} />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                            {product.status || "Active"}
                          </span>
                        </div>
                      </div>

                      {/* Product Name & Category */}
                      <div className="mb-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 font-mono">
                          {product.category || "SaaS Suite"}
                        </span>
                        <h3 className="text-xl font-black text-slate-900 mt-0.5 group-hover:text-indigo-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs font-bold text-slate-700 mt-1">
                          {product.tagline}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-slate-500 text-xs leading-relaxed font-semibold mb-6">
                        {product.description}
                      </p>

                      {/* Capabilities pills */}
                      {product.capabilities && product.capabilities.length > 0 && (
                        <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                            Key Capabilities
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {product.capabilities.map((cap, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70 text-[10px] font-bold text-slate-600"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA & Link */}
                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                      {product.pricingSnippet && (
                        <span className="text-[11px] font-mono font-bold text-slate-400">
                          {product.pricingSnippet}
                        </span>
                      )}
                      
                      <a
                        href={product.productUrl || "#contact"}
                        target={product.productUrl?.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 text-white hover:bg-indigo-600 text-xs font-bold transition-all shadow-sm group/btn ml-auto"
                        data-cursor="Open"
                      >
                        <span>Access Product</span>
                        <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-12 text-center max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
              <Boxes size={28} />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">No Active Products Published</h3>
            <p className="text-slate-500 text-xs font-semibold mb-6">
              New flagship products are currently in compilation and testing. Check back soon or request early developer beta access.
            </p>
            <Link href="/#contact">
              <button className="px-6 py-2.5 rounded-full bg-slate-950 text-white font-bold text-xs hover:bg-indigo-600 transition-all">
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
