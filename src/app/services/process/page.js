import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import {
  Workflow,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Terminal,
  ShieldCheck,
  Zap,
  Layers,
  FileCode,
  Rocket,
  LifeBuoy
} from "lucide-react";

export const metadata = {
  title: "Engineering Delivery Lifecycle (6-Stage) | DevSamp Services",
  description: "DevSamp's systematic 6-stage software engineering process: Discovery, UI/UX Design Tokens, Fullstack Pod Sprints, QA Hardening, Zero-Downtime Launch, and 24/7 SLA Support.",
};

const STAGES = [
  {
    step: "01",
    name: "Architectural Discovery & Domain Modeling",
    duration: "Week 1",
    desc: "We analyze your existing workflows, database schemas, bottlenecks, and compliance constraints. We deliver a comprehensive System Architecture Document (SAD) with zero ambiguity.",
    deliverables: ["Entity Relationship Diagram (ERD)", "API Spec & Webhook Schema (OpenAPI)", "Threat Model & Compliance Checklist", "Sprint Roadmap & Milestone Gantt"]
  },
  {
    step: "02",
    name: "High-Fidelity UI/UX & Design Systems",
    duration: "Week 2",
    desc: "Crafting 60fps design prototypes, design tokens, and atomic components in Figma. Every interaction, modal, and state is modeled and approved before a single line of backend code is committed.",
    deliverables: ["Figma Design Tokens & Style Guide", "High-Fidelity Interactive Clickable Prototype", "Mobile & Tablet Responsive Layouts", "Micro-Interactions & Animation Specs"]
  },
  {
    step: "03",
    name: "Fullstack Engineering & Pod Sprints",
    duration: "Weeks 3–5",
    desc: "Senior engineering pods build with Next.js 15, Node.js, and MongoDB. We enforce strict TypeScript typing, atomic CSS, and modular micro-gateways with continuous weekly demos.",
    deliverables: ["Next.js 15 Server Action Frontend", "Multi-Tenant Isolated Database Schemas", "Role-Based Access Control (RBAC) Layer", "Automated Weekly Demo Deployments"]
  },
  {
    step: "04",
    name: "Automated QA & Security Hardening",
    duration: "Week 5",
    desc: "Rigorous end-to-end integration tests, load testing up to 10,000 req/sec, penetration testing, and zero-leakage RBAC permission validations.",
    deliverables: ["Cypress / Playwright E2E Test Suite", "Load & Concurrency Stress Test Report", "Static Security Code Analysis (SAST)", "OWASP Top 10 Penetration Audit"]
  },
  {
    step: "05",
    name: "Zero-Downtime Staging & Production Deployment",
    duration: "Week 6",
    desc: "Automated CI/CD container clusters on geo-redundant clouds with SSL certificates, DNS edge routing, automated backup scheduling, and database indexing.",
    deliverables: ["Docker & Kubernetes CI/CD GitHub Actions", "Geo-Redundant Database Cluster Setup", "Automated Hourly Encrypted Backups", "Zero-Downtime Blue-Green Deployment"]
  },
  {
    step: "06",
    name: "SLA-Backed Retainer & Continuous Evolution",
    duration: "Ongoing",
    desc: "Dedicated L3 architects on retainer, 15-minute emergency response SLAs, proactive security patches, and quarterly feature upgrades.",
    deliverables: ["Guaranteed 15-Minute Response SLA", "Weekly Dependency & Security Patching", "Quarterly Framework & Performance Audits", "Dedicated Technical Account Lead"]
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
      title="The 6-Stage DevSamp Engineering Lifecycle"
      subtitle="How our senior engineering pods take complex digital platforms from napkin sketches to mission-critical production scale."
      primaryAction={{ label: "Initialize Pod Sprint", href: "/contact" }}
      secondaryAction={{ label: "Service Pricing", href: "/services/pricing" }}
    >
      <div className="space-y-6 max-w-4xl">
        {STAGES.map((st, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-6 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 font-mono font-black text-xl flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {st.step}
            </div>

            <div className="space-y-3 flex-1 min-w-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {st.name}
                </h2>
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Timeline: {st.duration}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {st.desc}
              </p>

              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Key Artifacts Delivered:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {st.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      <span className="truncate">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
