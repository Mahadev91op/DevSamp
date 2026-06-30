import { Suspense } from "react";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services"; 
import About from "@/sections/About";
import Team from "@/sections/Team";
import Process from "@/sections/Process";
import Pricing from "@/sections/Pricing";
import FAQ from "@/sections/FAQ"; 
import Portfolio from "@/sections/Portfolio";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";
import Blogs from "@/sections/Blogs";
import { getProjects, getBlogs, getReviews, getPricing, getServices } from "@/lib/data";
import { 
  ServicesSkeleton, 
  PortfolioSkeleton, 
  PricingSkeleton, 
  BlogsSkeleton, 
  TestimonialsSkeleton 
} from "@/components/Skeletons";

// 🚀 REVALIDATION: High Performance + SEO
export const revalidate = 60; 

// 🚀 HOMEPAGE TITLE (Very Important for Ranking)
export const metadata = {
  title: {
    absolute: "Website Developer & App Development Agency | DevSamp",
  },
  description: "Hire the best Website Developer team at DevSamp. We provide custom Web Development, MERN Stack, and Next.js services globally.",
  alternates: {
    canonical: 'https://devsamp.online',
  },
};

// 🚀 SERVER-SIDE DATA FETCHING WRAPPERS FOR STREAMING
async function ServicesSection() {
  const services = await getServices();
  return <Services initialServices={services} />;
}

async function PortfolioSection() {
  const projects = await getProjects();
  return <Portfolio initialProjects={projects} />;
}

async function PricingSection() {
  const pricingPlans = await getPricing();
  return <Pricing initialPlans={pricingPlans} />;
}

async function BlogsSection() {
  const blogs = await getBlogs();
  return <Blogs initialBlogs={blogs} />;
}

async function TestimonialsSection() {
  const reviews = await getReviews();
  return <Testimonials initialReviews={reviews} />;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent">
      <Hero />
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesSection />
      </Suspense>
      <About />
      <Team />
      <Process />
      <Suspense fallback={<PortfolioSkeleton />}>
        <PortfolioSection />
      </Suspense>
      <Suspense fallback={<PricingSkeleton />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<BlogsSkeleton />}>
        <BlogsSection />
      </Suspense>
      <FAQ /> 
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <Contact />
      <Footer />
    </main>
  );
}