"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  Boxes, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  ExternalLink 
} from "lucide-react";
import ProductFilterSystem from "./ProductFilterSystem";

const smoothEase = [0.16, 1, 0.3, 1];

const ProductCatalog = ({ initialProducts = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const products = useMemo(() => {
    return Array.isArray(initialProducts) ? initialProducts : [];
  }, [initialProducts]);

  // Extract unique dynamic categories
  const categories = useMemo(() => {
    const unique = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];
    return unique;
  }, [products]);

  // Extract unique dynamic statuses
  const statuses = useMemo(() => {
    const unique = ["All", ...new Set(products.map(p => p.status).filter(Boolean))];
    return unique;
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchStatus = selectedStatus === "All" || p.status === selectedStatus;
      const matchSearch = !searchQuery || 
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.capabilities?.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchStatus && matchSearch;
    });
  }, [products, selectedCategory, selectedStatus, searchQuery]);

  return (
    <section id="catalog" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3"
          >
            <Boxes size={13} /> Complete Catalogue
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Explore All DevSamp Software Systems
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Filter by domain or status to inspect multi-tenant architectures, capabilities, and availability for your organization.
          </motion.p>
        </div>

        {/* Filter & Search HUD */}
        <ProductFilterSystem
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          statuses={statuses}
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={filteredProducts.length}
        />

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence>
              {filteredProducts.map((product, idx) => {
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
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: smoothEase }}
                    className="group bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-blue-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradient || "from-blue-600 to-indigo-600"}`} />

                    <div>
                      <div className="flex justify-between items-start mb-5 pt-1">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${product.gradient || "from-blue-600 to-indigo-600"} shadow-xs group-hover:scale-105 transition-transform shrink-0`}>
                          <Icon size={22} />
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                          {product.status || "Live"}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600">
                            {product.category}
                          </span>
                          {product.version && (
                            <span className="text-[9px] font-mono text-slate-400 font-bold">
                              • {product.version}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs font-bold text-slate-700 mt-1">
                          {product.tagline}
                        </p>
                      </div>

                      <p className="text-slate-600 text-xs font-normal leading-relaxed mb-6">
                        {product.description}
                      </p>

                      {/* Capabilities Chips */}
                      {product.capabilities && product.capabilities.length > 0 && (
                        <div className="space-y-2 mb-6 pt-4 border-t border-slate-200/70">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                            Key Capabilities
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {product.capabilities.map((cap, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-slate-700"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                      {product.pricingSnippet ? (
                        <span className="text-[11px] font-mono font-bold text-slate-500">
                          {product.pricingSnippet}
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono font-bold text-slate-400">
                          ENTERPRISE
                        </span>
                      )}

                      {product.slug ? (
                        <Link href={`/products/${product.slug}`}>
                          <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs cursor-pointer">
                            <span>Details</span>
                            <ArrowRight size={13} />
                          </button>
                        </Link>
                      ) : (
                        <a
                          href={product.productUrl || "/#contact"}
                          target={product.productUrl?.startsWith("http") ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs"
                        >
                          <span>Access</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-12 text-center max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Boxes size={28} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">No Matching Products</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-normal mb-6 max-w-md mx-auto">
              No products found matching your current filter criteria. You can reset filters or request a bespoke custom engineering pod.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedStatus("All");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
              <Link href="/services">
                <button className="px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-bold hover:bg-blue-600 transition-all cursor-pointer">
                  Request Custom Pod
                </button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductCatalog;
