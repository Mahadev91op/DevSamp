import mongoose from "mongoose";

const SiteSettingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    siteName: { type: String, default: "DevSamp" },
    tagline: { type: String, default: "Technology • Software Products • SaaS • Digital Ecosystem" },
    contactEmail: { type: String, default: "devsamp1st@gmail.com" },
    contactPhone: { type: String, default: "+91 9330680642" },
    address: { type: String, default: "India" },
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    heroEyebrow: { type: String, default: "Technology • Software Products • Ecosystem" },
    heroTitle: { type: String, default: "Building, Operating & Scaling Digital Ecosystems with Next-Gen Products & Engineering" },
    heroDescription: { type: String, default: "DevSamp is a software engineering company powering modern businesses with enterprise-grade SaaS products, cloud platforms, and bespoke technology services." },
    heroPrimaryCta: {
      text: { type: String, default: "Explore Products" },
      link: { type: String, default: "/#products" },
    },
    heroSecondaryCta: {
      text: { type: String, default: "Explore Ecosystem" },
      link: { type: String, default: "/#ecosystem" },
    },
    finalCtaTitle: { type: String, default: "Ready to build and scale your next venture?" },
    finalCtaDescription: { type: String, default: "Connect with our engineering team or explore our suite of software products to accelerate your digital future." },
    finalCtaPrimary: {
      text: { type: String, default: "Explore Ecosystem" },
      link: { type: String, default: "/#ecosystem" },
    },
    finalCtaSecondary: {
      text: { type: String, default: "Initialize Project" },
      link: { type: String, default: "/#contact" },
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSetting || mongoose.model("SiteSetting", SiteSettingSchema);
