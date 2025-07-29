// Validação e manipulação do formulário
class AirQualityApp {
    constructor() {
        this.form = document.getElementById('locationForm');
        this.countrySelect = document.getElementById('country');
        this.customCountryGroup = document.getElementById('customCountryGroup');
        this.customCountryInput = document.getElementById('customCountry');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.resultsDiv = document.getElementById('results');
        
        this.initializeEventListeners();
        this.setupFormValidation();
    }

    initializeEventListeners() {
        // Evento de submit do formulário
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Evento de reset do formulário
        this.form.addEventListener('reset', () => this.handleFormReset());
        
        // Evento de mudança no select de país
        this.countrySelect.addEventListener('change', () => this.handleCountryChange());
        
        // Validação em tempo real
        const inputs = this.form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    setupFormValidation() {
        // Adiciona validação personalizada aos campos
        const cityInput = document.getElementById('city');
        const stateInput = document.getElementById('state');
        
        // Validação para não permitir apenas espaços
        [cityInput, stateInput].forEach(input => {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/^\s+/, ''); // Remove espaços no início
            });
        });
    }

    handleCountryChange() {
        const selectedValue = this.countrySelect.value;
        const isCustom = this.countrySelect.selectedOptions[0]?.dataset.custom === 'true';
        
        if (isCustom) {
            this.customCountryGroup.style.display = 'block';
            this.customCountryInput.required = true;
            this.customCountryInput.focus();
        } else {
            this.customCountryGroup.style.display = 'none';
            this.customCountryInput.required = false;
            this.customCountryInput.value = '';
            this.clearFieldError(this.customCountryInput);
        }
    }

    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Limpa erro anterior
        this.clearFieldError(field);

        // Validação básica de campo obrigatório
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório.';
        }
        // Validações específicas por campo
        else if (value) {
            switch (fieldName) {
                case 'city':
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'A cidade deve ter pelo menos 2 caracteres.';
                    } else if (!/^[a-zA-ZÀ-ÿ\s\-'\.]+$/.test(value)) {
                        isValid = false;
                        errorMessage = 'A cidade contém caracteres inválidos.';
                    }
                    break;
                    
                case 'state':
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'O estado deve ter pelo menos 2 caracteres.';
                    } else if (!/^[a-zA-ZÀ-ÿ\s\-'\.]+$/.test(value)) {
                        isValid = false;
                        errorMessage = 'O estado contém caracteres inválidos.';
                    }
                    break;
                    
                case 'customCountry':
                    if (this.customCountryInput.required && value.length < 2) {
                        isValid = false;
                        errorMessage = 'O país deve ter pelo menos 2 caracteres.';
                    } else if (value && !/^[a-zA-ZÀ-ÿ\s\-'\.]+$/.test(value)) {
                        isValid = false;
                        errorMessage = 'O país contém caracteres inválidos.';
                    }
                    break;
            }
        }

        // Exibe erro se houver
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.markFieldAsValid(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            field.classList.add('error');
            field.classList.remove('valid');
            field.parentElement.classList.remove('valid');
        }
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
            field.classList.remove('error');
        }
    }

    markFieldAsValid(field) {
        field.classList.remove('error');
        field.classList.add('valid');
        field.parentElement.classList.add('valid');
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('input[required], select[required]');
        let isFormValid = true;

        requiredFields.forEach(field => {
            const fieldValid = this.validateField(field);
            if (!fieldValid) {
                isFormValid = false;
            }
        });

        // Validação especial para país customizado
        if (this.countrySelect.value === 'OTHER' && this.customCountryInput.required) {
            const customCountryValid = this.validateField(this.customCountryInput);
            if (!customCountryValid) {
                isFormValid = false;
            }
        }

        return isFormValid;
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        // Valida o formulário
        if (!this.validateForm()) {
            this.showFormErrors();
            return;
        }

        // Coleta os dados do formulário
        const formData = this.getFormData();
        
        // Exibe indicador de carregamento
        this.showLoading();
        
        try {
            // 1. Busca coordenadas geográficas
            this.updateLoadingStep(1);
            const coordinates = await this.getCoordinates(formData);
            
            // 2. Busca dados de qualidade do ar
            this.updateLoadingStep(2);
            const airQualityData = await this.getAirQualityData(coordinates);
            
            // 3. Processa e exibe resultados
            this.updateLoadingStep(3);
            await new Promise(resolve => setTimeout(resolve, 500)); // Pequena pausa para UX
            this.showAirQualityResults(formData, coordinates, airQualityData);
            
        } catch (error) {
            this.showError(error.message || 'Erro ao buscar dados da qualidade do ar. Tente novamente.');
            console.error('Erro:', error);
        } finally {
            this.hideLoading();
        }
    }

    getFormData() {
        const city = document.getElementById('city').value.trim();
        const state = document.getElementById('state').value.trim();
        const country = this.countrySelect.value === 'OTHER' 
            ? this.customCountryInput.value.trim()
            : this.getCountryName(this.countrySelect.value);

        return {
            city,
            state,
            country,
            countryCode: this.countrySelect.value === 'OTHER' ? null : this.countrySelect.value
        };
    }

    getCountryName(countryCode) {
        const countryNames = {
            'BR': 'Brasil',
            'US': 'Estados Unidos',
            'CA': 'Canadá',
            'MX': 'México',
            'AR': 'Argentina',
            'CL': 'Chile',
            'CO': 'Colômbia',
            'PE': 'Peru',
            'UY': 'Uruguai',
            'PY': 'Paraguai',
            'BO': 'Bolívia',
            'VE': 'Venezuela',
            'EC': 'Equador',
            'GY': 'Guiana',
            'SR': 'Suriname',
            'GF': 'Guiana Francesa'
        };
        return countryNames[countryCode] || countryCode;
    }

    async simulateAPICall() {
        // Simula uma chamada de API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    async getCoordinates(formData) {
        const { city, state, country, countryCode } = formData;
        
        // Constrói a query de busca para o Nominatim
        let query;
        if (countryCode === 'BR') {
            query = `${city}, ${state}, ${country}`;
        } else {
            query = `${city}, ${state}, ${country}`;
        }

        const nominatimUrl = `https://nominatim.openstreetmap.org/search?` +
            `q=${encodeURIComponent(query)}&` +
            `format=json&` +
            `limit=1&` +
            `addressdetails=1`;

        try {
            const response = await fetch(nominatimUrl, {
                headers: {
                    'User-Agent': 'AirQualityApp/1.0 (sinquia-evertec-workshop)'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro na geocodificação: ${response.status}`);
            }

            const data = await response.json();

            if (!data || data.length === 0) {
                throw new Error(`Localização "${query}" não encontrada. Verifique os dados inseridos e tente novamente.`);
            }

            const location = data[0];
            return {
                latitude: parseFloat(location.lat),
                longitude: parseFloat(location.lon),
                displayName: location.display_name,
                address: location.address || {}
            };

        } catch (error) {
            if (error.message.includes('não encontrada')) {
                throw error;
            }
            throw new Error('Erro ao buscar localização. Verifique sua conexão com a internet.');
        }
    }

    async getAirQualityData(coordinates) {
        const { latitude, longitude } = coordinates;
        
        // URL da API Open-Meteo para qualidade do ar
        const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?` +
            `latitude=${latitude}&` +
            `longitude=${longitude}&` +
            `current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,uv_index,european_aqi&` +
            `timezone=auto`;

        try {
            const response = await fetch(airQualityUrl);

            if (!response.ok) {
                throw new Error(`Erro na API de qualidade do ar: ${response.status}`);
            }

            const data = await response.json();

            if (!data || !data.current) {
                throw new Error('Dados de qualidade do ar não disponíveis para esta localização.');
            }

            return this.processAirQualityData(data);

        } catch (error) {
            if (error.message.includes('não disponíveis')) {
                throw error;
            }
            throw new Error('Erro ao buscar dados de qualidade do ar. Tente novamente em alguns instantes.');
        }
    }

    processAirQualityData(data) {
        const current = data.current;
        
        // Calcula o IQA baseado no padrão europeu
        const aqi = current.european_aqi || null;
        
        // Identifica o poluente principal
        const pollutants = {
            'PM10': current.pm10,
            'PM2.5': current.pm2_5,
            'CO': current.carbon_monoxide,
            'NO₂': current.nitrogen_dioxide,
            'SO₂': current.sulphur_dioxide,
            'O₃': current.ozone
        };

        // Remove valores nulos
        const validPollutants = Object.entries(pollutants)
            .filter(([_, value]) => value !== null && value !== undefined)
            .map(([name, value]) => ({ name, value }));

        // Encontra o poluente com maior concentração relativa
        const mainPollutant = this.getMainPollutant(validPollutants);
        
        return {
            aqi: aqi,
            timestamp: current.time,
            pollutants: validPollutants,
            mainPollutant: mainPollutant,
            uvIndex: current.uv_index,
            dust: current.dust,
            rawData: current
        };
    }

    getMainPollutant(pollutants) {
        if (!pollutants || pollutants.length === 0) {
            return { name: 'N/A', value: 0 };
        }

        // Padrões de referência para determinar o poluente principal
        const standards = {
            'PM10': 50,    // μg/m³ - limite diário WHO
            'PM2.5': 25,   // μg/m³ - limite diário WHO
            'CO': 10000,   // μg/m³ - limite 8h WHO
            'NO₂': 40,     // μg/m³ - limite anual WHO
            'SO₂': 40,     // μg/m³ - limite 24h WHO
            'O₃': 100      // μg/m³ - limite 8h WHO
        };

        // Calcula a proporção de cada poluente em relação ao padrão
        const ratios = pollutants.map(p => ({
            ...p,
            ratio: standards[p.name] ? p.value / standards[p.name] : 0
        }));

        // Retorna o poluente com maior proporção
        return ratios.reduce((max, current) => 
            current.ratio > max.ratio ? current : max
        );
    }

    showLoading() {
        this.loadingIndicator.style.display = 'block';
        this.resultsDiv.style.display = 'none';
        
        // Reset loading steps
        const steps = document.querySelectorAll('.step');
        steps.forEach(step => {
            step.classList.remove('active', 'completed');
        });
        
        // Desabilita o botão de submit
        const submitButton = this.form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
    }

    updateLoadingStep(stepNumber) {
        const steps = document.querySelectorAll('.step');
        
        // Marca passos anteriores como completos
        for (let i = 1; i < stepNumber; i++) {
            const prevStep = document.getElementById(`step${i}`);
            if (prevStep) {
                prevStep.classList.remove('active');
                prevStep.classList.add('completed');
            }
        }
        
        // Marca passo atual como ativo
        const currentStep = document.getElementById(`step${stepNumber}`);
        if (currentStep) {
            currentStep.classList.add('active');
            currentStep.classList.remove('completed');
        }
    }

    hideLoading() {
        this.loadingIndicator.style.display = 'none';
        
        // Reabilita o botão de submit
        const submitButton = this.form.querySelector('button[type="submit"]');
        submitButton.disabled = false;
    }

    showResults(formData) {
        this.resultsDiv.innerHTML = `
            <h3>✅ Dados de Localização Validados</h3>
            <div class="location-info">
                <p><strong>Cidade:</strong> ${this.escapeHtml(formData.city)}</p>
                <p><strong>Estado/Região:</strong> ${this.escapeHtml(formData.state)}</p>
                <p><strong>País:</strong> ${this.escapeHtml(formData.country)}</p>
            </div>
            <div class="next-step">
                <p><em>🔄 No próximo passo, implementaremos a busca real dos dados de qualidade do ar usando APIs públicas.</em></p>
            </div>
        `;
        this.resultsDiv.style.display = 'block';
        
        // Scroll suave para os resultados
        this.resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    showAirQualityResults(formData, coordinates, airQualityData) {
        const aqiLevel = this.getAQILevel(airQualityData.aqi);
        const healthAdvice = this.getHealthAdvice(airQualityData.aqi);
        const timestamp = new Date(airQualityData.timestamp).toLocaleString('pt-BR');

        this.resultsDiv.innerHTML = `
            <div class="air-quality-results">
                <div class="location-header">
                    <h3>🌍 ${this.escapeHtml(formData.city)}, ${this.escapeHtml(formData.state)}</h3>
                    <p class="coordinates">📍 ${coordinates.latitude.toFixed(4)}°, ${coordinates.longitude.toFixed(4)}°</p>
                    <p class="timestamp">🕒 Atualizado em: ${timestamp}</p>
                </div>

                <div class="aqi-main">
                    <div class="aqi-card ${aqiLevel.class}">
                        <div class="aqi-value">${airQualityData.aqi || 'N/A'}</div>
                        <div class="aqi-label">Índice de Qualidade do Ar</div>
                        <div class="aqi-status">${aqiLevel.text}</div>
                    </div>
                </div>

                <div class="main-pollutant">
                    <h4>🏭 Poluente Principal</h4>
                    <div class="pollutant-info">
                        <span class="pollutant-name">${airQualityData.mainPollutant.name}</span>
                        <span class="pollutant-value">${airQualityData.mainPollutant.value.toFixed(1)} μg/m³</span>
                    </div>
                </div>

                <div class="health-advice">
                    <h4>⚕️ Recomendações de Saúde</h4>
                    <div class="advice-content ${aqiLevel.class}">
                        ${healthAdvice}
                    </div>
                </div>

                <div class="detailed-pollutants">
                    <h4>📊 Detalhes dos Poluentes</h4>
                    <div class="pollutants-grid">
                        ${this.renderPollutants(airQualityData.pollutants)}
                    </div>
                </div>

                ${airQualityData.uvIndex !== null ? `
                    <div class="additional-info">
                        <div class="uv-info">
                            <span class="uv-label">☀️ Índice UV:</span>
                            <span class="uv-value ${this.getUVClass(airQualityData.uvIndex)}">${airQualityData.uvIndex.toFixed(1)}</span>
                        </div>
                    </div>
                ` : ''}

                <div class="data-source">
                    <p><small>📡 Dados fornecidos pela Open-Meteo API e OpenStreetMap</small></p>
                </div>
            </div>
        `;
        this.resultsDiv.style.display = 'block';
        
        // Scroll suave para os resultados
        this.resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    getAQILevel(aqi) {
        if (!aqi || aqi === null) {
            return { class: 'unknown', text: 'Não disponível' };
        }

        if (aqi <= 20) {
            return { class: 'good', text: 'Boa' };
        } else if (aqi <= 40) {
            return { class: 'fair', text: 'Razoável' };
        } else if (aqi <= 60) {
            return { class: 'moderate', text: 'Moderada' };
        } else if (aqi <= 80) {
            return { class: 'poor', text: 'Ruim' };
        } else if (aqi <= 100) {
            return { class: 'very-poor', text: 'Muito Ruim' };
        } else {
            return { class: 'hazardous', text: 'Perigosa' };
        }
    }

    getHealthAdvice(aqi) {
        if (!aqi || aqi === null) {
            return '<p>Dados de qualidade do ar não disponíveis.</p>';
        }

        if (aqi <= 20) {
            return `
                <p><strong>🟢 Qualidade do ar excelente!</strong></p>
                <p>• Ideal para atividades ao ar livre</p>
                <p>• Sem restrições para exercícios</p>
                <p>• Ar limpo para todos os grupos</p>
            `;
        } else if (aqi <= 40) {
            return `
                <p><strong>🔵 Qualidade do ar boa.</strong></p>
                <p>• Seguro para atividades ao ar livre</p>
                <p>• Qualidade aceitável para a maioria das pessoas</p>
                <p>• Pessoas muito sensíveis devem considerar reduzir esforços prolongados</p>
            `;
        } else if (aqi <= 60) {
            return `
                <p><strong>🟡 Qualidade do ar moderada.</strong></p>
                <p>• Grupos sensíveis podem sentir sintomas leves</p>
                <p>• Crianças e pessoas com problemas respiratórios devem reduzir atividades intensas</p>
                <p>• População geral pode fazer atividades normais</p>
            `;
        } else if (aqi <= 80) {
            return `
                <p><strong>🟠 Qualidade do ar ruim.</strong></p>
                <p>• Todos podem começar a sentir efeitos na saúde</p>
                <p>• Grupos sensíveis devem evitar atividades ao ar livre</p>
                <p>• Limite exercícios intensos ao ar livre</p>
            `;
        } else if (aqi <= 100) {
            return `
                <p><strong>🔴 Qualidade do ar muito ruim.</strong></p>
                <p>• Condições prejudiciais para todos</p>
                <p>• Evite atividades ao ar livre</p>
                <p>• Use máscaras se precisar sair</p>
                <p>• Mantenha janelas fechadas</p>
            `;
        } else {
            return `
                <p><strong>🟣 Qualidade do ar perigosa!</strong></p>
                <p>• <strong>ALERTA DE SAÚDE:</strong> Condições de emergência</p>
                <p>• Evite sair de casa</p>
                <p>• Use purificadores de ar internos</p>
                <p>• Procure atendimento médico se sentir sintomas</p>
            `;
        }
    }

    renderPollutants(pollutants) {
        return pollutants.map(pollutant => {
            const description = this.getPollutantDescription(pollutant.name);
            return `
                <div class="pollutant-card">
                    <div class="pollutant-header">
                        <span class="pollutant-symbol">${pollutant.name}</span>
                        <span class="pollutant-concentration">${pollutant.value.toFixed(1)}</span>
                    </div>
                    <div class="pollutant-unit">μg/m³</div>
                    <div class="pollutant-desc">${description}</div>
                </div>
            `;
        }).join('');
    }

    getPollutantDescription(pollutantName) {
        const descriptions = {
            'PM10': 'Material particulado grosso',
            'PM2.5': 'Material particulado fino',
            'CO': 'Monóxido de carbono',
            'NO₂': 'Dióxido de nitrogênio',
            'SO₂': 'Dióxido de enxofre',
            'O₃': 'Ozônio troposférico'
        };
        return descriptions[pollutantName] || 'Poluente atmosférico';
    }

    getUVClass(uvIndex) {
        if (uvIndex <= 2) return 'uv-low';
        if (uvIndex <= 5) return 'uv-moderate';
        if (uvIndex <= 7) return 'uv-high';
        if (uvIndex <= 10) return 'uv-very-high';
        return 'uv-extreme';
    }

    showError(message) {
        this.resultsDiv.innerHTML = `
            <h3>❌ Erro</h3>
            <p style="color: #e74c3c;">${this.escapeHtml(message)}</p>
        `;
        this.resultsDiv.style.display = 'block';
    }

    showFormErrors() {
        // Foca no primeiro campo com erro
        const firstErrorField = this.form.querySelector('.error');
        if (firstErrorField) {
            firstErrorField.focus();
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    handleFormReset() {
        // Limpa todos os erros
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(element => element.textContent = '');
        
        const inputElements = this.form.querySelectorAll('input, select');
        inputElements.forEach(element => {
            element.classList.remove('error', 'valid');
            element.parentElement.classList.remove('valid');
        });
        
        // Esconde o grupo de país customizado
        this.customCountryGroup.style.display = 'none';
        this.customCountryInput.required = false;
        
        // Esconde resultados
        this.resultsDiv.style.display = 'none';
        this.hideLoading();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
    new AirQualityApp();
});

// Prevenção de envio duplo
let formSubmitting = false;
document.addEventListener('submit', (e) => {
    if (formSubmitting) {
        e.preventDefault();
        return false;
    }
    formSubmitting = true;
    setTimeout(() => {
        formSubmitting = false;
    }, 3000);
});
