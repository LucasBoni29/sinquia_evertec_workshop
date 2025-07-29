# Sinquia Evertec Workshop - Verificador da Qualidade do Ar

![CI/CD Status](https://github.com/LucasBoni29/sinquia_evertec_workshop/actions/workflows/ci-cd.yml/badge.svg)
![PR Validation](https://github.com/LucasBoni29/sinquia_evertec_workshop/actions/workflows/pr-validation.yml/badge.svg)

Uma aplicação web completa para verificação da qualidade do ar em tempo real, desenvolvida durante o **Sinquia Evertec Workshop** como exemplo prático de desenvolvimento com GitHub Copilot.

## 🌐 Demo Online

🚀 **[Acessar Aplicação](https://lucasboni29.github.io/sinquia_evertec_workshop/)**

## 📁 Estrutura do Projeto

```
sinquia_evertec_workshop/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
│       ├── ci-cd.yml       # Pipeline principal
│       └── pr-validation.yml # Validação rápida de PRs
├── air-quality-app/        # Aplicação principal
│   ├── index.html          # Interface HTML
│   ├── styles.css          # Estilos CSS
│   ├── script.js           # Lógica JavaScript
│   ├── README.md           # Documentação da aplicação
│   └── TESTING.md          # Guia de testes
├── package.json            # Dependências e scripts
├── .eslintrc.json          # Configuração ESLint
├── .stylelintrc.json       # Configuração StyleLint
├── .htmlvalidate.json      # Configuração HTML Validate
├── WORKSHOP-CHALLENGES.md  # Desafios originais do workshop
└── README.md               # Este arquivo
```

## 🚀 Funcionalidades

### ✅ **Aplicação Web Completa**
- 🌍 **Geocodificação automática** via Nominatim (OpenStreetMap)
- 🌤️ **Dados de qualidade do ar** via Open-Meteo API
- 📊 **Índice de Qualidade do Ar (IQA)** com classificação por cores
- ⚕️ **Recomendações de saúde** baseadas nos níveis de poluição
- 📱 **Interface totalmente responsiva** (desktop, tablet, mobile)
- 🎨 **Design moderno** com animações e feedback visual

### ✅ **CI/CD Automatizado**
- 🔄 **Integração Contínua** com GitHub Actions
- 🧪 **Validação automática** de HTML, CSS e JavaScript
- 🚀 **Deploy automático** para GitHub Pages
- 📝 **Comentários automáticos** em Pull Requests
- 📊 **Relatórios de build** e artefatos

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js 18+ 
- Python 3.x (para servidor local)

### Instalação
```bash
# Clonar repositório
git clone https://github.com/LucasBoni29/sinquia_evertec_workshop.git
cd sinquia_evertec_workshop

# Instalar dependências
npm install

# Iniciar aplicação
npm start
# ou
cd air-quality-app && python -m http.server 8000
```

### Scripts Disponíveis
```bash
npm start          # Iniciar servidor local
npm test           # Executar testes Playwright
npm run lint       # Validar JavaScript
npm run lint:css   # Validar CSS
npm run lint:html  # Validar HTML
npm run validate   # Validar todos os arquivos
npm run build      # Gerar build de produção
```

## 🔄 Pipeline CI/CD

### Workflow Principal (`ci-cd.yml`)

**Triggers:**
- Push para `main` ou `develop`
- Pull Requests para `main`

**Jobs:**
1. **Test**: Validação e testes
   - Validação de estrutura de arquivos
   - Linting HTML, CSS, JavaScript
   - Testes funcionais básicos
   - Testes Playwright (se disponível)

2. **Build**: Construção da aplicação
   - Preparação para produção
   - Otimização de recursos
   - Geração de artefatos

3. **Deploy**: Deploy automático
   - Deploy para GitHub Pages (apenas branch `main`)
   - Configuração automática de domínio

4. **Notify**: Notificação de status
   - Relatório consolidado do pipeline

### Validação Rápida de PRs (`pr-validation.yml`)

**Triggers:**
- Pull Requests para `main` que modificam arquivos da aplicação

**Funcionalidades:**
- ✅ Verificação rápida de arquivos essenciais
- ✅ Validação básica de sintaxe
- ✅ Teste de carregamento da aplicação
- 🤖 Comentários automáticos no PR

## 📊 Qualidade do Código

### Ferramentas de Validação
- **ESLint**: Linting JavaScript
- **StyleLint**: Linting CSS  
- **HTML Validate**: Validação HTML
- **Playwright**: Testes end-to-end

### Padrões de Código
- **Indentação**: 4 espaços
- **Quotes**: Single quotes para CSS/JS
- **Semicolons**: Obrigatórios em JavaScript
- **HTML5**: Doctype e estrutura semântica

## 🌍 Deploy e Hospedagem

### GitHub Pages
- **URL**: https://lucasboni29.github.io/sinquia_evertec_workshop/
- **Deploy automático**: A cada push na branch `main`
- **SSL**: Certificado automático
- **CDN**: Edge cache global

### Configuração de Deploy
```yaml
# Habilitar GitHub Pages no repositório:
# Settings → Pages → Source: GitHub Actions
```

## 📚 Documentação Adicional

- 📖 [Documentação da Aplicação](air-quality-app/README.md)
- 🧪 [Guia de Testes](air-quality-app/TESTING.md)
- 📋 [Desafios do Workshop](WORKSHOP-CHALLENGES.md)
- 🎭 [Configuração Playwright](PLAYWRIGHT-SETUP.md) (se disponível)

## 🏢 Workshop Information

**Desenvolvido durante o Sinquia Evertec Workshop**
- **Objetivo**: Demonstrar desenvolvimento com GitHub Copilot
- **Stack**: HTML5, CSS3, JavaScript ES6+
- **APIs**: Open-Meteo, Nominatim (OpenStreetMap)
- **CI/CD**: GitHub Actions
- **Deploy**: GitHub Pages

## 📄 Licença

Este projeto é parte do **Sinquia Evertec Workshop** e é destinado para fins educacionais.

---

**🚀 Desenvolvido com ❤️ e GitHub Copilot para o Sinquia Evertec Workshop**
