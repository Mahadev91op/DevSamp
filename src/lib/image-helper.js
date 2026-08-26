/**
 * Convert any Google Drive sharing URL, LH3 link, or raw image URL into a direct renderable image URL.
 * Supports:
 * - https://drive.google.com/file/d/{ID}/view?usp=sharing
 * - https://drive.google.com/open?id={ID}
 * - https://drive.google.com/thumbnail?id={ID}
 * - https://lh3.googleusercontent.com/d/{ID}
 * - Regular URLs (Unsplash, Cloudinary, S3, etc.)
 */
export function getDirectImageUrl(url) {
  if (!url || typeof url !== "string") return null;

  // Extract Google Drive file ID
  const driveMatch = url.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|thumbnail\?id=)|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  return url;
}

