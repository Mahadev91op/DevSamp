import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Mail, CheckCircle2, Sparkles, Send } from "lucide-react";

export const metadata = {
  title: "Engineering Newsletter & Devlogs | DevSamp",
  description: "Subscribe to monthly engineering dispatches on SaaS architecture, performance benchmarks, and ecosystem releases.",
};

export default function NewsletterPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Newsletter", href: "/newsletter" }]}
      badge="MONTHLY DISPATCH"
      title="The DevSamp Engineering Dispatch"
      subtitle="Read by thousands of software architects, hospital IT leads, and retail operators. Curated monthly deep-dives on real-world system designs, benchmarks, and platform updates."
      primaryAction={{ label: "Read Past Devlogs", href: "/blog" }}
    >
      <div className="max-w-xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Mail size={22} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Direct to Your Inbox</h2>
          <p className="text-xs text-slate-500">Zero spam. Pure technical architecture and product insights.</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Work Email *</label>
            <input
              type="email"
              required
              placeholder="architect@organization.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-500 outline-none"
            />
          </div>

          <button
            type="button"
            className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send size={14} />
            <span>Subscribe to Engineering Dispatches</span>
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            You can unsubscribe at any time with 1-click. We respect your privacy.
          </p>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
