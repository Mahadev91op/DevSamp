import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import {
  Cpu,
  ShieldCheck,
  Building2,
  Lock,
  Key,
  CreditCard,
  Bell,
  BarChart3,
  Sliders,
  Workflow,
  ArrowRight,
  Sparkles
} from "lucide-react";

export const metadata = {
  title: "Platform Core Architecture | DevSamp Ecosystem",
  description: "The underlying platform architecture powering all DevSamp software: unified identity, multi-tenant isolation, billing abstraction, and event bus.",
};

const PLATFORM_COMPONENTS = [
  { id: "identity", name: "Central Identity & Auth SSO", desc: "One unified identity layer granting access across all subscribed DevSamp software.", icon: ShieldCheck, badge: "SSO" },
  { id: "tenants", name: "Organizations & Multi-Tenancy", desc: "Complete tenant isolation, custom subdomains, and organizational hierarchies.", icon: Building2, badge: "TENANTS" },
  { id: "roles", name: "RBAC & Permissions Engine", desc: "Granular role-based access control governing module visibility, actions, and audit logs.", icon: Lock, badge: "RBAC" },
  { id: "entitlements", name: "Product Entitlements", desc: "Feature flag gating, license provisioning, and automated capability unlocks.", icon: Key, badge: "ACCESS" },
  { id: "billing", name: "Subscriptions & Billing Engine", desc: "Unified billing abstraction layer decoupling payment gateways from business applications.", icon: CreditCard, badge: "BILLING" },
  { id: "analytics", name: "Ecosystem Analytics & Telemetry", desc: "Real-time usage metrics, cluster load, active user sessions, and error telemetry.", icon: BarChart3, badge: "METRICS" },
  { id: "feature-flags", name: "Feature Flags & Rollouts", desc: "Canary deployments, A/B testing, and zero-downtime feature rollouts.", icon: Sliders, badge: "FLAGS" },
  { id: "integrations-hub", name: "Integrations & Event Bus", desc: "Centralized routing mesh dispatching webhooks and bidirectional data syncs.", icon: Workflow, badge: "MESH" }
];

export default function PlatformPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Platform Core", href: "/platform" }]}
      badge="FOUNDATIONAL ARCHITECTURE"
      title="The DevSamp Platform Core"
      subtitle="The shared infrastructure layer powering MedERP Pro, FlowPulse POS, and all future software products with unified identity, multi-tenancy, and real-time event routing."
      primaryAction={{ label: "View Architecture Map", href: "/ecosystem" }}
      secondaryAction={{ label: "Developer APIs", href: "/developers" }}
      relatedSection={{
        badge: "10–15 YEAR BLUEPRINT",
        title: "Explore DevSamp Vision 2035",
        description: "Read our foundational roadmap for scaling the DevSamp software ecosystem over the next decade.",
        href: "/vision",
        actionLabel: "Read Vision 2035"
      }}
    >
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLATFORM_COMPONENTS.map((comp) => {
            const Icon = comp.icon;
            return (
              <Link
                key={comp.id}
                href={`/platform/${comp.id}`}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-2xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-700 transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-[9px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {comp.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {comp.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {comp.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Explore {comp.name.split(" ")[0]}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </EcosystemPageShell>
  );
}
