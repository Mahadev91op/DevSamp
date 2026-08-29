import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { CreditCard, CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "Service Packages & Engineering Retainers | DevSamp Services",
  description: "Transparent engineering pod retainer packages, fixed-scope sprints, and custom quotation estimates.",
};

const PACKAGES = [
  {
    name: "Rapid MVP Sprint",
    timeline: "3–4 Weeks Delivery",
    desc: "Fast-track product validation: High-fidelity Figma UI/UX, Next.js frontend, and MongoDB core auth.",
    price: "₹75,000",
    features: ["Dedicated Lead Fullstack Architect", "Complete responsive design system", "Authentication, database & stripe billing setup", "Zero-downtime deployment to Vercel/AWS"]
  },
  {
    name: "Dedicated Engineering Pod",
    timeline: "Monthly Retainer",
    desc: "Full-scale dedicated squad (1 Senior Architect + 2 Fullstack Engineers + 1 QA) embedded directly in your roadmap.",
    price: "₹1,80,000 / month",
    popular: true,
    features: ["Full autonomy over backlog & deliverables", "Weekly demo deployments & sprint reviews", "Multi-tenant SaaS & microservice architecture", "Direct private Slack/WhatsApp communication channel"]
  },
  {
    name: "Enterprise Custom Architecture",
    timeline: "Quarterly Milestone Contract",
    desc: "Hospital ERP customizations, offline POS engines, high-throughput financial ledgers, and on-premise air-gapping.",
    price: "Custom Scope",
    features: ["Custom SLA with 15-min emergency response", "HIPAA / ISO-27001 security audits & hardening", "Hardware laboratory analyzer integrations", "Dedicated Technical Account Lead"]
  }
];

export default function ServicePricingPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Service Pricing", href: "/services/pricing" }
      ]}
      badge="TRANSPARENT POD PACKAGES"
      title="Engineering Pod Retainers & Sprint Packages"
      subtitle="Predictable pricing for dedicated senior talent. No hidden hourly surprises or junior hand-offs."
      primaryAction={{ label: "Request Custom Estimate", href: "/contact" }}
      secondaryAction={{ label: "View Process", href: "/services/process" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PACKAGES.map((pkg, idx) => (
          <div
            key={idx}
            className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
              pkg.popular
                ? "bg-white border-2 border-indigo-600 shadow-xl relative"
                : "bg-white border-slate-200 shadow-sm hover:shadow-md"
            }`}
          >
            {pkg.popular && (
              <span className="text-[9px] font-black uppercase tracking-widest text-white bg-indigo-600 px-2.5 py-0.5 rounded-full absolute top-4 right-4">
                MOST POPULAR
              </span>
            )}

            <div className="space-y-4">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">{pkg.timeline}</span>
              <h2 className="text-xl font-bold text-slate-950">{pkg.name}</h2>
              <div className="text-2xl font-black text-slate-900">{pkg.price}</div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{pkg.desc}</p>

              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">What&apos;s Included:</p>
                {pkg.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link href="/contact" className="block w-full">
                <button
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                    pkg.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                      : "bg-slate-950 hover:bg-indigo-600 text-white"
                  }`}
                >
                  <span>Book Pod Consultation</span>
                  <ArrowRight size={13} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
