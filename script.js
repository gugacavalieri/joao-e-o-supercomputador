let chart = null;
let fixturesData = [];

async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        fixturesData = data.fixtures;
        initChart();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

function initChart() {
    const ctx = document.getElementById('predictionChart').getContext('2d');
    
    const labels = fixturesData.map(fixture => `Rdada ${fixture.week}`);
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
                } else {
                    resetHoverInfo();
                }
            }
        }
    });
}

function updateHoverInfo(dataIndex) {
    const fixture = fixturesData[dataIndex];
    const hoverInfo = document.getElementById('hoverInfo');
    
    const resultsHTML = fixture.results.map(result => 
        `<p class="match-score">${result.homeTeam} ${result.homeScore} x ${result.awayScore} ${result.awayTeam}</p>`
    ).join('');
    
    const infoHTML = `
        <div class="fixture-details">
            <p><strong>Rodada ${fixture.week}</strong> - ${formatDate(fixture.date)}</p>
            <div class="matches-container">
                ${resultsHTML}
            </div>
            <p>
                <span class="predictor-info joao-info">
                    João Castelo Branco: <strong>${fixture.joaoProb}%</strong>
                    <a href="https://www.instagram.com/j.castelobranco/" target="_blank" class="instagram-link">@j.castelobranco</a>
                </span>
            </p>
            <p>
                <span class="predictor-info computer-info">
                    Supercomputador: <strong>${fixture.superComputerProb}%</strong>
                </span>
            </p>
        </div>
    `;
    
    hoverInfo.innerHTML = infoHTML;
}

function resetHoverInfo() {
    const hoverInfo = document.getElementById('hoverInfo');
    hoverInfo.innerHTML = '<p class="info-text">Passe o mouse sobre o gráfico para ver os detalhes</p>';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', loadData);
