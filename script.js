let chart = null;
let fixturesData = [];
let teamsData = {};
let hideTimeout = null;

async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        teamsData = data.teams;
        fixturesData = data.fixtures;
        initChart();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

function initChart() {
    const ctx = document.getElementById('predictionChart').getContext('2d');
    
    const labels = fixturesData.map(fixture => `Rodada ${fixture.week}`);
    const joaoData = fixturesData.map(fixture => fixture.joaoProb);
    const computerData = fixturesData.map(fixture => fixture.superComputerProb);
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'João Castelo Branco',
                    data: joaoData,
                    borderColor: '#FF3333',
                    backgroundColor: 'rgba(255, 51, 51, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#FF3333',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointHoverRadius: 7,
                    tension: 0.4,
                },
                {
                    label: 'Supercomputador',
                    data: computerData,
                    borderColor: '#4ECDC4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#4ECDC4',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointHoverRadius: 7,
                    tension: 0.4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
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
                        color: '#B0B0B0',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                    }
                },
                x: {
                    ticks: {
                        color: '#B0B0B0',
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                    }
                }
            },
            onHover: (event, activeElements) => {
                if (activeElements.length > 0) {
                    const dataIndex = activeElements[0].index;
                    updateHoverInfo(dataIndex);
                }
            }
        }
    });
}

function updateHoverInfo(dataIndex) {
    // Clear any pending hide timeout
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }
    
    const fixture = fixturesData[dataIndex];
    const hoverInfo = document.getElementById('hoverInfo');
    
    const resultsHTML = fixture.results.map(result => {
        const homeTeam = teamsData[result.homeTeam];
        const awayTeam = teamsData[result.awayTeam];
        
        return `
            <div class="match-result">
                <div class="team">
                    <img src="${homeTeam?.emblem || ''}" alt="${homeTeam?.shortname}" class="team-emblem">
                    <span class="team-name">${homeTeam?.shortname || result.homeTeam}</span>
                </div>
                <div class="score">${result.homeScore} x ${result.awayScore}</div>
                <div class="team">
                    <span class="team-name">${awayTeam?.shortname || result.awayTeam}</span>
                    <img src="${awayTeam?.emblem || ''}" alt="${awayTeam?.shortname}" class="team-emblem">
                </div>
            </div>
        `;
    }).join('');
    
    const infoHTML = `
        <div class="fixture-details">
            <p><strong>Rodada ${fixture.week}</strong> - ${formatDate(fixture.date)}</p>
            <div class="matches-container">
                ${resultsHTML}
            </div>
            <p>
                <span class="predictor-info joao-info">
                    João: <strong>${fixture.joaoProb}%</strong>
                </span>
            </p>
            <p>
                <span class="predictor-info computer-info">
                    Super: <strong>${fixture.superComputerProb}%</strong>
                </span>
            </p>
        </div>
    `;
    
    hoverInfo.innerHTML = infoHTML;
    hoverInfo.classList.add('visible');
}

function resetHoverInfo() {
    // Delay hiding to prevent flickering
    if (hideTimeout) {
        clearTimeout(hideTimeout);
    }
    hideTimeout = setTimeout(() => {
        const hoverInfo = document.getElementById('hoverInfo');
        hoverInfo.classList.remove('visible');
        hideTimeout = null;
    }, 200); // 200ms delay
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    // Add canvas mouse tracking for tooltip positioning
    const canvas = document.getElementById('predictionChart');
    canvas.addEventListener('mousemove', (e) => {
        const hoverInfo = document.getElementById('hoverInfo');
        if (hoverInfo.classList.contains('visible')) {
            const rect = canvas.getBoundingClientRect();
            let x = e.clientX;
            let y = e.clientY - 60; // offset above mouse
            
            // Prevent tooltip from going off screen
            const tooltip = hoverInfo;
            if (x + 200 > window.innerWidth) {
                x = window.innerWidth - 220;
            }
            if (x < 20) {
                x = 20;
            }
            if (y < 20) {
                y = e.clientY + 20; // move below mouse if too high
            }
            
            hoverInfo.style.left = x + 'px';
            hoverInfo.style.top = y + 'px';
        }
    });
});
