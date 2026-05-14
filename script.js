let chart = null;
let fixturesData = [];
let teamsData = {};
let hideTimeout = null;

async function loadData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    teamsData = data.teams;
    fixturesData = data.fixtures;
    initChart();
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
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
  await loadData();

  // Show the latest fixture by default
  if (fixturesData.length > 0) {
    const latestIndex = fixturesData.length - 1;
    updateHoverInfo(latestIndex);
  }

  // Add click handler to show info bar
  const canvas = document.getElementById("predictionChart");
  canvas.addEventListener("click", (e) => {
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
