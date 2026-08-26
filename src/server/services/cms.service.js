import { ProductRepository } from "@/server/repositories/product.repository";
import { EcosystemRepository } from "@/server/repositories/ecosystem.repository";
import { SectionRepository } from "@/server/repositories/section.repository";
import { AboutRepository } from "@/server/repositories/about.repository";
import { VisionRepository } from "@/server/repositories/vision.repository";
import { MissionRepository } from "@/server/repositories/mission.repository";
import { EcosystemPageRepository } from "@/server/repositories/ecosystem-page.repository";
import { WhyDevSampRepository } from "@/server/repositories/why-devsamp.repository";
import connectDB from "@/lib/db";
import SiteSetting from "@/models/SiteSetting";
import Industry from "@/models/Industry";
import CaseStudy from "@/models/CaseStudy";
import Review from "@/models/Review";
import Blog from "@/models/Blog";
import Service from "@/models/Service";
import Team from "@/models/Team";

export class CmsService {
  /**
   * Aggregate complete homepage payload
   */
  static async getHomepagePayload() {
    await connectDB();
    const [
      sections,
      settings,
      products,
      services,
      ecosystemItems,
      industries,
      caseStudies,
      reviews,
      blogs
    ] = await Promise.all([
      SectionRepository.findAll(),
      SiteSetting.findOne({ key: "main" }).lean(),
      ProductRepository.findAll(),
      Service.find().sort({ order: 1 }).lean(),
      EcosystemRepository.findAll(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).lean(),
      CaseStudy.find({ isActive: { $ne: false } }).sort({ order: 1 }).lean(),
      Review.find().sort({ createdAt: -1 }).limit(10).lean(),
      Blog.find().sort({ createdAt: -1 }).limit(3).lean()
    ]);

    return {
      sections: JSON.parse(JSON.stringify(sections || [])),
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
      ecosystemItems: JSON.parse(JSON.stringify(ecosystemItems || [])),
      industries: JSON.parse(JSON.stringify(industries || [])),
      caseStudies: JSON.parse(JSON.stringify(caseStudies || [])),
      reviews: JSON.parse(JSON.stringify(reviews || [])),
      blogs: JSON.parse(JSON.stringify(blogs || []))
    };
  }

  /**
   * Aggregate complete About page payload
   */
  static async getAboutPayload() {
    await connectDB();
    const [aboutDoc, settings, teamMembers, industries, products, services] = await Promise.all([
      AboutRepository.getPublishedAboutContent(),
      SiteSetting.findOne({ key: "main" }).lean(),
      Team.find().sort({ createdAt: 1 }).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).lean(),
      ProductRepository.findAll({ limit: 4 }),
      Service.find().sort({ order: 1 }).limit(6).lean()
    ]);

    return {
      about: aboutDoc || null,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      teamMembers: JSON.parse(JSON.stringify(teamMembers || [])),
      industries: JSON.parse(JSON.stringify(industries || [])),
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || []))
    };
  }

  /**
   * Aggregate complete Vision page payload
   */
  static async getVisionPayload() {
    await connectDB();
    const [visionDoc, settings, industries, products, services] = await Promise.all([
      VisionRepository.getPublishedVisionContent(),
      SiteSetting.findOne({ key: "main" }).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).lean(),
      ProductRepository.findAll({ limit: 6 }),
      Service.find().sort({ order: 1 }).limit(6).lean()
    ]);

    return {
      vision: visionDoc || null,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      industries: JSON.parse(JSON.stringify(industries || [])),
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || []))
    };
  }

  /**
   * Aggregate complete Mission page payload
   */
  static async getMissionPayload() {
    await connectDB();
    const [missionDoc, settings, industries, products, services, caseStudies] = await Promise.all([
      MissionRepository.getPublishedMissionContent(),
      SiteSetting.findOne({ key: "main" }).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).lean(),
      ProductRepository.findAll({ limit: 6 }),
      Service.find().sort({ order: 1 }).limit(6).lean(),
      CaseStudy.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(4).lean()
    ]);

    return {
      mission: missionDoc || null,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      industries: JSON.parse(JSON.stringify(industries || [])),
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
      caseStudies: JSON.parse(JSON.stringify(caseStudies || []))
    };
  }

  /**
   * Aggregate complete Ecosystem page payload
   */
  static async getEcosystemPayload() {
    await connectDB();
    const [
      ecosystemDoc,
      settings,
      ecosystemNodes,
      products,
      services,
      industries,
      caseStudies
    ] = await Promise.all([
      EcosystemPageRepository.getPublishedEcosystemContent(),
      SiteSetting.findOne({ key: "main" }).lean(),
      EcosystemRepository.findAll(),
      ProductRepository.findAll({ limit: 6 }),
      Service.find().sort({ order: 1 }).limit(6).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).lean(),
      CaseStudy.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(4).lean(),
    ]);

    return {
      ecosystem: ecosystemDoc || null,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      ecosystemNodes: JSON.parse(JSON.stringify(ecosystemNodes || [])),
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
      industries: JSON.parse(JSON.stringify(industries || [])),
      caseStudies: JSON.parse(JSON.stringify(caseStudies || [])),
    };
  }

  /**
   * Aggregate complete Why DevSamp page payload
   */
  static async getWhyDevSampPayload() {
    await connectDB();
    const [
      whyDoc,
      settings,
      products,
      services,
      industries,
      caseStudies
    ] = await Promise.all([
      WhyDevSampRepository.getPublishedWhyContent(),
      SiteSetting.findOne({ key: "main" }).lean(),
      ProductRepository.findAll({ limit: 6 }),
      Service.find().sort({ order: 1 }).limit(6).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).lean(),
      CaseStudy.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(4).lean(),
    ]);

    return {
      whyData: whyDoc || null,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
      industries: JSON.parse(JSON.stringify(industries || [])),
      caseStudies: JSON.parse(JSON.stringify(caseStudies || [])),
    };
  }

  static async getFeaturedProducts() {
    return await ProductRepository.findAll({ featured: true });
  }

  static async getEcosystemTopology() {
    return await EcosystemRepository.findAll();
  }
}
