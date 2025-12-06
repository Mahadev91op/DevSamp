import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Review from '@/models/Review';

export async function GET() {
  try {
    await connectDB();
    await Review.deleteMany({});
    
    const dummyReviews = [
      { name: "Rahul Verma", role: "CEO, TechFlow", rating: 5, text: "DevSamp ne hamari website ko bilkul badal diya. Unka design sense aur coding speed lajawab hai.", image: "https://randomuser.me/api/portraits/men/32.jpg" },
      { name: "Sarah Jenkins", role: "Founder, Bloom", rating: 5, text: "The animations are buttery smooth! Our conversion rate increased by 40%.", image: "https://randomuser.me/api/portraits/women/44.jpg" },
      { name: "Amit Sharma", role: "CTO, NextGen", rating: 4, text: "Professional code quality. Delivered slightly late but worth the wait.", image: "https://randomuser.me/api/portraits/men/86.jpg" }
    ];

    await Review.insertMany(dummyReviews);
    return NextResponse.json({ message: "Reviews seeded!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}