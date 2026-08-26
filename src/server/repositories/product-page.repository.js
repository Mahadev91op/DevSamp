import connectDB from "@/lib/db";
import ProductPage from "@/models/ProductPage";

export class ProductPageRepository {
  /**
   * Get the active published Product page document
   */
  static async getPublishedProductPageContent() {
    await connectDB();
    const doc = await ProductPage.findOne({ key: "main", status: { $ne: "draft" } }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Get content by key
   */
  static async getByKey(key = "main") {
    await connectDB();
    const doc = await ProductPage.findOne({ key }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Upsert Product page content
   */
  static async upsertProductPageContent(data, key = "main") {
    await connectDB();
    return await ProductPage.findOneAndUpdate(
      { key },
      { $set: data },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
}
