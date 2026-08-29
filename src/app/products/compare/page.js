import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Scale, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export const metadata = {
  title: "Product & Plan Comparison Matrix | DevSamp Ecosystem",
  description: "Compare DevSamp software platform capabilities, deployment models, hardware integrations, and licensing tiers side-by-side.",
};

const COMPARISON_CATEGORIES = [
  {
    category: "Clinical & Workflow Architecture",
    rows: [
      { feature: "OPD Triage & Patient Token Queue", starter: true, pro: true, enterprise: true },
      { feature: "IPD Bed Allocation & Ward Floor Maps", starter: false, pro: true, enterprise: true },
      { feature: "Automated Doctor E-Prescription Charting", starter: true, pro: true, enterprise: true },
      { feature: "Operation Theatre (OT) Surgeon Schedules", starter: false, pro: true, enterprise: true },
      { feature: "Discharge Checklist & E-Signed Summaries", starter: false, pro: true, enterprise: true },
    ]
  },
  {
    category: "Hardware & Diagnostic Integrations",
    rows: [
      { feature: "Thermal Receipt & Barcode ESC/POS Printers", starter: true, pro: true, enterprise: true },
      { feature: "Automated Lab Machine Bidirectional HL7 Sync", starter: false, pro: true, enterprise: true },
      { feature: "Offline-First Local SQLite Sync Engine", starter: false, pro: true, enterprise: true },
      { feature: "WhatsApp & SMS Automated Report Delivery", starter: true, pro: true, enterprise: true },
    ]
  },
  {
    category: "Infrastructure, Security & Compliance",
    rows: [
      { feature: "HIPAA & DPDP Ready Encrypted Audit Trails", starter: true, pro: true, enterprise: true },
      { feature: "Custom Subdomain & White-Label Branding", starter: false, pro: true, enterprise: true },
      { feature: "Single-Tenant VPC or Air-Gapped Deployment", starter: false, pro: false, enterprise: true },
      { feature: "REST APIs, Webhooks & Client SDKs", starter: true, pro: true, enterprise: true },
      { feature: "Dedicated Senior Engineering Pod Retainer", starter: false, pro: false, enterprise: true },
      { feature: "Guaranteed 15-Minute Emergency SLA", starter: false, pro: false, enterprise: true },
    ]
  }
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
      subtitle="Side-by-side evaluation of capabilities, hardware bridges, and infrastructure isolation across Starter, Professional Cloud, and Enterprise Dedicated tiers."
      primaryAction={{ label: "Book Discovery Call", href: "/book-demo" }}
      secondaryAction={{ label: "Commercial Pricing", href: "/pricing" }}
    >
      <div className="space-y-8 max-w-5xl">
        
        {/* Tier Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <span className="text-[10px] font-bold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">ENTRY TIER</span>
            <h3 className="text-lg font-bold text-slate-900">Starter Cloud</h3>
            <p className="text-xs text-slate-600">Ideal for single doctor clinics, outpatient dispensaries, and retail shops.</p>
            <div className="text-xl font-black text-slate-950 pt-1">₹2,999 <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
            <Link href="/book-demo" className="block w-full">
              <button className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors">
                Start Free Trial
              </button>
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-blue-50 border-2 border-blue-600 shadow-md space-y-3 relative">
            <span className="text-[9px] font-black uppercase tracking-wider text-white bg-blue-600 px-2 py-0.5 rounded-full absolute top-4 right-4">
              POPULAR
            </span>
            <span className="text-[10px] font-bold uppercase text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">GROWTH TIER</span>
            <h3 className="text-lg font-bold text-slate-900">Professional SaaS</h3>
            <p className="text-xs text-slate-600">For 20–100 bed hospitals, diagnostic centers, and multi-branch pharmacy chains.</p>
            <div className="text-xl font-black text-slate-950 pt-1">₹7,999 <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
            <Link href="/book-demo" className="block w-full">
              <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs">
                Deploy Pro Cloud
              </button>
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-md space-y-3">
            <span className="text-[10px] font-bold uppercase text-blue-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">SCALE TIER</span>
            <h3 className="text-lg font-bold text-white">Enterprise Dedicated</h3>
            <p className="text-xs text-slate-300">For multi-hospital networks requiring dedicated VPCs, custom pods, and 15-min SLAs.</p>
            <div className="text-xl font-black text-white pt-1">Custom Scope</div>
            <Link href="/contact" className="block w-full">
              <button className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-colors">
                Contact Architects
              </button>
            </Link>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Comprehensive Capability Matrix</h2>
            <span className="text-xs text-slate-500 font-medium">All tiers backed by 99.9% uptime SLA</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/60">
                  <th className="p-4 font-bold text-slate-900 w-2/5">Platform Features & SLAs</th>
                  <th className="p-4 font-bold text-slate-900 text-center w-1/5">Starter Cloud</th>
                  <th className="p-4 font-bold text-blue-700 text-center w-1/5 bg-blue-50/50">Professional SaaS</th>
                  <th className="p-4 font-bold text-slate-900 text-center w-1/5">Enterprise Dedicated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_CATEGORIES.map((cat, cIdx) => (
                  <>
                    <tr key={`cat-${cIdx}`} className="bg-slate-50/80">
                      <td colSpan={4} className="p-3.5 font-black uppercase text-[10px] tracking-wider text-slate-500">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.rows.map((row, rIdx) => (
                      <tr key={`row-${cIdx}-${rIdx}`} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-4 font-medium text-slate-800">{row.feature}</td>
                        <td className="p-4 text-center">
                          {row.starter ? (
                            <CheckCircle2 size={16} className="text-emerald-500 mx-auto" />
                          ) : (
                            <span className="text-slate-300 font-bold">—</span>
                          )}
                        </td>
                        <td className="p-4 text-center bg-blue-50/20">
                          {row.pro ? (
                            <CheckCircle2 size={16} className="text-blue-600 mx-auto" />
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
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </EcosystemPageShell>
  );
}
