const { ICONS, escapeXml, formatNumber, getRgbStyles, getRgbDefs } = require("../utils/svg-helper");
const { getTheme } = require("../config/themes");

function renderRepoCard(repo, options = {}) {
  const {
    theme: themeName = "modern-rgb",
    hide_border = false,
    border_radius = 16,
    show_owner = false
  } = options;

  const theme = getTheme(themeName);
  const title = show_owner ? repo.fullName : repo.name;
  const width = 400;
  const height = 135;

  const langColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#178600",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584"
  };

  const langColor = langColors[repo.language] || theme.accentColor;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(title)}">
      <style>
        ${getRgbStyles(theme)}
        .repo-desc {
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
          font-size: 12px;
          fill: ${theme.subtextColor};
          line-height: 1.4;
        }
      </style>
      ${getRgbDefs(theme, width, height, border_radius)}

      <!-- Card Background with Glassmorphism & Cyber Grid -->
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${border_radius}" fill="${theme.background}" />
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${border_radius}" class="glass-backdrop" />
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${border_radius}" fill="url(#cyber-grid)" />

      <!-- Holographic Light Beam Sweep -->
      <g clip-path="url(#card-clip)">
        <rect class="light-beam" x="0" y="0" width="80" height="${height}" fill="url(#beam-gradient)" />
      </g>
      
      <!-- Animated RGB Glowing Border -->
      ${!hide_border ? `<rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${border_radius}" fill="none" class="card-border" />` : ""}

      <!-- Header / Repo Title -->
      <g transform="translate(25, 32)">
        <g class="icon-container" transform="translate(0, -14) scale(1)">
          ${ICONS.repo}
        </g>
        <text class="title" x="24" y="0">${escapeXml(title)}</text>
      </g>

      <!-- Description -->
      <text class="repo-desc" x="25" y="62">
        ${escapeXml(repo.description.length > 55 ? repo.description.substring(0, 52) + "..." : repo.description)}
      </text>

      <!-- Footer Info (Language, Stars, Forks) -->
      <g transform="translate(25, 104)">
        <!-- Language -->
        <circle cx="5" cy="-4" r="4.5" fill="${langColor}" filter="drop-shadow(0 0 3px ${langColor}aa)" />
        <text class="lang-name" x="16" y="0">${escapeXml(repo.language)}</text>

        <!-- Stars -->
        <g class="icon-container" transform="translate(130, -12) scale(0.85)">
          ${ICONS.star}
        </g>
        <text class="stat-value" x="148" y="0">${formatNumber(repo.stars)}</text>

        <!-- Forks -->
        <g class="icon-container" transform="translate(210, -12) scale(0.85)">
          ${ICONS.fork}
        </g>
        <text class="stat-value" x="228" y="0">${formatNumber(repo.forks)}</text>
      </g>
    </svg>
  `.trim();
}

module.exports = {
  renderRepoCard
};

