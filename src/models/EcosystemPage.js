import mongoose from "mongoose";

const EcosystemPageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    isDemo: { type: Boolean, default: false },

    // Section 01: Hero
    hero: {
      eyebrow: { type: String, default: "DevSamp Ecosystem" },
      title: { type: String, default: "One Interconnected Digital Ecosystem. Multiple Software Capabilities." },
      description: { type: String, default: "DevSamp brings together proprietary software products, bespoke engineering pods, open developer infrastructure, and continuous cloud operations into a unified digital operating layer." },
      badge: { type: String, default: "Enterprise Architecture" },
      statusPill: { type: String, default: "4 Live SaaS • Multi-Tenant Mesh • Global Edge SLA" },
      primaryCta: {
        text: { type: String, default: "Explore Architecture" },
        link: { type: String, default: "#architecture" },
      },
      secondaryCta: {
        text: { type: String, default: "View Topology Map" },
        link: { type: String, default: "#topology" },
      },
    },

    // Section 02: Definition
    definition: {
      eyebrow: { type: String, default: "Ecosystem Defined" },
      title: { type: String, default: "What Does \"Ecosystem\" Mean at DevSamp?" },
      statement: { type: String, default: "DevSamp is not an isolated agency building disposable websites. We are an interconnected software ecosystem combining products, custom engineering, and developer platforms." },
      description: { type: String, default: "Every component we engineer—from healthcare ERPs to retail POS systems, custom API gateways, and client engineering pods—is designed to interoperate, share telemetry, and compound long-term business value." },
      highlight: { type: String, default: "Compounding Digital Value" },
      keyPoints: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
        }
      ]
    },

    // Section 03 & 04: Architecture & Core Layers
    architecture: {
      eyebrow: { type: String, default: "System Topology" },
      title: { type: String, default: "The DevSamp Structural Hierarchy" },
      description: { type: String, default: "How data, services, products, and customer applications interact within our unified architectural model." },
      tiers: [
        {
          tierNumber: { type: String },
          name: { type: String },
          role: { type: String },
          description: { type: String },
          components: [{ type: String }],
          color: { type: String },
          icon: { type: String },
          order: { type: Number, default: 0 },
        }
      ]
    },

    // Section 05 - 08: Deep Layers Overview
    layers: [
      {
        layerId: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String },
        description: { type: String, required: true },
        icon: { type: String },
        badge: { type: String },
        capabilities: [{ type: String }],
        linkUrl: { type: String },
        order: { type: Number, default: 0 },
      }
    ],

    // Section 09: How Everything Connects (Flywheel)
    connections: {
      eyebrow: { type: String, default: "Ecosystem Flywheel" },
      title: { type: String, default: "How Every Component Connects & Compounds Value" },
      description: { type: String, default: "Customer feedback powers product innovation, custom engineering expands our shared technology base, and shared APIs accelerate every new client deployment." },
      steps: [
        {
          stepNumber: { type: String },
          title: { type: String },
          description: { type: String },
          icon: { type: String },
          order: { type: Number, default: 0 },
        }
      ]
    },

    // Section 10: Engagement Flow
    flow: {
      eyebrow: { type: String, default: "Engagement Paths" },
      title: { type: String, default: "Flexible Ways to Engage With the DevSamp Ecosystem" },
      description: { type: String, default: "Whether you need an off-the-shelf vertical SaaS platform, a dedicated engineering pod, or a hybrid enterprise solution, our ecosystem adapts to your growth stage." },
      paths: [
        {
          title: { type: String },
          target: { type: String },
          description: { type: String },
          icon: { type: String },
          badge: { type: String },
          features: [{ type: String }],
          ctaText: { type: String },
          ctaLink: { type: String },
          order: { type: Number, default: 0 },
        }
      ]
    },

    // Section 12: Shared Technology Foundation
    sharedFoundation: {
      eyebrow: { type: String, default: "Core Platform Engine" },
      title: { type: String, default: "Shared Technical Foundation Underneath All Solutions" },
      description: { type: String, default: "Instead of reinventing security, authentication, or billing for every product, DevSamp builds on standardized, high-performance infrastructure modules." },
      pillars: [
        {
          title: { type: String },
          description: { type: String },
          specs: { type: String },
          icon: { type: String },
          order: { type: Number, default: 0 },
        }
      ]
    },

    // Section 13: Developer Platform
    developerLayer: {
      eyebrow: { type: String, default: "Developer First" },
      title: { type: String, default: "Open APIs, Event Webhooks & Type-Safe SDKs" },
      description: { type: String, default: "Engineered from day one for extensibility. Developers can consume REST endpoints, subscribe to real-time events, and integrate with any external stack." },
      capabilities: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
        }
      ]
    },

    // Section 14: Business Growth Lifecycle
    businessGrowth: {
      eyebrow: { type: String, default: "Long-Term Value" },
      title: { type: String, default: "An Ecosystem That Compounds With Your Growth" },
      description: { type: String, default: "From initial product deployment to multi-tenant scaling and custom feature development, DevSamp stays embedded as your long-term engineering partner." },
      stages: [
        {
          stage: { type: String },
          title: { type: String },
          description: { type: String },
          benefit: { type: String },
          order: { type: Number, default: 0 },
        }
      ]
    },

    // Section 15: Future Horizon
    futureExpansion: {
      eyebrow: { type: String, default: "Ecosystem Horizon" },
      title: { type: String, default: "Upcoming Platform Expansion & Roadmap" },
      description: { type: String, default: "Strategic future layers being actively engineered to further integrate and automate modern digital workloads." },
      initiatives: [
        {
          title: { type: String },
          timeframe: { type: String },
          status: { type: String },
          description: { type: String },
          badge: { type: String },
          icon: { type: String },
          order: { type: Number, default: 0 },
        }
      ]
    },

    // Section 16: Ecosystem Principles
    principles: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String },
        badge: { type: String },
        order: { type: Number, default: 0 },
      }
    ],

    // Section 17: FAQ
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        category: { type: String, default: "General" },
        order: { type: Number, default: 0 },
      }
    ],

    // Section 18: Final CTA
    finalCta: {
      eyebrow: { type: String, default: "Join the Ecosystem" },
      title: { type: String, default: "Ready to Build, Scale, or License on the DevSamp Ecosystem?" },
      description: { type: String, default: "Partner with software architects who design, operate, and maintain high-performance digital products and custom engineering pods." },
      primaryText: { type: String, default: "Initialize Discovery Pod" },
      primaryLink: { type: String, default: "/#contact" },
      secondaryText: { type: String, default: "Explore SaaS Products" },
      secondaryLink: { type: String, default: "/products" },
    },
  },
  {
    timestamps: true,
  }
);

EcosystemPageSchema.index({ status: 1 });

export default mongoose.models.EcosystemPage || mongoose.model("EcosystemPage", EcosystemPageSchema);
