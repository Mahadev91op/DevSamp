import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { ShieldCheck, Lock, Key, Server, Eye, CheckCircle2, AlertTriangle, FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Security Center | DevSamp Ecosystem",
  description: "Enterprise security architecture, encryption standards, SOC-2 readiness, and responsible disclosure.",
};

export default function SecurityPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Security", href: "/security" }]}
      badge="ENTERPRISE SECURITY CENTER"
      title="Security, Privacy & Trust Architecture"
      subtitle="Security is engineered directly into our foundation—not added as an afterthought. Learn how we safeguard healthcare data, enterprise transactions, and platform infrastructure."
      primaryAction={{ label: "Security Practices", href: "/security/practices" }}
      secondaryAction={{ label: "Report Vulnerability", href: "/security/responsible-disclosure" }}
      relatedSection={{
        badge: "LEGAL & COMPLIANCE",
        title: "Data Processing Agreement & Privacy",
        description: "Review our GDPR, HIPAA, and DPDP compliant data agreements.",
        href: "/legal/dpa",
        actionLabel: "View DPA"
      }}
    >
      <div className="space-y-12">
        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Lock size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900">End-to-End Encryption</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              AES-256 encryption at rest for all database clusters, backups, and file storage. TLS 1.3 encryption in transit for all API and web traffic.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Server size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900">Multi-Tenant Isolation</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Strict logical and physical database tenant isolation prevents cross-tenant data leakage. Dedicated schema per organization tier.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Key size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900">MFA & Granular RBAC</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Two-factor authentication (TOTP/SMS), role-based permissions, automated session timeouts, and immutable audit logs.
            </p>
          </div>
        </div>

        {/* Security Deep Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/security/practices"
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">STANDARDS</span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Security Practices & Infrastructure
              </h3>
              <p className="text-xs text-slate-500">Continuous vulnerability scans, patch cycles, and container isolation.</p>
            </div>
            <ArrowRight size={18} className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/security/responsible-disclosure"
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600">BUG BOUNTY</span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                Responsible Disclosure Policy
              </h3>
              <p className="text-xs text-slate-500">Security researchers reporting protocol, PGP keys, and reward criteria.</p>
            </div>
            <ArrowRight size={18} className="text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
