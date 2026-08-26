import mongoose from "mongoose";

const WhyDevSampPageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    isDemo: { type: Boolean, default: false },

    // Section 01: Hero
    hero: {
      eyebrow: { type: String, default: "Why DevSamp" },
      title: { type: String, default: "Technology Built Around How Your Business Needs to Grow." },
      description: { type: String, default: "DevSamp is not a traditional agency building throwaway websites. We combine proprietary SaaS products, dedicated engineering pods, and unified cloud operations into a compounding software ecosystem." },
      badge: { type: String, default: "Architectural Advantage" },
      statusPill: { type: String, default: "Product-First DNA • In-House Engineering • 24/7 SLA" },
      primaryCta: {
        text: { type: String, default: "Explore the Ecosystem" },
        link: { type: String, default: "/ecosystem" },
      },
      secondaryCta: {
        text: { type: String, default: "Talk to DevSamp" },
        link: { type: String, default: "/#contact" },
      },
    },

    // Section 02: Core Differentiation
    differentiators: [
      {
        pillarId: { type: String },
        title: { type: String, required: true },
        eyebrow: { type: String },
        shortDescription: { type: String, required: true },
        description: { type: String },
        icon: { type: String },
        order: { type: Number, default: 0 },
      }
    ],

    // Section 03: Ecosystem Advantage
    ecosystemAdvantage: {
      eyebrow: { type: String, default: "Ecosystem Advantage" },
      title: { type: String, default: "How All Capabilities Converge for Your Business" },
      description: { type: String, default: "You never have to manage fractured freelancers or isolated agencies. Products, custom pods, platform APIs, and continuous cloud ops work as one unified engine." },
      steps: [
        {
          stepNumber: { type: String },
          title: { type: String },
          description: { type: String },
          icon: { type: String },
        }
      ]
    },

    // Section 04: Product + Service Model
    productServiceModel: {
      eyebrow: { type: String, default: "Dual-Engine Strategy" },
      title: { type: String, default: "The Compounding Power of Products + Services" },
      description: { type: String, default: "Traditional agencies finish a project and leave you with technical debt. DevSamp builds on reusable SaaS cores while providing dedicated pods for bespoke customization." },
      agencyComparison: {
        agencyTitle: { type: String, default: "Traditional Agency Approach" },
        agencyPoints: [{ type: String }],
        devsampTitle: { type: String, default: "DevSamp Ecosystem Approach" },
        devsampPoints: [{ type: String }],
      }
    },

    // Section 05: Engineering-First Discipline
    engineeringFirst: {
      eyebrow: { type: String, default: "Engineering Discipline" },
      title: { type: String, default: "Software Crafted by Engineers, Not Sales Middlemen" },
      description: { type: String, default: "Every architecture decision is evaluated against long-term performance, sub-10ms query execution, defensive error handling, and zero technical debt." },
      tenets: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
          specs: { type: String },
        }
      ]
    },

    // Section 06: Built for Scale
    builtForScale: {
      eyebrow: { type: String, default: "Scalable Foundations" },
      title: { type: String, default: "Designed to Scale Without Costly Rewrites" },
      description: { type: String, default: "From day one, systems are structured with compound database indexes, modular Next.js 15 App Router conventions, and isolated tenant routing." },
      pillars: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
        }
      ]
    },

    // Section 07: Business Alignment
    businessAlignment: {
      eyebrow: { type: String, default: "Business-Aligned" },
      title: { type: String, default: "Connecting Technical Execution to Real Business ROI" },
      description: { type: String, default: "Technology is only as good as the operational bottlenecks it eliminates. We measure success by hours saved, uptime preserved, and revenue throughput." },
      metrics: [
        {
          label: { type: String },
          impact: { type: String },
          description: { type: String },
        }
      ]
    },

    // Section 08: Customization Without Chaos
    customization: {
      eyebrow: { type: String, default: "Modular Craft" },
      title: { type: String, default: "Customization Without Architectural Chaos" },
      description: { type: String, default: "Custom software doesn't mean starting from zero. We combine our battle-tested SaaS infrastructure with tailored pods to ship 60% faster." },
    },

    // Section 09: Maintainability & Ownership
    maintainability: {
      eyebrow: { type: String, default: "True Ownership" },
      title: { type: String, default: "100% Code Ownership & Readable Conventions" },
      description: { type: String, default: "No vendor lock-in. No obfuscated frameworks. You receive clean, well-documented source code repositories and full intellectual property rights." },
    },

    // Section 10: Transparency
    transparency: {
      eyebrow: { type: String, default: "Transparent Delivery" },
      title: { type: String, default: "Clear Milestones, Async Devlogs & Direct Architect Access" },
      description: { type: String, default: "Track sprint progress, inspect technical decisions, and communicate directly with the software engineers building your system." },
    },

    // Section 11: Quality & Reliability
    qualityReliability: {
      eyebrow: { type: String, default: "Quality Baseline" },
      title: { type: String, default: "Zero Unhandled Crashes & 60fps Interaction Speed" },
      description: { type: String, default: "Every component is wrapped with defensive error boundaries, strict schema validation, and optimized DOM rendering for rock-solid stability." },
    },

    // Section 12: Security
    security: {
      eyebrow: { type: String, default: "Defensive Security" },
      title: { type: String, default: "Enterprise RBAC, Encrypted Cookies & Data Isolation" },
      description: { type: String, default: "Protected API boundaries, cryptographic password hashing, role matrices, and tenant data isolation built into every product." },
    },

    // Section 13: Developer Culture
    developerCulture: {
      eyebrow: { type: String, default: "Codebase Craft" },
      title: { type: String, default: "Codebases Developers Love to Inherit & Extend" },
      description: { type: String, default: "Strict file hierarchies, predictable API naming, OpenAPI contracts, and clean component decoupling make onboarding effortless." },
    },

    // Section 14: Continuous Improvement
    continuousImprovement: {
      eyebrow: { type: String, default: "Compounding Flywheel" },
      title: { type: String, default: "A Feedback-Driven Software Lifecycle" },
      description: { type: String, default: "How operational feedback loops back into core software updates, making your systems faster, safer, and more capable over time." },
      stages: [
        {
          step: { type: String },
          title: { type: String },
          description: { type: String },
        }
      ]
    },

    // Section 15: Capability Matrix
    capabilityMatrix: [
      {
        category: { type: String, required: true },
        description: { type: String },
        capabilities: [{ type: String }],
        order: { type: Number, default: 0 },
      }
    ],

    // Section 16: Why Principles
    principles: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        badge: { type: String },
        icon: { type: String },
        order: { type: Number, default: 0 },
      }
    ],

    // Section 17: Real Proof
    proof: {
      eyebrow: { type: String, default: "Verified Execution" },
      title: { type: String, default: "Backed by Production Software & Live Deployments" },
      description: { type: String, default: "Our credibility comes from real software products operating live workloads and delivering verified business results." },
    },

    // Section 18: FAQ
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        category: { type: String, default: "General" },
        order: { type: Number, default: 0 },
      }
    ],

    // Section 19: Final CTA
    finalCta: {
      eyebrow: { type: String, default: "Start Building" },
      title: { type: String, default: "Ready to Build Something That Grows With You?" },
      description: { type: String, default: "Partner with an engineering team that designs, builds, and operates high-performance software with zero architectural debt." },
      primaryText: { type: String, default: "Start a Conversation" },
      primaryLink: { type: String, default: "/#contact" },
      secondaryText: { type: String, default: "Explore Ecosystem" },
      secondaryLink: { type: String, default: "/ecosystem" },
    },
  },
  {
    timestamps: true,
  }
);

WhyDevSampPageSchema.index({ status: 1 });

export default mongoose.models.WhyDevSampPage || mongoose.model("WhyDevSampPage", WhyDevSampPageSchema);
