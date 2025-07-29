# Exemplos de Teste - Verificador da Qualidade do Ar

## 🧪 Casos de Teste para Demonstração

### ✅ Cidades Brasileiras (Funcionamento Esperado)
1. **São Paulo, SP, Brasil**
   - Resultado esperado: Dados de qualidade do ar para região metropolitana
   - IQA típico: Variável (40-80 dependendo da época)

2. **Rio de Janeiro, RJ, Brasil** 
   - Resultado esperado: Dados da região costeira
   - IQA típico: Moderado a Bom (20-60)

3. **Brasília, DF, Brasil**
   - Resultado esperado: Dados da capital federal
   - IQA típico: Variável por época seca/chuvosa

4. **Curitiba, PR, Brasil**
   - Resultado esperado: Dados de cidade com melhor qualidade do ar
   - IQA típico: Bom a Razoável (10-40)

### 🌍 Cidades Internacionais
1. **Nova York, NY** (deixar país como "Estados Unidos")
   - Resultado esperado: Dados de grande metrópole americana

2. **Londres, Inglaterra** (selecionar "Outro..." e digitar "Reino Unido")
   - Resultado esperado: Dados europeus

3. **Tóquio, Tóquio** (selecionar "Outro..." e digitar "Japão")
   - Resultado esperado: Dados asiáticos

### ❌ Casos de Erro (Para Testar Tratamento)
1. **Cidade Inexistente, XX, Brasil**
   - Resultado esperado: Erro "Localização não encontrada"

2. **123456, SP, Brasil**
   - Resultado esperado: Erro de validação ou localização não encontrada

3. **[Campo vazio], SP, Brasil**
   - Resultado esperado: Erro de validação do lado cliente

## 🎯 Cenários de Demonstração

### Cenário 1: Uso Típico Brasileiro
1. Digite: "São Paulo" 
2. Digite: "SP"
3. Deixe: "Brasil" (padrão)
4. Clique em: "🔍 Consultar Qualidade do Ar"
5. Observe: Progressão dos passos de loading
6. Veja: Resultado completo com IQA, poluentes e recomendações

### Cenário 2: Cidade Internacional
1. Digite: "Paris"
2. Digite: "Île-de-France" 
3. Selecione: "Outro..." → Digite "França"
4. Submeta e observe resultado

### Cenário 3: Tratamento de Erro
1. Digite: "CidadeInexistente123"
2. Digite: "EstadoFalso"
3. Mantenha: "Brasil"
4. Observe: Mensagem de erro elegante

## 📊 Interpretação dos Resultados

### Níveis de IQA (Padrão Europeu):
- **0-20**: 🟢 Boa - Ar excelente, sem restrições
- **21-40**: 🔵 Razoável - Qualidade boa, cuidados para muito sensíveis  
- **41-60**: 🟡 Moderada - Grupos sensíveis devem ter cuidados
- **61-80**: 🟠 Ruim - Efeitos para todos, evitar atividades intensas
- **81-100**: 🔴 Muito Ruim - Prejudicial para todos
- **>100**: 🟣 Perigosa - Condições de emergência

### Poluentes Principais:
- **PM2.5/PM10**: Mais comum em áreas urbanas e industriais
- **O₃**: Comum em dias ensolarados e quentes
- **NO₂**: Típico de áreas com tráfego intenso
- **SO₂**: Relacionado a indústrias e queima de combustíveis

## 🔧 Solução de Problemas

### Se a aplicação não carregar:
1. Verifique se o arquivo `index.html` está sendo aberto diretamente
2. Use um servidor local para evitar problemas de CORS
3. Verifique o console do navegador para erros JavaScript

### Se as APIs não responderem:
1. Verifique conexão com internet
2. Tente com uma localização diferente
3. Aguarde alguns segundos e tente novamente (rate limiting)

### Se a geocodificação falhar:
1. Seja mais específico com a localização
2. Use nomes em inglês para cidades internacionais
3. Tente variações do nome da cidade

## 💡 Dicas de Uso

1. **Para melhores resultados**: Use nomes oficiais das cidades
2. **Cidades grandes**: Geralmente têm mais estações de monitoramento
3. **Áreas rurais**: Podem não ter dados disponíveis
4. **Países diferentes**: Alguns podem usar padrões de IQA diferentes
5. **Horário**: Dados são atualizados em intervalos regulares

## 🎉 Recursos para Explorar

- Teste diferentes cidades para comparar níveis de poluição
- Observe como a interface se adapta a diferentes tamanhos de tela
- Experimente o tratamento de erros com entradas inválidas  
- Note as recomendações de saúde específicas para cada nível
- Veja como os poluentes variam entre diferentes tipos de cidade
