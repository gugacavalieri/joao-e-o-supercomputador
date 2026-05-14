# João e o Supercomputador 🔴⚽️

Um site estático que visualiza as previsões de título da Premier League entre João Castelo Branco e o Supercomputador.

## 🎯 Sobre

Esse projeto compara as previsões de dois "oráculo" sobre quem vencerá o título da Premier League:

- **João Castelo Branco** - Analista apaixonado pelo Arsenal
- **Supercomputador** - Algoritmo de previsão baseado em dados

O site exibe um gráfico interativo mostrando a evolução das probabilidades ao longo das rodadas, junto com os resultados reais dos jogos.

## 📋 Funcionalidades

- 📊 Gráfico interativo com Chart.js
- 🖱️ Hover info mostrando detalhes de cada rodada
- 📱 Design responsivo
- 🎨 Cores do Arsenal (Red #EF0107, Gold #FFB81C)
- 🔗 Links diretos para redes sociais
- ⚡ Site totalmente estático - hospede em qualquer lugar

## 🏗️ Estrutura do Projeto

```
├── index.html          # Página principal
├── styles.css          # Estilos globais
├── script.js           # Lógica do gráfico e interatividade
├── data.json           # Dados das previsões e resultados
└── README.md          # Este arquivo
```

## 📊 Schema do JSON

```json
{
  "week": 32,
  "date": "2026-04-13",
  "episode": 419,
  "joaoProb": 45,
  "superComputerProb": 87,
  "reviewed": true,
  "results": [
    {
      "homeTeam": "arsenal",
      "homeScore": 1,
      "awayTeam": "bournemouth",
      "awayScore": 2
    },
    {
      "homeTeam": "chelsea",
      "homeScore": 0,
      "awayTeam": "manchester-city",
      "awayScore": 3
    },
    {
      "homeTeam": "manchester-united",
      "homeScore": 1,
      "awayTeam": "leeds",
      "awayScore": 2
    }
  ],
  "table": [
    { "team": "arsenal", "points": 70, "position": 1 },
    { "team": "manchester-city", "points": 64, "position": 2 },
    { "team": "manchester-united", "points": 55, "position": 3 }
  ]
}
```

### Campos:

- `week` - Número da rodada
- `date` - Data do fixture (YYYY-MM-DD)
- `joaoProb` - Probabilidade (%) que João prevê para o Arsenal vencer o título
- `superComputerProb` - Probabilidade (%) que o Supercomputador prevê
- `homeTeam` - Nome da equipe da casa (usado no hover)
- `homeScore` - Gols da equipe da casa
- `awayTeam` - Nome da equipe visitante
- `awayScore` - Gols da equipe visitante

## 🚀 Como Usar

1. Clone o repositório:

```bash
git clone https://github.com/gugacavalieri/joao-e-o-supercomputador.git
cd joao-e-o-supercomputador
```

2. Abra `index.html` no navegador (ou use um servidor local):

```bash
npm install
npm run dev
```

3. Atualize os dados em `data.json` com as previsões reais e resultados

## 📝 Atualizando Dados

Edite o arquivo `data.json` com as novas rodadas e previsões. O gráfico será atualizado automaticamente ao recarregar a página.

## 🛠️ Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Gradients)
- JavaScript Vanilla
- [Chart.js](https://www.chartjs.org/) - Gráficos

## 🔗 Links

- João Castelo Branco: [@j.castelobranco](https://www.instagram.com/j.castelobranco/)
- Desenvolvedor: [@gugacavalieri](https://github.com/gugacavalieri)
- [Buy me a coffee ☕](https://buymeacoffee.com/gugacavalieri)

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

**Feito com ❤️ por @gugacavalieri**
