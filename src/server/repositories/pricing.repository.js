import connectDB from "@/lib/db";
import Pricing from "@/models/Pricing";

export class PricingRepository {
  /**
   * Find all active pricing plans with optional category and populated references
   */
  static async findAll(filter = {}, sort = { order: 1, priceMonthly: 1 }, limit = null) {
    await connectDB();
    let queryFilter = { isActive: { $ne: false }, status: { $ne: "draft" } };
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

    let query = Pricing.find(queryFilter)
      .populate("product", "name slug category status logoIcon gradient")
      .populate("service", "title name slug category icon gradient")
      .sort(querySort);

    if (queryLimit) query = query.limit(queryLimit);
    return await query.lean();
  }

  static async findById(id) {
    await connectDB();
    return await Pricing.findById(id)
      .populate("product", "name slug category status logoIcon gradient")
      .populate("service", "title name slug category icon gradient")
      .lean();
  }

  static async create(data) {
    await connectDB();
    return await Pricing.create(data);
  }

  static async updateById(id, data) {
    await connectDB();
    return await Pricing.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteById(id) {
    await connectDB();
    return await Pricing.findByIdAndDelete(id);
  }
}
