import mongoose from "mongoose";

const AboutPageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    isDemo: { type: Boolean, default: false },

    // Section 01: Hero
    hero: {
      eyebrow: { type: String, default: "About DevSamp" },
      title: { type: String, default: "Building the technology layer for the next generation of businesses." },
      description: { type: String, default: "DevSamp is a connected technology ecosystem combining scalable software products, full-stack digital solutions, and developer infrastructure." },
      badge: { type: String, default: "Technology • Products • Ecosystem" },
    },

    // Section 02: At a Glance
    overview: {
      companyType: { type: String, default: "Technology Ecosystem & Software Products Company" },
      focus: { type: String, default: "SaaS Platforms, Digital Infrastructure & Bespoke Engineering" },
      model: { type: String, default: "Product-First Engineering & Dedicated Pods" },
      orientation: { type: String, default: "Multi-Tenant Architecture, Edge Telemetry & High Availability" },
      points: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
        },
      ],
    },

    // Section 03: Company Story
    story: {
      title: { type: String, default: "From Custom Engineering to a Connected Product Ecosystem" },
      introduction: { type: String, default: "DevSamp began as an agile software engineering pod helping ambitious teams ship digital products. As our architectures matured, we recognized that businesses don't just need isolated projects—they need compounding software assets and interconnected ecosystems." },
      chapters: [
        {
          year: { type: String },
          title: { type: String },
          description: { type: String },
          highlight: { type: String },
          order: { type: Number, default: 0 },
        },
      ],
    },

    // Section 04: Founders
    founders: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        bio: { type: String },
        image: { type: String },
        quote: { type: String },
        expertise: [{ type: String }],
        socialLinks: {
          linkedin: { type: String },
          twitter: { type: String },
          github: { type: String },
          email: { type: String },
        },
        order: { type: Number, default: 0 },
        status: { type: String, default: "published" },
      },
    ],

    // Section 06: Mission
    mission: {
      title: { type: String, default: "Our Mission" },
      statement: { type: String, default: "To engineer scalable software products and resilient digital infrastructure that empower businesses to compound digital value." },
      description: { type: String, default: "We eliminate technical debt and execution friction by unifying SaaS products, bespoke engineering pods, and open developer protocols under one reliable ecosystem." },
      visualBadge: { type: String, default: "Operational Focus" },
    },

    // Section 07: Vision
    vision: {
      title: { type: String, default: "Our Vision" },
      statement: { type: String, default: "To become the global technology operating system for modern high-growth enterprises." },
      presentState: { type: String, default: "Operating 4 flagship vertical SaaS platforms and deploying custom engineering solutions." },
      buildingState: { type: String, default: "Unifying API gateways, multi-tenant boilerplate foundations, and autonomous workflow nodes." },
      futureState: { type: String, default: "A global interconnected developer and product ecosystem powering mission-critical commerce, healthcare, and finance." },
    },

    // Section 08: Long-term Direction & Pillars
    visionPillars: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String },
        badge: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 10: Capabilities
    capabilities: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String },
        category: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 11: Engineering Philosophy
    engineeringPrinciples: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String },
        badge: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 12: Technology Approach
    technologyApproach: {
      title: { type: String, default: "Our Approach to Technology Selection" },
      description: { type: String, default: "We select technologies based on production stability, developer velocity, type safety, and real-world scalability rather than fleeting trends." },
      pillars: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
        },
      ],
    },

    // Section 14: Milestones
    milestones: [
      {
        year: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        badge: { type: String },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 15 & 16: Culture & Community
    culture: {
      title: { type: String, default: "Our Culture & DNA" },
      description: { type: String, default: "We foster an environment of radical ownership, engineering excellence, transparent communication, and continuous learning." },
      values: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
        },
      ],
    },

    community: {
      title: { type: String, default: "Community & Ecosystem Impact" },
      description: { type: String, default: "Sharing open-source components, technical devlogs, and architectural patterns with the global developer community." },
      initiatives: [
        {
          title: { type: String },
          description: { type: String },
          link: { type: String },
        },
      ],
    },

    // Section 17: Careers
    careers: {
      title: { type: String, default: "Build the Future with Us" },
      description: { type: String, default: "We are always looking for passionate product engineers, UI architects, and systems thinkers to join our distributed team." },
      cultureStatement: { type: String, default: "Autonomous pods, async-first workflows, and high ownership." },
      ctaText: { type: String, default: "Get in Touch with Founders" },
      ctaLink: { type: String, default: "/#contact" },
      openPositionsCount: { type: Number, default: 0 },
    },

    // Section 18: About FAQ
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        order: { type: Number, default: 0 },
      },
    ],

    // Section 19: Final CTA
    finalCta: {
      title: { type: String, default: "Ready to collaborate with DevSamp?" },
      description: { type: String, default: "Explore our software products, commission a custom engineering pod, or connect directly with our architectural leads." },
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

export default mongoose.models.AboutPage || mongoose.model("AboutPage", AboutPageSchema);
