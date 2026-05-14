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
├── main.js             # Entry point para Vite (importa CSS e JavaScript)
├── styles.css          # Estilos globais
├── script.js           # Lógica do gráfico e interatividade
├── data.json           # Dados das previsões e resultados
├── vite.config.js      # Configuração do build (Vite)
├── public/             # Arquivos estáticos (copiados como-estão)
│   ├── data.json       # Dados (copiado para dist/)
│   └── favicon.ico     # Favicon
├── dist/               # Saída da build (gerada por `npm run build`)
├── package.json        # Dependências e scripts
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

### Configuração Inicial

1. Clone o repositório:

```bash
git clone https://github.com/gugacavalieri/joao-e-o-supercomputador.git
cd joao-e-o-supercomputador
```

2. Instale as dependências:

```bash
npm install
```

### Desenvolvimento Local

Para desenvolver localmente com hot reload:

```bash
npm run dev
```

Isso inicia o servidor de desenvolvimento Vite na porta 5173 e abre o navegador automaticamente.

### Build para Produção

Para gerar uma versão otimizada e minificada:

```bash
npm run build
```

Isso cria a pasta `dist/` com todos os arquivos minificados prontos para deploy.

### Visualizar Build Localmente

Para testar a versão de produção localmente:

```bash
npm run serve
```

### Outros Scripts

- `npm run prettier:check` - Verifica formatação do código
- `npm run prettier:write` - Formata o código automaticamente

## 📦 Build e Minificação

Este projeto usa **Vite** para bundling e minificação:

- **CSS**: Minificado automaticamente
- **JavaScript**: Minificado com Terser
- **HTML**: Minificado para produção
- **Arquivos estáticos**: Copiados do diretório `public/`

A build reduz significativamente o tamanho dos arquivos:
- `index.html`: 3.69 kB (gzip: 1.35 kB)
- `styles.css`: 5.69 kB (gzip: 1.70 kB)
- `main.js`: 4.51 kB (gzip: 1.68 kB)

## 🔄 Deploy Automático

Este projeto está configurado para deploy automático no GitHub Pages via GitHub Actions:

- Cada push para a branch `main` dispara a build
- Os arquivos minificados da pasta `dist/` são deployed automaticamente
- Workflow configurado em `.github/workflows/deploy.yml`

## 📝 Atualizando Dados

Edite o arquivo `data.json` com as novas rodadas e previsões. O gráfico será atualizado automaticamente ao recarregar a página.

## 🛠️ Tecnologias

- **HTML5**
- **CSS3** (Grid, Flexbox, Gradients)
- **JavaScript Vanilla**
- **[Vite](https://vitejs.dev/)** - Build tool e dev server
- **[Terser](https://terser.org/)** - JavaScript minifier
- **[Chart.js](https://www.chartjs.org/)** - Gráficos interativos
- **GitHub Actions** - CI/CD automático

## 🔗 Links

- João Castelo Branco: [@j.castelobranco](https://www.instagram.com/j.castelobranco/)
- Desenvolvedor: [@gugacavalieri](https://github.com/gugacavalieri)
- [Buy me a coffee ☕](https://buymeacoffee.com/gugacavalieri)

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

**Feito com ❤️ por @gugacavalieri**
