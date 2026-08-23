import connectDB from "@/lib/db";
import HomepageSection from "@/models/HomepageSection";

export class SectionRepository {
  static async findAll() {
    await connectDB();
    return await HomepageSection.find().sort({ order: 1 }).lean();
  }

  static async findByKey(key) {
    await connectDB();
    return await HomepageSection.findOne({ key }).lean();
  }

  static async updateByKey(key, data) {
    await connectDB();
    return await HomepageSection.findOneAndUpdate({ key }, data, { new: true, upsert: true });
  }

  static async setSectionOrder(orderedKeys = []) {
    await connectDB();
    const updates = orderedKeys.map((key, index) =>
      HomepageSection.updateOne({ key }, { $set: { order: index + 1 } })
    );
    return await Promise.all(updates);
  }
}
