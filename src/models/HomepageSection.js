import mongoose from "mongoose";

const HomepageSectionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g. "hero", "ecosystem-intro", "featured-products", "services", "ecosystem-map", "why-devsamp", "industries", "case-studies", "developers", "trust", "testimonials", "latest-updates", "faq", "final-cta"
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    badge: { type: String, default: "" },
    description: { type: String, default: "" },
    ctaText: { type: String, default: "" },
    ctaLink: { type: String, default: "" },
    secondaryCtaText: { type: String, default: "" },
    secondaryCtaLink: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    settings: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.models.HomepageSection || mongoose.model("HomepageSection", HomepageSectionSchema);
