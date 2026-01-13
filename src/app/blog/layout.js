// src/app/blog/layout.js

export const metadata = {
  title: "Blog & Insights | DevSamp Agency",
  description: "Read the latest updates, tutorials, and insights on Web Development, Next.js, and Design from the DevSamp team.",
  openGraph: {
    title: "DevSamp Blog | Tech Insights & Updates",
    description: "Latest trends in Web Development and Design.",
    url: 'https://www.devsamp.online/blog',
    images: ['/icon-512.png'],
  },
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}