import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Building2, Users, Target, Compass, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Company Overview | DevSamp",
  description: "DevSamp is a software engineering company powering modern enterprises with scalable software products, cloud SaaS platforms, and bespoke technology solutions.",
};

export default function CompanyPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Company", href: "/company" }]}
      badge="ABOUT DEVSAMP"
      title="Architecting the Future of Software"
      subtitle="DevSamp is an engineering-first software company founded on the principles of extreme craftsmanship, zero technical debt, and long-term ecosystem reliability."
      primaryAction={{ label: "Explore Vision 2035", href: "/vision" }}
      secondaryAction={{ label: "Meet Leadership", href: "/about#leadership" }}
      relatedSection={{
        badge: "CULTURE",
        title: "How DevSamp Engineers Build Software",
        description: "Explore our principles of craftsmanship, autonomous pods, and zero-debt architectures.",
        href: "/culture",
        actionLabel: "Read Culture"
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        <Link
          href="/about"
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all space-y-3 group"
        >
          <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700 w-fit">
            <Building2 size={20} />
          </div>
          <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Our Story & Craft
          </h2>
          <p className="text-xs text-slate-600">
            Founded with a vision to build software platforms that outlast rapid technology churn.
          </p>
        </Link>

        <Link
          href="/vision"
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all space-y-3 group"
        >
          <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700 w-fit">
            <Compass size={20} />
          </div>
          <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Vision 2035 Roadmap
          </h2>
          <p className="text-xs text-slate-600">
            Our 10–15 year blueprint to evolve DevSamp into a global software + SaaS ecosystem.
          </p>
        </Link>

        <Link
          href="/careers"
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all space-y-3 group"
        >
          <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700 w-fit">
            <Users size={20} />
          </div>
          <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Careers & Pod Hiring
          </h2>
          <p className="text-xs text-slate-600">
            Join autonomous engineering squads building mission-critical platforms.
          </p>
        </Link>
      </div>
    </EcosystemPageShell>
  );
}
