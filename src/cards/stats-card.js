const { ICONS, escapeXml, formatNumber, calculateRank, getRgbStyles, getRgbDefs } = require("../utils/svg-helper");
const { getTheme } = require("../config/themes");

function renderStatsCard(stats, options = {}) {
  const {
    theme: themeName = "modern-rgb",
    hide_rank = false,
    show_icons = true,
    custom_title = "",
    hide_border = false,
    border_radius = 16,
    show_followers = true
  } = options;

  const theme = getTheme(themeName);
  const { rank, percent } = calculateRank(stats);

  const title = custom_title || `${stats.name || stats.username}'s GitHub Stats`;
  const width = hide_rank ? 400 : 495;
  const height = 210;

  const statItems = [
    { label: "Total Stars Earned:", value: formatNumber(stats.totalStars), icon: ICONS.star },
    { label: "Total Commits:", value: formatNumber(stats.totalCommits), icon: ICONS.commit },
    { label: "Total PRs:", value: formatNumber(stats.totalPRs), icon: ICONS.pullRequest },
    { label: "Total Issues:", value: formatNumber(stats.totalIssues), icon: ICONS.issue },
  ];

  if (show_followers) {
    statItems.push({ label: "Followers:", value: formatNumber(stats.followers), icon: ICONS.followers });
  }

  // Calculate circle progress for Rank
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  let statY = 70;
  const statRows = statItems.map((item, idx) => {
    const y = statY + idx * 25;
    const iconSvg = show_icons
      ? `<g class="icon-container" transform="translate(25, ${y - 12}) scale(0.9)">${item.icon}</g>`
      : "";
    const labelX = show_icons ? 48 : 25;

    return `
      <g transform="translate(0, 0)">
        ${iconSvg}
        <text class="stat-label" x="${labelX}" y="${y}">${escapeXml(item.label)}</text>
        <text class="stat-value" x="220" y="${y}">${escapeXml(item.value)}</text>
      </g>
    `;
  }).join("");

  const rankSvg = !hide_rank ? `
    <g transform="translate(380, 115)">
      <!-- Background Circle -->
      <circle class="rank-circle-bg" cx="0" cy="0" r="${radius}" />
      
      <!-- Animated Progress Circle -->
      <circle class="rank-circle-progress" cx="0" cy="0" r="${radius}"
        stroke-dasharray="${circumference.toFixed(2)}"
        stroke-dashoffset="${strokeDashoffset.toFixed(2)}"
        transform="rotate(-90)"
      />
      
      <!-- Rank Letter -->
      <text class="rank-text" x="0" y="-3">${escapeXml(rank)}</text>
      <text class="rank-label" x="0" y="20">TOP ${100 - percent}%</text>
    </g>
  ` : "";

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(title)}">
      <style>
        ${getRgbStyles(theme)}
      </style>
      ${getRgbDefs(theme)}
      
      <!-- Card Background with Glassmorphism -->
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${border_radius}" fill="${theme.background}" />
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${border_radius}" class="glass-backdrop" />
      
      <!-- Animated RGB Glowing Border -->
      ${!hide_border ? `<rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${border_radius}" fill="none" class="card-border" />` : ""}

      <!-- Header / Title -->
      <g transform="translate(25, 35)">
        <g class="icon-container" transform="translate(0, -15) scale(1.1)">
          ${ICONS.trophy}
        </g>
        <text class="title" x="28" y="0">${escapeXml(title)}</text>
      </g>

      <!-- Horizontal Accent Divider -->
      <rect x="25" y="48" width="${width - 50}" height="1" fill="${theme.progressBarTrack}" />

      <!-- Stats List -->
      ${statRows}

      <!-- Rank Badge -->
      ${rankSvg}
    </svg>
  `.trim();
}

module.exports = {
  renderStatsCard
};

