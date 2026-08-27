"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  Sparkles, 
  Receipt, 
  ArrowRight, 
  Sliders, 
  PlusCircle, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const PricingCalculator = ({ initialSettings = null }) => {
  const [pagesCount, setPagesCount] = useState(5);
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Use DB-configured settings or verified defaults
  const calcSettings = useMemo(() => {
    return initialSettings || {
      basePrice: 499,
      pricePerPage: 50,
      addons: [
        { name: "Interactive Dashboard", price: 200, enabled: true },
        { name: "Full SEO Optimization", price: 150, enabled: true },
        { name: "Secure Payment Gateway", price: 100, enabled: true },
      ],
    };
  }, [initialSettings]);

  // Recalculate quote
  const calculatedQuote = useMemo(() => {
    let total = Number(calcSettings.basePrice) || 0;
    total += pagesCount * (Number(calcSettings.pricePerPage) || 0);

    if (Array.isArray(calcSettings.addons)) {
      calcSettings.addons.forEach((addon) => {
        if (addon.enabled && selectedAddons.includes(addon.name)) {
          total += Number(addon.price) || 0;
        }
      });
    }
    return total;
  }, [pagesCount, selectedAddons, calcSettings]);

  const activeAddons = useMemo(() => {
    return Array.isArray(calcSettings.addons) 
      ? calcSettings.addons.filter(a => a.enabled !== false) 
      : [];
  }, [calcSettings]);

  return (
    <section id="calculator" className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200/60 relative overflow-hidden">
      
      <div className="ecosystem-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">
            <Sliders size={13} /> Interactive Tool
          </div>
          <h2 className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950">
            Project Scope <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">Evaluator</span>
          </h2>
          <p className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed">
            Estimate production development expenses and delivery SLAs instantly based on your required screens and platform modules.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg shadow-slate-900/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Slider: Pages count */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-slate-800 select-none">
                <span className="flex items-center gap-2">
                  <Sliders size={16} className="text-blue-600" />
                  <span>Platform Scale (Screens / Pages)</span>
                </span>
                <span className="text-blue-700 font-mono text-base px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100">
                  {pagesCount} units
                </span>
              </div>

              <input 
                type="range" 
                min={1} 
                max={30} 
                value={pagesCount} 
                onChange={(e) => setPagesCount(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer transition-all"
              />

              <div className="flex justify-between text-[10px] text-slate-400 font-mono font-bold">
                <span>1 Screen (Landing Scope)</span>
                <span>15 Screens</span>
                <span>30+ Screens (Enterprise)</span>
              </div>
            </div>

            {/* Addons Checklist */}
            {activeAddons.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">
                    Select Auxiliary Modules
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">
                    {selectedAddons.length} of {activeAddons.length} added
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeAddons.map((addon, idx) => {
                    const isChecked = selectedAddons.includes(addon.name);
                    return (
                      <label 
                        key={idx}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isChecked 
                            ? "bg-blue-50/50 border-blue-300 shadow-2xs" 
                            : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={isChecked} 
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAddons(prev => [...prev, addon.name]);
                              } else {
                                setSelectedAddons(prev => prev.filter(name => name !== addon.name));
                              }
                            }}
                            className="accent-blue-600 w-4 h-4 rounded cursor-pointer"
                          />
                          <span className="text-xs sm:text-sm font-bold text-slate-800">
                            {addon.name}
                          </span>
                        </div>

                        <span className="text-xs font-mono font-bold text-blue-700 bg-white border border-blue-100 px-2 py-0.5 rounded-md shadow-2xs">
                          +${addon.price}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 font-medium leading-relaxed flex items-start gap-3">
              <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <span>
                Calculated estimates represent baseline turnkey engineering scopes. Actual retainer hours and custom SLA requirements are finalized during architectural discovery.
              </span>
            </div>

          </div>

          {/* Price Output Console */}
          <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between select-none">
            
            <div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mb-4 border-b border-white/10 pb-3">
                <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <Receipt size={12} /> EVALUATOR MANIFEST
                </span>
                <span className="text-emerald-400">READY</span>
              </div>

              <div className="mb-4">
                <div className="text-[11px] text-slate-400 font-bold">Estimated Turnkey Total</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-black font-mono text-white tracking-tight">
                    ${calculatedQuote}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">est. payload</span>
                </div>
              </div>

              {/* Itemized pricing breakdown */}
              <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Base Architectural Setup:</span>
                  <span>${calcSettings.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Screens ({pagesCount} × ${calcSettings.pricePerPage}):</span>
                  <span>${pagesCount * calcSettings.pricePerPage}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Selected Add-ons ({selectedAddons.length}):</span>
                    <span className="text-blue-300">
                      +${activeAddons
                        .filter(addon => selectedAddons.includes(addon.name))
                        .reduce((sum, addon) => sum + addon.price, 0)}
                    </span>
                  </div>
                )}
              </div>

              {/* SLA timeframe indicator */}
              <div className="border-t border-white/10 mt-4 pt-3 flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock size={12} className="text-blue-400" /> SLA Delivery:
                </span>
                <span className="text-emerald-400 font-bold">
                  {pagesCount > 15 ? "3–4 Weeks" : "1–2 Weeks"}
                </span>
              </div>
            </div>

            <Link 
              href={`/?customQuote=${calculatedQuote}&pages=${pagesCount}&addons=${encodeURIComponent(selectedAddons.join(','))}#contact`}
              className="w-full mt-6 py-3.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:opacity-95 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all text-xs sm:text-sm shadow-md"
            >
              <span>Ship Custom Specifications</span>
              <ArrowRight size={14} />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PricingCalculator;
