"use client";

import { motion } from "framer-motion";
import { Filter } from "lucide-react";

const PricingFilterSystem = ({ 
  categories = ["All"], 
  selectedCategory = "All", 
  onSelectCategory 
}) => {
  if (!categories || categories.length <= 1) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10 select-none">
      <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-2 uppercase tracking-wider font-mono">
        <Filter size={13} /> Filter Scope:
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 max-w-full">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? "text-blue-700 font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {isSelected && (
                <motion.span
                  layoutId="pricingCategoryCapsule"
                  className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/90 z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PricingFilterSystem;
