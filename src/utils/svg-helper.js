/**
 * SVG Helper Utilities for Modern RGB GitHub Readme Stats
 */

const ICONS = {
  star: `<path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" fill="currentColor"/>`,
  commit: `<path fill-rule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z" fill="currentColor"/>`,
  pullRequest: `<path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" fill="currentColor"/>`,
  issue: `<path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z" fill="currentColor"/>`,
  repo: `<path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" fill="currentColor"/>`,
  fire: `<path fill-rule="evenodd" d="M8.5 1.5c.3 1.2-.2 2.5-.9 3.4-.6.8-1.4 1.5-1.8 2.5-.5 1-.4 2.2.1 3.2.5.9 1.4 1.6 2.4 1.8 1 .2 2.1-.1 2.9-.8.9-.7 1.4-1.8 1.4-2.9 0-.4 0-.8-.2-1.2.9.8 1.6 1.9 1.6 3.1 0 2.8-2.2 5-5 5s-5-2.2-5-5c0-2.3 1.5-4.4 3.5-5.3.4-.2.8-.3 1-.8z" fill="currentColor"/>`,
  contribs: `<path fill-rule="evenodd" d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.25a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75z" fill="currentColor"/>`,
  fork: `<path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h4.5A2.25 2.25 0 0012.5 6.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm.75-2.122a2.25 2.25 0 10-1.5 0v-1.75a.75.75 0 011.5 0v1.75zM11.75 4a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="currentColor"/>`,
  trophy: `<path fill-rule="evenodd" d="M3.75 1.5h8.5a.75.75 0 01.75.75v1.25a4.5 4.5 0 01-3.666 4.417A3.25 3.25 0 018.75 10.9v1.85h2.5a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h2.5V10.9a3.25 3.25 0 01-.584-3.033A4.5 4.5 0 013 3.5V2.25a.75.75 0 01.75-.75zM4.5 3v.5a3 3 0 002.83 2.987A1.75 1.75 0 018 7.5a1.75 1.75 0 01.67-.013A3 3 0 0011.5 3.5V3h-7zM2.5 3h-.75a.75.75 0 000 1.5H2.5A.75.75 0 002.5 3zm11 0a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75z" fill="currentColor"/>`,
  followers: `<path d="M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a3.001 3.001 0 012.22 5.018 5.01 5.01 0 012.56 3.638.75.75 0 01-1.48.25 3.5 3.5 0 00-3.3-2.906.75.75 0 010-1.5 1.5 1.5 0 10-1.5-1.5.75.75 0 01-1.5 0A3 3 0 0111 4zm-5.5 0a2 2 0 100 4 2 2 0 000-4z" fill="currentColor"/>`
};

function escapeXml(unsafe) {
  if (typeof unsafe !== "string") return String(unsafe);
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "\'": return "&apos;";
      case '"': return "&quot;";
    }
  });
}

function formatNumber(num) {
  if (num === null || num === undefined) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return num.toString();
}

function calculateRank({ totalStars, totalCommits, totalPRs, totalIssues, followers, username }, customRank = null) {
  // 👑 JALUR PEMBUAT / CREATOR PRIVILEGE (Owner: Novazeb)
  if (customRank) {
    const r = customRank.toUpperCase();
    const percentMap = { "S+": 99, "S": 95, "A++": 90, "A+": 80, "A": 70, "B+": 60, "B": 50 };
    return { rank: r, percent: percentMap[r] || 99, score: 99999 };
  }

  if (username && username.toLowerCase() === "novazeb") {
    return { rank: "S+", percent: 99, score: 99999 };
  }

  // Standard Score Calculation
  const score = (
    totalStars * 4 +
    totalCommits * 1.5 +
    totalPRs * 3.5 +
    totalIssues * 1.5 +
    followers * 2
  );

  let rank = "C";
  let percent = 50;

  if (score >= 10000) { rank = "S+"; percent = 99; }
  else if (score >= 5000) { rank = "S"; percent = 95; }
  else if (score >= 2500) { rank = "A++"; percent = 90; }
  else if (score >= 1200) { rank = "A+"; percent = 80; }
  else if (score >= 600) { rank = "A"; percent = 70; }
  else if (score >= 300) { rank = "B+"; percent = 60; }
  else if (score >= 100) { rank = "B"; percent = 50; }
  else { rank = "B-"; percent = 40; }

  return { rank, percent, score };
}

function getRgbStyles(theme) {
  const gradientStops = theme.gradient || ["#ff007f", "#7928ca", "#0070f3", "#00dfd8", "#00ff87"];
  const gradientColors = gradientStops.join(", ");

  return `
    @keyframes rgbShift {
      0% {
        stop-color: ${gradientStops[0]};
      }
      25% {
        stop-color: ${gradientStops[1 % gradientStops.length]};
      }
      50% {
        stop-color: ${gradientStops[2 % gradientStops.length]};
      }
      75% {
        stop-color: ${gradientStops[3 % gradientStops.length]};
      }
      100% {
        stop-color: ${gradientStops[0]};
      }
    }

    @keyframes rgbShift2 {
      0% {
        stop-color: ${gradientStops[2 % gradientStops.length]};
      }
      25% {
        stop-color: ${gradientStops[3 % gradientStops.length]};
      }
      50% {
        stop-color: ${gradientStops[0]};
      }
      75% {
        stop-color: ${gradientStops[1 % gradientStops.length]};
      }
      100% {
        stop-color: ${gradientStops[2 % gradientStops.length]};
      }
    }

    @keyframes rgbRotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes pulseGlow {
      0%, 100% {
        filter: drop-shadow(0 0 8px rgba(0, 242, 254, 0.45)) drop-shadow(0 0 16px rgba(255, 0, 127, 0.3));
      }
      50% {
        filter: drop-shadow(0 0 16px rgba(0, 242, 254, 0.75)) drop-shadow(0 0 28px rgba(255, 0, 127, 0.55));
      }
    }

    @keyframes textGlow {
      0%, 100% {
        text-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
      }
      50% {
        text-shadow: 0 0 20px rgba(255, 0, 127, 0.7), 0 0 30px rgba(0, 242, 254, 0.5);
      }
    }

    @keyframes statCount {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card-border {
      stroke: url(#rgb-border-gradient);
      stroke-width: 2;
      animation: pulseGlow 4s ease-in-out infinite;
    }

    .title {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      font-weight: 700;
      font-size: 18px;
      fill: url(#rgb-text-gradient);
      letter-spacing: 0.5px;
    }

    .stat-label {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      font-weight: 500;
      fill: ${theme.subtextColor};
    }

    .stat-value {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 700;
      fill: ${theme.textColor};
      animation: statCount 0.6s ease-out forwards;
    }

    .icon-container {
      fill: url(#rgb-icon-gradient);
      filter: drop-shadow(0 0 4px ${theme.accentColor}88);
    }

    .rank-circle-bg {
      fill: none;
      stroke: ${theme.progressBarTrack};
      stroke-width: 6;
    }

    .rank-circle-progress {
      fill: none;
      stroke: url(#rgb-rank-gradient);
      stroke-width: 6;
      stroke-linecap: round;
      filter: drop-shadow(0 0 6px ${theme.accentColor});
      transition: stroke-dashoffset 1s ease-in-out;
    }

    .rank-text {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      font-weight: 800;
      font-size: 24px;
      fill: url(#rgb-text-gradient);
      text-anchor: middle;
      dominant-baseline: central;
    }

    .rank-label {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      font-weight: 600;
      font-size: 10px;
      fill: ${theme.subtextColor};
      text-anchor: middle;
      letter-spacing: 1px;
    }

    .lang-name {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      font-size: 12px;
      font-weight: 600;
      fill: ${theme.textColor};
    }

    .lang-percent {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      font-size: 12px;
      font-weight: 500;
      fill: ${theme.subtextColor};
    }

    .glass-backdrop {
      fill: ${theme.cardBackground};
      fill-opacity: 0.92;
      backdrop-filter: blur(12px);
    }

    .accent-bar {
      fill: url(#rgb-bar-gradient);
      border-radius: 4px;
      filter: drop-shadow(0 0 4px ${theme.accentColor}aa);
    }
  `;
}

function getRgbDefs(theme) {
  const grad = theme.gradient || ["#ff007f", "#7928ca", "#0070f3", "#00dfd8", "#00ff87"];
  const c1 = grad[0];
  const c2 = grad[1] || grad[0];
  const c3 = grad[2] || grad[1] || grad[0];
  const c4 = grad[3] || grad[2] || grad[0];

  return `
    <defs>
      <!-- Animated Border Gradient -->
      <linearGradient id="rgb-border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}">
          <animate attributeName="stop-color" values="${grad.join(";")};${c1}" dur="8s" repeatCount="indefinite" />
        </stop>
        <stop offset="50%" stop-color="${c2}">
          <animate attributeName="stop-color" values="${[...grad.slice(1), grad[0]].join(";")};${c2}" dur="8s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="${c3}">
          <animate attributeName="stop-color" values="${[...grad.slice(2), ...grad.slice(0, 2)].join(";")};${c3}" dur="8s" repeatCount="indefinite" />
        </stop>
      </linearGradient>

      <!-- Animated Text Gradient -->
      <linearGradient id="rgb-text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${c1}">
          <animate attributeName="stop-color" values="${grad.join(";")};${c1}" dur="6s" repeatCount="indefinite" />
        </stop>
        <stop offset="50%" stop-color="${c2}">
          <animate attributeName="stop-color" values="${[...grad.slice(1), grad[0]].join(";")};${c2}" dur="6s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="${c3}">
          <animate attributeName="stop-color" values="${[...grad.slice(2), ...grad.slice(0, 2)].join(";")};${c3}" dur="6s" repeatCount="indefinite" />
        </stop>
      </linearGradient>

      <!-- Icon Gradient -->
      <linearGradient id="rgb-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c2}" />
        <stop offset="100%" stop-color="${c1}" />
      </linearGradient>

      <!-- Rank Circle Gradient -->
      <linearGradient id="rgb-rank-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}">
          <animate attributeName="stop-color" values="${grad.join(";")};${c1}" dur="5s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="${c3}">
          <animate attributeName="stop-color" values="${[...grad.slice(2), ...grad.slice(0, 2)].join(";")};${c3}" dur="5s" repeatCount="indefinite" />
        </stop>
      </linearGradient>

      <!-- Bar Progress Gradient -->
      <linearGradient id="rgb-bar-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${c1}" />
        <stop offset="50%" stop-color="${c2}" />
        <stop offset="100%" stop-color="${c3}" />
      </linearGradient>

      <!-- Glass Background Filter -->
      <filter id="rgb-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  `;
}

module.exports = {
  ICONS,
  escapeXml,
  formatNumber,
  calculateRank,
  getRgbStyles,
  getRgbDefs
};

