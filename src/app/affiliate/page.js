import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { DollarSign, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Affiliate & Referral Program | DevSamp",
  description: "Earn recurring commissions by referring hospitals, retail chains, and enterprise founders to DevSamp software.",
};

export default function AffiliatePage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Affiliate Program", href: "/affiliate" }]}
      badge="REVENUE SHARE"
      title="DevSamp Partner Referral & Affiliate Program"
      subtitle="Earn up to 25% recurring commission for every hospital, diagnostic clinic, or enterprise that deploys DevSamp software through your referral."
      primaryAction={{ label: "Join Affiliate Network", href: "mailto:devsamp1st@gmail.com?subject=Affiliate%20Program%20Application" }}
      secondaryAction={{ label: "Partner Portal", href: "/partners/portal" }}
    >
      <div className="space-y-8 max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Commission Rate</span>
            <p className="text-2xl font-black text-indigo-600">20% – 30%</p>
            <p className="text-xs text-slate-500">Recurring for 12 months</p>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Cookie Window</span>
            <p className="text-2xl font-black text-indigo-600">90 Days</p>
            <p className="text-xs text-slate-500">Long attribution window</p>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Payout Schedule</span>
            <p className="text-2xl font-black text-indigo-600">Monthly</p>
            <p className="text-xs text-slate-500">Direct bank transfer</p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">How the Affiliate Program Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-indigo-700">1. Apply & Get Tracking Link</span>
              <p>Receive your custom partner referral link and marketing collateral.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-indigo-700">2. Introduce Hospitals & Clients</span>
              <p>Share DevSamp software with doctors, hospital administrators, and founders.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="font-bold text-indigo-700">3. Earn Monthly Payouts</span>
              <p>Track signups and receive automated monthly commission payouts.</p>
            </div>
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
