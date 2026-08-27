import mongoose from "mongoose";

const PricingPageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    isDemo: { type: Boolean, default: false },

    // Section 01: Hero
    hero: {
      eyebrow: { type: String, default: "DevSamp Commercial Architecture" },
      title: { type: String, default: "Transparent Pricing Built Around Your Product and Scale" },
      description: { type: String, default: "From turnkey SaaS licenses to dedicated engineering pod retainers and custom enterprise platforms with 100% intellectual property ownership." },
      badge: { type: String, default: "Commercial Architecture" },
      primaryCta: {
        text: { type: String, default: "Explore Pricing Blueprints" },
        link: { type: String, default: "#catalog" },
      },
      secondaryCta: {
        text: { type: String, default: "Custom Scope Evaluator" },
        link: { type: String, default: "#calculator" },
      },
    },

    // Section 02: Pricing Context & Philosophy
    structureIntro: {
      eyebrow: { type: String, default: "Commercial Framework" },
      title: { type: String, default: "How DevSamp Commercial Engagements Work" },
      description: { type: String, default: "We eliminate opaque agency billing with transparent, performance-guaranteed commercial structures. Whether licensing our SaaS cores or hiring dedicated engineering pods, every deliverable is bound to clear milestones and zero technical debt." },
    },

    // Section 06: Engagement Models
    engagementModels: {
      eyebrow: { type: String, default: "Engagement Pathways" },
      title: { type: String, default: "Flexible Commercial Models for Every Stage of Scale" },
      description: { type: String, default: "Choose the commercial structure that aligns directly with your release timelines, operational requirements, and budget predictability." },
      models: [
        {
          title: { type: String, default: "Dedicated Engineering Pod" },
          subtitle: { type: String, default: "Full-Stack Retainer" },
          description: { type: String, default: "A synchronized pair of senior engineers dedicated entirely to your repository. Continuous sprint velocity with sub-24h code deployment." },
          icon: { type: String, default: "Users" },
          badge: { type: String, default: "Most Popular" },
          highlights: { type: [String], default: ["Dedicated Senior Full-Stack Engineers", "Continuous CI/CD Sprint Delivery", "Direct Slack & Video Sync", "100% Code & IP Ownership"] },
        },
        {
          title: { type: String, default: "Fixed-Scope Deliverable" },
          subtitle: { type: String, default: "Milestone-Based" },
          description: { type: String, default: "Guaranteed turnkey platform builds executed under defined architectural specifications, strict milestone approvals, and fixed costs." },
          icon: { type: String, default: "ShieldCheck" },
          badge: { type: String, default: "Fixed Scope" },
          highlights: { type: [String], default: ["Comprehensive Scope Definition", "Milestone-Gated Payments", "Automated QA & Security Audits", "30-Day Post-Launch Warranty"] },
        },
        {
          title: { type: String, default: "Proprietary SaaS Licensing" },
          subtitle: { type: String, default: "Tiered Software" },
          description: { type: String, default: "Instant cloud deployment of DevSamp vertical platforms (MedERP Pro, FlowPulse POS) with automated tenant provisioning and isolated DB clusters." },
          icon: { type: String, default: "Layers" },
          badge: { type: String, default: "Instant SaaS" },
          highlights: { type: [String], default: ["Isolated Tenant Architecture", "99.9% Uptime Production SLA", "Automated Daily Backups", "Continuous Upstream Updates"] },
        },
        {
          title: { type: String, default: "Enterprise Custom Core" },
          subtitle: { type: String, default: "Bespoke Architecture" },
          description: { type: String, default: "Custom multi-region deployments, on-premise Kubernetes clustering, custom SLA guarantees, and enterprise compliance integration." },
          icon: { type: String, default: "Cpu" },
          badge: { type: String, default: "Enterprise" },
          highlights: { type: [String], default: ["Custom SLA & 24/7 Phone Support", "On-Prem / Private VPC Hosting", "Enterprise Compliance Auditing", "Dedicated Solution Architect"] },
        },
      ],
    },

    // Section 09: Custom Solution CTA
    customSolutionCta: {
      eyebrow: { type: String, default: "Bespoke Scoping" },
      title: { type: String, default: "Require a Tailored Architectural Scope?" },
      description: { type: String, default: "If your operational workflow requires unique multi-tenant isolation, legacy ERP migration, or custom API gateways, our architects will create a custom transparent blueprint." },
      primaryText: { type: String, default: "Initialize Discovery Consultation" },
      primaryLink: { type: String, default: "/#contact" },
      secondaryText: { type: String, default: "Explore Engineering Services" },
      secondaryLink: { type: String, default: "/services" },
    },

    // Section 10: FAQ
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        category: { type: String, default: "General" },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 11: Final CTA
    finalCta: {
      eyebrow: { type: String, default: "Start Building" },
      title: { type: String, default: "Ready to Deploy or Configure Your Software Blueprint?" },
      description: { type: String, default: "Select an active commercial blueprint, configure custom parameters via our quote evaluator, or speak directly with our lead architects." },
      primaryText: { type: String, default: "Initialize Discovery Pod" },
      primaryLink: { type: String, default: "/#contact" },
      secondaryText: { type: String, default: "Explore Software Portfolio" },
      secondaryLink: { type: String, default: "/products" },
    },
  },
  {
    timestamps: true,
  }
);

PricingPageSchema.index({ status: 1 });

export default mongoose.models.PricingPage || mongoose.model("PricingPage", PricingPageSchema);
