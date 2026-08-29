require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const { themes } = require("./config/themes");
const { fetchUserStats, fetchTopLanguages, fetchRepoStats } = require("./services/github");
const { renderStatsCard } = require("./cards/stats-card");
const { renderLanguagesCard } = require("./cards/languages-card");
const { renderRepoCard } = require("./cards/repo-card");
const { escapeXml } = require("./utils/svg-helper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

function renderErrorCard(message) {
  return `
    <svg width="450" height="120" viewBox="0 0 450 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .err-bg { fill: #110b14; stroke: #ff0055; stroke-width: 2; rx: 12; }
        .err-title { font-family: sans-serif; font-size: 16px; font-weight: bold; fill: #ff0055; }
        .err-msg { font-family: sans-serif; font-size: 13px; fill: #f1f5f9; }
      </style>
      <rect x="2" y="2" width="446" height="116" class="err-bg" />
      <text x="25" y="45" class="err-title">⚡ Modern RGB Stats Error</text>
      <text x="25" y="80" class="err-msg">${escapeXml(message.length > 50 ? message.substring(0, 47) + "..." : message)}</text>
    </svg>
  `.trim();
}

/**
 * GET /api/stats
 */
app.get("/api/stats", async (req, res) => {
  const {
    username,
    theme = "modern-rgb",
    hide_rank = "false",
    show_icons = "true",
    custom_title,
    hide_border = "false",
    border_radius = "16",
    show_followers = "true",
    include_all_commits = "true",
    rank,
    custom_rank
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=1800, stale-while-revalidate=86400");

  if (!username) {
    return res.status(400).send(renderErrorCard("Parameter 'username' is required."));
  }

  try {
    const stats = await fetchUserStats(username, include_all_commits === "true");
    const svg = renderStatsCard(stats, {
      theme,
      hide_rank: hide_rank === "true",
      show_icons: show_icons !== "false",
      custom_title,
      hide_border: hide_border === "true",
      border_radius: parseInt(border_radius, 10) || 16,
      show_followers: show_followers !== "false",
      custom_rank: custom_rank || rank || null
    });

    return res.send(svg);
  } catch (err) {
    console.error("Stats Error:", err.message);
    return res.status(200).send(renderErrorCard(err.message));
  }
});

/**
 * GET /api/top-langs
 */
app.get("/api/top-langs", async (req, res) => {
  const {
    username,
    theme = "modern-rgb",
    layout = "normal",
    langs_count = "6",
    exclude_repo = "",
    hide_border = "false",
    border_radius = "16",
    custom_title
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=1800, stale-while-revalidate=86400");

  if (!username) {
    return res.status(400).send(renderErrorCard("Parameter 'username' is required."));
  }

  try {
    const exclude = req.query.exclude ? req.query.exclude.split(",") : [];
    const languages = await fetchTopLanguages(username, exclude);
    const svg = renderLanguagesCard(languages, {
      theme,
      layout,
      langs_count: parseInt(langs_count, 10) || 6,
      hide_border: hide_border === "true",
      border_radius: parseInt(border_radius, 10) || 16,
      custom_title
    });

    return res.send(svg);
  } catch (err) {
    console.error("Top Langs Error:", err.message);
    return res.status(200).send(renderErrorCard(err.message));
  }
});

/**
 * GET /api/pin
 */
app.get("/api/pin", async (req, res) => {
  const {
    username,
    repo,
    theme = "modern-rgb",
    hide_border = "false",
    border_radius = "16",
    show_owner = "false"
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=1800, stale-while-revalidate=86400");

  if (!username || !repo) {
    return res.status(400).send(renderErrorCard("Parameters 'username' and 'repo' are required."));
  }

  try {
    const repoData = await fetchRepoStats(username, repo);
    const svg = renderRepoCard(repoData, {
      theme,
      hide_border: hide_border === "true",
      border_radius: parseInt(border_radius, 10) || 16,
      show_owner: show_owner === "true"
    });

    return res.send(svg);
  } catch (err) {
    console.error("Pin Repo Error:", err.message);
    return res.status(200).send(renderErrorCard(err.message));
  }
});

/**
 * GET /api/themes
 */
app.get("/api/themes", (req, res) => {
  res.json(themes);
});

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Modern RGB Readme Stats Server running on http://localhost:${PORT}`);
    console.log(`✨ Open http://localhost:${PORT} in your browser for the Live Interactive Customizer.\n`);
  });
}

module.exports = app;

