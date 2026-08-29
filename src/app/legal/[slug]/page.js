import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { FileCheck, Server, ShieldCheck, CheckCircle2 } from "lucide-react";

const LEGAL_DOCS = {
  "dpa": {
    name: "Data Processing Agreement (DPA)",
    badge: "PRIVACY AGREEMENT",
    desc: "Standard contractual clauses regulating data protection, confidentiality, and processing obligations.",
    sections: [
      { title: "1. Scope and Purpose", body: "This Data Processing Agreement applies to the processing of personal data and Protected Health Information (PHI) provided by the Customer to DevSamp in connection with software subscriptions and engineering services." },
      { title: "2. Customer as Data Fiduciary", body: "The Customer maintains sole ownership and control of all patient and clinical data. DevSamp acts strictly as a Data Processor under documented instructions from the Customer." },
      { title: "3. Technical and Organizational Safeguards", body: "DevSamp implements state-of-the-art technical measures including AES-256 encryption at rest, TLS 1.3 in transit, strict RBAC controls, and automated vulnerability audits." }
    ]
  },
  "subprocessors": {
    name: "Authorized Subprocessors",
    badge: "INFRASTRUCTURE VENDORS",
    desc: "Transparent listing of cloud hosting, database clustering, and delivery infrastructure providers.",
    sections: [
      { title: "1. Amazon Web Services (AWS)", body: "Purpose: Cloud compute, geo-redundant database backups, and secure VPC hosting (Region: Mumbai, India & Singapore)." },
      { title: "2. Cloudflare Inc.", body: "Purpose: Edge DDoS mitigation, DNS resolution, and SSL/TLS certificate termination." },
      { title: "3. Twilio / SendGrid", body: "Purpose: Transactional SMS alerts and encrypted notification dispatch." },
      { title: "4. Razorpay / Stripe", body: "Purpose: PCI-DSS compliant credit card and UPI payment processing." }
    ]
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = LEGAL_DOCS[slug] || { name: "Legal Document" };
  return {
    title: `${doc.name} | Legal & Trust • DevSamp`,
    description: doc.desc || "DevSamp Legal Documentation.",
  };
}

export default async function LegalDocPage({ params }) {
  const { slug } = await params;
  const doc = LEGAL_DOCS[slug] || {
    name: slug.toUpperCase(),
    badge: "LEGAL",
    desc: "Official legal and governance terms.",
    sections: []
  };

  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Trust & Legal", href: "/security" },
        { label: doc.name, href: `/legal/${slug}` }
      ]}
      badge={doc.badge}
      title={doc.name}
      subtitle={doc.desc}
      primaryAction={{ label: "Privacy Policy", href: "/privacy" }}
      secondaryAction={{ label: "Terms of Service", href: "/terms" }}
    >
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 max-w-4xl">
        {doc.sections.map((sec, idx) => (
          <section key={idx} className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">{sec.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{sec.body}</p>
          </section>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
