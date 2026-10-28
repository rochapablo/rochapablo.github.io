import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceRoots = ["src", "index.html"];
const ignoredDirectories = new Set(["node_modules", "dist", ".git"]);
const tokenFile = path.join(root, "src", "scss", "_variables.scss");
const colorPattern = /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch|lab|lch|color)\([^)]*\)|\b(?:transparent|white(?!-space)|black|red|blue|green|orange|purple|gray|grey)\b/gi;

function filesUnder(entry) {
  const absolute = path.join(root, entry);
  if (fs.statSync(absolute).isFile()) return [absolute];

  const files = [];
  for (const child of fs.readdirSync(absolute, { withFileTypes: true })) {
    if (child.isDirectory() && ignoredDirectories.has(child.name)) continue;
    const childPath = path.join(absolute, child.name);
    if (child.isDirectory()) files.push(...filesUnder(path.relative(root, childPath)));
    else if (/\.(?:css|scss|html|js|mjs)$/.test(child.name)) files.push(childPath);
  }
  return files;
}

const violations = [];
for (const file of sourceRoots.flatMap(filesUnder)) {
  if (path.resolve(file) === path.resolve(tokenFile)) continue;
  if (path.basename(file) === "check-color-tokens.js") continue;
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const match of line.matchAll(colorPattern)) {
      const value = match[0].toLowerCase();
      if (value === "currentcolor") continue;
      const before = line.slice(0, match.index);
      if (before.endsWith("--color-")) continue;
      violations.push(`${path.relative(root, file)}:${index + 1}: ${match[0]}`);
    }
  });
}

if (violations.length) {
  console.error("Hardcoded presentation colors found outside src/scss/_variables.scss:");
  console.error(violations.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Color token audit passed: no hardcoded presentation colors found in active sources.");
}
