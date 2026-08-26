import connectDB from "@/lib/db";
import EcosystemPage from "@/models/EcosystemPage";

export class EcosystemPageRepository {
  /**
   * Get the active published ecosystem page document
   */
  static async getPublishedEcosystemContent() {
    await connectDB();
    const doc = await EcosystemPage.findOne({ key: "main", status: { $ne: "draft" } }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Get any ecosystem page content by key
   */
  static async getByKey(key = "main") {
    await connectDB();
    const doc = await EcosystemPage.findOne({ key }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Upsert ecosystem page content
   */
  static async upsertEcosystemContent(data, key = "main") {
    await connectDB();
    return await EcosystemPage.findOneAndUpdate(
      { key },
      { $set: data },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
}
