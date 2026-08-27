"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Check, 
  X, 
  Zap, 
  Receipt, 
  Sparkles, 
  HelpCircle, 
  Boxes, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  PackageOpen
} from "lucide-react";
import PricingFilterSystem from "./PricingFilterSystem";
import PricingComparisonTable from "./PricingComparisonTable";

// Draw Checkmark Path Animation
const CheckmarkIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={3} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <motion.path 
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      d="M20 6L9 17l-5-5" 
    />
  </svg>
);

const PricingCatalog = ({ initialPlans = [] }) => {
  const [billing, setBilling] = useState("monthly");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCompare, setShowCompare] = useState(false);

  // Check if multiple billing intervals exist across plans
  const hasYearlyOption = useMemo(() => {
    return initialPlans.some(p => p.priceYearly && p.priceYearly !== p.priceMonthly);
  }, [initialPlans]);

  // Extract unique categories that actually have data
  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    initialPlans.forEach(p => {
      if (p.category && p.category !== "All") {
        cats.add(p.category);
      }
    });
    return Array.from(cats);
  }, [initialPlans]);

  // Filtered plans
  const filteredPlans = useMemo(() => {
    if (selectedCategory === "All") return initialPlans;
    return initialPlans.filter(p => p.category === selectedCategory);
  }, [initialPlans, selectedCategory]);

  return (
    <section id="catalog" className="py-16 md:py-24 bg-transparent text-slate-900 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">
            <Sparkles size={13} /> Blueprints & Plans
          </div>
          <h2 className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950">
            Engineered For Clarity. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">Priced For Scale.</span>
          </h2>
          <p className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto mb-6 leading-relaxed">
            Select a verified production configuration or customize an architectural scope to fit your exact operational parameters.
          </p>

          {/* Billing Switcher (Only if yearly pricing exists) */}
          {hasYearlyOption && (
            <div className="inline-flex items-center gap-3 bg-slate-100/80 border border-slate-200/60 p-1.5 rounded-full select-none mb-6">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  billing === "monthly" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  billing === "yearly" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Yearly billing
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-extrabold">
                  -20%
                </span>
              </button>
            </div>
          )}

          {/* Category Filter Pills (if multiple categories exist) */}
          <PricingFilterSystem
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Compare specifications modal trigger */}
          {initialPlans.length > 0 && (
            <div className="select-none">
              <button
                onClick={() => setShowCompare(true)}
                className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 mx-auto transition-colors cursor-pointer"
                data-cursor="Compare"
              >
                <HelpCircle size={15} /> Compare Technical Blueprint Specifications
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredPlans.length === 0 && (
          <div className="text-center py-16 px-6 max-w-xl mx-auto bg-white border border-slate-200/80 rounded-3xl shadow-sm">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <PackageOpen size={28} />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Pricing Information Currently Being Configured
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Our active commercial configurations are currently being updated. Contact DevSamp directly to discuss tailored specifications.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs transition-all shadow-sm"
            >
              <span>Speak With Lead Architect</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Core Pricing Cards Grid */}
        {filteredPlans.length > 0 && (
          <div className={`grid gap-6 lg:gap-8 items-stretch mb-12 ${
            filteredPlans.length === 1 
              ? "max-w-md mx-auto grid-cols-1" 
              : filteredPlans.length === 2 
                ? "max-w-4xl mx-auto grid-cols-1 md:grid-cols-2" 
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}>
            {filteredPlans.map((plan, index) => {
              const currentPrice = billing === "monthly" ? plan.priceMonthly : plan.priceYearly;
              const isPopular = plan.popular || plan.featured;
              const currency = plan.currency || "$";

              return (
                <motion.div
                  key={plan._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`relative p-6 sm:p-7 md:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                    isPopular 
                      ? "bg-white border-blue-500 shadow-[0_12px_40px_rgba(37,99,235,0.08)] z-10 md:scale-[1.02]" 
                      : "bg-white/90 border-slate-200/80 hover:border-slate-350 shadow-sm"
                  }`}
                  data-cursor="Plan"
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-[11px] font-bold tracking-wider uppercase text-white shadow-sm whitespace-nowrap flex items-center gap-1.5 select-none">
                      <Sparkles size={12} /> Popular Choice
                    </div>
                  )}

                  <div>
                    {/* Receipt Header Mockup */}
                    <div className="border-b border-slate-200/80 pb-4 mb-4 select-none">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold mb-1">
                        <span className="flex items-center gap-1">
                          <Receipt size={12} /> DEVSAMP_BILL
                        </span>
                        <span>#00{index + 1}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                          {plan.name}
                        </h3>
                        {plan.category && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                            {plan.category}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium line-clamp-2 mt-1.5 min-h-[36px] leading-relaxed">
                        {plan.desc || plan.description}
                      </p>
                    </div>

                    {/* Associated Product or Service Context (if populated) */}
                    {plan.product && typeof plan.product === "object" && (
                      <div className="mb-4 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-blue-900 flex items-center gap-1.5">
                          <Boxes size={14} className="text-blue-600" />
                          <span>Includes SaaS: <strong>{plan.product.name}</strong></span>
                        </span>
                        <Link href={`/products/${plan.product.slug || ""}`} className="text-[11px] font-bold text-blue-600 hover:underline">
                          View &rarr;
                        </Link>
                      </div>
                    )}

                    {plan.service && typeof plan.service === "object" && (
                      <div className="mb-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                          <Layers size={14} className="text-slate-500" />
                          <span>Specialization: <strong>{plan.service.title || plan.service.name}</strong></span>
                        </span>
                        <Link href="/services" className="text-[11px] font-bold text-blue-600 hover:underline">
                          Scope &rarr;
                        </Link>
                      </div>
                    )}

                    {/* Pricing Details */}
                    <div className="mb-6 flex items-baseline gap-1 select-none">
                      <span className="text-3xl sm:text-4xl font-black text-slate-950 font-mono tracking-tight">
                        {currency}{currentPrice}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">
                        /{billing === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>

                    {/* Get Started Button */}
                    <Link 
                      href={`/?service=${encodeURIComponent(plan.name)}#contact`}
                      className={`w-full py-3 sm:py-3.5 rounded-2xl font-bold mb-6 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm ${
                        isPopular 
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/15" 
                          : "bg-slate-950 hover:bg-slate-800 text-white shadow-xs"
                      }`}
                    >
                      {isPopular && <Zap size={14} fill="currentColor" />}
                      <span>{plan.ctaText || "Deploy Config"}</span>
                    </Link>

                    {/* Bullet points manifest */}
                    <div className="space-y-3 pt-2">
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Included Specifications
                      </div>

                      {Array.isArray(plan.features) && plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className={`p-0.5 rounded-full shrink-0 mt-0.5 ${
                            isPopular ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-600"
                          }`}>
                            <CheckmarkIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-normal">
                            {feature}
                          </span>
                        </div>
                      ))}

                      {Array.isArray(plan.missing) && plan.missing.filter(f => f && f !== "hii").map((feature, i) => (
                        <div key={`miss-${i}`} className="flex items-start gap-2.5 opacity-40">
                          <div className="p-0.5 rounded-full bg-slate-100 text-slate-400 shrink-0 mt-0.5">
                            <X size={12} strokeWidth={3} />
                          </div>
                          <span className="text-xs sm:text-sm text-slate-400 line-through">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Guarantee Note */}
                  <div className="pt-6 mt-6 border-t border-slate-100 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>IP OWNERSHIP: 100%</span>
                    <span className="text-emerald-600 font-bold">✓ NO LOCK-IN</span>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* Comparison Specifications Modal */}
      <PricingComparisonTable
        plans={filteredPlans.length > 0 ? filteredPlans : initialPlans}
        isOpen={showCompare}
        onClose={() => setShowCompare(false)}
        billing={billing}
      />

    </section>
  );
};

export default PricingCatalog;
