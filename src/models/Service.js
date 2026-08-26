import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String }, // Alias or alternate display name
    slug: { type: String, lowercase: true, trim: true },
    tagline: { type: String },
    desc: { type: String, required: true },
    description: { type: String },
    icon: { type: String, required: true, default: "Layers" }, // Lucide icon identifier
    color: { type: String, default: "text-blue-500" },
    gradient: { type: String, default: "from-blue-500 to-indigo-500" },
    category: { type: String, default: "Engineering" },
    capabilities: { type: [String], default: [] },
    features: { type: [String], default: [] },
    deliverables: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    industries: { type: [String], default: [] },
    pricingSnippet: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isDemo: { type: Boolean, default: false }
  },
  { timestamps: true }
);

ServiceSchema.index({ isActive: 1, order: 1 });
ServiceSchema.index({ featured: 1, isActive: 1 });

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);