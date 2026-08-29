import mongoose from "mongoose";

const ReviewSubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "Full-Stack Engineer" },
    company: { type: String, default: "Independent Builder" },
    rating: { type: Number, required: true, default: 5, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const SourceCodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ["Full-Stack SaaS", "Healthcare ERP", "POS & Commerce", "Boilerplates & Starters", "AI & Automation", "DevOps & Tools"],
      default: "Full-Stack SaaS",
      index: true
    },
    priceINR: { type: Number, required: true, default: 0, min: 0 },
    priceUSD: { type: Number, required: true, default: 0, min: 0 },
    originalPriceINR: { type: Number, default: 0 },
    originalPriceUSD: { type: Number, default: 0 },
    isFree: { type: Boolean, default: false, index: true },
    badge: { type: String, default: "NEW RELEASE" },
    version: { type: String, default: "v1.0.0" },
    techStack: { type: [String], default: [] },
    features: { type: [String], default: [] },
    includes: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    fileTree: { type: [String], default: [] },
    quickStartCommands: { type: [String], default: [] },
    reviews: { type: [ReviewSubSchema], default: [] },
    githubUrl: { type: String, required: true, trim: true },
    githubRepo: { type: String, default: "" },
    downloadUrl: { type: String, default: "" },
    liveDemoUrl: { type: String, default: "" },
    docsUrl: { type: String, default: "" },
    license: { type: String, default: "Commercial Developer License" },
    rating: { type: Number, default: 5.0, min: 1, max: 5 },
    reviewsCount: { type: Number, default: 12 },
    downloadsCount: { type: Number, default: 0 },
    starsCount: { type: Number, default: 0 },
    gradient: { type: String, default: "from-blue-600 via-indigo-600 to-cyan-500" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true }
  },
  { 
    timestamps: true 
  }
);

// Pre-save hook to ensure isFree matches price
SourceCodeSchema.pre("save", function(next) {
  if (this.priceINR === 0 && this.priceUSD === 0) {
    this.isFree = true;
  }
  next();
});

export default mongoose.models.SourceCode || mongoose.model("SourceCode", SourceCodeSchema);
