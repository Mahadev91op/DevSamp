import mongoose from "mongoose";

const CustomerPageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    isDemo: { type: Boolean, default: false },

    // Section 01: Hero
    hero: {
      eyebrow: { type: String, default: "DevSamp Customer Ecosystem" },
      title: { type: String, default: "Organizations & Teams Powered by DevSamp Engineering" },
      description: { type: String, default: "DevSamp collaborates with forward-thinking enterprises, healthcare networks, retail operators, and high-growth startups to design, build, and operate mission-critical software systems." },
      badge: { type: String, default: "Customer Ecosystem" },
      primaryCta: {
        text: { type: String, default: "Explore Customer Directory" },
        link: { type: String, default: "#directory" },
      },
      secondaryCta: {
        text: { type: String, default: "Start a Relationship" },
        link: { type: String, default: "/#contact" },
      },
    },

    // Section 02: Relationship Context & Principles
    ecosystemIntro: {
      eyebrow: { type: String, default: "Collaboration Foundations" },
      title: { type: String, default: "Direct Architect Access. 100% In-House Craft. Long-Term Commitment." },
      description: { type: String, default: "We treat customer relationships as strategic engineering partnerships rather than one-off transactional handoffs. Every software deployment is backed by transparent communication, audited codebases, and dedicated SLA support." },
      principles: [
        {
          title: { type: String, default: "Zero Subcontracting" },
          description: { type: String, default: "Every line of code and database schema is crafted by our dedicated in-house engineering pods." },
          icon: { type: String, default: "ShieldCheck" }
        },
        {
          title: { type: String, default: "Full IP Ownership" },
          description: { type: String, default: "Customers retain 100% intellectual property ownership of their custom software, models, and assets." },
          icon: { type: String, default: "Lock" }
        },
        {
          title: { type: String, default: "Long-Term SLA Governance" },
          description: { type: String, default: "Continuous uptime monitoring, security patching, and direct senior architect escalations." },
          icon: { type: String, default: "Activity" }
        }
      ]
    },

    // Section 03: Engagement Models
    engagementTypes: [
      {
        title: { type: String, default: "Enterprise SaaS Platforms" },
        badge: { type: String, default: "Software License" },
        description: { type: String, default: "Turnkey deployment of our proprietary vertical platforms such as MedERP Pro and FlowPulse POS." },
        icon: { type: String, default: "Boxes" }
      },
      {
        title: { type: String, default: "Dedicated Engineering Pods" },
        badge: { type: String, default: "Monthly Retainer" },
        description: { type: String, default: "Fullstack engineering teams embedded directly into your product lifecycle for high-velocity execution." },
        icon: { type: String, default: "Workflow" }
      },
      {
        title: { type: String, default: "Custom Cloud & API Meshes" },
        badge: { type: String, default: "Architectural Build" },
        description: { type: String, default: "Bespoke distributed architectures, multi-tenant databases, and high-concurrency payment gateways." },
        icon: { type: String, default: "Layers" }
      },
      {
        title: { type: String, default: "Strategic Technology Alliances" },
        badge: { type: String, default: "Partnership" },
        description: { type: String, default: "Joint engineering innovation and cloud integration with leading technology ecosystems." },
        icon: { type: String, default: "Zap" }
      }
    ],

    // Section 04: FAQs
    faqs: [
      {
        question: { type: String, default: "How does DevSamp protect customer privacy and confidentiality?" },
        answer: { type: String, default: "We adhere strictly to non-disclosure agreements (NDAs). Customer logos and relationship details are only published with explicit written consent. Sensitive internal architectures and private data remain 100% confidential." },
        category: { type: String, default: "Privacy" },
        order: { type: Number, default: 1 }
      },
      {
        question: { type: String, default: "Can customers own the intellectual property (IP) of custom systems?" },
        answer: { type: String, default: "Yes, 100%. All custom code, database designs, UI systems, and proprietary business workflows developed for your organization are fully owned by your company upon completion." },
        category: { type: String, default: "IP & Ownership" },
        order: { type: Number, default: 2 }
      },
      {
        question: { type: String, default: "What happens after software deployment?" },
        answer: { type: String, default: "DevSamp provides ongoing SLA maintenance, performance monitoring, cloud infrastructure management, and priority feature iterations through dedicated engineering retainers." },
        category: { type: String, default: "Support" },
        order: { type: Number, default: 3 }
      },
      {
        question: { type: String, default: "How do we initialize a customer relationship with DevSamp?" },
        answer: { type: String, default: "You can submit an inquiry through our portal or book an architectural scoping consultation. Our senior engineering leads will review your requirements within 24 hours." },
        category: { type: String, default: "Onboarding" },
        order: { type: Number, default: 4 }
      }
    ],

    // Section 05: Final CTA
    finalCta: {
      eyebrow: { type: String, default: "Join the DevSamp Ecosystem" },
      title: { type: String, default: "Ready to Build Your Next Mission-Critical Platform?" },
      description: { type: String, default: "Collaborate with dedicated senior engineers to architect high-performance software products, custom APIs, and automated business workflows." },
      primaryText: { type: String, default: "Initialize Engineering Pod" },
      primaryLink: { type: String, default: "/#contact" },
      secondaryText: { type: String, default: "Explore Products" },
      secondaryLink: { type: String, default: "/products" },
    },
  },
  { timestamps: true }
);

CustomerPageSchema.index({ status: 1 });

export default mongoose.models.CustomerPage || mongoose.model("CustomerPage", CustomerPageSchema);
