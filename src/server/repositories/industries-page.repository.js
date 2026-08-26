import connectDB from "@/lib/db";
import IndustriesPage from "@/models/IndustriesPage";

export class IndustriesPageRepository {
  /**
   * Get the active published Industries page document
   */
  static async getPublishedIndustriesPageContent() {
    await connectDB();
    const doc = await IndustriesPage.findOne({ key: "main", status: { $ne: "draft" } }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Get content by key
   */
  static async getByKey(key = "main") {
    await connectDB();
    const doc = await IndustriesPage.findOne({ key }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Upsert Industries page content
   */
  static async upsertIndustriesPageContent(data, key = "main") {
    await connectDB();
    return await IndustriesPage.findOneAndUpdate(
      { key },
      { $set: data },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
}
