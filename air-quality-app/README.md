# Aplicação Web - Verificador da Qualidade do Ar

Uma aplicação web simples e responsiva para consultar a qualidade do ar em diferentes localidades.

## 📁 Estrutura do Projeto

```
air-quality-app/
├── index.html      # Página principal com formulário
├── styles.css      # Estilos CSS responsivos
├── script.js       # Lógica JavaScript e validação
└── README.md       # Este arquivo
```

## 🚀 Funcionalidades

### ✅ Implementado (Fase 2 - COMPLETA)
- **Formulário de localização** com campos para:
  - Cidade (obrigatório)
  - Estado/Província/Região (obrigatório)  
  - País (com opções pré-definidas ou campo customizado)
- **Validação do lado cliente** com:
  - Verificação de campos obrigatórios
  - Validação de formato (apenas letras, espaços, hífens, etc.)
  - Mensagens de erro em tempo real
  - Validação visual com cores
- **Integração com APIs reais**:
  - 🌍 **Geocodificação** via Nominatim (OpenStreetMap)
  - 🌤️ **Qualidade do ar** via Open-Meteo API
  - 📡 Busca automática de coordenadas geográficas
- **Exibição completa de dados de IQA**:
  - Índice de Qualidade do Ar (padrão europeu)
  - Identificação do poluente principal
  - Detalhes de todos os poluentes (PM10, PM2.5, CO, NO₂, SO₂, O₃)
  - Índice UV quando disponível
  - Timestamp da última atualização
- **Recomendações de saúde** baseadas no nível de IQA:
  - Boa (0-20): Ar excelente, sem restrições
  - Razoável (21-40): Qualidade boa, cuidados para muito sensíveis
  - Moderada (41-60): Grupos sensíveis devem ter cuidados
  - Ruim (61-80): Efeitos para todos, evitar atividades intensas
  - Muito Ruim (81-100): Prejudicial para todos
  - Perigosa (>100): Condições de emergência
- **Interface responsiva** que funciona em:
  - Desktop
  - Tablets  
  - Smartphones
- **Experiência do usuário aprimorada** com:
  - Indicador de carregamento com passos visuais
  - Animações suaves
  - Feedback visual colorido por nível de qualidade
  - Tratamento elegante de erros
  - Prevenção de envio duplo

### 🔄 Próximas fases (Opcionais)
- Testes unitários e de integração
- CI/CD com GitHub Actions
- Histórico de buscas
- Localizações favoritas
- Comparação entre cidades
- Integração com mapas

## 🛠️ Como usar

1. **Abrir a aplicação**: Abra o arquivo `index.html` em qualquer navegador web moderno
2. **Preencher o formulário**:
   - Digite o nome da cidade
   - Digite o estado/província/região
   - Selecione o país (padrão: Brasil)
   - Para outros países não listados, selecione "Outro..." e digite o nome
3. **Validação automática**: Os campos são validados em tempo real
4. **Consultar**: Clique em "🔍 Consultar Qualidade do Ar"
5. **Aguardar processamento**: Acompanhe o progresso visual:
   - 🌍 Localizando coordenadas geográficas
   - 🌤️ Consultando dados de qualidade do ar
   - 📊 Processando e exibindo resultados
6. **Visualizar resultados**: Veja o IQA, poluentes e recomendações de saúde

## 📊 Dados Exibidos

### Informações Principais:
- **Índice de Qualidade do Ar (IQA)**: Baseado no padrão europeu (0-100+)
- **Status da qualidade**: Boa, Razoável, Moderada, Ruim, Muito Ruim, Perigosa
- **Poluente principal**: O poluente com maior concentração relativa
- **Coordenadas**: Latitude e longitude da localização encontrada
- **Timestamp**: Horário da última atualização dos dados

### Poluentes Monitorados:
- **PM10**: Material particulado grosso (μg/m³)
- **PM2.5**: Material particulado fino (μg/m³)
- **CO**: Monóxido de carbono (μg/m³)
- **NO₂**: Dióxido de nitrogênio (μg/m³)
- **SO₂**: Dióxido de enxofre (μg/m³)
- **O₃**: Ozônio troposférico (μg/m³)

### Informações Adicionais:
- **Índice UV**: Quando disponível
- **Recomendações de saúde**: Baseadas no nível de IQA
- **Grupos de risco**: Orientações específicas para pessoas sensíveis

## 🌍 Países Suportados

### Pré-configurados:
- 🇧🇷 Brasil (padrão)
- 🇺🇸 Estados Unidos
- 🇨🇦 Canadá
- 🇲🇽 México
- 🇦🇷 Argentina
- 🇨🇱 Chile
- 🇨🇴 Colômbia
- 🇵🇪 Peru
- 🇺🇾 Uruguai
- 🇵🇾 Paraguai
- 🇧🇴 Bolívia
- 🇻🇪 Venezuela
- 🇪🇨 Equador
- 🇬🇾 Guiana
- 🇸🇷 Suriname
- 🇬🇫 Guiana Francesa

### Outros países:
- Opção "Outro..." permite inserir qualquer país manualmente

## 💻 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com flexbox, gradientes e grid layout
- **JavaScript ES6+**: Validação, APIs assíncronas e interatividade
- **APIs Externas**:
  - 🗺️ **Nominatim** (OpenStreetMap): Geocodificação gratuita
  - 🌤️ **Open-Meteo**: Dados de qualidade do ar em tempo real
- **Design Responsivo**: Mobile-first approach
- **Tratamento de Erros**: Gerenciamento robusto de falhas de API

## 🎨 Características de Design

- **Paleta de cores**: Gradiente azul-roxo moderno
- **Tipografia**: Segoe UI para melhor legibilidade
- **Ícones**: Emojis para melhor experiência visual
- **Animações**: Transições suaves e feedback visual
- **Acessibilidade**: Labels adequados e navegação por teclado

## 🔧 Validações Implementadas

### Validação de Campos:
- **Campos obrigatórios**: Cidade e Estado
- **Comprimento mínimo**: 2 caracteres
- **Caracteres permitidos**: Letras, espaços, hífens, pontos e acentos
- **Prevenção de espaços**: Remove espaços no início

### Validação Visual:
- **Estados de erro**: Bordas vermelhas e mensagens
- **Estados de sucesso**: Bordas verdes para campos válidos
- **Feedback em tempo real**: Validação durante a digitação

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:

- **Desktop**: Layout em coluna centralizada (max-width: 800px)
- **Tablet**: Ajustes de padding e tamanhos de fonte
- **Mobile**: Layout otimizado com botões em coluna

## 🚀 Como executar

### Opção 1: Abrir diretamente
```bash
# Navegue até a pasta do projeto
cd air-quality-app

# Abra o index.html em qualquer navegador
# No Windows:
start index.html

# No macOS:
open index.html

# No Linux:
xdg-open index.html
```

### Opção 2: Servidor local (recomendado para desenvolvimento)
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (npx)
npx serve .

# Com PHP
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

## 🔄 Próximos Passos

1. **Implementação de testes unitários** (Jest ou similar)
2. **Testes de integração** para APIs e interface
3. **Configuração de CI/CD** com GitHub Actions
4. **Funcionalidades avançadas**:
   - Histórico de buscas
   - Localizações favoritas  
   - Comparação entre cidades
   - Integração com mapas interativos
   - Sistema de alertas personalizados

## 🌐 APIs Utilizadas

### Nominatim (OpenStreetMap)
- **URL**: https://nominatim.openstreetmap.org/
- **Função**: Converter endereços em coordenadas (lat/lon)
- **Gratuita**: Sim, sem necessidade de API key
- **Rate Limit**: ~1 request/segundo para uso respeitoso

### Open-Meteo Air Quality API
- **URL**: https://open-meteo.com/en/docs/air-quality-api
- **Função**: Dados de qualidade do ar em tempo real
- **Gratuita**: Sim, sem necessidade de API key
- **Dados**: PM10, PM2.5, CO, NO₂, SO₂, O₃, IQA europeu, UV

## ⚠️ Limitações e Considerações

- **Dependência de Internet**: Requer conexão para APIs externas
- **Disponibilidade de Dados**: Nem todas as localidades possuem estações de monitoramento
- **Precisão**: Dados baseados na estação mais próxima das coordenadas
- **Rate Limiting**: APIs públicas possuem limites de uso
- **Padrão IQA**: Utiliza padrão europeu (pode diferir de padrões locais)

## 📄 Licença

Este projeto faz parte do **Sinquia Evertec Workshop** e é destinado para fins educacionais.

---

**Desenvolvido com ❤️ para o Sinquia Evertec Workshop**
