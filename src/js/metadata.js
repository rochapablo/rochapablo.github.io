import { buildMetadata, buildStructuredData } from "./seo.js";

export function updateMetadata(profile) {
  const metadata = buildMetadata(profile);

  document.title = metadata.title;
  setMetaContent('meta[name="description"]', metadata.description);
  setMetaContent('meta[property="og:title"]', metadata.ogTitle);
  setMetaContent('meta[property="og:description"]', metadata.ogDescription);
  setMetaContent('meta[property="og:type"]', metadata.ogType);
  setMetaContent('meta[property="og:url"]', metadata.ogUrl);
  setCanonicalUrl(metadata.canonicalUrl);
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

  structuredData.textContent = JSON.stringify(buildStructuredData(profile), null, 2);
}
