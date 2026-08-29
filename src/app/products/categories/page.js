import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Activity, Boxes, Users, CreditCard, Brain, Zap, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Product Categories | DevSamp Ecosystem",
  description: "Explore DevSamp proprietary software by domain: Healthcare ERP, Retail POS, HRMS, CRM, and AI Workflows.",
};

const CATEGORIES = [
  {
    id: "healthcare",
    name: "Healthcare & Diagnostics",
    desc: "Hospital ERP, OPD/IPD workflows, Laboratory Information Management Systems (LIMS), and Pharmacy retail.",
    flagship: "MedERP Pro Clinical Suite",
    link: "/products/mederp-pro",
    badge: "FLAGSHIP SaaS"
  },
  {
    id: "retail",
    name: "Retail & Multi-Branch POS",
    desc: "High-speed offline-first billing terminals, live barcode scanning, multi-warehouse inventory, and GST compliance.",
    flagship: "FlowPulse Retail POS",
    link: "/products",
    badge: "RETAIL"
  },
  {
    id: "finance",
    name: "Finance, Billing & Ledgers",
    desc: "Multi-tenant recurring subscription metering, automated tax invoices, reconciliation engines, and audit trails.",
    flagship: "DevSamp Billing Engine",
    link: "/platform/billing",
    badge: "FINANCE"
  },
  {
    id: "ai",
    name: "AI Solutions & Automation",
    desc: "Autonomous LLM agents, semantic patient records search, automated customer routing, and intelligent predictive models.",
    flagship: "DevSamp Neural Mesh",
    link: "/services/ai-solutions",
    badge: "INTELLIGENCE"
  }
];

export default function ProductCategoriesPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: "Categories", href: "/products/categories" }
      ]}
      badge="SOFTWARE DOMAINS"
      title="Ecosystem Product Categories"
      subtitle="Explore our proprietary vertical SaaS platforms and enterprise tools categorized by specialized domain."
      primaryAction={{ label: "View All Products", href: "/products" }}
      secondaryAction={{ label: "Compare Platforms", href: "/products/compare" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                {cat.badge}
              </span>
              <h3 className="text-xl font-bold text-slate-900">{cat.name}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{cat.desc}</p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Featured Platform</p>
                <p className="text-xs font-bold text-slate-800">{cat.flagship}</p>
              </div>
              <Link
                href={cat.link}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Explore</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
