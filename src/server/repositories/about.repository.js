import AboutPage from "@/models/AboutPage";
import connectDB from "@/lib/db";

export class AboutRepository {
  /**
   * Find published about page document
   */
  static async getPublishedAboutContent() {
    await connectDB();
    const doc = await AboutPage.findOne({ key: "main", status: { $ne: "draft" } }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Find raw about page doc by key (for admin / previews)
   */
  static async findByKey(key = "main") {
    await connectDB();
    const doc = await AboutPage.findOne({ key }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Update or create About page document
   */
  static async upsertAboutContent(data, key = "main") {
    await connectDB();
    const updated = await AboutPage.findOneAndUpdate(
      { key },
      { $set: data },
      { upsert: true, new: true, runValidators: true }
    ).lean();
    return JSON.parse(JSON.stringify(updated));
  }
}
