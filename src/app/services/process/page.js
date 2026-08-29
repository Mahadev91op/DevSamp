import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Workflow, CheckCircle2, ArrowRight, Sparkles, Terminal, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "Engineering Delivery Process (6-Stage) | DevSamp Services",
  description: "DevSamp's systematic 6-stage software engineering lifecycle: Discovery, Architecture, Build, Testing, Launch, and SLA Support.",
};

const STAGES = [
  {
    step: "01",
    name: "Architectural Discovery & Domain Modeling",
    desc: "We analyze your existing workflows, database schemas, bottlenecks, and security compliance constraints. We deliver a comprehensive System Architecture Document (SAD) with zero ambiguity."
  },
  {
    step: "02",
    name: "High-Fidelity UI/UX & Design Systems",
    desc: "Crafting 60fps design prototypes, design tokens, and atomic components in Figma. Every interaction, modal, and state is modeled and approved before a single line of backend code is committed."
  },
  {
    step: "03",
    name: "Fullstack Engineering & Pod Sprints",
    desc: "Senior engineering pods build with Next.js 15, Node.js, and MongoDB. We enforce strict TypeScript typing, atomic CSS, and modular micro-gateways with continuous weekly demos."
  },
  {
    step: "04",
    name: "Automated QA & Security Hardening",
    desc: "Rigorous end-to-end integration tests, load testing up to 10,000 req/sec, penetration testing, and zero-leakage RBAC permission validations."
  },
  {
    step: "05",
    name: "Zero-Downtime Staging & Production Deployment",
    desc: "Automated CI/CD container clusters on geo-redundant clouds with SSL certificates, DNS edge routing, automated backup scheduling, and database indexing."
  },
  {
    step: "06",
    name: "SLA-Backed Retainer & Continuous Evolution",
    desc: "Dedicated L3 architects on retainer, 15-minute emergency response SLAs, proactive security patches, and quarterly feature upgrades."
  }
];

export default function ServiceProcessPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Engineering Process", href: "/services/process" }
      ]}
      badge="DELIVERY LIFECYCLE"
      title="The 6-Stage DevSamp Engineering Process"
      subtitle="How our senior engineering pods take complex digital platforms from napkin sketches to mission-critical production scale."
      primaryAction={{ label: "Initialize Pod Sprint", href: "/contact" }}
      secondaryAction={{ label: "Service Pricing", href: "/services/pricing" }}
    >
      <div className="space-y-6 max-w-4xl">
        {STAGES.map((st, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
              {st.step}
            </div>

            <div className="space-y-2 flex-1">
              <h2 className="text-lg font-bold text-slate-900">{st.name}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{st.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
