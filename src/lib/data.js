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

/**
 * Unified parallel aggregate for Ecosystem page rendering with in-memory caching
 */
export async function getEcosystemData() {
  const cached = getCachedData("ecosystem_data");
  if (cached) return cached;

  try {
    await connectDB();
    const EcosystemPage = (await import("@/models/EcosystemPage")).default;
    const EcosystemItem = (await import("@/models/EcosystemItem")).default;

    const [ecosystemDoc, settings, ecosystemNodes, industries, products, services, caseStudies] = await Promise.all([
      EcosystemPage.findOne({ key: "main", status: { $ne: "draft" } }).lean(),
      SiteSetting.findOne({ key: "main" }).lean(),
      EcosystemItem.find({ isActive: { $ne: false } }).sort({ order: 1, createdAt: 1 }).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).lean(),
      Product.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(6).lean(),
      Service.find().sort({ order: 1 }).limit(6).lean(),
      CaseStudy.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(4).lean(),
    ]);

    const result = {
      ecosystem: ecosystemDoc ? JSON.parse(JSON.stringify(ecosystemDoc)) : null,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      ecosystemNodes: JSON.parse(JSON.stringify(ecosystemNodes || [])),
      industries: JSON.parse(JSON.stringify(industries || [])),
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
      caseStudies: JSON.parse(JSON.stringify(caseStudies || [])),
    };

    setCachedData("ecosystem_data", result);
    return result;
  } catch (error) {
    console.error("Error aggregating ecosystem page data:", error);
    return {
      ecosystem: null,
      settings: null,
      ecosystemNodes: [],
      industries: [],
      products: [],
      services: [],
      caseStudies: [],
    };
  }
}

/**
 * Unified parallel aggregate for Why DevSamp page rendering with in-memory caching
 */
export async function getWhyDevSampData() {
  const cached = getCachedData("why_devsamp_data");
  if (cached) return cached;

  try {
    await connectDB();
    const WhyDevSampPage = (await import("@/models/WhyDevSampPage")).default;

    const [whyDoc, settings, industries, products, services, caseStudies] = await Promise.all([
      WhyDevSampPage.findOne({ key: "main", status: { $ne: "draft" } }).lean(),
      SiteSetting.findOne({ key: "main" }).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).lean(),
      Product.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(6).lean(),
      Service.find().sort({ order: 1 }).limit(6).lean(),
      CaseStudy.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(4).lean(),
    ]);

    const result = {
      whyData: whyDoc ? JSON.parse(JSON.stringify(whyDoc)) : null,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      industries: JSON.parse(JSON.stringify(industries || [])),
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
      caseStudies: JSON.parse(JSON.stringify(caseStudies || [])),
    };

    setCachedData("why_devsamp_data", result);
    return result;
  } catch (error) {
    console.error("Error aggregating Why DevSamp page data:", error);
    return {
      whyData: null,
      settings: null,
      industries: [],
      products: [],
      services: [],
      caseStudies: [],
    };
  }
}

/**
 * Unified parallel aggregate for Products page rendering with in-memory caching
 */
export async function getProductsPageData() {
  const cached = getCachedData("products_page_data");
  if (cached) return cached;

  try {
    await connectDB();
    const ProductPage = (await import("@/models/ProductPage")).default;
    const Product = (await import("@/models/Product")).default;

    const [pageDoc, products, settings, services] = await Promise.all([
      ProductPage.findOne({ key: "main", status: { $ne: "draft" } }).lean(),
      Product.find({ isActive: { $ne: false } }).sort({ order: 1, createdAt: -1 }).lean(),
      SiteSetting.findOne({ key: "main" }).lean(),
      Service.find().sort({ order: 1 }).limit(6).lean(),
    ]);

    const result = {
      productPage: pageDoc ? JSON.parse(JSON.stringify(pageDoc)) : null,
      products: JSON.parse(JSON.stringify(products || [])),
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      services: JSON.parse(JSON.stringify(services || [])),
    };

    setCachedData("products_page_data", result);
    return result;
  } catch (error) {
    console.error("Error aggregating Products page data:", error);
    return {
      productPage: null,
      products: [],
      settings: null,
      services: [],
    };
  }
}

/**
 * Unified parallel aggregate for Services page rendering with in-memory caching
 */
export async function getServicesPageData() {
  const cached = getCachedData("services_page_data");
  if (cached) return cached;

  try {
    await connectDB();
    const ServicesPage = (await import("@/models/ServicesPage")).default;
    const Service = (await import("@/models/Service")).default;
    const Product = (await import("@/models/Product")).default;
    const Industry = (await import("@/models/Industry")).default;

    const [pageDoc, services, products, industries, settings] = await Promise.all([
      ServicesPage.findOne({ key: "main", status: { $ne: "draft" } }).lean(),
      Service.find({ isActive: { $ne: false } }).sort({ order: 1, createdAt: -1 }).lean(),
      Product.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(6).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).lean(),
      SiteSetting.findOne({ key: "main" }).lean(),
    ]);

    const result = {
      servicesPage: pageDoc ? JSON.parse(JSON.stringify(pageDoc)) : null,
      services: JSON.parse(JSON.stringify(services || [])),
      products: JSON.parse(JSON.stringify(products || [])),
      industries: JSON.parse(JSON.stringify(industries || [])),
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
    };

    setCachedData("services_page_data", result);
    return result;
  } catch (error) {
    console.error("Error aggregating Services page data:", error);
    return {
      servicesPage: null,
      services: [],
      products: [],
      industries: [],
      settings: null,
    };
  }
}

/**
 * Unified parallel aggregate for Industries page rendering with in-memory caching
 */
export async function getIndustriesPageData() {
  const cached = getCachedData("industries_page_data");
  if (cached) return cached;

  try {
    await connectDB();
    const IndustriesPage = (await import("@/models/IndustriesPage")).default;
    const Industry = (await import("@/models/Industry")).default;
    const Product = (await import("@/models/Product")).default;
    const Service = (await import("@/models/Service")).default;
    const CaseStudy = (await import("@/models/CaseStudy")).default;

    const [pageDoc, industries, products, services, caseStudies, settings] = await Promise.all([
      IndustriesPage.findOne({ key: "main", status: { $ne: "draft" } }).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1, createdAt: -1 }).lean(),
      Product.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(6).lean(),
      Service.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(6).lean(),
      CaseStudy.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(6).lean(),
      SiteSetting.findOne({ key: "main" }).lean(),
    ]);

    const result = {
      industriesPage: pageDoc ? JSON.parse(JSON.stringify(pageDoc)) : null,
      industries: JSON.parse(JSON.stringify(industries || [])),
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
      caseStudies: JSON.parse(JSON.stringify(caseStudies || [])),
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
    };

    setCachedData("industries_page_data", result);
    return result;
  } catch (error) {
    console.error("Error aggregating Industries page data:", error);
    return {
      industriesPage: null,
      industries: [],
      products: [],
      services: [],
      caseStudies: [],
      settings: null,
    };
  }
}

/**
 * Unified parallel aggregate for Pricing page rendering with in-memory caching
 */
export async function getPricingPageData() {
  const cached = getCachedData("pricing_page_data");
  if (cached) return cached;

  try {
    await connectDB();
    const PricingPage = (await import("@/models/PricingPage")).default;
    const Pricing = (await import("@/models/Pricing")).default;
    const PricingSettings = (await import("@/models/PricingSettings")).default;
    const Product = (await import("@/models/Product")).default;
    const Service = (await import("@/models/Service")).default;
    const SiteSetting = (await import("@/models/SiteSetting")).default;

    const [pageDoc, plans, calcSettings, products, services, settings] = await Promise.all([
      PricingPage.findOne({ key: "main", status: { $ne: "draft" } }).lean(),
      Pricing.find({ isActive: { $ne: false }, status: { $ne: "draft" } })
        .populate("product", "name slug category status logoIcon gradient")
        .populate("service", "title name slug category icon gradient")
        .sort({ order: 1, priceMonthly: 1 })
        .lean(),
      PricingSettings.findOne().lean(),
      Product.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(6).lean(),
      Service.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(6).lean(),
      SiteSetting.findOne({ key: "main" }).lean(),
    ]);

    const result = {
      pricingPage: pageDoc ? JSON.parse(JSON.stringify(pageDoc)) : null,
      plans: JSON.parse(JSON.stringify(plans || [])),
      calcSettings: calcSettings ? JSON.parse(JSON.stringify(calcSettings)) : null,
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
    };

    setCachedData("pricing_page_data", result);
    return result;
  } catch (error) {
    console.error("Error aggregating Pricing page data:", error);
    return {
      pricingPage: null,
      plans: [],
      calcSettings: null,
      products: [],
      services: [],
      settings: null,
    };
  }
}

/**
 * Fetch all public active customers with safe projection
 */
export async function getCustomers(limit = null) {
  try {
    await connectDB();
    const Customer = (await import("@/models/Customer")).default;
    let query = Customer.find({ 
      isActive: { $ne: false }, 
      visibility: "public",
      publicProfile: { $ne: false } 
    })
      .select("name slug logo website shortDescription description industry location relationshipType relatedProducts relatedServices featured order since")
      .sort({ order: 1, createdAt: -1 });

    if (limit) query = query.limit(limit);
    const customers = await query.lean();
    return JSON.parse(JSON.stringify(customers || []));
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
}

/**
 * Unified parallel aggregate for Customers page rendering with in-memory caching
 */
export async function getCustomersPageData() {
  const cached = getCachedData("customers_page_data");
  if (cached) return cached;

  try {
    await connectDB();
    const CustomerPage = (await import("@/models/CustomerPage")).default;
    const Customer = (await import("@/models/Customer")).default;
    const Product = (await import("@/models/Product")).default;
    const Service = (await import("@/models/Service")).default;
    const Industry = (await import("@/models/Industry")).default;
    const SiteSetting = (await import("@/models/SiteSetting")).default;

    const [pageDoc, customers, products, services, industries, settings] = await Promise.all([
      CustomerPage.findOne({ key: "main", status: { $ne: "draft" } }).lean(),
      Customer.find({ 
        isActive: { $ne: false }, 
        visibility: "public",
        publicProfile: { $ne: false } 
      })
        .select("name slug logo website shortDescription description industry location relationshipType relatedProducts relatedServices featured order since")
        .sort({ order: 1, createdAt: -1 })
        .lean(),
      Product.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(6).lean(),
      Service.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(6).lean(),
      Industry.find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).lean(),
      SiteSetting.findOne({ key: "main" }).lean(),
    ]);

    const result = {
      customerPage: pageDoc ? JSON.parse(JSON.stringify(pageDoc)) : null,
      customers: JSON.parse(JSON.stringify(customers || [])),
      products: JSON.parse(JSON.stringify(products || [])),
      services: JSON.parse(JSON.stringify(services || [])),
      industries: JSON.parse(JSON.stringify(industries || [])),
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
    };

    setCachedData("customers_page_data", result);
    return result;
  } catch (error) {
    console.error("Error aggregating Customers page data:", error);
    return {
      customerPage: null,
      customers: [],
      products: [],
      services: [],
      industries: [],
      settings: null,
    };
  }
}