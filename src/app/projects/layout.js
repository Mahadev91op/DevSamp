// src/app/projects/layout.js

export const metadata = {
  title: "Our Projects | DevSamp Portfolio",
  description: "Explore our portfolio of custom Web Development, App Creation, and UI/UX Design projects. See how DevSamp transforms ideas into digital reality.",
  openGraph: {
    title: "Our Projects | DevSamp Portfolio",
    description: "Explore our portfolio of custom Web Development and App Creation projects.",
    url: 'https://www.devsamp.online/projects',
    images: ['/icon-512.png'], // Ya koi project collage image
  },
};

export default function ProjectsLayout({ children }) {
  return <>{children}</>;
}