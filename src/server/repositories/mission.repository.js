import MissionPage from "@/models/MissionPage";
import connectDB from "@/lib/db";

export class MissionRepository {
  /**
   * Find published mission page document
   */
  static async getPublishedMissionContent() {
    await connectDB();
    const doc = await MissionPage.findOne({ key: "main", status: { $ne: "draft" } }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Find raw mission page doc by key (for admin / previews)
   */
  static async findByKey(key = "main") {
    await connectDB();
    const doc = await MissionPage.findOne({ key }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Update or create Mission page document
   */
  static async upsertMissionContent(data, key = "main") {
    await connectDB();
    const updated = await MissionPage.findOneAndUpdate(
      { key },
      { $set: data },
      { upsert: true, new: true, runValidators: true }
    ).lean();
    return JSON.parse(JSON.stringify(updated));
  }
}
