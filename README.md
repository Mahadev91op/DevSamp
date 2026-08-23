# DevSamp — Technology, Software Products & SaaS Ecosystem 🚀

**DevSamp** is a modern, high-performance technology platform and software product ecosystem. It unifies proprietary vertical SaaS products (e.g. *MedERP Pro*, *DevScale Core*, *FlowPulse POS*, *OmniDesk AI*), custom engineering services, developer platforms, and a comprehensive Admin CRM/CMS.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS**, and **MongoDB Atlas**.

---

## 🌟 Ecosystem Overview

DevSamp is designed around three core pillars:
1. **Software Products & SaaS Platforms**: Production-grade software systems engineered for rapid enterprise deployment and high concurrency.
2. **Technology & Engineering Services**: Custom Next.js web systems, mobile applications, cloud DevOps, and high-performance database architectures.
3. **Developer & Integration Platform**: Open REST APIs, event-driven webhooks, modular SDKs, and partner ecosystem mesh.

---

## 🏗️ System Architecture (Modular Monolith)

DevSamp follows a layered modular-monolith architecture:

```
[Experience Layer]  -> Next.js 16 App Router (Marketing, Portals, Admin)
       ↓
[API Gateway]       -> /api/v1/* & /api/* with Standard { success, data, meta } Envelopes
       ↓
[Auth & RBAC]       -> Central Sessions, JWT/httpOnly Cookies, Server-Side Permissions
       ↓
[Domain Services]   -> CMS, Products, Subscriptions, Entitlements, Billing, Support
       ↓
[Repositories]      -> Isolated MongoDB Data Access Layer
       ↓
[Database]          -> Clustered MongoDB Atlas with DNS Resolution & Connection Pooling
```

> 📖 **Full Architectural Specification**: See [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md) and [docs/SYSTEM_DESIGN.md](./docs/SYSTEM_DESIGN.md).

---

## ✨ Key Features

### 🌐 Public Ecosystem Homepage (CMS-Driven)
- **Ecosystem Hero**: Interactive live node telemetry and system compilation simulator.
- **Ecosystem Introduction**: 4-layer connected architecture breakdown.
- **Flagship Products Showcase**: Dynamic SaaS catalog with capability tags, status indicators, and direct links.
- **Bento Engineering Services**: Interactive widgets (live compiler, UI/UX prototype slider, Lighthouse score gauge).
- **Interactive Ecosystem Graph**: Real-time topology map with node inspection and dependency linking.
- **Value Matrix ("Why DevSamp")**: Architectural differentiators and product DNA.
- **Domain Solutions**: Tailored architectures for Healthcare, Fintech, Retail POS, and Startups.
- **Developer Platform**: Interactive code sandbox (Node.js, cURL, Python), OpenAPI specs, and webhook highlights.
- **Trust & Security**: Verifiable infrastructure guarantees (RBAC, edge mesh, CI/CD, 24/7 SLA).
- **Client Stories & Changelog**: Verified client feedback carousel and Git branch timeline devlogs.
- **Terminal FAQ**: Command-line style diagnostic accordion with Schema.org `FAQPage` structured data.

### 🛠️ Admin Control Plane (`/admin`)
- **CMS & Content Management**: Create and manage Products, Services, Team Members, Pricing Plans, and Blogs.
- **CRM & Lead Pipeline**: Inquiries tracking, time-range analytics graphs, and export capabilities.
- **Project Progress Dashboard**: Client project tracking, milestone timelines, and document sharing.

### 👤 Client Dashboard (`/dashboard`)
- **Real-Time Project Timeline**: Stage tracking (Discovery $\rightarrow$ UI/UX $\rightarrow$ Dev $\rightarrow$ QA $\rightarrow$ Launch).
- **Billing & Documents**: Invoices, budgets, and automated PDF downloads.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.7 (App Router, Server Components, Streaming Suspense)
- **UI & Runtime**: React 19.2.0, Framer Motion, GSAP, Three.js
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Database & ORM**: MongoDB Atlas, Mongoose 9.0.1
- **Icons**: Lucide React
- **Auth & Crypto**: Jose (JWT), BcryptJS
- **Media & Storage**: Cloudinary SDK
- **Communications**: Nodemailer (SMTP)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.17 or higher, Recommended: v20+)
- **MongoDB** Atlas URI or Local MongoDB instance

### 2. Installation
```bash
git clone https://github.com/Mahadev91op/DevSamp-Final.git
cd devsamp
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/devsamp_db?retryWrites=true&w=majority

# Admin Panel Security Key
NEXT_PUBLIC_ADMIN_KEY=your_admin_secret_key

# JWT Session Secret
JWT_SECRET=your_jwt_secret_key

# Cloudinary (File & Image Uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email SMTP Gateway
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Public URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Database Baseline Seeding
To initialize the CMS sections, default products, and ecosystem nodes, start the server and run the seed endpoint:
```bash
# Start development server
npm run dev

# In another terminal or browser, visit:
curl http://localhost:3000/api/seed
```

### 5. Production Build
```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
devsamp/
├── docs/                        # Complete System Architecture & ADRs
│   ├── SYSTEM_DESIGN.md         # Comprehensive system design blueprint
│   └── ARCHITECTURE.md          # Architectural decision records
├── SYSTEM_DESIGN.md             # Root system design quick reference
├── src/
│   ├── app/                     # Next.js App Router (Experience Layer)
│   │   ├── admin/               # Admin CRM & CMS Control Plane
│   │   ├── dashboard/           # Customer Portal
│   │   ├── api/                 # API Gateway (/api/v1 & /api/*)
│   │   │   ├── homepage/        # Unified Homepage Aggregator
│   │   │   ├── products/        # Products Catalog API
│   │   │   ├── ecosystem/       # Ecosystem Topology API
│   │   │   └── seed/            # Idempotent Database Seeder
│   │   ├── layout.js            # Root Layout & SEO Schema.org
│   │   └── page.js              # Dynamic Homepage Orchestrator
│   ├── components/              # Reusable UI & Layout Components
│   │   ├── Navbar.jsx           # Ecosystem Pill Navigation
│   │   ├── Footer.jsx           # 6-Column Ecosystem Footer
│   │   └── Skeletons.jsx        # Streaming Suspense Fallbacks
│   ├── sections/                # Modular Section Components
│   │   ├── Hero.jsx             # Ecosystem Hero & Telemetry HUD
│   │   ├── EcosystemIntro.jsx   # 4-Layer Connected Pillars
│   │   ├── FeaturedProducts.jsx # SaaS Product Showcase
│   │   ├── Services.jsx         # Bento Services & Sandbox Widgets
│   │   ├── EcosystemMap.jsx     # Interactive Node Topology Graph
│   │   ├── WhyDevSamp.jsx       # Value Matrix & Engineering DNA
│   │   ├── IndustriesSection.jsx# Vertical Industry Solutions
│   │   ├── CaseStudies.jsx      # Verified Client Outcomes
│   │   ├── DeveloperSection.jsx # Code Sandbox & Developer Platform
│   │   ├── TrustSection.jsx     # Reliability & Security Matrix
│   │   ├── Testimonials.jsx     # Verified Client Reviews Carousel
│   │   ├── Blogs.jsx            # Git Branch Changelog & Releases
│   │   ├── FAQ.jsx              # Terminal Diagnostic FAQ
│   │   └── FinalCTA.jsx         # Conclusion Banner
│   ├── server/                  # Server-Side Domain Architecture
│   │   ├── services/            # Domain Services (CMS, Product, Entitlement)
│   │   └── repositories/        # Data Access Repositories (Product, Ecosystem, Section)
│   ├── models/                  # MongoDB Database Schemas
│   │   ├── Product.js
│   │   ├── EcosystemItem.js
│   │   ├── Industry.js
│   │   ├── CaseStudy.js
│   │   ├── HomepageSection.js
│   │   ├── SiteSetting.js
│   │   ├── Service.js
│   │   ├── Project.js
│   │   ├── Review.js
│   │   ├── Blog.js
│   │   ├── Pricing.js
│   │   ├── Team.js
│   │   ├── ClientProject.js
│   │   ├── Contact.js
│   │   └── User.js
│   └── lib/                     # Core Utilities (DB, Auth, API Envelope, Data)
└── public/                      # Static assets, icons & PWA manifest
```

---

## 🔒 Security & Quality Standards

- **Server-Side Authorization**: All administrative mutations and tenant operations require server-validated sessions.
- **Tenant Isolation**: Queries strictly enforce `organizationId` scoping.
- **Standardized API Envelope**: All new endpoints return `{ success: true, data: {}, meta: {} }` or structured error objects with unique `requestId` tracing.
- **No Fake Data Rule**: UI components gracefully handle empty datasets without rendering fabricated testimonials or metrics.

---

## 📄 License

Distributed under the MIT License. Built with ❤️ by the **DevSamp Engineering Team**.
