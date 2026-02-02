import { getProjects, getBlogs } from "@/lib/data";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.devsamp.online';

  // 1. Static Pages (Jo hamesha rahenge)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // 2. Dynamic Blogs (Database se)
  // Google har blog post ko alag se index karega
  const blogsData = await getBlogs();
  const blogs = blogsData.map((blog) => ({
    url: `${baseUrl}/blog/${blog._id}`, // Assuming dynamic route is /blog/[id]
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 3. Dynamic Projects (Database se)
  // Agar aapke projects ka alag page hai to ye useful hai
  const projectsData = await getProjects();
  const projects = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project._id}`, // Assuming dynamic route is /projects/[id]
    lastModified: new Date(project.updatedAt || project.createdAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Sabko combine karke return karo
  return [...staticPages, ...blogs, ...projects];
}