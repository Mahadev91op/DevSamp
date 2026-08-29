import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import {
  HelpCircle,
  BookOpen,
  FileText,
  MessageSquare,
  Wrench,
  Video,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Mail
} from "lucide-react";

const SUPPORT_PAGES = {
  "getting-started": {
    name: "Getting Started & Onboarding",
    badge: "START",
    desc: "Complete step-by-step onboarding guides to set up your hospital or business software.",
    items: [
      { title: "First-Time Administrator Setup", desc: "Setting up organization credentials, branch locations, and system timezone." },
      { title: "Doctor & Staff User Creation", desc: "Configuring roles, permissions, and department logins." },
      { title: "Prescription & Invoice Template Customization", desc: "Adding your hospital letterhead, logo, and GST number." }
    ]
  },
  "guides": {
    name: "Task-Based Product Guides",
    badge: "DOCS",
    desc: "Comprehensive task-based manuals for every software operation.",
    items: [
      { title: "OPD Patient Admission & Triage Workflow", desc: "Fast patient registration, token generation, and doctor queue assignment." },
      { title: "Pathology Sample Barcode Scanning & Machine Sync", desc: "Connecting lab equipment and automatically importing test results." },
      { title: "Pharmacy Batch Inventory & Expiry Reordering", desc: "Managing stock reorder thresholds, GST computation, and supplier invoices." }
    ]
  },
  "faqs": {
    name: "Frequently Asked Questions",
    badge: "FAQS",
    desc: "Answers to common questions regarding deployment, security, and hardware.",
    items: [
      { title: "Can MedERP Pro run if our hospital internet goes down?", desc: "Yes. Our local caching engine allows doctors and nurses to continue typing notes and billing; data syncs automatically once connectivity returns." },
      { title: "How is patient medical data protected?", desc: "All records are encrypted at rest with AES-256 and transmitted using TLS 1.3 in full compliance with HIPAA and DPDP regulations." },
      { title: "What thermal POS printers are supported?", desc: "We support all standard 2-inch and 3-inch ESC/POS thermal printers via USB, Ethernet, and Bluetooth." }
    ]
  },
  "troubleshooting": {
    name: "Troubleshooting & Error Codes",
    badge: "FIXES",
    desc: "Self-service recovery guides for printer disconnects, sync latency, and browser cache issues.",
    items: [
      { title: "Thermal Printer Not Detected", desc: "Check USB driver baud rates and verify raw printing permissions." },
      { title: "Lab Machine Analyzer Timeout (HL7/ASTM)", desc: "Ensure RS232-to-Ethernet bridge IP address matches cluster gateway port." },
      { title: "Session Expired / Token Refresh Failure", desc: "Clear local browser cookies or request an administrator MFA session reset." }
    ]
  },
  "videos": {
    name: "Video Guides & Screencasts",
    badge: "VIDEOS",
    desc: "Watch step-by-step visual tutorials for every module.",
    items: [
      { title: "MedERP Pro 10-Minute Clinical Overview", desc: "Complete walkthrough from patient check-in to discharge summary." },
      { title: "Setting up Offline Sync & Local Backups", desc: "How to configure automatic daily encrypted database backups." },
      { title: "Multi-Branch Billing & Centralized Ledgers", desc: "Consolidating 10+ branch stores into a single real-time dashboard." }
    ]
  },
  "contact": {
    name: "Contact Support Desk",
    badge: "ASSIST",
    desc: "Connect directly with our 24/7 technical support specialists.",
    items: [
      { title: "Urgent Production Ticket", desc: "Open a priority ticket with a guaranteed 15-minute response SLA." },
      { title: "WhatsApp Direct Emergency Channel", desc: "Message +91 9330680642 for immediate production incident support." },
      { title: "Support Email", desc: "Send logs or diagnostic screenshots to devsamp1st@gmail.com." }
    ]
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = SUPPORT_PAGES[slug] || { name: "Support Guide" };
  return {
    title: `${page.name} | Support Center • DevSamp`,
    description: page.desc || "DevSamp Customer Support & Help Center.",
  };
}

export default async function SupportSubPage({ params }) {
  const { slug } = await params;
  const page = SUPPORT_PAGES[slug] || {
    name: slug.replace(/-/g, " ").toUpperCase(),
    badge: "SUPPORT",
    desc: "DevSamp knowledge base and customer support resources.",
    items: []
  };

  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Support Center", href: "/support" },
        { label: page.name, href: `/support/${slug}` }
      ]}
      badge={page.badge}
      title={page.name}
      subtitle={page.desc}
      primaryAction={{ label: "Open Support Ticket", href: "/account/tickets" }}
      secondaryAction={{ label: "All Support Categories", href: "/support" }}
    >
      <div className="space-y-6 max-w-4xl">
        {page.items.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-indigo-200 transition-colors"
          >
            <h2 className="text-base font-bold text-slate-900">{item.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{item.desc}</p>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
