import connectDB from "@/lib/db";
import WhyDevSampPage from "@/models/WhyDevSampPage";

export class WhyDevSampRepository {
  /**
   * Get the active published Why DevSamp page document
   */
  static async getPublishedWhyContent() {
    await connectDB();
    const doc = await WhyDevSampPage.findOne({ key: "main", status: { $ne: "draft" } }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Get content by key
   */
  static async getByKey(key = "main") {
    await connectDB();
    const doc = await WhyDevSampPage.findOne({ key }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Upsert Why DevSamp page content
   */
  static async upsertWhyContent(data, key = "main") {
    await connectDB();
    return await WhyDevSampPage.findOneAndUpdate(
      { key },
      { $set: data },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
}
