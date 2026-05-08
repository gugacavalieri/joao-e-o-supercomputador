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
  "fixtures": [
    {
      "week": 1,
      "date": "2024-08-16",
      "joaoProb": 8,
      "superComputerProb": 12,
      "homeTeam": "Equipe Casa",
      "homeScore": 1,
      "awayTeam": "Equipe Visitante",
      "awayScore": 1
    }
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
# Python 3
python -m http.server

# Node.js http-server
npx http-server

# VS Code Live Server
# Clique com direito em index.html > Open with Live Server
```

3. Atualize os dados em `data.json` com as previsões reais e resultados

## 📝 Atualizando Dados

Edite o arquivo `data.json` com as novas rodadas e previsões. O gráfico será atualizado automaticamente ao recarregar a página.

## 🌐 Deploy no GitHub Pages

1. Clique em **Settings** > **Pages**
2. Selecione `main` como branch de origem
3. O site estará disponível em `https://seu-usuario.github.io/joao-e-o-supercomputador`

## 🛠️ Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Gradients)
- JavaScript Vanilla
- [Chart.js](https://www.chartjs.org/) - Gráficos

## 🔗 Links

- João Castelo Branco: [@j.castelobranco](https://www.instagram.com/j.castelobranco/)
- Desenvolvedor: [@gugacavalieri](https://github.com/gugacavalieri)
- [Buy me a coffee ☕](https://www.buymeacoffee.com)

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

**Feito com ❤️ por @gugacavalieri**
