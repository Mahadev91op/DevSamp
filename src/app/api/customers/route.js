import { successResponse, errorResponse } from "@/lib/api-response";
import connectDB from "@/lib/db";
import Customer from "@/models/Customer";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const industry = searchParams.get("industry") || "";
    const relationshipType = searchParams.get("relationshipType") || "";
    const limit = Math.min(Number(searchParams.get("limit")) || 30, 100);
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const isAdmin = searchParams.get("admin") === "true";

    const filter = isAdmin
      ? {}
      : {
          isActive: { $ne: false },
          visibility: "public",
          publicProfile: { $ne: false }
        };

    if (industry && industry !== "All") {
      filter.industry = industry;
    }

    if (relationshipType && relationshipType !== "All") {
      filter.relationshipType = relationshipType;
    }

    if (search.trim()) {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { shortDescription: { $regex: search.trim(), $options: "i" } },
        { industry: { $regex: search.trim(), $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;

    const [customers, total] = await Promise.all([
      Customer.find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Customer.countDocuments(filter)
    ]);

    return successResponse(
      { customers, total },
      { page, limit, totalPages: Math.ceil(total / limit) || 1 }
    );
  } catch (error) {
    return errorResponse("INTERNAL_ERROR", "Failed to fetch customer directory.", 500, {
      error: error.message
    });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.name || !body.name.trim()) {
      return errorResponse("VALIDATION_ERROR", "Customer name is required.", 400);
    }

    const slug = body.slug
      ? body.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
      : body.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

    const newCustomer = await Customer.create({
      name: body.name.trim(),
      slug,
      logo: body.logo || "",
      website: body.website || "",
      shortDescription: body.shortDescription || "",
      description: body.description || "",
      industry: body.industry || "Enterprise",
      location: body.location || "",
      relationshipType: body.relationshipType || "Enterprise Platform",
      relatedProducts: Array.isArray(body.relatedProducts) ? body.relatedProducts : [],
      relatedServices: Array.isArray(body.relatedServices) ? body.relatedServices : [],
      featured: Boolean(body.featured),
      order: Number(body.order) || 0,
      visibility: body.visibility || "public",
      status: body.status || "active",
      publicProfile: body.publicProfile !== false,
      isActive: body.isActive !== false,
      since: body.since || "",
    });

    return successResponse({ customer: newCustomer }, {}, 201);
  } catch (error) {
    return errorResponse("INTERNAL_ERROR", "Failed to create customer.", 500, {
      error: error.message
    });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const id = body.id || body._id;

    if (!id) {
      return errorResponse("VALIDATION_ERROR", "Customer ID is required for update.", 400);
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        name: body.name?.trim(),
        slug: body.slug ? body.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") : undefined,
        logo: body.logo,
        website: body.website,
        shortDescription: body.shortDescription,
        description: body.description,
        industry: body.industry,
        location: body.location,
        relationshipType: body.relationshipType,
        relatedProducts: Array.isArray(body.relatedProducts) ? body.relatedProducts : undefined,
        relatedServices: Array.isArray(body.relatedServices) ? body.relatedServices : undefined,
        featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
        order: body.order !== undefined ? Number(body.order) : undefined,
        visibility: body.visibility,
        status: body.status,
        publicProfile: body.publicProfile !== undefined ? Boolean(body.publicProfile) : undefined,
        isActive: body.isActive !== undefined ? Boolean(body.isActive) : undefined,
        since: body.since,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return errorResponse("NOT_FOUND", "Customer not found.", 404);
    }

    return successResponse({ customer: updatedCustomer });
  } catch (error) {
    return errorResponse("INTERNAL_ERROR", "Failed to update customer.", 500, {
      error: error.message
    });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body.id || body._id;
      } catch (e) {
        // no body
      }
    }

    if (!id) {
      return errorResponse("VALIDATION_ERROR", "Customer ID is required.", 400);
    }

    const deleted = await Customer.findByIdAndDelete(id);
    if (!deleted) {
      return errorResponse("NOT_FOUND", "Customer not found.", 404);
    }

    return successResponse({ message: "Customer deleted successfully." });
  } catch (error) {
    return errorResponse("INTERNAL_ERROR", "Failed to delete customer.", 500, {
      error: error.message
    });
  }
}
