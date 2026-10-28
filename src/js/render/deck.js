import { appendChildren, clearElement, createElement } from "../core/dom.js";

export function getDeckIntro(profile) {
  const firstName = profile.name.split(/\s+/)[0];
  const years = profile.summary.match(/\d+\+?\s*years/i)?.[0] || "15+ years";
  const role = profile.title.split("|")[0].trim();
  const technologies = [
    [".NET / C#", "C# / .NET"],
    ["TypeScript", "TypeScript / Angular"],
    ["SQL Server", "SQL Server"],
    ["Azure", "Azure"]
  ].filter(([name]) => profile.skills.some((skill) => skill.name === name)).map(([, label]) => label);

  return {
    title: `Hi, I'm ${firstName}. I build software.`,
    description: profile.summary,
    name: profile.name,
    role,
    location: profile.location.country,
    summaries: {
      experience: years.replace(/\byears\b/i, "Years"),
      focus: "Development",
      approach: "Practical"
    },
    technologies
  };
}

export function renderDeckIntro(profile) {
  const intro = getDeckIntro(profile);
  setText("[data-deck-intro-title]", intro.title);
  setText("[data-deck-intro-description]", intro.description);
  setText("[data-portrait-name]", intro.name);
  setText("[data-portrait-role]", intro.role);
  setText("[data-portrait-location]", intro.location);

  Object.entries(intro.summaries).forEach(([key, value]) => setText(`[data-deck-summary="${key}"]`, value));

  const tags = clearElement("[data-deck-tags]");
  if (tags) {
    appendChildren(tags, intro.technologies.map((technology) => createElement("span", { text: technology })));
  }
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}
