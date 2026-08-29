import connectDB from "@/lib/db";
import CustomerPage from "@/models/CustomerPage";

export class CustomerPageRepository {
  /**
   * Get the active published Customer page document
   */
  static async getPublishedCustomerPageContent() {
    await connectDB();
    const doc = await CustomerPage.findOne({ key: "main", status: { $ne: "draft" } }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Get content by key
   */
  static async getByKey(key = "main") {
    await connectDB();
    const doc = await CustomerPage.findOne({ key }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  /**
   * Upsert Customer page content
   */
  static async upsertCustomerPageContent(data, key = "main") {
    await connectDB();
    return await CustomerPage.findOneAndUpdate(
      { key },
      { $set: data },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
}
