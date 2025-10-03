import { siteConfig } from "@/lib/siteConfig";

export default function Head() {
  const siteUrl = siteConfig.url;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    logo: `${siteUrl}/icon.svg`,
    sameAs: [siteConfig.repo],
    slogan: siteConfig.tagline,
  };

  return (
    <>
      <meta name="theme-color" content="#0b1522" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
