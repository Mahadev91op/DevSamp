"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  Workflow
} from "lucide-react";
import Link from "next/link";

const smoothEase = [0.16, 1, 0.3, 1];

const iconMap = {
  Users,
  ShieldCheck,
  Layers,
  Cpu,
  Workflow,
};

const PricingEngagementModels = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "ENGAGEMENT PATHWAYS";
  const title = data?.title || "Flexible Commercial Models for Every Stage of Scale";
  const description = data?.description || "Choose the commercial structure that aligns directly with your release timelines, operational requirements, and budget predictability.";

  const defaultModels = [
    {
      title: "Dedicated Engineering Pod",
      subtitle: "Full-Stack Retainer",
      description: "A synchronized pair of senior engineers dedicated entirely to your repository. Continuous sprint velocity with sub-24h code deployment.",
      icon: "Users",
      badge: "Most Popular",
      highlights: [
        "Dedicated Senior Full-Stack Engineers",
        "Continuous CI/CD Sprint Delivery",
        "Direct Slack & Video Sync",
        "100% Code & IP Ownership",
      ],
    },
    {
      title: "Fixed-Scope Deliverable",
      subtitle: "Milestone-Based",
      description: "Guaranteed turnkey platform builds executed under defined architectural specifications, strict milestone approvals, and fixed costs.",
      icon: "ShieldCheck",
      badge: "Fixed Scope",
      highlights: [
        "Comprehensive Scope Definition",
        "Milestone-Gated Payments",
        "Automated QA & Security Audits",
        "30-Day Post-Launch Warranty",
      ],
    },
    {
      title: "Proprietary SaaS Licensing",
      subtitle: "Tiered Software",
      description: "Instant cloud deployment of DevSamp vertical platforms (MedERP Pro, FlowPulse POS) with automated tenant provisioning and isolated DB clusters.",
      icon: "Layers",
      badge: "Instant SaaS",
      highlights: [
        "Isolated Tenant Architecture",
        "99.9% Uptime Production SLA",
        "Automated Daily Backups",
        "Continuous Upstream Updates",
      ],
    },
    {
      title: "Enterprise Custom Core",
      subtitle: "Bespoke Architecture",
      description: "Custom multi-region deployments, on-premise Kubernetes clustering, custom SLA guarantees, and enterprise compliance integration.",
      icon: "Cpu",
      badge: "Enterprise",
      highlights: [
        "Custom SLA & 24/7 Phone Support",
        "On-Prem / Private VPC Hosting",
        "Enterprise Compliance Auditing",
        "Dedicated Solution Architect",
      ],
    },
  ];

  const models = data?.models && data.models.length > 0 ? data.models : defaultModels;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">
            <Workflow size={13} /> {eyebrow}
          </div>
          <h2 className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Models 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {models.map((model, idx) => {
            const Icon = iconMap[model.icon] || Layers;
            const isFeatured = model.badge === "Most Popular" || idx === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: smoothEase }}
                className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                  isFeatured 
                    ? "bg-blue-50/30 border-blue-500/50 shadow-md shadow-blue-500/5" 
                    : "bg-white border-slate-200/80 hover:border-slate-350 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                      isFeatured ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                    }`}>
                      <Icon size={20} />
                    </div>
                    {model.badge && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100/70 text-blue-700 uppercase tracking-wider">
                        {model.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                    {model.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-blue-600 mb-3">
                    {model.subtitle}
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                    {model.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                    {model.highlights && model.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 size={13} className="text-blue-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/?engagement=${encodeURIComponent(model.title)}#contact`}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-950 hover:text-white text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Select Pathway</span>
                  <ArrowRight size={12} />
                </Link>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PricingEngagementModels;
