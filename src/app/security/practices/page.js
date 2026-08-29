import EcosystemPageShell from "@/components/EcosystemPageShell";
import { ShieldCheck, Lock, Server, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Security Practices & Standards | DevSamp Ecosystem",
  description: "Detailed breakdown of DevSamp security controls, encryption, infrastructure hardening, and data protection.",
};

export default function SecurityPracticesPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Security", href: "/security" },
        { label: "Security Practices", href: "/security/practices" }
      ]}
      badge="SECURITY STANDARDS"
      title="DevSamp Security Practices & Protocols"
      subtitle="Comprehensive technical overview of how our platform clusters, data pipelines, and developer environments are secured against threats."
      primaryAction={{ label: "Report Security Issue", href: "/security/responsible-disclosure" }}
      secondaryAction={{ label: "Security Center", href: "/security" }}
    >
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 max-w-4xl">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. Data Encryption & Key Management</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            All persistent storage volumes and MongoDB databases utilize AES-256 block-level encryption. Encryption keys are managed with automatic rotation policies and strict access control list (ACL) separation. All network transmissions require TLS 1.3 with HSTS enabled.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Network & Infrastructure Isolation</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Production microservices execute in private VPC subnets with ingress firewalls. Direct public SSH/database access is disabled; all administrative operations require cryptographic bastion authentication with time-limited certificates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Continuous Vulnerability Management</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every code commit triggers automated Static Application Security Testing (SAST) and software composition analysis (SCA) for dependency vulnerabilities. Weekly container vulnerability scans ensure third-party base images remain patched.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Incident Response & Disaster Recovery</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Automated hourly encrypted snapshot backups are replicated to geo-redundant storage regions. Recovery Point Objective (RPO) is strictly under 15 minutes, with a Recovery Time Objective (RTO) under 60 minutes for tier-1 clinical clusters.
          </p>
        </section>
      </div>
    </EcosystemPageShell>
  );
}
