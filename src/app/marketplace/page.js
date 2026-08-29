import EcosystemPageShell from "@/components/EcosystemPageShell";
import SourceCodeStore from "@/components/SourceCodeStore";
import { getSourceCodes } from "@/lib/data";

export const revalidate = 60; // ISR revalidate every 60s

export const metadata = {
  title: "Source Code Marketplace & Developer Repository Store | DevSamp",
  description: "Download free open-source templates, boilerplates, and purchase production commercial licenses for flagship clinical ERPs, POS systems, and AI agents with direct GitHub access.",
};

export default async function MarketplacePage() {
  // Fetch real data directly from MongoDB database (zero hardcoding)
  const sourceCodes = await getSourceCodes();

  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Marketplace", href: "/marketplace" }]}
      badge="SOURCE CODE & REPOSITORY RELEASES"
      title="DevSamp Source Code & Product Store"
      subtitle="Explore production-tested codebases. Download free open-source boilerplates or purchase full commercial licenses with lifetime GitHub repository access."
      primaryAction={{ label: "Developer Docs", href: "/developers" }}
      secondaryAction={{ label: "Explore Products", href: "/products" }}
      relatedSection={{
        badge: "CUSTOM EXTENSIONS",
        title: "Need a Bespoke Software Architecture?",
        description: "Hire our dedicated senior engineering pods to customize these codebases or build greenfield multi-tenant SaaS platforms.",
        href: "/services",
        actionLabel: "Explore Pod Services"
      }}
    >
      <SourceCodeStore initialSourceCodes={sourceCodes} />
    </EcosystemPageShell>
  );
}
