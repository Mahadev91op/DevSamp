import mongoose from "mongoose";

const PricingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // e.g. "Starter", "Pro", "Enterprise"
    slug: { type: String, lowercase: true, trim: true },
    desc: { type: String, required: true },
    description: { type: String }, // Alternate long description
    priceMonthly: { type: String, required: true },
    priceYearly: { type: String, required: true },
    currency: { type: String, default: "$" },
    billingInterval: { type: String, default: "monthly", enum: ["monthly", "yearly", "one-time", "custom"] },
    pricingType: { 
      type: String, 
      default: "Tiered",
      enum: ["Tiered", "Fixed", "Hourly", "Custom", "Contact", "SaaS"] 
    },
    category: { 
      type: String, 
      default: "Products",
      enum: ["All", "Products", "Services", "Custom Solutions", "General"] 
    },
    features: { type: [String], required: true, default: [] }, // Array of included features
    missing: { type: [String], default: [] }, // Array of excluded / missing features
    popular: { type: Boolean, default: false }, // Highlight card
    featured: { type: Boolean, default: false }, // Alias for popular
    gradient: { type: String, default: "from-blue-600 to-indigo-600" }, // CSS gradient classes
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product",
      default: null 
    },
    service: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Service",
      default: null 
    },
    ctaText: { type: String, default: "Deploy Config" },
    ctaLink: { type: String, default: "/#contact" },
    notes: { type: String, default: "" },
    order: { type: Number, default: 0 },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    isActive: { type: Boolean, default: true },
    isDemo: { type: Boolean, default: false },
  },
  { timestamps: true }
);

PricingSchema.index({ isActive: 1, order: 1 });
PricingSchema.index({ status: 1 });
PricingSchema.index({ popular: 1 });

export default mongoose.models.Pricing || mongoose.model("Pricing", PricingSchema);