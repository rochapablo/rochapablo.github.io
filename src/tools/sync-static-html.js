const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const rootDir = path.resolve(__dirname, "../..");
const profileDataDir = path.join(rootDir, "src/js/profile-data");
const indexPath = path.join(rootDir, "index.html");

const pageHeadings = loadExport(path.join(profileDataDir, "page-headings.js"), "pageHeadings");
const profileContent = loadExport(path.join(profileDataDir, "profile.js"), "profileContent");
const contactLinks = loadExport(path.join(profileDataDir, "contact-links.js"), "contactLinks");
const skills = loadExport(path.join(profileDataDir, "skills.js"), "skills");

const profile = {
  name: profileContent.footer.name,
  title: pageHeadings.hero.title,
  tagline: pageHeadings.hero.tagline,
  summary: profileContent.basics.summary,
  seo: profileContent.seo,
  location: profileContent.location,
  snapshot: profileContent.snapshot,
  careerDirection: profileContent.careerDirection,
  personalNote: {
    title: pageHeadings.personalNote.title,
    text: profileContent.personalNote.text
  },
  pageHeadings,
  contactLinks,
  skills,
  footerName: profileContent.footer.name
};

const replacements = [
  ['data-page-heading="hero-greeting"', profile.pageHeadings.hero.greeting],
  ['data-page-heading="hero-name"', profile.pageHeadings.hero.introName],
  ['data-page-heading="hero-title"', profile.pageHeadings.hero.introTitle],
  ["data-profile-name", profile.name],
  ["data-profile-title", profile.title],
  ["data-profile-tagline", profile.tagline],
  ["data-profile-summary", profile.summary],
  ['data-page-heading="about-kicker"', profile.pageHeadings.about.kicker],
  ['data-page-heading="about-title"', profile.pageHeadings.about.title],
  ["data-profile-snapshot", profile.snapshot],
  ['data-page-heading="strengths-kicker"', profile.pageHeadings.strengths.kicker],
  ['data-page-heading="strengths-title"', profile.pageHeadings.strengths.title],
  ['data-page-heading="skills-kicker"', profile.pageHeadings.skills.kicker],
  ['data-page-heading="skills-title"', profile.pageHeadings.skills.title],
  ['data-page-heading="skills-support"', profile.pageHeadings.skills.support],
  ['data-page-heading="experience-kicker"', profile.pageHeadings.experience.kicker],
  ['data-page-heading="experience-title"', profile.pageHeadings.experience.title],
  ['data-page-heading="personal-note-kicker"', profile.pageHeadings.personalNote.kicker],
  ['data-page-heading="personal-note-title"', profile.pageHeadings.personalNote.title],
  ["data-personal-note-text", profile.personalNote.text],
  ['data-page-heading="career-direction-kicker"', profile.pageHeadings.careerDirection.kicker],
  ['data-page-heading="career-direction-title"', profile.pageHeadings.careerDirection.title],
  ["data-career-direction", profile.careerDirection],
  ['data-page-heading="contact-kicker"', profile.pageHeadings.contact.kicker],
  ['data-page-heading="contact-title"', profile.pageHeadings.contact.title],
  ["data-footer-name", profile.footerName]
];

const metadata = buildMetadata(profile);
let html = fs.readFileSync(indexPath, "utf8");

replacements.forEach(([attribute, text]) => {
  html = replaceElementText(html, attribute, text);
});

html = replaceTagText(html, "title", metadata.title);
html = replaceMetaContent(html, 'name="description"', metadata.description);
html = replaceMetaContent(html, 'property="og:title"', metadata.ogTitle);
html = replaceMetaContent(html, 'property="og:description"', metadata.ogDescription);
html = replaceMetaContent(html, 'property="og:type"', metadata.ogType);
html = replaceMetaContent(html, 'property="og:url"', metadata.ogUrl);
html = replaceLinkHref(html, 'rel="canonical"', metadata.canonicalUrl);
html = replaceElementRawText(
  html,
  'id="profile-structured-data"',
  escapeScriptText(JSON.stringify(buildStructuredData(profile), null, 2))
);

fs.writeFileSync(indexPath, html);

function loadExport(filePath, exportName) {
  const source = fs.readFileSync(filePath, "utf8");
  const exportMarker = `export const ${exportName} =`;
  const markerIndex = source.indexOf(exportMarker);

  if (markerIndex === -1) {
    throw new Error(`Could not find export "${exportName}" in ${filePath}`);
  }

  const literalStart = source.slice(markerIndex + exportMarker.length).search(/[\[{]/);

  if (literalStart === -1) {
    throw new Error(`Could not find literal for export "${exportName}" in ${filePath}`);
  }

  const literal = extractLiteral(source, markerIndex + exportMarker.length + literalStart);
  return vm.runInNewContext(`(${literal})`);
}

function extractLiteral(source, startIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = startIndex; index < source.length; index += 1) {
    const character = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = null;
      }

      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }

    if (character === "{" || character === "[") {
      depth += 1;
    } else if (character === "}" || character === "]") {
      depth -= 1;

      if (depth === 0) {
        return source.slice(startIndex, index + 1);
      }
    }
  }

  throw new Error("Unterminated exported literal.");
}

function buildMetadata(profileData) {
  return {
    title: profileData.seo.title,
    description: profileData.seo.description,
    ogTitle: profileData.seo.title,
    ogDescription: profileData.seo.description,
    ogType: "profile",
    ogUrl: profileData.seo.publicUrl,
    canonicalUrl: profileData.seo.publicUrl
  };
}

function buildStructuredData(profileData) {
  const socialLinks = profileData.contactLinks
    .filter((link) => link.label === "LinkedIn" || link.label === "GitHub")
    .map((link) => link.href);

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: profileData.seo.publicUrl,
    name: profileData.seo.title,
    description: profileData.seo.description,
    mainEntity: {
      "@type": "Person",
      name: profileData.name,
      jobTitle: profileData.title,
      url: profileData.seo.publicUrl,
      sameAs: socialLinks,
      knowsAbout: profileData.skills.map((skill) => skill.name),
      address: {
        "@type": "PostalAddress",
        addressLocality: profileData.location.city,
        addressRegion: profileData.location.region,
        addressCountry: profileData.location.country
      }
    }
  };
}

function replaceElementText(htmlContent, attribute, text) {
  const pattern = new RegExp(`(<[^>]*${escapeRegExp(attribute)}[^>]*>)([\\s\\S]*?)(<\\/[^>]+>)`, "g");
  return htmlContent.replace(pattern, `$1${escapeHtml(text)}$3`);
}

function replaceElementRawText(htmlContent, attribute, text) {
  const pattern = new RegExp(`(<[^>]*${escapeRegExp(attribute)}[^>]*>)([\\s\\S]*?)(<\\/[^>]+>)`, "g");
  return htmlContent.replace(pattern, `$1${text}$3`);
}

function replaceTagText(htmlContent, tagName, text) {
  const pattern = new RegExp(`(<${tagName}[^>]*>)([\\s\\S]*?)(<\\/${tagName}>)`);
  return htmlContent.replace(pattern, `$1${escapeHtml(text)}$3`);
}

function replaceMetaContent(htmlContent, matcher, content) {
  const pattern = new RegExp(`(<meta[^>]*${escapeRegExp(matcher)}[^>]*content=")([^"]*)(")`);
  return htmlContent.replace(pattern, `$1${escapeAttribute(content)}$3`);
}

function replaceLinkHref(htmlContent, matcher, href) {
  const pattern = new RegExp(`(<link[^>]*${escapeRegExp(matcher)}[^>]*href=")([^"]*)(")`);
  return htmlContent.replace(pattern, `$1${escapeAttribute(href)}$3`);
}

function escapeAttribute(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeScriptText(value) {
  return String(value).replace(/<\/script/gi, "<\\/script");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
