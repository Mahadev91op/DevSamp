import connectDB from "@/lib/db";
import PricingPage from "@/models/PricingPage";

export class PricingPageRepository {
  /**
   * Get the active published Pricing page document
   */
  static async getPublishedPricingPageContent() {
    await connectDB();
    const doc = await PricingPage.findOne({ key: "main", status: { $ne: "draft" } }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Get content by key
   */
  static async getByKey(key = "main") {
    await connectDB();
    const doc = await PricingPage.findOne({ key }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Upsert Pricing page content
   */
  static async upsertPricingPageContent(data, key = "main") {
    await connectDB();
    return await PricingPage.findOneAndUpdate(
      { key },
      { $set: data },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
}
