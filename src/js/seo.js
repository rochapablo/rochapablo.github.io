export function buildMetadata(profile) {
  return {
    title: profile.seo.title,
    description: profile.seo.description,
    ogTitle: profile.seo.title,
    ogDescription: profile.seo.description,
    ogType: "profile",
    ogUrl: profile.seo.publicUrl,
    canonicalUrl: profile.seo.publicUrl
  };
}

export function buildStructuredData(profile) {
  const socialLinks = profile.contactLinks
    .filter((link) => link.label === "LinkedIn" || link.label === "GitHub")
    .map((link) => link.href);

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: profile.seo.publicUrl,
    name: profile.seo.title,
    description: profile.seo.description,
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      url: profile.seo.publicUrl,
      sameAs: socialLinks,
      knowsAbout: profile.skills.map((skill) => skill.name),
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.location.city,
        addressRegion: profile.location.region,
        addressCountry: profile.location.country
      }
    }
  };
}
