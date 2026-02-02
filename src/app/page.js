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

// 🚀 REVALIDATION: High Performance + SEO
export const revalidate = 60; 

// 🚀 HOMEPAGE TITLE (Very Important for Ranking)
export const metadata = {
  title: "Website Developer & App Development Agency | DevSamp",
  description: "Hire the best Website Developer team at DevSamp. We provide custom Web Development, MERN Stack, and Next.js services globally.",
  alternates: {
    canonical: 'https://devsamp.online',
  },
};

export default async function Home() {
  const projects = await getProjects();
  const blogs = await getBlogs();
  const reviews = await getReviews();
  const pricingPlans = await getPricing();
  const services = await getServices();

  return (
    <main className="flex min-h-screen flex-col bg-black">
      <Hero />
      <Services initialServices={services} /> 
      <About />
      <Team />
      <Process />
      <Portfolio initialProjects={projects} />
      <Pricing initialPlans={pricingPlans} />
      <Blogs initialBlogs={blogs} />
      <FAQ /> 
      <Testimonials initialReviews={reviews} />
      <Contact />
      <Footer />
    </main>
  );
}