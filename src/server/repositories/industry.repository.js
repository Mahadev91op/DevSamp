import connectDB from "@/lib/db";
import Industry from "@/models/Industry";

export class IndustryRepository {
  static async findAll(filter = {}, sort = { order: 1, createdAt: -1 }, limit = null) {
    await connectDB();
    let queryFilter = { isActive: { $ne: false } };
    let querySort = sort;
    let queryLimit = limit;

    if (filter && typeof filter === "object") {
      if ("limit" in filter && typeof filter.limit === "number") {
        queryLimit = filter.limit;
        const { limit: _, sort: optSort, ...rest } = filter;
        if (optSort) querySort = optSort;
        Object.assign(queryFilter, rest);
      } else {
        Object.assign(queryFilter, filter);
      }
    }

    let query = Industry.find(queryFilter).sort(querySort);
    if (queryLimit) query = query.limit(queryLimit);
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
