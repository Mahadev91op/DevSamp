import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true }, // e.g., "Web App", "E-Commerce"
    image: { type: String, required: true }, // Image URL
    tech: { type: [String], required: true }, // Array like ["Next.js", "Tailwind"]
    link: { type: String, default: "#" }, // Project Link
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);