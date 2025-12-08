import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    image: { type: String, required: true }, // Thumbnail
    link: { type: String, required: true }, // Original Post Link
    platform: { type: String, default: "other" }, // youtube, instagram, etc.
    category: { type: String, default: "Update" },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);