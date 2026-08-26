"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const ServiceFilterSystem = ({
  categories = [],
  activeCategory = "All",
  onSelectCategory,
  searchQuery = "",
  onSearchChange,
  totalResults = 0,
}) => {
  return (
    <div className="w-full bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 md:p-5 shadow-xs mb-10 space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search services by capability, name, or keywords..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Results Counter & Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
          <SlidersHorizontal size={14} className="text-indigo-600" />
          <span>FILTERED:</span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-extrabold">
            {totalResults} {totalResults === 1 ? "SERVICE" : "SERVICES"}
          </span>
        </div>

      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">Category:</span>
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceFilterSystem;
