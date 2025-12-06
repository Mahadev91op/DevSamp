import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true }, // Image URL
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);