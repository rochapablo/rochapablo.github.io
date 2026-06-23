const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "../..");
const rules = [
  { label: "JavaScript", dir: "src/js", extension: ".js", maxLines: 150 },
  { label: "SCSS", dir: "src/scss", extension: ".scss", maxLines: 200 },
  { label: "HTML", files: ["index.html"], maxLines: 250 }
];

function collectFiles(rule) {
  if (rule.files) {
    return rule.files.map((file) => path.join(rootDir, file));
  }

  return walk(path.join(rootDir, rule.dir)).filter((file) => file.endsWith(rule.extension));
}

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  });
}

function countLines(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  return content === "" ? 0 : content.split(/\r?\n/).length;
}

const failures = [];

rules.forEach((rule) => {
  collectFiles(rule).forEach((filePath) => {
    const lineCount = countLines(filePath);

    if (lineCount > rule.maxLines) {
      failures.push({
        file: path.relative(rootDir, filePath).replace(/\\/g, "/"),
        lineCount,
        maxLines: rule.maxLines
      });
    }
  });
});

if (failures.length > 0) {
  failures.forEach((failure) => {
    console.error(
      `${failure.file} exceeds ${failure.maxLines} lines (actual: ${failure.lineCount}). Split this file before continuing.`
    );
  });
  process.exit(1);
}

console.log("File size check passed.");
