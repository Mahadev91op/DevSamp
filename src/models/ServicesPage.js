import mongoose from "mongoose";

const ServicesPageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    isDemo: { type: Boolean, default: false },

    // Section 01: Hero
    hero: {
      eyebrow: { type: String, default: "DevSamp Engineering Services" },
      title: { type: String, default: "Bespoke Full-Stack Engineering & Digital Product Solutions" },
      description: { type: String, default: "Dedicated engineering pods building custom Next.js platforms, cloud edge architectures, and high-concurrency database systems with zero architectural debt." },
      badge: { type: String, default: "Engineering Pods" },
      primaryCta: {
        text: { type: String, default: "Explore Services" },
        link: { type: String, default: "#catalog" },
      },
      secondaryCta: {
        text: { type: String, default: "Schedule Discovery Call" },
        link: { type: String, default: "/#contact" },
      },
    },

    // Section 02: Services Philosophy
    philosophy: {
      eyebrow: { type: String, default: "Engineering Mindset" },
      title: { type: String, default: "Solving Real Business Friction Through Technical Rigor" },
      description: { type: String, default: "We treat custom client codebases with the same engineering discipline as our own SaaS platforms—guaranteeing 100% in-house craft and full IP ownership." },
    },

    // Section 07: Delivery Approach
    deliveryApproach: {
      eyebrow: { type: String, default: "Execution Methodology" },
      title: { type: String, default: "A Disciplined, Transparent Delivery Lifecycle" },
      description: { type: String, default: "From architectural discovery to live production deployment and 24/7 SLA guardianship." },
    },

    // Section 11: Engagement Models
    engagementModels: {
      eyebrow: { type: String, default: "Commercial Structure" },
      title: { type: String, default: "Flexible Engagement Models Tailored to Your Growth" },
      description: { type: String, default: "Whether you need a dedicated engineering pod or a milestone-based bespoke platform build." },
    },

    // Section 12: Custom Solution CTA
    customSolutionCta: {
      eyebrow: { type: String, default: "Tailored Architecture" },
      title: { type: String, default: "Don't See Exactly What You Need?" },
      description: { type: String, default: "DevSamp can combine frontend engineering, database partitioning, and API gateways to build custom software around your unique business requirement." },
      primaryText: { type: String, default: "Discuss Your Requirement" },
      primaryLink: { type: String, default: "/#contact" },
      secondaryText: { type: String, default: "Explore Products" },
      secondaryLink: { type: String, default: "/products" },
    },

    // Section 13: FAQ
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        category: { type: String, default: "Services" },
        order: { type: Number, default: 0 },
      }
    ],

    // Section 14: Final CTA
    finalCta: {
      eyebrow: { type: String, default: "Start Building" },
      title: { type: String, default: "Have a Technology Requirement?" },
      description: { type: String, default: "Partner with an engineering team that builds with high performance, clean documentation, and zero technical debt." },
      primaryText: { type: String, default: "Start a Project" },
      primaryLink: { type: String, default: "/#contact" },
      secondaryText: { type: String, default: "Explore SaaS Products" },
      secondaryLink: { type: String, default: "/products" },
    },
  },
  { timestamps: true }
);

ServicesPageSchema.index({ status: 1 });

export default mongoose.models.ServicesPage || mongoose.model("ServicesPage", ServicesPageSchema);
