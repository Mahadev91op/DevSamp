"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  Layers, 
  ArrowUpRight, 
  Sparkles, 
  SlidersHorizontal, 
  CheckCircle2, 
  ArrowRight,
  PackageCheck
} from "lucide-react";
import ServiceFilterSystem from "./ServiceFilterSystem";

const smoothEase = [0.16, 1, 0.3, 1];

const ServicesCatalog = ({ initialServices = [] }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories dynamically from DB data
  const categories = useMemo(() => {
    const raw = initialServices.map((s) => s.category || "Engineering");
    return ["All", ...Array.from(new Set(raw))];
  }, [initialServices]);

  // Filtered & Searched Services
  const filteredServices = useMemo(() => {
    return initialServices.filter((service) => {
      const matchCategory = activeCategory === "All" || (service.category || "Engineering") === activeCategory;
      
      const title = (service.title || service.name || "").toLowerCase();
      const desc = (service.desc || service.description || "").toLowerCase();
      const category = (service.category || "").toLowerCase();
      const caps = Array.isArray(service.capabilities) ? service.capabilities.join(" ").toLowerCase() : "";
      const searchNeedle = searchQuery.toLowerCase().trim();

      const matchSearch = !searchNeedle || 
        title.includes(searchNeedle) || 
        desc.includes(searchNeedle) || 
        category.includes(searchNeedle) ||
        caps.includes(searchNeedle);

      return matchCategory && matchSearch;
    });
  }, [initialServices, activeCategory, searchQuery]);

  return (
    <section id="catalog" className="py-16 md:py-24 bg-slate-50/50 border-b border-slate-200/60 relative">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
            <Layers size={13} className="text-indigo-600" />
            <span className="tracking-wide uppercase font-mono">COMPLETE CAPABILITY CATALOGUE</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            Explore All Engineering Services
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal">
            Discover dedicated technical capabilities designed to architect, scale, and secure your digital assets.
          </p>
        </div>

        {/* Filter & Search System */}
        <ServiceFilterSystem
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={filteredServices.length}
        />

        {/* Catalog Grid */}
        <AnimatePresence mode="popLayout">
          {filteredServices.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredServices.map((service, idx) => {
                const IconComponent = LucideIcons[service.icon] || Layers;

                return (
                  <motion.div
                    key={service._id || idx}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: smoothEase }}
                    className="bg-white border border-slate-200/80 hover:border-indigo-500/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group"
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                          <IconComponent size={20} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono font-bold">
                            {service.category || "Engineering"}
                          </span>
                          <span className="font-mono text-[9px] font-bold text-slate-400">
                            [0{idx + 1}]
                          </span>
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                        {service.title || service.name}
                      </h3>

                      {service.tagline && (
                        <div className="text-xs font-bold text-slate-500 mb-2">
                          {service.tagline}
                        </div>
                      )}

                      <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                        {service.desc || service.description}
                      </p>

                      {/* Capabilities chips */}
                      {Array.isArray(service.capabilities) && service.capabilities.length > 0 && (
                        <div className="space-y-1.5 mb-6">
                          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Key Capabilities:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {service.capabilities.map((cap, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70 text-[11px] font-medium text-slate-700"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Deliverables snippet */}
                      {Array.isArray(service.deliverables) && service.deliverables.length > 0 && (
                        <div className="space-y-1.5 mb-6">
                          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Deliverables:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {service.deliverables.map((del, dIdx) => (
                              <span
                                key={dIdx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-50/70 text-indigo-700 text-[10px] font-bold"
                              >
                                <PackageCheck size={11} />
                                {del}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Footer CTA */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {service.pricingSnippet || "Custom Architectural Scope"}
                      </span>

                      <Link
                        href={`/#contact?service=${encodeURIComponent(service.title || service.name || "")}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors group/link"
                      >
                        <span>Engage Service</span>
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
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <SlidersHorizontal size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                No Matching Services Found
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                We couldn&apos;t find any services matching your filter criteria. Try resetting your search or discuss a custom architecture requirement with our pod.
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
                  <button className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs transition-colors cursor-pointer">
                    Discuss Custom Requirement
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

export default ServicesCatalog;
