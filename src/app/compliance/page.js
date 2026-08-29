import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Award, ShieldCheck, CheckCircle2, Lock, FileCheck, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Compliance, Certifications & Data Governance | DevSamp Ecosystem",
  description: "Verified regulatory certifications, healthcare data residency standards, HIPAA, DPDP, ISO-27001, and operational audit reports.",
};

const COMPLIANCE_ITEMS = [
  {
    name: "HIPAA (Health Insurance Portability and Accountability Act)",
    framework: "US Healthcare Standard",
    status: "Compliant & Audited",
    desc: "Meets all administrative, physical, and technical safeguards for Protected Health Information (PHI). Includes automated e-signature verification and encrypted audit logs.",
    controls: ["AES-256 Data Encryption at Rest", "TLS 1.3 Transmission Security", "Field-level PHI Redaction", "Emergency Access Break-Glass Protocol"]
  },
  {
    name: "Indian Digital Personal Data Protection (DPDP) Act 2023",
    framework: "Indian Data Privacy Law",
    status: "Certified Compliant",
    desc: "Strict data residency within sovereign Indian cloud zones with explicit patient consent tracking, localized data fiduciary roles, and zero cross-border unauthorized transfers.",
    controls: ["Mumbai Sovereign Cloud Zone (ap-south-1)", "Granular Patient Consent Logging", "Right to Correction & Erasure Support", "Mandatory Data Breach Notification Relays"]
  },
  {
    name: "GDPR (General Data Protection Regulation)",
    framework: "EU Privacy Law",
    status: "Standard Compliant",
    desc: "Full support for EU citizen data privacy rights, data portability JSON exports, Data Processing Agreements (DPA), and standard contractual clauses.",
    controls: ["Right to be Forgotten Automated Pipeline", "Standard Contractual Clauses (SCCs)", "Subprocessor Directory & Notification", "Annual Privacy Impact Assessments"]
  },
  {
    name: "SOC 2 Type II Controls",
    framework: "AICPA Security Standard",
    status: "Controls Implemented",
    desc: "Continuous automated monitoring of Security, Availability, Confidentiality, and Processing Integrity across all production container clusters.",
    controls: ["Continuous Vulnerability Scans", "Zero-Trust Infrastructure Access", "Disaster Recovery RTO < 15 Mins", "Background Verification on All Engineers"]
  },
  {
    name: "ISO/IEC 27001:2022 Readiness",
    framework: "Information Security Management",
    status: "ISMS Framework Active",
    desc: "Comprehensive Information Security Management System (ISMS) governing code reviews, hardware access, and incident response procedures.",
    controls: ["Cryptographic Key Lifecycle Management", "Role-Based Physical & Network Access", "Change Management Approval Workflows", "Quarterly Penetration Test Audits"]
  },
  {
    name: "PCI-DSS Level 1 Hosted Gateway Security",
    framework: "Payment Card Industry Standard",
    status: "Tokenized Vault Architecture",
    desc: "All credit card and recurring mandate processing is offloaded to certified Level-1 payment gateways (Stripe & Razorpay) with zero local raw PAN storage.",
    controls: ["Zero Local Card Data Storage", "Tokenized Webhook Relays", "Strict HTTPS HSTS Enforced", "Annual SAQ-D Attestation"]
  }
];

export default function CompliancePage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Compliance", href: "/compliance" }]}
      badge="REGULATORY GOVERNANCE"
      title="Compliance, Certifications & Data Governance"
      subtitle="DevSamp software platforms and engineering pods adhere to strict international healthcare, privacy, and data security mandates."
      primaryAction={{ label: "Data Processing Agreement", href: "/legal/dpa" }}
      secondaryAction={{ label: "Security Practices", href: "/security/practices" }}
    >
      <div className="space-y-6 max-w-5xl">
        {COMPLIANCE_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {item.framework}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {item.name}
                </h2>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5 shrink-0">
                <CheckCircle2 size={14} />
                <span>{item.status}</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {item.desc}
            </p>

            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Key Technical Controls:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.controls.map((ctrl, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 size={13} className="text-blue-600 shrink-0" />
                    <span>{ctrl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
