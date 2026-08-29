"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Building2, 
  Search, 
  ExternalLink, 
  MapPin, 
  Tag, 
  Layers, 
  Boxes, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Filter
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

export default function CustomerDirectory({ initialCustomers = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Extract unique industries from actual data
  const industries = useMemo(() => {
    const set = new Set();
    initialCustomers.forEach((c) => {
      if (c.industry && c.industry.trim()) set.add(c.industry.trim());
    });
    return ["All", ...Array.from(set)];
  }, [initialCustomers]);

  // Extract unique relationship types from actual data
  const relationshipTypes = useMemo(() => {
    const set = new Set();
    initialCustomers.forEach((c) => {
      if (c.relationshipType && c.relationshipType.trim()) set.add(c.relationshipType.trim());
    });
    return ["All", ...Array.from(set)];
  }, [initialCustomers]);

  // Filter customers based on user input
  const filteredCustomers = useMemo(() => {
    return initialCustomers.filter((customer) => {
      const matchesIndustry = selectedIndustry === "All" || customer.industry === selectedIndustry;
      const matchesType = selectedType === "All" || customer.relationshipType === selectedType;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        customer.name?.toLowerCase().includes(q) ||
        customer.shortDescription?.toLowerCase().includes(q) ||
        customer.industry?.toLowerCase().includes(q);

      return matchesIndustry && matchesType && matchesSearch;
    });
  }, [initialCustomers, selectedIndustry, selectedType, searchQuery]);

  return (
    <section id="directory" className="relative w-full py-16 md:py-24 bg-transparent border-b border-slate-200/60 overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider shadow-2xs"
          >
            <Building2 size={12} className="text-blue-600" />
            <span>CUSTOMER & CLIENT DIRECTORY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight"
          >
            Verified Customer Relationships
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.1 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Explore the organizations and teams operating mission-critical digital products, dedicated engineering retainers, and cloud platforms built with DevSamp.
          </motion.p>
        </div>

        {/* If there are customer records in the database */}
        {initialCustomers.length > 0 ? (
          <div className="space-y-8">
            {/* Filter and Search Bar */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customers or industries..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {industries.length > 2 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase mr-1 flex items-center gap-1">
                      <Filter size={12} /> Industry:
                    </span>
                    {industries.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => setSelectedIndustry(ind)}
                        className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                          selectedIndustry === ind
                            ? "bg-slate-950 text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Customers Grid */}
            {filteredCustomers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredCustomers.map((customer, idx) => {
                    const initials = customer.name
                      ? customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()
                      : "DS";

                    return (
                      <motion.div
                        key={customer._id || customer.slug || idx}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: smoothEase }}
                        className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="space-y-4">
                          {/* Top: Logo / Avatar & Badges */}
                          <div className="flex items-start justify-between gap-3">
                            {customer.logo ? (
                              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                                <img
                                  src={customer.logo}
                                  alt={customer.name}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display = "flex";
                                  }}
                                />
                                <div className="hidden w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs items-center justify-center rounded-xl">
                                  {initials}
                                </div>
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
                                {initials}
                              </div>
                            )}

                            <div className="flex flex-col items-end gap-1">
                              {customer.industry && (
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 uppercase">
                                  {customer.industry}
                                </span>
                              )}
                              {customer.relationshipType && (
                                <span className="text-[10px] font-bold text-slate-500">
                                  {customer.relationshipType}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Customer Title & Description */}
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                              <span>{customer.name}</span>
                            </h3>

                            {customer.location && (
                              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                                <MapPin size={11} />
                                <span>{customer.location}</span>
                              </div>
                            )}

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 line-clamp-3">
                              {customer.shortDescription || customer.description || "Active enterprise collaboration utilizing DevSamp bespoke engineering and digital platform solutions."}
                            </p>
                          </div>

                          {/* Associated Products/Services Tags */}
                          {((customer.relatedProducts && customer.relatedProducts.length > 0) || 
                            (customer.relatedServices && customer.relatedServices.length > 0)) && (
                            <div className="pt-2 flex flex-wrap gap-1.5">
                              {customer.relatedProducts?.map((prod, pIdx) => (
                                <span key={pIdx} className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 flex items-center gap-1">
                                  <Boxes size={10} className="text-blue-500" />
                                  <span>{prod}</span>
                                </span>
                              ))}
                              {customer.relatedServices?.map((svc, sIdx) => (
                                <span key={sIdx} className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 flex items-center gap-1">
                                  <Layers size={10} className="text-indigo-500" />
                                  <span>{svc}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Footer: Public Website / CTA Link */}
                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                          {customer.website ? (
                            <a
                              href={customer.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                            >
                              <span>Official Site</span>
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            <span className="text-[11px] font-mono text-slate-400">Verified Client</span>
                          )}

                          <span className="text-[11px] font-mono text-slate-400">
                            {customer.since ? `Since ${customer.since}` : "Active Deployment"}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200">
                <p className="text-sm font-bold text-slate-700">No customers match your filter criteria.</p>
                <button
                  onClick={() => { setSelectedIndustry("All"); setSelectedType("All"); setSearchQuery(""); }}
                  className="mt-3 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        ) : (
          /* Enterprise Empty State when 0 customer records exist */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck size={28} />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider block">
                PARTNERSHIP ECOSYSTEM
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Customer Relationships are Growing
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                DevSamp collaborates directly with enterprise operators, clinical healthcare providers, and technology startups on confidential retainers and custom platform deployments.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
              <Link href="/#contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  data-cursor="Connect"
                >
                  <Sparkles size={14} className="text-blue-400" />
                  <span>Start a Confidential Project</span>
                  <ArrowRight size={14} />
                </motion.button>
              </Link>

              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs sm:text-sm transition-all border border-slate-200 flex items-center gap-2 cursor-pointer"
                  data-cursor="Products"
                >
                  <Boxes size={14} className="text-blue-600" />
                  <span>Explore Software Suite</span>
                </motion.button>
              </Link>
            </div>

            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Confidentiality</span>
                <span className="text-xs font-bold text-slate-800">Strict NDAs</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Ownership</span>
                <span className="text-xs font-bold text-slate-800">100% IP Transferred</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Engineering</span>
                <span className="text-xs font-bold text-slate-800">100% In-House</span>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
