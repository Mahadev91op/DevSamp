import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Award, ShieldCheck, CheckCircle2, Lock, FileCheck } from "lucide-react";

export const metadata = {
  title: "Compliance & Certifications | DevSamp Ecosystem",
  description: "Verified regulatory certifications, healthcare data residency standards, and operational audit reports.",
};

const COMPLIANCE_ITEMS = [
  { name: "HIPAA (Health Insurance Portability and Accountability Act)", status: "Ready & Compliant", desc: "Meets all administrative, physical, and technical safeguards for Protected Health Information (PHI)." },
  { name: "Indian Digital Personal Data Protection (DPDP) Act 2023", status: "Certified Compliant", desc: "Data residency in Indian data centers with explicit consent architecture and data fiduciary controls." },
  { name: "GDPR (General Data Protection Regulation)", status: "EU Standard Compliant", desc: "Full support for right to erasure, data portability exports, and standard DPA terms." },
  { name: "SOC 2 Type II Readiness", status: "Controls Implemented", desc: "Continuous monitoring of security, availability, confidentiality, and processing integrity." }
];

export default function CompliancePage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Compliance", href: "/compliance" }]}
      badge="REGULATORY GOVERNANCE"
      title="Compliance & Certifications"
      subtitle="DevSamp software is engineered to adhere to strict international healthcare, privacy, and data security mandates."
      primaryAction={{ label: "Data Processing Agreement", href: "/legal/dpa" }}
      secondaryAction={{ label: "Security Practices", href: "/security/practices" }}
    >
      <div className="space-y-6 max-w-4xl">
        {COMPLIANCE_ITEMS.map((item, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-base font-bold text-slate-900">{item.name}</h2>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                <CheckCircle2 size={12} />
                <span>{item.status}</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{item.desc}</p>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
