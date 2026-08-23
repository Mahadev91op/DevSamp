import mongoose from "mongoose";

const CaseStudySchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    industry: { type: String, required: true },
    title: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    outcome: { type: String, required: true },
    metrics: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    image: { type: String, default: "" },
    link: { type: String, default: "#" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.CaseStudy || mongoose.model("CaseStudy", CaseStudySchema);
