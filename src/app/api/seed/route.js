import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await connectDB();
    await Blog.deleteMany({});
    
    const dummyBlogs = [
      { 
        title: "Building the Future with Next.js 14", 
        desc: "Explore how we use the latest Next.js features to build blazing fast websites.", 
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000", 
        link: "https://www.youtube.com/watch?v=__mSgDEOyv8", // Sample React Video
        platform: "youtube",
        category: "Tech"
      },
      { 
        title: "Behind the Scenes: Office Tour", 
        desc: "A quick look at where the magic happens at DevSamp HQ.", 
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000", 
        link: "https://instagram.com", 
        platform: "instagram",
        category: "Life"
      },
      { 
        title: "Client Success Story: FinTech App", 
        desc: "How we scaled a fintech app to 1M users in 6 months.", 
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000", 
        link: "https://www.youtube.com/watch?v=SqcY0GlETPk", // Sample React Video
        platform: "youtube",
        category: "Case Study"
      }
    ];

    await Blog.insertMany(dummyBlogs);
    return NextResponse.json({ message: "Blogs seeded successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}