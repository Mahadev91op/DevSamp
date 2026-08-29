import connectDB from "@/lib/db";
import Customer from "@/models/Customer";

export class CustomerRepository {
  /**
   * Find all public active customers with safe projection
   */
  static async findAll(filter = {}, sort = { order: 1, createdAt: -1 }, limit = null) {
    await connectDB();
    let queryFilter = { 
      isActive: { $ne: false }, 
      visibility: "public",
      publicProfile: { $ne: false } 
    };
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

    let query = Customer.find(queryFilter)
      .select("name slug logo website shortDescription description industry location relationshipType relatedProducts relatedServices featured order since createdAt")
      .sort(querySort);

    if (queryLimit) query = query.limit(queryLimit);
    return await query.lean();
  }

  /**
   * Find a single public customer by slug
   */
  static async findBySlug(slug) {
    await connectDB();
    return await Customer.findOne({ 
      slug, 
      isActive: { $ne: false }, 
      visibility: "public",
      publicProfile: { $ne: false } 
    })
      .select("name slug logo website shortDescription description industry location relationshipType relatedProducts relatedServices featured order since createdAt")
      .lean();
  }

  /**
   * Find by ID (admin/internal usage)
   */
  static async findById(id) {
    await connectDB();
    return await Customer.findById(id).lean();
  }

  /**
   * Create a new customer document
   */
  static async create(data) {
    await connectDB();
    return await Customer.create(data);
  }

  /**
   * Update customer by ID
   */
  static async updateById(id, data) {
    await connectDB();
    return await Customer.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Delete customer by ID
   */
  static async deleteById(id) {
    await connectDB();
    return await Customer.findByIdAndDelete(id);
  }
}
