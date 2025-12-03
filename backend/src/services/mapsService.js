"use strict";
// backend/src/services/mapsService.js
const axios = require('axios');

async function calculateDistance(origin, destination) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        console.error('[Backend] Erro: GOOGLE_MAPS_API_KEY não está configurada no arquivo .env do backend.');
        throw new Error('Chave da API do Google Maps ausente no backend. Por favor, configure GOOGLE_MAPS_API_KEY no backend/.env');
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`; // Encode URI components

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK' && data.rows && data.rows.length > 0 && data.rows[0].elements && data.rows[0].elements.length > 0) {
            const element = data.rows[0].elements[0];
            if (element.status === 'OK') {
                const distanceInMeters = element.distance.value;
                return distanceInMeters / 1000; // Retorna a distância em km
            } else {
                console.error(`[Backend] Google Maps API retornou status de elemento não OK: ${element.status}. Mensagem: ${element.duration ? element.duration.text : 'N/A'}`);
                throw new Error(`Não foi possível calcular a distância. Status do elemento: ${element.status}. Verifique os endereços.`);
            }
        } else {
            console.error('[Backend] Google Maps API retornou um status não OK ou dados inválidos:', data);
            let errorMessage = `Google Maps API retornou status: ${data.status || 'UNKNOWN'}`;
            if (data.error_message) {
                errorMessage += ` - ${data.error_message}`;
            } else if (data.status === 'ZERO_RESULTS') {
                errorMessage += ' - Nenhum resultado encontrado para os endereços fornecidos. Verifique a exatidão dos endereços.';
            } else if (data.status === 'NOT_FOUND') {
                errorMessage += ' - Um ou ambos os endereços não puderam ser geocodificados.';
            }
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('[Backend] Erro ao calcular a distância (catch no mapsService):', error.message);
        if (axios.isAxiosError(error) && error.response) {
            console.error('[Backend] Resposta de erro da API do Google Maps (Axios):', error.response.data);
            throw new Error(`Erro na comunicação com a API do Google Maps: ${error.response.status} - ${error.response.statusText}. Detalhes: ${JSON.stringify(error.response.data)}`);
        }
        throw error;
    }
}

module.exports = { calculateDistance };