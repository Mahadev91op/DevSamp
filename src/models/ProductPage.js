import mongoose from "mongoose";

const ProductPageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    isDemo: { type: Boolean, default: false },

    // Section 01: Hero
    hero: {
      eyebrow: { type: String, default: "DevSamp Software Suite" },
      title: { type: String, default: "Proprietary SaaS Platforms & Enterprise Software Products" },
      description: { type: String, default: "Battle-tested vertical software applications engineered with multi-tenant database isolation, automated billing relays, and production-grade SLAs." },
      badge: { type: String, default: "Software Suite" },
      primaryCta: {
        text: { type: String, default: "Explore Products" },
        link: { type: String, default: "#catalog" },
      },
      secondaryCta: {
        text: { type: String, default: "Ecosystem Architecture" },
        link: { type: String, default: "/ecosystem" },
      },
    },

    // Section 02: Ecosystem Introduction
    ecosystemIntro: {
      eyebrow: { type: String, default: "Ecosystem Integration" },
      title: { type: String, default: "How DevSamp Products Connect to the Larger Platform" },
      description: { type: String, default: "Our products are not isolated silos. They build on our shared authentication engine, OpenAPI gateways, and event-driven webhook relays—enabling effortless customization by dedicated pods." },
    },

    // Section 08: Product Lifecycle & Philosophy
    lifecycle: {
      eyebrow: { type: String, default: "Product Engineering Philosophy" },
      title: { type: String, default: "From Real Business Friction to Live Production SaaS" },
      description: { type: String, default: "How we identify operational bottlenecks, design multi-tenant architectures, test in live environments, and roll continuous updates back to all users." },
      stages: [
        {
          stageNumber: { type: String },
          title: { type: String },
          description: { type: String },
          icon: { type: String },
          badge: { type: String },
        }
      ]
    },

    // Section 09: Custom Solution CTA
    customSolutionCta: {
      eyebrow: { type: String, default: "Bespoke Engineering" },
      title: { type: String, default: "Need Something Built Specifically for Your Operations?" },
      description: { type: String, default: "When off-the-shelf software doesn't fit 100% of your workflow, our dedicated engineering pods can customize our SaaS core or build a bespoke platform from scratch." },
      primaryText: { type: String, default: "Request Custom Pod Scope" },
      primaryLink: { type: String, default: "/services" },
      secondaryText: { type: String, default: "Schedule Discovery Call" },
      secondaryLink: { type: String, default: "/#contact" },
    },

    // Section 10: FAQ
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        category: { type: String, default: "General" },
        order: { type: Number, default: 0 },
      }
    ],

    // Section 11: Final CTA
    finalCta: {
      eyebrow: { type: String, default: "Deploy Today" },
      title: { type: String, default: "Ready to Deploy or Customize DevSamp Software?" },
      description: { type: String, default: "Explore our live platforms, request custom pod integration, or talk directly with our lead software architects." },
      primaryText: { type: String, default: "Initialize Discovery Pod" },
      primaryLink: { type: String, default: "/#contact" },
      secondaryText: { type: String, default: "Explore Engineering Services" },
      secondaryLink: { type: String, default: "/services" },
    },
  },
  {
    timestamps: true,
  }
);

ProductPageSchema.index({ status: 1 });

export default mongoose.models.ProductPage || mongoose.model("ProductPage", ProductPageSchema);
