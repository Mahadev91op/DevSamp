import VisionPage from "@/models/VisionPage";
import connectDB from "@/lib/db";

export class VisionRepository {
  /**
   * Find published vision page document
   */
  static async getPublishedVisionContent() {
    await connectDB();
    const doc = await VisionPage.findOne({ key: "main", status: { $ne: "draft" } }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Find raw vision page doc by key (for admin / previews)
   */
  static async findByKey(key = "main") {
    await connectDB();
    const doc = await VisionPage.findOne({ key }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Update or create Vision page document
   */
  static async upsertVisionContent(data, key = "main") {
    await connectDB();
    const updated = await VisionPage.findOneAndUpdate(
      { key },
      { $set: data },
      { upsert: true, new: true, runValidators: true }
    ).lean();
    return JSON.parse(JSON.stringify(updated));
  }
}
