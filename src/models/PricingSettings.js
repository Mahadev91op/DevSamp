import mongoose from "mongoose";

const PricingSettingsSchema = new mongoose.Schema(
  {
    basePrice: { type: Number, required: true, default: 499 },
    pricePerPage: { type: Number, required: true, default: 50 },
    addons: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        enabled: { type: Boolean, default: true }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.PricingSettings || mongoose.model("PricingSettings", PricingSettingsSchema);
