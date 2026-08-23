import connectDB from "@/lib/db";
import Product from "@/models/Product";

export class ProductRepository {
  static async findAll(filter = {}, sort = { order: 1, createdAt: -1 }, limit = null) {
    await connectDB();
    let query = Product.find({ isActive: { $ne: false }, ...filter }).sort(sort);
    if (limit) query = query.limit(limit);
    return await query.lean();
  }

  static async findBySlug(slug) {
    await connectDB();
    return await Product.findOne({ slug, isActive: { $ne: false } }).lean();
  }

  static async findById(id) {
    await connectDB();
    return await Product.findById(id).lean();
  }

  static async create(data) {
    await connectDB();
    return await Product.create(data);
  }

  static async updateById(id, data) {
    await connectDB();
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteById(id) {
    await connectDB();
    return await Product.findByIdAndDelete(id);
  }
}
