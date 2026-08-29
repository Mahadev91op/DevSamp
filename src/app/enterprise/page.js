import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Building2, ShieldCheck, Cpu, Lock, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Enterprise Solutions & Dedicated Deployments | DevSamp",
  description: "Single-tenant isolated clusters, custom air-gapped on-premise installations, and custom enterprise SLAs.",
};

const ENTERPRISE_FEATURES = [
  { title: "Single-Tenant Cloud Isolation", desc: "Dedicated virtual private cloud (VPC) with isolated databases, encryption keys, and zero cross-tenant resource sharing." },
  { title: "On-Premise & Air-Gapped Installs", desc: "Deploy directly on your hospital or enterprise server racks with zero external internet dependencies." },
  { title: "Custom SLA & 15-Minute Response", desc: "Guaranteed 99.99% uptime with direct round-the-clock access to senior L3 infrastructure architects." },
  { title: "Custom Integration Pods", desc: "Dedicated DevSamp engineers to build bespoke connectors for your legacy ERPs, SAP, and proprietary hardware." }
];

export default function EnterprisePage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Enterprise", href: "/enterprise" }]}
      badge="SINGLE-TENANT ARCHITECTURE"
      title="Enterprise Deployments & Custom Solutions"
      subtitle="For hospital networks, high-volume retail chains, and institutions requiring dedicated infrastructure, bespoke integrations, and stringent compliance."
      primaryAction={{ label: "Contact Enterprise Team", href: "/contact" }}
      secondaryAction={{ label: "Security Center", href: "/security" }}
    >
      <div className="space-y-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ENTERPRISE_FEATURES.map((feat, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                <h2 className="text-base font-bold text-slate-900">{feat.title}</h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{feat.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white space-y-4 shadow-xl border border-indigo-500/30">
          <h3 className="text-lg font-bold">Schedule an Enterprise Architecture Review</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Our Principal Architects will conduct a technical assessment of your current infrastructure, compliance requirements, and data volume to design an optimal deployment plan.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all cursor-pointer">
                Request Architecture Consultation
              </button>
            </Link>
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
