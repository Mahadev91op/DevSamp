import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Handshake, ShieldCheck, ArrowRight, TrendingUp, Building2, Workflow } from "lucide-react";

export const metadata = {
  title: "Partners & Alliances | DevSamp Ecosystem",
  description: "Join the DevSamp Partner Network: Technology alliances, system integrators, and implementation agencies.",
};

const PARTNER_TIERS = [
  {
    title: "Technology Alliances",
    desc: "Cloud providers, payment gateways, and hardware diagnostic manufacturers integrating natively with DevSamp products.",
    badge: "TECH ALLIANCE",
    perks: ["Co-engineering support", "Pre-release API access", "Joint ecosystem marketplace listing"]
  },
  {
    title: "System Integrators & VARs",
    desc: "Enterprise IT consultants and medical technology dealers deploying and customizing MedERP Pro and FlowPulse POS.",
    badge: "INTEGRATION",
    perks: ["Up to 35% recurring revenue share", "Dedicated L3 escalation engineer", "White-glove onboarding kit"]
  },
  {
    title: "Referral & Affiliate Network",
    desc: "Consultants, domain advisors, and professionals recommending DevSamp software to hospitals and business owners.",
    badge: "AFFILIATE",
    perks: ["20% first-year commission", "Instant affiliate tracking dashboard", "Marketing collateral & sales decks"]
  }
];

export default function PartnersPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Partners", href: "/partners" }]}
      badge="ECOSYSTEM ALLIANCES"
      title="Scale Together in the DevSamp Partner Network"
      subtitle="Grow your business by integrating, distributing, or recommending proprietary DevSamp software platforms."
      primaryAction={{ label: "Join Partner Program", href: "mailto:devsamp1st@gmail.com?subject=Partner%20Program%20Inquiry%20-%20DevSamp" }}
      secondaryAction={{ label: "Partner Portal", href: "/partners/portal" }}
      relatedSection={{
        badge: "PARTNER CONSOLE",
        title: "Access the DevSamp Partner Portal",
        description: "Registered partners can log in to track referrals, co-marketing collateral, and lead conversions.",
        href: "/partners/portal",
        actionLabel: "Open Portal"
      }}
    >
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNER_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                  {tier.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{tier.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{tier.desc}</p>
                <div className="pt-2 space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-800">Partner Perks:</p>
                  {tier.perks.map((p, pIdx) => (
                    <div key={pIdx} className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href="mailto:devsamp1st@gmail.com?subject=Partner%20Inquiry%20-%20DevSamp"
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Apply for Alliance</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EcosystemPageShell>
  );
}
