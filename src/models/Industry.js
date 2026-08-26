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
    tagline: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "Building2",
    },
    badge: {
      type: String,
      default: "Industry",
    },
    category: {
      type: String,
      default: "Enterprise",
    },
    challenges: [
      {
        title: { type: String },
        desc: { type: String },
      }
    ],
    solutionAreas: {
      type: [String],
      default: [],
    },
    useCases: {
      type: [String],
      default: [],
    },
    capabilities: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    relatedProducts: {
      type: [String], // Array of product names or slugs
      default: [],
    },
    relatedServices: {
      type: [String], // Array of service names or slugs
      default: [],
    },
    caseStudyCount: {
      type: Number,
      default: 0,
    },
    linkUrl: {
      type: String,
      default: "/#contact",
    },
    featured: {
      type: Boolean,
      default: false,
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
IndustrySchema.index({ featured: 1, isActive: 1 });
IndustrySchema.index({ isDemo: 1 });

export default mongoose.models.Industry || mongoose.model("Industry", IndustrySchema);
