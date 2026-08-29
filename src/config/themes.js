const themes = {
  "modern-rgb": {
    name: "Modern RGB (Chroma Glow)",
    background: "#0b0f19",
    cardBackground: "#0f172a",
    textColor: "#e2e8f0",
    subtextColor: "#94a3b8",
    titleColor: "#38bdf8",
    iconColor: "#00f2fe",
    borderGlow: "rgb-glow",
    gradient: ["#ff007f", "#7928ca", "#0070f3", "#00dfd8", "#00ff87"],
    rankColor: "#38bdf8",
    badgeBackground: "rgba(56, 189, 248, 0.15)",
    progressBarTrack: "rgba(255, 255, 255, 0.1)",
    accentColor: "#38bdf8",
    isAnimated: true
  },
  "neon-cyberpunk": {
    name: "Neon Cyberpunk",
    background: "#070714",
    cardBackground: "#0b0b1c",
    textColor: "#f8fafc",
    subtextColor: "#a5b4fc",
    titleColor: "#ff007f",
    iconColor: "#00f0ff",
    borderGlow: "cyber-glow",
    gradient: ["#00f0ff", "#ff007f", "#ffe600", "#7928ca"],
    rankColor: "#ff007f",
    badgeBackground: "rgba(255, 0, 127, 0.15)",
    progressBarTrack: "rgba(255, 255, 255, 0.1)",
    accentColor: "#00f0ff",
    isAnimated: true
  },
  "matrix-rgb": {
    name: "Matrix Emerald RGB",
    background: "#040d08",
    cardBackground: "#07170e",
    textColor: "#ecfdf5",
    subtextColor: "#6ee7b7",
    titleColor: "#00ff87",
    iconColor: "#00ff87",
    borderGlow: "matrix-glow",
    gradient: ["#00ff87", "#60efff", "#00e676", "#1de9b6"],
    rankColor: "#00ff87",
    badgeBackground: "rgba(0, 255, 135, 0.15)",
    progressBarTrack: "rgba(255, 255, 255, 0.1)",
    accentColor: "#00ff87",
    isAnimated: true
  },
  "sunset-chroma": {
    name: "Sunset Chroma",
    background: "#110b18",
    cardBackground: "#181024",
    textColor: "#fdf4ff",
    subtextColor: "#d8b4fe",
    titleColor: "#fa709a",
    iconColor: "#fee140",
    borderGlow: "sunset-glow",
    gradient: ["#fa709a", "#fee140", "#9b51e0", "#ff6b6b"],
    rankColor: "#fa709a",
    badgeBackground: "rgba(250, 112, 154, 0.15)",
    progressBarTrack: "rgba(255, 255, 255, 0.1)",
    accentColor: "#fa709a",
    isAnimated: true
  },
  "aurora-rgb": {
    name: "Aurora Borealis",
    background: "#08101e",
    cardBackground: "#0e1a2f",
    textColor: "#f0f9ff",
    subtextColor: "#7dd3fc",
    titleColor: "#38ef7d",
    iconColor: "#11998e",
    borderGlow: "aurora-glow",
    gradient: ["#11998e", "#38ef7d", "#00d2ff", "#92fe9d"],
    rankColor: "#38ef7d",
    badgeBackground: "rgba(56, 239, 125, 0.15)",
    progressBarTrack: "rgba(255, 255, 255, 0.1)",
    accentColor: "#38ef7d",
    isAnimated: true
  },
  "tokyo-night-rgb": {
    name: "Tokyo Night RGB",
    background: "#16161e",
    cardBackground: "#1a1b26",
    textColor: "#a9b1d6",
    subtextColor: "#7aa2f7",
    titleColor: "#bb9af7",
    iconColor: "#7dcfff",
    borderGlow: "tokyo-glow",
    gradient: ["#bb9af7", "#7aa2f7", "#7dcfff", "#f7768e"],
    rankColor: "#bb9af7",
    badgeBackground: "rgba(187, 154, 247, 0.15)",
    progressBarTrack: "rgba(255, 255, 255, 0.1)",
    accentColor: "#7aa2f7",
    isAnimated: true
  }
};

function getTheme(themeName) {
  return themes[themeName] || themes["modern-rgb"];
}

module.exports = {
  themes,
  getTheme
};

