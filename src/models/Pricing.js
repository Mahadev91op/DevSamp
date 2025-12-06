import mongoose from "mongoose";

const PricingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "Starter"
    desc: { type: String, required: true },
    priceMonthly: { type: String, required: true },
    priceYearly: { type: String, required: true },
    features: { type: [String], required: true }, // Array of features
    missing: { type: [String], default: [] }, // Array of missing features
    popular: { type: Boolean, default: false }, // Highlight card
    gradient: { type: String, default: "from-gray-500 to-gray-700" } // CSS gradient classes
  },
  { timestamps: true }
);

export default mongoose.models.Pricing || mongoose.model("Pricing", PricingSchema);