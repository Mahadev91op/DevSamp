import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer or organization name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    logo: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
      trim: true,
    },
    shortDescription: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    industry: {
      type: String,
      default: "Enterprise",
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    relationshipType: {
      type: String,
      enum: [
        "Enterprise Platform",
        "Dedicated Pod",
        "Custom SaaS",
        "Commercial Software",
        "Strategic Technology Partner",
        "Active Client"
      ],
      default: "Enterprise Platform",
    },
    relatedProducts: {
      type: [String],
      default: [],
    },
    relatedServices: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    visibility: {
      type: String,
      enum: ["public", "private", "confidential"],
      default: "public",
    },
    status: {
      type: String,
      enum: ["active", "completed", "ongoing", "archived"],
      default: "active",
    },
    publicProfile: {
      type: Boolean,
      default: true,
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    since: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

CustomerSchema.index({ isActive: 1, visibility: 1, order: 1 });
CustomerSchema.index({ featured: 1, isActive: 1, visibility: 1 });
CustomerSchema.index({ isDemo: 1 });

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
