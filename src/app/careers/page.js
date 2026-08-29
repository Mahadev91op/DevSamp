import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Briefcase, Users, Sparkles, ArrowRight, ShieldCheck, Heart, Zap, Terminal } from "lucide-react";

export const metadata = {
  title: "Careers & Engineering Pods | DevSamp Ecosystem",
  description: "Join high-performance engineering pods at DevSamp. Build proprietary software products and mission-critical SaaS platforms.",
};

const OPEN_ROLES = [
  {
    title: "Senior Fullstack Architect (Next.js / Node.js)",
    pod: "Core Platform Pod",
    type: "Full-time • Remote / Hybrid",
    experience: "3+ Years",
    description: "Lead multi-tenant SaaS architecture, server actions, database sharding, and high-performance frontend interfaces."
  },
  {
    title: "Systems Engineer (Cloud & Kubernetes Mesh)",
    pod: "DevOps & Cloud Pod",
    type: "Full-time • Remote",
    experience: "2+ Years",
    description: "Design auto-scaling Docker/Kubernetes container orchestration, zero-downtime CI/CD pipelines, and multi-region clusters."
  },
  {
    title: "UI/UX & Design Systems Engineer",
    pod: "Product Experience Pod",
    type: "Full-time • Remote",
    experience: "2+ Years",
    description: "Craft pixel-perfect micro-interactions, responsive design systems, and accessible 60fps web interfaces."
  },
  {
    title: "AI Integration & Workflow Engineer",
    pod: "Intelligence Pod",
    type: "Full-time • Remote",
    experience: "1+ Years",
    description: "Implement LLM pipelines, autonomous agent workflows, semantic indexing, and fine-tuned embeddings."
  }
];

export default function CareersPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Careers", href: "/careers" }]}
      badge="ENGINEERING POD CULTURE"
      title="Build Software That Defines the Next Decade"
      subtitle="We do not build generic agency websites. We architect proprietary vertical SaaS platforms, hospital clinical suites, and high-concurrency cloud mesh systems."
      primaryAction={{ label: "View Open Roles", href: "#roles" }}
      secondaryAction={{ label: "Apprenticeship Program", href: "/careers/internships" }}
      relatedSection={{
        badge: "TALENT INCUBATOR",
        title: "DevSamp Apprenticeship & Internship Program",
        description: "Are you a student or early-career developer? Join our intensive hands-on engineering incubator.",
        href: "/careers/internships",
        actionLabel: "Explore Apprenticeships"
      }}
    >
      <div className="space-y-12">
        {/* Ethos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Zap size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900">Extreme Craftsmanship</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              We care deeply about clean code, 60fps animations, zero runtime errors, and rock-solid architectural foundations.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900">Autonomous Small Pods</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              No bloated bureaucracy. You work in tight, high-speed pods of 2–4 senior engineers with direct ownership over your deliverables.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero Technical Debt</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              We refactor constantly, prioritize type safety, adhere to strict linting rules, and design modular systems that last 10+ years.
            </p>
          </div>
        </div>

        {/* Open Positions */}
        <div id="roles" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-950">Open Engineering Pod Positions</h2>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              4 Active Openings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPEN_ROLES.map((role, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                      {role.pod}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{role.type}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{role.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{role.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">Exp: {role.experience}</span>
                  <a
                    href="mailto:devsamp1st@gmail.com?subject=Engineering%20Application%20-%20DevSamp"
                    className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>Apply to Pod</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
