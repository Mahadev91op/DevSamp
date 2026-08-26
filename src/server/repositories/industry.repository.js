import connectDB from "@/lib/db";
import Industry from "@/models/Industry";

export class IndustryRepository {
  static async findAll(filter = {}, sort = { order: 1, createdAt: -1 }, limit = null) {
    await connectDB();
    let query = Industry.find({ isActive: { $ne: false }, ...filter }).sort(sort);
    if (limit) query = query.limit(limit);
    return await query.lean();
  }

  static async findBySlug(slug) {
    await connectDB();
    return await Industry.findOne({ slug, isActive: { $ne: false } }).lean();
  }

  static async findById(id) {
    await connectDB();
    return await Industry.findById(id).lean();
  }

  static async create(data) {
    await connectDB();
    return await Industry.create(data);
  }

  static async updateById(id, data) {
    await connectDB();
    return await Industry.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteById(id) {
    await connectDB();
    return await Industry.findByIdAndDelete(id);
  }
}
