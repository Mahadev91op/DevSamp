"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  Building2, 
  ArrowUpRight, 
  Sparkles, 
  SlidersHorizontal, 
  CheckCircle2, 
  ArrowRight,
  Boxes,
  Layers,
  AlertCircle
} from "lucide-react";
import IndustryFilterSystem from "./IndustryFilterSystem";

const smoothEase = [0.16, 1, 0.3, 1];

const IndustryCatalog = ({ initialIndustries = [] }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories from DB
  const categories = useMemo(() => {
    const raw = initialIndustries.map((i) => i.category || "Enterprise");
    return ["All", ...Array.from(new Set(raw))];
  }, [initialIndustries]);

  // Filtered & Searched Industries
  const filteredIndustries = useMemo(() => {
    return initialIndustries.filter((industry) => {
      const matchCategory = activeCategory === "All" || (industry.category || "Enterprise") === activeCategory;
      
      const name = (industry.name || "").toLowerCase();
      const summary = (industry.summary || industry.description || "").toLowerCase();
      const cat = (industry.category || "").toLowerCase();
      const useCases = Array.isArray(industry.useCases) ? industry.useCases.join(" ").toLowerCase() : "";
      const searchNeedle = searchQuery.toLowerCase().trim();

      const matchSearch = !searchNeedle || 
        name.includes(searchNeedle) || 
        summary.includes(searchNeedle) || 
        cat.includes(searchNeedle) ||
        useCases.includes(searchNeedle);

      return matchCategory && matchSearch;
    });
  }, [initialIndustries, activeCategory, searchQuery]);

  return (
    <section id="catalog" className="py-16 md:py-24 bg-slate-50/50 border-b border-slate-200/60 relative">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
            <Building2 size={13} className="text-blue-600" />
            <span className="tracking-wide uppercase font-mono">COMPLETE SECTOR CATALOGUE</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            Explore All Industry Solutions
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal">
            Discover tailored software frameworks, domain data models, and dedicated engineering pods built for your business sector.
          </p>
        </div>

        {/* Filter & Search System */}
        <IndustryFilterSystem
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={filteredIndustries.length}
        />

        {/* Catalog Grid */}
        <AnimatePresence mode="popLayout">
          {filteredIndustries.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredIndustries.map((ind, idx) => {
                const IconComponent = LucideIcons[ind.icon] || Building2;

                return (
                  <motion.div
                    key={ind._id || ind.slug || idx}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: smoothEase }}
                    className="bg-white border border-slate-200/80 hover:border-blue-500/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group"
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                          <IconComponent size={20} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono font-bold">
                            {ind.badge || ind.category || "Sector"}
                          </span>
                          <span className="font-mono text-[9px] font-bold text-slate-400">
                            [0{idx + 1}]
                          </span>
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                        {ind.name}
                      </h3>

                      {ind.tagline && (
                        <div className="text-xs font-bold text-slate-500 mb-2">
                          {ind.tagline}
                        </div>
                      )}

                      <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                        {ind.summary || ind.description}
                      </p>

                      {/* Use cases snippet */}
                      {Array.isArray(ind.useCases) && ind.useCases.length > 0 && (
                        <div className="space-y-1.5 mb-6">
                          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Domain Applications:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {ind.useCases.map((uc, uIdx) => (
                              <span
                                key={uIdx}
                                className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70 text-[11px] font-medium text-slate-700"
                              >
                                {uc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Related Products & Services Pills */}
                      <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                        {Array.isArray(ind.relatedProducts) && ind.relatedProducts.length > 0 && (
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                            <Boxes size={13} className="text-indigo-600 shrink-0" />
                            <span className="font-bold text-slate-400">Products:</span>
                            <span className="font-bold text-indigo-700">{ind.relatedProducts.join(", ")}</span>
                          </div>
                        )}

                        {Array.isArray(ind.relatedServices) && ind.relatedServices.length > 0 && (
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                            <Layers size={13} className="text-blue-600 shrink-0" />
                            <span className="font-bold text-slate-400">Services:</span>
                            <span className="font-bold text-blue-700">{ind.relatedServices.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer CTA */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 size={13} />
                        Active Mesh
                      </span>

                      <Link
                        href={`/#contact?industry=${encodeURIComponent(ind.name || "")}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors group/link"
                      >
                        <span>Explore Solutions</span>
                        <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <SlidersHorizontal size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                No Matching Industries Found
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                We couldn&apos;t find any industry frameworks matching your filter criteria. Try resetting your search or discuss a custom industry requirement with our architects.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
                <Link href="/#contact">
                  <button className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs transition-colors cursor-pointer">
                    Discuss Sector Scope
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default IndustryCatalog;
