import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "SaaS" }, // e.g. "ERP", "CRM", "DevTools", "AI", "Finance"
    status: { type: String, default: "Live" }, // "Live", "Beta", "Coming Soon"
    featured: { type: Boolean, default: true },
    logoIcon: { type: String, default: "Boxes" }, // Lucide icon name
    image: { type: String, default: "" },
    capabilities: { type: [String], default: [] },
    pricingSnippet: { type: String, default: "" },
    productUrl: { type: String, default: "#" },
    docsUrl: { type: String, default: "#" },
    gradient: { type: String, default: "from-blue-600 to-indigo-600" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
