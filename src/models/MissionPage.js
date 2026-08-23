import mongoose from "mongoose";

const MissionPageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    isDemo: { type: Boolean, default: false },

    // Section 01: Mission Hero
    hero: {
      eyebrow: { type: String, default: "DevSamp Mission" },
      title: { type: String, default: "Building Reliable, Scalable Digital Products for Modern Businesses." },
      description: { type: String, default: "We exist to eliminate technical debt and execution friction by engineering high-performance software products, robust cloud architectures, and dedicated development pods." },
      badge: { type: String, default: "Operational Purpose" },
      missionPill: { type: String, default: "Product-First Engineering" },
    },

    // Section 02: Core Mission Statement
    statement: {
      title: { type: String, default: "The Core Mandate" },
      statement: { type: String, default: "Customers aur businesses ke liye reliable, scalable digital products banana." },
      englishTranslation: { type: String, default: "Engineering reliable, scalable digital products and technology assets for businesses and end-users." },
      description: { type: String, default: "Every line of code, database schema, and interface interaction we build is focused on delivering measurable operational stability, effortless scalability, and compounding business value." },
      highlightBadge: { type: String, default: "Everyday Execution" },
    },

    // Section 03: What Our Mission Means
    meanings: [
      {
        key: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String },
        description: { type: String, required: true },
        icon: { type: String },
        badge: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 04: Who We Build For
    audiences: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        targetNeed: { type: String },
        icon: { type: String },
        badge: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 05: What We Build
    capabilities: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String },
        icon: { type: String },
        badge: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 06: Reliability Principles
    reliability: {
      title: { type: String, default: "Reliability is Our Engineering Baseline" },
      description: { type: String, default: "Reliability is not an optional premium feature—it is the foundational standard for every product we ship." },
      principles: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
          badge: { type: String },
        },
      ],
    },

    // Section 07: Scalability Principles
    scalability: {
      title: { type: String, default: "Architected for Exponential Growth" },
      description: { type: String, default: "How our multi-tenant schemas, cached database indexes, and edge routing scale effortlessly without requiring costly rewrites." },
      stages: [
        {
          stage: { type: String },
          title: { type: String },
          description: { type: String },
        },
      ],
    },

    // Section 08: Customer Value
    customerValue: {
      title: { type: String, default: "Connecting Engineering to Business Outcomes" },
      description: { type: String, default: "We measure technical success not by lines of code written, but by operational hours saved, downtime prevented, and business revenue compounded." },
      valuePillars: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
        },
      ],
    },

    // Section 09: Product Engineering Process
    process: [
      {
        stepNumber: { type: String },
        title: { type: String, required: true },
        description: { type: String, required: true },
        deliverable: { type: String },
        icon: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 10: UX & Design Philosophy
    uxPhilosophy: {
      title: { type: String, default: "Design Built for Speed and Clarity" },
      description: { type: String, default: "Digital products must be intuitive, accessible, and blisteringly fast. Zero visual jitter, responsive fluid layouts, and sub-100ms interaction feedback." },
      principles: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
        },
      ],
    },

    // Section 11: Engineering Principles
    engineeringPrinciples: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String },
        badge: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 12: Continuous Loop (Build -> Learn -> Improve -> Scale)
    continuousLoop: {
      title: { type: String, default: "The Continuous Engineering Loop" },
      description: { type: String, default: "We do not build once and walk away. Our systems evolve through continuous telemetry, telemetry monitoring, user feedback, and iterative performance tuning." },
      steps: [
        {
          step: { type: String },
          label: { type: String },
          description: { type: String },
          icon: { type: String },
        },
      ],
    },

    // Section 13: Mission in Practice
    missionInPractice: [
      {
        title: { type: String, required: true },
        principle: { type: String, required: true },
        realExample: { type: String, required: true },
        outcome: { type: String },
        icon: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 14: Mission Pillars
    pillars: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String },
        badge: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 15: Quality & Trust
    qualityTrust: {
      title: { type: String, default: "Engineering Standards You Can Trust" },
      description: { type: String, default: "Direct access to senior architects, transparent async documentation, automated regression testing, and production-grade SLAs." },
      points: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
        },
      ],
    },

    // Section 16: Mission Metrics & Evidence (Optional)
    evidence: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
        description: { type: String },
        source: { type: String },
        public: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 17: Mission FAQ
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 18: Final CTA
    finalCta: {
      title: { type: String, default: "Build Reliable, Scalable Software with DevSamp." },
      description: { type: String, default: "Whether you need to deploy production-ready vertical SaaS platforms or partner with a dedicated engineering pod, we are ready to build." },
      primaryCta: {
        text: { type: String, default: "Explore Services" },
        link: { type: String, default: "/#services" },
      },
      secondaryCta: {
        text: { type: String, default: "Start a Conversation" },
        link: { type: String, default: "/#contact" },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.MissionPage || mongoose.model("MissionPage", MissionPageSchema);
