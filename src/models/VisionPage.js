import mongoose from "mongoose";

const VisionPageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    isDemo: { type: Boolean, default: false },

    // Section 01: Vision Hero
    hero: {
      eyebrow: { type: String, default: "DevSamp Vision 2035" },
      title: { type: String, default: "Engineering the Global Operating Layer for Connected Enterprise Software." },
      description: { type: String, default: "A 10–15 year strategic roadmap to unify vertical SaaS applications, autonomous engineering pods, and universal developer protocols into an interconnected software ecosystem." },
      badge: { type: String, default: "Strategic Horizon 2026–2035" },
      horizonPill: { type: String, default: "15-Year Architecture Strategy" },
    },

    // Section 02: Core Vision Statement
    statement: {
      title: { type: String, default: "The Central Thesis" },
      statement: { type: String, default: "To evolve from an elite product-engineering firm into the decentralized technology backbone that powers global digital commerce, healthcare, and infrastructure." },
      description: { type: String, default: "Software over the next decade must transition from isolated, brittle monoliths into compounding, interconnected ecosystems with shared intelligence, instant edge sync, and sub-10ms operational latency." },
      highlightBadge: { type: String, default: "Decade Horizon" },
    },

    // Section 03: Why This Vision
    reasons: [
      {
        title: { type: String, required: true },
        problem: { type: String, required: true },
        opportunity: { type: String, required: true },
        direction: { type: String, required: true },
        icon: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 04: 10–15 Year Direction & Phases
    phases: [
      {
        phaseKey: { type: String, required: true },
        title: { type: String, required: true },
        timeframe: { type: String, required: true },
        description: { type: String, required: true },
        objectives: [{ type: String }],
        milestones: [{ type: String }],
        badge: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 05: Future DevSamp Ecosystem Architecture
    ecosystemLayers: [
      {
        layerName: { type: String, required: true },
        role: { type: String, required: true },
        description: { type: String, required: true },
        components: [{ type: String }],
        icon: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 06: Strategic Pillars
    pillars: [
      {
        title: { type: String, required: true },
        shortDescription: { type: String, required: true },
        description: { type: String },
        icon: { type: String },
        metric: { type: String },
        badge: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 07: Software & Product Evolution
    productVision: {
      title: { type: String, default: "The Evolution of DevSamp Software" },
      description: { type: String, default: "How our software model transitions from custom project development to reusable multi-tenant platforms, specialized vertical SaaS suites, and a self-orchestrating product mesh." },
      evolutionSteps: [
        {
          from: { type: String },
          to: { type: String },
          description: { type: String },
          status: { type: String },
        },
      ],
    },

    // Section 08: Platform Vision
    platformVision: {
      title: { type: String, default: "One Unified Infrastructure Underneath Multiple Vertical Products" },
      description: { type: String, default: "Shared core services—including universal authentication, tenant isolation, automated telemetry, global billing, and event webhooks—power every application we ship." },
      sharedCapabilities: [
        {
          name: { type: String },
          description: { type: String },
          icon: { type: String },
        },
      ],
    },

    // Section 09: AI & Autonomous Systems Direction
    aiDirection: {
      title: { type: String, default: "Autonomous Workflows & Decision Telemetry" },
      description: { type: String, default: "We leverage deterministic AI models and workflow orchestration to automate operational bottlenecks in healthcare, billing, inventory, and devops." },
      focusAreas: [
        {
          title: { type: String },
          description: { type: String },
          latencyTarget: { type: String },
          icon: { type: String },
        },
      ],
    },

    // Section 11: Developer Ecosystem Vision
    developerVision: {
      title: { type: String, default: "An Open Platform for Global Builders" },
      description: { type: String, default: "Opening our REST gateways, event webhooks, and modular SDKs so external engineering teams can build custom applications directly on DevSamp infrastructure." },
      tools: [
        {
          name: { type: String },
          description: { type: String },
          icon: { type: String },
        },
      ],
    },

    // Section 12: Technology & Engineering Direction
    techDirection: {
      title: { type: String, default: "Next-Decade Engineering Standards" },
      description: { type: String, default: "Building on immutable server state, zero-overhead edge streaming, sub-10ms database indexes, and end-to-end type safety." },
      standards: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
          badge: { type: String },
        },
      ],
    },

    // Section 13: Future Technical Roadmap
    roadmap: [
      {
        title: { type: String, required: true },
        category: { type: String, required: true },
        timeframe: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ["completed", "in-progress", "planned", "future"], default: "planned" },
        public: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 14: Vision Principles
    principles: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 15: Future State / Destination
    futureState: {
      title: { type: String, default: "The DevSamp Destination" },
      visionDestination: { type: String, default: "A global interconnected network of vertical SaaS platforms, engineering pods, and developer nodes operating with 99.99% uptime and zero friction." },
      coreOutcomes: [
        {
          metric: { type: String },
          label: { type: String },
          desc: { type: String },
        },
      ],
    },

    // Section 16: Vision FAQ
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 17: Final CTA
    finalCta: {
      title: { type: String, default: "Shape the Future of Digital Ecosystems." },
      description: { type: String, default: "Partner with DevSamp to deploy enterprise software products or commission an elite engineering pod for your next-generation platform." },
      primaryCta: {
        text: { type: String, default: "Explore Products" },
        link: { type: String, default: "/products" },
      },
      secondaryCta: {
        text: { type: String, default: "Initialize Conversation" },
        link: { type: String, default: "/#contact" },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.VisionPage || mongoose.model("VisionPage", VisionPageSchema);
