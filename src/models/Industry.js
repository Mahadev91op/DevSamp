import mongoose from "mongoose";

const IndustrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Industry name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    summary: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "Building2",
    },
    badge: {
      type: String,
      default: "Industry",
    },
    useCases: {
      type: [String],
      default: [],
    },
    relatedProducts: {
      type: [String], // Array of product names or slugs
      default: [],
    },
    relatedServices: {
      type: [String],
      default: [],
    },
    linkUrl: {
      type: String,
      default: "/#contact",
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

IndustrySchema.index({ isActive: 1, order: 1 });
IndustrySchema.index({ isDemo: 1 });

export default mongoose.models.Industry || mongoose.model("Industry", IndustrySchema);
