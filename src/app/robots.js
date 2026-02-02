export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.devsamp.online';

  return {
    rules: [
      // 1. All Search Engines (Google, Bing, Yahoo, etc.)
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',       // Admin Panel mat dikhao
          '/dashboard/',   // User Dashboard private hai
          '/login/',       // Login page index nahi hona chahiye
          '/api/',         // API routes users ke liye nahi hain
          '/_next/',       // Next.js internal files
          '/private/',     // Koi private folder ho to
        ],
      },
      // 2. Specific Rule for Google Images (Optional but good)
      {
        userAgent: 'Googlebot-Image',
        allow: ['/*.png', '/*.jpg', '/*.jpeg', '/*.gif', '/*.webp'],
      },
    ],
    // Sitemap ka link (Google yahan se sab kuch dhoondhega)
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}