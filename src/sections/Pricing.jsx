"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, X, Zap, Receipt, ShieldCheck, HelpCircle, Sparkles } from "lucide-react";

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

const Pricing = ({ initialPlans = [] }) => {
  const [plans] = useState(initialPlans); 
  const [billing, setBilling] = useState("monthly");
  const [showCompare, setShowCompare] = useState(false); // Compare plans modal trigger
  
  // Interactive Calculator State
  const [pagesCount, setPagesCount] = useState(5);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [calcSettings, setCalcSettings] = useState({
    basePrice: 299,
    pricePerPage: 40,
    addons: [
      { name: "Interactive Admin Panel (CMS)", price: 299, enabled: true },
      { name: "Vitals SEO optimization", price: 149, enabled: true },
      { name: "Payment Gateway integrations", price: 199, enabled: true }
    ]
  });

  // Fetch interactive calculator settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/pricing/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            setCalcSettings(data.settings);
          }
        }
      } catch (err) {
        console.error("Failed to load calculator settings:", err);
      }
    };
    fetchSettings();
  }, []);

  // Recalculate estimated price
  const calculatedQuote = useMemo(() => {
    let base = calcSettings.basePrice;
    base += pagesCount * calcSettings.pricePerPage;
    if (calcSettings.addons && calcSettings.addons.length > 0) {
      calcSettings.addons.forEach(addon => {
        if (addon.enabled && selectedAddons.includes(addon.name)) {
          base += addon.price;
        }
      });
    }
    return base;
  }, [pagesCount, selectedAddons, calcSettings]);

  return (
    <section id="pricing" className="py-12 md:py-24 bg-transparent text-slate-900 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-55 border border-indigo-100 text-[10px] font-bold text-indigo-650 uppercase tracking-widest mb-3">
            Budget Control
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            Simple, Transparent <span className="text-indigo-650 font-extrabold">Pricing</span>
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mb-8 font-semibold">
            Select an active service blueprint or configure a customized scope using our quote tool.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center gap-3 bg-slate-100/80 border border-slate-200/60 p-1.5 rounded-full select-none">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                billing === "monthly" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                billing === "yearly" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Yearly billing
              <span className="text-[9px] bg-green-150 text-green-700 px-1.5 py-0.5 rounded-full font-extrabold">
                -20%
              </span>
            </button>
          </div>

          {/* Compare blueprints button */}
          <div className="mt-6 select-none">
            <button
              onClick={() => setShowCompare(true)}
              className="text-xs font-bold text-indigo-650 hover:text-indigo-850 flex items-center gap-1.5 mx-auto transition-colors cursor-pointer"
              data-cursor="Compare"
            >
              <HelpCircle size={14} /> Compare Blueprint Specifications
            </button>
          </div>
        </div>

        {/* Pricing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Columns: Invoice Manifest Cards */}
          <div className="lg:col-span-8 flex flex-row md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-6 md:pb-0 scrollbar-none snap-x snap-mandatory">
            {plans.map((plan, index) => {
              const currentPrice = billing === "monthly" ? plan.priceMonthly : plan.priceYearly;
              return (
                <motion.div
                  key={plan._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`relative shrink-0 w-[85vw] md:w-auto snap-center p-6 md:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                    plan.popular 
                      ? "bg-white border-indigo-500 shadow-[0_12px_40px_rgba(79,70,229,0.08)] z-10 md:scale-[1.03]" 
                      : "bg-white/85 border-slate-200/80 hover:border-slate-350 shadow-sm"
                  }`}
                  data-cursor="Plan"
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-[9px] font-bold tracking-widest uppercase text-white shadow-sm whitespace-nowrap flex items-center gap-1 select-none">
                      <Sparkles size={10} /> Popular Choice
                    </div>
                  )}

                  {/* Receipt Header Mockup */}
                  <div className="border-b border-slate-200/80 pb-4 mb-4 select-none">
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 font-bold mb-1">
                      <span className="flex items-center gap-1"><Receipt size={10} /> DEVSAMP_BILL</span>
                      <span>#00{index+1}</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-800">{plan.name}</h3>
                    <p className="text-[10px] text-slate-450 font-semibold line-clamp-2 mt-1 min-h-[30px] leading-relaxed">
                      {plan.desc}
                    </p>
                  </div>

                  {/* Pricing Details */}
                  <div className="mb-5 flex items-baseline gap-1 select-none">
                    <span className="text-3xl font-black text-slate-900 transition-all font-mono">
                      ${currentPrice}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">
                      /{billing === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>

                  {/* Get Started Button */}
                  <Link 
                    href={`/?service=${encodeURIComponent(plan.name)}#contact`}
                    className={`w-full py-3 rounded-2xl font-bold mb-6 transition-all flex items-center justify-center gap-2 text-xs md:text-sm ${
                      plan.popular 
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/10" 
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    {plan.popular && <Zap size={14} fill="currentColor" />}
                    Deploy Config
                  </Link>

                  {/* Bullet points manifest */}
                  <div className="space-y-3 flex-grow">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className={`p-0.5 rounded-full shrink-0 mt-0.5 ${
                          plan.popular ? "bg-indigo-55 text-indigo-600" : "bg-slate-100 text-slate-600"
                        }`}>
                          <CheckmarkIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] md:text-xs text-slate-650 font-bold leading-normal">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {plan.missing && plan.missing.map((feature, i) => (
                      <div key={`miss-${i}`} className="flex items-start gap-2.5 opacity-35">
                        <div className="p-0.5 rounded-full bg-slate-50 text-slate-400 shrink-0 mt-0.5">
                          <X size={12} strokeWidth={3} />
                        </div>
                        <span className="text-[11px] md:text-xs text-slate-400 line-through">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Custom Interactive Calculator */}
          <div className="lg:col-span-4 bg-white/90 border border-indigo-100/60 p-6 md:p-7 rounded-3xl shadow-sm relative">
            <div className="absolute top-2 right-2">
              <span className="bg-indigo-50 text-indigo-600 text-[8px] font-bold px-2 py-0.5 rounded uppercase font-mono border border-indigo-100/50">
                Live Calculator
              </span>
            </div>

            <h3 className="text-lg font-black text-slate-800 mb-2 flex items-center gap-2">
              <ShieldCheck className="text-indigo-600" size={20} />
              <span>Scope Evaluator</span>
            </h3>
            <p className="text-[10px] text-slate-500 font-semibold mb-6">
              Estimate project expenses instantly based on development parameters.
            </p>

            {/* Slider: Pages count */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs font-bold text-slate-700 select-none">
                <span>Scale (Pages / Screens)</span>
                <span className="text-indigo-650 font-mono">{pagesCount} units</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={30} 
                value={pagesCount} 
                onChange={(e) => setPagesCount(Number(e.target.value))}
                className="w-full accent-indigo-600 h-1 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                <span>1 Page</span>
                <span>30 Pages</span>
              </div>
            </div>

            {/* Addons Checklist */}
            <div className="space-y-3.5 mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Additional Modules
              </span>

              {calcSettings.addons && calcSettings.addons
                .filter(addon => addon.enabled)
                .map((addon, idx) => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <label 
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked 
                          ? "bg-indigo-50/40 border-indigo-200" 
                          : "bg-slate-50/50 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
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
                          className="accent-indigo-600 w-3.5 h-3.5"
                        />
                        <span className="text-xs font-bold text-slate-750">{addon.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-indigo-650 bg-white border border-indigo-100 px-1.5 py-0.5 rounded shadow-sm">
                        +${addon.price}
                      </span>
                    </label>
                  );
                })}
            </div>

            {/* Price Output */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 select-none">
              <div className="flex justify-between text-[10px] text-slate-450 font-mono mb-2">
                <span>ESTIMATED PAYLOAD</span>
                <span>COMPILATION: OK</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black font-mono text-indigo-300">
                  ${calculatedQuote}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">est. total</span>
              </div>

              {/* Itemized pricing breakdown */}
              <div className="border-t border-slate-850 mt-3 pt-3 space-y-1 text-[9px] text-slate-400 font-mono select-none">
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>${calcSettings.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Screens ({pagesCount} × ${calcSettings.pricePerPage}):</span>
                  <span>${pagesCount * calcSettings.pricePerPage}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between">
                    <span>Add-ons Cost:</span>
                    <span>
                      ${calcSettings.addons
                        .filter(addon => selectedAddons.includes(addon.name))
                        .reduce((sum, addon) => sum + addon.price, 0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-800 mt-3.5 pt-3 flex justify-between items-center text-[10px] text-slate-500 font-bold">
                <span>SLA Delivery:</span>
                <span className="text-slate-300">{pagesCount > 15 ? "3-4 Weeks" : "1-2 Weeks"}</span>
              </div>
            </div>

            <Link 
              href={`/?customQuote=${calculatedQuote}&pages=${pagesCount}&addons=${encodeURIComponent(selectedAddons.join(','))}#contact`}
              className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all text-xs md:text-sm shadow-md"
            >
              Ship Custom Specifications
            </Link>
          </div>

        </div>

        {/* Footer Guarantee info */}
        <div className="bg-white/80 border border-slate-200/80 p-5 rounded-2xl max-w-2xl mx-auto flex items-center gap-4 select-none">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 shrink-0">
            <HelpCircle size={22} />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-800">Need an enterprise layout agreement?</h4>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
              Contact us directly via the setup variable console below or send an inquiry to devsamp1st@gmail.com for comprehensive service plans.
            </p>
          </div>
        </div>

      </div>

      {/* Compare blueprints Modal */}
      <AnimatePresence>
        {showCompare && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowCompare(false)} 
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="relative bg-white border border-slate-200 p-6 md:p-8 rounded-3xl w-full max-w-3xl shadow-2xl text-slate-900 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4 select-none">
                <div>
                  <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                    <Sparkles size={18} className="text-indigo-600" /> Compare Blueprints
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">technical comparisons manifest</p>
                </div>
                <button 
                  onClick={() => setShowCompare(false)} 
                  className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 font-mono text-[10px] text-slate-500 font-bold uppercase select-none">
                      <th className="p-3">Specification Parameter</th>
                      <th className="p-3 text-center">Starter</th>
                      <th className="p-3 text-center text-indigo-600">Pro</th>
                      <th className="p-3 text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    <tr>
                      <td className="p-3 font-bold">Base Cost (Monthly)</td>
                      <td className="p-3 text-center font-mono">$29</td>
                      <td className="p-3 text-center font-mono text-indigo-600 font-bold">$79</td>
                      <td className="p-3 text-center font-mono">$199</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Base Cost (Yearly)</td>
                      <td className="p-3 text-center font-mono">$290</td>
                      <td className="p-3 text-center font-mono text-indigo-600 font-bold">$790</td>
                      <td className="p-3 text-center font-mono">$1990</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Scale (Projects)</td>
                      <td className="p-3 text-center text-slate-500">1 Project</td>
                      <td className="p-3 text-center text-indigo-600 font-bold">5 Projects</td>
                      <td className="p-3 text-center text-slate-500">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Mobile Responsive</td>
                      <td className="p-3 text-center text-emerald-500">✓ Yes</td>
                      <td className="p-3 text-center text-emerald-500">✓ Yes</td>
                      <td className="p-3 text-center text-emerald-500">✓ Yes</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">SEO & Analytics</td>
                      <td className="p-3 text-center text-slate-500">Basic</td>
                      <td className="p-3 text-center text-indigo-600 font-bold">Advanced Dashboard</td>
                      <td className="p-3 text-center text-slate-500">Custom Real-time</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Database Integration</td>
                      <td className="p-3 text-center text-rose-500">✗ No</td>
                      <td className="p-3 text-center text-emerald-500">✓ Yes (MongoDB)</td>
                      <td className="p-3 text-center text-emerald-500">✓ Yes (Fully Managed)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">CMS Panel (Admin dashboard)</td>
                      <td className="p-3 text-center text-rose-500">✗ No</td>
                      <td className="p-3 text-center text-emerald-500">✓ Yes</td>
                      <td className="p-3 text-center text-emerald-500">✓ Yes</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Support Service Level</td>
                      <td className="p-3 text-center text-slate-500">Email</td>
                      <td className="p-3 text-center text-indigo-600 font-bold">Priority Chat & Email</td>
                      <td className="p-3 text-center text-slate-500">24/7 Phone & Slack</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">White Labeling</td>
                      <td className="p-3 text-center text-rose-500">✗ No</td>
                      <td className="p-3 text-center text-rose-500">✗ No</td>
                      <td className="p-3 text-center text-emerald-500">✓ Yes</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Dedicated Manager</td>
                      <td className="p-3 text-center text-rose-500">✗ No</td>
                      <td className="p-3 text-center text-rose-500">✗ No</td>
                      <td className="p-3 text-center text-emerald-500">✓ Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-center select-none">
                <button
                  onClick={() => setShowCompare(false)}
                  className="px-6 py-2.5 bg-slate-950 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-sm"
                >
                  Close Console
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Pricing;