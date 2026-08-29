import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Building2, Users, Target, Compass, ShieldCheck, ArrowRight, Briefcase, Sparkles, Heart } from "lucide-react";

export const metadata = {
  title: "Company Overview & Strategic Hub | DevSamp",
  description: "DevSamp is an engineering-first software company powering modern enterprises with scalable software products, cloud SaaS platforms, and bespoke technology solutions.",
};

const HUBS = [
  {
    name: "Our Story & Foundations",
    icon: Building2,
    href: "/about",
    desc: "Founded with a vision to build durable, zero-debt software platforms that outlast rapid technology churn.",
    badge: "FOUNDATIONS"
  },
  {
    name: "Vision 2035 Blueprint",
    icon: Compass,
    href: "/vision",
    desc: "Our 10–15 year foundational roadmap to scale DevSamp into a global software and cloud SaaS ecosystem.",
    badge: "2035 ROADMAP"
  },
  {
    name: "Our Mission & Standards",
    icon: Target,
    href: "/mission",
    desc: "Our operational purpose: delivering software products with uncompromising quality, sub-second speed, and high reliability.",
    badge: "PURPOSE"
  },
  {
    name: "Why High-Growth Teams Choose Us",
    icon: ShieldCheck,
    href: "/why-devsamp",
    desc: "100% in-house craft, zero junior hand-offs, proprietary IP ownership, and direct interface with senior architects.",
    badge: "VALUE MATRIX"
  },
  {
    name: "Engineering Culture & Craft",
    icon: Heart,
    href: "/culture",
    desc: "Extreme craftsmanship, relentless optimization for latency, autonomous pods, and long-term durability.",
    badge: "CULTURE"
  },
  {
    name: "Careers & Pod Hiring",
    icon: Briefcase,
    href: "/careers",
    desc: "Join our elite engineering pods building next-generation clinical ERPs, offline POS engines, and cloud platforms.",
    badge: "HIRING"
  }
];

export default function CompanyPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Company", href: "/company" }]}
      badge="ABOUT DEVSAMP"
      title="Architecting the Future of Software"
      subtitle="DevSamp is an engineering-first technology company founded on the principles of extreme craftsmanship, zero technical debt, and long-term ecosystem reliability."
      primaryAction={{ label: "Explore Vision 2035", href: "/vision" }}
      secondaryAction={{ label: "About DevSamp", href: "/about" }}
      relatedSection={{
        badge: "CULTURE",
        title: "How DevSamp Engineers Build Software",
        description: "Explore our principles of craftsmanship, autonomous pods, and zero-debt architectures.",
        href: "/culture",
        actionLabel: "Read Culture"
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {HUBS.map((hub, idx) => {
          const Icon = hub.icon;
          return (
            <Link
              key={idx}
              href={hub.href}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="text-[9px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {hub.badge}
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {hub.name}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {hub.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Explore {hub.name.split(" ")[0]}</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </EcosystemPageShell>
  );
}
