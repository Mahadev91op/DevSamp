import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Handshake, Lock, ArrowRight, ShieldCheck, LayoutDashboard } from "lucide-react";

export const metadata = {
  title: "Partner Portal | DevSamp Ecosystem",
  description: "Dedicated workspace for certified DevSamp technology and referral partners.",
};

export default function PartnerPortalPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Partners", href: "/partners" },
        { label: "Partner Portal", href: "/partners/portal" }
      ]}
      badge="PARTNER WORKSPACE"
      title="Certified Partner Portal"
      subtitle="Track your deal registrations, co-selling leads, commission disbursements, and technical enablement materials."
      primaryAction={{ label: "Register New Deal", href: "#register" }}
      secondaryAction={{ label: "Partner Program Details", href: "/partners" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Partner Deal Registration</h2>
              <p className="text-xs text-slate-500">Register hospital or enterprise leads to lock commissions for 90 days.</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              Active Tier: Tier-1 VAR
            </span>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Partner Organization ID *</label>
                <input
                  type="text"
                  placeholder="e.g. PTR-88219"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client Hospital / Business Name *</label>
                <input
                  type="text"
                  placeholder="e.g. CareMax Hospital Network"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Product Suite</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-indigo-500 outline-none bg-white">
                  <option>MedERP Pro Clinical Suite</option>
                  <option>FlowPulse Retail POS</option>
                  <option>Dedicated Custom Pod</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Bed / Branch Count</label>
                <input
                  type="number"
                  placeholder="e.g. 150 beds or 12 branches"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck size={14} />
              <span>Register & Lock Deal</span>
            </button>
          </form>
        </div>

        {/* Right Partner Collateral Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3">
            <h3 className="text-sm font-bold">Partner Enablement Kit</h3>
            <p className="text-xs text-slate-300">Download official pitch decks, comparison matrices, and ROI calculators.</p>
            <div className="pt-2 space-y-2">
              <a
                href="/brand-assets"
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 font-bold flex items-center justify-between transition-colors"
              >
                <span>Download Media Kit</span>
                <span>↓</span>
              </a>
              <a
                href="/products/compare"
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 font-bold flex items-center justify-between transition-colors"
              >
                <span>Platform Comparison Sheet</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
