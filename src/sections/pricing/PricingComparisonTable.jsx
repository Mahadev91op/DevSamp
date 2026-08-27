"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, Minus, Zap } from "lucide-react";
import Link from "next/link";

const PricingComparisonTable = ({ 
  plans = [], 
  isOpen = false, 
  onClose,
  billing = "monthly"
}) => {
  if (!isOpen) return null;

  // Extract all unique feature names from plans
  const allFeatures = Array.from(
    new Set(
      plans.flatMap(p => [
        ...(Array.isArray(p.features) ? p.features : []),
        ...(Array.isArray(p.missing) ? p.missing : [])
      ].filter(f => f && f !== "hii"))
    )
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" 
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 10 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          exit={{ scale: 0.95, opacity: 0, y: 10 }} 
          transition={{ duration: 0.2 }}
          className="relative bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl w-full max-w-4xl shadow-2xl text-slate-900 max-h-[85vh] overflow-y-auto z-10 custom-scrollbar"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4 select-none">
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 flex items-center gap-2">
                <Sparkles size={20} className="text-blue-600" /> Compare Blueprint Specifications
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider font-mono mt-0.5">
                Technical parameters and feature matrix
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close comparison modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 font-mono text-[11px] text-slate-600 font-bold uppercase select-none">
                  <th className="p-3.5 sm:p-4 bg-slate-50 sticky left-0 z-10">Specification Parameter</th>
                  {plans.map((p, idx) => (
                    <th key={p._id || idx} className={`p-3.5 sm:p-4 text-center ${p.popular || p.featured ? "text-blue-700 bg-blue-50/50" : ""}`}>
                      <div className="font-extrabold text-sm">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono font-normal mt-0.5">
                        ${billing === "monthly" ? p.priceMonthly : p.priceYearly}/{billing === "monthly" ? "mo" : "yr"}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {/* Cost Row */}
                <tr className="bg-slate-50/30">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 sticky left-0 bg-slate-50/90 z-10">
                    Base Cost ({billing === "monthly" ? "Monthly" : "Yearly"})
                  </td>
                  {plans.map((p, idx) => (
                    <td key={`cost-${idx}`} className="p-3.5 sm:p-4 text-center font-mono font-bold text-slate-900">
                      ${billing === "monthly" ? p.priceMonthly : p.priceYearly}
                    </td>
                  ))}
                </tr>

                {/* All Features Matrix */}
                {allFeatures.map((feat, fIdx) => (
                  <tr key={fIdx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-semibold text-slate-800 sticky left-0 bg-white z-10">
                      {feat}
                    </td>
                    {plans.map((p, pIdx) => {
                      const isIncluded = Array.isArray(p.features) && p.features.includes(feat);
                      const isExcluded = Array.isArray(p.missing) && p.missing.includes(feat);

                      return (
                        <td key={`feat-${fIdx}-${pIdx}`} className="p-3.5 sm:p-4 text-center">
                          {isIncluded ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs">
                              ✓
                            </span>
                          ) : isExcluded ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-xs">
                              ✗
                            </span>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* IP Ownership Row */}
                <tr>
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 sticky left-0 bg-white z-10">
                    Intellectual Property Ownership
                  </td>
                  {plans.map((_, idx) => (
                    <td key={`ip-${idx}`} className="p-3.5 sm:p-4 text-center font-semibold text-emerald-600 text-[11px]">
                      100% Transfer
                    </td>
                  ))}
                </tr>

                {/* SLA Row */}
                <tr>
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 sticky left-0 bg-white z-10">
                    SLA & Support Guarantee
                  </td>
                  {plans.map((p, idx) => (
                    <td key={`sla-${idx}`} className="p-3.5 sm:p-4 text-center text-slate-600 text-[11px]">
                      {p.popular ? "Priority SLA & Chat" : "Standard SLA"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Row */}
          <div className="mt-6 flex flex-wrap justify-between items-center gap-4 select-none pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium">
              Need custom terms or private VPC deployment?
            </span>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-all cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/#contact"
                onClick={onClose}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all shadow-sm"
              >
                Discuss Scope
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PricingComparisonTable;
