import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Flag, CheckCircle2, Clock, Sparkles } from "lucide-react";

export const metadata = {
  title: "Product Roadmap | DevSamp Ecosystem",
  description: "Public feature pipeline, quarterly milestones, and upcoming capabilities across DevSamp software suites.",
};

const ROADMAP_QUARTERS = [
  {
    quarter: "Q3 2026 (Current)",
    badge: "IN PROGRESS",
    color: "emerald",
    items: [
      { title: "MedERP AI Discharge Summaries", desc: "Automated physician notes summarizer with ICD-10 multi-language translations." },
      { title: "Omni-Channel WhatsApp Patient Bot", desc: "Instant appointment booking, OPD queue tokens, and PDF lab report delivery via WhatsApp." },
      { title: "Developer Webhook Replay Console", desc: "Real-time webhook inspection, payload signing, and manual failure replay triggers." }
    ]
  },
  {
    quarter: "Q4 2026",
    badge: "SCHEDULED",
    color: "indigo",
    items: [
      { title: "FlowPulse Cloud POS Multi-Warehouse Sync", desc: "Real-time stock transfer manifests and automated inter-branch reorders." },
      { title: "Platform SSO / SAML2 Integration", desc: "Enterprise Okta, Microsoft Azure AD, and Google Workspace Single Sign-On." },
      { title: "Cross-Product Analytics Hub", desc: "Unified business intelligence dashboards combining hospital revenue and pharmacy sales." }
    ]
  },
  {
    quarter: "2027 & Beyond",
    badge: "PLANNED",
    color: "slate",
    items: [
      { title: "Autonomous Edge Diagnostics AI", desc: "On-device edge inference for X-Ray, ECG, and pathology preliminary flagging." },
      { title: "Global Multi-Currency Multi-Tenant Billing", desc: "Automated tax compliance across 40+ countries with Stripe and Adyen." }
    ]
  }
];

export default function ProductRoadmapPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: "Roadmap", href: "/products/roadmap" }
      ]}
      badge="PUBLIC FEATURE PIPELINE"
      title="DevSamp Ecosystem Product Roadmap"
      subtitle="Transparent view into our upcoming feature releases, architectural upgrades, and quarterly development priorities."
      primaryAction={{ label: "Request a Feature", href: "mailto:devsamp1st@gmail.com?subject=Feature%20Request%20-%20DevSamp" }}
      secondaryAction={{ label: "Release Changelog", href: "/products/changelog" }}
    >
      <div className="space-y-8 max-w-4xl">
        {ROADMAP_QUARTERS.map((q, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">{q.quarter}</h2>
              <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                q.color === "emerald"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-indigo-50 text-indigo-700 border-indigo-200"
              }`}>
                {q.badge}
              </span>
            </div>

            <div className="space-y-3">
              {q.items.map((item, iIdx) => (
                <div key={iIdx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
