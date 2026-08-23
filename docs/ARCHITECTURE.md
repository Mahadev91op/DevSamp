# DEVSAMP ARCHITECTURAL DECISIONS & STANDARDS (ADR)

## ADR-001: Adoption of Modular Monolith over Microservices
- **Context**: DevSamp is scaling from a service website to a multi-product SaaS ecosystem.
- **Decision**: Adopt a Modular Monolith architecture within Next.js 16. Shared domain boundaries are encapsulated in `src/server/services/` and `src/server/repositories/` while sharing a single deployment pipeline and MongoDB connection pool.
- **Consequences**: Zero network latency between internal services, simplified transactions, unified authentication, and drastically reduced operational complexity.

## ADR-002: Server-Side RBAC & Multi-Tenant Scoping
- **Context**: Multiple organizations and products will share the platform.
- **Decision**: All organization-owned collections enforce `organizationId` indexing and filtering. Client-provided `organizationId` parameters are always verified against user session memberships on the server.
- **Consequences**: Complete protection against Insecure Direct Object References (IDOR) and cross-tenant data leakage.

## ADR-003: Database as Single Source of Truth & CMS Layer
- **Context**: Future Admin Dashboard requires dynamic control over homepage sections, visibility, and catalog offerings.
- **Decision**: Dynamic content entities (`HomepageSection`, `Product`, `Service`, `Industry`, `CaseStudy`, `Review`, `Blog`, `SiteSetting`) are managed via MongoDB. The frontend renders streamed server components with fallback skeletons.
- **Consequences**: Enables dynamic section reordering, toggles, and catalog updates without frontend redeployment.
