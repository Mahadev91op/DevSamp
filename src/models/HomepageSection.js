import mongoose from "mongoose";

const HomepageSectionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "Section key is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    badge: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    ctaText: {
      type: String,
      default: "",
    },
    ctaLink: {
      type: String,
      default: "",
    },
    secondaryCtaText: {
      type: String,
      default: "",
    },
    secondaryCtaLink: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
    settings: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

HomepageSectionSchema.index({ order: 1, isActive: 1 });

export default mongoose.models.HomepageSection || mongoose.model("HomepageSection", HomepageSectionSchema);
