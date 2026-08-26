import connectDB from "@/lib/db";
import Service from "@/models/Service";

export class ServiceRepository {
  static async findAll(filter = {}, sort = { order: 1, createdAt: -1 }, limit = null) {
    await connectDB();
    let query = Service.find({ isActive: { $ne: false }, ...filter }).sort(sort);
    if (limit) query = query.limit(limit);
    return await query.lean();
  }

  static async findBySlug(slug) {
    await connectDB();
    return await Service.findOne({ slug, isActive: { $ne: false } }).lean();
  }

  static async findById(id) {
    await connectDB();
    return await Service.findById(id).lean();
  }

  static async create(data) {
    await connectDB();
    return await Service.create(data);
  }

  static async updateById(id, data) {
    await connectDB();
    return await Service.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteById(id) {
    await connectDB();
    return await Service.findByIdAndDelete(id);
  }
}
