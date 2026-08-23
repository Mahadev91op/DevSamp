import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
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
      required: [true, "Tagline is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: true,
      default: "SaaS",
      enum: ["SaaS", "Enterprise ERP", "Developer Tool", "Fintech", "HealthTech", "AI", "Infrastructure"],
    },
    status: {
      type: String,
      enum: ["Live", "Beta", "Coming Soon", "Private Preview"],
      default: "Live",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    logoIcon: {
      type: String,
      default: "Boxes",
    },
    gradient: {
      type: String,
      default: "from-blue-600 to-indigo-600",
    },
    capabilities: {
      type: [String],
      default: [],
    },
    pricingSnippet: {
      type: String,
      default: "",
    },
    productUrl: {
      type: String,
      default: "",
    },
    docsUrl: {
      type: String,
      default: "",
    },
    version: {
      type: String,
      default: "v1.0.0",
    },
    releaseDate: {
      type: Date,
      default: Date.now,
    },
    tags: {
      type: [String],
      default: [],
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

// Optimize query performance
ProductSchema.index({ isActive: 1, order: 1 });
ProductSchema.index({ featured: 1, isActive: 1 });
ProductSchema.index({ isDemo: 1 });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
