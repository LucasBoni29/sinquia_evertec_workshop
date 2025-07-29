# CI/CD Pipeline - Sinquia Evertec Workshop

Documentação completa do pipeline de Integração Contínua e Deploy Contínuo implementado para a aplicação Verificador da Qualidade do Ar.

## 📋 Visão Geral

O projeto implementa um pipeline CI/CD robusto usando **GitHub Actions** com foco em:
- ✅ Validação automática de código
- 🧪 Execução de testes
- 🚀 Deploy automático
- 📊 Monitoramento e relatórios

## 🔄 Workflows Implementados

### 1. Pipeline Principal (`ci-cd.yml`)

**Localização**: `.github/workflows/ci-cd.yml`

#### Triggers
```yaml
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
```

#### Jobs Detalhados

##### 🧪 **Job: Test** 
Executa validações e testes da aplicação.

**Steps implementados:**
- **Checkout**: Clona o código do repositório
- **Setup Node.js**: Configura ambiente Node.js 20
- **Instalar dependências**: `npm ci` + Playwright browsers
- **Validar estrutura**: Verifica existência de arquivos essenciais
- **Validar HTML**: `npx html-validate`
- **Validar CSS**: `npx stylelint`
- **Validar JavaScript**: `npx eslint`
- **Teste de servidor**: Inicia servidor HTTP local
- **Testes básicos**: Curl para verificar carregamento
- **Testes Playwright**: Se disponível, executa testes E2E
- **Upload artefatos**: Salva relatórios de teste

##### 🏗️ **Job: Build**
Constrói a aplicação para produção.

**Steps implementados:**
- **Checkout**: Clona o código
- **Setup Node.js**: Configura ambiente
- **Preparar build**: Copia arquivos para pasta `dist/`
- **Otimizar recursos**: Minificação CSS/JS (opcional)
- **Gerar README**: Documentação para distribuição
- **Upload build**: Salva artefatos de build (30 dias)

##### 🚀 **Job: Deploy**
Deploy automático para GitHub Pages (apenas branch `main`).

**Condições:**
- Apenas executa em push para `main`
- Requer sucesso dos jobs `test` e `build`
- Usa permissões específicas para Pages

**Steps implementados:**
- **Checkout**: Clona código
- **Download build**: Recupera artefatos do job build
- **Setup Pages**: Configura GitHub Pages
- **Upload para Pages**: Prepara arquivos
- **Deploy**: Publica no GitHub Pages

##### 📊 **Job: Notify**
Relatório consolidado do pipeline.

**Executa sempre** (mesmo com falhas) e reporta:
- Status de cada job
- Links úteis se deploy foi bem-sucedido
- Mensagens de erro se houver falhas

### 2. Validação Rápida de PRs (`pr-validation.yml`)

**Localização**: `.github/workflows/pr-validation.yml`

#### Triggers
```yaml
on:
  pull_request:
    branches: [ main ]
    paths:
      - 'air-quality-app/**'
      - '.github/workflows/**'
```

#### Funcionalidades
- ⚡ **Execução rápida** (< 2 minutos)
- 🔍 **Verificações essenciais** apenas
- 🤖 **Comentário automático** no PR
- ✅ **Feedback imediato** para desenvolvedores

## 🛠️ Ferramentas de Qualidade

### Linting e Validação

#### ESLint (JavaScript)
```json
{
  "env": { "browser": true, "es6": true },
  "extends": "eslint:recommended",
  "rules": {
    "indent": ["error", 4],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

#### StyleLint (CSS)
```json
{
  "extends": ["stylelint-config-standard"],
  "rules": {
    "indentation": 4,
    "string-quotes": "single",
    "color-hex-case": "lower"
  }
}
```

#### HTML Validate
```json
{
  "elements": ["html5"],
  "rules": {
    "doctype-first": "error",
    "doctype-html5": "error",
    "void-style": "omit"
  }
}
```

## 📊 Monitoramento e Relatórios

### Badges de Status
- **CI/CD Pipeline**: Mostra status do último build
- **PR Validation**: Status de validação de PRs

### Artefatos Salvos
- **Test Results**: Relatórios de teste (7 dias)
- **Build Artifacts**: Código compilado (30 dias)
- **Playwright Reports**: Relatórios visuais de testes

### Métricas Coletadas
- ⏱️ Tempo de execução do pipeline
- ✅ Taxa de sucesso de builds
- 🔄 Frequência de deploys
- 🐛 Detecção de erros

## 🚀 Deploy Automático

### GitHub Pages
- **URL**: https://lucasboni29.github.io/sinquia_evertec_workshop/
- **Trigger**: Push para branch `main`
- **Processo**: Totalmente automatizado
- **SSL**: Certificado automático
- **CDN**: Cache edge global

### Configuração Necessária
```yaml
# No repositório GitHub:
# Settings → Pages → Source: GitHub Actions
```

## 🔧 Scripts NPM

### Scripts Locais
```bash
npm start          # Servidor local (porta 8000)
npm test           # Testes Playwright
npm run lint       # ESLint JavaScript
npm run lint:css   # StyleLint CSS
npm run lint:html  # HTML Validate
npm run validate   # Todas as validações
npm run build      # Build de produção
npm run serve      # Servir build (porta 8080)
```

### Scripts no CI
```bash
npm ci                    # Instalação limpa de dependências
npx playwright install    # Instalar navegadores
npx html-validate        # Validação HTML
npx stylelint            # Validação CSS
npx eslint               # Validação JavaScript
```

## ⚠️ Tratamento de Erros

### Estratégias Implementadas

#### Continue on Error
```yaml
- name: Testes Playwright (se disponível)
  run: |
    if [ -f "playwright-tests.spec.js" ]; then
      npx playwright test
    else
      echo "Testes não encontrados, pulando..."
    fi
  continue-on-error: true
```

#### Validação Condicional
- Testes Playwright executam apenas se arquivo existe
- Linting produz avisos, não falhas
- Minificação é opcional (fallback graceful)

#### Upload Sempre
```yaml
- name: Upload dos artefatos de teste
  uses: actions/upload-artifact@v4
  if: always()  # Executa mesmo com falhas
```

## 🔐 Segurança

### Permissões Mínimas
```yaml
permissions:
  contents: read      # Ler código
  pages: write        # Escrever no Pages
  id-token: write     # Token de autenticação
```

### Secrets Management
- Não utiliza secrets sensíveis
- APIs públicas sem autenticação
- Tokens GitHub gerados automaticamente

## 📈 Otimizações de Performance

### Cache Estratégico
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'  # Cache automático do npm
```

### Execução Paralela
- Jobs independentes executam em paralelo
- Dependency graph otimizado
- Uso eficiente de runners

### Artefatos Compartilhados
- Build compartilhado entre jobs
- Upload/download eficiente
- Retenção configurada por necessidade

## 🐛 Troubleshooting

### Problemas Comuns

#### Build Falha
1. Verificar logs do job `test`
2. Executar `npm run validate` localmente
3. Corrigir erros de linting
4. Commit e push novamente

#### Deploy Falha
1. Verificar permissões do repositório
2. Confirmar configuração do Pages
3. Verificar se build foi bem-sucedido
4. Tentar redeploy manual se necessário

#### Testes Falham
1. Verificar se aplicação carrega localmente
2. Confirmar APIs externas funcionando
3. Atualizar testes se necessário
4. Usar `continue-on-error` temporariamente

### Logs Úteis
```bash
# Executar validações localmente
npm run validate

# Simular ambiente CI
export CI=true
npm ci
npm run build
```

## 🔄 Evolução do Pipeline

### Próximos Passos
- [ ] Testes de acessibilidade automatizados
- [ ] Análise de performance (Lighthouse)
- [ ] Notificações via Slack/Teams
- [ ] Deploy em múltiplos ambientes
- [ ] Análise de segurança (SAST)

### Métricas de Sucesso
- ✅ Build time < 5 minutos
- ✅ 99% uptime do deploy
- ✅ Zero falsos positivos
- ✅ Feedback < 2 minutos para PRs

---

**Pipeline implementado com ❤️ para o Sinquia Evertec Workshop**
