"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  Building2, 
  ArrowRight, 
  Sparkles, 
  Activity, 
  Layers,
  ArrowUpRight
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const fallbackIndustries = [
  {
    name: "Healthcare & Hospitals",
    tagline: "Clinical Workflows & Telemetry",
    desc: "Hospital ERPs, multi-department OPD management, doctor scheduling, and real-time patient queues.",
    icon: "Activity",
  },
  {
    name: "FinTech & Banking",
    tagline: "High-Volume Ledger Auditing",
    desc: "Payment orchestration, automated reconciliations, invoice parsing, and strict idempotency handling.",
    icon: "ShieldCheck",
  },
  {
    name: "Logistics & Supply Chain",
    tagline: "Fleet & Inventory Meshes",
    desc: "Warehouse inventory tracking, driver dispatch interfaces, GPS route telemetry, and barcode scanning.",
    icon: "Boxes",
  },
  {
    name: "Retail & Multi-Tenant E-Commerce",
    tagline: "High-Concurrency Catalogs",
    desc: "Sub-50ms product search, distributed shopping carts, localized taxes, and omnichannel inventory sync.",
    icon: "ShoppingBag",
  },
];

const ServicesIndustries = ({ industries = [] }) => {
  const displayList = industries.length > 0 ? industries : fallbackIndustries;

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
            <Building2 size={13} className="text-indigo-600" />
            <span className="tracking-wide uppercase font-mono">INDUSTRY SPECIALIZATIONS</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            Applied Domain Engineering
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            Our engineering pods bring domain-specific insights to complex industries, ensuring compliant architectures and seamless operational workflows.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayList.map((ind, idx) => {
            const IconComponent = LucideIcons[ind.icon] || Building2;
            return (
              <motion.div
                key={ind._id || ind.name || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-slate-50 border border-slate-200/80 hover:border-indigo-500/40 rounded-3xl p-6 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 group-hover:scale-105 transition-transform">
                      <IconComponent size={20} />
                    </div>
                  </div>

                  <h3 className="text-base font-black text-slate-900 tracking-tight mb-1">
                    {ind.name || ind.title}
                  </h3>

                  {ind.tagline && (
                    <div className="text-xs font-bold text-indigo-600 mb-2">
                      {ind.tagline}
                    </div>
                  )}

                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {ind.desc || ind.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60">
                  <Link
                    href={`/#contact?domain=${encodeURIComponent(ind.name || ind.title || "")}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors group/link"
                  >
                    <span>Discuss Domain Scope</span>
                    <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesIndustries;
