import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    // Website se HTML fetch karna
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);

    // Meta Tags Read karna (Open Graph)
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || "";
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || "";
    let image = $('meta[property="og:image"]').attr('content') || "";

    // Platform detect karna
    let platform = "other";
    if (url.includes("youtube.com") || url.includes("youtu.be")) platform = "youtube";
    if (url.includes("instagram.com")) platform = "instagram";

    return NextResponse.json({ 
        title, 
        desc: description, 
        image, 
        platform 
    }, { status: 200 });

  } catch (error) {
    console.error("Extraction Error:", error);
    return NextResponse.json({ message: "Failed to extract data" }, { status: 500 });
  }
}