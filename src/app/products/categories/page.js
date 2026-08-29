import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import {
  Activity,
  Boxes,
  Users,
  CreditCard,
  Brain,
  Zap,
  ArrowRight,
  ShieldCheck,
  Building2,
  Truck,
  CheckCircle2
} from "lucide-react";

export const metadata = {
  title: "Product Categories & Domain Taxonomy | DevSamp Ecosystem",
  description: "Explore DevSamp proprietary software by domain: Healthcare ERP, Retail POS, Supply Chain, Developer Engines, and AI Workflows.",
};

const CATEGORIES = [
  {
    id: "healthcare",
    name: "Healthcare & Clinical ERP",
    icon: Activity,
    desc: "Hospital ERP, OPD/IPD workflows, Laboratory Information Management Systems (LIMS), OT schedules, and Pharmacy retail management.",
    flagship: "MedERP Pro Clinical Suite",
    link: "/products/mederp-pro",
    badge: "FLAGSHIP SaaS",
    solutions: [
      "120+ Bed Multi-Specialty Hospital ERP",
      "Bidirectional Lab Instrument HL7 Bridges",
      "Pharmacy Batch & Expiry Controlled POS",
      "Automated Discharge Summaries with E-Signatures"
    ]
  },
  {
    id: "retail",
    name: "Retail & Multi-Branch POS",
    icon: Boxes,
    desc: "High-speed offline-first billing terminals, live barcode scanning, multi-warehouse inventory synchronization, and GST tax invoicing.",
    flagship: "FlowPulse Multi-Outlet POS",
    link: "/products",
    badge: "RETAIL & COMMERCE",
    solutions: [
      "Sub-second local SQLite offline billing",
      "Automated stock level reordering triggers",
      "Thermal ESC/POS receipt & barcode printing",
      "Multi-store consolidated profit & sales ledger"
    ]
  },
  {
    id: "finance",
    name: "Finance, Billing & Ledgers",
    icon: CreditCard,
    desc: "Multi-tenant recurring subscription metering, automated tax invoices, reconciliation engines, and audited ledger accounting.",
    flagship: "DevSamp Ledger & Billing Core",
    link: "/platform/billing",
    badge: "FINANCIAL CORE",
    solutions: [
      "Automated CGST, SGST & IGST tax calculation",
      "Recurring Stripe, Razorpay & UPI mandates",
      "Real-time payment gateway webhook reconciliation",
      "Immutable double-entry cryptographic ledger"
    ]
  },
  {
    id: "supply-chain",
    name: "Logistics & Supply Chain",
    icon: Truck,
    desc: "Warehouse distribution, purchase order management, supplier ledger tracking, and real-time transit dispatch updates.",
    flagship: "SupplySync ERP Hub",
    link: "/products",
    badge: "SUPPLY CHAIN",
    solutions: [
      "Supplier quotes & Purchase Order lifecycle",
      "Multi-bin warehouse stock transfer tracking",
      "Batch tracking with automated scrap disposal alerts",
      "Driver dispatch & delivery manifest automation"
    ]
  },
  {
    id: "dev-tools",
    name: "Developer Infrastructure & Gateways",
    icon: Zap,
    desc: "Single Sign-On (SSO), rate-limited REST gateways, Redis event streams, and client SDKs for enterprise builders.",
    flagship: "DevSamp Platform Core & SDKs",
    link: "/developers",
    badge: "DEVELOPER ENGINES",
    solutions: [
      "OpenAPI 3.0 documented REST endpoints",
      "Multi-tenant logical database isolation",
      "Distributed token bucket rate limiters",
      "Client SDKs in Node.js, Python, React & Go"
    ]
  },
  {
    id: "ai",
    name: "Applied AI & Intelligent Agents",
    icon: Brain,
    desc: "Autonomous LLM agents, semantic patient records search, automated customer routing, and predictive clinical anomaly detection.",
    flagship: "DevSamp Neural Mesh",
    link: "/services/ai-solutions",
    badge: "INTELLIGENCE",
    solutions: [
      "Custom vector database indexing & RAG",
      "Hands-free bedside speech-to-text clinical notes",
      "Predictive laboratory anomaly flagging",
      "Intelligent multi-channel ticket dispatch bots"
    ]
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
      title="Ecosystem Product Categories & Taxonomy"
      subtitle="Explore our proprietary vertical SaaS platforms and enterprise tools categorized by specialized domain architecture."
      primaryAction={{ label: "View All Products", href: "/products" }}
      secondaryAction={{ label: "Compare Platforms", href: "/products/compare" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="text-[9px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {cat.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Key Capabilities:
                  </p>
                  {cat.solutions.map((sol, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{sol}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={cat.link}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group/link"
                >
                  <span>Explore {cat.flagship.split(" ")[0]}</span>
                  <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </EcosystemPageShell>
  );
}
