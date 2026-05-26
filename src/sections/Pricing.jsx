"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X, Zap } from "lucide-react";

const Pricing = ({ initialPlans = [] }) => {
  const [plans] = useState(initialPlans); // No fetch
  const [billing, setBilling] = useState("monthly");

  return (
    <section id="pricing" className="py-12 md:py-24 bg-transparent text-slate-900 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight">
            Simple, Transparent <span className="text-indigo-600">Pricing</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-lg mb-6 md:mb-8 font-semibold">
            Choose the perfect plan for your business needs. No hidden fees.
          </p>

          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-bold ${billing === "monthly" ? "text-slate-800" : "text-slate-400"}`}>
                Monthly
            </span>
            <button
                onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
                className="relative w-14 h-7 md:w-16 md:h-8 rounded-full bg-slate-200/80 border border-slate-300 p-1 transition-colors hover:border-indigo-500/50"
            >
                <motion.div 
                    layout 
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-indigo-600 shadow-md ${
                        billing === "yearly" ? "translate-x-7 md:translate-x-8" : "translate-x-0"
                    }`}
                />
            </button>
            <span className={`text-sm font-bold ${billing === "yearly" ? "text-slate-800" : "text-slate-400"}`}>
                Yearly <span className="text-[10px] md:text-xs text-green-600 ml-1 font-bold">(Save ~20%)</span>
            </span>
          </div>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-6 pb-6 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 items-stretch md:items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className={`relative flex-shrink-0 w-[85vw] md:w-auto md:flex-shrink snap-center p-6 md:p-8 rounded-2xl md:rounded-3xl border transition-all duration-300 flex flex-col h-auto md:h-full ${
                plan.popular 
                    ? "bg-white border-indigo-500 shadow-[0_10px_45px_rgba(79,70,229,0.12)] z-10 md:scale-105" 
                    : "bg-white/70 border-slate-200/80 hover:border-slate-350 shadow-sm"
              }`}
              data-cursor="Plan"
            >
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 px-3 py-1 md:px-4 md:py-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase text-white shadow-md whitespace-nowrap">
                    Most Popular
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800">{plan.name}</h3>
                <p className="text-xs md:text-sm text-slate-500 font-medium mt-2 min-h-[30px] md:min-h-[40px]">{plan.desc}</p>
              </div>

              <div className="mb-6 md:mb-8 flex items-end gap-1">
                <span className="text-3xl md:text-4xl font-extrabold text-slate-900">
                    ${billing === "monthly" ? plan.priceMonthly : plan.priceYearly}
                </span>
                <span className="text-sm md:text-base text-slate-400 mb-1">/{billing === "monthly" ? "mo" : "yr"}</span>
              </div>

              <Link href="#contact" className={`w-full py-3 md:py-4 rounded-xl font-bold mb-6 md:mb-8 transition-all flex items-center justify-center gap-2 text-sm md:text-base ${
                plan.popular 
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20" 
                    : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}>
                {plan.popular && <Zap size={16} className="md:w-[18px] md:h-[18px]" fill="currentColor" />}
                Get Started
              </Link>

              <div className="space-y-3 md:space-y-4 flex-grow">
                {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className={`p-1 rounded-full ${plan.popular ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-600"}`}>
                            <Check size={10} className="md:w-3 md:h-3" strokeWidth={3} />
                        </div>
                        <span className="text-xs md:text-sm text-slate-600 font-medium">{feature}</span>
                    </div>
                ))}
                {plan.missing && plan.missing.map((feature, i) => (
                    <div key={`miss-${i}`} className="flex items-center gap-3 opacity-40">
                        <div className="p-1 rounded-full bg-slate-50 text-slate-400">
                            <X size={10} className="md:w-3 md:h-3" strokeWidth={3} />
                        </div>
                        <span className="text-xs md:text-sm text-slate-400">{feature}</span>
                    </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;