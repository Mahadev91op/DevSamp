import mongoose from "mongoose";

const ConnectionSchema = new mongoose.Schema(
  {
    targetId: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      default: "connects_to",
      enum: ["integrates_with", "connects_to", "supported_by", "powers", "extends", "uses"],
    },
  },
  { _id: false }
);

const EcosystemItemSchema = new mongoose.Schema(
  {
    nodeId: {
      type: String,
      required: [true, "Node ID is required"],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["core", "product", "service", "developer", "integration", "customer", "support", "partner"],
      default: "product",
    },
    shortDesc: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "Cpu",
    },
    statusBadge: {
      type: String,
      default: "Active",
    },
    connections: {
      type: [ConnectionSchema],
      default: [],
    },
    metrics: {
      type: String,
      default: "99.9% Uptime",
    },
    color: {
      type: String,
      default: "from-blue-600 to-indigo-600",
    },
    linkUrl: {
      type: String,
      default: "/#ecosystem",
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

EcosystemItemSchema.index({ isActive: 1, order: 1 });
EcosystemItemSchema.index({ isDemo: 1 });

export default mongoose.models.EcosystemItem || mongoose.model("EcosystemItem", EcosystemItemSchema);
