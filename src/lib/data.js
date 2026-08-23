import connectDB from "@/lib/db";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Review from "@/models/Review";
import Pricing from "@/models/Pricing";
import Service from "@/models/Service";
import Product from "@/models/Product";
import EcosystemItem from "@/models/EcosystemItem";
import Industry from "@/models/Industry";
import CaseStudy from "@/models/CaseStudy";
import HomepageSection from "@/models/HomepageSection";
import SiteSetting from "@/models/SiteSetting";

// In-Memory Fast Cache with 60s TTL for sub-millisecond responses
const cacheStore = new Map();
const CACHE_TTL_MS = 60 * 1000;

function getCachedData(key) {
  const item = cacheStore.get(key);
  if (item && Date.now() - item.timestamp < CACHE_TTL_MS) {
    return item.data;
  }
  return null;
}

function setCachedData(key, data) {
  cacheStore.set(key, { data, timestamp: Date.now() });
}

export async function getProjects(limit = 6) {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 }).limit(limit).lean();
    return JSON.parse(JSON.stringify(projects || []));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getBlogs(limit = 3) {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(limit).lean();
    return JSON.parse(JSON.stringify(blogs || []));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function getReviews(limit = 10) {
  try {
    await connectDB();
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(limit).lean();
    return JSON.parse(JSON.stringify(reviews || []));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export async function getPricing() {
  try {
    await connectDB();
    const plans = await Pricing.find().sort({ priceMonthly: 1 }).lean();
    return JSON.parse(JSON.stringify(plans || []));
  } catch (error) {
    console.error("Error fetching pricing:", error);
    return [];
  }
}

export async function getServices(limit = null) {
  try {
    await connectDB();
    let query = Service.find().sort({ order: 1, createdAt: -1 });
    if (limit) query = query.limit(limit);
    const services = await query.lean();
    return JSON.parse(JSON.stringify(services || []));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

/**
 * Fetch featured products for homepage (controlled subset)
 */
export async function getProducts(query = {}, limit = 6) {
  try {
    await connectDB();
    const filter = { isActive: { $ne: false }, ...query };
    const products = await Product.find(filter)
      .select("name slug tagline description category status featured logoIcon gradient capabilities pricingSnippet productUrl docsUrl version order")
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .lean();
    return JSON.parse(JSON.stringify(products || []));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Fetch all products with pagination and category search for /products listing page
 */
export async function getPaginatedProducts({ page = 1, limit = 12, category = "All", search = "" } = {}) {
  try {
    await connectDB();
    const filter = { isActive: { $ne: false } };
    if (category && category !== "All") {
      filter.category = category;
    }
    if (search && search.trim()) {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { tagline: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const skip = (Math.max(1, page) - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    return {
      products: JSON.parse(JSON.stringify(products || [])),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    return { products: [], meta: { total: 0, page: 1, limit: 12, totalPages: 1 } };
  }
}

export async function getEcosystemItems() {
  try {
    await connectDB();
    const items = await EcosystemItem.find({ isActive: { $ne: false } })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return JSON.parse(JSON.stringify(items || []));
  } catch (error) {
    console.error("Error fetching ecosystem items:", error);
    return [];
  }
}

export async function getIndustries(limit = 8) {
  try {
    await connectDB();
    const industries = await Industry.find({ isActive: { $ne: false } })
      .sort({ order: 1, createdAt: 1 })
      .limit(limit)
      .lean();
    return JSON.parse(JSON.stringify(industries || []));
  } catch (error) {
    console.error("Error fetching industries:", error);
    return [];
  }
}

export async function getCaseStudies(limit = 6) {
  try {
    await connectDB();
    const caseStudies = await CaseStudy.find({ isActive: { $ne: false } })
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .lean();
    return JSON.parse(JSON.stringify(caseStudies || []));
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}

export async function getHomepageSections() {
  try {
    await connectDB();
    const sections = await HomepageSection.find().sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(sections || []));
  } catch (error) {
    console.error("Error fetching homepage sections:", error);
    return [];
  }
}

export async function getSiteSettings() {
  try {
    await connectDB();
    const setting = await SiteSetting.findOne({ key: "main" }).lean();
    if (setting) return JSON.parse(JSON.stringify(setting));
    return null;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

// Unified parallel aggregate for homepage rendering with in-memory caching
export async function getHomepageData() {
  const cached = getCachedData("homepage_data");
  if (cached) return cached;

  try {
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
      blogs,
      projects
    ] = await Promise.all([
      HomepageSection.find().sort({ order: 1 }).lean(),
      SiteSetting.findOne({ key: "main" }).lean(),
      Product.find({ isActive: { $ne: false } }).limit(6).sort({ order: 1 }).lean(),
      Service.find().limit(6).sort({ order: 1 }).lean(),
      EcosystemItem.find({ isActive: { $ne: false } }).sort({ order: 1 }).lean(),
      Industry.find({ isActive: { $ne: false } }).limit(4).sort({ order: 1 }).lean(),
      CaseStudy.find({ isActive: { $ne: false } }).limit(3).sort({ order: 1 }).lean(),
      Review.find().sort({ createdAt: -1 }).limit(10).lean(),
      Blog.find().sort({ createdAt: -1 }).limit(3).lean(),
      Project.find().sort({ createdAt: -1 }).limit(6).lean()
    ]);

    const result = {
      sections: JSON.parse(JSON.stringify(sections || [])),
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
      ecosystemItems: JSON.parse(JSON.stringify(ecosystemItems || [])),
      industries: JSON.parse(JSON.stringify(industries || [])),
      caseStudies: JSON.parse(JSON.stringify(caseStudies || [])),
      reviews: JSON.parse(JSON.stringify(reviews || [])),
      blogs: JSON.parse(JSON.stringify(blogs || [])),
      projects: JSON.parse(JSON.stringify(projects || []))
    };

    setCachedData("homepage_data", result);
    return result;
  } catch (error) {
    console.error("Error aggregating homepage data:", error);
    return {
      sections: [],
      settings: null,
      products: [],
      services: [],
      ecosystemItems: [],
      industries: [],
      caseStudies: [],
      reviews: [],
      blogs: [],
      projects: []
    };
  }
}

/**
 * Unified parallel aggregate for About page rendering with in-memory caching
 */
export async function getAboutData() {
  const cached = getCachedData("about_data");
  if (cached) return cached;

  try {
    await connectDB();
    const AboutPage = (await import("@/models/AboutPage")).default;
    const Team = (await import("@/models/Team")).default;

    const [aboutDoc, settings, teamMembers, industries, products, services] = await Promise.all([
      AboutPage.findOne({ key: "main", status: { $ne: "draft" } }).lean(),
      SiteSetting.findOne({ key: "main" }).lean(),
      Team.find().sort({ createdAt: 1 }).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).lean(),
      Product.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(4).lean(),
      Service.find().sort({ order: 1 }).limit(6).lean(),
    ]);

    const result = {
      about: aboutDoc ? JSON.parse(JSON.stringify(aboutDoc)) : null,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      teamMembers: JSON.parse(JSON.stringify(teamMembers || [])),
      industries: JSON.parse(JSON.stringify(industries || [])),
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
    };

    setCachedData("about_data", result);
    return result;
  } catch (error) {
    console.error("Error aggregating about page data:", error);
    return {
      about: null,
      settings: null,
      teamMembers: [],
      industries: [],
      products: [],
      services: [],
    };
  }
}

/**
 * Unified parallel aggregate for Vision page rendering with in-memory caching
 */
export async function getVisionData() {
  const cached = getCachedData("vision_data");
  if (cached) return cached;

  try {
    await connectDB();
    const VisionPage = (await import("@/models/VisionPage")).default;

    const [visionDoc, settings, industries, products, services] = await Promise.all([
      VisionPage.findOne({ key: "main", status: { $ne: "draft" } }).lean(),
      SiteSetting.findOne({ key: "main" }).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).lean(),
      Product.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(6).lean(),
      Service.find().sort({ order: 1 }).limit(6).lean(),
    ]);

    const result = {
      vision: visionDoc ? JSON.parse(JSON.stringify(visionDoc)) : null,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      industries: JSON.parse(JSON.stringify(industries || [])),
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
    };

    setCachedData("vision_data", result);
    return result;
  } catch (error) {
    console.error("Error aggregating vision page data:", error);
    return {
      vision: null,
      settings: null,
      industries: [],
      products: [],
      services: [],
    };
  }
}

/**
 * Unified parallel aggregate for Mission page rendering with in-memory caching
 */
export async function getMissionData() {
  const cached = getCachedData("mission_data");
  if (cached) return cached;

  try {
    await connectDB();
    const MissionPage = (await import("@/models/MissionPage")).default;
    const CaseStudy = (await import("@/models/CaseStudy")).default;

    const [missionDoc, settings, industries, products, services, caseStudies] = await Promise.all([
      MissionPage.findOne({ key: "main", status: { $ne: "draft" } }).lean(),
      SiteSetting.findOne({ key: "main" }).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).lean(),
      Product.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(6).lean(),
      Service.find().sort({ order: 1 }).limit(6).lean(),
      CaseStudy.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(4).lean(),
    ]);

    const result = {
      mission: missionDoc ? JSON.parse(JSON.stringify(missionDoc)) : null,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      industries: JSON.parse(JSON.stringify(industries || [])),
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
      caseStudies: JSON.parse(JSON.stringify(caseStudies || [])),
    };

    setCachedData("mission_data", result);
    return result;
  } catch (error) {
    console.error("Error aggregating mission page data:", error);
    return {
      mission: null,
      settings: null,
      industries: [],
      products: [],
      services: [],
      caseStudies: [],
    };
  }
}