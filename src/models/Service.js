import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String, required: true }, // Icon ka naam (e.g., "Monitor")
    color: { type: String, default: "text-blue-500" }, // Default color
    gradient: { type: String, default: "from-blue-500 to-cyan-500" } // Default gradient
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);