const { escapeXml, getRgbStyles, getRgbDefs } = require("../utils/svg-helper");
const { getTheme } = require("../config/themes");

function renderLanguagesCard(languages, options = {}) {
  const {
    theme: themeName = "modern-rgb",
    custom_title = "",
    hide_border = false,
    border_radius = 16,
    layout = "normal", // 'normal' or 'compact'
    langs_count = 6
  } = options;

  const theme = getTheme(themeName);
  const title = custom_title || "Most Used Languages";

  const topLangs = languages.slice(0, parseInt(langs_count, 10) || 6);
  const width = 360;
  
  // Calculate height dynamically
  const isCompact = layout === "compact";
  const rowCount = Math.ceil(topLangs.length / (isCompact ? 2 : 1));
  const height = isCompact ? 140 + rowCount * 22 : 120 + topLangs.length * 28;

  // Stacked progress bar calculations
  let currentOffset = 0;
  const progressBarWidth = width - 50;
  const progressSegments = topLangs.map((lang) => {
    const segWidth = Math.max((lang.percent / 100) * progressBarWidth, 2);
    const segX = 25 + currentOffset;
    currentOffset += segWidth;
    return `
      <rect x="${segX.toFixed(1)}" y="60" width="${segWidth.toFixed(1)}" height="8" rx="4" fill="${lang.color}">
        <title>${escapeXml(lang.name)}: ${lang.percent}%</title>
      </rect>
    `;
  }).join("");

  // Language list items
  let langItemsSvg = "";
  if (isCompact) {
    langItemsSvg = topLangs.map((lang, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = col === 0 ? 25 : 190;
      const y = 92 + row * 24;

      return `
        <g transform="translate(${x}, ${y})">
          <circle cx="5" cy="5" r="4.5" fill="${lang.color}" filter="drop-shadow(0 0 3px ${lang.color}aa)" />
          <text class="lang-name" x="16" y="8">${escapeXml(lang.name)}</text>
          <text class="lang-percent" x="120" y="8">${lang.percent}%</text>
        </g>
      `;
    }).join("");
  } else {
    langItemsSvg = topLangs.map((lang, idx) => {
      const y = 92 + idx * 28;
      const barWidth = 120;
      const fillWidth = ((lang.percent / 100) * barWidth).toFixed(1);

      return `
        <g transform="translate(25, ${y})">
          <circle cx="5" cy="5" r="4.5" fill="${lang.color}" filter="drop-shadow(0 0 3px ${lang.color}aa)" />
          <text class="lang-name" x="18" y="8">${escapeXml(lang.name)}</text>
          
          <!-- Language specific mini progress bar -->
          <rect x="135" y="2" width="${barWidth}" height="6" rx="3" fill="${theme.progressBarTrack}" />
          <rect x="135" y="2" width="${fillWidth}" height="6" rx="3" fill="${lang.color}" />
          
          <text class="lang-percent" x="270" y="8">${lang.percent}%</text>
        </g>
      `;
    }).join("");
  }

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
        <text class="title" x="0" y="0">${escapeXml(title)}</text>
      </g>

      <!-- Stacked RGB Language Progress Bar -->
      <rect x="25" y="60" width="${progressBarWidth}" height="8" rx="4" fill="${theme.progressBarTrack}" />
      ${progressSegments}

      <!-- Languages Details List -->
      ${langItemsSvg}
    </svg>
  `.trim();
}

module.exports = {
  renderLanguagesCard
};

