document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const usernameInput = document.getElementById("username");
  const themeSelect = document.getElementById("themeSelect");
  const rankSelect = document.getElementById("rankSelect");
  const customTitleInput = document.getElementById("customTitle");
  const repoNameInput = document.getElementById("repoName");
  const showIconsCheck = document.getElementById("showIcons");
  const showRankCheck = document.getElementById("showRank");
  const compactLangsCheck = document.getElementById("compactLangs");
  const showFollowersCheck = document.getElementById("showFollowers");
  const btnGenerate = document.getElementById("btnGenerate");

  // Previews
  const statsImg = document.getElementById("statsImg");
  const langsImg = document.getElementById("langsImg");
  const comboStatsImg = document.getElementById("comboStatsImg");
  const comboLangsImg = document.getElementById("comboLangsImg");
  const pinImg = document.getElementById("pinImg");

  // Containers
  const statsContainer = document.getElementById("statsPreviewContainer");
  const langsContainer = document.getElementById("langsPreviewContainer");
  const comboContainer = document.getElementById("comboPreviewContainer");
  const pinContainer = document.getElementById("pinPreviewContainer");

  // Tabs & Formats
  const tabButtons = document.querySelectorAll(".tab-btn");
  const formatButtons = document.querySelectorAll(".format-btn");
  const codeOutput = document.getElementById("codeOutput");
  const btnCopy = document.getElementById("btnCopy");

  let currentTab = "stats";
  let currentFormat = "markdown";

  function getBaseUrl() {
    return window.location.origin;
  }

  function buildStatsUrl() {
    const user = encodeURIComponent(usernameInput.value.trim() || "Novazeb");
    const theme = themeSelect.value;
    const hideRank = !showRankCheck.checked;
    const showIcons = showIconsCheck.checked;
    const showFollowers = showFollowersCheck.checked;
    const title = customTitleInput.value.trim();
    const rank = rankSelect ? rankSelect.value : "S+";

    let url = `${getBaseUrl()}/api/stats?username=${user}&theme=${theme}`;
    if (rank && rank !== "auto") url += `&rank=${encodeURIComponent(rank)}`;
    if (hideRank) url += `&hide_rank=true`;
    if (!showIcons) url += `&show_icons=false`;
    if (!showFollowers) url += `&show_followers=false`;
    if (title) url += `&custom_title=${encodeURIComponent(title)}`;
    return url;
  }

  function buildLangsUrl(forceCompact = false) {
    const user = encodeURIComponent(usernameInput.value.trim() || "Novazeb");
    const theme = themeSelect.value;
    const layout = (forceCompact || compactLangsCheck.checked) ? "compact" : "normal";

    let url = `${getBaseUrl()}/api/top-langs?username=${user}&theme=${theme}&layout=${layout}`;
    return url;
  }

  function buildPinUrl() {
    const user = encodeURIComponent(usernameInput.value.trim() || "Novazeb");
    const repo = encodeURIComponent(repoNameInput.value.trim() || "github-stats");
    const theme = themeSelect.value;

    return `${getBaseUrl()}/api/pin?username=${user}&repo=${repo}&theme=${theme}`;
  }

  function updatePreviews() {
    const statsUrl = buildStatsUrl();
    const langsUrl = buildLangsUrl();
    const comboLangsUrl = buildLangsUrl(true);
    const pinUrl = buildPinUrl();

    // Cache busting for smooth live refresh
    const time = Date.now();
    statsImg.src = `${statsUrl}&_t=${time}`;
    langsImg.src = `${langsUrl}&_t=${time}`;
    comboStatsImg.src = `${statsUrl}&_t=${time}`;
    comboLangsImg.src = `${comboLangsUrl}&_t=${time}`;
    pinImg.src = `${pinUrl}&_t=${time}`;

    updateCodeSnippet();
  }

  function updateCodeSnippet() {
    const statsUrl = buildStatsUrl();
    const langsUrl = buildLangsUrl();
    const comboLangsUrl = buildLangsUrl(true);
    const pinUrl = buildPinUrl();
    const username = usernameInput.value.trim() || "Novazeb";
    const isCombo = (currentTab === "combo" || currentTab === "both");

    let code = "";

    if (currentFormat === "markdown") {
      if (currentTab === "stats") {
        code = `[![${username}'s GitHub Stats](${statsUrl})](https://github.com/${username})`;
      } else if (currentTab === "langs") {
        code = `[![Top Langs](${langsUrl})](https://github.com/${username})`;
      } else if (isCombo) {
        code = `<p align="center">\n  <a href="https://github.com/${username}">\n    <img src="${statsUrl}" alt="${username}'s GitHub Stats" />\n  </a>\n  <a href="https://github.com/${username}">\n    <img src="${comboLangsUrl}" alt="Top Languages" />\n  </a>\n</p>`;
      } else if (currentTab === "pin") {
        code = `[![Repo Card](${pinUrl})](https://github.com/${username}/${repoNameInput.value.trim() || "github-stats"})`;
      }
    } else if (currentFormat === "html") {
      if (currentTab === "stats") {
        code = `<a href="https://github.com/${username}"><img src="${statsUrl}" alt="${username}'s GitHub Stats" /></a>`;
      } else if (currentTab === "langs") {
        code = `<a href="https://github.com/${username}"><img src="${langsUrl}" alt="Top Languages" /></a>`;
      } else if (isCombo) {
        code = `<div align="center">\n  <a href="https://github.com/${username}"><img src="${statsUrl}" alt="Stats" /></a>\n  <a href="https://github.com/${username}"><img src="${comboLangsUrl}" alt="Top Languages" /></a>\n</div>`;
      } else if (currentTab === "pin") {
        code = `<a href="https://github.com/${username}/${repoNameInput.value.trim()}"><img src="${pinUrl}" alt="Repo" /></a>`;
      }
    } else if (currentFormat === "url") {
      if (currentTab === "stats") code = statsUrl;
      else if (currentTab === "langs") code = langsUrl;
      else if (isCombo) code = `${statsUrl}\n${comboLangsUrl}`;
      else if (currentTab === "pin") code = pinUrl;
    }

    codeOutput.textContent = code;
  }

  // Tab switching
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentTab = btn.dataset.tab;

      statsContainer.classList.add("hidden");
      langsContainer.classList.add("hidden");
      comboContainer.classList.add("hidden");
      pinContainer.classList.add("hidden");

      if (currentTab === "stats") statsContainer.classList.remove("hidden");
      else if (currentTab === "langs") langsContainer.classList.remove("hidden");
      else if (currentTab === "combo" || currentTab === "both") comboContainer.classList.remove("hidden");
      else if (currentTab === "pin") pinContainer.classList.remove("hidden");

      updateCodeSnippet();
    });
  });

  // Format switching
  formatButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      formatButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFormat = btn.dataset.format;
      updateCodeSnippet();
    });
  });

  // Copy button
  btnCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(codeOutput.textContent).then(() => {
      const origText = btnCopy.textContent;
      btnCopy.textContent = "✓ Tersalin!";
      btnCopy.style.background = "#00ff87";
      btnCopy.style.color = "#000";
      setTimeout(() => {
        btnCopy.textContent = origText;
        btnCopy.style.background = "";
        btnCopy.style.color = "";
      }, 2000);
    });
  });

  btnGenerate.addEventListener("click", updatePreviews);

  // Initial load
  updatePreviews();
});

