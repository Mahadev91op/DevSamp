import EcosystemPageShell from "@/components/EcosystemPageShell";
import PublicRoadmapBoard from "@/components/PublicRoadmapBoard";

export const metadata = {
  title: "Public Product Roadmap & Feature Pipeline | DevSamp Ecosystem",
  description: "Interactive quarterly milestones, upcoming software capabilities, and community feature requests across DevSamp suites.",
};

export default function ProductRoadmapPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: "Roadmap", href: "/products/roadmap" }
      ]}
      badge="PUBLIC FEATURE PIPELINE"
      title="DevSamp Ecosystem Product Roadmap"
      subtitle="Transparent view into our upcoming feature releases, architectural upgrades, and quarterly development priorities."
      primaryAction={{ label: "Request a Feature", href: "mailto:devsamp1st@gmail.com?subject=Feature%20Request%20-%20DevSamp" }}
      secondaryAction={{ label: "Release Changelog", href: "/products/changelog" }}
    >
      <div className="max-w-5xl">
        <PublicRoadmapBoard />
      </div>
    </EcosystemPageShell>
  );
}
