import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { UserPlus, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Create DevSamp Account | Unified Identity",
  description: "Create your central DevSamp account to access products, customer portals, and developer sandboxes.",
};

export default function SignUpPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Sign Up", href: "/signup" }]}
      badge="CENTRAL IDENTITY"
      title="Create Your DevSamp Account"
      subtitle="One unified account grants access to MedERP Pro, customer portals, billing dashboards, and developer API credentials."
      primaryAction={{ label: "Already have an account? Sign In", href: "/login" }}
    >
      <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mx-auto shadow-md">
            DS
          </div>
          <h2 className="text-xl font-bold text-slate-900 pt-2">Initialize DevSamp Identity</h2>
          <p className="text-xs text-slate-500">Enter your business information to register</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Organization / Business Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Apex Health Clinic"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Work Email Address *</label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
            <input
              type="password"
              required
              placeholder="Minimum 8 characters"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-500 outline-none"
            />
          </div>

          <button
            type="button"
            className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus size={14} />
            <span>Create Organization Account</span>
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-bold hover:underline">
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
