"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Users, 
  Workflow, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Calendar 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const engagementModels = [
  {
    name: "Dedicated Engineering Pod",
    tagline: "Dedicated Sprint Velocity",
    desc: "A fully dedicated squad of senior fullstack engineers, UI designers, and QA engineers working as a high-velocity extension of your product team.",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    features: [
      "100% dedicated sprint allocation",
      "Direct Slack/Discord channel access",
      "Daily asynchronous standups",
      "Weekly live architectural demos",
      "Full IP & git commit transfer"
    ],
    popular: true,
  },
  {
    name: "Milestone-Based Fixed Scope",
    tagline: "Predictable Budget & Delivery",
    desc: "For clearly defined products and MVPs. We establish strict architectural milestones with guaranteed timeline delivery and fixed commercial terms.",
    icon: Workflow,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    features: [
      "Fixed architectural deliverables",
      "Strict timeline SLAs",
      "Staged payment milestones",
      "UAT testing & QA sign-off",
      "30-day post-launch warranty"
    ],
    popular: false,
  },
  {
    name: "Continuous SLA & Retainer",
    tagline: "Long-Term Health & Scalability",
    desc: "Ongoing maintenance, database optimization, security patches, library upgrades, and priority incident response for live production applications.",
    icon: ShieldCheck,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    features: [
      "24/7 uptime & latency monitoring",
      "Database indexing audits",
      "Security & dependency patches",
      "Emergency incident SLA",
      "Monthly architectural reviews"
    ],
    popular: false,
  },
];

const ServicesEngagementModels = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "COMMERCIAL STRUCTURE";
  const title = data?.title || "Flexible Engagement Models Tailored to Your Growth";
  const description = data?.description || "Whether you need a dedicated engineering pod to accelerate your product roadmap or a fixed-scope milestone delivery.";

  return (
    <section className="py-20 md:py-28 bg-slate-50/50 border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
            <Users size={13} className="text-indigo-600" />
            <span className="tracking-wide uppercase font-mono">{eyebrow}</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            {title}
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* 3-Card Engagement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {engagementModels.map((model, idx) => {
            const Icon = model.icon;
            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.08 }}
                className={`bg-white border rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative shadow-xs hover:shadow-xl ${
                  model.popular ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-slate-200/80 hover:border-slate-400"
                }`}
              >
                {model.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl ${model.bg} ${model.color} border border-slate-200/60 shadow-xs`}>
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-slate-950 tracking-tight mb-1">
                    {model.name}
                  </h3>

                  <div className="text-xs font-bold text-indigo-600 mb-3">
                    {model.tagline}
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {model.desc}
                  </p>

                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
                    {model.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link href={`/#contact?model=${encodeURIComponent(model.name)}`}>
                    <button
                      className={`w-full py-2.5 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        model.popular
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      <span>Inquire About This Model</span>
                      <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesEngagementModels;
