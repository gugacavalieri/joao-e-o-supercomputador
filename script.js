let chart = null;
let fixturesData = [];
let teamsData = {};
let hideTimeout = null;

async function loadData(selectedSeasonFile = "data-2027.json") {
  try {
    const [teamsResponse, seasonResponse] = await Promise.all([
      fetch("teams.json"),
      fetch(selectedSeasonFile),
    ]);

    if (!teamsResponse.ok) {
      throw new Error(`Falha ao carregar teams.json: ${teamsResponse.status}`);
    }

    if (!seasonResponse.ok) {
      throw new Error(
        `Falha ao carregar ${selectedSeasonFile}: ${seasonResponse.status}`,
      );
    }

    const teams = await teamsResponse.json();
    const seasonData = await seasonResponse.json();

    teamsData = teams;
    fixturesData = Array.isArray(seasonData.fixtures)
      ? seasonData.fixtures
      : [];

    if (chart) {
      chart.destroy();
      chart = null;
    }

    updateSeasonMeta(seasonData);
    initChart();

    const hoverInfo = document.getElementById("hoverInfo");
    if (hoverInfo) {
      hoverInfo.innerHTML = "";
      hoverInfo.classList.remove("visible");
    }

    if (fixturesData.length > 0) {
      const latestIndex = fixturesData.length - 1;
      updateHoverInfo(latestIndex);
    }
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}

function updateSeasonMeta(seasonData) {
  const title = document.getElementById("chartTitle");
  const lastUpdated = document.getElementById("lastUpdatedText");

  if (title) {
    const league = seasonData.league || "Premier League";
    const season = seasonData.season || "2026/2027";
    title.textContent = `Previsões de Título - ${league} ${season}`;
  }

  if (lastUpdated && seasonData.lastUpdated) {
    const date = new Date(seasonData.lastUpdated);
    lastUpdated.textContent = `Atualizado: ${date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;
  }
}

function initChart() {
  const ctx = document.getElementById("predictionChart").getContext("2d");

  const labels = fixturesData.map((fixture) => `Rodada ${fixture.week}`);
  const joaoData = fixturesData.map((fixture) => fixture.joaoProb);
  const computerData = fixturesData.map((fixture) => fixture.superComputerProb);

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "João Castelo Branco",
          data: joaoData,
          borderColor: "#FF3333",
          backgroundColor: "rgba(255, 51, 51, 0.1)",
          borderWidth: 3,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: "#FF3333",
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 2,
          pointHoverRadius: 7,
          tension: 0.4,
        },
        {
          label: "Supercomputador",
          data: computerData,
          borderColor: "#4ECDC4",
          backgroundColor: "rgba(78, 205, 196, 0.1)",
          borderWidth: 3,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: "#4ECDC4",
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 2,
          pointHoverRadius: 7,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: "#B0B0B0",
            callback: function (value) {
              return value + "%";
            },
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        x: {
          ticks: {
            color: "#B0B0B0",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
          },
        },
      },
      onHover: (event, activeElements) => {
        if (activeElements.length > 0) {
          const dataIndex = activeElements[0].index;
          updateHoverInfo(dataIndex);
        }
      },
    },
  });
}

function updateHoverInfo(dataIndex) {
  // Clear any pending hide timeout
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }

  const fixture = fixturesData[dataIndex];
  const hoverInfo = document.getElementById("hoverInfo");

  const resultsHTML = fixture.results
    .map((result) => {
      const homeTeam = teamsData[result.homeTeam];
      const awayTeam = teamsData[result.awayTeam];

      return `
            <div class="match-result">
                <div class="team">
                    <img src="${homeTeam?.emblem || ""}" alt="${homeTeam?.shortname}" class="team-emblem">
                    <span class="team-name">${homeTeam?.shortname || result.homeTeam}</span>
                </div>
                <div class="score">${result.homeScore} x ${result.awayScore}</div>
                <div class="team">
                    <span class="team-name">${awayTeam?.shortname || result.awayTeam}</span>
                    <img src="${awayTeam?.emblem || ""}" alt="${awayTeam?.shortname}" class="team-emblem">
                </div>
            </div>
        `;
    })
    .join("");

  const tableHTML = fixture.table
    ? fixture.table
        .map((entry) => {
          const team = teamsData[entry.team];
          return `
            <tr>
                <td class="table-position">${entry.position}</td>
                <td class="table-team-cell">
                    <img src="${team?.emblem || ""}" alt="${team?.shortname}" class="table-emblem">
                    <span class="table-team-name">${team?.shortname || entry.team}</span>
                </td>
                <td class="table-points">${entry.points} pts</td>
            </tr>
        `;
        })
        .join("")
    : "";

  const tableSection = fixture.table
    ? `
        <div class="table-section">
            <p class="table-title"><strong>Tabela</strong></p>
            <table class="league-table">
                <tbody>
                    ${tableHTML}
                </tbody>
            </table>
        </div>
    `
    : "";

  const infoHTML = `
        <div class="fixture-details">
            <p><strong>Rodada ${fixture.week}</strong> - ${formatDate(fixture.date)}</p>
            <div class="matches-container">
                ${resultsHTML}
            </div>
            ${tableSection}
            <div class="predictors-container">
                <span class="predictor-info joao-info">
                    João: <strong>${fixture.joaoProb}%</strong>
                </span>
                <span class="predictor-info computer-info">
                    Opta: <strong>${fixture.superComputerProb}%</strong>
                </span>
            </div>
        </div>
    `;

  hoverInfo.innerHTML = infoHTML;
  hoverInfo.classList.add("visible");
}

function resetHoverInfo() {
  // Delay hiding to prevent flickering
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }
  hideTimeout = setTimeout(() => {
    const hoverInfo = document.getElementById("hoverInfo");
    hoverInfo.classList.remove("visible");
    hideTimeout = null;
  }, 200); // 200ms delay
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
}

// Carregar dados ao iniciar
document.addEventListener("DOMContentLoaded", async () => {
  const seasonSelect = document.getElementById("seasonSelect");
  const initialSeason = seasonSelect?.value || "data-2027.json";

  await loadData(initialSeason);

  if (seasonSelect) {
    seasonSelect.addEventListener("change", async () => {
      await loadData(seasonSelect.value);
    });
  }

  // Add click handler to show info bar
  const canvas = document.getElementById("predictionChart");
  canvas.addEventListener("click", (e) => {
    if (!chart) {
      return;
    }

    const points = chart.getElementsAtEventForMode(
      e,
      "index",
      { intersect: false },
      true,
    );

    if (points.length > 0) {
      const dataIndex = points[0].index;
      updateHoverInfo(dataIndex);
    }
  });
});
