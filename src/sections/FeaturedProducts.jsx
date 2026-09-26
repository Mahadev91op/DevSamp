"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
                className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-blue-600 text-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white font-bold text-xs sm:text-sm transition-all shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
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
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-sm shadow-blue-500/25"
                    : "bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid - 2 Column App-Like on Phone, 3 Column on Desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 md:gap-7">
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: smoothEase, delay: (idx % 3) * 0.06 }}
                    onClick={() => router.push(`/products/${product.slug || "mederp-pro"}`)}
                    className="group bg-white border border-slate-200/90 hover:border-blue-400 p-3.5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden min-w-0 cursor-pointer"
                  >
                    {/* Top gradient stripe */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradient || "from-blue-600 to-indigo-600"}`} />

                    <div className="min-w-0">
                      {/* Top Bar: Icon, Category & Status */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2.5 sm:mb-5 pt-0.5 sm:pt-1">
                        <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${product.gradient || "from-blue-600 to-indigo-600"} shadow-xs group-hover:scale-105 transition-transform shrink-0`}>
                          <IconComponent size={16} className="sm:w-[22px] sm:h-[22px]" />
                        </div>
                        
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] sm:text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-1.5 py-0.5 sm:px-2.5 rounded border border-blue-100 font-mono truncate">
                            {product.category || "SaaS"}
                          </span>
                          <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 rounded-full border hidden sm:flex items-center gap-1 font-mono ${statusColor}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            <span>{product.status || "Live"}</span>
                          </span>
                        </div>
                      </div>

                      {/* Product Name & Tagline */}
                      <h3 className="text-sm sm:text-xl font-black text-slate-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-[11px] sm:text-sm text-slate-600 mb-2 sm:mb-4 line-clamp-2 leading-relaxed font-normal">
                        {product.tagline || product.description}
                      </p>

                      {/* Capabilities Badges (Visible on desktop / larger screens) */}
                      {product.capabilities && product.capabilities.length > 0 && (
                        <div className="hidden sm:block mb-6">
                          <div className="flex flex-wrap gap-1.5">
                            {product.capabilities.slice(0, 3).map((cap, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[11px] font-bold text-slate-700 font-mono truncate max-w-full"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA & Link */}
                    <div className="pt-2.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-1.5">
                      {product.pricingSnippet ? (
                        <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 truncate hidden xs:inline">
                          {product.pricingSnippet}
                        </span>
                      ) : <div />}
                      
                      <Link
                        href={`/products/${product.slug || "mederp-pro"}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[11px] sm:text-xs font-bold transition-all shadow-xs group/btn shrink-0 cursor-pointer"
                        data-cursor="Open"
                      >
                        <span>Open</span>
                        <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Link>
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
              <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:from-blue-500 hover:to-indigo-500 shadow-sm shadow-blue-500/25 transition-all cursor-pointer">
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
