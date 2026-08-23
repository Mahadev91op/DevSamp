import mongoose from "mongoose";

const CaseStudyMetricSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const CaseStudySchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      default: "Technology",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    problem: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      required: true,
    },
    metrics: {
      type: [CaseStudyMetricSchema],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    link: {
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

CaseStudySchema.index({ isActive: 1, order: 1 });
CaseStudySchema.index({ featured: 1, isActive: 1 });
CaseStudySchema.index({ isDemo: 1 });

export default mongoose.models.CaseStudy || mongoose.model("CaseStudy", CaseStudySchema);
