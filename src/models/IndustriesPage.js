import mongoose from "mongoose";

const IndustriesPageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    isDemo: { type: Boolean, default: false },

    // Section 01: Hero
    hero: {
      eyebrow: { type: String, default: "DevSamp Industry Solutions" },
      title: { type: String, default: "Technology Solutions Shaped Around Real Industry Needs" },
      description: { type: String, default: "Adapting proprietary software products, bespoke engineering pods, and high-concurrency cloud architectures to the operational demands of specialized industries." },
      badge: { type: String, default: "Domain Engineering" },
      primaryCta: {
        text: { type: String, default: "Explore Industries" },
        link: { type: String, default: "#catalog" },
      },
      secondaryCta: {
        text: { type: String, default: "Discuss Your Sector" },
        link: { type: String, default: "/#contact" },
      },
    },

    // Section 02: Ecosystem Intro
    ecosystemIntro: {
      eyebrow: { type: String, default: "Domain Architecture" },
      title: { type: String, default: "Industry Context + Technical Rigor = Compounding Business Value" },
      description: { type: String, default: "We do not believe in one-size-fits-all generic platforms. Every industry solution is tailored to specific data schemas, workflow handoffs, and compliance boundaries." },
    },

    // Section 07: Solution Framework
    solutionFramework: {
      eyebrow: { type: String, default: "Engineering Framework" },
      title: { type: String, default: "Our 7-Stage Domain Adaptation Lifecycle" },
      description: { type: String, default: "How our senior architects transform complex industry friction points into resilient, automated software ecosystems." },
    },

    // Section 11: Delivery Approach
    deliveryApproach: {
      eyebrow: { type: String, default: "Domain Delivery" },
      title: { type: String, default: "Enterprise Delivery Grounded in Industry Reality" },
      description: { type: String, default: "From legacy database refactoring to real-time telemetry streaming and dedicated 24/7 SLA governance." },
    },

    // Section 13: Custom Industry CTA
    customSolutionCta: {
      eyebrow: { type: String, default: "Custom Sector Scoping" },
      title: { type: String, default: "Don't See Your Industry Listed?" },
      description: { type: String, default: "DevSamp specializes in architecting custom database models, API integrations, and intuitive interfaces for novel, emerging, and niche commercial sectors." },
      primaryText: { type: String, default: "Discuss Custom Requirement" },
      primaryLink: { type: String, default: "/#contact" },
      secondaryText: { type: String, default: "Explore Engineering Services" },
      secondaryLink: { type: String, default: "/services" },
    },

    // Section 14: FAQ
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        category: { type: String, default: "Industries" },
        order: { type: Number, default: 0 },
      }
    ],

    // Section 15: Final CTA
    finalCta: {
      eyebrow: { type: String, default: "Partner With DevSamp" },
      title: { type: String, default: "Let's Build Around Your Business Context" },
      description: { type: String, default: "Partner with an engineering team that understands real-world operational friction, data security, and long-term maintainability." },
      primaryText: { type: String, default: "Start an Industry Project" },
      primaryLink: { type: String, default: "/#contact" },
      secondaryText: { type: String, default: "Explore Products" },
      secondaryLink: { type: String, default: "/products" },
    },
  },
  { timestamps: true }
);

IndustriesPageSchema.index({ status: 1 });

export default mongoose.models.IndustriesPage || mongoose.model("IndustriesPage", IndustriesPageSchema);
