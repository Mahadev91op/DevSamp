import mongoose from "mongoose";

const IndustrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "Healthcare & Lifesciences"
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    icon: { type: String, default: "Building2" }, // Lucide icon name
    badge: { type: String, default: "Solution Suite" },
    useCases: { type: [String], default: [] },
    relatedProducts: { type: [String], default: [] },
    relatedServices: { type: [String], default: [] },
    linkUrl: { type: String, default: "#contact" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Industry || mongoose.model("Industry", IndustrySchema);
