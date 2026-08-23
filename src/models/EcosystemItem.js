import mongoose from "mongoose";

const EcosystemItemSchema = new mongoose.Schema(
  {
    nodeId: { type: String, required: true, unique: true }, // e.g. "products", "services", "developers"
    title: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ["core", "product", "service", "developer", "customer", "integration", "partner", "support"] 
    },
    shortDesc: { type: String, required: true },
    icon: { type: String, default: "Layers" }, // Lucide icon name
    statusBadge: { type: String, default: "Active" },
    connections: { type: [String], default: [] }, // Array of connected nodeIds
    linkUrl: { type: String, default: "#" },
    metrics: { type: String, default: "" }, // e.g. "99.9% SLA", "10+ Integrations"
    color: { type: String, default: "from-blue-500 to-indigo-500" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.EcosystemItem || mongoose.model("EcosystemItem", EcosystemItemSchema);
