const { renderStatsCard } = require("../src/cards/stats-card");
const { renderLanguagesCard } = require("../src/cards/languages-card");
const { renderRepoCard } = require("../src/cards/repo-card");
const { themes } = require("../src/config/themes");

console.log("=== Testing Modern RGB GitHub Readme Stats ===\n");

// 1. Test Themes
console.log("1. Checking available themes:");
Object.keys(themes).forEach(t => console.log(`   - ${t}: ${themes[t].name}`));

// 2. Test Stats Card SVG Render
console.log("\n2. Testing Stats Card SVG rendering...");
const mockStats = {
  name: "Linus Torvalds",
  username: "torvalds",
  totalStars: 198400,
  totalCommits: 28420,
  totalPRs: 850,
  totalIssues: 320,
  totalRepos: 12,
  followers: 215000
};

const statsSvg = renderStatsCard(mockStats, { theme: "modern-rgb" });
if (statsSvg.includes("<svg") && (statsSvg.includes("Linus Torvalds&apos;s") || statsSvg.includes("Linus Torvalds's")) && statsSvg.includes("rgb-border-gradient")) {
  console.log("   ✓ Stats Card rendered successfully with RGB gradient border!");
} else {
  console.error("   ✗ Stats Card SVG rendering failed.");
  process.exit(1);
}

// 3. Test Languages Card SVG Render
console.log("\n3. Testing Languages Card SVG rendering...");
const mockLanguages = [
  { name: "C", size: 1048576, percent: 55.4, color: "#555555" },
  { name: "Rust", size: 524288, percent: 27.7, color: "#dea584" },
  { name: "Shell", size: 262144, percent: 13.8, color: "#89e051" },
  { name: "Makefile", size: 58000, percent: 3.1, color: "#427819" }
];

const langsSvg = renderLanguagesCard(mockLanguages, { theme: "neon-cyberpunk", layout: "compact" });
if (langsSvg.includes("<svg") && langsSvg.includes("Most Used Languages") && langsSvg.includes("rgb-border-gradient") && langsSvg.includes("Rust")) {
  console.log("   ✓ Languages Card rendered successfully in compact mode!");
} else {
  console.error("   ✗ Languages Card SVG rendering failed.");
  process.exit(1);
}

// 4. Test Repo Card SVG Render
console.log("\n4. Testing Repo Card SVG rendering...");
const mockRepo = {
  name: "linux",
  fullName: "torvalds/linux",
  description: "Linux kernel source tree",
  stars: 175000,
  forks: 53000,
  language: "C"
};

const repoSvg = renderRepoCard(mockRepo, { theme: "matrix-rgb" });
if (repoSvg.includes("<svg") && repoSvg.includes("Linux kernel source tree") && repoSvg.includes("175k")) {
  console.log("   ✓ Repo Card rendered successfully with Matrix RGB theme!");
} else {
  console.error("   ✗ Repo Card SVG rendering failed.");
  process.exit(1);
}

console.log("\n✅ ALL SVG GENERATOR TESTS PASSED SUCCESSFULLY!\n");
