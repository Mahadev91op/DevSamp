import connectDB from "@/lib/db";
import ServicesPage from "@/models/ServicesPage";

export class ServicesPageRepository {
  /**
   * Get the active published Services page document
   */
  static async getPublishedServicesPageContent() {
    await connectDB();
    const doc = await ServicesPage.findOne({ key: "main", status: { $ne: "draft" } }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Get content by key
   */
  static async getByKey(key = "main") {
    await connectDB();
    const doc = await ServicesPage.findOne({ key }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Upsert Services page content
   */
  static async upsertServicesPageContent(data, key = "main") {
    await connectDB();
    return await ServicesPage.findOneAndUpdate(
      { key },
      { $set: data },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
}
