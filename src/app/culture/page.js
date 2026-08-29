import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Heart, Zap, ShieldCheck, CheckCircle2, Code2, Users, ArrowRight, Sparkles, Terminal } from "lucide-react";

export const metadata = {
  title: "Engineering Culture & Craft | DevSamp",
  description: "Our core ethos: extreme craftsmanship, zero technical debt, autonomous pods, millisecond latency, and 10–15 year software foundations.",
};

const PRINCIPLES = [
  {
    number: "01",
    title: "Relentless Software Craftsmanship",
    desc: "We write code that is clean, readable, and self-documenting. We do not tolerate quick hacks or messy prototypes disguised as production systems."
  },
  {
    number: "02",
    title: "Zero Compromise on Latency",
    desc: "Every interaction, query, and API call is benchmarked. We measure performance in milliseconds and optimize for 60fps rendering across all viewports."
  },
  {
    number: "03",
    title: "Complete Pod Autonomy & Ownership",
    desc: "Engineers have full architectural freedom and responsibility for their systems from design and schema modeling to cloud deployment."
  },
  {
    number: "04",
    title: "Building for 10–15 Year Longevity",
    desc: "We do not chase transient tech fads. We invest in stable, durable foundations that compound value over decades for our customers."
  },
  {
    number: "05",
    title: "In-House Craft & Zero Junior Hand-offs",
    desc: "100% of our code is engineered in-house. Clients interface directly with senior architects who write and review every commit."
  },
  {
    number: "06",
    title: "Continuous Weekly Demos & Transparency",
    desc: "We believe working software is the only true measure of progress. We deploy working feature demos every single week."
  }
];

const RITUALS = [
  { title: "Weekly Architecture Demos", desc: "Every Friday, pods present working staging deployments and benchmark numbers to the entire company." },
  { title: "Rigorous Peer Code Reviews", desc: "No code merges to main without strict architectural review, automated tests, and performance sign-off." },
  { title: "Async-First Deep Work", desc: "We protect developer focus by minimizing meetings and emphasizing high-clarity written documentation." }
];

export default function CulturePage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Culture", href: "/culture" }]}
      badge="ENGINEERING ETHOS"
      title="How We Build at DevSamp"
      subtitle="Our cultural operating system is simple: hire extraordinary engineers, give them immense trust, and focus obsessively on product craft."
      primaryAction={{ label: "View Open Roles", href: "/careers" }}
      secondaryAction={{ label: "About DevSamp", href: "/about" }}
    >
      <div className="space-y-12 max-w-5xl">
        
        {/* Core Principles Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Our 6 Core Engineering Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRINCIPLES.map((pr, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-mono font-bold text-xs flex items-center justify-center border border-blue-100">
                    {pr.number}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{pr.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{pr.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pod Rituals */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Daily Operating Rituals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RITUALS.map((rit, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-blue-700">{rit.title}</span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{rit.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </EcosystemPageShell>
  );
}
