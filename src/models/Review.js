import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "Client" }, // e.g. CEO, Customer
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    image: { type: String, default: "" }, // Optional avatar
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);