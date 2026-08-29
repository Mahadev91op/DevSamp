import EcosystemPageShell from "@/components/EcosystemPageShell";
import { TrendingUp, ShieldCheck, Building2, Globe, FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Investor Relations & Corporate Information | DevSamp",
  description: "DevSamp financial governance, operating metrics, growth trajectory, and corporate overview.",
};

const HIGHLIGHTS = [
  { label: "Revenue Growth", value: "3.2x YoY", sub: "Profitable, cash-flow positive organic growth" },
  { label: "Core Products", value: "MedERP Pro", sub: "Flagship healthcare ERP & POS ecosystems" },
  { label: "Target Market", value: "$42B TAM", sub: "Indian & global vertical SaaS modernization" },
  { label: "Capital Efficiency", value: "Zero Debt", sub: "100% in-house software IP ownership" }
];

export default function InvestorsPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Investors", href: "/investors" }]}
      badge="CORPORATE GOVERNANCE"
      title="DevSamp Investor Relations & Corporate Information"
      subtitle="We are building a 10–15 year software ecosystem foundation with deep vertical products, proprietary architectures, and sustainable compounding cash flow."
      primaryAction={{ label: "Request Investor Briefing", href: "mailto:devsamp1st@gmail.com?subject=Investor%20Briefing%20Inquiry" }}
      secondaryAction={{ label: "Vision 2035 Blueprint", href: "/vision" }}
    >
      <div className="space-y-8 max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((h, idx) => (
            <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">{h.label}</span>
              <p className="text-xl font-black text-blue-600">{h.value}</p>
              <p className="text-[11px] text-slate-500 font-normal">{h.sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Ecosystem Capital Allocation & Philosophy</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            DevSamp operates on high engineering rigor. Rather than burning capital on speculative acquisition, we invest directly in software depth—building proprietary vertical ERPs, diagnostic bridges, and high-margin engineering pods that deliver long-term customer retention.
          </p>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
