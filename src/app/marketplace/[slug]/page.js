import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  getSourceCodeBySlug, 
  getSourceCodes 
} from "@/lib/data";
import SourceCodeDetailClient from "./SourceCodeDetailClient";

export const revalidate = 60; // ISR revalidate every 60s

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getSourceCodeBySlug(slug);

  if (!item) {
    return {
      title: "Source Code Package | DevSamp Marketplace",
      description: "Explore verified source code packages on DevSamp.",
    };
  }

  return {
    title: `${item.title} (Source Code & Repository) | DevSamp Marketplace`,
    description: item.tagline || item.description,
  };
}

export default async function SourceCodeDetailPage({ params }) {
  const { slug } = await params;
  const item = await getSourceCodeBySlug(slug);

  if (!item) {
    notFound();
  }

  // Fetch related source code packages in the same or adjacent category
  const allItems = await getSourceCodes();
  const relatedItems = allItems
    .filter((it) => it.slug !== item.slug)
    .slice(0, 3);

  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Marketplace", href: "/marketplace" },
        { label: item.title, href: `/marketplace/${item.slug}` }
      ]}
      badge="SOURCE REPOSITORY SHOWCASE"
      title={item.title}
      subtitle={item.tagline || item.description}
      primaryAction={{ label: "All Packages", href: "/marketplace" }}
      secondaryAction={{ label: "Developer Docs", href: "/developers" }}
    >
      <SourceCodeDetailClient item={item} relatedItems={relatedItems} />
    </EcosystemPageShell>
  );
}
