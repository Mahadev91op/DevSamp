"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Boxes, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  Cpu,
  Workflow
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const PricingProductServiceBridge = ({ products = [], services = [] }) => {
  const displayProducts = (products || []).slice(0, 3);
  const displayServices = (services || []).slice(0, 3);

  if (displayProducts.length === 0 && displayServices.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-slate-50/50 border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">
            <Workflow size={13} /> Ecosystem Integration
          </div>
          <h2 className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950">
            Commercial Alignment With Products & Services
          </h2>
          <p className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed">
            All DevSamp pricing blueprints map directly to our production-ready software platforms and dedicated full-stack engineering pods.
          </p>
        </div>

        {/* 2-Column Bridge Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Related Products */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Boxes size={18} />
                  </div>
                  <span className="font-extrabold text-slate-900 text-base">Software Products</span>
                </div>
                <Link href="/products" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                  <span>View Suite</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              <div className="space-y-3 mb-6">
                {displayProducts.map((p, idx) => (
                  <Link 
                    key={p._id || idx}
                    href={`/products/${p.slug || ""}`}
                    className="block p-3.5 rounded-2xl bg-slate-50/70 hover:bg-blue-50/50 border border-slate-200/70 hover:border-blue-200 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {p.name}
                      </h4>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                        {p.category || "SaaS"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium line-clamp-1">
                      {p.tagline || p.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-xs font-mono text-slate-400">
              * SaaS products include cloud infrastructure and automated updates.
            </p>
          </div>

          {/* Right Column: Related Engineering Services */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Layers size={18} />
                  </div>
                  <span className="font-extrabold text-slate-900 text-base">Engineering Capabilities</span>
                </div>
                <Link href="/services" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                  <span>View Services</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              <div className="space-y-3 mb-6">
                {displayServices.map((s, idx) => (
                  <Link 
                    key={s._id || idx}
                    href="/services#catalog"
                    className="block p-3.5 rounded-2xl bg-slate-50/70 hover:bg-indigo-50/50 border border-slate-200/70 hover:border-indigo-200 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {s.title || s.name}
                      </h4>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                        {s.category || "Engineering"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium line-clamp-1">
                      {s.desc || s.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-xs font-mono text-slate-400">
              * Dedicated pod retainers transfer 100% intellectual property rights.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PricingProductServiceBridge;
