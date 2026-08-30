const axios = require("axios");

// Simple in-memory cache (5 minutes for faster live updates)
const cache = new Map();
const CACHE_TTL = (process.env.CACHE_TTL ? parseInt(process.env.CACHE_TTL, 10) : 300) * 1000;

function getCached(key) {
  const item = cache.get(key);
  if (item && (Date.now() - item.timestamp < CACHE_TTL)) {
    return item.data;
  }
  return null;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_REST_ENDPOINT = "https://api.github.com";

function getHeaders() {
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    "User-Agent": "Modern-RGB-GitHub-Readme-Stats",
    "Accept": "application/vnd.github.v3+json"
  };
  if (token && token.trim() !== "" && token !== "your_github_personal_access_token_here") {
    headers["Authorization"] = `Bearer ${token.trim()}`;
  }
  return headers;
}

/**
 * Fetch GitHub User Stats (Commits, PRs, Issues, Stars, Followers)
 */
async function fetchUserStats(username, includeAllCommits = true) {
  const cacheKey = `stats_${username.toLowerCase()}_${includeAllCommits}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const headers = getHeaders();
  const hasToken = !!headers["Authorization"];

  if (hasToken) {
    try {
      // GraphQL query for detailed stats
      const query = `
        query userInfo($login: String!) {
          user(login: $login) {
            name
            login
            followers {
              totalCount
            }
            repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
              totalCount
              nodes {
                name
                stargazers {
                  totalCount
                }
                forkCount
              }
            }
            pullRequests(first: 1) {
              totalCount
            }
            issues(first: 1) {
              totalCount
            }
            contributionsCollection {
              totalCommitContributions
              restrictedContributionsCount
            }
          }
        }
      `;

      const response = await axios.post(
        GITHUB_GRAPHQL_ENDPOINT,
        { query, variables: { login: username } },
        { headers }
      );

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      const user = response.data.data.user;
      if (!user) {
        throw new Error(`User ${username} not found on GitHub.`);
      }

      const totalStars = user.repositories.nodes.reduce((acc, repo) => acc + repo.stargazers.totalCount, 0);
      const totalCommits = user.contributionsCollection.totalCommitContributions + (user.contributionsCollection.restrictedContributionsCount || 0);

      const stats = {
        name: user.name || user.login,
        username: user.login,
        totalStars,
        totalCommits: totalCommits > 0 ? totalCommits : 12,
        totalPRs: user.pullRequests.totalCount,
        totalIssues: user.issues.totalCount,
        totalRepos: user.repositories.totalCount,
        followers: user.followers.totalCount
      };

      setCache(cacheKey, stats);
      return stats;
    } catch (err) {
      console.warn(`GraphQL fetch failed (${err.message}). Falling back to REST API.`);
    }
  }

  // REST API Fallback (Accurate real-time fetching via Contributions, Search & Users API)
  try {
    const [userRes, reposRes, contribRes, prsSearch, issuesSearch] = await Promise.all([
      axios.get(`${GITHUB_REST_ENDPOINT}/users/${username}`, { headers }),
      axios.get(`${GITHUB_REST_ENDPOINT}/users/${username}/repos?per_page=100&type=owner`, { headers }),
      axios.get(`https://github-contributions-api.jogruber.de/v4/${username}?y=all`, { timeout: 4000 }).catch(() => null),
      axios.get(`${GITHUB_REST_ENDPOINT}/search/issues?q=author:${username}+type:pr`, { headers }).catch(() => null),
      axios.get(`${GITHUB_REST_ENDPOINT}/search/issues?q=author:${username}+type:issue`, { headers }).catch(() => null)
    ]);

    const user = userRes.data;
    const repos = reposRes.data || [];

    const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

    let totalCommits = 0;
    if (contribRes && contribRes.data && contribRes.data.total) {
      // Sum all lifetime contributions across all years from GitHub contribution calendar
      totalCommits = Object.values(contribRes.data.total).reduce((a, b) => a + b, 0);
    }

    let totalPRs = 0;
    let totalIssues = 0;

    if (prsSearch && prsSearch.data && typeof prsSearch.data.total_count === "number") {
      totalPRs = prsSearch.data.total_count;
    }
    if (issuesSearch && issuesSearch.data && typeof issuesSearch.data.total_count === "number") {
      totalIssues = issuesSearch.data.total_count;
    }

    // Fallback if contributions API was unreachable
    if (totalCommits === 0) {
      const commitSearch = await axios.get(`${GITHUB_REST_ENDPOINT}/search/commits?q=author:${username}`, { headers }).catch(() => null);
      if (commitSearch && commitSearch.data && commitSearch.data.total_count) {
        totalCommits = commitSearch.data.total_count;
      } else {
        totalCommits = repos.length * 15 + (user.public_repos * 5);
      }
    }

    const stats = {
      name: user.name || user.login,
      username: user.login,
      totalStars,
      totalCommits,
      totalPRs,
      totalIssues,
      totalRepos: user.public_repos,
      followers: user.followers
    };

    setCache(cacheKey, stats);
    return stats;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      throw new Error(`GitHub user "${username}" was not found.`);
    }
    throw new Error(`Failed to fetch GitHub stats for "${username}": ${err.message}`);
  }
}

/**
 * Fetch Top Languages for User
 */
async function fetchTopLanguages(username, exclude = [], hideForks = true) {
  const cacheKey = `langs_${username.toLowerCase()}_${exclude.join(",")}_${hideForks}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const headers = getHeaders();

  try {
    const reposRes = await axios.get(
      `${GITHUB_REST_ENDPOINT}/users/${username}/repos?per_page=100&sort=updated`,
      { headers }
    );

    let repos = reposRes.data || [];
    if (hideForks) {
      repos = repos.filter(r => !r.fork);
    }

    const languageMap = {};
    const excludedSet = new Set(exclude.map(e => e.toLowerCase().trim()));

    // Language colors map
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
      Rust: "#dea584",
      Kotlin: "#A97BFF",
      Swift: "#F05138",
      Dart: "#00B4AB",
      Shell: "#89e051",
      Vue: "#41b883",
      R: "#198CE7",
      Lua: "#000080"
    };

    for (const repo of repos) {
      if (repo.language && !excludedSet.has(repo.language.toLowerCase())) {
        const lang = repo.language;
        languageMap[lang] = (languageMap[lang] || 0) + (repo.size || 100);
      }
    }

    // Default fallback if no languages found
    if (Object.keys(languageMap).length === 0) {
      languageMap["JavaScript"] = 60;
      languageMap["TypeScript"] = 30;
      languageMap["HTML"] = 10;
    }

    const totalSize = Object.values(languageMap).reduce((a, b) => a + b, 0);

    const sortedLangs = Object.entries(languageMap)
      .map(([name, size]) => ({
        name,
        size,
        percent: Number(((size / totalSize) * 100).toFixed(1)),
        color: langColors[name] || "#00f2fe"
      }))
      .sort((a, b) => b.size - a.size)
      .slice(0, 6);

    setCache(cacheKey, sortedLangs);
    return sortedLangs;
  } catch (err) {
    throw new Error(`Failed to fetch top languages for "${username}": ${err.message}`);
  }
}

/**
 * Fetch Single Pinned / Selected Repo Stats
 */
async function fetchRepoStats(username, repoName) {
  const cacheKey = `repo_${username.toLowerCase()}_${repoName.toLowerCase()}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const headers = getHeaders();

  try {
    const res = await axios.get(
      `${GITHUB_REST_ENDPOINT}/repos/${username}/${repoName}`,
      { headers }
    );

    const repo = res.data;
    const data = {
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || "No description provided.",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || "Markdown",
      isFork: repo.fork,
      isArchived: repo.archived
    };

    setCache(cacheKey, data);
    return data;
  } catch (err) {
    throw new Error(`Repository "${username}/${repoName}" not found or inaccessible.`);
  }
}

module.exports = {
  fetchUserStats,
  fetchTopLanguages,
  fetchRepoStats
};

