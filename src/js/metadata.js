export function updateMetadata(profile) {
  document.title = profile.seo.title;
  setMetaContent('meta[name="description"]', profile.seo.description);
  setMetaContent('meta[property="og:title"]', profile.seo.title);
  setMetaContent('meta[property="og:description"]', profile.seo.description);
  setMetaContent('meta[property="og:type"]', "profile");
  setMetaContent('meta[property="og:url"]', profile.seo.publicUrl);
  setCanonicalUrl(profile.seo.publicUrl);
  setStructuredData(profile);
}

function setMetaContent(selector, content) {
  const element = document.querySelector(selector);

  if (element) {
    element.setAttribute("content", content);
  }
}

function setCanonicalUrl(url) {
  const canonical = document.querySelector('link[rel="canonical"]');

  if (canonical) {
    canonical.setAttribute("href", url);
  }
}

function setStructuredData(profile) {
  const structuredData = document.getElementById("profile-structured-data");

  if (!structuredData) {
    return;
  }

  const socialLinks = profile.contactLinks
    .filter((link) => link.label === "LinkedIn" || link.label === "GitHub")
    .map((link) => link.href);
  const skillNames = profile.skills.map((skill) => skill.name);

  structuredData.textContent = JSON.stringify(
    {
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
        knowsAbout: skillNames,
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location.city,
          addressRegion: profile.location.region,
          addressCountry: profile.location.country
        }
      }
    },
    null,
    2
  );
}
