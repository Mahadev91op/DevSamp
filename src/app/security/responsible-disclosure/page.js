import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Bug, ShieldCheck, Mail, Lock, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Responsible Disclosure | DevSamp Ecosystem",
  description: "DevSamp security vulnerability reporting policy, PGP keys, and bug bounty guidelines.",
};

export default function ResponsibleDisclosurePage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Security", href: "/security" },
        { label: "Responsible Disclosure", href: "/security/responsible-disclosure" }
      ]}
      badge="VULNERABILITY REPORTING"
      title="Responsible Security Disclosure Policy"
      subtitle="We deeply appreciate security researchers and ethical hackers who help us maintain the integrity and privacy of the DevSamp software ecosystem."
      primaryAction={{ label: "Submit Security Finding", href: "mailto:devsamp1st@gmail.com?subject=Security%20Vulnerability%20Report" }}
      secondaryAction={{ label: "Security Overview", href: "/security" }}
    >
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 max-w-4xl">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. Safe Harbor Commitment</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            If you conduct vulnerability research in good faith in accordance with this policy, we will not initiate legal action against you. We consider your research to be authorized and helpful to the ecosystem.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Reporting Guidelines</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Please report security vulnerabilities directly to our security pod at <span className="font-mono text-indigo-600 font-bold">devsamp1st@gmail.com</span> with:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1.5">
            <li>Step-by-step reproduction instructions and Proof of Concept (PoC).</li>
            <li>Affected domain, endpoint, API version, or parameter.</li>
            <li>Potential impact assessment (e.g. IDOR, privilege escalation, injection).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Out of Scope</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Denial of Service (DoS/DDoS) attacks, social engineering of DevSamp staff, and automated spamming of public forms are strictly prohibited and outside our safe harbor scope.
          </p>
        </section>

        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="text-xs text-indigo-900">
            <p className="font-bold">Fast Response Guarantee</p>
            <p className="mt-0.5">Our senior security architects acknowledge incoming vulnerability reports within 24 hours.</p>
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
