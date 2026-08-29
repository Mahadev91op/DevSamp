import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Scale, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Product & Plan Comparison Matrix | DevSamp Ecosystem",
  description: "Compare DevSamp software platform capabilities, deployment models, and licensing tiers side-by-side.",
};

const COMPARISON_ROWS = [
  { feature: "Cloud Multi-Tenant Hosting", starter: true, pro: true, enterprise: true },
  { feature: "Offline-First Sync Engine", starter: false, pro: true, enterprise: true },
  { feature: "Automated Laboratory & Billing Sync", starter: false, pro: true, enterprise: true },
  { feature: "Custom Subdomain & White-Labeling", starter: false, pro: false, enterprise: true },
  { feature: "Dedicated Senior Engineering Pod SLA", starter: false, pro: false, enterprise: true },
  { feature: "REST APIs & Webhooks Access", starter: true, pro: true, enterprise: true },
  { feature: "Air-Gapped On-Premise Deployment", starter: false, pro: false, enterprise: true }
];

export default function ProductComparisonPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: "Comparison Matrix", href: "/products/compare" }
      ]}
      badge="PLATFORM MATRIX"
      title="Compare DevSamp Platform Tiers"
      subtitle="Find the optimal deployment architecture and license tier for your clinical network, retail chain, or high-scale enterprise."
      primaryAction={{ label: "Book Discovery Call", href: "/book-demo" }}
      secondaryAction={{ label: "View Commercial Pricing", href: "/pricing" }}
    >
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden max-w-5xl">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Feature & Architecture Comparison</h2>
          <span className="text-xs text-slate-500">All tiers include 99.9% uptime guarantee</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/50">
                <th className="p-4 font-bold text-slate-900 w-1/2">Capabilities & SLAs</th>
                <th className="p-4 font-bold text-slate-900 text-center">Starter Cloud</th>
                <th className="p-4 font-bold text-indigo-700 text-center bg-indigo-50/50">Professional SaaS</th>
                <th className="p-4 font-bold text-slate-900 text-center">Enterprise Dedicated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">{row.feature}</td>
                  <td className="p-4 text-center">
                    {row.starter ? (
                      <CheckCircle2 size={16} className="text-emerald-500 mx-auto" />
                    ) : (
                      <span className="text-slate-300 font-bold">—</span>
                    )}
                  </td>
                  <td className="p-4 text-center bg-indigo-50/20">
                    {row.pro ? (
                      <CheckCircle2 size={16} className="text-indigo-600 mx-auto" />
                    ) : (
                      <span className="text-slate-300 font-bold">—</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {row.enterprise ? (
                      <CheckCircle2 size={16} className="text-emerald-500 mx-auto" />
                    ) : (
                      <span className="text-slate-300 font-bold">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
