const MAX_VISIBLE_SKILLS = 6;

export function groupSkillsByCategory(skills) {
  return skills.reduce((groups, skill) => {
    const category = skill.category || "Skills";
    const categorySkills = groups.get(category) || [];
    categorySkills.push(skill);
    groups.set(category, categorySkills);
    return groups;
  }, new Map());
}

export function getVisibleSkills(categories, category) {
  return (categories.get(category) || []).slice(0, MAX_VISIBLE_SKILLS);
}

export function getMaxYears(skills) {
  return Math.max(...skills.map((skill) => parseYears(skill.years)), 1);
}

export function parseYears(value) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function getTabId(index) {
  return `skills-tab-${index}`;
}

export function getPanelId(index) {
  return `skills-panel-${index}`;
}
