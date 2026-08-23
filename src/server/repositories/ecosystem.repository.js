import connectDB from "@/lib/db";
import EcosystemItem from "@/models/EcosystemItem";

export class EcosystemRepository {
  static async findAll(filter = {}, sort = { order: 1, createdAt: 1 }) {
    await connectDB();
    return await EcosystemItem.find({ isActive: { $ne: false }, ...filter }).sort(sort).lean();
  }

  static async findByNodeId(nodeId) {
    await connectDB();
    return await EcosystemItem.findOne({ nodeId, isActive: { $ne: false } }).lean();
  }

  static async create(data) {
    await connectDB();
    return await EcosystemItem.create(data);
  }

  static async updateByNodeId(nodeId, data) {
    await connectDB();
    return await EcosystemItem.findOneAndUpdate({ nodeId }, data, { new: true });
  }

  static async deleteById(id) {
    await connectDB();
    return await EcosystemItem.findByIdAndDelete(id);
  }
}
